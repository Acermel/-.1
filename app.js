let currentMeasure = null;
let currentFilter = 'all';

// Категории: имя и фирменный цвет — карточки, бейджи и фильтры подхватывают сами
const CATS = {
  electric:  { name: 'Электричество', color: '#b7791f' },
  water:     { name: 'Вода',          color: '#2f6f8f' },
  heat:      { name: 'Тепло',         color: '#b5563a' },
  food:      { name: 'Еда',           color: '#6b7d33' },
  transport: { name: 'Транспорт',     color: '#5b6470' },
  subs:      { name: 'Подписки',      color: '#8a5a78' }
};

const MEASURES = {
  led: {
    cat: 'electric',
    name: 'LED-лампочки',
    desc: 'Заменить лампы накаливания на светодиодные',
    icon: '<path d="M9 18H15M10 22H14M12 2C8.686 2 6 4.686 6 8C6 10.5 7.5 12.5 9 14V16H15V14C16.5 12.5 18 10.5 18 8C18 4.686 15.314 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    fields: [
      { key: 'pOld', label: 'Старая мощность', unit: 'Вт', def: 60 },
      { key: 'pNew', label: 'Новая мощность', unit: 'Вт', def: 9 },
      { key: 'hours', label: 'Часов в день', unit: 'ч', def: 3, step: 0.5 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'count', label: 'Количество', unit: 'шт', def: 1, step: 1 },
      { key: 'price', label: 'Цена за штуку', unit: 'руб', def: 300 }
    ],
    calc: v => ({
      budget: v.price * v.count,
      savings: (v.pOld - v.pNew) / 1000 * v.hours * 365 * v.tariff * v.count
    })
  },
  night: {
    cat: 'electric',
    name: 'Ночной тариф',
    desc: 'Стирка, посудомойка и зарядка — после 23:00',
    icon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    fields: [
      { key: 'kwhMonth', label: 'Расход в месяц', unit: 'кВт·ч', def: 150 },
      { key: 'share', label: 'Доля ночью', unit: '%', def: 30 },
      { key: 'dayTariff', label: 'Дневной тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'nightTariff', label: 'Ночной тариф', unit: 'руб/кВт·ч', def: 3, step: 0.1 },
      { key: 'price', label: 'Счётчик', unit: 'руб', def: 5000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhMonth * 12 * (v.share / 100) * (v.dayTariff - v.nightTariff)
    })
  },
  standby: {
    cat: 'electric',
    name: 'Выключить из розетки',
    desc: 'Телевизор, роутер, зарядки в режиме ожидания',
    icon: '<rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 20H16M12 16V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    fields: [
      { key: 'watts', label: 'Мощность в ожидании', unit: 'Вт', def: 10 },
      { key: 'hours', label: 'Часов в сутки', unit: 'ч', def: 20 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Умная розетка', unit: 'руб', def: 800 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.watts / 1000 * v.hours * 365 * v.tariff
    })
  },
  aerator: {
    cat: 'water',
    name: 'Аэратор на кран',
    desc: 'Меньше воды при том же напоре',
    icon: '<path d="M12 2V6M6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12C18 8.686 15.314 6 12 6C8.686 6 6 8.686 6 12Z" stroke="currentColor" stroke-width="2"/><path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    fields: [
      { key: 'flowOld', label: 'Расход до', unit: 'л/мин', def: 12, step: 0.5 },
      { key: 'flowNew', label: 'Расход после', unit: 'л/мин', def: 6, step: 0.5 },
      { key: 'minutes', label: 'Минут в день', unit: 'мин', def: 15 },
      { key: 'tariff', label: 'Тариф на воду', unit: 'руб/м³', def: 50, step: 0.1 },
      { key: 'price', label: 'Цена', unit: 'руб', def: 300 }
    ],
    calc: v => ({
      budget: v.price,
      savings: (v.flowOld - v.flowNew) * v.minutes * 365 / 1000 * v.tariff
    })
  },
  toilet: {
    cat: 'water',
    name: 'Две кнопки на бачке',
    desc: 'Арматура с половинным смывом',
    icon: '<rect x="5" y="4" width="14" height="8" rx="2" stroke="currentColor" stroke-width="2"/><path d="M9 12V20H15V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    fields: [
      { key: 'volOld', label: 'Старый объём', unit: 'л', def: 9, step: 0.5 },
      { key: 'volNew', label: 'Новый объём', unit: 'л', def: 6, step: 0.5 },
      { key: 'flushes', label: 'Смывов в день', unit: 'раз', def: 5 },
      { key: 'tariff', label: 'Тариф на воду', unit: 'руб/м³', def: 50, step: 0.1 },
      { key: 'price', label: 'Арматура', unit: 'руб', def: 1200 }
    ],
    calc: v => ({
      budget: v.price,
      savings: (v.volOld - v.volNew) * v.flushes * 365 / 1000 * v.tariff
    })
  },
  pipe: {
    cat: 'heat',
    name: 'Утепление трубы',
    desc: 'Изоляция горячей воды в подвале или на даче',
    icon: '<path d="M4 12H20M4 8H20M4 16H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 4V6M12 4V6M17 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    fields: [
      { key: 'lossOld', label: 'Потери до', unit: 'Вт/м', def: 80 },
      { key: 'lossNew', label: 'Потери после', unit: 'Вт/м', def: 15 },
      { key: 'length', label: 'Длина', unit: 'м', def: 5, step: 0.5 },
      { key: 'hoursYear', label: 'Часов в год', unit: 'ч', def: 5000 },
      { key: 'tariff', label: 'Тариф на тепло', unit: 'руб/кВт·ч', def: 3, step: 0.1 },
      { key: 'pricePerM', label: 'Цена изоляции', unit: 'руб/м', def: 250 }
    ],
    calc: v => ({
      budget: v.pricePerM * v.length,
      savings: (v.lossOld - v.lossNew) * v.length * v.hoursYear / 1000 * v.tariff
    })
  },
  regulator: {
    cat: 'heat',
    name: 'Терморегуляторы на батареи',
    desc: 'Не греть комнату, когда не нужно',
    icon: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2"/><path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    fields: [
      { key: 'billMonth', label: 'Счёт за тепло', unit: 'руб/мес', def: 4000 },
      { key: 'percent', label: 'Экономия', unit: '%', def: 12 },
      { key: 'rooms', label: 'Количество батарей', unit: 'шт', def: 3 },
      { key: 'priceEach', label: 'Цена за штуку', unit: 'руб', def: 1500 }
    ],
    calc: v => ({
      budget: v.rooms * v.priceEach,
      savings: v.billMonth * 12 * (v.percent / 100)
    })
  },
  coffee: {
    cat: 'food',
    name: 'Кофе с собой',
    desc: 'Свой кофе вместо покупного каждое утро',
    icon: '<path d="M4 8H18V14C18 17.314 15.314 20 12 20H10C6.686 20 4 17.314 4 14V8Z" stroke="currentColor" stroke-width="2"/><path d="M18 10H20C21.105 10 22 10.895 22 12C22 13.105 21.105 14 20 14H18" stroke="currentColor" stroke-width="2"/>',
    fields: [
      { key: 'priceCup', label: 'Цена покупного', unit: 'руб', def: 300 },
      { key: 'priceHome', label: 'Свой кофе', unit: 'руб', def: 80 },
      { key: 'days', label: 'Дней в месяц', unit: 'дн', def: 21 },
      { key: 'price', label: 'Затраты (термос, зерно)', unit: 'руб', def: 1500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: (v.priceCup - v.priceHome) * v.days * 12
    })
  },
  lunch: {
    cat: 'food',
    name: 'Обед с собой',
    desc: 'Контейнер вместо кафе или доставки',
    icon: '<rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 8V6C8 4.895 8.895 4 10 4H14C15.105 4 16 4.895 16 6V8" stroke="currentColor" stroke-width="2"/>',
    fields: [
      { key: 'priceCafe', label: 'Обед в кафе', unit: 'руб', def: 700 },
      { key: 'priceHome', label: 'Обед с собой', unit: 'руб', def: 150 },
      { key: 'days', label: 'Рабочих дней в месяц', unit: 'дн', def: 21 },
      { key: 'price', label: 'Контейнеры', unit: 'руб', def: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: (v.priceCafe - v.priceHome) * v.days * 12
    })
  },
  car: {
    cat: 'transport',
    name: 'Отказ от машины',
    desc: 'Общественный транспорт вместо личного авто',
    icon: '<path d="M5 17H19M7 17V19M17 17V19M5 13L7 7H17L19 13V17H5V13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    fields: [
      { key: 'fuel', label: 'Бензин', unit: 'руб/мес', def: 8000 },
      { key: 'parking', label: 'Парковка', unit: 'руб/мес', def: 3000 },
      { key: 'service', label: 'ТО и страховка', unit: 'руб/год', def: 40000 },
      { key: 'transit', label: 'Транспорт', unit: 'руб/мес', def: 2000 },
      { key: 'price', label: 'Разовые затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: (v.fuel + v.parking + v.service / 12 - v.transit) * 12
    })
  },
  subs: {
    cat: 'subs',
    name: 'Подписки',
    desc: 'Отключить то, чем не пользуешься',
    icon: '<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 10H21" stroke="currentColor" stroke-width="2"/>',
    fields: [
      { key: 'count', label: 'Количество подписок', unit: 'шт', def: 3 },
      { key: 'priceEach', label: 'Средняя цена', unit: 'руб/мес', def: 400 },
      { key: 'keep', label: 'Оставить нужных', unit: 'шт', def: 1 },
      { key: 'price', label: 'Затраты на отмену', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: (v.count - v.keep) * v.priceEach * 12
    })
  }
};

