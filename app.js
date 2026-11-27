let currentMeasure = null;
let currentFilter = 'all';

// Иконки (24×24, stroke): обводку задаёт CSS в .measure-icon и .cat-tile-icon
const I = {
  house: '<path d="M3 11.5L12 3.5L21 11.5"/><path d="M5.5 10V20H18.5V10"/><path d="M10 20V14.5H14V20"/>',
  briefcase: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
  factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M7 16h.01M12 16h.01M17 16h.01"/>',
  bulb: '<path d="M9 18H15M10 22H14M12 2C8.7 2 6 4.7 6 8C6 10.5 7.5 12.5 9 14V16H15V14C16.5 12.5 18 10.5 18 8C18 4.7 15.3 2 12 2Z"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M9 21h6"/>',
  drop: '<path d="M12 3c3 4.5 6 7.6 6 11a6 6 0 1 1-12 0c0-3.4 3-6.6 6-11Z"/>',
  toilet: '<rect x="5" y="4" width="14" height="8" rx="2"/><path d="M9 12V20H15V12"/>',
  pipe: '<rect x="3" y="9" width="18" height="6" rx="3"/><path d="M8 9v6M16 9v6"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8V12L15 15"/>',
  cup: '<path d="M4 8H18V14C18 17.3 15.3 20 12 20H10C6.7 20 4 17.3 4 14V8Z"/><path d="M18 10H20C21.1 10 22 10.9 22 12C22 13.1 21.1 14 20 14H18"/>',
  box: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M8 8V6C8 4.9 8.9 4 10 4H14C15.1 4 16 4.9 16 6V8"/>',
  car: '<path d="M5 17H19M7 17V19M17 17V19M5 13L7 7H17L19 13V17H5V13Z"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10H21"/>',
  door: '<rect x="6" y="3" width="12" height="18" rx="1"/><path d="M15 12h.01"/>',
  dishwasher: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 8h16M7 13c1-1 2-1 3 0s2 1 3 0 2-1 3 0M7 17c1-1 2-1 3 0s2 1 3 0 2-1 3 0"/>',
  fridge: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M9 6v2M9 14v3"/>',
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  ac: '<rect x="3" y="4" width="18" height="8" rx="2"/><path d="M3 8h18M7 16c1-1 2 1 3 0s2 1 3 0 2-1 3 0 2 1 3 0"/>',
  shower: '<path d="M6 9a6 6 0 0 1 12 0M12 4V2M6 9H4M20 9h-2"/><path d="M8 13v1M12 13v2M16 13v1M9.5 17v1.5M14.5 17v1.5"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M9 20h6M12 16v4"/>',
  server: '<rect x="4" y="3" width="16" height="7" rx="1.5"/><rect x="4" y="14" width="16" height="7" rx="1.5"/><path d="M8 6.5h.01M12 6.5h.01M8 17.5h.01M12 17.5h.01"/>',
  doc: '<path d="M6 2h8l5 5v15H6V2Z"/><path d="M14 2v5h5M9 13h7M9 17h7"/>',
  printer: '<path d="M7 8V3h10v5"/><rect x="4" y="8" width="16" height="8" rx="1.5"/><path d="M8 13h8v8H8z"/>',
  gauge: '<circle cx="12" cy="12" r="8"/><path d="M12 12l4-4M12 12h.01"/>',
  flame: '<path d="M12 3c2 3 6 5.5 6 10a6 6 0 0 1-12 0c0-2 .8-3.8 2-5.5.5 1.5 1.3 2.4 2.5 3C10 8 10.7 5.5 12 3Z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
  greenhouse: '<path d="M3 21h18M4 21V10l8-6 8 6v11"/><path d="M9 21v-5a3 3 0 0 1 6 0v5"/>',
  barrel: '<path d="M6 4h12M6 20h12M7 4c-1 5-1 11 0 16M17 4c1 5 1 11 0 16M6.2 12h11.6"/>',
  sprout: '<path d="M12 21v-7"/><path d="M12 14c0-3.5-2.5-5.5-6.5-5.5 0 3.5 2.5 5.5 6.5 5.5Z"/><path d="M12 14c0-3.5 2.5-5.5 6.5-5.5 0 3.5-2.5 5.5-6.5 5.5Z"/>',
  rain: '<path d="M7 14a4.5 4.5 0 1 1 .6-8.96A5.5 5.5 0 0 1 18.3 7.6 3.5 3.5 0 0 1 17.5 14H7Z"/><path d="M8 17.5v2M12 18.5v2M16 17.5v2"/>',
  kettle: '<path d="M8 9h8l-1.2 9H9.2L8 9Z"/><path d="M9 9c0-3.3 1.3-5 3-5s3 1.7 3 5M16 10.5l3-1.5v3l-3-.5"/>',
  pot: '<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-6Z"/><path d="M2 10h20M10 6c0-1.7.7-2.5 2-2.5s2 .8 2 2.5"/>',
  washer: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 7h16"/><circle cx="12" cy="14" r="3.5"/>',
  microwave: '<rect x="3" y="5" width="18" height="14" rx="2"/><rect x="6" y="8" width="9" height="8" rx="1"/><path d="M18 9h.01M18 12h.01M18 15h.01"/>',
  plug: '<path d="M9 2v5M15 2v5"/><path d="M6 7h12v3a6 6 0 0 1-12 0V7Z"/><path d="M12 16v6"/>',
  battery: '<rect x="2" y="8" width="17" height="8" rx="2"/><path d="M22 10.5v3M6 12h4"/>',
  window: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M12 4v16M4 12h16"/>',
  elevator: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8v8M9 8l-2 2.5M9 8l2 2.5M15 16V8M15 16l-2-2.5M15 16l2-2.5"/>',
  sofa: '<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3Z"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><path d="M16.5 13v7M13 16.5h7"/>',
  waves: '<path d="M3 10c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0M3 15c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0"/>',
  mower: '<circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M7 16h10l-1.5-5h-7L7 16ZM13 11l6-7"/>'
};

// Категории витрины: имя, подсказка, значок и цвет — плашки, заголовки и бейджи подхватывают сами
const CATS = {
  home:    { name: 'Дом',   hint: 'Быт и привычки — от лампочек до обедов', icon: I.house,      color: '#2e7d4f' },
  office:  { name: 'Офис',  hint: 'Компьютеры, климат, печать и вода',      icon: I.briefcase,  color: '#3f6f96' },
  factory: { name: 'Завод', hint: 'Сжатый воздух, пар, котельные и станки', icon: I.factory,    color: '#a05a2c' },
  dacha:   { name: 'Дача',  hint: 'Теплицы, полив, насосы и инструмент',    icon: I.greenhouse, color: '#6b7d33' }
};

