const CATEGORIES = [
  { id: 'sport', name: '運動', bg: '#4f8fe0', fg: '#ffffff', thumb: 'rgba(255,255,255,.22)' },
  { id: 'life', name: '生活', bg: '#ffffff', fg: '#1f2328', thumb: 'rgba(0,0,0,.06)' },
  { id: 'edu', name: '教育', bg: '#d6c69e', fg: '#3b3020', thumb: 'rgba(0,0,0,.07)' },
  { id: 'health', name: '健康', bg: '#bfe3c6', fg: '#1d3b25', thumb: 'rgba(0,0,0,.07)' },
  { id: 'fun', name: '娛樂', bg: '#d9ccf2', fg: '#2e2445', thumb: 'rgba(0,0,0,.07)' },
  { id: 'other', name: '其他', bg: '#e3e6ea', fg: '#1f2328', thumb: 'rgba(0,0,0,.06)' },
];

const FREQS = [
  { id: 'daily', name: '每天', days: [1, 2, 3, 4, 5, 6, 7] },
  { id: 'weekly', name: '每週一次', days: [1, 2, 3, 4, 5, 6, 7] },
  { id: 'weekdays', name: '週間', days: [1, 2, 3, 4, 5] },
  { id: 'weekend', name: '週末', days: [6, 7] },
  { id: 'mwf', name: '一三五', days: [1, 3, 5] },
  { id: 'tts', name: '二四六', days: [2, 4, 6] },
];

const svg = body => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