function init() {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
  buildFilters();
  renderGrid('all');
  fillCounts();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

function toggleTheme() {
  const cur = document.body.getAttribute('data-theme') || 'light';
  const next = cur === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (theme === 'dark') {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><path d="M12 2V4M12 20V22M4 12H2M22 12H20M5 5L7 7M17 17L19 19M5 19L7 17M17 7L19 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
  }
}

// Цифры в тексте считаем из данных — чтобы не разошлись с MEASURES
function fillCounts() {
  document.querySelectorAll('[data-count="measures"]').forEach(el => {
    el.textContent = Object.keys(MEASURES).length;
  });
  document.querySelectorAll('[data-count="cats"]').forEach(el => {
    el.textContent = Object.keys(CATS).length;
  });
}

function buildFilters() {
  const box = document.getElementById('filters');
  box.innerHTML = '';

  const counts = {};
  Object.values(MEASURES).forEach(m => { counts[m.cat] = (counts[m.cat] || 0) + 1; });

  const make = (cat, label, n, active) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'filter' + (active ? ' active' : '');
    b.dataset.cat = cat;
    b.onclick = () => setFilter(cat);
    b.innerHTML = `${label}<span class="filter-count">${n}</span>`;
    box.appendChild(b);
  };

  make('all', 'Все', Object.keys(MEASURES).length, true);
  Object.keys(CATS).forEach(cat => make(cat, CATS[cat].name, counts[cat] || 0, false));
}

