// ===========================
// INTEL PANEL
// ===========================
function updateIntelPanel(nodeId) {
  const node = NODES.find(n=>n.id===nodeId);
  if (!node) return;
  const accused = state.accusations.includes(nodeId);
  const archived = state.archived.includes(nodeId);
  const bribed = state.bribedNodes.includes(nodeId);
  const conf = getConfidence(nodeId);
  const ev = state.nodeEvidence[nodeId] || { financial:[], witness:[], surveillance:[] };

  let statusBadge = '';
  if (accused) {
    statusBadge = node.corrupt
      ? `<div style="font-size:12px;color:var(--red);letter-spacing:1px;padding:3px 7px;border:1px solid var(--red);display:inline-block;margin-top:5px;font-family:var(--font-ui);font-weight:600;">${t('statusCaseFiledCorrupt')}</div>`
      : `<div style="font-size:12px;color:var(--green-bright);letter-spacing:1px;padding:3px 7px;border:1px solid var(--green);display:inline-block;margin-top:5px;font-family:var(--font-ui);font-weight:600;">${t('statusCaseFiledWrongful')}</div>`;
  } else if (archived) {
    statusBadge = `<div style="font-size:12px;color:var(--text-dim);letter-spacing:1px;padding:3px 7px;border:1px solid var(--rule);display:inline-block;margin-top:5px;font-family:var(--font-ui);font-weight:600;">${t('statusArchived')}</div>`;
  } else if (bribed) {
    statusBadge = `<div style="font-size:12px;color:var(--amber);letter-spacing:1px;padding:3px 7px;border:1px solid var(--amber);display:inline-block;margin-top:5px;font-family:var(--font-ui);font-weight:600;">${t('statusBribeAccepted')}</div>`;
  }

  const portraitUrl = PORTRAITS[nodeId];
  const portraitHtml = portraitUrl
    ? `<img src="${portraitUrl}" style="width:66px;height:82px;object-fit:cover;border:1px solid var(--ink);filter:grayscale(100%) contrast(1.08) brightness(1.02);flex-shrink:0;">`
    : `<div style="width:66px;height:82px;background:var(--bg3);border:1px solid var(--rule);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;color:var(--text-dim);text-align:center;letter-spacing:0.5px;line-height:1.4;font-family:var(--font-ui);">${t('noPhotoBadgeHtml')}</div>`;

  let html = `
    <div class="intel-section">
      <div style="display:flex;gap:13px;align-items:flex-start;margin-bottom:6px;">
        ${portraitHtml}
        <div style="flex:1;min-width:0;">
          <div style="font-family:var(--font-headline);font-size:19px;font-weight:700;letter-spacing:0.3px;color:var(--ink);margin-bottom:3px;">${node.name}</div>
          <div style="font-size:11px;color:var(--text-dim);letter-spacing:1px;margin-bottom:6px;font-family:var(--font-ui);text-transform:uppercase;">${node.role.toUpperCase()}</div>
          ${statusBadge}
        </div>
      </div>
    </div>
    <div class="confidence-section">
      <div class="intel-label">${t('caseConfidenceLabel', conf.pct)}</div>
      <div class="conf-row">
        <span class="conf-cat conf-cat-fin">${t('catFinancial')}</span>
        <div class="conf-bar-wrap"><div class="conf-bar-fill conf-bar-fin" style="width:${Math.min(conf.financial/CAT_MAX*100,100)}%;"></div></div>
        <span class="conf-count">${ev.financial.length}</span>
      </div>
      <div class="conf-row">
        <span class="conf-cat conf-cat-wit">${t('catWitness')}</span>
        <div class="conf-bar-wrap"><div class="conf-bar-fill conf-bar-wit" style="width:${Math.min(conf.witness/CAT_MAX*100,100)}%;"></div></div>
        <span class="conf-count">${ev.witness.length}</span>
      </div>
      <div class="conf-row">
        <span class="conf-cat conf-cat-sur">${t('catSurveillance')}</span>
        <div class="conf-bar-wrap"><div class="conf-bar-fill conf-bar-sur" style="width:${Math.min(conf.surveillance/CAT_MAX*100,100)}%;"></div></div>
        <span class="conf-count">${ev.surveillance.length}</span>
      </div>
      <div class="conf-total">
        <span class="conf-total-label">${conf.pct >= ACCUSE_THRESHOLD ? t('caseReadyToFile') : t('needMorePercent', ACCUSE_THRESHOLD - conf.pct)}</span>
        <div style="text-align:right;">
          <span class="conf-total-val" style="color:${conf.pct >= ACCUSE_THRESHOLD ? 'var(--accent)' : 'var(--text-dim)'};">${conf.pct}%</span>
          <div style="font-size:11px;letter-spacing:1px;margin-top:1px;color:${getAssessmentLabel(conf.pct).color};font-family:var(--font-ui);">${getAssessmentLabel(conf.pct).text}</div>
        </div>
      </div>
    </div>`;

  html += `<div class="intel-section"><div class="intel-label">${t('profileLabel')}</div><div class="intel-text">${node.intel}</div></div>`;

  // Evidence log
  const allEv = [...(ev.financial||[]).map(e=>({...e,cat:'fin'})), ...(ev.witness||[]).map(e=>({...e,cat:'wit'})), ...(ev.surveillance||[]).map(e=>({...e,cat:'sur'}))];
  if (allEv.length > 0) {
    html += `<div class="intel-section"><div class="intel-label">${t('evidenceFiledLabel')}</div>`;
    allEv.forEach((e,i) => {
      const isNew = i === allEv.length-1;
      const relCol = e.reliability==='high'?'var(--green-bright)':e.reliability==='med'?'var(--amber)':'var(--red)';
      html += `<div class="ev-log-item cat-${e.cat}${isNew?' new':''}">
        <span style="font-size:11px;color:var(--text-dim);letter-spacing:0.5px;font-family:var(--font-ui);">${e.type}</span>
        <span class="ev-log-rel" style="color:${relCol};">[${e.reliability}]</span><br>
        ${e.text.substring(0,80)}…
      </div>`;
    });
    html += `</div>`;
  }

  // Connections
  if (node.connections.length > 0) {
    html += `<div class="intel-section"><div class="intel-label">${t('knownConnectionsLabel')}</div>`;
    node.connections.forEach(cId => {
      const cn = NODES.find(n=>n.id===cId);
      if (!cn) return;
      const isRev = state.revealedNodes.includes(cId);
      const ek = [nodeId,cId].sort().join('-');
      const mapped = state.revealedEdges.includes(ek);
      html += `<div class="connection-item">
        <span style="color:${isRev?'var(--text)':'var(--text-dim)'}">${isRev?cn.name:t('unknownBracket')}</span>
        <span class="conn-strength">${mapped?t('mappedDot'):t('unmappedDot')}</span>
      </div>`;
    });
    html += `</div>`;
  }

  document.getElementById('intel-header').textContent = node.name;
  document.getElementById('intel-body').innerHTML = html;
}