const MEASURES = {

  // ===== ДОМ =====

  led: {
    cat: 'home',
    name: 'LED-лампочки',
    desc: 'Заменить лампы накаливания на светодиодные',
    icon: I.bulb,
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
    cat: 'home',
    name: 'Ночной тариф',
    desc: 'Стирка, посудомойка и зарядка — после 23:00',
    icon: I.moon,
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
    cat: 'home',
    name: 'Выключить из розетки',
    desc: 'Телевизор, роутер, зарядки в режиме ожидания',
    icon: I.tv,
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
    cat: 'home',
    name: 'Аэратор на кран',
    desc: 'Меньше воды при том же напоре',
    icon: I.drop,
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
    cat: 'home',
    name: 'Две кнопки на бачке',
    desc: 'Арматура с половинным смывом',
    icon: I.toilet,
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
    cat: 'home',
    name: 'Утепление трубы',
    desc: 'Изоляция горячей воды в подвале или на даче',
    icon: I.pipe,
    fields: [
      { key: 'lossOld', label: 'Потери до', unit: 'Вт/м', def: 80 },
      { key: 'lossNew', label: 'Потери после', unit: 'Вт/м', def: 15 },
      { key: 'length', label: 'Длина', unit: 'м', def: 5, step: 0.5 },
      { key: 'hoursYear', label: 'Часов в год', unit: 'ч', def: 5000, step: 100 },
      { key: 'tariff', label: 'Тариф на тепло', unit: 'руб/кВт·ч', def: 3, step: 0.1 },
      { key: 'pricePerM', label: 'Цена изоляции', unit: 'руб/м', def: 250 }
    ],
    calc: v => ({
      budget: v.pricePerM * v.length,
      savings: (v.lossOld - v.lossNew) * v.length * v.hoursYear / 1000 * v.tariff
    })
  },
  regulator: {
    cat: 'home',
    name: 'Терморегуляторы на батареи',
    desc: 'Не греть комнату, когда не нужно',
    icon: I.clock,
    fields: [
      { key: 'billMonth', label: 'Счёт за тепло', unit: 'руб/мес', def: 4000 },
      { key: 'percent', label: 'Экономия', unit: '%', def: 12, step: 0.5 },
      { key: 'rooms', label: 'Количество батарей', unit: 'шт', def: 3 },
      { key: 'priceEach', label: 'Цена за штуку', unit: 'руб', def: 1500 }
    ],
    calc: v => ({
      budget: v.rooms * v.priceEach,
      savings: v.billMonth * 12 * (v.percent / 100)
    })
  },
  coffee: {
    cat: 'home',
    name: 'Кофе с собой',
    desc: 'Свой кофе вместо покупного каждое утро',
    icon: I.cup,
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
    cat: 'home',
    name: 'Обед с собой',
    desc: 'Контейнер вместо кафе или доставки',
    icon: I.box,
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
    cat: 'home',
    name: 'Отказ от машины',
    desc: 'Общественный транспорт вместо личного авто',
    icon: I.car,
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
    cat: 'home',
    name: 'Подписки',
    desc: 'Отключить то, чем не пользуешься',
    icon: I.card,
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
  },
  heatSchedule: {
    cat: 'home',
    name: 'Отопление по расписанию',
    desc: 'Термостат снижает тепло ночью и когда никого нет',
    icon: I.clock,
    fields: [
      { key: 'billMonth', label: 'Счёт за отопление', unit: 'руб/мес', def: 8000, step: 100 },
      { key: 'months', label: 'Отопительный сезон', unit: 'мес', def: 5 },
      { key: 'percent', label: 'Снижение', unit: '%', def: 7, step: 0.5 },
      { key: 'price', label: 'Термостат и монтаж', unit: 'руб', def: 6000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.billMonth * v.months * v.percent / 100
    })
  },
  doorSeal: {
    cat: 'home',
    name: 'Уплотнитель двери и люка',
    desc: 'Убрать щели по периметру двери и чердака',
    icon: I.door,
    fields: [
      { key: 'billSeason', label: 'Отопление за сезон', unit: 'руб', def: 35000, step: 500 },
      { key: 'percent', label: 'Снижение потерь', unit: '%', def: 4, step: 0.5 },
      { key: 'price', label: 'Уплотнители', unit: 'руб', def: 1500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.billSeason * v.percent / 100
    })
  },
  dishwasherEco: {
    cat: 'home',
    name: 'ЭКО-режим посудомойки',
    desc: 'Мыть полной загрузкой на экономичной программе',
    icon: I.dishwasher,
    fields: [
      { key: 'diff', label: 'Разница за цикл', unit: 'кВт·ч', def: 0.25, step: 0.05 },
      { key: 'cycles', label: 'Циклов в неделю', unit: 'раз', def: 5 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.diff * v.cycles * 52 * v.tariff
    })
  },
  fridgeSeal: {
    cat: 'home',
    name: 'Уплотнитель холодильника',
    desc: 'Изношенная резина заставляет морозить сильнее',
    icon: I.fridge,
    fields: [
      { key: 'kwhYear', label: 'Потребление', unit: 'кВт·ч/год', def: 450 },
      { key: 'percent', label: 'Снижение', unit: '%', def: 5, step: 0.5 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Уплотнитель', unit: 'руб', def: 500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhYear * v.percent / 100 * v.tariff
    })
  },
  fridgeClean: {
    cat: 'home',
    name: 'Очистка холодильника',
    desc: 'Пыль на решётке — лишние ватты круглый год',
    icon: I.fridge,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч', def: 20 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  heatPumpWater: {
    cat: 'home',
    name: 'Тепловой насос для воды',
    desc: 'Водонагреватель с тепловым насосом вместо ТЭНа',
    icon: I.wind,
    fields: [
      { key: 'kwhOld', label: 'Старый расход', unit: 'кВт·ч/год', def: 1800 },
      { key: 'kwhNew', label: 'Новый расход', unit: 'кВт·ч/год', def: 650 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Оборудование и монтаж', unit: 'руб', def: 100000, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: (v.kwhOld - v.kwhNew) * v.tariff
    })
  },
  solarWater: {
    cat: 'home',
    name: 'Солнечный водонагреватель',
    desc: 'Коллектор подогревает воду до бойлера',
    icon: I.sun,
    fields: [
      { key: 'heatKwh', label: 'Замещённое тепло', unit: 'кВт·ч/год', def: 700, step: 10 },
      { key: 'tariff', label: 'Тариф на тепло', unit: 'руб/кВт·ч', def: 2.5, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 500 },
      { key: 'price', label: 'Коллектор и монтаж', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.heatKwh * v.tariff - v.service
    })
  },
  acClean: {
    cat: 'home',
    name: 'Чистые фильтры кондиционера',
    desc: 'Забитые фильтры и перебор с охлаждением',
    icon: I.ac,
    fields: [
      { key: 'kwhYear', label: 'Потребление', unit: 'кВт·ч/год', def: 1000 },
      { key: 'percent', label: 'Снижение', unit: '%', def: 6, step: 0.5 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhYear * v.percent / 100 * v.tariff
    })
  },
  floorTimer: {
    cat: 'home',
    name: 'Таймер тёплого пола',
    desc: 'Не греть пустые комнаты круглые сутки',
    icon: I.clock,
    fields: [
      { key: 'power', label: 'Мощность', unit: 'кВт', def: 0.8, step: 0.1 },
      { key: 'hours', label: 'Часов сокращения в день', unit: 'ч', def: 2, step: 0.5 },
      { key: 'days', label: 'Дней в сезоне', unit: 'дн', def: 180 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Таймер', unit: 'руб', def: 800 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.power * v.hours * v.days * v.tariff
    })
  },
  showerTimer: {
    cat: 'home',
    name: 'Душ по таймеру',
    desc: 'Минус две минуты — минус кубы и нагрев',
    icon: I.shower,
    fields: [
      { key: 'liters', label: 'Сокращение', unit: 'л/мин', def: 4, step: 0.5 },
      { key: 'minutes', label: 'Минут экономии', unit: 'мин', def: 2 },
      { key: 'people', label: 'Человек', unit: 'чел', def: 2 },
      { key: 'days', label: 'Дней', unit: 'дн', def: 365 },
      { key: 'waterTariff', label: 'Вода и стоки', unit: 'руб/м³', def: 70, step: 1 },
      { key: 'dT', label: 'Нагрев', unit: '°C', def: 30, step: 1 },
      { key: 'heatTariff', label: 'Тариф нагрева', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => {
      const m3 = v.liters * v.minutes * v.people * v.days / 1000;
      return { budget: v.price, savings: m3 * v.waterTariff + m3 * 1.163 * v.dT * v.heatTariff };
    }
  },
  fridgeMove: {
    cat: 'home',
    name: 'Холодильник подальше от плиты',
    desc: 'Зазоры и тень снижают расход на 20–40 кВт·ч',
    icon: I.fridge,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч', def: 30 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  recircPump: {
    cat: 'home',
    name: 'Насос ГВС по расписанию',
    desc: 'Рециркуляция работает только к утру и вечерам',
    icon: I.wind,
    fields: [
      { key: 'watts', label: 'Мощность насоса', unit: 'Вт', def: 40 },
      { key: 'hours', label: 'Сокращение часов в день', unit: 'ч', def: 8 },
      { key: 'days', label: 'Дней в году', unit: 'дн', def: 300 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Таймер или автоматика', unit: 'руб', def: 2000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.watts / 1000 * v.hours * v.days * v.tariff
    })
  },
  foodWaste: {
    cat: 'home',
    name: 'Меньше выбрасывать еды',
    desc: 'Меню и список покупок против мусорки',
    icon: I.trash,
    fields: [
      { key: 'kg', label: 'Выбрасываете', unit: 'кг/мес', def: 5, step: 0.5 },
      { key: 'priceKg', label: 'Цена продуктов', unit: 'руб/кг', def: 250, step: 10 },
      { key: 'percent', label: 'Предотвращаете', unit: '%', def: 40, step: 5 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.kg * v.priceKg * 12 * v.percent / 100
    })
  },
  kettle: {
    cat: 'home',
    name: 'Кипятить сколько нужно',
    desc: 'Полный чайник ради одной чашки',
    icon: I.kettle,
    fields: [
      { key: 'kwhSaved', label: 'Экономия за кипячение', unit: 'кВт·ч', def: 0.04, step: 0.01 },
      { key: 'boils', label: 'Кипячений в день', unit: 'раз', def: 3 },
      { key: 'days', label: 'Дней в году', unit: 'дн', def: 365 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.kwhSaved * v.boils * v.days * v.tariff
    })
  },
  lids: {
    cat: 'home',
    name: 'Крышки на кастрюли',
    desc: 'Готовка с крышкой — быстрее и дешевле',
    icon: I.pot,
    fields: [
      { key: 'kwhSaved', label: 'Экономия за готовку', unit: 'кВт·ч', def: 0.12, step: 0.01 },
      { key: 'meals', label: 'Готовок в год', unit: 'раз', def: 300 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Крышки', unit: 'руб', def: 700 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.meals * v.tariff
    })
  },
  pressureCooker: {
    cat: 'home',
    name: 'Скороварка',
    desc: 'Долгие блюда — втрое быстрее',
    icon: I.pot,
    fields: [
      { key: 'kwhSaved', label: 'Экономия за цикл', unit: 'кВт·ч', def: 0.35, step: 0.05 },
      { key: 'cycles', label: 'Циклов в год', unit: 'раз', def: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Скороварка', unit: 'руб', def: 5000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.cycles * v.tariff
    })
  },
  fridgeTemp: {
    cat: 'home',
    name: 'Температура холодильника',
    desc: 'Не морозить сильнее рекомендованного',
    icon: I.fridge,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч', def: 25 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Термометр', unit: 'руб', def: 300 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  defrost: {
    cat: 'home',
    name: 'Разморозка морозильника',
    desc: 'Наледь заставляет компрессор пахать',
    icon: I.fridge,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч', def: 30 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  fullLoads: {
    cat: 'home',
    name: 'Полные загрузки стирки',
    desc: 'Меньше запусков — меньше воды и света',
    icon: I.washer,
    fields: [
      { key: 'cyclesSaved', label: 'Сокращение циклов', unit: 'цикл/год', def: 40 },
      { key: 'kwhPerCycle', label: 'Электричество на цикл', unit: 'кВт·ч', def: 0.6, step: 0.1 },
      { key: 'waterPerCycle', label: 'Вода на цикл', unit: 'м³', def: 0.05, step: 0.01 },
      { key: 'elecTariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'waterTariff', label: 'Вода и стоки', unit: 'руб/м³', def: 70, step: 1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.cyclesSaved * (v.kwhPerCycle * v.elecTariff + v.waterPerCycle * v.waterTariff)
    })
  },
  airDry: {
    cat: 'home',
    name: 'Сушка на воздухе',
    desc: 'Стойка вместо сушильной машины',
    icon: I.washer,
    fields: [
      { key: 'cycles', label: 'Заменённые циклы', unit: 'цикл/год', def: 80 },
      { key: 'kwhPerCycle', label: 'Потребление за цикл', unit: 'кВт·ч', def: 1.8, step: 0.1 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Сушильная стойка', unit: 'руб', def: 1200 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.cycles * v.kwhPerCycle * v.tariff
    })
  },
  drySensor: {
    cat: 'home',
    name: 'Сушка по влажности',
    desc: 'Датчик остаточной влажности вместо таймера',
    icon: I.washer,
    fields: [
      { key: 'kwhSaved', label: 'Экономия за цикл', unit: 'кВт·ч', def: 0.25, step: 0.05 },
      { key: 'cycles', label: 'Циклов в год', unit: 'цикл', def: 150 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.cycles * v.tariff
    })
  },
  noRinse: {
    cat: 'home',
    name: 'Без ополаскивания посуды',
    desc: 'Современная посудомойка справится сама',
    icon: I.dishwasher,
    fields: [
      { key: 'liters', label: 'Ополаскивание за цикл', unit: 'л', def: 8 },
      { key: 'cycles', label: 'Циклов в год', unit: 'цикл', def: 200 },
      { key: 'tariff', label: 'Вода и стоки', unit: 'руб/м³', def: 70, step: 1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.liters * v.cycles / 1000 * v.tariff
    })
  },
  ovenResidual: {
    cat: 'home',
    name: 'Остаточное тепло духовки',
    desc: 'Выключать чуть раньше — блюдо дойдёт',
    icon: I.pot,
    fields: [
      { key: 'kwhSaved', label: 'Экономия за раз', unit: 'кВт·ч', def: 0.08, step: 0.01 },
      { key: 'times', label: 'Случаев в год', unit: 'раз', def: 150 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.kwhSaved * v.times * v.tariff
    })
  },
  microwaveHeat: {
    cat: 'home',
    name: 'Разогрев в микроволновке',
    desc: 'Маленькие порции — не в духовку',
    icon: I.microwave,
    fields: [
      { key: 'kwhSaved', label: 'Экономия за разогрев', unit: 'кВт·ч', def: 0.35, step: 0.05 },
      { key: 'times', label: 'Разогревов в год', unit: 'раз', def: 120 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.kwhSaved * v.times * v.tariff
    })
  },
  potSize: {
    cat: 'home',
    name: 'Посуда по конфорке',
    desc: 'Ровное дно и правильный диаметр',
    icon: I.pot,
    fields: [
      { key: 'kwhSaved', label: 'Экономия за готовку', unit: 'кВт·ч', def: 0.1, step: 0.01 },
      { key: 'meals', label: 'Готовок в год', unit: 'раз', def: 250 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Посуда', unit: 'руб', def: 2000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.meals * v.tariff
    })
  },
  boilerSchedule: {
    cat: 'home',
    name: 'Бойлер по расписанию',
    desc: 'Нагрев к утру и вечерам, а не круглосуточно',
    icon: I.clock,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч', def: 90 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Таймер', unit: 'руб', def: 1500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  toiletLeak: {
    cat: 'home',
    name: 'Ремонт подтекающего бачка',
    desc: 'Постоянный подток — до 15 м³ в год',
    icon: I.toilet,
    fields: [
      { key: 'liters', label: 'Утечка', unit: 'л/сутки', def: 40 },
      { key: 'tariff', label: 'Вода и стоки', unit: 'руб/м³', def: 70, step: 1 },
      { key: 'price', label: 'Клапан и работа', unit: 'руб', def: 800 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.liters * 365 / 1000 * v.tariff
    })
  },
  pressureReducer: {
    cat: 'home',
    name: 'Редуктор давления',
    desc: 'Давление по норме — меньше расход',
    icon: I.gauge,
    fields: [
      { key: 'm3Saved', label: 'Снижение расхода', unit: 'м³/год', def: 5 },
      { key: 'tariff', label: 'Вода и стоки', unit: 'руб/м³', def: 70, step: 1 },
      { key: 'price', label: 'Редуктор и монтаж', unit: 'руб', def: 3500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.m3Saved * v.tariff
    })
  },

  // ===== ОФИС =====

  pcSleep: {
    cat: 'office',
    name: 'Сон компьютеров',
    desc: 'Спящий режим после простоя по всей конторе',
    icon: I.monitor,
    fields: [
      { key: 'count', label: 'Компьютеров', unit: 'шт', def: 70 },
      { key: 'watts', label: 'Снижение мощности', unit: 'Вт', def: 35, step: 5 },
      { key: 'hours', label: 'Часов экономии в день', unit: 'ч', def: 3, step: 0.5 },
      { key: 'days', label: 'Рабочих дней', unit: 'дн', def: 250 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.count * v.watts / 1000 * v.hours * v.days * v.tariff
    })
  },
  monitorOff: {
    cat: 'office',
    name: 'Мониторы на ночь',
    desc: 'Централизованное отключение после работы',
    icon: I.monitor,
    fields: [
      { key: 'count', label: 'Мониторов', unit: 'шт', def: 100 },
      { key: 'watts', label: 'Мощность в простое', unit: 'Вт', def: 20, step: 5 },
      { key: 'hours', label: 'Часов отключения', unit: 'ч', def: 4 },
      { key: 'days', label: 'Рабочих дней', unit: 'дн', def: 250 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.count * v.watts / 1000 * v.hours * v.days * v.tariff
    })
  },
  serverVirtual: {
    cat: 'office',
    name: 'Виртуализация серверов',
    desc: 'Мало загруженные серверы — в одну стойку',
    icon: I.server,
    fields: [
      { key: 'kwSaved', label: 'Снижение мощности', unit: 'кВт', def: 1.2, step: 0.1 },
      { key: 'hours', label: 'Часов работы в год', unit: 'ч', def: 8000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Внедрение', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwSaved * v.hours * v.tariff
    })
  },
  hotAisle: {
    cat: 'office',
    name: 'Горячие и холодные коридоры',
    desc: 'Заглушки и развязка потоков в серверной',
    icon: I.server,
    fields: [
      { key: 'kwhSaved', label: 'Снижение охлаждения', unit: 'кВт·ч/год', def: 1500, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Заглушки и работы', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  hvacZones: {
    cat: 'office',
    name: 'Климат по зонам',
    desc: 'Не охлаждать и не греть пустые переговорки',
    icon: I.ac,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч/год', def: 2800, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Автоматика', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  co2Vent: {
    cat: 'office',
    name: 'Вентиляция по CO₂',
    desc: 'Свежий воздух по факту людей, а не по графику',
    icon: I.wind,
    fields: [
      { key: 'kwhSaved', label: 'Снижение вентиляции', unit: 'кВт·ч/год', def: 1000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Датчики и монтаж', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  heatRecovery: {
    cat: 'office',
    name: 'Рекуперация вытяжки',
    desc: 'Тепло вытяжного воздуха греет приточный',
    icon: I.wind,
    fields: [
      { key: 'heatKwh', label: 'Возвращённое тепло', unit: 'кВт·ч/год', def: 8000, step: 500 },
      { key: 'heatTariff', label: 'Тариф тепла', unit: 'руб/кВт·ч', def: 2.5, step: 0.1 },
      { key: 'fanKwh', label: 'Доп. электричество', unit: 'кВт·ч/год', def: 500 },
      { key: 'elecTariff', label: 'Тариф электричества', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 2000 },
      { key: 'price', label: 'Рекуператор и монтаж', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.heatKwh * v.heatTariff - v.fanKwh * v.elecTariff - v.service
    })
  },
  leakSensors: {
    cat: 'office',
    name: 'Датчики протечки',
    desc: 'Утечку нашли за час, а не через месяц',
    icon: I.drop,
    fields: [
      { key: 'm3Saved', label: 'Предотвращённые потери', unit: 'м³/год', def: 12 },
      { key: 'tariff', label: 'Вода и стоки', unit: 'руб/м³', def: 90, step: 1 },
      { key: 'price', label: 'Датчики', unit: 'руб', def: 8000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.m3Saved * v.tariff
    })
  },
  sensorFaucets: {
    cat: 'office',
    name: 'Сенсорные смесители',
    desc: 'Кран не течёт, пока никто не умывается',
    icon: I.drop,
    fields: [
      { key: 'm3Saved', label: 'Снижение расхода', unit: 'м³/год', def: 18 },
      { key: 'tariff', label: 'Вода и стоки', unit: 'руб/м³', def: 90, step: 1 },
      { key: 'price', label: 'Смесители', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.m3Saved * v.tariff
    })
  },
  paperless: {
    cat: 'office',
    name: 'Электронные согласования',
    desc: 'Заявки и счета без бумаги и тонера',
    icon: I.doc,
    fields: [
      { key: 'pages', label: 'Сокращение печати', unit: 'стр/мес', def: 3000, step: 100 },
      { key: 'pageCost', label: 'Стоимость страницы', unit: 'руб', def: 1.5, step: 0.1 },
      { key: 'price', label: 'Внедрение ЭДО', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.pages * v.pageCost * 12
    })
  },
  pullPrint: {
    cat: 'office',
    name: 'Печать по подтверждению',
    desc: 'Невостребованные задания просто сгорают',
    icon: I.printer,
    fields: [
      { key: 'pages', label: 'Сокращение печати', unit: 'стр/год', def: 15000, step: 100 },
      { key: 'pageCost', label: 'Стоимость страницы', unit: 'руб', def: 1.5, step: 0.1 },
      { key: 'price', label: 'Настройка', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.pages * v.pageCost
    })
  },
  reusables: {
    cat: 'office',
    name: 'Кружки вместо стаканов',
    desc: 'Многоразовая посуда и мойка',
    icon: I.cup,
    fields: [
      { key: 'cups', label: 'Одноразовых в год', unit: 'шт', def: 12000, step: 100 },
      { key: 'cupPrice', label: 'Цена стакана', unit: 'руб', def: 2, step: 0.5 },
      { key: 'washCost', label: 'Мойка и средства', unit: 'руб/год', def: 8000, step: 500 },
      { key: 'price', label: 'Посуда и посудомойка', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.cups * v.cupPrice - v.washCost
    })
  },
  evCharging: {
    cat: 'office',
    name: 'Зарядка авто по тарифам',
    desc: 'Перенести зарядку в дешёвые часы',
    icon: I.plug,
    fields: [
      { key: 'kwh', label: 'Переносимая зарядка', unit: 'кВт·ч/год', def: 8000, step: 100 },
      { key: 'tariffDiff', label: 'Разница тарифов', unit: 'руб/кВт·ч', def: 4, step: 0.1 },
      { key: 'extra', label: 'Управление', unit: 'руб/год', def: 2000 },
      { key: 'price', label: 'Настройка', unit: 'руб', def: 25000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwh * v.tariffDiff - v.extra
    })
  },
  solarBlinds: {
    cat: 'office',
    name: 'Наружные жалюзи',
    desc: 'Фасад не перегревается — кондиционеры молчат',
    icon: I.window,
    fields: [
      { key: 'kwhSaved', label: 'Снижение охлаждения', unit: 'кВт·ч/год', def: 2000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Жалюзи и монтаж', unit: 'руб', def: 120000, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  vestibule: {
    cat: 'office',
    name: 'Тамбур и доводчики',
    desc: 'Дверь не должна качать климат на улицу',
    icon: I.door,
    fields: [
      { key: 'savedRub', label: 'Снижение расходов на климат', unit: 'руб/год', def: 9000, step: 500 },
      { key: 'price', label: 'Доводчики и тамбур', unit: 'руб', def: 35000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.savedRub
    })
  },
  elevatorsEco: {
    cat: 'office',
    name: 'Лифты в часы тишины',
    desc: 'Режим ожидания в малозагруженные часы',
    icon: I.elevator,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч/год', def: 1100, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Настройка', unit: 'руб', def: 20000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  hvacService: {
    cat: 'office',
    name: 'Обслуживание вентиляции',
    desc: 'Чистые фильтры — меньше ватт на прогон воздуха',
    icon: I.ac,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч/год', def: 1600, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 4000 },
      { key: 'price', label: 'Разовые затраты', unit: 'руб', def: 4000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff - v.service
    })
  },
  chillerTemp: {
    cat: 'office',
    name: 'Чиллер по погоде',
    desc: 'Температура воды плавает вслед за улицей',
    icon: I.ac,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч/год', def: 2500, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Настройка автоматики', unit: 'руб', def: 25000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  laptops: {
    cat: 'office',
    name: 'Ноутбуки вместо ПК',
    desc: 'При плановой замене — ноутбук с докстанцией',
    icon: I.monitor,
    fields: [
      { key: 'count', label: 'Рабочих мест', unit: 'шт', def: 25 },
      { key: 'wattsSaved', label: 'Снижение мощности', unit: 'Вт', def: 45, step: 5 },
      { key: 'hours', label: 'Часов в день', unit: 'ч', def: 8 },
      { key: 'days', label: 'Рабочих дней', unit: 'дн', def: 250 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Доп. затраты на технику', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.count * v.wattsSaved / 1000 * v.hours * v.days * v.tariff
    })
  },
  upsEff: {
    cat: 'office',
    name: 'ИБП с высоким КПД',
    desc: 'Мощность по реальной нагрузке',
    icon: I.battery,
    fields: [
      { key: 'load', label: 'Нагрузка', unit: 'кВт', def: 5, step: 0.5 },
      { key: 'effOld', label: 'КПД старого', unit: '%', def: 90, step: 1 },
      { key: 'effNew', label: 'КПД нового', unit: '%', def: 95, step: 1 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 8000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Разница в цене ИБП', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.load * (100 / v.effOld - 100 / v.effNew) * v.hours * v.tariff
    })
  },
  standbyGroups: {
    cat: 'office',
    name: 'Отключение периферии на ночь',
    desc: 'Зарядки и докстанции — по расписанию',
    icon: I.plug,
    fields: [
      { key: 'count', label: 'Рабочих мест', unit: 'шт', def: 40 },
      { key: 'watts', label: 'Мощность ожидания', unit: 'Вт', def: 6 },
      { key: 'hours', label: 'Часов отключения', unit: 'ч', def: 16 },
      { key: 'days', label: 'Рабочих дней', unit: 'дн', def: 250 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Управляемые розетки', unit: 'руб', def: 12000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.count * v.watts / 1000 * v.hours * v.days * v.tariff
    })
  },
  accumulators: {
    cat: 'office',
    name: 'Аккумуляторы вместо батареек',
    desc: 'Мышки и пульты на зарядке',
    icon: I.battery,
    fields: [
      { key: 'batteries', label: 'Батареек в год', unit: 'шт', def: 240 },
      { key: 'priceEach', label: 'Цена батарейки', unit: 'руб', def: 70 },
      { key: 'ownCost', label: 'Доля аккумуляторов', unit: 'руб/год', def: 5000 },
      { key: 'chargeCost', label: 'Электричество на зарядку', unit: 'руб/год', def: 100 },
      { key: 'price', label: 'Аккумуляторы и зарядка', unit: 'руб', def: 8000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.batteries * v.priceEach - v.ownCost - v.chargeCost
    })
  },
  furnitureReuse: {
    cat: 'office',
    name: 'Мебель между отделами',
    desc: 'Сначала реестр свободного, потом закупка',
    icon: I.sofa,
    fields: [
      { key: 'units', label: 'Не купили единиц', unit: 'шт', def: 8 },
      { key: 'unitPrice', label: 'Цена новой', unit: 'руб', def: 12000, step: 100 },
      { key: 'repairEach', label: 'Ремонт и перенос', unit: 'руб/шт', def: 1500, step: 100 }
    ],
    calc: v => ({
      budget: v.units * v.repairEach,
      savings: v.units * v.unitPrice
    })
  },
  cartridges: {
    cat: 'office',
    name: 'Восстановленные картриджи',
    desc: 'Пилот на части парка принтеров',
    icon: I.printer,
    fields: [
      { key: 'count', label: 'Картриджей в год', unit: 'шт', def: 40 },
      { key: 'priceOrig', label: 'Оригинал', unit: 'руб', def: 8000, step: 100 },
      { key: 'priceRefill', label: 'Восстановленный', unit: 'руб', def: 5000, step: 100 },
      { key: 'extra', label: 'Брак и сервис', unit: 'руб/год', def: 10000 },
      { key: 'price', label: 'Пилот', unit: 'руб', def: 15000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.count * (v.priceOrig - v.priceRefill) - v.extra
    })
  },

  // ===== ЗАВОД =====

  airPressure: {
    cat: 'factory',
    name: 'Давление сжатого воздуха',
    desc: 'Избыточные полбара жгут электричество',
    icon: I.gauge,
    fields: [
      { key: 'kwSaved', label: 'Снижение мощности', unit: 'кВт', def: 4, step: 0.1 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 6000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.kwSaved * v.hours * v.tariff
    })
  },
  compressorFilters: {
    cat: 'factory',
    name: 'Фильтры компрессора',
    desc: 'Чистый всас — меньше ватт на тот же воздух',
    icon: I.gauge,
    fields: [
      { key: 'kwSaved', label: 'Снижение мощности', unit: 'кВт', def: 0.8, step: 0.1 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 6000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 8000 },
      { key: 'price', label: 'Фильтры', unit: 'руб', def: 8000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwSaved * v.hours * v.tariff - v.service
    })
  },
  condensateReturn: {
    cat: 'factory',
    name: 'Возврат конденсата',
    desc: 'Горячий конденсат снова в котельную',
    icon: I.flame,
    fields: [
      { key: 'tph', label: 'Конденсат', unit: 'т/ч', def: 0.6, step: 0.1 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 5000, step: 100 },
      { key: 'kwhPerTon', label: 'Экономия на тонну', unit: 'кВт·ч/т', def: 60, step: 5 },
      { key: 'tariff', label: 'Тариф тепла', unit: 'руб/кВт·ч', def: 2, step: 0.1 },
      { key: 'price', label: 'Обвязка и насосы', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.tph * v.hours * v.kwhPerTon * v.tariff
    })
  },
  economizer: {
    cat: 'factory',
    name: 'Экономайзер котла',
    desc: 'Тепло дымовых газов греет питательную воду',
    icon: I.flame,
    fields: [
      { key: 'fuelKwh', label: 'Топливо за год', unit: 'кВт·ч', def: 2000000, step: 10000 },
      { key: 'percent', label: 'Экономия топлива', unit: '%', def: 3, step: 0.5 },
      { key: 'fuelPrice', label: 'Цена топлива', unit: 'руб/кВт·ч', def: 1.8, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 0, step: 500 },
      { key: 'price', label: 'Экономайзер и монтаж', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.fuelKwh * v.percent / 100 * v.fuelPrice - v.service
    })
  },
  blowdownHeat: {
    cat: 'factory',
    name: 'Тепло продувки котла',
    desc: 'Продувочная вода греет подпитку',
    icon: I.flame,
    fields: [
      { key: 'tph', label: 'Продувка', unit: 'т/ч', def: 0.3, step: 0.1 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 4000, step: 100 },
      { key: 'kwhPerTon', label: 'Тепло на тонну', unit: 'кВт·ч/т', def: 25, step: 5 },
      { key: 'tariff', label: 'Тариф тепла', unit: 'руб/кВт·ч', def: 2, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 0, step: 500 },
      { key: 'price', label: 'Теплообменник', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.tph * v.hours * v.kwhPerTon * v.tariff - v.service
    })
  },
  burnerTune: {
    cat: 'factory',
    name: 'Настройка горелок',
    desc: 'Горение по кислороду в дымовых газах',
    icon: I.flame,
    fields: [
      { key: 'fuelCost', label: 'Топливо за год', unit: 'руб/год', def: 8000000, step: 10000 },
      { key: 'percent', label: 'Снижение расхода', unit: '%', def: 1.5, step: 0.5 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 20000 },
      { key: 'price', label: 'Наладка', unit: 'руб', def: 50000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.fuelCost * v.percent / 100 - v.service
    })
  },
  pumpTrim: {
    cat: 'factory',
    name: 'Подрезка колеса насоса',
    desc: 'Напор по факту, а не дросселем',
    icon: I.gear,
    fields: [
      { key: 'kwSaved', label: 'Снижение мощности', unit: 'кВт', def: 3, step: 0.1 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 5000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Работы', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwSaved * v.hours * v.tariff
    })
  },
  fanVfd: {
    cat: 'factory',
    name: 'Частотник на градирне',
    desc: 'Вентиляторы крутятся по температуре воды',
    icon: I.wind,
    fields: [
      { key: 'kwSaved', label: 'Снижение мощности', unit: 'кВт', def: 5, step: 0.1 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 4000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Привод и автоматика', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwSaved * v.hours * v.tariff
    })
  },
  hxClean: {
    cat: 'factory',
    name: 'Чистка теплообменников',
    desc: 'Накипь съедает теплопередачу',
    icon: I.gear,
    fields: [
      { key: 'kwhSaved', label: 'Экономия за год', unit: 'кВт·ч/год', def: 20000, step: 100 },
      { key: 'tariff', label: 'Тариф тепла', unit: 'руб/кВт·ч', def: 2, step: 0.1 },
      { key: 'cleanCost', label: 'Очистка', unit: 'руб/год', def: 15000 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff - v.cleanCost
    })
  },
  machineOff: {
    cat: 'factory',
    name: 'Станки на паузах',
    desc: 'Холостой ход — только на время работы',
    icon: I.gear,
    fields: [
      { key: 'count', label: 'Станков', unit: 'шт', def: 8 },
      { key: 'kwIdle', label: 'Мощность холостого хода', unit: 'кВт', def: 2, step: 0.1 },
      { key: 'hours', label: 'Часов простоя в день', unit: 'ч', def: 1, step: 0.5 },
      { key: 'days', label: 'Рабочих дней', unit: 'дн', def: 250 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 }
    ],
    calc: v => ({
      budget: 0,
      savings: v.count * v.kwIdle * v.hours * v.days * v.tariff
    })
  },
  warmupCycles: {
    cat: 'factory',
    name: 'Прогревы по графику',
    desc: 'Партии вместе — прогревов меньше',
    icon: I.clock,
    fields: [
      { key: 'cycles', label: 'Сокращение циклов', unit: 'цикл/год', def: 40 },
      { key: 'kwhPerCycle', label: 'Энергия на цикл', unit: 'кВт·ч', def: 500, step: 10 },
      { key: 'tariff', label: 'Тариф энергии', unit: 'руб/кВт·ч', def: 2, step: 0.1 },
      { key: 'extra', label: 'Доп. затраты', unit: 'руб/год', def: 0, step: 500 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.cycles * v.kwhPerCycle * v.tariff - v.extra
    })
  },
  cascadeWater: {
    cat: 'factory',
    name: 'Каскадная промывка',
    desc: 'Вода с последней стадии — на первую',
    icon: I.drop,
    fields: [
      { key: 'm3Saved', label: 'Снижение расхода', unit: 'м³/год', def: 500, step: 10 },
      { key: 'tariff', label: 'Вода и стоки', unit: 'руб/м³', def: 90, step: 1 },
      { key: 'extra', label: 'Насосы и очистка', unit: 'руб/год', def: 8000 },
      { key: 'price', label: 'Обвязка', unit: 'руб', def: 0, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.m3Saved * v.tariff - v.extra
    })
  },
  scrapSort: {
    cat: 'factory',
    name: 'Сортировка лома',
    desc: 'Лом — в переработку, вывоз — дешевле',
    icon: I.trash,
    fields: [
      { key: 'tons', label: 'Лом за год', unit: 'т', def: 10, step: 0.5 },
      { key: 'sellPrice', label: 'Цена реализации', unit: 'руб/т', def: 7000, step: 100 },
      { key: 'avoidCost', label: 'Плата за вывоз', unit: 'руб/т', def: 2000, step: 100 },
      { key: 'sortCost', label: 'Сортировка и транспорт', unit: 'руб/год', def: 25000 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.tons * (v.sellPrice + v.avoidCost) - v.sortCost
    })
  },
  electricTools: {
    cat: 'factory',
    name: 'Электроинструмент вместо пневмо',
    desc: 'Пневмопривод — это косвенные ватты компрессора',
    icon: I.gear,
    fields: [
      { key: 'kwhOld', label: 'Компрессор на пневмо', unit: 'кВт·ч/год', def: 4000, step: 100 },
      { key: 'kwhNew', label: 'Электроинструмент', unit: 'кВт·ч/год', def: 1500, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Инструмент', unit: 'руб', def: 45000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: (v.kwhOld - v.kwhNew) * v.tariff
    })
  },
  blowdownAuto: {
    cat: 'factory',
    name: 'Продувка по проводимости',
    desc: 'Автоматика держит качество воды без перелива',
    icon: I.flame,
    fields: [
      { key: 'm3Saved', label: 'Сокращение продувки', unit: 'м³/год', def: 100, step: 10 },
      { key: 'costPerM3', label: 'Вода, подготовка, тепло', unit: 'руб/м³', def: 250, step: 10 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 5000 },
      { key: 'price', label: 'Автоматика', unit: 'руб', def: 80000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.m3Saved * v.costPerM3 - v.service
    })
  },
  insulationJackets: {
    cat: 'factory',
    name: 'Чехлы на арматуру',
    desc: 'Съёмные теплоизоляционные чехлы на фланцы',
    icon: I.pipe,
    fields: [
      { key: 'wattsSaved', label: 'Снижение потерь', unit: 'Вт', def: 1800, step: 50 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 5000, step: 100 },
      { key: 'tariff', label: 'Тариф тепла', unit: 'руб/кВт·ч', def: 2, step: 0.1 },
      { key: 'price', label: 'Чехлы', unit: 'руб', def: 35000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.wattsSaved / 1000 * v.hours * v.tariff
    })
  },
  localHeating: {
    cat: 'factory',
    name: 'Местный нагрев вместо пара',
    desc: 'Маленьким потребителям — свой нагреватель',
    icon: I.flame,
    fields: [
      { key: 'steamCost', label: 'Затраты на пар сейчас', unit: 'руб/год', def: 180000, step: 1000 },
      { key: 'newCost', label: 'Новый нагрев', unit: 'руб/год', def: 135000, step: 1000 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 5000 },
      { key: 'price', label: 'Оборудование', unit: 'руб', def: 120000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.steamCost - v.newCost - v.service
    })
  },
  refrigerationControl: {
    cat: 'factory',
    name: 'Плавающая конденсация',
    desc: 'Холодильная машина следует за погодой',
    icon: I.gauge,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за год', unit: 'кВт·ч/год', def: 18000, step: 500 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Автоматика', unit: 'руб', def: 160000, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  fastDoors: {
    cat: 'factory',
    name: 'Скоростные двери в холодильных',
    desc: 'Проём открыт секунды, а не минуты',
    icon: I.door,
    fields: [
      { key: 'kwhSaved', label: 'Снижение холода', unit: 'кВт·ч/год', def: 9000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 8000 },
      { key: 'price', label: 'Двери и завесы', unit: 'руб', def: 180000, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff - v.service
    })
  },
  coolingTower: {
    cat: 'factory',
    name: 'Градирня по солесодержанию',
    desc: 'Продувка и подпитка по электропроводности',
    icon: I.wind,
    fields: [
      { key: 'm3Saved', label: 'Экономия воды', unit: 'м³/год', def: 900, step: 10 },
      { key: 'tariff', label: 'Вода и стоки', unit: 'руб/м³', def: 90, step: 1 },
      { key: 'reagents', label: 'Экономия реагентов', unit: 'руб/год', def: 18000 },
      { key: 'extra', label: 'Доп. затраты', unit: 'руб/год', def: 8000 },
      { key: 'price', label: 'Автоматика', unit: 'руб', def: 100000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.m3Saved * v.tariff + v.reagents - v.extra
    })
  },
  sewageHeat: {
    cat: 'factory',
    name: 'Тепло сточных вод',
    desc: 'Теплообменник на тёплых стоках',
    icon: I.drop,
    fields: [
      { key: 'heatKwh', label: 'Возвращённое тепло', unit: 'кВт·ч/год', def: 30000, step: 500 },
      { key: 'heatTariff', label: 'Тариф тепла', unit: 'руб/кВт·ч', def: 2, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 10000 },
      { key: 'price', label: 'Теплообменник и монтаж', unit: 'руб', def: 250000, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.heatKwh * v.heatTariff - v.service
    })
  },
  dryerRecovery: {
    cat: 'factory',
    name: 'Рекуперация сушилки',
    desc: 'Вытяжка сушилки греет приточный воздух',
    icon: I.wind,
    fields: [
      { key: 'heatKwh', label: 'Возвращённое тепло', unit: 'кВт·ч/год', def: 45000, step: 500 },
      { key: 'heatTariff', label: 'Тариф тепла', unit: 'руб/кВт·ч', def: 2, step: 0.1 },
      { key: 'fanKwh', label: 'Доп. электричество', unit: 'кВт·ч/год', def: 1000 },
      { key: 'elecTariff', label: 'Тариф электричества', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 12000 },
      { key: 'price', label: 'Рекуператор', unit: 'руб', def: 300000, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.heatKwh * v.heatTariff - v.fanKwh * v.elecTariff - v.service
    })
  },
  vacuumControl: {
    cat: 'factory',
    name: 'Вакуум по требованию',
    desc: 'Насосы держат нужный вакуум, не максимум',
    icon: I.gauge,
    fields: [
      { key: 'kwSaved', label: 'Снижение мощности', unit: 'кВт', def: 2.5, step: 0.1 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 5000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Автоматика', unit: 'руб', def: 95000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwSaved * v.hours * v.tariff
    })
  },
  exhaustAuto: {
    cat: 'factory',
    name: 'Вытяжки по состоянию станка',
    desc: 'Вытяжка работает, когда работает станок',
    icon: I.wind,
    fields: [
      { key: 'count', label: 'Вентиляторов', unit: 'шт', def: 3 },
      { key: 'kwEach', label: 'Мощность каждого', unit: 'кВт', def: 2, step: 0.1 },
      { key: 'hoursSaved', label: 'Сокращение часов', unit: 'ч/год', def: 700 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Автоматика', unit: 'руб', def: 65000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.count * v.kwEach * v.hoursSaved * v.tariff
    })
  },
  hydraulics: {
    cat: 'factory',
    name: 'Гидросистема по потребности',
    desc: 'Насос гидростанции по факту давления',
    icon: I.gear,
    fields: [
      { key: 'kwSaved', label: 'Снижение мощности', unit: 'кВт', def: 1.8, step: 0.1 },
      { key: 'hours', label: 'Часов в год', unit: 'ч', def: 4500, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 7, step: 0.1 },
      { key: 'price', label: 'Привод и доработка', unit: 'руб', def: 140000, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwSaved * v.hours * v.tariff
    })
  },
  nesting: {
    cat: 'factory',
    name: 'Раскрой без обрезков',
    desc: 'ПО раскладки режет отход материала',
    icon: I.grid,
    fields: [
      { key: 'wasteSaved', label: 'Снижение отхода', unit: 'кг/изделие', def: 0.25, step: 0.05 },
      { key: 'units', label: 'Изделий в год', unit: 'шт', def: 20000, step: 100 },
      { key: 'materialPrice', label: 'Цена материала', unit: 'руб/кг', def: 180, step: 10 },
      { key: 'extra', label: 'Лицензия и поддержка', unit: 'руб/год', def: 80000 },
      { key: 'price', label: 'Внедрение', unit: 'руб', def: 250000, step: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.wasteSaved * v.units * v.materialPrice - v.extra
    })
  },

  // ===== ДАЧА =====

  soilSensor: {
    cat: 'dacha',
    name: 'Полив по датчику',
    desc: 'Поливаем, когда земля просохла, а не по часам',
    icon: I.drop,
    fields: [
      { key: 'm3Saved', label: 'Снижение за сезон', unit: 'м³', def: 35 },
      { key: 'tariff', label: 'Стоимость воды', unit: 'руб/м³', def: 30, step: 1 },
      { key: 'price', label: 'Датчики', unit: 'руб', def: 3000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.m3Saved * v.tariff
    })
  },
  mulch: {
    cat: 'dacha',
    name: 'Мульча на грядки',
    desc: 'Почва медленнее сохнет — полив реже',
    icon: I.sprout,
    fields: [
      { key: 'm3Saved', label: 'Снижение полива', unit: 'м³', def: 20 },
      { key: 'tariff', label: 'Стоимость воды', unit: 'руб/м³', def: 30, step: 1 },
      { key: 'price', label: 'Мульча', unit: 'руб', def: 300 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.m3Saved * v.tariff
    })
  },
  greenhouseCurtain: {
    cat: 'dacha',
    name: 'Штора в теплице',
    desc: 'Ночная штора режет теплопотери',
    icon: I.greenhouse,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за сезон', unit: 'кВт·ч', def: 250 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Штора', unit: 'руб', def: 2000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  waterBuffer: {
    cat: 'dacha',
    name: 'Бочки-теплоаккумулятор',
    desc: 'Днём копят тепло, ночью отдают',
    icon: I.barrel,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за сезон', unit: 'кВт·ч', def: 120 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Ёмкости', unit: 'руб', def: 3000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  shadeNet: {
    cat: 'dacha',
    name: 'Затенение теплицы',
    desc: 'Сетка и форточки вместо перегрева',
    icon: I.greenhouse,
    fields: [
      { key: 'kwSaved', label: 'Снижение мощности', unit: 'кВт', def: 0.15, step: 0.05 },
      { key: 'hours', label: 'Часов в сезон', unit: 'ч', def: 500 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Сетка и автоматика', unit: 'руб', def: 0, step: 500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwSaved * v.hours * v.tariff
    })
  },
  solarShower: {
    cat: 'dacha',
    name: 'Солнечный душ',
    desc: 'Вода греется солнцем, а не ТЭНом',
    icon: I.sun,
    fields: [
      { key: 'kwhSaved', label: 'Замещено за сезон', unit: 'кВт·ч', def: 250 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'service', label: 'Обслуживание', unit: 'руб/год', def: 200 },
      { key: 'price', label: 'Коллектор', unit: 'руб', def: 0, step: 500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff - v.service
    })
  },
  solarLamps: {
    cat: 'dacha',
    name: 'Солнечные светильники',
    desc: 'Дорожки без проводов и счётчика',
    icon: I.bulb,
    fields: [
      { key: 'count', label: 'Светильников', unit: 'шт', def: 6 },
      { key: 'watts', label: 'Мощность сетевых', unit: 'Вт', def: 5 },
      { key: 'hours', label: 'Часов в сутки', unit: 'ч', def: 5 },
      { key: 'days', label: 'Дней сезона', unit: 'дн', def: 180 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Светильники', unit: 'руб', def: 0, step: 500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.count * v.watts / 1000 * v.hours * v.days * v.tariff
    })
  },
  rainwater: {
    cat: 'dacha',
    name: 'Дождевая вода с крыши',
    desc: 'Ёмкость под водостоком для полива',
    icon: I.rain,
    fields: [
      { key: 'roof', label: 'Площадь крыши', unit: 'м²', def: 60 },
      { key: 'rain', label: 'Осадки за сезон', unit: 'мм', def: 400, step: 10 },
      { key: 'coeff', label: 'Коэффициент стока', unit: 'доля', def: 0.8, step: 0.05 },
      { key: 'share', label: 'Используете', unit: '%', def: 60, step: 5 },
      { key: 'tariff', label: 'Стоимость воды', unit: 'руб/м³', def: 30, step: 1 },
      { key: 'price', label: 'Ёмкость и фильтр', unit: 'руб', def: 0, step: 500 }
    ],
    calc: v => {
      const m3 = v.roof * v.rain / 1000 * v.coeff * v.share / 100;
      return { budget: v.price, savings: m3 * v.tariff };
    }
  },
  greyWater: {
    cat: 'dacha',
    name: 'Серая вода на полив',
    desc: 'Вода из-под рук — под грядки по санитарным правилам',
    icon: I.drop,
    fields: [
      { key: 'm3Used', label: 'Повторно за сезон', unit: 'м³', def: 8 },
      { key: 'tariff', label: 'Стоимость воды', unit: 'руб/м³', def: 30, step: 1 },
      { key: 'extra', label: 'Фильтры и подача', unit: 'руб/год', def: 80 },
      { key: 'price', label: 'Затраты', unit: 'руб', def: 0 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.m3Used * v.tariff - v.extra
    })
  },
  pipeFreeze: {
    cat: 'dacha',
    name: 'Кабель против замерзания',
    desc: 'Саморегулирующийся кабель с термостатом',
    icon: I.pipe,
    fields: [
      { key: 'power', label: 'Мощность кабеля', unit: 'кВт', def: 0.15, step: 0.05 },
      { key: 'hours', label: 'Часов за сезон', unit: 'ч', def: 200 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Кабель и монтаж', unit: 'руб', def: 4000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.power * v.hours * v.tariff
    })
  },
  shutters: {
    cat: 'dacha',
    name: 'Ставни и рольставни',
    desc: 'Ночь — закрыто: и зимой, и в жару',
    icon: I.window,
    fields: [
      { key: 'climateCost', label: 'Затраты на климат', unit: 'руб/год', def: 18000, step: 500 },
      { key: 'percent', label: 'Снижение', unit: '%', def: 5, step: 0.5 },
      { key: 'price', label: 'Ставни', unit: 'руб', def: 25000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.climateCost * v.percent / 100
    })
  },
  cellarLid: {
    cat: 'dacha',
    name: 'Утепление погреба',
    desc: 'Крышка и уплотнитель между домом и подвалом',
    icon: I.door,
    fields: [
      { key: 'heatCost', label: 'Отопление за сезон', unit: 'руб', def: 20000, step: 500 },
      { key: 'percent', label: 'Снижение', unit: '%', def: 2, step: 0.5 },
      { key: 'price', label: 'Материалы', unit: 'руб', def: 2500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.heatCost * v.percent / 100
    })
  },
  tankJacket: {
    cat: 'dacha',
    name: 'Чехол на водонагреватель',
    desc: 'Бак меньше теряет тепло',
    icon: I.barrel,
    fields: [
      { key: 'wattsSaved', label: 'Снижение потерь', unit: 'Вт', def: 20, step: 5 },
      { key: 'hours', label: 'Часов в году', unit: 'ч', def: 4000, step: 100 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Утепление', unit: 'руб', def: 1500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.wattsSaved / 1000 * v.hours * v.tariff
    })
  },
  poolCover: {
    cat: 'dacha',
    name: 'Чехол на бассейн',
    desc: 'Меньше испарения, загрязнения и нагрева',
    icon: I.waves,
    fields: [
      { key: 'waterM3', label: 'Сэкономленная вода', unit: 'м³/сезон', def: 6, step: 0.5 },
      { key: 'waterTariff', label: 'Стоимость воды', unit: 'руб/м³', def: 30, step: 1 },
      { key: 'heatKwh', label: 'Сэкономленный нагрев', unit: 'кВт·ч', def: 250, step: 10 },
      { key: 'elecTariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Чехол', unit: 'руб', def: 4000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.waterM3 * v.waterTariff + v.heatKwh * v.elecTariff
    })
  },
  pumpTune: {
    cat: 'dacha',
    name: 'Настройка скважинного насоса',
    desc: 'Реле и гидроаккумулятор без частых пусков',
    icon: I.gauge,
    fields: [
      { key: 'kwhSaved', label: 'Снижение за сезон', unit: 'кВт·ч', def: 45 },
      { key: 'tariff', label: 'Тариф', unit: 'руб/кВт·ч', def: 6, step: 0.1 },
      { key: 'price', label: 'Обслуживание', unit: 'руб', def: 2500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.kwhSaved * v.tariff
    })
  },
  dryProtection: {
    cat: 'dacha',
    name: 'Защита насоса от сухого хода',
    desc: 'Датчик уровня против дорогого ремонта',
    icon: I.drop,
    fields: [
      { key: 'probOld', label: 'Риск поломки сейчас', unit: '%', def: 20, step: 1 },
      { key: 'probNew', label: 'Риск после защиты', unit: '%', def: 5, step: 1 },
      { key: 'repairCost', label: 'Стоимость ремонта', unit: 'руб', def: 15000, step: 500 },
      { key: 'price', label: 'Защита', unit: 'руб', def: 4000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: (v.probOld - v.probNew) / 100 * v.repairCost
    })
  },
  batteryTrimmer: {
    cat: 'dacha',
    name: 'Аккумуляторный триммер',
    desc: 'Бензин и свечи — в прошлое',
    icon: I.mower,
    fields: [
      { key: 'oldCost', label: 'Бензин и ТО сейчас', unit: 'руб/год', def: 5000, step: 100 },
      { key: 'charge', label: 'Электричество на зарядку', unit: 'руб/год', def: 120 },
      { key: 'newService', label: 'ТО нового', unit: 'руб/год', def: 1000 },
      { key: 'price', label: 'Триммер', unit: 'руб', def: 18000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.oldCost - v.charge - v.newService
    })
  },
  manualMower: {
    cat: 'dacha',
    name: 'Ручная газонокосилка',
    desc: 'Для ровного небольшого газона',
    icon: I.mower,
    fields: [
      { key: 'hours', label: 'Часов покоса в год', unit: 'ч', def: 15 },
      { key: 'fuelPerHour', label: 'Расход бензина', unit: 'л/ч', def: 0.6, step: 0.1 },
      { key: 'fuelPrice', label: 'Цена бензина', unit: 'руб/л', def: 60, step: 1 },
      { key: 'savedService', label: 'Экономия на ТО', unit: 'руб/год', def: 700 },
      { key: 'newService', label: 'ТО ручной', unit: 'руб/год', def: 200 },
      { key: 'price', label: 'Косилка', unit: 'руб', def: 8000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.hours * v.fuelPerHour * v.fuelPrice + v.savedService - v.newService
    })
  },
  mulchKit: {
    cat: 'dacha',
    name: 'Мульчирующая насадка',
    desc: 'Трава остаётся на газоне, вывоз не нужен',
    icon: I.sprout,
    fields: [
      { key: 'trips', label: 'Вывозов в год', unit: 'раз', def: 20 },
      { key: 'priceEach', label: 'Стоимость вывоза', unit: 'руб', def: 100 },
      { key: 'extra', label: 'Доп. расходы', unit: 'руб/год', def: 500 },
      { key: 'price', label: 'Насадка', unit: 'руб', def: 2500 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.trips * v.priceEach - v.extra
    })
  },
  soilAnalysis: {
    cat: 'dacha',
    name: 'Анализ почвы',
    desc: 'Удобрения по анализу, а не на глаз',
    icon: I.sprout,
    fields: [
      { key: 'fertCost', label: 'Удобрения сейчас', unit: 'руб/год', def: 8000, step: 100 },
      { key: 'percent', label: 'Сокращение закупки', unit: '%', def: 20, step: 1 },
      { key: 'price', label: 'Анализ и консультация', unit: 'руб', def: 1000 }
    ],
    calc: v => ({
      budget: v.price,
      savings: v.fertCost * v.percent / 100
    })
  }
};

// «1 сценарий / 2 сценария / 5 сценариев»
function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

function init() {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
  renderCats();
  fillCounts();
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Enter в поле ввода = «Посчитать выгоду»
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const form = document.getElementById('screen-form');
    if (form && !form.classList.contains('hidden') && e.target.matches('input')) {
      calculate();
    }
  });
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
  const nM = Object.keys(MEASURES).length;
  const nC = Object.keys(CATS).length;
  const chipM = document.getElementById('chip-measures');
  if (chipM) chipM.innerHTML = `<b>${nM}</b> ${plural(nM, 'сценарий', 'сценария', 'сценариев')}`;
  const chipC = document.getElementById('chip-cats');
  if (chipC) chipC.innerHTML = `<b>${nC}</b> ${plural(nC, 'категория', 'категории', 'категорий')}`;
  const fm = document.getElementById('fact-measures');
  if (fm) fm.textContent = nM;
  const fw = document.getElementById('fact-measures-word');
  if (fw) fw.textContent = plural(nM, 'сценарий', 'сценария', 'сценариев');
  const fc = document.getElementById('fact-cats');
  if (fc) fc.textContent = nC;
  const cw = document.getElementById('fact-cats-word');
  if (cw) cw.textContent = plural(nC, 'категория', 'категории', 'категорий');
}

// Плашки категорий на первом экране
function renderCats() {
  const box = document.getElementById('cat-tiles');
  box.innerHTML = '';
  Object.keys(CATS).forEach(cat => {
    const info = CATS[cat];
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'cat-tile';
    tile.style.setProperty('--cat', info.color);
    tile.onclick = () => openCat(cat);
    tile.innerHTML = `
      <span class="cat-tile-icon"><svg viewBox="0 0 24 24" fill="none">${info.icon}</svg></span>
      <span class="cat-tile-body">
        <span class="cat-tile-name">${info.name}</span>
        <span class="cat-tile-hint">${info.hint}</span>
      </span>
      <span class="cat-tile-count">${countLabel(cat)}</span>
    `;
    box.appendChild(tile);
  });
}

// «39 мероприятий / 24 мероприятия / 21 мероприятие»
function countLabel(cat) {
  const n = Object.values(MEASURES).filter(m => m.cat === cat).length;
  return `${n} ${plural(n, 'мероприятие', 'мероприятия', 'мероприятий')}`;
}

// Пилюли-закладки на экране категории — переключение без возврата к плашкам
function buildFilters(active) {
  const box = document.getElementById('filters');
  box.innerHTML = '';
  Object.keys(CATS).forEach(cat => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'filter' + (cat === active ? ' active' : '');
    b.dataset.cat = cat;
    b.onclick = () => switchCat(cat);
    b.innerHTML = `${CATS[cat].name}<span class="filter-count">${Object.values(MEASURES).filter(m => m.cat === cat).length}</span>`;
    box.appendChild(b);
  });
}

function switchCat(cat) {
  currentFilter = cat;
  const info = CATS[cat];
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  const heading = document.getElementById('cat-heading');
  heading.style.setProperty('--cat', info.color);
  document.getElementById('cat-name').textContent = info.name;
  document.getElementById('cat-count').textContent = countLabel(cat);
  document.getElementById('cat-hint').textContent = info.hint;
  renderGrid(cat);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openCat(cat) {
  buildFilters(cat);
  switchCat(cat);
  showScreen('screen-cat');
}

function cardFor(key) {
  const m = MEASURES[key];
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'measure-card';
  card.style.setProperty('--cat', CATS[m.cat].color);
  card.onclick = () => openMeasure(key);
  card.innerHTML = `
    <span class="measure-icon"><svg viewBox="0 0 24 24" fill="none">${m.icon}</svg></span>
    <div class="measure-body">
      <div class="measure-title">${m.name}</div>
      <div class="measure-desc">${m.desc}</div>
    </div>
    <span class="measure-go">Рассчитать
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </span>
  `;
  return card;
}

function renderGrid(cat) {
  const grid = document.getElementById('measures-grid');
  grid.innerHTML = '';
  Object.keys(MEASURES).forEach(k => {
    if (MEASURES[k].cat === cat) grid.appendChild(cardFor(k));
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
  ['screen-cats', 'screen-cat', 'screen-form', 'screen-result'].forEach(s => {
    document.getElementById(s).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// С экрана категории → к плашкам; из формы и результата → к списку мероприятий
function goBack() { showScreen('screen-cats'); }
function goList() { showScreen('screen-cat'); }
function goHome() { showScreen('screen-cats'); }
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

  // Цена не задана по умолчанию — предупредить, иначе окупаемость обманет
  const priceField = m.fields.find(f => f.key === 'price');
  if (priceField && priceField.def === 0) {
    const note = document.createElement('p');
    note.className = 'form-note';
    note.textContent = 'Стоимость не заполнена: впишите её, если мероприятие что-то стоит, — без неё окупаемость покажет «мгновенно».';
    box.appendChild(note);
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
  if (months < 1) return 'меньше месяца';
  if (months < 24) return months + ' мес.';
  const years = Math.round(payback / 12 * 10) / 10;
  const word = Number.isInteger(years) ? plural(years, 'год', 'года', 'лет') : 'года';
  return `${months} мес ≈ ${String(years).replace('.', ',')} ${word}`;
}

function verdictFor(savings, budget, payback) {
  if (savings <= 0) return 'Так не сэкономить — перепроверьте цифры.';
  if (budget === 0) return 'Потрачено ноль — окупать нечего, экономия идёт с первого дня. Если мероприятие всё же что-то стоит, впишите цену в форме и посчитайте снова.';
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