function setFilter(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  renderGrid(cat);
}

function renderGrid(cat) {
  const grid = document.getElementById('measures-grid');
  grid.innerHTML = '';
  Object.keys(MEASURES).forEach(key => {
    const m = MEASURES[key];
    if (cat !== 'all' && m.cat !== cat) return;
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'measure-card';
    card.style.setProperty('--cat', CATS[m.cat].color);
    card.onclick = () => openMeasure(key);
    card.innerHTML = `
      <div class="measure-top">
        <span class="measure-icon"><svg viewBox="0 0 24 24" fill="none">${m.icon}</svg></span>
        <span class="measure-cat">${CATS[m.cat].name}</span>
      </div>
      <div class="measure-body">
        <div class="measure-title">${m.name}</div>
        <div class="measure-desc">${m.desc}</div>
      </div>
      <span class="measure-go">Рассчитать
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    `;
    grid.appendChild(card);
  });
}

function openMeasure(key) {
  currentMeasure = key;
  const m = MEASURES[key];
  const badge = document.getElementById('badge-cat');
  badge.textContent = CATS[m.cat].name;
  badge.style.setProperty('--cat', CATS[m.cat].color);
  document.getElementById('form-title').textContent = m.name;
  document.getElementById('form-desc').textContent = m.desc;
  document.getElementById('mName').value = m.name;
  renderFields();
  showScreen('screen-form');
}