// ===========================
// BOTTOM BAR
// ===========================
function updateBottomBar() {
  const nodeId = state.selectedNode;
  const node = nodeId ? NODES.find(n=>n.id===nodeId) : null;
  const canAct = state.actionsUsed < state.totalActions;

  const btnInv = document.getElementById('btn-investigate');
  const zoneAcc = document.getElementById('zone-accuse');
  const btnAcc = document.getElementById('btn-accuse');
  const btnArch = document.getElementById('btn-archive');
  const zoneBribe = document.getElementById('zone-bribe');

  const alreadyDone = state.accusations.includes(nodeId) || state.archived.includes(nodeId);
  const validTarget = node && node.id!=='player' && !alreadyDone;
  btnInv.disabled = !canAct || !validTarget;

  const isBribed = node && state.bribedNodes.includes(nodeId);
  const conf = node ? getConfidence(nodeId) : { pct:0 };

  if (node && node.id!=='player' && !alreadyDone && conf.pct >= ACCUSE_THRESHOLD) {
    zoneAcc.style.display='flex';
    btnAcc.disabled = isBribed; // free action — only blocked if bribed
    btnArch.disabled = false;   // always available once threshold met
  } else {
    zoneAcc.style.display='none';
  }

  zoneBribe.style.display = state.pendingBribe ? 'flex' : 'none';

  const hint = document.getElementById('action-hint');
  if (!canAct) hint.textContent=t('hintNoActions');
  else if (!node || node.id==='player') hint.textContent=t('hintClickNode');
  else if (state.accusations.includes(nodeId)) hint.textContent=t('hintCaseAlreadyFiled', node.name);
  else if (state.archived.includes(nodeId)) hint.textContent=t('hintArchived', node.name);
  else if (isBribed && conf.pct >= ACCUSE_THRESHOLD) hint.textContent=t('hintTookMoney');
  else if (conf.pct >= ACCUSE_THRESHOLD) hint.textContent=t('hintReadyToFile', conf.pct);
  else hint.textContent=t('hintConfidenceNeeded', node.name, conf.pct, ACCUSE_THRESHOLD);

  updateBudgetPips();
}

