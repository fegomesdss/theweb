// ===========================
// GAME STATE
// ===========================
let state = {
  totalActions:12, actionsUsed:0,
  selectedNode:null,
  integrity:100, heat:20, exposure:0, funds:0,
  rank:'Detective',
  accusations:[], archived:[], bribedNodes:[],
  // Evidence stored per node per category
  // nodeEvidence[nodeId] = { financial:[], witness:[], surveillance:[] }
  // each item: { type, text, reliability, caveat, method }
  nodeEvidence:{},
  bribesPocketed:0, bribesRefused:0,
  correctAccusations:0, wrongAccusations:0,
  pendingBribe:null, pendingBribeAmount:0,
  bribesIssued:0, maxBribes:2,
  bribeActionThresholds:[4,9],
  revealedNodes:['player','contractor'],
  revealedEdges:[],
};

// Callbacks bridging async UI overlays back into the game flow
let evidenceCardCallback = null;
let nodeRevealCallback = null;

// Track which feedback thresholds have already fired this game
const heatFired = new Set();
const exposureFired = new Set();
let lastExposureSurveillance = 0;