function showScreen(id) {
  ['screen-catalog', 'screen-form', 'screen-result'].forEach(s => {
    document.getElementById(s).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() { showScreen('screen-catalog'); }
function goHome() { showScreen('screen-catalog'); }
function newMeasure() { showScreen('screen-form'); }

function renderFields() {
  const m = MEASURES[currentMeasure];
  const box = document.getElementById('fields-container');
  box.innerHTML = '';

  for (let i = 0; i < m.fields.length; i += 2) {
    const pair = m.fields.slice(i, i + 2);
    const row = document.createElement('div');
    row.className = pair.length === 2 ? 'field-row' : '';
    pair.forEach(f => {
      const w = document.createElement('div');
      w.className = 'field';
      w.innerHTML = `
        <label>${f.label}, ${f.unit}</label>
        <input type="number" id="f_${f.key}" value="${f.def}" step="${f.step || 1}">
      `;
      row.appendChild(w);
    });
    box.appendChild(row);
  }
}

// «−12 500 ₽» вместо уродливого минуса из локали
function fmt(n) {
  const sign = n < 0 ? '−' : '';
  return sign + Math.abs(Math.round(n)).toLocaleString('ru-RU') + ' ₽';
}

function paybackLabel(payback, savings, budget) {
  if (savings <= 0) return '—';
  if (budget === 0) return 'мгновенно';
  const months = Math.round(payback);
  if (months < 24) return months + ' мес.';
  const years = Math.round(payback / 12 * 10) / 10;
  const word = Number.isInteger(years)
    ? (years % 10 >= 2 && years % 10 <= 4 ? 'года' : 'лет')
    : 'года';
  return `${months} мес ≈ ${String(years).replace('.', ',')} ${word}`;
}

function verdictFor(savings, budget, payback) {
  if (savings <= 0) return 'Так не сэкономить — перепроверьте цифры.';
  if (budget === 0) return 'Вложений ноль — вся экономия идёт прямо в карман.';
  if (payback <= 12) return 'Окупается быстрее года. Отличная сделка.';
  if (payback <= 36) return 'Вернётся за два-три года — спокойное вложение.';
  return 'Окупаемость небыстрая: решайте, хватит ли терпения.';
}

function calculate() {
  const m = MEASURES[currentMeasure];
  const name = document.getElementById('mName').value.trim() || m.name;

  const v = {};
  m.fields.forEach(f => {
    v[f.key] = Number(document.getElementById('f_' + f.key).value) || 0;
  });

  const { budget, savings } = m.calc(v);
  const payback = savings > 0 ? budget / (savings / 12) : 0;
  const earn5y = savings * 5 - budget;

  const badge = document.getElementById('badge-cat-result');
  badge.textContent = CATS[m.cat].name;
  badge.style.setProperty('--cat', CATS[m.cat].color);
  document.getElementById('result-title').textContent = name;
  document.getElementById('result-subtitle').textContent = m.desc;

  document.getElementById('r-budget').textContent = fmt(budget);
  document.getElementById('r-savings').textContent = fmt(savings);
  document.getElementById('r-payback').textContent = paybackLabel(payback, savings, budget);
  document.getElementById('r-earn5y').textContent = fmt(earn5y);
  document.getElementById('r-verdict').textContent = verdictFor(savings, budget, payback);

  let pct = 0;
  if (budget === 0 && savings > 0) pct = 100;
  else if (payback > 0) pct = Math.min(100, (60 / payback) * 100);
  pct = Math.round(pct);

  document.getElementById('payback-percent').textContent = pct + '%';
  const fill = document.getElementById('payback-fill');
  fill.style.width = '0';
  setTimeout(() => {
    fill.style.width = pct + '%';
  }, 60);

  showScreen('screen-result');
}

document.addEventListener('DOMContentLoaded', init);