function updateBudgetPips() {
  const c = document.getElementById('budget-pips');
  c.innerHTML='';
  const remaining = state.totalActions - state.actionsUsed;
  for (let i=0; i<state.totalActions; i++) {
    const pip = document.createElement('div');
    pip.className='budget-pip'+(i<remaining?' filled':'');
    c.appendChild(pip);
  }
}

// ===========================
// FEEDBACK SYSTEMS — meters, heat, exposure, status
// ===========================
function updateMeters() {
  document.getElementById('meter-integrity').style.width = state.integrity + '%';
  document.getElementById('meter-heat').style.width = state.heat + '%';
  document.getElementById('meter-exposure').style.width = state.exposure + '%';

  updateNetworkCompletion();
  updateInvestigationStatus();
  updateHeatUI();
  updateExposureUI();
  updateEndgameBanner();
  checkHeatThresholds();
  checkExposureThresholds();
}

// Network completion percentage
function updateNetworkCompletion() {
  const total = NODES.filter(n => n.id !== 'player').length;
  const revealed = state.revealedNodes.filter(id => id !== 'player').length;
  const pct = Math.round(revealed / total * 100);
  const el = document.getElementById('net-comp-value');
  el.textContent = `${pct}%`;
  el.style.color = pct >= 80 ? 'var(--green-bright)' : pct >= 50 ? 'var(--accent)' : 'var(--text-dim)';
}

// Assessment labels on confidence score
function getAssessmentLabel(pct) {
  if (pct < 20) return { text:t('assessNoCase'), color:'var(--text-dim)' };
  if (pct < 40) return { text:t('assessSuspicious'), color:'var(--amber)' };
  if (pct < 60) return { text:t('assessInvestigateFurther'), color:'var(--fin)' };
  if (pct < 80) return { text:t('assessLikelyCorrupt'), color:'var(--accent)' };
  return { text:t('assessStrongCase'), color:'#7a1712' };
}

// Heat warning UI: pulse above 75, red glow above 90
function updateHeatUI() {
  const heatBar = document.getElementById('heat-bar-wrap');
  if (state.heat >= 75) {
    heatBar.classList.add('pulsing');
  } else {
    heatBar.classList.remove('pulsing');
  }
  if (state.heat >= 90) {
    document.body.classList.add('heat-critical');
  } else {
    document.body.classList.remove('heat-critical');
  }
}

// Exposure surveillance flavour messages above 60
function updateExposureUI() {
  if (state.exposure < 60) return;
  const now = state.actionsUsed;
  if (now - lastExposureSurveillance < 3) return; // throttle
  lastExposureSurveillance = now;
  const msgs = t('exposureMsgs');
  if (Math.random() > 0.5) {
    logMessage(msgs[Math.floor(Math.random()*msgs.length)], 'surveillance');
  }
}

// Investigation status summary
function updateInvestigationStatus() {
  const combined = state.heat + state.exposure;
  let text, color;
  if (combined < 60) { text = t('statusUnderControl'); color = 'var(--green-bright)'; }
  else if (combined < 110) { text = t('statusUnderPressure'); color = 'var(--amber)'; }
  else if (combined < 160) { text = t('statusCompromised'); color = '#9c6a1f'; }
  else { text = t('statusCritical'); color = 'var(--red)'; }
  const el = document.getElementById('inv-status-value');
  el.textContent = text; el.style.color = color;
}

// Endgame warning banner
function updateEndgameBanner() {
  const banner = document.getElementById('endgame-banner');
  banner.style.display = (state.heat > 85 || state.exposure > 85) ? 'block' : 'none';
}

