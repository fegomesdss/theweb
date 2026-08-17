// ===========================
// NETWORK DRAWING — the investigation board
// ===========================
function getNodePos(node) {
  const svg = document.getElementById('network-svg');
  const r = svg.getBoundingClientRect();
  return { x:node.x*r.width, y:node.y*r.height };
}

function nodeStrokeColor(node) {
  if (node.type==='player') return '#b7231c';
  if (!state.revealedNodes.includes(node.id)) return '#d8d5cc';
  if (state.archived.includes(node.id)) return '#d8d5cc';
  if (state.accusations.includes(node.id)) return node.corrupt ? '#b7231c' : '#2f8f4e';
  const conf = getConfidence(node.id);
  if (conf.pct >= ACCUSE_THRESHOLD) return '#1f5f8b';
  if (conf.pct > 0) return '#4a7fa0';
  return '#9a978c';
}

function getNodeIcon(type) {
  return {player:'◈',politician:'★',police:'⬟',business:'◆',legal:'⚖',press:'✎'}[type]||'●';
}

function drawNetwork() {
  const svg = document.getElementById('network-svg');
  const r = svg.getBoundingClientRect();
  if (r.width===0) { setTimeout(drawNetwork,80); return; }
  svg.innerHTML = '';

  const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
  defs.innerHTML = `<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#1a1a1a" flood-opacity="0.25"/></filter><clipPath id="nodeClip" clipPathUnits="userSpaceOnUse"><circle r="17" cx="0" cy="0"/></clipPath>`;
  svg.appendChild(defs);

  // Edges — thin ink lines connecting revealed, mapped nodes
  NODES.forEach(node => {
    if (!state.revealedNodes.includes(node.id)) return;
    node.connections.forEach(cId => {
      if (!state.revealedNodes.includes(cId)) return;
      const ek = [node.id,cId].sort().join('-');
      if (!state.revealedEdges.includes(ek)) return;
      const target = NODES.find(n=>n.id===cId);
      if (!target) return;
      const p1=getNodePos(node), p2=getNodePos(target);
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1',p1.x); line.setAttribute('y1',p1.y);
      line.setAttribute('x2',p2.x); line.setAttribute('y2',p2.y);
      line.setAttribute('stroke','#c9c5b8'); line.setAttribute('stroke-width','1.2');
      line.setAttribute('opacity','0.7');
      svg.appendChild(line);
    });
  });

  // Nodes — index cards pinned to the board
  NODES.forEach(node => {
    const revealed = state.revealedNodes.includes(node.id);
    const pos = getNodePos(node);
    const color = nodeStrokeColor(node);
    const conf = getConfidence(node.id);
    const isSelected = state.selectedNode===node.id;
    const isPlayer = node.type==='player';
    const accused = state.accusations.includes(node.id);
    const isBribed = state.bribedNodes.includes(node.id);

    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('transform',`translate(${pos.x},${pos.y})`);
    g.dataset.nodeId = node.id;
    if (revealed && !isPlayer) {
      g.style.cursor='pointer';
      g.addEventListener('click',()=>selectNode(node.id));
      g.addEventListener('mouseenter',e=>showTooltip(e,node));
      g.addEventListener('mouseleave',hideTooltip);
    }

    // Selection ring
    if (isSelected && revealed) {
      const ring = document.createElementNS('http://www.w3.org/2000/svg','circle');
      ring.setAttribute('r','28'); ring.setAttribute('fill','none');
      ring.setAttribute('stroke',color); ring.setAttribute('stroke-width','1');
      ring.setAttribute('opacity','0.45'); ring.setAttribute('stroke-dasharray','3 2');
      g.appendChild(ring);
    }

    // Confidence fill (neutral — doesn't signal guilt direction)
    if (revealed && !accused && conf.pct > 0) {
      const fc = document.createElementNS('http://www.w3.org/2000/svg','circle');
      fc.setAttribute('r','18'); fc.setAttribute('fill','#3a382f');
      fc.setAttribute('opacity',(conf.pct/100*0.18).toString());
      g.appendChild(fc);
    }

    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('r',isPlayer?'20':'18');
    circle.setAttribute('fill','#ffffff');
    circle.setAttribute('stroke',color);
    circle.setAttribute('stroke-width',isSelected?'2.5':'1.5');
    circle.setAttribute('filter','url(#glow)');
    g.appendChild(circle);

    const portraitUrl = (revealed && !isPlayer) ? PORTRAITS[node.id] : null;
    if (portraitUrl) {
      // Portrait fills the circle, framed by the coloured stroke drawn above
      const img = document.createElementNS('http://www.w3.org/2000/svg','image');
      img.setAttribute('href', portraitUrl);
      img.setAttribute('x','-17'); img.setAttribute('y','-17');
      img.setAttribute('width','34'); img.setAttribute('height','34');
      img.setAttribute('preserveAspectRatio','xMidYMid slice');
      img.setAttribute('clip-path','url(#nodeClip)');
      img.style.filter = 'grayscale(100%) contrast(1.05)';
      g.appendChild(img);
    } else {
      const icon = document.createElementNS('http://www.w3.org/2000/svg','text');
      icon.setAttribute('text-anchor','middle'); icon.setAttribute('dominant-baseline','central');
      icon.setAttribute('font-size','13'); icon.setAttribute('fill',revealed?color:'#c9c5b8');
      icon.setAttribute('font-family','Inter, sans-serif');
      icon.textContent = revealed ? getNodeIcon(node.type) : '?';
      g.appendChild(icon);
    }

    const label = document.createElementNS('http://www.w3.org/2000/svg','text');
    label.setAttribute('text-anchor','middle'); label.setAttribute('y','30');
    label.setAttribute('font-size','10'); label.setAttribute('font-family','Inter, sans-serif'); label.setAttribute('font-weight','600');
    label.setAttribute('fill',revealed?'#1a1a1a':'#c9c5b8');
    label.textContent = revealed ? node.name : t('unknownBracket');
    g.appendChild(label);

    const role = document.createElementNS('http://www.w3.org/2000/svg','text');
    role.setAttribute('text-anchor','middle'); role.setAttribute('y','42');
    role.setAttribute('font-size','9'); role.setAttribute('font-family','Inter, sans-serif');
    role.setAttribute('fill','#6b6b63');
    role.textContent = revealed ? node.role : '';
    g.appendChild(role);

    // Padlock for bribed nodes
    if (revealed && isBribed && !accused) {
      const lockBg = document.createElementNS('http://www.w3.org/2000/svg','circle');
      lockBg.setAttribute('cx','13'); lockBg.setAttribute('cy','-13');
      lockBg.setAttribute('r','8'); lockBg.setAttribute('fill','#ffffff');
      lockBg.setAttribute('stroke','#b7231c'); lockBg.setAttribute('stroke-width','1');
      g.appendChild(lockBg);
      const lock = document.createElementNS('http://www.w3.org/2000/svg','text');
      lock.setAttribute('x','13'); lock.setAttribute('y','-9');
      lock.setAttribute('text-anchor','middle'); lock.setAttribute('dominant-baseline','central');
      lock.setAttribute('font-size','9'); lock.setAttribute('fill','#b7231c');
      lock.textContent = '🔒';
      g.appendChild(lock);
    }

    svg.appendChild(g);
  });
}

