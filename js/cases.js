// ===========================
// TERMINATION FAILURE SCREEN
// ===========================
function showTermination() {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;inset:0;background:rgba(30,26,20,0.55);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    z-index:950;font-family:var(--font-ui);
  `;
  el.innerHTML = `
    <div style="border:1px solid var(--red-dim);border-top:3px solid var(--red);max-width:500px;width:90%;padding:0;background:var(--bg2);position:relative;overflow:hidden;box-shadow:0 8px 40px var(--shadow);">
      <div style="padding:34px;">
        <div style="font-size:11px;letter-spacing:2px;color:var(--red);margin-bottom:16px;font-family:var(--font-ui);font-weight:700;">${t('terminationDept')}</div>
        <div style="font-family:var(--font-headline);font-size:34px;font-weight:900;letter-spacing:0.5px;color:var(--red);margin-bottom:8px;">${t('terminationTitle')}</div>
        <div style="font-size:13px;color:var(--text-dim);letter-spacing:0.5px;margin-bottom:24px;">${t('terminationCaseLine')}</div>
        <div style="font-size:15px;line-height:1.9;color:var(--text);margin-bottom:20px;padding:15px;border-left:3px solid var(--red);background:rgba(183,35,28,0.04);font-family:var(--font-body);">
          ${t('terminationBody')}
        </div>
        <div style="font-size:13px;color:var(--text-dim);font-style:italic;margin-bottom:24px;font-family:var(--font-body);">
          ${t('terminationFootnote')}
        </div>
        <button onclick="location.reload()" style="font-family:var(--font-ui);font-size:13px;font-weight:700;letter-spacing:2px;color:var(--red);background:transparent;border:1px solid var(--red);padding:11px 24px;cursor:pointer;text-transform:uppercase;width:100%;transition:all 0.2s;" onmouseover="this.style.background='rgba(183,35,28,0.08)'" onmouseout="this.style.background='transparent'">${t('terminationRestartBtn')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(el);
}

// ===========================
// ACCUSE + ARCHIVE
// ===========================
function doAccuse() {
  const nodeId = state.selectedNode;
  if (!nodeId) return;
  const node = NODES.find(n=>n.id===nodeId);
  const conf = getConfidence(nodeId);
  if (conf.pct < ACCUSE_THRESHOLD || state.accusations.includes(nodeId)) return;

  // Filing a case is free — it's a decision, not an investigation action
  state.accusations.push(nodeId);

  // Reveal any remaining unmapped connections from this node (filing a case exposes the network)
  node.connections.forEach(cId => {
    const ek = [nodeId, cId].sort().join('-');
    if (!state.revealedEdges.includes(ek)) {
      state.revealedEdges.push(ek);
      if (!state.revealedNodes.includes(cId)) {
        state.revealedNodes.push(cId);
      }
    }
  });

  if (state.bribedNodes.includes(nodeId)) {
    state.exposure = Math.min(100, state.exposure+30);
    state.integrity = Math.max(0, state.integrity-15);
    logMessage(t('msgAccusedAnywayDanger'), 'danger');
  }

  if (node.corrupt) {
    state.correctAccusations++;
    state.rank = promoteRank(state.rank);
    state.heat = Math.min(100, state.heat+15);
    logMessage(t('msgCaseFiledIndicted', node.name), 'success');
  } else {
    state.wrongAccusations++;
    state.integrity = Math.max(0, state.integrity-25);
    logMessage(t('msgWasCleanWrongful', node.name),'danger');
  }

  unlockCases();
  drawNetwork();
  updateIntelPanel(nodeId);
  updateBottomBar();
  updateMeters();
  updateCaseList();
  updateHeader();
}

function doArchive() {
  const nodeId = state.selectedNode;
  if (!nodeId) return;
  const node = NODES.find(n=>n.id===nodeId);
  if (!node || state.accusations.includes(nodeId) || state.archived.includes(nodeId)) return;

  // Archive is also free — a decision, not an investigation
  state.archived.push(nodeId);

  if (node.corrupt) {
    logMessage(t('msgArchivedWalkFree', node.name),'danger');
    if (state.bribedNodes.includes(nodeId)) logMessage(t('msgGotWhatTheyPaidFor', node.name),'danger');
  } else {
    state.integrity = Math.min(100, state.integrity+5);
    logMessage(t('msgArchivedCorrectCall', node.name),'success');
  }

  const c = CASES.find(c=>c.targetNode===nodeId);
  if (c) c.status='buried';

  drawNetwork(); updateIntelPanel(nodeId); updateBottomBar(); updateMeters(); updateCaseList();
}

// ===========================
// UTILITIES
// ===========================
function promoteRank(current) {
  const ranks=t('ranks');
  const i=ranks.indexOf(current);
  return i<ranks.length-1?ranks[i+1]:current;
}

function unlockCases() {
  if (state.revealedNodes.includes('petrobras_director')) {
    const c=CASES.find(c=>c.id==='petrobras_case'); if(c&&c.status==='locked') c.status='open';
  }
  if (state.revealedNodes.includes('contractor')) {
    const c=CASES.find(c=>c.id==='cartel_case'); if(c&&c.status==='locked') c.status='open';
  }
  if (state.revealedNodes.includes('senator')) {
    const c=CASES.find(c=>c.id==='senator_case'); if(c&&c.status==='locked') c.status='open';
  }
  if (state.revealedNodes.includes('party_treasurer')) {
    const c=CASES.find(c=>c.id==='treasurer_case'); if(c&&c.status==='locked') c.status='open';
  }
  CASES.forEach(c=>{ if(state.accusations.includes(c.targetNode)) c.status='closed'; });
}

const CASE_STATUS_KEY = { open:'statusOpen', closed:'statusClosed', buried:'statusBuried', locked:'statusLocked' };

function updateCaseList() {
  document.getElementById('case-list').innerHTML = CASES.map(c=>`
    <div class="case-card status-${c.status} ${c.status==='locked'?'locked-card':''} ${state.selectedNode===c.targetNode?'active':''}"
         onclick="${c.status!=='locked'?`selectNode('${c.targetNode}')`:''}" >
      <div class="case-name">${c.name}</div>
      <div class="case-meta">${c.meta}</div>
      <span class="case-tag tag-${c.status}">${t(CASE_STATUS_KEY[c.status])}</span>
    </div>`).join('');
}
