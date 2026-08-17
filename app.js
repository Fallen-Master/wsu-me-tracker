/* ============================================================
   SHARED LOGIC — used by every page.
   State (check-offs, your added classes, your semester plan)
   lives in this browser's local storage.
   ============================================================ */
const STORE_KEY = 'rafael-wsu-tracker-v2';
let state = load();
if(!state.custom) state.custom = [];
if(!state.checks) state.checks = {};

function load(){ try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }catch(e){ return {}; } }
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){} }

const CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const DOT   = '<svg width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="#fff"/></svg>';
const MARK  = st => st === 'completed' ? CHECK : (st === 'progress' ? DOT : '');
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $ = id => document.getElementById(id);

function allCourses(){ return DATA.courses.concat(state.custom); }
function courseById(id){ return allCourses().find(c => c.id === id); }

/* ---- three-state status: needed -> progress -> completed ---- */
const STATES = ['needed','progress','completed'];
function effStatus(c){
  const s = state.checks[c.id];
  if(typeof s === 'string' && STATES.includes(s)) return s;
  if(s === true)  return 'completed';
  if(s === false) return 'needed';
  return c.status;
}
function isDone(c){ return effStatus(c) === 'completed'; }
function cycleStatus(c, after){
  state.checks[c.id] = STATES[(STATES.indexOf(effStatus(c)) + 1) % STATES.length];
  save(); if(after) after();
}

/* ============================================================
   PROGRESS — requirement-based, capped per bucket, ÷ 128
   ============================================================ */
let MODE = 'progress';   // 'progress' counts in-progress classes (matches the WSU portal)

function bucketStats(){
  const out = {};
  DATA.buckets.forEach(b => out[b.id] = {...b, done:0, prog:0, needed:0});
  allCourses().forEach(c => {
    if(!c.applies || !c.bucket || !out[c.bucket]) return;
    const cr = Number(c.credits) || 0, s = effStatus(c);
    if(s === 'completed')     out[c.bucket].done += cr;
    else if(s === 'progress') out[c.bucket].prog += cr;
    else                      out[c.bucket].needed += cr;
  });
  DATA.buckets.forEach(b => {
    const o = out[b.id];
    o.doneCapped = Math.min(o.done, o.req);
    o.progCapped = Math.min(o.prog, Math.max(0, o.req - o.doneCapped));
  });
  return out;
}
function computeProgress(){
  const st = bucketStats();
  let done = 0, prog = 0;
  DATA.buckets.forEach(b => { done += st[b.id].doneCapped; prog += st[b.id].progCapped; });
  const counted = MODE === 'progress' ? done + prog : done;
  return {done, prog, counted, pct: Math.min(100, Math.round(counted/DATA.totalCredits*100)),
          remaining: Math.max(0, DATA.totalCredits - counted), st};
}
function earnedAllCredits(){
  const extras = DATA.extras.reduce((s,e)=>s+(Number(e.credits)||0),0);
  const applying = allCourses().filter(c => c.applies && effStatus(c)==='completed')
    .reduce((s,c)=>s+(Number(c.credits)||0),0);
  const nonApplying = allCourses().filter(c => !c.applies && effStatus(c)==='completed')
    .reduce((s,c)=>s+(Number(c.credits)||0),0);
  return {applying, notApplying: extras + nonApplying, total: applying + extras + nonApplying};
}
/* credits of actual classes still to sit through (can exceed requirement credits) */
function classCreditsLeft(){
  return allCourses().filter(c => c.applies && effStatus(c) !== 'completed')
    .reduce((s,c)=>s+(Number(c.credits)||0),0);
}

/* ============================================================
   PLAN
   ============================================================ */
