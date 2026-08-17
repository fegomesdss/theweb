// ===========================
// FIRST-RUN TUTORIAL — spotlight + coachmark walkthrough
// Observes real clicks; never calls game functions itself, so it can
// never desync from actual game state.
// ===========================
const TUTORIAL_STEPS = [
  { id:'welcome', target:null,
    title:'Welcome, Investigator',
    text:'You are building a corruption case against a network of officials. Follow leads, weigh evidence, and know when you have enough to act.',
    advance:'next' },
  { id:'pick-case', target:'#case-list .case-card:first-child',
    title:'Open your first case file',
    text:'Click the highlighted case to select your first target.',
    advance:'click' },
  { id:'investigate', target:'#btn-investigate',
    title:'Choose how to dig',
    text:'Click Investigate, then pick a method — Financial, Witness, or Surveillance.',
    advance:'click' },
  { id:'method', target:'.method-option', targetAll:true,
    title:'Each method has trade-offs',
    text:'Financial evidence is reliable but raises Heat. Witnesses are fast but unreliable. Surveillance raises Exposure.',
    advance:'click' },
  { id:'reliability', target:'#rel-bar',
    title:'Judge the evidence',
    text:'Not everything you find is solid. Check the reliability bar on every piece of evidence before trusting it.',
    advance:'next', waitMs:8000 },
  { id:'confidence', target:'#right-panel .confidence-section',
    title:'Track your confidence',
    text:'This panel tallies how strong your case is by category. Build it up before you accuse.',
    advance:'next', waitMs:4000 },
  { id:'accuse', target:'#zone-accuse',
    title:'File charges or archive',
    text:'Once confidence crosses the threshold, Accuse becomes available. If a case runs cold, Archive it instead.',
    advance:'next', waitMs:6000 },
  { id:'meters', target:'.meter-wrap',
    title:'Watch your resources',
    text:'Integrity, Heat, and Exposure track the risk of your investigation. Manage them — they can end your case early.',
    advance:'done', waitMs:2000 },
];

let tutorialIndex = 0;
let tutorialCleanup = null;
let tutorialWaitTimer = null;

function maybeStartTutorial() {
  if (!localStorage.getItem('theweb_tutorial_done')) {
    setTimeout(startTutorial, 1200);
  }
}

function startTutorial() {
  tutorialIndex = 0;
  document.getElementById('tutorial-overlay').classList.add('active');
  runTutorialStep();
}

function skipTutorial() { endTutorial(); }

function endTutorial() {
  cleanupTutorialStep();
  const overlay = document.getElementById('tutorial-overlay');
  overlay.classList.remove('active');
  overlay.innerHTML = '';
  localStorage.setItem('theweb_tutorial_done', '1');
}

function cleanupTutorialStep() {
  if (tutorialCleanup) { tutorialCleanup(); tutorialCleanup = null; }
  if (tutorialWaitTimer) { clearTimeout(tutorialWaitTimer); tutorialWaitTimer = null; }
}

function runTutorialStep() {
  cleanupTutorialStep();
  const step = TUTORIAL_STEPS[tutorialIndex];
  if (!step) { endTutorial(); return; }
  waitForStepTarget(step, (el) => renderTutorialStep(step, el));
}

function isTutorialTargetVisible(el) {
  const r = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  return r.width > 0 && r.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
}

function waitForStepTarget(step, cb) {
  if (!step.target) { cb(null); return; }
  const find = () => {
    const el = document.querySelector(step.target);
    return (el && isTutorialTargetVisible(el)) ? el : null;
  };
  const found = find();
  if (found) { cb(found); return; }
  const start = Date.now();
  const maxWait = step.waitMs || 6000;
  const poll = () => {
    const el = find();
    if (el) { cb(el); return; }
    if (Date.now() - start > maxWait) { cb(null); return; }
    tutorialWaitTimer = setTimeout(poll, 250);
  };
  poll();
}

function renderTutorialStep(step, el) {
  const overlay = document.getElementById('tutorial-overlay');
  overlay.innerHTML = '';

  const hole = document.createElement('div');
  hole.className = el ? 'tutorial-hole' : 'tutorial-hole centered';
  overlay.appendChild(hole);
  if (el) positionHole(hole, el);

  const mark = document.createElement('div');
  mark.className = 'tutorial-coachmark';

  const total = TUTORIAL_STEPS.length;
  const cueHtml = (step.advance === 'click') ? `<div class="tutorial-cue">${t('tutorialClickCue')}</div>` : '';
  const btnLabel = step.advance === 'done' ? t('tutorialStart') : (step.advance === 'click' ? '' : t('tutorialNext'));

  mark.innerHTML = `
    <div class="tutorial-step-count">${t('tutorialStepCount', tutorialIndex+1, total)}</div>
    <div class="tutorial-title">${step.title}</div>
    <div class="tutorial-text">${step.text}</div>
    ${cueHtml}
    <div class="tutorial-actions">
      <button class="tutorial-skip" type="button">${t('tutorialSkip')}</button>
      ${btnLabel ? `<button class="tutorial-next" type="button">${btnLabel}</button>` : '<span></span>'}
    </div>
  `;
  overlay.appendChild(mark);

  if (el) positionCoachmark(mark, el);
  else { mark.style.top='50%'; mark.style.left='50%'; mark.style.transform='translate(-50%,-50%)'; }

  mark.querySelector('.tutorial-skip').addEventListener('click', skipTutorial);
  const nextBtn = mark.querySelector('.tutorial-next');
  const advanceHandler = () => { tutorialIndex++; runTutorialStep(); };
  if (nextBtn) nextBtn.addEventListener('click', advanceHandler);

  let cleanupFns = [];

  if (step.advance === 'click' && el) {
    const targets = step.targetAll ? Array.from(document.querySelectorAll(step.target)) : [el];
    targets.forEach(t => t.addEventListener('click', advanceHandler));
    cleanupFns.push(() => targets.forEach(t => t.removeEventListener('click', advanceHandler)));
  }

  if (el) {
    const reposition = () => { positionHole(hole, el); positionCoachmark(mark, el); };
    window.addEventListener('resize', reposition);
    cleanupFns.push(() => window.removeEventListener('resize', reposition));
  }

  tutorialCleanup = () => cleanupFns.forEach(fn => fn());
}

function positionHole(hole, el) {
  const r = el.getBoundingClientRect();
  const pad = 8;
  hole.style.top = (r.top - pad) + 'px';
  hole.style.left = (r.left - pad) + 'px';
  hole.style.width = (r.width + pad*2) + 'px';
  hole.style.height = (r.height + pad*2) + 'px';
}

function positionCoachmark(mark, el) {
  mark.style.top = '-9999px'; mark.style.left = '-9999px'; mark.style.transform = 'none';
  const r = el.getBoundingClientRect();
  const mw = mark.offsetWidth || 320, mh = mark.offsetHeight || 160;
  const vw = window.innerWidth, vh = window.innerHeight;
  const spaceBelow = vh - r.bottom, spaceAbove = r.top;
  let top;
  if (spaceBelow > mh + 24) top = r.bottom + 16;
  else if (spaceAbove > mh + 24) top = r.top - mh - 16;
  else top = Math.max(16, (vh - mh) / 2);
  let left = r.left + r.width/2 - mw/2;
  left = Math.max(16, Math.min(left, vw - mw - 16));
  top = Math.max(16, Math.min(top, vh - mh - 16));
  mark.style.top = top + 'px';
  mark.style.left = left + 'px';
}