function showTooltip(e, node) {
  const t = document.getElementById('node-tooltip');
  const conf = getConfidence(node.id);
  const accused = state.accusations.includes(node.id);
  t.innerHTML = `<strong style="color:var(--ink);font-family:var(--font-ui);font-size:14px;font-weight:700;letter-spacing:0.3px;">${node.name}</strong><br>
    <span style="color:var(--text-dim)">${node.role}</span><br>
    ${t('confidenceLabelTooltip', conf.pct)}
    ${accused?`<br><span style="color:var(--text-dim)">${t('caseFiledTooltip')}</span>`:''}`;
  t.style.display='block';
  t.style.left=(e.clientX+14)+'px';
  t.style.top=(e.clientY-28)+'px';
}
function hideTooltip() { document.getElementById('node-tooltip').style.display='none'; }

// ===========================
// NODE SELECTION
// ===========================
function selectNode(nodeId) {
  state.selectedNode = nodeId;
  drawNetwork();
  updateIntelPanel(nodeId);
  updateBottomBar();
}

// ===========================
// NODE REVEAL ANIMATION — cinematic dossier card
// ===========================
function animateNodeReveal(node, onDismiss) {
  nodeRevealCallback = onDismiss || null;

  // Populate card
  document.getElementById('nr-name').textContent = node.name;
  document.getElementById('nr-role').textContent = node.role;
  document.getElementById('nr-intel').textContent = node.intel;

  // Portrait
  const portraitInner = document.getElementById('nr-portrait-inner');
  const portraitId = document.getElementById('nr-portrait-id');
  const url = PORTRAITS[node.id];
  if (url) {
    portraitInner.innerHTML = `<img src="${url}" alt="${node.name}">`;
    portraitId.textContent = node.name.split(' ')[0];
  } else {
    portraitInner.innerHTML = `<svg viewBox="0 0 72 90" width="72" height="90" xmlns="http://www.w3.org/2000/svg">
      <rect width="72" height="90" fill="#ececE5"/>
      <circle cx="36" cy="30" r="14" fill="#d8d5cc"/>
      <ellipse cx="36" cy="72" rx="22" ry="18" fill="#d8d5cc"/>
      <text x="36" y="48" text-anchor="middle" font-family="sans-serif" font-size="6" fill="#6b6b63" letter-spacing="1">${t('noPhotoSvgLine1')}</text>
      <text x="36" y="56" text-anchor="middle" font-family="sans-serif" font-size="6" fill="#6b6b63" letter-spacing="1">${t('noPhotoSvgLine2')}</text>
    </svg>`;
    portraitId.textContent = t('filePendingLabel');
  }

  // Connection dots
  const connList = document.getElementById('nr-conn-list');
  connList.innerHTML = '';
  node.connections.slice(0,4).forEach(cId => {
    const cn = NODES.find(n=>n.id===cId);
    if (!cn) return;
    const revealed = state.revealedNodes.includes(cId);
    const item = document.createElement('div');
    item.className = 'nr-conn-item';
    const dot = document.createElement('div');
    dot.className = 'nr-conn-dot';
    dot.style.background = revealed ? 'var(--accent)' : 'var(--rule)';
    const label = document.createElement('span');
    label.textContent = revealed ? cn.name : t('unknownParen');
    item.appendChild(dot);
    item.appendChild(label);
    connList.appendChild(item);
  });

  // Footer tag based on node type
  const typeLabels = {politician:t('typeLabelPublicOfficial'),police:t('typeLabelLawEnforcement'),business:t('typeLabelPrivateSector'),legal:t('typeLabelJudiciary'),press:t('typeLabelPress'),player:'—'};
  document.getElementById('nr-footer-tag').textContent = typeLabels[node.type] || node.type;

  // Draw pulse rings on the SVG at the node's position
  drawPulseRings(node);

  // Show overlay
  const el = document.getElementById('node-reveal');
  el.style.display = 'block';
  // Trigger CSS transitions on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { el.classList.add('active'); });
  });
}