// Heat consequence thresholds
function checkHeatThresholds() {
  // 50: witness goes silent
  if (state.heat >= 50 && !heatFired.has(50)) {
    heatFired.add(50);
    // Remove a random low-reliability witness piece if exists
    const targets = NODES.filter(n => state.nodeEvidence[n.id]?.witness?.length > 0);
    if (targets.length > 0) {
      const t = targets[Math.floor(Math.random()*targets.length)];
      const low = state.nodeEvidence[t.id].witness.findIndex(e => e.reliability === 'low');
      if (low >= 0) state.nodeEvidence[t.id].witness.splice(low, 1);
    }
    logMessage(t('msgSourceSilent'), 'danger');
    if (state.selectedNode) updateIntelPanel(state.selectedNode);
  }
  // 75: exposure spike + message
  if (state.heat >= 75 && !heatFired.has(75)) {
    heatFired.add(75);
    state.exposure = Math.min(100, state.exposure + 10);
    logMessage(t('msgMediaLeaks'), 'danger');
  }
  // 90: evidence tampering
  if (state.heat >= 90 && !heatFired.has(90)) {
    heatFired.add(90);
    // Remove a random evidence piece
    const targets = NODES.filter(n => {
      const ev = state.nodeEvidence[n.id];
      return ev && Object.values(ev).flat().length > 0;
    });
    if (targets.length > 0) {
      const t = targets[Math.floor(Math.random()*targets.length)];
      const cats = ['financial','witness','surveillance'].filter(c => state.nodeEvidence[t.id][c]?.length > 0);
      if (cats.length > 0) {
        const cat = cats[Math.floor(Math.random()*cats.length)];
        state.nodeEvidence[t.id][cat].pop();
      }
    }
    logMessage(t('msgEvidenceTampering'), 'danger');
    if (state.selectedNode) updateIntelPanel(state.selectedNode);
  }
}

// Exposure consequence thresholds
function checkExposureThresholds() {
  if (state.exposure >= 30 && !exposureFired.has(30)) {
    exposureFired.add(30);
    logMessage(t('msgSomeoneKnows'), 'danger');
  }
  if (state.exposure >= 60 && !exposureFired.has(60)) {
    exposureFired.add(60);
    state.heat = Math.min(100, state.heat + 10);
    logMessage(t('msgSupervisorBriefing'), 'danger');
  }
  if (state.exposure >= 80 && !exposureFired.has(80)) {
    exposureFired.add(80);
    state.integrity = Math.max(0, state.integrity - 10);
    logMessage(t('msgInternalAffairs'), 'danger');
  }
  if (state.exposure >= 100 && !exposureFired.has(100)) {
    exposureFired.add(100);
    logMessage(t('msgInvestigationTerminated'), 'danger');
    setTimeout(() => showTermination(), 1800);
  }
}

function updateHeader() {
  document.getElementById('stat-rank').textContent=state.rank;
  document.getElementById('stat-funds').textContent=`€${state.funds.toLocaleString()}`;
}

function logMessage(msg,type='') {
  const log=document.getElementById('message-log');
  const el=document.createElement('div');
  el.className='log-message'+(type?' '+type:'');
  el.textContent=msg;
  log.appendChild(el);
  setTimeout(()=>el.remove(),3300);
}

// ===========================
// ENDING
// ===========================
function showEnding() {
  let verdict, verdictStyle;
  if (state.integrity>=80&&state.correctAccusations>=2) {
    verdict=t('verdictStrong', state.correctAccusations);
    verdictStyle='var(--green-bright)';
  } else if (state.integrity>=50&&state.correctAccusations>=1) {
    verdict=t('verdictPartial');
    verdictStyle='var(--amber)';
  } else if (state.funds>15000) {
    verdict=t('verdictBribed');
    verdictStyle='var(--red)';
  } else {
    verdict=t('verdictWoundDown');
    verdictStyle='var(--text-dim)';
  }
  document.getElementById('ending-stats').innerHTML=`
    <div class="ending-stat"><div class="ending-stat-num" style="color:var(--green-bright)">${state.correctAccusations}</div><div class="ending-stat-label">${t('endingIndictmentsFiled')}</div></div>
    <div class="ending-stat"><div class="ending-stat-num" style="color:var(--red)">${state.wrongAccusations}</div><div class="ending-stat-label">${t('endingWrongfulAccusations')}</div></div>
    <div class="ending-stat"><div class="ending-stat-num" style="color:${state.funds>0?'var(--accent)':'var(--text-dim)'}">R$${state.funds.toLocaleString()}</div><div class="ending-stat-label">${t('endingBribeFundsAccepted')}</div></div>`;
  document.getElementById('ending-verdict').innerHTML=`<span style="color:${verdictStyle}">${verdict}</span>`;
  document.getElementById('ending-realworld').innerHTML=`
    <strong style="color:var(--accent);letter-spacing:2px;font-size:11px;font-family:var(--font-ui);font-weight:700;">${t('realWorldParallelHeading')}</strong><br><br>
    ${t('realWorldParallelText')}`;
  document.getElementById('ending-screen').style.display='flex';
}
