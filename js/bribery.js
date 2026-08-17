// ===========================
// BRIBE SYSTEM
// ===========================
const BRIBE_MESSAGES = {
  doleiro: 'A lawyer appears at your office. "My client is willing to compensate the task force for any inconvenience. It would simply require the investigation to take a different direction."',
  petrobras_director: 'An envelope is slipped under your hotel door in Brasília. Inside: a bank account number, R$80,000, and a note: "For your retirement. The Petrobras matter is more complicated than it looks."',
  contractor: 'A Barros executive invites you to lunch. Over dessert: "We\'d like to make a contribution to your unit\'s operational fund. Entirely above board. A gesture of civic responsibility."',
  senator: 'A call from an unknown number: "The senator is aware of your investigation. He would like to ensure you have resources to pursue it in the right direction. An account has been arranged."',
  party_treasurer: 'A message via third party: "Ferreira respects your work. He\'d like to help you close the case quickly — and correctly. The amount reflects his appreciation."',
};

function checkBribeThreshold() {
  if (state.bribesIssued >= state.maxBribes || state.pendingBribe) return;
  if (!state.bribeActionThresholds.includes(state.actionsUsed)) return;
  const candidates = NODES.filter(n =>
    n.corrupt && n.bribeAmount>0 &&
    state.revealedNodes.includes(n.id) &&
    !state.accusations.includes(n.id) &&
    !state.bribedNodes.includes(n.id)
  );
  if (!candidates.length) return;
  const target = candidates[Math.floor(Math.random()*candidates.length)];
  state.bribesIssued++;
  setTimeout(()=>triggerBribe(target), 700);
}

function triggerBribe(node) {
  if (state.pendingBribe || state.accusations.includes(node.id)) return;
  state.pendingBribe = node;
  const amt = Math.round((0.8+Math.random()*0.4)*node.bribeAmount/1000)*1000;
  state.pendingBribeAmount = amt;
  const msg = BRIBE_MESSAGES[node.id] || t('bribeIntermediaryFallback', node.name, amt.toLocaleString());
  document.getElementById('bribe-amount').textContent = `R$${amt.toLocaleString()}`;
  document.getElementById('bribe-text').textContent = msg;
  document.getElementById('bribe-warning').textContent = t('bribeWarningText');
  document.getElementById('bribe-modal').classList.add('visible');
  logMessage(t('msgBribeOfferMade'),'warn');
  updateBottomBar();
}

function processBribeModal(choice) { document.getElementById('bribe-modal').classList.remove('visible'); applyBribeChoice(choice); }
function processBribe(choice) { applyBribeChoice(choice); }

function applyBribeChoice(choice) {
  const node = state.pendingBribe;
  if (!node) return;
  const amount = state.pendingBribeAmount || 0;

  if (choice==='pocket') {
    state.funds += amount;
    state.integrity = Math.max(0, state.integrity-20);
    state.exposure = Math.min(100, state.exposure+15);
    state.bribesPocketed++;
    if (!state.bribedNodes.includes(node.id)) state.bribedNodes.push(node.id);
    logMessage(t('msgReceivedCompromised', amount.toLocaleString(), node.name),'danger');
  } else if (choice==='document') {
    // Documenting a bribe = high-reliability financial evidence
    if (!state.nodeEvidence[node.id]) state.nodeEvidence[node.id]={financial:[],witness:[],surveillance:[]};
    state.nodeEvidence[node.id].financial.push({
      type:t('bribeDocumentedType'),
      text:t('bribeDocumentedText', amount.toLocaleString()),
      reliability:'high', caveat:null, method:'financial'
    });
    state.heat = Math.min(100, state.heat+10);
    state.exposure = Math.min(100, state.exposure+5);
    logMessage(t('msgBribeDocumented', node.name),'warn');
  } else {
    state.integrity = Math.min(100, state.integrity+5);
    state.bribesRefused++;
    logMessage(t('msgOfferRefused'),'success');
    // Possible evidence tampering on refusal
    const ev = state.nodeEvidence[node.id];
    if (ev && Math.random()>0.5) {
      const cats = ['financial','witness','surveillance'].filter(c=>ev[c]&&ev[c].length>0);
      if (cats.length>0) {
        const cat = cats[Math.floor(Math.random()*cats.length)];
        ev[cat].pop();
        logMessage(t('msgEvidenceAltered', node.name),'danger');
      }
    }
  }

  state.pendingBribe=null; state.pendingBribeAmount=0;
  document.getElementById('bribe-modal').classList.remove('visible');
  drawNetwork();
  if (state.selectedNode) updateIntelPanel(state.selectedNode);
  updateBottomBar(); updateMeters(); updateHeader();
}