function drawPulseRings(node) {
  const svg = document.getElementById('network-svg');
  const pos = getNodePos(node);

  [0, 1, 2].forEach((i) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', pos.x);
    circle.setAttribute('cy', pos.y);
    circle.setAttribute('r', '18');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', '#b7231c');
    circle.setAttribute('stroke-width', '1.5');
    circle.style.animationDelay = `${i * 0.25}s`;
    circle.classList.add('nr-pulse-ring');
    if (i === 1) circle.classList.add('nr-pulse-ring-2');
    if (i === 2) circle.classList.add('nr-pulse-ring-3');
    svg.appendChild(circle);
    // Remove after animation completes
    setTimeout(() => { if (circle.parentNode) circle.parentNode.removeChild(circle); }, 2000);
  });
}

function dismissNodeReveal() {
  const el = document.getElementById('node-reveal');
  el.classList.remove('active');
  setTimeout(() => {
    el.style.display = 'none';
    if (nodeRevealCallback) {
      const cb = nodeRevealCallback;
      nodeRevealCallback = null;
      cb();
    }
  }, 500);
}

// ===========================
// ANIMATED EDGE DRAWING
// ===========================
function animateEdgeDraw(fromId, toId) {
  const svg = document.getElementById('network-svg');
  const fromNode = NODES.find(n=>n.id===fromId);
  const toNode = NODES.find(n=>n.id===toId);
  if (!fromNode || !toNode) return;

  const p1 = getNodePos(fromNode), p2 = getNodePos(toNode);
  const dist = Math.hypot(p2.x-p1.x, p2.y-p1.y);

  // Draw a solid line that animates via stroke-dashoffset
  const line = document.createElementNS('http://www.w3.org/2000/svg','line');
  line.setAttribute('x1',p1.x); line.setAttribute('y1',p1.y);
  line.setAttribute('x2',p2.x); line.setAttribute('y2',p2.y);
  line.setAttribute('stroke','var(--accent)');
  line.setAttribute('stroke-width','1.5');
  line.setAttribute('stroke-dasharray', dist);
  line.setAttribute('stroke-dashoffset', dist);
  line.style.transition = 'stroke-dashoffset 0.7s ease, stroke 0.5s ease 0.7s, opacity 0.5s ease 1.4s';
  svg.appendChild(line);

  // Animate: draw the line, then fade to the normal resting style
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      line.style.strokeDashoffset = '0';
      setTimeout(()=>{
        line.setAttribute('stroke','#c9c5b8');
        line.setAttribute('stroke-dashoffset','0');
        line.style.transition = '';
        line.style.opacity = '0.7';
      }, 800);
      setTimeout(()=>{ if(line.parentNode) line.parentNode.removeChild(line); drawNetwork(); }, 1400);
    });
  });
}

window.addEventListener('resize',()=>{
  if(document.getElementById('intro-screen').style.display==='none') drawNetwork();
});
