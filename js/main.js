// ===========================
// INIT
// ===========================
function startGame() {
  document.getElementById('intro-screen').style.display='none';
  state.revealedNodes=['player','doleiro'];
  state.revealedEdges=[];
  state.nodeEvidence={};
  state.archived=[]; state.bribedNodes=[]; state.accusations=[];
  state.actionsUsed=0; state.bribesIssued=0;
  state.integrity=100; state.heat=20; state.exposure=0; state.funds=0;
  state.rank=t('initialRank'); state.correctAccusations=0; state.wrongAccusations=0;
  state.pendingBribe=null; state.bribesPocketed=0; state.bribesRefused=0;
  heatFired.clear(); exposureFired.clear(); lastExposureSurveillance = 0;
  updateCaseList(); drawNetwork(); updateMeters(); updateHeader(); updateBottomBar();
  setTimeout(()=>logMessage(t('msgTaskForceActive')),400);
  setTimeout(()=>logMessage(t('msgNodeRevealedVieira'),'warn'),1100);
  maybeStartTutorial();
}
