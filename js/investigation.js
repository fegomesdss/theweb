// ===========================
// CONFIDENCE SCORE
// ===========================
function getConfidence(nodeId) {
  const ev = state.nodeEvidence[nodeId];
  if (!ev) return { financial:0, witness:0, surveillance:0, total:0, pct:0 };
  const score = (cat) => {
    const items = ev[cat] || [];
    const raw = items.reduce((s,e) => s + REL_WEIGHT[e.reliability], 0);
    return Math.min(raw, CAT_MAX);
  };
  const fin = score('financial');
  const wit = score('witness');
  const sur = score('surveillance');
  // Bonus for diversity — having all three categories adds 0.5
  const diversityBonus = ([fin,wit,sur].filter(v=>v>0).length === 3) ? 0.5 : 0;
  const total = Math.min(fin + wit + sur + diversityBonus, 6.0);
  return { financial:fin, witness:wit, surveillance:sur, total, pct: Math.round(total/6*100) };
}

// ===========================
// METHOD PICKER
// ===========================
function openMethodPicker() {
  const nodeId = state.selectedNode;
  const node = NODES.find(n=>n.id===nodeId);
  if (!node) return;
  document.getElementById('method-target-name').textContent = node.name;
  document.getElementById('method-target-role').textContent = node.role;
  document.getElementById('method-picker').style.display = 'flex';
}
function closeMethodPicker() { document.getElementById('method-picker').style.display='none'; }

// ===========================
// INVESTIGATE
// ===========================
function doInvestigate(method) {
  closeMethodPicker();
  if (state.actionsUsed >= state.totalActions) return;
  const nodeId = state.selectedNode;
  if (!nodeId || nodeId==='player') return;

  state.actionsUsed++;
  updateBudgetPips();
  checkBribeThreshold();

  // Pick an evidence item from the chosen category
  const pool = (EVIDENCE_DB[nodeId] || {})[method] || [];
  const used = (state.nodeEvidence[nodeId]||{})[method] || [];
  const usedTexts = used.map(e=>e.text);
  const available = pool.filter(e => !usedTexts.includes(e.text));
  const pick = available.length > 0
    ? available[Math.floor(Math.random()*available.length)]
    : pool[Math.floor(Math.random()*pool.length)] || null;

  if (!pick) {
    logMessage(t('msgNoNewEvidence', t('methodNounLower')[method], NODES.find(n=>n.id===nodeId).name));
    afterInvestigate(nodeId, method, null);
    return;
  }

  // Store evidence
  if (!state.nodeEvidence[nodeId]) state.nodeEvidence[nodeId] = { financial:[], witness:[], surveillance:[] };
  state.nodeEvidence[nodeId][method].push({ ...pick, method });

  // Show the evidence card
  showEvidenceCard(nodeId, pick, method, () => afterInvestigate(nodeId, method, pick));
}

