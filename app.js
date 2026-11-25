let currentPlace = 'Дом';

function showScreen(id) {
  document.getElementById('screen-place').classList.add('hidden');
  document.getElementById('screen-form').classList.add('hidden');
  document.getElementById('screen-result').classList.add('hidden');
  document.getElementById(id).classList.remove('hidden');
}

function choosePlace(place) {
  currentPlace = place;
  document.getElementById('badge-place').textContent = place;
  showScreen('screen-form');
}

function goBack() { showScreen('screen-place'); }
function goHome() { showScreen('screen-place'); }
function newMeasure() { showScreen('screen-form'); }

function calculate() {
  const val = id => Number(document.getElementById(id).value);
  const name = document.getElementById('mName').value || 'Мероприятие';

  const pOld = val('powerOld');
  const pNew = val('powerNew');
  const h = val('hoursDay');
  const t = val('tariff');
  const n = val('count');
  const pr = val('price');

  const budget = pr * n;
  const savingsYear = (pOld - pNew) / 1000 * h * 365 * t * n;
  const payback = savingsYear > 0 ? budget / (savingsYear / 12) : 0;
  const earn5y = savingsYear * 5 - budget;

  document.getElementById('badge-place-result').textContent = currentPlace;
  document.getElementById('result-title').textContent = name;
  document.getElementById('result-place').textContent = currentPlace;

  document.getElementById('r-budget').textContent = budget.toFixed(0) + ' руб';
  document.getElementById('r-savings').textContent = savingsYear.toFixed(0) + ' руб';
  document.getElementById('r-payback').textContent = payback > 0 ? Math.round(payback) + ' мес' : '—';
  document.getElementById('r-earn5y').textContent = earn5y.toFixed(0) + ' руб';

  showScreen('screen-result');
}