function getPlan(){
  if(!Array.isArray(state.plan)){
    const seed = Array.isArray(DATA.planSeed) ? DATA.planSeed : [];
    state.plan = JSON.parse(JSON.stringify(seed));
  }
  state.plan = state.plan.filter(t => t && typeof t === 'object').map(t => ({
    ...t,
    name: t.name || 'Untitled semester',
    courses: Array.isArray(t.courses) ? t.courses.filter(id => courseById(id)) : []
  }));
  return state.plan;
}
function unplannedCourses(){
  const inPlan = new Set();
  getPlan().forEach(t => t.courses.forEach(id => inPlan.add(id)));
  return allCourses().filter(c => c.applies && effStatus(c) !== 'completed' && !inPlan.has(c.id));
}
function termCredits(t){
  return t.courses.map(courseById).filter(Boolean)
    .filter(c => effStatus(c) !== 'completed')
    .reduce((s,c) => s + (Number(c.credits)||0), 0);
}
/* the next semester that still has unfinished work */
function nextTerm(){ return getPlan().find(t => termCredits(t) > 0) || null; }
function gradTerm(){
  const active = getPlan().filter(t => termCredits(t) > 0);
  return active[active.length - 1] || null;
}

/* ============================================================
   SHARED RENDERERS
   ============================================================ */
function renderNav(current){
  const pages = [
    {href:'index.html',     label:'Overview'},
    {href:'courses.html',   label:'Courses'},
    {href:'planner.html',   label:'Planner'},
    {href:'checklist.html', label:'To-Do'},
  ];
  const el = $('nav');
  if(el) el.innerHTML = pages.map(p =>
    `<a href="${p.href}" class="${p.href===current?'on':''}">${p.label}</a>`).join('');
}

function renderRing(){
  const p = computeProgress(), circ = 314.16;
  const fill = $('ringFill'); if(!fill) return;
  fill.style.strokeDashoffset = circ - (circ * p.pct / 100);
  $('ringPct').textContent = p.pct + '%';
  const note = MODE === 'progress'
    ? "includes classes you're taking now — the number WSU's transfer portal shows"
    : 'finished and confirmed credits only';
  $('motiv').innerHTML =
    `<b>${p.counted} of ${DATA.totalCredits} required credits filled.</b>` +
    `<span class="sub">${p.remaining} credits of requirements left · ${note}</span>`;
}

function renderBuckets(targetId){
  const el = $(targetId); if(!el) return;
  const st = bucketStats();
  el.innerHTML = DATA.buckets.map(b=>{
    const o = st[b.id];
    const donePct = o.req ? (o.doneCapped / o.req * 100) : 0;
    const progPct = o.req ? (o.progCapped / o.req * 100) : 0;
    const filled  = o.doneCapped + o.progCapped;
    const left    = Math.max(0, o.req - filled);
    return `<div class="card bkt ${left===0?'full':''}">
      <div class="bkt-head">
        <div class="bkt-name">${esc(b.name)}${left===0?' ✓':''}</div>
        <div class="bkt-num"><b>${filled}</b> / ${o.req} cr</div>
      </div>
      <div class="bkt-blurb">${esc(b.blurb)}</div>
      <div class="bar">
        <div class="fill" style="width:${donePct}%"></div>
        <div class="fill prog" style="width:${progPct}%"></div>
      </div>
      <div class="bkt-foot">
        <span>${o.doneCapped} done${o.progCapped?` · ${o.progCapped} in progress`:''}</span>
        <span>${left===0?'Requirement satisfied':`${left} cr still needed`}</span>
      </div>
    </div>`;
  }).join('');
}

function renderModeToggle(after){
  document.querySelectorAll('#mode button').forEach(b=>{
    b.onclick = ()=>{
      MODE = b.dataset.mode;
      document.querySelectorAll('#mode button').forEach(x=>x.classList.toggle('on', x===b));
      renderRing(); if(after) after();
    };
  });
}

function renderFoot(){
  const el = $('foot'); if(!el) return;
  const p = computeProgress(), e = earnedAllCredits();
  el.innerHTML =
    `${p.counted} of ${DATA.totalCredits} required credits · ${e.total} total credits earned · Overall GPA ${DATA.stats.gpaOverall}<br>` +
    `${DATA.program} · catalog ${DATA.catalogYear}<br>` +
    `You're not behind. You're building this on your own terms. Keep going. 💪`;
}

function wireReset(){
  const b = $('resetBtn'); if(!b) return;
  b.onclick = ()=>{
    if(confirm('This clears your check-offs, any classes you added, and your semester plan — on this device only. data.js is not affected. Continue?')){
      localStorage.removeItem(STORE_KEY); location.reload();
    }
  };
}