function showEvidenceCard(nodeId, pick, method, callback) {
  const node = NODES.find(n=>n.id===nodeId);
  const methodLabel = {financial:t('methodTagFinancial'),witness:t('methodTagWitness'),surveillance:t('methodTagSurveillance')}[method];
  const methodColor = {financial:'var(--fin)',witness:'var(--wit)',surveillance:'var(--sur)'}[method];
  const totalEv = Object.values(state.nodeEvidence[nodeId]||{}).flat().length;

  document.getElementById('ev-type').textContent = pick.type;
  document.getElementById('ev-type').style.color = methodColor;
  document.getElementById('ev-method-tag').textContent = methodLabel;
  document.getElementById('ev-method-tag').style.color = methodColor;
  document.getElementById('ev-num').textContent = t('evidenceNumLabel', totalEv);
  document.getElementById('ev-subject').textContent = node.name;
  document.getElementById('ev-text').textContent = pick.text;

  // Stamp based on reliability
  const stamp = document.getElementById('ev-stamp');
  if (pick.reliability === 'high') { stamp.textContent=t('stampVerified'); stamp.style.color='var(--green-bright)'; stamp.style.borderColor='var(--green-bright)'; }
  else if (pick.reliability === 'med') { stamp.textContent=t('stampUnconfirmed'); stamp.style.color='var(--amber)'; stamp.style.borderColor='var(--amber)'; }
  else { stamp.textContent=t('stampUnverified'); stamp.style.color='var(--red)'; stamp.style.borderColor='var(--red)'; }

  // Reliability bar
  const relBar = document.getElementById('rel-bar');
  relBar.innerHTML = '';
  const relLevels = { high:3, med:2, low:1 };
  const litClass = { high:'lit-high', med:'lit-med', low:'lit-low' };
  for (let i=0; i<3; i++) {
    const pip = document.createElement('div');
    pip.className='rel-pip'+(i<relLevels[pick.reliability]?' '+litClass[pick.reliability]:'');
    relBar.appendChild(pip);
  }
  const relTextKey = { high:'reliabilityHigh', med:'reliabilityMed', low:'reliabilityLow' }[pick.reliability];
  document.getElementById('rel-text').textContent = t(relTextKey);
  document.getElementById('rel-text').style.color =
    pick.reliability==='high'?'var(--green-bright)':pick.reliability==='med'?'var(--amber)':'var(--red)';

  const caveatEl = document.getElementById('ev-caveat');
  if (pick.caveat) {
    caveatEl.textContent = pick.caveat;
    caveatEl.style.display='block';
  } else {
    caveatEl.style.display='none';
  }

  evidenceCardCallback = callback;
  document.getElementById('evidence-flash').style.display='flex';
}

function dismissEvidenceCard() {
  document.getElementById('evidence-flash').style.display='none';
  if (evidenceCardCallback) {
    const cb = evidenceCardCallback;
    evidenceCardCallback = null;
    cb();
  }
}

function afterInvestigate(nodeId, method, pick) {
  const node = NODES.find(n=>n.id===nodeId);

  // Method-specific side effects
  if (method==='financial') state.heat = Math.min(100, state.heat+7);
  if (method==='surveillance') state.exposure = Math.min(100, state.exposure+8);

  // Reveal connections — financial reveals business/financial links, surveillance reveals network links, witness reveals social links
  const unmapped = node.connections.filter(cId => {
    const ek=[nodeId,cId].sort().join('-');
    return !state.revealedEdges.includes(ek);
  });

  // First time investigating this node: guarantee a connection reveal if any unmapped
  const investigationsOnNode = Object.values(state.nodeEvidence[nodeId]||{}).flat().length;
  const isFirstInvestigation = investigationsOnNode <= 1;
  const revealChance = isFirstInvestigation ? 1.0 : (method==='surveillance' ? 0.75 : method==='witness' ? 0.70 : 0.60);

  if (unmapped.length>0 && Math.random()<revealChance) {
    const cId = unmapped[0];
    const cn = NODES.find(n=>n.id===cId);
    const ek=[nodeId,cId].sort().join('-');
    state.revealedEdges.push(ek);
    if (!state.revealedNodes.includes(cId)) {
      state.revealedNodes.push(cId);
      // Draw the new node immediately so it's visible behind the reveal card
      unlockCases();
      drawNetwork();
      // Run remaining updates after player dismisses the reveal card
      animateNodeReveal(cn, () => {
        updateIntelPanel(nodeId);
        updateBottomBar();
        updateMeters();
        updateCaseList();
      });
      return; // updates deferred to callback
    } else {
      animateEdgeDraw(nodeId, cId);
      logMessage(t('msgConnectionMapped', node.name, cn.name), 'warn');
    }
  } else {
    logMessage(t('msgEvidenceFiled', method, node.name));
  }

  if (state.actionsUsed >= state.totalActions) {
    setTimeout(()=>showEnding(), 1400);
    return;
  }

  unlockCases();
  drawNetwork();
  updateIntelPanel(nodeId);
  updateBottomBar();
  updateMeters();
  updateCaseList();
}