const THUMBS = {
  water: { name: '喝水', svg: svg('<path d="M12 3.5s-6 6.8-6 10.8a6 6 0 0 0 12 0c0-4-6-10.8-6-10.8z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>') },
  bike: { name: '騎單車', svg: svg('<circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="M5.5 16.5 9 9h6l3.5 7.5M9 9l3 7.5h-6.5M8 6h3M15 9l-1.5-3H16"/>') },
  run: { name: '跑步', svg: svg('<circle cx="15" cy="4.5" r="2"/><path d="M7 21l3.5-5.5 3 2.5v3M5 11.5 8.5 8l4.5 1 2.5 3.5H19M10.5 15.5 13 9"/>') },
  study: { name: '學習', svg: svg('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5V5.5M20 18v3H6.5M8.5 7.5h7M8.5 11h5"/>') },
  swim: { name: '游泳', svg: svg('<circle cx="17" cy="6.5" r="2"/><path d="M5.5 12.5 9.5 8.5l3.5 3.5M2.5 16.5c2 0 2-1.5 4-1.5s2.3 1.5 4.5 1.5 2.3-1.5 4.5-1.5 2 1.5 4 1.5M2.5 20.5c2 0 2-1.5 4-1.5s2.3 1.5 4.5 1.5 2.3-1.5 4.5-1.5 2 1.5 4 1.5"/>') },
  pill: { name: '吃藥', svg: svg('<rect x="2.8" y="8.8" width="18.4" height="6.4" rx="3.2" transform="rotate(-45 12 12)"/><path d="M9.7 9.7l4.6 4.6"/>') },
  exercise: { name: '運動', svg: svg('<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>') },
  movie: { name: '電影', svg: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7.5 5v14M16.5 5v14M3 9.5h4.5M3 14.5h4.5M16.5 9.5H21M16.5 14.5H21"/>') },
  other: { name: '其他', svg: svg('<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16 9.7"/>') },
};

const UI = {
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  back: svg('<path d="M15 5l-7 7 7 7"/>'),
  copy: svg('<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>'),
  trash: svg('<path d="M4 6.5h16M9.5 6.5V4.5h5v2M6.5 6.5l1 13a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4l1-13M10 10.5v6.5M14 10.5v6.5"/>'),
  check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  image: svg('<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16l-5-5-8.5 8.5"/>'),
  more: svg('<circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/>'),
  download: svg('<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15"/>'),
  upload: svg('<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4.5 19.5h15"/>'),
  calendar: svg('<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2"/>'),
  chevron: svg('<path d="M9 5l7 7-7 7"/>'),
  bell: svg('<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/>'),
};

const db = (() => {
  let conn;
  const open = () => conn || (conn = new Promise((res, rej) => {
    const r = indexedDB.open('todoapp', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('tasks', { keyPath: 'id' });
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  }));
  const run = async (mode, fn) => {
    const d = await open();
    return new Promise((res, rej) => {
      const t = d.transaction('tasks', mode);
      const req = fn(t.objectStore('tasks'));
      t.oncomplete = () => res(req.result);
      t.onerror = () => rej(t.error);
    });
  };
  return {
    all: () => run('readonly', s => s.getAll()),
    put: task => run('readwrite', s => s.put(task)),
    del: id => run('readwrite', s => s.delete(id)),
  };
})();

const pad = n => String(n).padStart(2, '0');
const dayKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const isoDow = d => d.getDay() || 7;
const mondayKey = d => { const m = new Date(d); m.setDate(d.getDate() - isoDow(d) + 1); return dayKey(m); };
const newId = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const catOf = t => CATEGORIES.find(c => c.id === t.category) || CATEGORIES[CATEGORIES.length - 1];
const freqOf = t => FREQS.find(f => f.id === t.freq) || FREQS[0];
const thumbOf = t => THUMBS[t.thumb] || THUMBS.other;
const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, p) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * p)).join(',')})`;
const RED = [229, 72, 77];

function isDueToday(t, now = new Date()) {
  if (!freqOf(t).days.includes(isoDow(now))) return false;
  if (!t.doneDate) return true;
  if (t.freq === 'weekly') return t.doneDate < mondayKey(now);
  return t.doneDate !== dayKey(now);
}

const byOrder = (a, b) => a.order - b.order || a.createdAt - b.createdAt;
const todayTasks = () => tasks.filter(t => isDueToday(t)).sort(byOrder);

let tasks = [];
let urls = [];
let closeOpenCard = null;
let lastDay = dayKey(new Date());
const app = document.getElementById('app');

const objUrl = blob => { const u = URL.createObjectURL(blob); urls.push(u); return u; };
const releaseUrls = () => { urls.forEach(u => URL.revokeObjectURL(u)); urls = []; };

function go(path) { history.pushState({ inApp: true }, '', '#' + path); route(); }
function back() {
  if (history.state && history.state.inApp) history.back();
  else { history.replaceState(null, '', '#/'); route(); }
}

function route() {
  if (updatePending && onListView()) { location.reload(); return; }
  releaseUrls();
  closeOpenCard = null;
  const h = location.hash.slice(1);
  if (h === '/new') renderNew();
  else if (h === '/menu') renderMenu();
  else if (h === '/week') renderWeek();
  else if (h.startsWith('/task/')) renderDetail(decodeURIComponent(h.slice(6)));
  else renderList();
  updateBadge();
}

let toastTimer;
function toast(msg, actLabel, act) {
  const el = document.getElementById('toast');
  const btn = document.getElementById('toast-act');
  document.getElementById('toast-msg').textContent = msg;
  btn.hidden = !actLabel;
  btn.textContent = actLabel || '';
  btn.onclick = () => { el.hidden = true; act && act(); };
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 4000);
}

function updateBadge() {
  if (!('setAppBadge' in navigator)) return;
  const n = todayTasks().length;
  (n ? navigator.setAppBadge(n) : navigator.clearAppBadge()).catch(() => {});
}

const canAskBadge = () => 'setAppBadge' in navigator && 'Notification' in window && Notification.permission === 'default'
  && (navigator.standalone || matchMedia('(display-mode: standalone)').matches);

function thumbHTML(t, cls = 'thumb') {
  return `<div class="${cls}" style="background:${catOf(t).thumb}">${thumbOf(t).svg}</div>`;
}

function renderList() {
  const list = todayTasks();
  const now = new Date();
  const week = '日一二三四五六'[now.getDay()];
  app.innerHTML = `
    <section class="view">
      <header class="bar">
        <div>
          <div class="date">${now.getMonth() + 1}月${now.getDate()}日 星期${week}</div>
          <h1>今天 <span class="count">${list.length}</span></h1>
        </div>
        <div class="bar-actions">
          ${canAskBadge() ? `<button class="icon-btn" id="badge" aria-label="開啟圖示數字">${UI.bell}</button>` : ''}
          <button class="icon-btn" id="menu" aria-label="更多功能">${UI.more}</button>
          <button class="icon-btn primary" id="add" aria-label="新增">${UI.plus}</button>
        </div>
      </header>
      <div class="list" id="list">
        ${list.length ? list.map(slotHTML).join('') : '<div class="empty">今天的事項都完成了</div>'}
      </div>
    </section>`;
  document.getElementById('add').onclick = () => go('/new');
  document.getElementById('menu').onclick = () => go('/menu');
  const badgeBtn = document.getElementById('badge');
  if (badgeBtn) badgeBtn.onclick = async () => {
    await Notification.requestPermission();
    badgeBtn.remove();
    updateBadge();
  };
  app.querySelectorAll('.slot').forEach(el => bindSwipe(el, tasks.find(t => t.id === el.dataset.id)));
}

function slotHTML(t) {
  const c = catOf(t);
  return `
    <div class="slot" data-id="${esc(t.id)}">
      <div class="under"><button class="done-btn" type="button">${UI.check}<span>完成</span></button></div>
      <div class="card" style="background-color:${c.bg};color:${c.fg}">
        ${thumbHTML(t)}
        <div class="info">
          <div class="title">${esc(t.title)}</div>
          <div class="meta">${c.name} · ${freqOf(t).name}</div>
        </div>
      </div>
    </div>`;
}

function bindSwipe(slot, task) {
  const card = slot.querySelector('.card');
  const under = slot.querySelector('.under');
  const cat = catOf(task);
  const base = hexRgb(cat.bg);
  const OPEN = 104;
  let x = 0, startX = 0, startY = 0, startOffset = 0, tracking = false, axis = null, moved = false, samples = [];

  const set = (nx, animate) => {
    x = nx;
    card.style.transition = animate ? 'transform .25s ease, background-color .25s ease, color .25s ease' : 'none';
    card.style.transform = `translateX(${x}px)`;
    const p = Math.min(1, Math.max(0, -x / (OPEN * 1.3)));
    card.style.backgroundColor = mix(base, RED, p);
    card.style.color = p > 0.45 ? '#ffffff' : cat.fg;
    under.classList.toggle('show', x < -2);
  };
  const close = () => { set(0, true); if (closeOpenCard === close) closeOpenCard = null; };
  const open = () => {
    if (closeOpenCard && closeOpenCard !== close) closeOpenCard();
    set(-OPEN, true);
    closeOpenCard = close;
  };

  card.addEventListener('pointerdown', e => {
    if (closeOpenCard && closeOpenCard !== close) closeOpenCard();
    tracking = true; axis = null; moved = false;
    startX = e.clientX; startY = e.clientY; startOffset = x;
    samples = [{ x: e.clientX, t: e.timeStamp }];
  });
  card.addEventListener('pointermove', e => {
    if (!tracking) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (!axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      moved = true;
      if (axis === 'x') card.setPointerCapture(e.pointerId);
    }
    if (axis !== 'x') return;
    samples.push({ x: e.clientX, t: e.timeStamp });
    while (samples.length > 2 && e.timeStamp - samples[0].t > 100) samples.shift();
    set(Math.min(0, startOffset + dx), false);
  });
  const end = () => {
    if (!tracking) return;
    tracking = false;
    if (axis !== 'x') return;
    const a = samples[0], b = samples[samples.length - 1];
    const v = (b.x - a.x) / Math.max(1, b.t - a.t);
    if ((v < -0.6 && x < -30) || x < -slot.clientWidth * 0.6) complete(task, slot, card);
    else if (x < -OPEN * 0.6) open();
    else close();
  };
  card.addEventListener('pointerup', end);
  card.addEventListener('pointercancel', end);
  card.addEventListener('click', () => {
    if (moved) return;
    if (x < 0) close();
    else go('/task/' + encodeURIComponent(task.id));
  });
  slot.querySelector('.done-btn').addEventListener('click', () => complete(task, slot, card));
}

async function complete(task, slot, card) {
  const prev = task.doneDate || null;
  task.doneDate = dayKey(new Date());
  card.style.transition = 'transform .22s ease-in, background-color .22s';
  card.style.transform = `translateX(${-slot.clientWidth - 40}px)`;
  card.style.backgroundColor = `rgb(${RED.join(',')})`;
  slot.querySelector('.under').classList.remove('show');
  setTimeout(() => {
    slot.style.height = slot.offsetHeight + 'px';
    slot.getBoundingClientRect();
    slot.classList.add('collapse');
  }, 200);
  setTimeout(() => { if (location.hash.slice(1) === '/' || !location.hash.slice(1)) renderList(); }, 480);
  await db.put(task);
  updateBadge();
  toast(`已完成「${task.title}」`, '復原', async () => {
    task.doneDate = prev;
    await db.put(task);
    route();
  });
}

function chipsHTML(items, active, attr) {
  return items.map(i => `<button type="button" class="chip${i.id === active ? ' active' : ''}" data-${attr}="${i.id}">${i.name}</button>`).join('');
}

function renderNew() {
  const d = { title: '', desc: '', category: 'sport', freq: 'daily', thumb: null, images: [] };
  app.innerHTML = `
    <section class="view">
      <header class="bar sub">
        <button class="icon-btn" id="cancel" aria-label="返回">${UI.back}</button>
        <h2>新增事項</h2>
        <button class="save-btn" id="save" disabled>儲存</button>
      </header>
      <div class="scroll form">
        <label class="field">
          <span class="label">標題<em id="tc">0/10</em></span>
          <input id="title" maxlength="10" placeholder="例如：喝水 300cc" autocomplete="off">
        </label>
        <label class="field">
          <span class="label">說明<em id="dc">0/100</em></span>
          <textarea id="desc" maxlength="100" rows="3" placeholder="選填"></textarea>
        </label>
        <div class="field">
          <span class="label">類別</span>
          <div class="chips" id="cats">${CATEGORIES.map(c => `<button type="button" class="chip cat${c.id === d.category ? ' active' : ''}" data-cat="${c.id}"><i style="background:${c.bg}"></i>${c.name}</button>`).join('')}</div>
        </div>
        <div class="field">
          <span class="label">發生日</span>
          <div class="chips" id="freqs">${chipsHTML(FREQS, d.freq, 'freq')}</div>
        </div>
        <div class="field">
          <span class="label">縮圖<em>未選擇則使用預設</em></span>
          <div class="thumb-grid" id="thumbs">${Object.entries(THUMBS).map(([k, v]) => `<button type="button" class="thumb-opt" data-thumb="${k}">${v.svg}<span>${v.name}</span></button>`).join('')}</div>
        </div>
        <div class="field">
          <span class="label">圖片<em id="ic">0/3</em></span>
          <div class="images" id="imgs"></div>
          <input type="file" id="file" accept="image/*" multiple hidden>
        </div>
      </div>
    </section>`;

  const $ = id => document.getElementById(id);
  const saveBtn = $('save');
  $('cancel').onclick = back;
  $('title').oninput = e => {
    d.title = e.target.value.slice(0, 10);
    $('tc').textContent = `${[...d.title].length}/10`;
    saveBtn.disabled = !d.title.trim();
  };
  $('desc').oninput = e => {
    d.desc = e.target.value.slice(0, 100);
    $('dc').textContent = `${d.desc.length}/100`;
  };
  $('cats').onclick = e => {
    const b = e.target.closest('[data-cat]'); if (!b) return;
    d.category = b.dataset.cat;
    $('cats').querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === b));
  };
  $('freqs').onclick = e => {
    const b = e.target.closest('[data-freq]'); if (!b) return;
    d.freq = b.dataset.freq;
    $('freqs').querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === b));
  };
  $('thumbs').onclick = e => {
    const b = e.target.closest('[data-thumb]'); if (!b) return;
    d.thumb = d.thumb === b.dataset.thumb ? null : b.dataset.thumb;
    $('thumbs').querySelectorAll('.thumb-opt').forEach(c => c.classList.toggle('active', c.dataset.thumb === d.thumb));
  };

  const renderImgs = () => {
    releaseUrls();
    $('ic').textContent = `${d.images.length}/3`;
    $('imgs').innerHTML = d.images.map((b, i) => `<div class="img-tile"><img src="${objUrl(b)}" alt=""><button type="button" class="rm" data-i="${i}" aria-label="移除">${UI.close}</button></div>`).join('')
      + (d.images.length < 3 ? `<button type="button" class="img-tile add" id="addimg" aria-label="加入圖片">${UI.image}</button>` : '');
  };
  $('imgs').onclick = e => {
    const rm = e.target.closest('.rm');
    if (rm) { d.images.splice(+rm.dataset.i, 1); renderImgs(); return; }
    if (e.target.closest('#addimg')) $('file').click();
  };
  $('file').onchange = async e => {
    const files = [...e.target.files].slice(0, 3 - d.images.length);
    e.target.value = '';
    for (const f of files) {
      try { d.images.push(await shrinkImage(f)); } catch { toast('無法讀取圖片'); }
    }
    renderImgs();
  };
  renderImgs();

  saveBtn.onclick = async () => {
    if (!d.title.trim()) return;
    saveBtn.disabled = true;
    const now = Date.now();
    const task = { id: newId(), title: d.title.trim(), desc: d.desc.trim(), category: d.category, freq: d.freq, thumb: d.thumb, images: d.images, order: now, createdAt: now, doneDate: null };
    await db.put(task);
    tasks.push(task);
    back();
  };
}

async function shrinkImage(file, max = 1280) {
  const src = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = src;
    await img.decode();
    const s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const cv = document.createElement('canvas');
    cv.width = Math.round(img.naturalWidth * s);
    cv.height = Math.round(img.naturalHeight * s);
    cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
    return await new Promise((res, rej) => cv.toBlob(b => (b ? res(b) : rej()), 'image/jpeg', 0.85));
  } finally {
    URL.revokeObjectURL(src);
  }
}

function renderDetail(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) { history.replaceState(null, '', '#/'); renderList(); return; }
  const c = catOf(t);
  app.innerHTML = `
    <section class="view">
      <header class="bar sub">
        <button class="icon-btn" id="back" aria-label="回上一頁">${UI.back}</button>
        <span class="grow"></span>
        <button class="icon-btn" id="copy" aria-label="複製">${UI.copy}</button>
        <button class="icon-btn danger" id="del" aria-label="刪除">${UI.trash}</button>
      </header>
      <div class="scroll detail">
        <div class="hero" style="background-color:${c.bg};color:${c.fg}">
          ${thumbHTML(t, 'thumb big')}
          <h2>${esc(t.title)}</h2>
        </div>
        <dl class="props">
          <div><dt>類別</dt><dd><i style="background:${c.bg}"></i>${c.name}</dd></div>
          <div><dt>頻率</dt><dd>${freqOf(t).name}</dd></div>
          <div><dt>縮圖</dt><dd>${thumbOf(t).name}</dd></div>
        </dl>
        ${t.desc ? `<p class="desc">${esc(t.desc)}</p>` : ''}
        ${t.images && t.images.length ? `<div class="gallery">${t.images.map(b => `<img src="${objUrl(b)}" alt="">`).join('')}</div>` : ''}
      </div>
    </section>`;
  document.getElementById('back').onclick = back;
  document.getElementById('copy').onclick = async () => {
    const now = Date.now();
    const copy = { ...t, id: newId(), images: [...(t.images || [])], createdAt: now, doneDate: null };
    await db.put(copy);
    tasks.push(copy);
    updateBadge();
    const n = tasks.filter(x => x.title === t.title && x.category === t.category).length;
    toast(`已複製到列表（共 ${n} 份）`);
  };
  document.getElementById('del').onclick = async () => {
    if (!confirm(`確定要刪除「${t.title}」嗎？刪除後無法復原。`)) return;
    await db.del(t.id);
    tasks = tasks.filter(x => x.id !== t.id);
    back();
  };
  app.querySelectorAll('.gallery img').forEach(img => img.onclick = () => {
    const lb = document.getElementById('lightbox');
    lb.querySelector('img').src = img.src;
    lb.hidden = false;
  });
}

function renderMenu() {
  app.innerHTML = `
    <section class="view">
      <header class="bar sub">
        <button class="icon-btn" id="back" aria-label="返回">${UI.back}</button>
        <h2>更多功能</h2>
        <span class="icon-spacer"></span>
      </header>
      <div class="scroll">
        <div class="menu">
          <button type="button" id="m-week">${UI.calendar}<span>一週總覽</span>${UI.chevron}</button>
        </div>
        <div class="menu-title">資料</div>
        <div class="menu">
          <button type="button" id="m-export">${UI.download}<span>匯出備份</span></button>
          <button type="button" id="m-import">${UI.upload}<span>從備份還原</span></button>
        </div>
        <input type="file" id="import-file" accept=".json,application/json" hidden>
      </div>
    </section>`;
  const $ = id => document.getElementById(id);
  $('back').onclick = back;
  $('m-week').onclick = () => go('/week');
  $('m-export').onclick = exportBackup;
  $('m-import').onclick = () => $('import-file').click();
  $('import-file').onchange = async e => {
    const f = e.target.files[0];
    e.target.value = '';
    if (f) await importBackup(f);
  };
}

function renderWeek() {
  const days = ['一', '二', '三', '四', '五', '六', '日'];
  const today = isoDow(new Date());
  const groups = [];
  const seen = new Map();
  for (const t of [...tasks].sort(byOrder)) {
    const k = [t.title, t.category, t.freq, t.thumb].join('|');
    if (seen.has(k)) seen.get(k).n++;
    else { const g = { t, n: 1 }; seen.set(k, g); groups.push(g); }
  }
  const daily = groups.filter(g => g.t.freq !== 'weekly');
  const weekly = groups.filter(g => g.t.freq === 'weekly');
  const totals = days.map((_, i) => daily.reduce((s, g) => s + (freqOf(g.t).days.includes(i + 1) ? g.n : 0), 0));
  const tdCls = i => (i + 1 === today ? ' class="today"' : '');
  const nameCell = g => `<th class="name"><span class="nm">${esc(g.t.title)}</span>${g.n > 1 ? `<em>×${g.n}</em>` : ''}</th>`;
  const row = g => {
    const c = catOf(g.t);
    const cells = g.t.freq === 'weekly'
      ? '<td colspan="7" class="weekly">本週任一天完成一次</td>'
      : days.map((_, i) => `<td${tdCls(i)}>${freqOf(g.t).days.includes(i + 1) ? `<i style="background:${c.bg}"></i>` : ''}</td>`).join('');
    return `<tr data-id="${esc(g.t.id)}">${nameCell(g)}${cells}</tr>`;
  };
  app.innerHTML = `
    <section class="view">
      <header class="bar sub">
        <button class="icon-btn" id="back" aria-label="返回">${UI.back}</button>
        <h2>一週總覽</h2>
        <span class="icon-spacer"></span>
      </header>
      <div class="scroll">
        ${groups.length ? `
        <div class="week-card">
          <table class="week">
            <colgroup><col><col span="7" class="day"></colgroup>
            <thead><tr><th class="name">事項</th>${days.map((d, i) => `<th${tdCls(i)}>${d}</th>`).join('')}</tr></thead>
            <tbody>${daily.map(row).join('')}${weekly.map(row).join('')}</tbody>
            <tfoot><tr><th class="name">合計</th>${totals.map((n, i) => `<td${tdCls(i)}>${n}</td>`).join('')}</tr></tfoot>
          </table>
        </div>
        <div class="legend">${CATEGORIES.map(c => `<span><i style="background:${c.bg}"></i>${c.name}</span>`).join('')}</div>
        ` : '<div class="empty">還沒有任何待辦事項</div>'}
      </div>
    </section>`;
  document.getElementById('back').onclick = back;
  app.querySelectorAll('tbody tr').forEach(tr => tr.onclick = () => go('/task/' + encodeURIComponent(tr.dataset.id)));
}

const blobToDataUrl = b => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result);
  r.onerror = () => rej(r.error);
  r.readAsDataURL(b);
});

function dataUrlToBlob(s) {
  const [head, data] = s.split(',');
  const bin = atob(data);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: (head.match(/^data:([^;]+)/) || [])[1] || 'image/jpeg' });
}

async function exportBackup() {
  try {
    const out = [];
    for (const t of tasks) out.push({ ...t, images: await Promise.all((t.images || []).map(blobToDataUrl)) });
    const json = JSON.stringify({ app: 'todoapp', version: 1, exportedAt: new Date().toISOString(), tasks: out });
    const name = `todo-backup-${dayKey(new Date())}.json`;
    const file = new File([json], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file] }); } catch (err) { if (err.name !== 'AbortError') throw err; }
      return;
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  } catch {
    toast('匯出失敗');
  }
}

async function importBackup(file) {
  let data;
  try {
    data = JSON.parse(await file.text());
    if (data.app !== 'todoapp' || !Array.isArray(data.tasks)) throw 0;
  } catch {
    toast('這不是有效的備份檔');
    return;
  }
  const when = data.exportedAt ? new Date(data.exportedAt).toLocaleString('zh-TW') : '未知時間';
  if (!confirm(`備份時間：${when}\n共 ${data.tasks.length} 筆事項\n\n還原後會取代目前所有資料，確定嗎？`)) return;
  try {
    const restored = data.tasks.map(t => ({ ...t, images: (t.images || []).map(dataUrlToBlob) }));
    for (const t of tasks) await db.del(t.id);
    for (const t of restored) await db.put(t);
    tasks = restored;
    route();
    toast(`已還原 ${restored.length} 筆事項`);
  } catch {
    toast('還原失敗');
  }
}

document.getElementById('lightbox').onclick = e => { e.currentTarget.hidden = true; };

function checkDayChange() {
  const k = dayKey(new Date());
  if (k === lastDay) return;
  lastDay = k;
  route();
}
let updatePending = false;
const onListView = () => { const h = location.hash.slice(1); return !h || h === '/'; };
function onUpdate() {
  updatePending = true;
  if (onListView()) location.reload();
  else toast('有新版本', '更新', () => location.reload());
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  checkDayChange();
  if (navigator.serviceWorker && navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage('check');
});
setInterval(checkDayChange, 60000);
window.addEventListener('popstate', route);

(async () => {
  tasks = await db.all();
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  route();
})();

if ('serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController) onUpdate(); });
  navigator.serviceWorker.addEventListener('message', e => { if (e.data === 'updated') onUpdate(); });
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
