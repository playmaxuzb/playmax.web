/* PLAYMAX shared core: catalog data, i18n, body-only recolor, 360 viewer, AI engine, intro engine. */
(function () {
  'use strict';
  const img = (n) => 'assets/p' + String(n).padStart(2, '0') + '.webp';

  const CATS = [
    { id: 'boxing', hero: 32, color: '#1F5BD8', tint: '#E4F4FE', name: { en: 'Boxing machines', fa: 'ماشین‌های بوکس', uz: 'Boks avtomatlari', ru: 'Боксёрские автоматы' } },
    { id: 'arcade', hero: 10, color: '#E0337A', tint: '#FFE8F0', name: { en: 'Prize claws', fa: 'ماشین‌های جایزه', uz: 'Sovrin avtomatlari', ru: 'Призовые автоматы' } },
    { id: 'challenge', hero: 24, color: '#E06A0B', tint: '#FFEEDD', name: { en: 'Strength & reaction', fa: 'زور و واکنش', uz: 'Kuch va reaksiya', ru: 'Сила и реакция' } },
    { id: 'vr', hero: 29, color: '#1F5BD8', tint: '#E6EEFF', name: { en: 'VR zones', fa: 'واقعیت مجازی', uz: 'VR zonalar', ru: 'VR-зоны' } },
    { id: 'tablegames', hero: 17, color: '#B97800', tint: '#FFF3D6', name: { en: 'Table games', fa: 'بازی‌های میزی', uz: 'Stol o‘yinlari', ru: 'Настольные игры' } },
    { id: 'playground', hero: 13, color: '#1E9E52', tint: '#E3F7EA', name: { en: 'Kids playgrounds', fa: 'پارک کودکان', uz: 'Bolalar maydonchalari', ru: 'Детские площадки' } },
    { id: 'rides', hero: 27, color: '#E8352B', tint: '#FFE6E3', name: { en: 'Rides', fa: 'وسایل سواری', uz: 'Attraksionlar', ru: 'Аттракционы' } },
    { id: 'inflatable', hero: 31, color: '#E0337A', tint: '#FFE8F0', name: { en: 'Inflatables', fa: 'بادی‌ها', uz: 'Batutlar', ru: 'Надувные' } },
    { id: 'archery', hero: 26, color: '#E8352B', tint: '#FFE6E3', name: { en: 'Shooting & archery', fa: 'تیراندازی', uz: 'Nishonga otish', ru: 'Стрельба' } },
    { id: 'vending', hero: 21, color: '#0E8FCB', tint: '#E4F4FE', name: { en: 'Vending', fa: 'دستگاه فروش', uz: 'Savdo avtomatlari', ru: 'Вендинг' } },
    { id: 'massage', hero: 12, color: '#51618A', tint: '#EEF1F7', name: { en: 'Massage chairs', fa: 'صندلی ماساژ', uz: 'Massaj kreslolari', ru: 'Массажные кресла' } }
  ];

  const RAW = [
    [1, 'BOX 01', 'King Fighters', 'boxing', 1600, ['800 × 1366 × 2216 mm', '90 W', '210 kg', 'Metal body']],
    [2, 'BOX 02', 'Boxing Club', 'boxing', 1300, ['682 × 1373 × 2087 mm', '75 W', '100 kg', 'Fiberglass']],
    [3, 'BOX 03', 'Boxer Champion', 'boxing', 1300, ['800 × 1366 × 2216 mm', '75 W', '100 kg', 'Fiberglass']],
    [4, 'BOX 04', 'Yellow Boxer', 'boxing', 1300, ['800 × 1366 × 2216 mm', '90 W', '120 kg', 'Fiberglass']],
    [5, 'BOX 05', 'Creed Boxer', 'boxing', 1350, ['800 × 1366 × 2216 mm', '75 W', '120 kg', 'Fiberglass']],
    [6, 'BOX 06', 'Champion', 'boxing', 1300, ['682 × 1373 × 2087 mm', '75 W', '100 kg', 'Fiberglass']],
    [7, 'BOX 07', 'Kicker', 'boxing', 1500, ['945 × 1268 × 2217 mm', '90 W', '180 kg', 'Fiberglass']],
    [8, 'BOX 08', 'King Boxing', 'boxing', 1600, ['800 × 1366 × 2216 mm', '90 W', '210 kg', 'Metal body']],
    [9, 'ASTRO', 'Prize Claw Machine', 'arcade', 850, ['800 × 700 × 2200 mm', '90 W', '80 kg']],
    [10, 'SPACE', 'Prize Claw Machine', 'arcade', 920, ['860 × 780 × 2000 mm', '90 W', '100 kg']],
    [11, 'ORBITA', 'Prize Claw Machine', 'arcade', 880, ['800 × 700 × 2200 mm', '90 W', '100 kg']],
    [12, 'PLAYMAX', 'Automatic Massage Chair', 'massage', 1500, ['Automatic electric massage', 'Bluetooth', 'Foot massage', 'Zero gravity / stretch modes']],
    [13, 'PLAYGROUND 09', 'City Play System', 'playground', 1300, ['620 × 410 × 370 cm', 'LLDPE plastic', 'Metal support structure']],
    [14, 'PLAYGROUND 10', 'Kids Play System', 'playground', 980, ['380 × 130 × 210 cm', 'LLDPE plastic', 'Steel frame']],
    [15, 'PLAYGROUND 11', 'City Play System', 'playground', 1450, ['560 × 250 × 300 cm', 'LLDPE plastic', 'Multi-slide layout']],
    [16, 'PLAYGROUND 12', 'Adventure Play System', 'playground', 1150, ['340 × 250 × 280 cm', 'LLDPE plastic', 'Multi-slide layout']],
    [17, 'HOCKEY 01', 'Air Hockey Table', 'tablegames', 700, ['1060 × 800 × 1830 mm', '110–220 V', 'Plastic and metal']],
    [18, 'HOCKEY 02', 'Air Hockey Table', 'tablegames', 760, ['1880 × 1060 × 250 mm', '110–220 V', 'MDF and PVC']],
    [19, 'HOCKEY 03', 'Air Hockey Table', 'tablegames', 790, ['2130 × 1220 × 810 mm', '110–220 V', 'Plastic and metal']],
    [20, 'MINI FUTBOL', 'Table Football', 'tablegames', 720, ['1380 × 709 × 160 mm', '110–220 V', 'Plastic and metal']],
    [21, 'VENDING 01', 'Smart Drink Vending', 'vending', 1050, ['15.6-inch touchscreen', 'Steel body', 'Card and cash payment']],
    [22, 'VENDING 02', 'Snack & Drink Vending', 'vending', 1180, ['15.6-inch touchscreen', 'Steel body', 'Card, bill and coin']],
    [23, 'HERCULES', 'Reaction Speed Game', 'challenge', 840, ['1205 mm height', '1460 mm base diameter', 'LED reaction targets']],
    [24, 'KING OF THE HILL', 'Strength Test Arcade', 'challenge', 900, ['2600 mm height', '900 × 650 mm base', 'Hammer strength challenge']],
    [25, 'ARCHERY', 'Archery Set', 'archery', 700, ['Bow, arrows, target, accessories', 'Recreation and practice']],
    [26, 'LASER SHOOTING', 'Wireless Laser Shooting', 'archery', 780, ['Wireless laser shooting', 'Multi-player setup']],
    [27, 'JOYFUL', 'Carousel Ride', 'rides', 1250, ['290 × 290 cm', 'Plastic seats', 'Steel base']],
    [28, 'BUNGEE', 'Bungee Trampoline', 'rides', 1350, ['Adjustable bungee harness', 'Recreational attraction']],
    [29, 'VR ZONE', 'VR Shooting Simulator', 'vr', 1100, ['650 × 600 × 2200 mm', '0.28 kW', 'PICO NEO 3 headset', '1 player · 10 games · 65 kg']],
    [30, 'BUMPER BALL', 'Inflatable Bumper Balls', 'inflatable', 700, ['Transparent inflatable balls', 'Green, yellow, red, blue']],
    [31, 'BATUT', 'Inflatable Playgrounds', 'inflatable', 1300, ['Slides, castles, obstacle play', 'Many colorful layouts']],
    [32, 'MANGU', 'MMA Boxing Machine', 'boxing', 1600, ['800 × 1300 × 2210 mm', '100 kg', 'Fiberglass body', 'Score display · punch bag']],
    [33, 'UFC', 'UFC Champion Boxing Machine', 'boxing', 1300, ['800 × 1300 × 2210 mm', '100 kg', 'Fiberglass body · LED base', 'Score display · punch bag']]
  ];
  const PHOTO = new Set([5, 6, 7, 8, 12, 25, 27]);
  const STUDIO = {};
  // Pre-rendered body-only color variants (order: white, black, blue, red, green). Only the body/frame is repainted.
  const COLORMAP = {"mangu":{"front":["assets/c/mangu-front-white.webp","assets/c/mangu-front-black.webp","assets/c/mangu-front-blue.webp","assets/c/mangu-front-red.webp","assets/c/mangu-front-green.webp"],"angle":["assets/c/mangu-angle-white.webp","assets/c/mangu-angle-black.webp","assets/c/mangu-angle-blue.webp","assets/c/mangu-angle-red.webp","assets/c/mangu-angle-green.webp"],"side":["assets/c/mangu-side-white.webp","assets/c/mangu-side-black.webp","assets/c/mangu-side-blue.webp","assets/c/mangu-side-red.webp","assets/c/mangu-side-green.webp"],"back":["assets/c/mangu-back-white.webp","assets/c/mangu-back-black.webp","assets/c/mangu-back-blue.webp","assets/c/mangu-back-red.webp","assets/c/mangu-back-green.webp"]},"ufc":{"front":["assets/c/ufc-front-white.webp","assets/c/ufc-front-black.webp","assets/c/ufc-front-blue.webp","assets/c/ufc-front-red.webp","assets/c/ufc-front-green.webp"],"angle":["assets/c/ufc-angle-white.webp","assets/c/ufc-angle-black.webp","assets/c/ufc-angle-blue.webp","assets/c/ufc-angle-red.webp","assets/c/ufc-angle-green.webp"],"side":["assets/c/ufc-side-white.webp","assets/c/ufc-side-black.webp","assets/c/ufc-side-blue.webp","assets/c/ufc-side-red.webp","assets/c/ufc-side-green.webp"],"back":["assets/c/ufc-back-white.webp","assets/c/ufc-back-black.webp","assets/c/ufc-back-blue.webp","assets/c/ufc-back-red.webp","assets/c/ufc-back-green.webp"]}};
  const MODEL3D = { 32: 'mangu', 33: 'ufc' };
  const VIEWKEY = { 32: 'mangu', 33: 'ufc' };
  const PRODUCTS = RAW.map(([n, model, name, cat, price, specs]) => {
    const vk = VIEWKEY[n], v = vk ? COLORMAP[vk] : null;
    const cm = v ? { native: 3, files: v.front } : null; // only real factory photos
    return {
      id: n, model, name, cat, price, specs, img: v ? v.front[3] : img(n), photo: PHOTO.has(n),
      studio: STUDIO[n] || null, visible: true, landscape: [13, 14, 15, 16, 17, 18, 19, 20, 27, 28, 30, 31, 12].includes(n),
      colors: cm, views: v, model3d: MODEL3D[n] || null, isNew: !!v
    };
  });
  // the image of product p in color index i (null = original photo)
  function colorSrc(p, i, view) {
    if (p.views && view && p.views[view]) return view === 'front' ? p.views.front[i == null ? 3 : i] : p.views[view][3];
    if (i == null || !p.colors) return p.img;
    return p.colors.files[i] || p.img;
  }
  function nativeColor(p) { return p.colors ? p.colors.native : null; }
  const FLAG = {
    uz: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#1EB53A"/><rect width="30" height="13.6" fill="#fff"/><rect width="30" height="6.4" fill="#0099B5"/><rect y="6.4" width="30" height=".7" fill="#CE1126"/><rect y="12.9" width="30" height=".7" fill="#CE1126"/><circle cx="5" cy="3.2" r="2.2" fill="#fff"/><circle cx="5.8" cy="3.2" r="2" fill="#0099B5"/><g fill="#fff"><circle cx="9" cy="2" r=".45"/><circle cx="10.6" cy="2" r=".45"/><circle cx="12.2" cy="2" r=".45"/><circle cx="9" cy="3.6" r=".45"/><circle cx="10.6" cy="3.6" r=".45"/><circle cx="12.2" cy="3.6" r=".45"/></g></svg>',
    ru: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#D52B1E"/><rect width="30" height="13.3" fill="#0039A6"/><rect width="30" height="6.7" fill="#fff"/></svg>',
    fa: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="10" height="20" fill="#000"/><rect x="10" width="10" height="20" fill="#D32011"/><rect x="20" width="10" height="20" fill="#007A36"/><circle cx="15" cy="10" r="4.2" fill="none" stroke="#fff" stroke-width=".9"/><path d="M13.2 11.6h3.6v-1.8l-1.8-1.6-1.8 1.6z" fill="#fff"/></svg>',
    en: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#C8102E" stroke-width="3.4"/></svg>'
  };
  const LANGS = [['uz', 'UZ'], ['ru', 'RU'], ['fa', 'AF'], ['en', 'EN']];

  const COLORS = [
    { id: 'white', hex: '#F3F4F6', name: { en: 'White', fa: 'سفید', uz: 'Oq', ru: 'Белый' } },
    { id: 'black', hex: '#1D1E22', name: { en: 'Black', fa: 'سیاه', uz: 'Qora', ru: 'Чёрный' } },
    { id: 'blue', hex: '#1F5FD8', name: { en: 'Blue', fa: 'آبی', uz: 'Ko‘k', ru: 'Синий' } },
    { id: 'red', hex: '#E0262B', name: { en: 'Red', fa: 'سرخ', uz: 'Qizil', ru: 'Красный' } },
    { id: 'green', hex: '#1E9E52', name: { en: 'Green', fa: 'سبز', uz: 'Yashil', ru: 'Зелёный' } }
  ];

  const RATES = [
    ['Uzbekistan', 30], ['Afghanistan', 150], ['Tajikistan', 150], ['Kyrgyzstan', 150], ['Kazakhstan', 150], ['Turkmenistan', 150]
  ].map(([country, rate]) => ({ country, rate }));

  const CONTACT = {
    email: 'playmax.uzb@gmail.com', phone: '+93 77 990 1111', phoneRaw: '+93779901111', whatsapp: 'https://wa.me/93779901111', telegram: 'https://t.me/+93779901111',
    facebook: 'https://www.facebook.com/profile.php?id=61595843930158',
    instagram: 'https://www.instagram.com/playmax.af/', instagramHandle: '@playmax.af'
  };

  const I18N = {
    en: { dir: 'ltr', market: 'Marketplace', label: 'English', store: 'Store', about: 'About us', ai: 'PLAYMAX AI', profit: 'Profit calculator', studio: 'Color studio', contact: 'Contact', bag: 'Bag', signIn: 'Sign in', heroKicker: 'Arcade · Boxing · Kids · VR', heroTitle: 'Build the place everyone wants to <em>play.</em>', heroText: 'Boxing machines, prize claws, kids playgrounds and VR for malls, parks, cafés and events. Delivered and installed across Uzbekistan, Afghanistan and Central Asia.', shopNow: 'Shop machines', askAi: 'Ask PLAYMAX AI', pickWorld: 'Pick your world', viewAll: 'View all', addToBag: 'Add to bag', view: 'View', rent: 'Rent for an event', checkout: 'Checkout', placeOrder: 'Place order', createAccount: 'Create account', guest: 'Continue as guest', machines: 'machines', from: 'from', welcome: 'Welcome to PLAYMAX', welcomeText: 'Sign in to save your details for the next order, or keep browsing as a guest.', delivery: 'Worldwide delivery', search: 'Search 33 machines', tPhotos: "Photos", t3d: "3D · 360°", tSize: "Size", payCod: "Cash on delivery", payCodSub: "Pay when it arrives", payVisa: "Visa — full payment", payVisaSub: "Secure card page", payHalf: "Visa — 50% deposit", payHalfSub: "Half now, half on delivery", payNow: "Pay now", payLater: "Pay on delivery", domestic: "Delivery inside {c}: cash on delivery is available.", abroad: "International delivery: pay online by Visa — in full, or 50% now and 50% on delivery.", tagline: "Arcade · Boxing · Family Entertainment", skip: "Skip", bodyColor: "Body color", onlyBody: "Only the body/frame is painted. The bag, metal parts, screen and stickers stay original.", made: "The body is painted in your color at the factory; the photo shows the standard color." },
    fa: { dir: 'rtl', market: 'بازار', label: 'دری', store: 'فروشگاه', about: 'درباره ما', ai: 'هوش مصنوعی PLAYMAX', profit: 'محاسبه سود', studio: 'استودیوی رنگ', contact: 'تماس', bag: 'سبد', signIn: 'ورود', heroKicker: 'آرکید · بوکس · کودکان · VR', heroTitle: 'جایی بسازید که همه بخواهند <em>بازی کنند.</em>', heroText: 'ماشین‌های بوکس، ماشین‌های جایزه، پارک کودکان و VR برای مراکز خرید، پارک‌ها، کافه‌ها و رویدادها — با ارسال و نصب در ازبکستان، افغانستان و آسیای میانه.', shopNow: 'خرید ماشین‌ها', askAi: 'از هوش مصنوعی بپرسید', pickWorld: 'دنیای خود را انتخاب کنید', viewAll: 'همه', addToBag: 'افزودن به سبد', view: 'مشاهده', rent: 'کرایه برای رویداد', checkout: 'تکمیل خرید', placeOrder: 'ثبت سفارش', createAccount: 'ساخت حساب', guest: 'ادامه به عنوان مهمان', machines: 'ماشین', from: 'از', welcome: 'به PLAYMAX خوش آمدید', welcomeText: 'وارد شوید تا معلومات شما برای سفارش بعدی ذخیره شود، یا به عنوان مهمان ادامه دهید.', delivery: 'ارسال به سراسر جهان', search: 'جستجو در ۳۳ ماشین', tPhotos: "عکس‌ها", t3d: "سه‌بعدی · ۳۶۰°", tSize: "اندازه", payCod: "پرداخت هنگام تحویل", payCodSub: "وقتی رسید پرداخت کنید", payVisa: "ویزا — پرداخت کامل", payVisaSub: "صفحه امن کارت", payHalf: "ویزا — ۵۰٪ پیش‌پرداخت", payHalfSub: "نیم اکنون، نیم هنگام تحویل", payNow: "پرداخت اکنون", payLater: "هنگام تحویل", domestic: "ارسال در داخل {c}: پرداخت هنگام تحویل ممکن است.", abroad: "ارسال بین‌المللی: پرداخت آنلاین با ویزا — کامل، یا ۵۰٪ اکنون و ۵۰٪ هنگام تحویل.", tagline: "آرکید · بوکس · سرگرمی خانوادگی", skip: "رد شدن", bodyColor: "رنگ بدنه", onlyBody: "فقط بدنه رنگ می‌شود. کیسه، قسمت‌های فلزی، صفحه و استیکرها اصلی می‌مانند.", made: "بدنه به رنگ انتخابی شما در کارخانه رنگ می‌شود؛ عکس رنگ استاندارد را نشان می‌دهد." },
    uz: { dir: 'ltr', market: 'Bozor', label: 'O‘zbekcha', store: 'Do‘kon', about: 'Biz haqimizda', ai: 'PLAYMAX AI', profit: 'Foyda kalkulyatori', studio: 'Rang studiyasi', contact: 'Aloqa', bag: 'Savat', signIn: 'Kirish', heroKicker: 'Arkada · Boks · Bolalar · VR', heroTitle: 'Hamma <em>o‘ynashni</em> xohlaydigan joyni yarating.', heroText: 'Boks avtomatlari, sovrin avtomatlari, bolalar maydonchalari va VR — savdo markazlari, parklar, kafelar va tadbirlar uchun. O‘zbekiston, Afg‘oniston va Markaziy Osiyo bo‘ylab yetkazib berish va o‘rnatish.', shopNow: 'Avtomatlarni ko‘rish', askAi: 'PLAYMAX AI dan so‘rang', pickWorld: 'O‘z dunyongizni tanlang', viewAll: 'Barchasi', addToBag: 'Savatga qo‘shish', view: 'Ko‘rish', rent: 'Tadbirga ijara', checkout: 'Rasmiylashtirish', placeOrder: 'Buyurtma berish', createAccount: 'Hisob yaratish', guest: 'Mehmon sifatida davom etish', machines: 'avtomat', from: 'dan', welcome: 'PLAYMAX ga xush kelibsiz', welcomeText: 'Keyingi buyurtma uchun ma’lumotlaringizni saqlash uchun kiring yoki mehmon sifatida davom eting.', delivery: 'Butun dunyoga yetkazish', search: '33 ta avtomatdan qidirish', tPhotos: "Rasmlar", t3d: "3D · 360°", tSize: "O‘lcham", payCod: "Yetkazilganda naqd", payCodSub: "Kelganda to‘laysiz", payVisa: "Visa — to‘liq to‘lov", payVisaSub: "Xavfsiz karta sahifasi", payHalf: "Visa — 50% oldindan", payHalfSub: "Yarmi hozir, yarmi yetkazilganda", payNow: "Hozir to‘lov", payLater: "Yetkazilganda", domestic: "{c} ichida yetkazish: yetkazilganda naqd to‘lash mumkin.", abroad: "Xalqaro yetkazish: Visa orqali onlayn — to‘liq yoki 50% hozir, 50% yetkazilganda.", tagline: "Arkada · Boks · Oilaviy ko‘ngilochar", skip: "O‘tkazib yuborish", bodyColor: "Korpus rangi", onlyBody: "Faqat korpus bo‘yaladi. Qop, metall qismlar, ekran va stikerlar o‘zgarmaydi.", made: "Korpus zavodda siz tanlagan rangga bo‘yaladi; rasmda standart rang." },
    ru: { dir: 'ltr', market: 'Объявления', label: 'Русский', store: 'Магазин', about: 'О нас', ai: 'PLAYMAX AI', profit: 'Калькулятор прибыли', studio: 'Студия цвета', contact: 'Контакты', bag: 'Корзина', signIn: 'Войти', heroKicker: 'Аркада · Бокс · Дети · VR', heroTitle: 'Создайте место, где хочется <em>играть.</em>', heroText: 'Боксёрские автоматы, призовые автоматы, детские площадки и VR для ТЦ, парков, кафе и мероприятий. Доставка и монтаж по Узбекистану, Афганистану и Центральной Азии.', shopNow: 'Смотреть автоматы', askAi: 'Спросить PLAYMAX AI', pickWorld: 'Выберите свой мир', viewAll: 'Все', addToBag: 'В корзину', view: 'Открыть', rent: 'Аренда на мероприятие', checkout: 'Оформить', placeOrder: 'Оформить заказ', createAccount: 'Создать аккаунт', guest: 'Продолжить как гость', machines: 'автоматов', from: 'от', welcome: 'Добро пожаловать в PLAYMAX', welcomeText: 'Войдите, чтобы сохранить данные для следующего заказа, или продолжайте как гость.', delivery: 'Доставка по всему миру', search: 'Поиск среди 33 автоматов', tPhotos: "Фото", t3d: "3D · 360°", tSize: "Размер", payCod: "Оплата при получении", payCodSub: "Платите при доставке", payVisa: "Visa — полная оплата", payVisaSub: "Защищённая страница карты", payHalf: "Visa — предоплата 50%", payHalfSub: "Половина сейчас, половина при доставке", payNow: "Оплата сейчас", payLater: "При доставке", domestic: "Доставка по стране ({c}): доступна оплата при получении.", abroad: "Международная доставка: онлайн-оплата Visa — полностью или 50% сейчас и 50% при доставке.", tagline: "Аркада · Бокс · Семейные развлечения", skip: "Пропустить", bodyColor: "Цвет корпуса", onlyBody: "Красится только корпус. Груша, металл, экран и наклейки остаются как есть.", made: "Корпус красится в выбранный цвет на заводе; на фото — стандартный цвет." }
  };

  // Full interface phrasebook shared by the standalone website and mobile app.
  // Rows are source English, Dari, Uzbek, Russian. Product/model names remain brand names.
  const UI_PHRASES = [
    ['Home','خانه','Bosh sahifa','Главная'],['Ready to play?','آماده بازی هستید؟','O‘ynashga tayyormisiz?','Готовы играть?'],['Spotlight','ویژه','Tavsiya etiladi','Рекомендуем'],['Swipe','ورق بزنید','Suring','Листайте'],['No match','موردی پیدا نشد','Mos natija topilmadi','Совпадений нет'],['Try “boxing”, “claw” or “VR”, or ask PLAYMAX AI.','«بوکس»، «چنگک» یا «VR» را جستجو کنید، یا از PLAYMAX AI بپرسید.','“Boks”, “kran” yoki “VR” deb qidiring yoki PLAYMAX AI dan so‘rang.','Введите «бокс», «клешня» или «VR» либо спросите PLAYMAX AI.'],
    ['Price ↑','قیمت: کم به زیاد','Narx ↑','Цена ↑'],['Price ↓','قیمت: زیاد به کم','Narx ↓','Цена ↓'],['1.75 m person','شخص با قد ۱٫۷۵ متر','1,75 m bo‘yli odam','Человек ростом 1,75 м'],['3D · drag','سه‌بعدی · بکشید','3D · aylantiring','3D · перетащите'],['Height 221 cm Top width 130 cm Middle width 80 cm Weight 100 kg','ارتفاع ۲۲۱ سانتی‌متر · عرض بالا ۱۳۰ سانتی‌متر · عرض میانه ۸۰ سانتی‌متر · وزن ۱۰۰ کیلوگرم','Balandligi 221 sm · yuqori eni 130 sm · o‘rta eni 80 sm · vazni 100 kg','Высота 221 см · ширина сверху 130 см · посередине 80 см · вес 100 кг'],
    ['demo price','قیمت نمونه','namunaviy narx','демо-цена'],['Quantity','تعداد','Miqdor','Количество'],['Deliver to','ارسال به','Yetkazish manzili','Доставка в'],['per machine ·','برای هر دستگاه ·','har bir avtomat uchun ·','за автомат ·'],['Ask AI about this machine','از هوش مصنوعی درباره این دستگاه بپرسید','Bu avtomat haqida AIdan so‘rang','Спросить ИИ об этом автомате'],['Open calculator','باز کردن محاسبه‌گر','Kalkulyatorni ochish','Открыть калькулятор'],['Try colors','انتخاب رنگ‌ها','Ranglarni tanlash','Выбрать цвет'],['Shipping to Kabul?','ارسال به کابل چقدر است؟','Kobulga yetkazish qancha?','Сколько стоит доставка в Кабул?'],['Best for a café?','برای کافه کدام بهتر است؟','Kafe uchun qaysi biri yaxshi?','Что лучше для кафе?'],['Payback with 40 players a day?','بازگشت سرمایه با ۴۰ بازیکن در روز؟','Kuniga 40 o‘yinchi bo‘lsa, qachon o‘zini oqlaydi?','Окупаемость при 40 игроках в день?'],['Which colors?','چه رنگ‌هایی موجود است؟','Qaysi ranglar bor?','Какие есть цвета?'],['Kids playgrounds','پارک‌های بازی کودکان','Bolalar maydonchalari','Детские площадки'],['PLAYMAX AI · Online · 4 languages','هوش مصنوعی PLAYMAX · آنلاین · ۴ زبان','PLAYMAX AI · onlayn · 4 til','PLAYMAX AI · онлайн · 4 языка'],
    ['Your bag is empty','سبد خرید شما خالی است','Savat bo‘sh','Корзина пуста'],['Pick a machine — it will wait here.','یک دستگاه انتخاب کنید تا اینجا نمایش داده شود.','Avtomat tanlang — u shu yerda ko‘rinadi.','Выберите автомат — он появится здесь.'],['Shipping ·','ارسال ·','Yetkazish ·','Доставка ·'],['Installation ·','نصب ·','O‘rnatish ·','Установка ·'],['Filled from your account','از حساب شما تکمیل شد','Hisobingizdan to‘ldirildi','Заполнено из вашего аккаунта'],['Order received','سفارش دریافت شد','Buyurtma qabul qilindi','Заказ принят'],['Thank you,','سپاس،','Rahmat,','Спасибо,'],['to confirm delivery.','برای تأیید تحویل.','yetkazishni tasdiqlash uchun.','чтобы подтвердить доставку.'],['Back to home','بازگشت به خانه','Bosh sahifaga qaytish','На главную'],['Not yet','هنوز نه','Hali emas','Пока нет'],
    ['Estimated payback','بازگشت سرمایه تخمینی','Taxminiy qoplanish muddati','Расчётная окупаемость'],['Daily revenue','درآمد روزانه','Kunlik daromad','Доход в день'],['Monthly revenue','درآمد ماهانه','Oylik daromad','Доход в месяц'],['Yearly revenue','درآمد سالانه','Yillik daromad','Доход в год'],['Monthly profit','سود ماهانه','Oylik foyda','Прибыль в месяц'],['Yearly profit','سود سالانه','Yillik foyda','Прибыль в год'],['Number of machines','تعداد دستگاه‌ها','Avtomatlar soni','Количество автоматов'],['Plays per machine per day','تعداد بازی روزانه هر دستگاه','Har bir avtomatda kunlik o‘yinlar','Игр на автомат в день'],['Price per play','قیمت هر بازی','Bir o‘yin narxi','Цена игры'],['Open days per month','روزهای کاری در ماه','Oyda ishlaydigan kunlar','Рабочих дней в месяц'],['Monthly operating costs','هزینه‌های ماهانه','Oylik xarajatlar','Расходы в месяц'],
    ['Machine care & maintenance','نگهداری و تعمیر دستگاه','Avtomatni parvarishlash va ta’mirlash','Уход и обслуживание автоматов'],['Video help and step-by-step guides','راهنمای ویدیویی و دستورالعمل گام‌به‌گام','Video yordam va bosqichma-bosqich qo‘llanmalar','Видео и пошаговые инструкции'],['PLAYMAX page','صفحه PLAYMAX','PLAYMAX sahifasi','Страница PLAYMAX'],['Company account link coming soon','پیوند حساب شرکت به‌زودی','Kompaniya hisobiga havola tez orada','Ссылка на аккаунт компании скоро появится'],['Link pending','پیوند در دسترس نیست','Havola tayyorlanmoqda','Ссылка готовится'],['Delivery rates','هزینه‌های ارسال','Yetkazib berish narxlari','Тарифы доставки'],['Per machine · initial rates','برای هر دستگاه · نرخ اولیه','Har bir avtomat uchun · dastlabki narxlar','За автомат · предварительные тарифы'],['No orders yet.','هنوز سفارشی ثبت نشده است.','Hozircha buyurtmalar yo‘q.','Пока заказов нет.'],
    ['Full name','نام کامل','To‘liq ism','Полное имя'],['Email','ایمیل','Elektron pochta','Электронная почта'],['Code','کد','Kod','Код'],['Phone','تلفن','Telefon','Телефон'],['Country','کشور','Mamlakat','Страна'],['City','شهر','Shahar','Город'],['Password','رمز عبور','Parol','Пароль'],['Anything we should know? (optional)','نکته‌ای هست که باید بدانیم؟ (اختیاری)','Qo‘shimcha ma’lumot (ixtiyoriy)','Что нам важно знать? (необязательно)'],['Email or phone','ایمیل یا شماره تلفن','Elektron pochta yoki telefon','Электронная почта или телефон'],['About PLAYMAX','درباره PLAYMAX','PLAYMAX haqida','О PLAYMAX'],['About us','درباره ما','Biz haqimizda','О нас'],['Contact','تماس','Aloqa','Контакты'],['Contact & social','تماس و شبکه‌های اجتماعی','Aloqa va ijtimoiy tarmoqlar','Контакты и соцсети'],['Maintenance','تعمیر و نگهداری','Ta’mirlash','Обслуживание'],['Language','زبان','Til','Язык'],['Back','بازگشت','Orqaga','Назад'],['Search','جستجو','Qidirish','Поиск'],['Send','ارسال','Yuborish','Отправить'],['Message','پیام','Xabar','Сообщение'],['Sign in','ورود','Kirish','Войти'],['Create account','ایجاد حساب','Hisob yaratish','Создать аккаунт'],['Continue as guest','ادامه به‌عنوان مهمان','Mehmon sifatida davom etish','Продолжить как гость'],['Skip','رد شدن','O‘tkazib yuborish','Пропустить'],
    ['Boxing machines','دستگاه‌های بوکس','Boks avtomatlari','Боксёрские автоматы'],['Prize claws','دستگاه‌های چنگکی جایزه','Sovrinli kran avtomatlari','Призовые автоматы-клешни'],['Strength & reaction','قدرت و واکنش','Kuch va reaksiya','Сила и реакция'],['VR zones','بخش‌های واقعیت مجازی','VR zonalari','VR-зоны'],['Table games','بازی‌های رومیزی','Stol o‘yinlari','Настольные игры'],['Rides','وسایل شهربازی','Attraksionlar','Аттракционы'],['Inflatables','وسایل بادی','Puflama o‘yinlar','Надувные аттракционы'],['Shooting & archery','تیراندازی و کمانداری','Nishonga otish va kamondan o‘q uzish','Стрельба и стрельба из лука'],['Vending','دستگاه‌های فروش خودکار','Savdo avtomatlari','Вендинг'],['Massage chairs','صندلی‌های ماساژ','Massaj kreslolari','Массажные кресла'],
    ['King Fighters','کینگ فایترز','King Fighters','King Fighters'],['Boxing Club','باشگاه بوکس','Boks klubi','Боксёрский клуб'],['Boxer Champion','قهرمان بوکس','Boks chempioni','Чемпион бокса'],['Yellow Boxer','بوکسور زرد','Sariq bokschi','Жёлтый боксёр'],['Creed Boxer','بوکسور کرید','Creed bokschisi','Боксёр Creed'],['Champion','قهرمان','Chempion','Чемпион'],['Kicker','ضربه‌زن','Tepuvchi','Кикер'],['King Boxing','کینگ بوکسینگ','King Boxing','King Boxing'],['Prize Claw Machine','دستگاه چنگکی جایزه','Sovrinli kran avtomati','Автомат-клешня с призами'],['Automatic Massage Chair','صندلی ماساژ خودکار','Avtomatik massaj kreslosi','Автоматическое массажное кресло'],['City Play System','مجموعه بازی شهری','Shahar o‘yin majmuasi','Городской игровой комплекс'],['Kids Play System','مجموعه بازی کودکان','Bolalar o‘yin majmuasi','Детский игровой комплекс'],['Adventure Play System','مجموعه بازی ماجراجویی','Sarguzasht o‘yin majmuasi','Игровой комплекс «Приключение»'],['Air Hockey Table','میز هاکی روی هوا','Havo xokkeyi stoli','Стол для аэрохоккея'],['Table Football','فوتبال رومیزی','Stol futboli','Настольный футбол'],['Smart Drink Vending','دستگاه هوشمند فروش نوشیدنی','Aqlli ichimlik avtomati','Умный автомат с напитками'],['Snack & Drink Vending','دستگاه فروش خوراکی و نوشیدنی','Yegulik va ichimlik avtomati','Автомат со снеками и напитками'],['Reaction Speed Game','بازی سرعت واکنش','Reaksiya tezligi o‘yini','Игра на скорость реакции'],['Strength Test Arcade','دستگاه سنجش قدرت','Kuchni sinash avtomati','Аркадный силомер'],['Archery Set','مجموعه تیراندازی با کمان','Kamondan otish to‘plami','Набор для стрельбы из лука'],['Wireless Laser Shooting','تیراندازی لیزری بی‌سیم','Simsiz lazerli otish','Беспроводная лазерная стрельба'],['Carousel Ride','چرخ‌وفلک','Karusel','Карусель'],['Bungee Trampoline','ترامپولین بانجی','Bangi trampolini','Банджи-батут'],['VR Shooting Simulator','شبیه‌ساز تیراندازی واقعیت مجازی','VR otish simulyatori','VR-симулятор стрельбы'],['Inflatable Bumper Balls','توپ‌های بادی برخوردی','Puflama bumper to‘plar','Надувные бамперные шары'],['Inflatable Playgrounds','زمین‌های بازی بادی','Puflama maydonchalar','Надувные игровые площадки'],['MMA Boxing Machine','دستگاه بوکس MMA','MMA boks avtomati','Боксёрский автомат MMA'],['UFC Champion Boxing Machine','دستگاه بوکس قهرمان UFC','UFC Champion boks avtomati','Боксёрский автомат UFC Champion'],
    ['A punch-strength game with a big score display that turns passers-by into competitors.','بازی قدرت مشت با نمایشگر بزرگ امتیاز که رهگذران را به رقابت دعوت می‌کند.','Katta hisob ekrani bilan zarba kuchini sinaydigan, odamlarni bellashuvga chorlaydigan o‘yin.','Игра на силу удара с большим табло, превращающая прохожих в участников соревнования.'],['A glass-cabinet prize claw with bright lighting and adjustable payout.','دستگاه چنگکی جایزه با محفظه شیشه‌ای، نورپردازی روشن و امکان تنظیم شانس برد.','Yorqin yoritilgan shisha sovrin avtomati, yutuq sozlamasi mavjud.','Призовой автомат-клешня со стеклянным корпусом, яркой подсветкой и настройкой выигрыша.'],['A strength or reaction challenge groups love to repeat.','چالش قدرت یا واکنش که گروه‌ها دوست دارند بارها تجربه کنند.','Guruhlar qayta-qayta o‘ynashni yoqtiradigan kuch yoki reaksiya sinovi.','Испытание силы или реакции, в которое компании играют снова и снова.'],['A compact VR simulator with headset and built-in games.','شبیه‌ساز جمع‌وجور واقعیت مجازی با هدست و بازی‌های داخلی.','Garnitura va o‘rnatilgan o‘yinlarga ega ixcham VR simulyatori.','Компактный VR-симулятор с гарнитурой и встроенными играми.'],
    ['See details','مشاهده جزئیات','Batafsil ko‘rish','Подробнее'],['See all','مشاهده همه','Barchasini ko‘rish','Смотреть все'],['All machines','همه دستگاه‌ها','Barcha avtomatlar','Все автоматы'],['Full view','نمای کامل','To‘liq ko‘rinish','Полный вид'],['Photos','عکس‌ها','Rasmlar','Фото'],['Size','اندازه','O‘lcham','Размер'],['Body colors','رنگ‌های بدنه','Korpus ranglari','Цвета корпуса'],['White · Black · Blue · Red · Green','سفید · مشکی · آبی · قرمز · سبز','Oq · qora · ko‘k · qizil · yashil','Белый · чёрный · синий · красный · зелёный'],['New chat','گفتگوی جدید','Yangi suhbat','Новый чат'],['Try asking','پرسش‌های پیشنهادی','Quyidagilarni so‘rab ko‘ring','Попробуйте спросить'],['Ask anything about play.','هر پرسشی درباره بازی بپرسید.','O‘yin haqida istalgan savolni bering.','Задайте любой вопрос об играх.'],['Machines, space planning, profit, colors, delivery and rental — in 4 languages.','دستگاه‌ها، برنامه‌ریزی فضا، سود، رنگ‌ها، ارسال و اجاره — به ۴ زبان.','Avtomatlar, joy rejalash, foyda, ranglar, yetkazish va ijara — 4 tilda.','Автоматы, планирование пространства, прибыль, цвета, доставка и аренда — на 4 языках.'],['Message','پیام','Xabar','Сообщение'],['Ask about machines, profit, delivery…','درباره دستگاه‌ها، سود و ارسال بپرسید…','Avtomatlar, foyda yoki yetkazish haqida so‘rang…','Спросите об автоматах, прибыли или доставке…'],['Open category','باز کردن دسته','Bo‘limni ochish','Открыть категорию'],['Open color studio','باز کردن استودیوی رنگ','Rang studiyasini ochish','Открыть подбор цвета'],['Open PLAYMAX AI','باز کردن هوش مصنوعی PLAYMAX','PLAYMAX AI ni ochish','Открыть PLAYMAX AI'],['Let’s build your arena. Questions, quotes, delivery or service — choose a channel.','بیایید فضای بازی شما را بسازیم. برای پرسش، قیمت، ارسال یا خدمات، یک راه ارتباطی انتخاب کنید.','Keling, o‘yin maydoningizni yarataylik. Savol, narx, yetkazish yoki xizmat uchun aloqa kanalini tanlang.','Создадим вашу игровую зону. Выберите канал для вопросов, цен, доставки или сервиса.'],['Open profit calculator','باز کردن محاسبه‌گر سود','Foyda kalkulyatorini ochish','Открыть калькулятор прибыли'],['Order summary · Machines','خلاصه سفارش · دستگاه‌ها','Buyurtma xulosasi · avtomatlar','Состав заказа · автоматы'],['Installation & setup','نصب و راه‌اندازی','O‘rnatish va sozlash','Монтаж и настройка'],['In your bag','در سبد شما','Savatingizda','В корзине'],['My account','حساب من','Hisobim','Мой аккаунт'],['Salaam','سلام','Salom','Здравствуйте'],['No orders yet.','هنوز سفارشی ثبت نشده است.','Hozircha buyurtmalar yo‘q.','Пока заказов нет.'],['Saved details','اطلاعات ذخیره‌شده','Saqlangan ma’lumotlar','Сохранённые данные'],['Sign out','خروج','Chiqish','Выйти'],['Machine specifications','مشخصات دستگاه','Avtomat xususiyatlari','Характеристики автомата'],['Delivery details','اطلاعات ارسال','Yetkazib berish ma’lumotlari','Данные доставки'],['Order status','وضعیت سفارش','Buyurtma holati','Статус заказа'],['Add to bag','افزودن به سبد','Savatga qo‘shish','В корзину'],['Place order','ثبت سفارش','Buyurtma berish','Оформить заказ'],['Checkout','تکمیل سفارش','Rasmiylashtirish','Оформление заказа'],['Worldwide delivery','ارسال جهانی','Butun dunyoga yetkazish','Доставка по всему миру'],['Shop machines','مشاهده دستگاه‌ها','Avtomatlarni ko‘rish','Смотреть автоматы'],['Build your arena.','فضای بازی خود را بسازید.','O‘yin maydoningizni yarating.','Создайте свою игровую зону.'],['Your machine, your color.','دستگاه شما، رنگ دلخواه شما.','Avtomatingiz, o‘zingiz tanlagan rang.','Ваш автомат — ваш цвет.'],['Ask our AI anything.','هر چیزی از هوش مصنوعی ما بپرسید.','Sun’iy intellektimizdan istalgan narsani so‘rang.','Спросите наш ИИ о чём угодно.'],['NEW SEASON','فصل جدید','Yangi mavsum','Новый сезон'],['COLOR STUDIO','استودیوی رنگ','RANG STUDIYASI','СТУДИЯ ЦВЕТА'],['PROFIT','سود','FOYDA','ПРИБЫЛЬ'],['DELIVERY','ارسال','YETKAZISH','ДОСТАВКА'],['Worldwide, installed','ارسال و نصب در سراسر جهان','Butun dunyoga yetkazish va o‘rnatish','Доставка и установка по всему миру'],['Visa or cash on delivery','ویزا یا پرداخت نقدی هنگام تحویل','Visa yoki yetkazilganda naqd','Visa или оплата при получении'],['Pays back in about a month*','بازگشت سرمایه حدود یک ماه*','Taxminan bir oyda o‘zini oqlaydi*','Окупаемость примерно за месяц*'],['Machine care & maintenance','نگهداری و تعمیر دستگاه','Avtomatga texnik xizmat','Обслуживание автомата'],['Playgrounds, boxing and arcade games for your venue.','زمین بازی، بوکس و بازی‌های آرکید برای مجموعه شما.','Maskaningiz uchun bolalar maydonchasi, boks va arkada o‘yinlari.','Игровые площадки, бокс и аркадные игры для вашей площадки.']
  ];
  UI_PHRASES.push(
    ['Afghanistan','افغانستان','Afg‘oniston','Афганистан'],['Uzbekistan','ازبکستان','O‘zbekiston','Узбекистан'],['Tajikistan','تاجیکستان','Tojikiston','Таджикистан'],['Kyrgyzstan','قرقیزستان','Qirg‘iziston','Кыргызстан'],['Kazakhstan','قزاقستان','Qozog‘iston','Казахстан'],['Turkmenistan','ترکمنستان','Turkmaniston','Туркменистан'],['Iran','ایران','Eron','Иран'],['Pakistan','پاکستان','Pokiston','Пакистан'],['Russia','روسیه','Rossiya','Россия'],['Türkiye','ترکیه','Turkiya','Турция'],['UAE & Gulf','امارات و خلیج','BAA va Ko‘rfaz','ОАЭ и страны Залива'],['Europe','اروپا','Yevropa','Европа'],['Rest of world','سایر نقاط جهان','Dunyoning boshqa hududlari','Остальной мир'],['Metal body','بدنه فلزی','Metall korpus','Металлический корпус'],['Fiberglass','فایبرگلاس','Shisha tolali plastik','Стеклопластик'],['Steel frame','قاب فولادی','Po‘lat rom','Стальная рама'],['Plastic and metal','پلاستیک و فلز','Plastik va metall','Пластик и металл'],['Continue shopping','ادامه خرید','Xaridni davom ettirish','Продолжить покупки'],['Your details','اطلاعات شما','Ma’lumotlaringiz','Ваши данные'],['Order placed','سفارش ثبت شد','Buyurtma yuborildi','Заказ оформлен'],['Ask me anything.','هر چیزی بپرسید.','Istalgan savolingizni bering.','Спросите меня о чём угодно.']
  );
  UI_PHRASES.push(
    ['New','جدید','Yangi','Новинка'],['Search machines','جستجوی دستگاه‌ها','Avtomatlarni qidirish','Поиск автоматов'],['See all','مشاهده همه','Barchasini ko‘rish','Смотреть все'],['All machines','همه دستگاه‌ها','Barcha avtomatlar','Все автоматы'],['Full view','نمای کامل','To‘liq ko‘rinish','Полный вид'],['Specifications','مشخصات','Xususiyatlar','Характеристики'],['Machine specifications','مشخصات دستگاه','Avtomat xususiyatlari','Характеристики автомата'],['Model','مدل','Model','Модель'],['Price','قیمت','Narx','Цена'],['Color','رنگ','Rang','Цвет'],['Select color','انتخاب رنگ','Rangni tanlang','Выберите цвет'],['Choose a color','انتخاب رنگ','Rang tanlang','Выберите цвет'],['Body color','رنگ بدنه','Korpus rangi','Цвет корпуса'],['Color selected','رنگ انتخاب شد','Rang tanlandi','Цвет выбран'],['Add to cart','افزودن به سبد خرید','Savatga qo‘shish','Добавить в корзину'],['Remove','حذف','O‘chirish','Удалить'],['Continue','ادامه','Davom etish','Продолжить'],['Continue to checkout','ادامه به پرداخت','Rasmiylashtirishga o‘tish','Перейти к оформлению'],['Order details','جزئیات سفارش','Buyurtma tafsilotlari','Детали заказа'],['Order summary','خلاصه سفارش','Buyurtma xulosasi','Итог заказа'],['Product','محصول','Mahsulot','Товар'],['Products','محصولات','Mahsulotlar','Товары'],['Subtotal','جمع جزء','Oraliq jami','Промежуточный итог'],['Total','مجموع','Jami','Итого'],['Shipping','هزینه ارسال','Yetkazib berish','Доставка'],['Estimated shipping','هزینه تقریبی ارسال','Taxminiy yetkazish narxi','Расчётная стоимость доставки'],['Installation','نصب','O‘rnatish','Установка'],['Optional','اختیاری','Ixtiyoriy','Необязательно'],['Required','الزامی','Majburiy','Обязательно'],['Save changes','ذخیره تغییرات','O‘zgarishlarni saqlash','Сохранить изменения'],['Edit','ویرایش','Tahrirlash','Изменить'],['Cancel','لغو','Bekor qilish','Отмена'],['Confirm','تأیید','Tasdiqlash','Подтвердить'],['Close','بستن','Yopish','Закрыть'],['Loading…','در حال بارگذاری…','Yuklanmoqda…','Загрузка…'],['Loading','در حال بارگذاری','Yuklanmoqda','Загрузка'],['Try again','دوباره تلاش کنید','Qayta urinib ko‘ring','Попробуйте снова'],['Something went wrong','مشکلی پیش آمد','Xatolik yuz berdi','Что-то пошло не так'],['Added to bag','به سبد اضافه شد','Savatga qo‘shildi','Добавлено в корзину'],['Removed from bag','از سبد حذف شد','Savatdan olib tashlandi','Удалено из корзины'],['Order received','سفارش دریافت شد','Buyurtma qabul qilindi','Заказ принят'],['Estimated payback','بازگشت سرمایه تخمینی','Taxminiy qoplanish muddati','Расчётная окупаемость'],['Daily plays','بازی‌های روزانه','Kunlik o‘yinlar','Игр в день'],['Monthly costs','هزینه‌های ماهانه','Oylik xarajatlar','Расходы в месяц'],['Net profit','سود خالص','Sof foyda','Чистая прибыль'],['Maintenance guides','راهنماهای تعمیر و نگهداری','Texnik xizmat qo‘llanmalari','Инструкции по обслуживанию'],['Step-by-step guides','راهنماهای گام‌به‌گام','Bosqichma-bosqich qo‘llanmalar','Пошаговые инструкции'],['No videos yet','هنوز ویدیویی موجود نیست','Hozircha videolar yo‘q','Видео пока нет'],['Contact us','با ما تماس بگیرید','Biz bilan bog‘laning','Свяжитесь с нами'],['Email us','به ما ایمیل بزنید','Bizga xat yozing','Написать нам'],['Call us','با ما تماس بگیرید','Bizga qo‘ng‘iroq qiling','Позвонить нам'],['Follow us','ما را دنبال کنید','Bizni kuzating','Подписывайтесь на нас'],['Facebook','فیس‌بوک','Facebook','Facebook'],['Instagram','اینستاگرام','Instagram','Instagram'],['TikTok','تیک‌تاک','TikTok','TikTok'],['WhatsApp','واتساپ','WhatsApp','WhatsApp'],['Telegram','تلگرام','Telegram','Telegram'],['Email or phone','ایمیل یا شماره تلفن','Elektron pochta yoki telefon','Электронная почта или телефон'],['Forgot password?','رمز عبور را فراموش کرده‌اید؟','Parolni unutdingizmi?','Забыли пароль?'],['Remember me','مرا به خاطر بسپار','Meni eslab qoling','Запомнить меня'],['Create your account','حساب خود را ایجاد کنید','Hisobingizni yarating','Создайте аккаунт'],['Already have an account?','از قبل حساب دارید؟','Hisobingiz bormi?','Уже есть аккаунт?'],['Don’t have an account?','حساب ندارید؟','Hisobingiz yo‘qmi?','Нет аккаунта?'],['Welcome back','خوش آمدید','Xush kelibsiz','С возвращением'],['Your account','حساب شما','Hisobingiz','Ваш аккаунт'],['Order history','تاریخچه سفارش‌ها','Buyurtmalar tarixi','История заказов'],['Delivery address','نشانی تحویل','Yetkazish manzili','Адрес доставки'],['Full name','نام کامل','To‘liq ism','Полное имя'],['Country','کشور','Mamlakat','Страна'],['City','شهر','Shahar','Город'],['Phone number','شماره تلفن','Telefon raqami','Номер телефона'],['Email address','نشانی ایمیل','Elektron pochta manzili','Адрес электронной почты'],['Your message','پیام شما','Xabaringiz','Ваше сообщение'],['Ask about machines, profit, delivery…','درباره دستگاه‌ها، سود و ارسال بپرسید…','Avtomatlar, foyda yoki yetkazish haqida so‘rang…','Спросите об автоматах, прибыли или доставке…'],['Online','آنلاین','Onlayn','В сети'],['Available colors','رنگ‌های موجود','Mavjud ranglar','Доступные цвета'],['5 colors','۵ رنگ','5 ta rang','5 цветов'],['Color studio','استودیوی رنگ','Rang studiyasi','Студия цвета'],['Rotating view','نمای چرخشی','Aylantirib ko‘rish','Вращение'],['Drag to rotate','برای چرخاندن بکشید','Aylantirish uchun suring','Перетащите, чтобы повернуть'],['Zoom in','بزرگ‌نمایی','Kattalashtirish','Увеличить'],['Zoom out','کوچک‌نمایی','Kichraytirish','Уменьшить'],['Ask PLAYMAX AI','از PLAYMAX AI بپرسید','PLAYMAX AI dan so‘rang','Спросить PLAYMAX AI']
  );
  UI_PHRASES.push(
    ['Machine maintenance','تعمیر و نگهداری دستگاه','Avtomatga texnik xizmat','Обслуживание автоматов'],['PLAYMAX SUPPORT','پشتیبانی PLAYMAX','PLAYMAX YORDAMI','ПОДДЕРЖКА PLAYMAX'],['VIDEO LIBRARY','کتابخانه ویدیو','VIDEO KUTUBXONASI','ВИДЕОБИБЛИОТЕКА'],['Maintenance video guides','راهنمای ویدیویی تعمیر و نگهداری','Texnik xizmat bo‘yicha video qo‘llanmalar','Видеоинструкции по обслуживанию'],['Each guide will include a video and numbered instructions underneath, so you can follow along at your own pace.','هر راهنما شامل یک ویدیو و دستورالعمل‌های شماره‌گذاری‌شده است تا با سرعت دلخواه دنبال کنید.','Har bir qo‘llanmada video va raqamlangan ko‘rsatmalar bo‘ladi, ularni o‘zingizga qulay tezlikda bajaring.','В каждом руководстве будут видео и нумерованные шаги, чтобы вы могли следовать им в удобном темпе.'],['Guides are being prepared','راهنماها در حال آماده‌سازی هستند','Qo‘llanmalar tayyorlanmoqda','Инструкции готовятся'],['Send us your troubleshooting videos when ready. We’ll organize them by machine and add the matching step-by-step explanation here.','وقتی ویدیوهای عیب‌یابی آماده شدند برای ما بفرستید. آن‌ها را بر اساس دستگاه دسته‌بندی می‌کنیم و توضیح گام‌به‌گام مربوط را اینجا می‌گذاریم.','Muammoni bartaraf etish videolarini tayyor bo‘lganda yuboring. Ularni avtomatlar bo‘yicha tartiblab, tegishli bosqichma-bosqich izohni shu yerga qo‘shamiz.','Когда подготовите видео по устранению неполадок, отправьте их нам. Мы сгруппируем их по автоматам и добавим сюда соответствующие пошаговые инструкции.'],['Need help now?','همین حالا کمک لازم دارید؟','Hozir yordam kerakmi?','Нужна помощь сейчас?'],['For electrical faults, damaged cables or unsafe operation, switch off and unplug the machine before contacting PLAYMAX support.','در صورت خرابی برق، آسیب کابل یا کارکرد ناایمن، پیش از تماس با پشتیبانی PLAYMAX دستگاه را خاموش و از برق جدا کنید.','Elektr nosozligi, shikastlangan sim yoki xavfli ishlash holatida PLAYMAX yordamiga murojaat qilishdan oldin avtomatni o‘chirib, rozetkadan uzing.','При неисправности электрики, повреждении кабелей или небезопасной работе выключите автомат и отключите его от сети, прежде чем обращаться в поддержку PLAYMAX.'],['Contact PLAYMAX support','تماس با پشتیبانی PLAYMAX','PLAYMAX yordamiga murojaat','Связаться с поддержкой PLAYMAX'],['We turn empty corners into crowds.','ما گوشه‌های خالی را به محل گردهمایی تبدیل می‌کنیم.','Bo‘sh burchaklarni odamlar to‘planadigan joyga aylantiramiz.','Мы превращаем пустые углы в места притяжения.'],['PLAYMAX supplies arcade, boxing and family-entertainment machines across Afghanistan, Uzbekistan and beyond — from choosing to delivery, installation and service.','PLAYMAX دستگاه‌های آرکید، بوکس و سرگرمی خانوادگی را در افغانستان، ازبکستان و کشورهای دیگر عرضه می‌کند؛ از انتخاب تا ارسال، نصب و خدمات.','PLAYMAX Afg‘oniston, O‘zbekiston va boshqa hududlarga arkada, boks va oilaviy ko‘ngilochar avtomatlarni tanlashdan tortib yetkazish, o‘rnatish va xizmat ko‘rsatishgacha taqdim etadi.','PLAYMAX поставляет аркадные, боксёрские и семейные развлекательные автоматы в Афганистане, Узбекистане и других странах — от выбора до доставки, монтажа и сервиса.'],['Clear video guides for common machine issues, with practical steps to help you maintain and troubleshoot your equipment.','راهنماهای ویدیویی روشن برای مشکلات رایج دستگاه، همراه با مراحل عملی برای نگهداری و عیب‌یابی.','Avtomatdagi keng tarqalgan muammolar uchun aniq videolar va texnik xizmat hamda nosozliklarni aniqlash bo‘yicha amaliy qadamlar.','Понятные видеоинструкции по типичным проблемам автоматов с практическими шагами по обслуживанию и диагностике.'],['Machine care & maintenance','نگهداری و تعمیر دستگاه','Avtomatga texnik xizmat','Обслуживание автоматов'],['Questions, quotes, delivery or service — choose a channel.','برای پرسش، قیمت، ارسال یا خدمات، یک راه ارتباطی انتخاب کنید.','Savol, narx, yetkazish yoki xizmat uchun aloqa kanalini tanlang.','Выберите канал для вопросов, цен, доставки или сервиса.'],['The PLAYMAX team is here to help.','تیم PLAYMAX آماده کمک است.','PLAYMAX jamoasi yordam berishga tayyor.','Команда PLAYMAX готова помочь.'],['Your request has been sent.','درخواست شما ارسال شد.','So‘rovingiz yuborildi.','Ваш запрос отправлен.'],['Please fill in all required fields.','لطفاً همه فیلدهای ضروری را تکمیل کنید.','Iltimos, barcha majburiy maydonlarni to‘ldiring.','Заполните все обязательные поля.'],['Invalid email address','نشانی ایمیل نامعتبر است','Elektron pochta manzili noto‘g‘ri','Неверный адрес электронной почты'],['Password must be at least 8 characters','رمز عبور باید دست‌کم ۸ نویسه باشد','Parol kamida 8 ta belgidan iborat bo‘lishi kerak','Пароль должен содержать не менее 8 символов'],['Email already registered','این ایمیل قبلاً ثبت شده است','Bu elektron pochta oldin ro‘yxatdan o‘tgan','Эта почта уже зарегистрирована'],['Incorrect email or password','ایمیل یا رمز عبور نادرست است','Elektron pochta yoki parol noto‘g‘ri','Неверная почта или пароль'],['Account created successfully','حساب با موفقیت ایجاد شد','Hisob muvaffaqiyatli yaratildi','Аккаунт успешно создан'],['Signed in successfully','با موفقیت وارد شدید','Muvaffaqiyatli kirdingiz','Вход выполнен'],['Signed out','خارج شدید','Hisobdan chiqdingiz','Вы вышли из аккаунта'],['Please enter your name','لطفاً نام خود را وارد کنید','Iltimos, ismingizni kiriting','Введите ваше имя'],['Please enter a valid phone number','لطفاً شماره تلفن معتبر وارد کنید','Iltimos, to‘g‘ri telefon raqamini kiriting','Введите корректный номер телефона'],['Please enter a valid email','لطفاً ایمیل معتبر وارد کنید','Iltimos, to‘g‘ri elektron pochta kiriting','Введите корректный адрес электронной почты']
  );
  UI_PHRASES.push(
    ['Several machines in one order share the truck, so each one costs less to ship. Installation and setup can be added at checkout.','چند دستگاه در یک سفارش با هم در یک کامیون ارسال می‌شوند و هزینه ارسال هر دستگاه کمتر می‌شود. هنگام ثبت سفارش می‌توانید نصب و راه‌اندازی را نیز اضافه کنید.','Bir buyurtmadagi bir nechta avtomat bitta yuk mashinasida yuboriladi, shu sabab har birini yetkazish arzonroq tushadi. Rasmiylashtirishda o‘rnatish va sozlashni ham qo‘shish mumkin.','Несколько автоматов в одном заказе отправляются одной машиной, поэтому доставка каждого обходится дешевле. При оформлении можно добавить монтаж и настройку.'],['Payment depends on where the machine goes:','روش پرداخت به مقصد دستگاه بستگی دارد:','To‘lov avtomat qayerga yetkazilishiga bog‘liq:','Способ оплаты зависит от места доставки автомата:'],['Same country as our warehouse — cash on delivery (or Visa if you prefer).','در همان کشور انبار ما: پرداخت هنگام تحویل (یا در صورت تمایل با ویزا).','Omborimiz joylashgan mamlakat ichida — yetkazilganda naqd (yoki xohlasangiz Visa).','В стране нашего склада — оплата при получении (или Visa, если удобнее).'],['Shipping abroad — pay online by Visa: the full price, or a 50% deposit now and the other half on delivery.','ارسال به خارج از کشور: پرداخت آنلاین با ویزا، کامل یا ۵۰٪ اکنون و نیم دیگر هنگام تحویل.','Chet elga yetkazishda Visa orqali onlayn to‘lang: to‘liq yoki 50% hozir, qolgan yarmini yetkazilganda.','При доставке за границу — оплата онлайн картой Visa: полностью или 50% сейчас и остаток при доставке.'],['The checkout picks the right options automatically from your country.','صفحه پرداخت گزینه‌های مناسب را بر اساس کشور شما به‌طور خودکار انتخاب می‌کند.','Rasmiylashtirish sahifasi mamlakatingizga mos variantlarni avtomatik tanlaydi.','При оформлении подходящие варианты автоматически выбираются для вашей страны.'],['Machine bodies come in five factory colors: white, black, blue, red and green.','بدنه دستگاه در کارخانه به پنج رنگ سفید، مشکی، آبی، قرمز و سبز عرضه می‌شود.','Avtomat korpusi zavodda oq, qora, ko‘k, qizil va yashil ranglarda tayyorlanadi.','Корпус автомата доступен в пяти заводских цветах: белом, чёрном, синем, красном и зелёном.'],['Only the body/frame is painted — the punch bag, metal plate, screen and stickers stay as they are.','فقط بدنه رنگ می‌شود؛ کیسه بوکس، صفحه فلزی، نمایشگر و برچسب‌ها بدون تغییر می‌مانند.','Faqat korpus bo‘yaladi — boks qopi, metall qism, ekran va stikerlar o‘zgarmaydi.','Красится только корпус — груша, металлическая часть, экран и наклейки остаются без изменений.'],['Open the Color studio to compare.','برای مقایسه، استودیوی رنگ را باز کنید.','Taqqoslash uchun Rang studiyasini oching.','Откройте студию цвета для сравнения.'],['Our team delivers, installs and trains your staff.','تیم ما دستگاه را تحویل می‌دهد، نصب می‌کند و به کارکنان شما آموزش می‌دهد.','Jamoamiz avtomatni yetkazadi, o‘rnatadi va xodimlaringizni o‘qitadi.','Наша команда доставит и установит автомат, а также обучит ваших сотрудников.'],['Warranty terms are confirmed by the PLAYMAX team. Spare parts and service are available after the sale.','شرایط ضمانت توسط تیم PLAYMAX تأیید می‌شود. پس از فروش نیز قطعات یدکی و خدمات ارائه می‌شود.','Kafolat shartlarini PLAYMAX jamoasi tasdiqlaydi. Sotuvdan keyin ehtiyot qismlar va xizmat mavjud.','Условия гарантии подтверждает команда PLAYMAX. После продажи доступны запчасти и сервис.'],['Tell me about your space, budget or audience — I’ll suggest machines, estimate the profit and price the delivery.','درباره فضا، بودجه یا مخاطبان خود بگویید تا دستگاه پیشنهاد کنم، سود را تخمین بزنم و هزینه ارسال را محاسبه کنم.','Joyingiz, budjetingiz yoki mijozlaringiz haqida ayting — avtomat tavsiya qilaman, foyda va yetkazish narxini hisoblayman.','Расскажите о площадке, бюджете и посетителях — я предложу автоматы, оценю прибыль и стоимость доставки.'],['I can help with machines, prices, delivery, profit and colors.','می‌توانم درباره دستگاه‌ها، قیمت‌ها، ارسال، سود و رنگ‌ها کمک کنم.','Avtomatlar, narxlar, yetkazish, foyda va ranglar haqida yordam bera olaman.','Я помогу с автоматами, ценами, доставкой, прибылью и цветами.'],['Try: “Shipping to Kabul?”, “Best machine for a café?” or “Payback with 40 players a day?”','این پرسش‌ها را امتحان کنید: «ارسال به کابل؟»، «بهترین دستگاه برای کافه؟» یا «بازگشت سرمایه با ۴۰ بازیکن در روز؟»','Quyidagilarni so‘rab ko‘ring: “Kobulga yetkazish qancha?”, “Kafe uchun qaysi avtomat yaxshi?” yoki “Kuniga 40 o‘yinchi bo‘lsa, qachon qoplanadi?”','Попробуйте спросить: «Доставка в Кабул?», «Лучший автомат для кафе?» или «Окупаемость при 40 игроках в день?»']
  );
  UI_PHRASES.push(
    ['machines','دستگاه‌ها','avtomat','автоматов'],['categories','دسته‌ها','toifa','категорий'],['languages','زبان','til','языка'],['on delivery','هنگام تحویل','yetkazilganda','при доставке'],['Reach us','راه‌های ارتباطی','Biz bilan bog‘lanish','Связаться с нами'],['Company','شرکت','Kompaniya','Компания'],['Replay intro','پخش دوباره معرفی','Kirish videosini qayta ko‘rish','Повторить заставку'],['All machines','همه دستگاه‌ها','Barcha avtomatlar','Все автоматы'],['Color studio','استودیوی رنگ','Rang studiyasi','Студия цвета'],['Profit calculator','محاسبه‌گر سود','Foyda kalkulyatori','Калькулятор прибыли'],['Play your way. Arcade, boxing and family-entertainment machines — sale, rental, delivery and installation.','به شیوه خودتان بازی کنید. دستگاه‌های آرکید، بوکس و سرگرمی خانوادگی برای فروش و اجاره، همراه با ارسال و نصب.','O‘zingiz istagandek o‘ynang. Arkada, boks va oilaviy ko‘ngilochar avtomatlari — sotuv, ijara, yetkazish va o‘rnatish.','Играйте по-своему. Аркадные, боксёрские и семейные игровые автоматы — продажа, аренда, доставка и установка.'],['© 2026 PLAYMAX. Prototype — prices are demo prices.','© 2026 PLAYMAX. نسخه نمایشی — قیمت‌ها آزمایشی هستند.','© 2026 PLAYMAX. Namoyish versiyasi — narxlar namunaviy.','© 2026 PLAYMAX. Демоверсия — цены примерные.'],['BEST FOR BUSINESS','بهترین انتخاب برای کسب‌وکار','BIZNES UCHUN ENG YAXSHI','ЛУЧШЕЕ ДЛЯ БИЗНЕСА'],['Machines people queue for','دستگاه‌هایی که مردم برایشان صف می‌کشند','Odamlar navbatda turadigan avtomatlar','Автоматы, ради которых выстраиваются в очередь'],['Same machine. Your color.','همان دستگاه، به رنگ دلخواه شما.','O‘sha avtomat. Siz tanlagan rang.','Тот же автомат. Ваш цвет.'],['Pick white, black, blue, red or green and see the body repaint live. Only the body/frame is painted — the punch bag, metal plate, screen and stickers keep their original look.','سفید، مشکی، آبی، قرمز یا سبز را انتخاب کنید و تغییر رنگ بدنه را زنده ببینید. فقط بدنه رنگ می‌شود؛ کیسه بوکس، صفحه فلزی، نمایشگر و برچسب‌ها بدون تغییر می‌مانند.','Oq, qora, ko‘k, qizil yoki yashil rangni tanlab, korpus qanday o‘zgarishini ko‘ring. Faqat korpus bo‘yaladi — boks qopi, metall plastina, ekran va stikerlar o‘z holicha qoladi.','Выберите белый, чёрный, синий, красный или зелёный и увидьте новый цвет корпуса. Красится только корпус — груша, металлическая панель, экран и наклейки остаются прежними.'],['Your arcade expert, awake 24/7.','کارشناس آرکید شما، شبانه‌روز در دسترس.','Sizning arkada bo‘yicha mutaxassisingiz — 24/7.','Ваш эксперт по аркадным автоматам — на связи 24/7.'],['Ask about machines, the right mix for your space, profit, colors or delivery — in Dari, Uzbek, Russian or English.','درباره دستگاه‌ها، ترکیب مناسب فضای خود، سود، رنگ‌ها یا ارسال به زبان دری، ازبکی، روسی یا انگلیسی بپرسید.','Avtomatlar, joyingiz uchun mos tanlov, foyda, ranglar yoki yetkazish haqida o‘zbek, dariy, rus yoki ingliz tilida so‘rang.','Спрашивайте об автоматах, подборе для вашего помещения, прибыли, цветах и доставке на дари, узбекском, русском или английском.'],['I have 40 m² in a mall. What should I put there?','در مرکز خرید ۴۰ متر مربع فضا دارم. چه دستگاه‌هایی قرار دهم؟','Savdo markazida 40 m² joyim bor. U yerga nima qo‘ysam bo‘ladi?','У меня есть 40 м² в торговом центре. Что лучше разместить?'],['Start with a boxing machine plus a prize claw. Boxing pulls teens and adults, the claw pulls kids and families — together about 4 m² and one socket each.','با یک دستگاه بوکس و یک دستگاه چنگکی جایزه شروع کنید. بوکس نوجوانان و بزرگسالان را جذب می‌کند و چنگک کودکان و خانواده‌ها را؛ هر دو روی‌هم حدود ۴ متر مربع و هرکدام یک پریز برق نیاز دارند.','Boks avtomati va sovrinli kran avtomatidan boshlang. Boks o‘smirlar va kattalarni, kran esa bolalar va oilalarni jalb qiladi — ikkalasiga jami taxminan 4 m² joy va har biriga bittadan rozetka kerak.','Начните с боксёрского автомата и автомата-клешни. Бокс привлекает подростков и взрослых, клешня — детей и семьи. Вместе им нужно около 4 м² и по одной розетке на каждый автомат.'],['Best machine for a mall?','برای مرکز خرید چه دستگاهی بهتر است؟','Savdo markazi uchun qaysi avtomat yaxshi?','Какой автомат лучше для торгового центра?'],['Which colors are available?','چه رنگ‌هایی موجود است؟','Qaysi ranglar mavjud?','Какие цвета доступны?'],['Kids playground sizes','ابعاد مجموعه‌های بازی کودکان','Bolalar maydonchalari o‘lchamlari','Размеры детских игровых площадок'],['Rent for a wedding','اجاره برای مراسم عروسی','To‘y uchun ijaraga olish','Аренда на свадьбу'],['Dimensions','ابعاد','O‘lchamlari','Размеры'],['Power','توان','Quvvati','Мощность'],['Weight','وزن','Vazni','Вес'],['Material','جنس','Materiali','Материал'],['Feature','ویژگی','Xususiyati','Особенность'],['Category','دسته‌بندی','Toifasi','Категория'],['demo price · confirmed on order','قیمت آزمایشی · تأیید هنگام سفارش','namunaviy narx · buyurtmada tasdiqlanadi','демо-цена · подтвердим при заказе'],['Original','اصلی','Asl rang','Исходный'],['1 · Machine','۱ · دستگاه','1 · Avtomat','1 · Автомат'],['2 · Body color','۲ · رنگ بدنه','2 · Korpus rangi','2 · Цвет корпуса'],['Open color studio','باز کردن استودیوی رنگ','Rang studiyasini ochish','Открыть студию цвета'],['See in 3D','نمایش سه‌بعدی','3D ko‘rinish','Посмотреть в 3D'],['Send us a message','برای ما پیام بفرستید','Bizga xabar yuboring','Отправить нам сообщение'],['Send message','ارسال پیام','Xabar yuborish','Отправить сообщение'],['Prefer an instant answer?','پاسخ فوری می‌خواهید؟','Tezkor javob kerakmi?','Нужен быстрый ответ?'],['PLAYMAX AI answers day and night, then hands you to our team.','هوش مصنوعی PLAYMAX شبانه‌روز پاسخ می‌دهد و در صورت نیاز شما را به تیم ما وصل می‌کند.','PLAYMAX AI kecha-yu kunduz javob beradi va kerak bo‘lsa sizni jamoamiz bilan bog‘laydi.','PLAYMAX AI отвечает круглосуточно и при необходимости передаёт диалог нашей команде.'],['Topic','موضوع','Mavzu','Тема'],['Buying a machine','خرید دستگاه','Avtomat sotib olish','Покупка автомата'],['Renting for an event','اجاره برای رویداد','Tadbir uchun ijara','Аренда на мероприятие'],['Delivery & installation','ارسال و نصب','Yetkazish va o‘rnatish','Доставка и установка'],['Service & spare parts','خدمات و قطعات یدکی','Xizmat va ehtiyot qismlar','Сервис и запчасти'],['Tell us what you need…','نیاز خود را برای ما بنویسید…','Nima kerakligini yozing…','Расскажите, что вам нужно…'],['Open','باز کردن','Ochish','Открыть'],['Machine maintenance','تعمیر و نگهداری دستگاه','Avtomatga texnik xizmat','Обслуживание автоматов'],['Play your way','به شیوه خودتان بازی کنید','O‘zingiz istagandek o‘ynang','Играйте по-своему'],['Order once. Reorder in one tap.','یک‌بار سفارش دهید، با یک لمس دوباره سفارش دهید.','Bir marta buyurtma bering. Bir bosishda qayta buyurtma qiling.','Закажите один раз. Повторите одним нажатием.'],['Optional. Your name, phone and address are saved for the next order, and your AI chats and color picks stay with you.','اختیاری است. نام، تلفن و نشانی شما برای سفارش بعدی ذخیره می‌شود و گفتگوهای هوش مصنوعی و رنگ‌های انتخابی‌تان محفوظ می‌ماند.','Ixtiyoriy. Ism, telefon va manzilingiz keyingi buyurtma uchun saqlanadi, AI suhbatlari va tanlagan ranglaringiz ham qoladi.','Необязательно. Имя, телефон и адрес сохранятся для следующего заказа, как и переписки с ИИ и выбранные цвета.'],['Your arcade expert, awake 24/7.','کارشناس آرکید شما، شبانه‌روز در دسترس.','Sizning arkada bo‘yicha mutaxassisingiz — 24/7.','Ваш эксперт по аркадным автоматам — на связи 24/7.'],['Machines, the right mix for your space, profit, colors and delivery.','دستگاه‌ها، انتخاب مناسب برای فضای شما، سود، رنگ‌ها و ارسال.','Avtomatlar, joyingiz uchun mos tanlov, foyda, ranglar va yetkazish.','Автоматы, подбор для помещения, прибыль, цвета и доставка.'],['Kings of the arcade','پادشاهان آرکید','Arkada qirollari','Короли аркады'],['Ready to build your place?','آماده ساخت فضای بازی خود هستید؟','O‘yin joyingizni yaratishga tayyormisiz?','Готовы создать своё игровое пространство?']
  );
  UI_PHRASES.push(
    ['Visa · Cash','ویزا · نقدی','Visa · Naqd','Visa · Наличные'],['Body colors:','رنگ‌های بدنه:','Korpus ranglari:','Цвета корпуса:'],['Order once.','یک‌بار سفارش دهید.','Bir marta buyurtma bering.','Закажите один раз.'],['Reorder in one tap.','با یک لمس دوباره سفارش دهید.','Bir bosishda qayta buyurtma qiling.','Повторите заказ одним нажатием.'],['Pick white, black, blue, red or green and see the body repaint live.','سفید، مشکی، آبی، قرمز یا سبز را انتخاب کنید و تغییر رنگ بدنه را زنده ببینید.','Oq, qora, ko‘k, qizil yoki yashil rangni tanlab, korpus qanday o‘zgarishini ko‘ring.','Выберите белый, чёрный, синий, красный или зелёный и увидьте новый цвет корпуса.'],['Only the body/frame is painted — the punch bag, metal plate, screen and stickers keep their original look.','فقط بدنه رنگ می‌شود؛ کیسه بوکس، صفحه فلزی، نمایشگر و برچسب‌ها ظاهر اصلی خود را حفظ می‌کنند.','Faqat korpus bo‘yaladi — boks qopi, metall plastina, ekran va stikerlar asl ko‘rinishida qoladi.','Красится только корпус — груша, металлическая панель, экран и наклейки сохраняют исходный вид.'],['4 languages','۴ زبان','4 ta til','4 языка'],['11 categories','۱۱ دسته','11 ta toifa','11 категорий'],['33 machines','۳۳ دستگاه','33 ta avtomat','33 автомата'],['OPEN','باز کردن','OCHISH','ОТКРЫТЬ'],['GET STARTED','شروع کنید','BOSHLASH','НАЧАТЬ'],['How we work','روش کار ما','Biz qanday ishlaymiz','Как мы работаем'],['From idea to a busy machine','از ایده تا دستگاهی پرمشتری','G‘oyadan serqatnov avtomatgacha','От идеи до популярного автомата'],['You ask','شما می‌پرسید','Siz so‘raysiz','Вы спрашиваете'],['We calculate','ما محاسبه می‌کنیم','Biz hisoblaymiz','Мы рассчитываем'],['You pay','شما پرداخت می‌کنید','Siz to‘laysiz','Вы оплачиваете'],['We deliver & install','ما ارسال و نصب می‌کنیم','Biz yetkazamiz va o‘rnatamiz','Мы доставляем и устанавливаем'],['We support','ما پشتیبانی می‌کنیم','Biz yordam beramiz','Мы поддерживаем'],['Pick a machine or describe your space to PLAYMAX AI or our team.','یک دستگاه انتخاب کنید یا فضای خود را برای PLAYMAX AI یا تیم ما توضیح دهید.','Avtomat tanlang yoki joyingizni PLAYMAX AI yoxud jamoamizga tasvirlab bering.','Выберите автомат или опишите помещение PLAYMAX AI или нашей команде.'],['Price, delivery and payback for your location.','قیمت، ارسال و بازگشت سرمایه برای محل شما.','Joyingiz uchun narx, yetkazish va qoplanish muddati.','Цена, доставка и окупаемость для вашего места.'],['Our team sets it up and trains your staff.','تیم ما دستگاه را راه‌اندازی می‌کند و به کارکنان شما آموزش می‌دهد.','Jamoamiz avtomatni o‘rnatadi va xodimlaringizni o‘qitadi.','Наша команда установит автомат и обучит сотрудников.'],['Service and spare parts after the sale.','خدمات و قطعات یدکی پس از فروش.','Sotuvdan keyingi xizmat va ehtiyot qismlar.','Сервис и запчасти после покупки.']
  );
  UI_PHRASES.push(
    ['A punch-strength game with a big score display that turns passers-by into competitors. Built for malls, parks and entertainment centers.','بازی سنجش قدرت مشت با نمایشگر بزرگ امتیاز که رهگذران را به رقابت دعوت می‌کند؛ مناسب مراکز خرید، پارک‌ها و مراکز تفریحی.','Katta hisob ekrani orqali odamlarni bellashuvga chorlaydigan zarba kuchi o‘yini. Savdo markazlari, parklar va ko‘ngilochar markazlar uchun.','Игра на силу удара с большим табло, превращающая прохожих в участников соревнования. Подходит для торговых центров, парков и развлекательных площадок.'],['A glass-cabinet prize claw with bright lighting, adjustable payout and room for plush toys or small prizes.','دستگاه چنگکی جایزه با محفظه شیشه‌ای، نورپردازی روشن، تنظیم شانس برد و فضای مناسب عروسک‌ها یا جوایز کوچک.','Yorqin yoritilgan shisha sovrin avtomati; yutuq sozlamasi va yumshoq o‘yinchoqlar yoki kichik sovrinlar uchun joy mavjud.','Призовой автомат-клешня со стеклянным корпусом, яркой подсветкой, настройкой выигрыша и местом для игрушек или небольших призов.'],['A strength or reaction challenge that groups and adults love to repeat.','چالش قدرت یا واکنش که گروه‌ها و بزرگسالان دوست دارند دوباره تجربه کنند.','Guruhlar va kattalar qayta o‘ynashni yoqtiradigan kuch yoki reaksiya sinovi.','Испытание силы или реакции, к которому компании и взрослые возвращаются снова.'],['A compact VR simulator with headset and built-in games that fits in under one square metre.','شبیه‌ساز جمع‌وجور واقعیت مجازی با هدست و بازی‌های داخلی که کمتر از یک متر مربع فضا می‌گیرد.','Garnitura va o‘rnatilgan o‘yinlarga ega ixcham VR simulyatori — bir kvadrat metrdan kam joy egallaydi.','Компактный VR-симулятор с гарнитурой и встроенными играми, занимающий менее одного квадратного метра.'],['A durable table game for cafés, family centers and lounges.','بازی رومیزی بادوام برای کافه‌ها، مراکز خانوادگی و سالن‌ها.','Kafelar, oilaviy markazlar va dam olish joylari uchun chidamli stol o‘yini.','Прочная настольная игра для кафе, семейных центров и лаунж-зон.'],['A complete play system in UV-resistant LLDPE plastic on a steel frame, for indoor or outdoor spaces.','مجموعه کامل بازی از پلاستیک LLDPE مقاوم در برابر فرابنفش، با قاب فولادی برای فضای داخلی یا بیرونی.','Ichki va tashqi joylar uchun UVga chidamli LLDPE plastik va po‘lat romdan tayyorlangan to‘liq o‘yin majmuasi.','Игровой комплекс из устойчивого к ультрафиолету пластика LLDPE на стальном каркасе для помещений и улицы.'],['A family ride that anchors a park or an event space.','وسیله تفریحی خانوادگی مناسب پارک یا محل برگزاری رویداد.','Park yoki tadbir joyi uchun oilaviy attraksion.','Семейный аттракцион для парка или площадки мероприятия.'],['Bright inflatable play that sets up fast for events and parks.','بازی بادی رنگارنگ که به‌سرعت برای رویدادها و پارک‌ها آماده می‌شود.','Tadbirlar va parklar uchun tez o‘rnatiladigan rang-barang puflama o‘yin.','Яркие надувные аттракционы, которые быстро устанавливаются для мероприятий и парков.'],['Target and shooting games for safe, competitive fun.','بازی‌های هدف‌گیری و تیراندازی برای رقابت ایمن و سرگرم‌کننده.','Xavfsiz va qiziqarli bellashuv uchun nishonga otish o‘yinlari.','Игры на меткость и стрельбу для безопасного и азартного соревнования.'],['A smart vending machine that earns around the clock next to your games.','دستگاه فروش خودکار هوشمند که در کنار بازی‌های شما شبانه‌روز درآمدزایی می‌کند.','O‘yinlar yonida tunu kun daromad keltiradigan aqlli savdo avtomati.','Умный торговый автомат, который приносит доход круглосуточно рядом с игровыми зонами.'],['A paid massage chair for malls, airports and lounges.','صندلی ماساژ پولی برای مراکز خرید، فرودگاه‌ها و سالن‌های استراحت.','Savdo markazlari, aeroportlar va dam olish joylari uchun pullik massaj kreslosi.','Массажное кресло с оплатой для торговых центров, аэропортов и лаунж-зон.'],['For a mall corner of 30–40 m², start with a boxing machine plus a prize claw. Boxing pulls teens and adults, the claw pulls kids and families, and together they need about 4 m² and one socket each.','برای گوشه‌ای ۳۰ تا ۴۰ مترمربعی در مرکز خرید، با یک دستگاه بوکس و یک دستگاه چنگکی جایزه شروع کنید. بوکس نوجوانان و بزرگسالان را جذب می‌کند و چنگک کودکان و خانواده‌ها را؛ در مجموع حدود ۴ متر مربع فضا و برای هرکدام یک پریز نیاز است.','Savdo markazidagi 30–40 m² burchak uchun boks avtomati va sovrinli kran avtomatidan boshlang. Boks o‘smirlar va kattalarni, kran esa bolalar va oilalarni jalb qiladi. Ikkalasiga jami taxminan 4 m² joy va har biriga bittadan rozetka kerak.','Для зоны 30–40 м² в торговом центре начните с боксёрского автомата и автомата-клешни. Бокс привлекает подростков и взрослых, клешня — детей и семьи. Вместе им нужно около 4 м² и по одной розетке каждому.']
  );
  // v5 phrases: marketplace, WhatsApp/Telegram ordering, hero slides, labels
  UI_PHRASES.push(
    ["Wholesale prices", "قیمت‌های عمده", "Ulgurji narxlar", "Оптовые цены"],
    ["All our machines in one place", "همه دستگاه‌های ما در یک جا", "Barcha avtomatlarimiz bir joyda", "Все наши автоматы в одном месте"],
    ["See all machines", "مشاهده همه دستگاه‌ها", "Barcha avtomatlarni ko‘rish", "Смотреть все автоматы"],
    ["Order now", "همین حالا سفارش دهید", "Hoziroq buyurtma bering", "Закажите сейчас"],
    ["ORDER NOW", "همین حالا سفارش دهید", "HOZIROQ BUYURTMA BERING", "ЗАКАЖИТЕ СЕЙЧАС"],
    ["Contact us now for wholesale prices and fast delivery.", "برای قیمت‌های عمده و ارسال سریع همین حالا با ما تماس بگیرید.", "Ulgurji narxlar va tez yetkazib berish uchun hoziroq biz bilan bog‘laning.", "Свяжитесь с нами сейчас, чтобы узнать оптовые цены и условия быстрой доставки."],
    ["Contact us now for wholesale prices.", "برای قیمت‌های عمده همین حالا با ما تماس بگیرید.", "Ulgurji narxlar uchun hoziroq bog‘laning.", "Свяжитесь с нами, чтобы узнать оптовые цены."],
    ["We ship to your door — and install.", "تا درب محل شما می‌رسانیم و نصب می‌کنیم.", "Eshigingizgacha yetkazamiz va o‘rnatamiz.", "Доставим до двери и установим."],
    ["One delivery price for the whole order.", "یک هزینه ارسال برای کل سفارش.", "Butun buyurtma uchun bitta yetkazish narxi.", "Одна цена доставки за весь заказ."],
    ["One delivery price for the whole order", "یک هزینه ارسال برای کل سفارش", "Butun buyurtma uchun bitta yetkazish narxi", "Одна цена доставки за весь заказ"],
    ["One delivery price for the whole order. Our team confirms before dispatch.", "یک هزینه ارسال برای کل سفارش. تیم ما پیش از ارسال تأیید می‌کند.", "Butun buyurtma uchun bitta yetkazish narxi. Jo‘natishdan oldin jamoamiz tasdiqlaydi.", "Одна цена доставки за весь заказ. Перед отправкой наша команда всё подтвердит."],
    ["Store", "فروشگاه", "Do‘kon", "Магазин"],
    ["Marketplace", "بازار", "Bozor", "Объявления"],
    ["Main", "اصلی", "Asosiy", "Главное меню"],
    ["Menu", "فهرست", "Menyu", "Меню"],
    ["Bag", "سبد", "Savat", "Корзина"],
    ["PLAYMAX showroom", "نمایشگاه PLAYMAX", "PLAYMAX ko‘rgazmasi", "Шоурум PLAYMAX"],
    ["SPACE prize claw", "دستگاه چنگکی جایزه SPACE", "SPACE sovrinli kran avtomati", "Призовой автомат SPACE"],
    ["All PLAYMAX machines: boxing, prize claws, games, vending, VR, playgrounds and rides", "همه دستگاه‌های PLAYMAX: بوکس، چنگکی جایزه، بازی‌ها، دستگاه‌های فروش، واقعیت مجازی، پارک کودکان و وسایل شهربازی", "Barcha PLAYMAX avtomatlari: boks, sovrinli kranlar, o‘yinlar, savdo avtomatlari, VR, bolalar maydonchalari va attraksionlar", "Все автоматы PLAYMAX: бокс, призовые автоматы, игры, вендинг, VR, детские площадки и аттракционы"],
    ["All PLAYMAX machines", "همه دستگاه‌های PLAYMAX", "Barcha PLAYMAX avtomatlari", "Все автоматы PLAYMAX"],
    ["TikTok account link pending", "پیوند حساب تیک‌تاک به‌زودی", "TikTok havolasi tez orada", "Ссылка на TikTok скоро появится"],
    ["TikTok — link coming soon", "تیک‌تاک — پیوند به‌زودی", "TikTok — havola tez orada", "TikTok — ссылка скоро появится"],
    ["link coming soon", "پیوند به‌زودی", "havola tez orada", "ссылка скоро появится"],
    ["tap a category to open it.", "برای باز کردن، روی یک دسته بزنید.", "ochish uchun toifani bosing.", "нажмите на категорию, чтобы открыть её."],
    ["Automatic electric massage", "ماساژ برقی خودکار", "Avtomatik elektr massaj", "Автоматический электромассаж"],
    ["15.6-inch touchscreen", "صفحه لمسی ۱۵٫۶ اینچ", "15,6 dyuymli sensorli ekran", "Сенсорный экран 15,6 дюйма"],
    ["Bow, arrows, target, accessories", "کمان، تیر، هدف و لوازم جانبی", "Kamon, o‘qlar, nishon va aksessuarlar", "Лук, стрелы, мишень и аксессуары"],
    ["Adjustable bungee harness", "کمربند بانجی قابل تنظیم", "Sozlanadigan banji kamari", "Регулируемая страховочная система банджи"],
    ["Transparent inflatable balls", "توپ‌های بادی شفاف", "Shaffof puflama sharlar", "Прозрачные надувные шары"],
    ["Slides, castles, obstacle play", "سرسره‌ها، قلعه‌ها و مسیر موانع", "Tepaliklar, qal’alar va to‘siqli o‘yinlar", "Горки, замки и полосы препятствий"],
    ["Breadcrumb", "مسیر صفحه", "Sahifa yo‘li", "Навигация"],
    ["Sort", "مرتب‌سازی", "Saralash", "Сортировка"],
    ["Featured", "پیشنهادی", "Tavsiya etilgan", "Рекомендуемые"],
    ["Price: low to high", "قیمت: کم به زیاد", "Narx: arzondan qimmatga", "Цена: по возрастанию"],
    ["Price: high to low", "قیمت: زیاد به کم", "Narx: qimmatdan arzonga", "Цена: по убыванию"],
    ["Front", "جلو", "Old tomoni", "Спереди"],
    ["Front view", "نمای جلو", "Old tomondan", "Вид спереди"],
    ["3/4 view", "نمای سه‌رخ", "3/4 ko‘rinish", "Вид 3/4"],
    ["Side view", "نمای کنار", "Yon tomondan", "Вид сбоку"],
    ["Back view", "نمای پشت", "Orqa tomondan", "Вид сзади"],
    ["Full view", "نمای کامل", "To‘liq ko‘rinish", "Полный вид"],
    ["Zoom", "بزرگ‌نمایی", "Kattalashtirish", "Увеличить"],
    ["Side", "کنار", "Yon tomoni", "Сбоку"],
    ["Back", "پشت", "Orqa tomoni", "Сзади"],
    ["Top", "بالا", "Yuqoridan", "Сверху"],
    ["Real photos · 3D", "عکس‌های واقعی · سه‌بعدی", "Haqiqiy rasmlar · 3D", "Реальные фото · 3D"],
    ["Real photos", "عکس‌های واقعی", "Haqiqiy rasmlar", "Реальные фото"],
    ["per order", "برای هر سفارش", "har bir buyurtma uchun", "за заказ"],
    ["Delivery", "ارسال", "Yetkazish", "Доставка"],
    ["Order through WhatsApp or Telegram — we confirm the price and delivery date.", "سفارش را از طریق واتس‌اپ یا تلگرام بفرستید؛ ما قیمت و تاریخ ارسال را تأیید می‌کنیم.", "Buyurtmani WhatsApp yoki Telegram orqali yuboring — narx va yetkazish sanasini tasdiqlaymiz.", "Оформите заказ через WhatsApp или Telegram — мы подтвердим цену и дату доставки."],
    ["Fiberglass body", "بدنه فایبرگلاس", "Shisha tolali korpus", "Корпус из стеклопластика"],
    ["Fiberglass body · LED base", "بدنه فایبرگلاس · پایه LED", "Shisha tolali korpus · LED asos", "Корпус из стеклопластика · LED-основание"],
    ["Score display · punch bag", "نمایشگر امتیاز · کیسه بوکس", "Hisob ekrani · boks qopi", "Табло · боксёрская груша"],
    ["View", "نما", "Ko‘rinish", "Вид"],
    ["Fewer", "کمتر", "Kamroq", "Меньше"],
    ["More", "بیشتر", "Ko‘proq", "Больше"],
    ["Loading 3D model…", "در حال بارگذاری مدل سه‌بعدی…", "3D model yuklanmoqda…", "Загрузка 3D-модели…"],
    ["Loading 3D…", "در حال بارگذاری سه‌بعدی…", "3D yuklanmoqda…", "Загрузка 3D…"],
    ["Measurements", "اندازه‌ها", "O‘lchamlar", "Размеры"],
    ["Auto-rotate", "چرخش خودکار", "Avtomatik aylanish", "Автовращение"],
    ["Camera", "دوربین", "Kamera", "Камера"],
    ["Height", "ارتفاع", "Balandligi", "Высота"],
    ["Top width", "عرض بخش بالایی", "Yuqori qism kengligi", "Ширина верхней части"],
    ["Middle width", "عرض بخش میانی", "O‘rta qism kengligi", "Ширина средней части"],
    ["Size guide", "راهنمای اندازه", "O‘lcham bo‘yicha qo‘llanma", "Размеры"],
    ["Width", "عرض", "Kengligi", "Ширина"],
    ["Depth", "عمق", "Chuqurligi", "Глубина"],
    ["H", "ارتفاع", "Bo‘yi", "В"],
    ["W", "عرض", "Eni", "Ш"],
    ["D", "عمق", "Chuqurligi", "Г"],
    ["LLDPE plastic", "پلاستیک LLDPE", "LLDPE plastik", "Пластик LLDPE"],
    ["Metal support structure", "سازه نگهدارنده فلزی", "Metall tayanch konstruksiya", "Металлический каркас"],
    ["Foot massage", "ماساژ پا", "Oyoq massaji", "Массаж ног"],
    ["Zero gravity / stretch modes", "حالت‌های بی‌وزنی و کشش", "Vaznsizlik va cho‘zish rejimlari", "Режимы невесомости и растяжки"],
    ["Recreation and practice", "تفریح و تمرین", "Dam olish va mashg‘ulot", "Для отдыха и тренировок"],
    ["Choose a machine and a body color. Drag the handle to compare. Only the body/frame is painted — the bag, metal, screen and stickers stay original.", "یک دستگاه و رنگ بدنه را انتخاب کنید. برای مقایسه، دستگیره را بکشید. فقط بدنه رنگ می‌شود؛ کیسه، فلز، نمایشگر و برچسب‌ها اصلی می‌مانند.", "Avtomat va korpus rangini tanlang. Taqqoslash uchun tutqichni suring. Faqat korpus bo‘yaladi — qop, metall, ekran va stikerlar o‘zgarmaydi.", "Выберите автомат и цвет корпуса. Перетащите ползунок, чтобы сравнить. Красится только корпус — груша, металл, экран и наклейки остаются прежними."],
    ["Drag to compare", "برای مقایسه بکشید", "Taqqoslash uchun suring", "Потяните, чтобы сравнить"],
    ["Open full-size photo", "باز کردن عکس در اندازه کامل", "Rasmni to‘liq o‘lchamda ochish", "Открыть фото в полном размере"],
    ["Buy and sell game machines", "خرید و فروش دستگاه‌های بازی", "O‘yin avtomatlarini sotish va sotib olish", "Покупайте и продавайте игровые автоматы"],
    ["Post your machine with photos, a description and your contacts. Buyers contact you directly.", "دستگاه خود را با عکس، توضیحات و راه‌های تماس ثبت کنید. خریداران مستقیماً با شما تماس می‌گیرند.", "Avtomatingizni rasmlar, tavsif va kontaktlaringiz bilan joylang. Xaridorlar siz bilan to‘g‘ridan-to‘g‘ri bog‘lanadi.", "Разместите автомат с фото, описанием и контактами. Покупатели свяжутся с вами напрямую."],
    ["+ Post a machine", "+ ثبت دستگاه", "+ Avtomat joylash", "+ Разместить автомат"],
    ["All", "همه", "Barchasi", "Все"],
    ["Other", "دیگر", "Boshqa", "Другое"],
    ["No posts yet", "هنوز آگهی‌ای نیست", "Hozircha e’lonlar yo‘q", "Пока нет объявлений"],
    ["Be the first to post your machine for sale.", "اولین نفری باشید که دستگاه خود را برای فروش ثبت می‌کند.", "Avtomatingizni sotuvga birinchi bo‘lib joylang.", "Станьте первым, кто разместит автомат на продажу."],
    ["No posts yet. Be the first to post your machine for sale.", "هنوز آگهی‌ای نیست. اولین نفری باشید که دستگاه خود را برای فروش ثبت می‌کند.", "Hozircha e’lonlar yo‘q. Avtomatingizni sotuvga birinchi bo‘lib joylang.", "Пока нет объявлений. Станьте первым, кто разместит автомат на продажу."],
    ["Prototype: posts are saved on this device until the marketplace server is connected.", "نسخه آزمایشی: تا زمان وصل شدن سرور بازار، آگهی‌ها روی همین دستگاه ذخیره می‌شوند.", "Namoyish versiyasi: bozor serveri ulanmaguncha e’lonlar shu qurilmada saqlanadi.", "Демоверсия: пока сервер объявлений не подключён, объявления сохраняются на этом устройстве."],
    ["Post a machine for sale", "ثبت دستگاه برای فروش", "Avtomatni sotuvga joylash", "Разместить автомат на продажу"],
    ["Machine name", "نام دستگاه", "Avtomat nomi", "Название автомата"],
    ["Condition", "وضعیت", "Holati", "Состояние"],
    ["Used", "دست دوم", "Ishlatilgan", "Б/у"],
    ["New", "نو", "Yangi", "Новый"],
    ["Price (USD, optional)", "قیمت (دالر، اختیاری)", "Narx (AQSh dollari, ixtiyoriy)", "Цена (USD, необязательно)"],
    ["Description", "توضیحات", "Tavsif", "Описание"],
    ["Photos (up to 4)", "عکس‌ها (حداکثر ۴)", "Rasmlar (4 tagacha)", "Фото (до 4)"],
    ["📷 Add photos", "📷 افزودن عکس", "📷 Rasm qo‘shish", "📷 Добавить фото"],
    ["Your name", "نام شما", "Ismingiz", "Ваше имя"],
    ["Other link (optional)", "پیوند دیگر (اختیاری)", "Boshqa havola (ixtiyoriy)", "Другая ссылка (необязательно)"],
    ["Add at least one way for buyers to contact you.", "دست‌کم یک راه تماس برای خریداران وارد کنید.", "Xaridorlar bog‘lanishi uchun kamida bitta aloqa usulini qo‘shing.", "Укажите хотя бы один способ связи для покупателей."],
    ["Add at least one photo.", "دست‌کم یک عکس اضافه کنید.", "Kamida bitta rasm qo‘shing.", "Добавьте хотя бы одно фото."],
    ["Publish post", "انتشار آگهی", "E’lonni joylash", "Опубликовать"],
    ["Your post is published", "آگهی شما منتشر شد", "E’loningiz joylandi", "Объявление опубликовано"],
    ["Post deleted", "آگهی حذف شد", "E’lon o‘chirildi", "Объявление удалено"],
    ["Not enough space on this device — use fewer or smaller photos.", "فضای کافی روی این دستگاه نیست؛ عکس‌های کمتر یا کوچک‌تر انتخاب کنید.", "Qurilmada joy yetarli emas — kamroq yoki kichikroq rasm tanlang.", "Недостаточно места на устройстве — выберите меньше фото или фото поменьше."],
    ["This photo could not be read.", "این عکس خوانده نشد.", "Bu rasmni o‘qib bo‘lmadi.", "Не удалось прочитать это фото."],
    ["e.g. Boxing machine, almost new", "مثلاً: دستگاه بوکس، تقریباً نو", "Masalan: boks avtomati, deyarli yangi", "Например: боксёрский автомат, почти новый"],
    ["Model, year, condition, what is included…", "مدل، سال، وضعیت و آنچه همراه آن است…", "Modeli, yili, holati, nimalar kiradi…", "Модель, год, состояние, что входит в комплект…"],
    ["Delete my post", "حذف آگهی من", "E’lonimni o‘chirish", "Удалить моё объявление"],
    ["Call", "تماس", "Qo‘ng‘iroq", "Позвонить"],
    ["Website", "وب‌سایت", "Veb-sayt", "Сайт"],
    ["👋 Welcome to the PLAYMAX marketplace. Post your machine with photos, a description and your contacts — buyers contact you directly.", "👋 به بازار PLAYMAX خوش آمدید. دستگاه خود را با عکس، توضیحات و راه‌های تماس ثبت کنید؛ خریداران مستقیماً با شما تماس می‌گیرند.", "👋 PLAYMAX bozoriga xush kelibsiz. Avtomatingizni rasmlar, tavsif va kontaktlaringiz bilan joylang — xaridorlar siz bilan to‘g‘ridan-to‘g‘ri bog‘lanadi.", "👋 Добро пожаловать в объявления PLAYMAX. Разместите автомат с фото, описанием и контактами — покупатели свяжутся с вами напрямую."],
    ["Estimate machine income", "برآورد درآمد دستگاه", "Avtomat daromadini hisoblash", "Расчёт дохода автомата"],
    ["Adjust the values to see daily, monthly and yearly revenue update instantly.", "مقادیر را تغییر دهید تا درآمد روزانه، ماهانه و سالانه فوراً به‌روز شود.", "Qiymatlarni o‘zgartiring — kunlik, oylik va yillik daromad darhol yangilanadi.", "Меняйте значения — доход за день, месяц и год пересчитается сразу."],
    ["Machine", "دستگاه", "Avtomat", "Автомат"],
    ["Investment", "سرمایه‌گذاری", "Sarmoya", "Инвестиции"],
    ["investment", "سرمایه‌گذاری", "sarmoya", "инвестиции"],
    ["Estimate from your inputs; actual results depend on usage and operating costs.", "این برآورد بر پایه اعداد شماست؛ نتیجه واقعی به میزان استفاده و هزینه‌ها بستگی دارد.", "Hisob siz kiritgan qiymatlarga asoslangan; haqiqiy natija foydalanish va xarajatlarga bog‘liq.", "Расчёт по вашим данным; фактический результат зависит от посещаемости и расходов."],
    ["*BOX 01, 30 players a day", "*BOX 01، روزانه ۳۰ بازیکن", "*BOX 01, kuniga 30 o‘yinchi", "*BOX 01, 30 игроков в день"],
    ["PLAYMAX supplies arcade, boxing and family-entertainment machines to businesses across Afghanistan, Uzbekistan and beyond — from choosing the right machine to delivery, installation and service.", "PLAYMAX دستگاه‌های آرکید، بوکس و سرگرمی خانوادگی را برای کسب‌وکارها در افغانستان، ازبکستان و منطقه فراهم می‌کند؛ از انتخاب دستگاه مناسب تا ارسال، نصب و خدمات.", "PLAYMAX Afg‘oniston, O‘zbekiston va mintaqadagi bizneslarga arkada, boks va oilaviy ko‘ngilochar avtomatlarini yetkazib beradi — to‘g‘ri avtomatni tanlashdan tortib yetkazish, o‘rnatish va xizmatgacha.", "PLAYMAX поставляет аркадные, боксёрские и семейные игровые автоматы для бизнеса в Афганистане, Узбекистане и регионе — от подбора автомата до доставки, установки и сервиса."],
    ["Vision", "چشم‌انداز", "Maqsad", "Видение"],
    ["VISION", "چشم‌انداز", "MAQSAD", "ВИДЕНИЕ"],
    ["Mission", "مأموریت", "Vazifa", "Миссия"],
    ["MISSION", "مأموریت", "VAZIFA", "МИССИЯ"],
    ["Promise", "تعهد", "Va’da", "Обещание"],
    ["A playground in every neighborhood of the region.", "یک مکان بازی در هر محله منطقه.", "Mintaqaning har bir mahallasida o‘yin maydoni.", "Игровая площадка в каждом районе региона."],
    ["Profitable, safe machines with real support after the sale.", "دستگاه‌های سودآور و ایمن با پشتیبانی واقعی پس از فروش.", "Sotuvdan keyin ham qo‘llab-quvvatlanadigan foydali va xavfsiz avtomatlar.", "Прибыльные и безопасные автоматы с настоящей поддержкой после продажи."],
    ["Fair prices, on-time delivery and honest advice.", "قیمت منصفانه، ارسال به‌موقع و مشاوره صادقانه.", "Adolatli narx, o‘z vaqtida yetkazish va halol maslahat.", "Честные цены, доставка вовремя и честные советы."],
    ["Pick a machine or describe your space to our team.", "یک دستگاه انتخاب کنید یا فضای خود را برای تیم ما شرح دهید.", "Avtomat tanlang yoki joyingizni jamoamizga tasvirlab bering.", "Выберите автомат или опишите помещение нашей команде."],
    ["You order", "سفارش می‌دهید", "Buyurtma berasiz", "Вы заказываете"],
    ["Send your order on WhatsApp or Telegram — we confirm the price and delivery date.", "سفارش خود را در واتس‌اپ یا تلگرام بفرستید؛ ما قیمت و تاریخ ارسال را تأیید می‌کنیم.", "Buyurtmangizni WhatsApp yoki Telegram orqali yuboring — narx va yetkazish sanasini tasdiqlaymiz.", "Отправьте заказ в WhatsApp или Telegram — мы подтвердим цену и дату доставки."],
    ["Service and spare parts after the sale. Warranty: [X] year.", "خدمات و قطعات یدکی پس از فروش. ضمانت: [X] سال.", "Sotuvdan keyingi xizmat va ehtiyot qismlar. Kafolat: [X] yil.", "Сервис и запчасти после продажи. Гарантия: [X] год."],
    ["PLAYMAX دلیر logo", "نشان PLAYMAX دلیر", "PLAYMAX logotipi", "Логотип PLAYMAX"],
    ["Let’s build your arena.", "بیایید فضای بازی شما را بسازیم.", "Keling, o‘yin maydoningizni yaratamiz.", "Давайте создадим ваше игровое пространство."],
    ["Company profile link coming soon", "پیوند صفحه شرکت به‌زودی", "Kompaniya sahifasiga havola tez orada", "Ссылка на страницу компании скоро появится"],
    ["Send us the account link when ready", "وقتی آماده شد، پیوند حساب را برای ما بفرستید", "Tayyor bo‘lganda hisob havolasini yuboring", "Пришлите ссылку на аккаунт, когда будет готова"],
    ["Phone or email", "تلفن یا ایمیل", "Telefon yoki email", "Телефон или эл. почта"],
    ["Ordering several machines? Write to us for wholesale prices.", "چند دستگاه سفارش می‌دهید؟ برای قیمت عمده به ما پیام دهید.", "Bir nechta avtomat buyurtma qilyapsizmi? Ulgurji narx uchun bizga yozing.", "Заказываете несколько автоматов? Напишите нам — назовём оптовую цену."],
    ["Wholesale prices", "قیمت‌های عمده", "Ulgurji narxlar", "Оптовые цены"],
    ["Details for this machine", "جزئیات این دستگاه", "Ushbu avtomat tafsilotlari", "Пожелания к этому автомату"],
    ["Estimated total", "مجموع تخمینی", "Taxminiy jami", "Итого (ориентировочно)"],
    ["Branding, coin type, voltage, prizes, event date…", "برندینگ، نوع سکه، ولتاژ، جوایز، تاریخ رویداد…", "Brending, tanga turi, kuchlanish, sovrinlar, tadbir sanasi…", "Брендинг, тип монет, напряжение, призы, дата мероприятия…"],
    ["Sign in to autofill", "برای تکمیل خودکار وارد شوید", "Avtomatik to‘ldirish uchun kiring", "Войдите, чтобы заполнить автоматически"],
    ["Address", "آدرس", "Manzil", "Адрес"],
    ["Message for our team", "پیام برای تیم ما", "Jamoamizga xabar", "Сообщение для нашей команды"],
    ["(optional)", "(اختیاری)", "(ixtiyoriy)", "(необязательно)"],
    ["Send your order", "سفارش خود را بفرستید", "Buyurtmangizni yuboring", "Отправьте заказ"],
    ["Choose where to send it. Your order form opens with all the details and the machine photos.", "انتخاب کنید به کجا بفرستید. فرم سفارش با همه جزئیات و عکس دستگاه‌ها باز می‌شود.", "Qayerga yuborishni tanlang. Buyurtma shakli barcha tafsilotlar va avtomat rasmlari bilan ochiladi.", "Выберите, куда отправить. Откроется форма заказа со всеми деталями и фото автоматов."],
    ["Street, building, landmark", "خیابان، ساختمان، نشانی نزدیک", "Ko‘cha, bino, mo‘ljal", "Улица, дом, ориентир"],
    ["Best time to call, site access, opening date…", "بهترین زمان تماس، دسترسی به محل، تاریخ افتتاح…", "Qo‘ng‘iroq uchun qulay vaqt, joyga kirish, ochilish sanasi…", "Удобное время для звонка, подъезд к месту, дата открытия…"],
    ["Best time to call, opening date…", "بهترین زمان تماس، تاریخ افتتاح…", "Qo‘ng‘iroq uchun qulay vaqt, ochilish sanasi…", "Удобное время для звонка, дата открытия…"],
    ["Message (optional)", "پیام (اختیاری)", "Xabar (ixtiyoriy)", "Сообщение (необязательно)"],
    ["Order ready", "سفارش آماده است", "Buyurtma tayyor", "Заказ готов"],
    ["Thank you!", "سپاسگزاریم!", "Rahmat!", "Спасибо!"],
    ["Your order opened in WhatsApp. Press Send there to deliver it to PLAYMAX.", "سفارش شما در واتس‌اپ باز شد. آنجا دکمه ارسال را بزنید تا به PLAYMAX برسد.", "Buyurtmangiz WhatsApp’da ochildi. PLAYMAX’ga yetib borishi uchun u yerda «Yuborish»ni bosing.", "Заказ открылся в WhatsApp. Нажмите «Отправить», чтобы он дошёл до PLAYMAX."],
    ["We copied your order. In the Telegram chat, paste it and press Send.", "سفارش شما کپی شد. در گفتگوی تلگرام آن را بچسبانید و ارسال را بزنید.", "Buyurtmangiz nusxalandi. Telegram chatiga joylab, «Yuborish»ni bosing.", "Мы скопировали заказ. Вставьте его в чат Telegram и нажмите «Отправить»."],
    ["Order copied — paste it in the Telegram chat", "سفارش کپی شد؛ آن را در گفتگوی تلگرام بچسبانید", "Buyurtma nusxalandi — uni Telegram chatiga joylang", "Заказ скопирован — вставьте его в чат Telegram"],
    ["Copy order", "کپی سفارش", "Buyurtmani nusxalash", "Скопировать заказ"],
    ["Copied", "کپی شد", "Nusxalandi", "Скопировано"],
    ["Keep shopping", "ادامه خرید", "Xaridni davom ettirish", "Продолжить покупки"],
    ["Back to home", "بازگشت به خانه", "Bosh sahifaga qaytish", "На главную"],
    ["Shipping", "ارسال", "Yetkazish", "Доставка"],
    ["Total", "مجموع", "Jami", "Итого"],
    ["Machines", "دستگاه‌ها", "Avtomatlar", "Автоматы"],
    ["PLAYMAX account", "حساب PLAYMAX", "PLAYMAX hisobi", "Аккаунт PLAYMAX"],
    ["Optional. Your name and contact details are saved for the next order.", "اختیاری است. نام و راه تماس شما برای سفارش بعدی ذخیره می‌شود.", "Ixtiyoriy. Ismingiz va aloqa ma’lumotlaringiz keyingi buyurtma uchun saqlanadi.", "Необязательно. Имя и контакты сохранятся для следующего заказа."],
    ["Optional — details saved for next time.", "اختیاری — اطلاعات برای دفعه بعد ذخیره می‌شود.", "Ixtiyoriy — ma’lumotlar keyingi safar uchun saqlanadi.", "Необязательно — данные сохранятся на следующий раз."],
    ["Your full name", "نام کامل شما", "To‘liq ismingiz", "Ваше полное имя"],
    ["At least 8 characters", "دست‌کم ۸ نویسه", "Kamida 8 ta belgi", "Не менее 8 символов"],
    ["My orders", "سفارش‌های من", "Buyurtmalarim", "Мои заказы"],
    ["PLAYMAX Customer", "مشتری PLAYMAX", "PLAYMAX mijozi", "Клиент PLAYMAX"],
    ["No orders yet.", "هنوز سفارشی ندارید.", "Hozircha buyurtmalar yo‘q.", "Заказов пока нет."],
    ["Saved details", "اطلاعات ذخیره‌شده", "Saqlangan ma’lumotlar", "Сохранённые данные"],
    ["Account created — your details are saved", "حساب ساخته شد؛ اطلاعات شما ذخیره شد", "Hisob yaratildi — ma’lumotlaringiz saqlandi", "Аккаунт создан — данные сохранены"],
    ["Account created", "حساب ساخته شد", "Hisob yaratildi", "Аккаунт создан"],
    ["Signed in", "وارد شدید", "Tizimga kirdingiz", "Вы вошли"],
    ["Signed out", "خارج شدید", "Tizimdan chiqdingiz", "Вы вышли"],
    ["Sign out", "خروج", "Chiqish", "Выйти"],
    ["Browsing as a guest", "مرور به‌عنوان مهمان", "Mehmon sifatida ko‘ryapsiz", "Вы просматриваете как гость"],
    ["PLAYMAX app", "اپلیکیشن PLAYMAX", "PLAYMAX ilovasi", "Приложение PLAYMAX"],
    ["App", "اپلیکیشن", "Ilova", "Приложение"],
    ["Working prototype for Google Play and the App Store. Tap through it here, or open this page on your phone for the full-screen version.", "نمونه کارا برای گوگل‌پلی و اپ‌استور. همین‌جا امتحان کنید یا این صفحه را در گوشی باز کنید تا تمام‌صفحه ببینید.", "Google Play va App Store uchun ishlaydigan namuna. Shu yerda sinab ko‘ring yoki to‘liq ekran uchun sahifani telefoningizda oching.", "Рабочий прототип для Google Play и App Store. Попробуйте здесь или откройте страницу на телефоне в полноэкранном режиме."],
    ["Try: the store categories, MANGU and UFC in 3D and next to a person, real body colors, the marketplace, the bag and ordering through WhatsApp or Telegram.", "امتحان کنید: دسته‌های فروشگاه، MANGU و UFC به‌صورت سه‌بعدی و کنار انسان، رنگ‌های واقعی بدنه، بازار، سبد خرید و سفارش از طریق واتس‌اپ یا تلگرام.", "Sinab ko‘ring: do‘kon toifalari, MANGU va UFC 3D ko‘rinishda va odam yonida, haqiqiy korpus ranglari, bozor, savat hamda WhatsApp yoki Telegram orqali buyurtma.", "Попробуйте: категории магазина, MANGU и UFC в 3D и рядом с человеком, реальные цвета корпуса, объявления, корзину и заказ через WhatsApp или Telegram."],
    ["Shop now", "خرید کنید", "Xarid qilish", "Купить"],
    ["Delivery and installation", "ارسال و نصب", "Yetkazish va o‘rnatish", "Доставка и установка"],
    ["Order on WhatsApp or Telegram", "سفارش در واتس‌اپ یا تلگرام", "WhatsApp yoki Telegram orqali buyurtma", "Заказ через WhatsApp или Telegram"],
    ["ALL MACHINES", "همه دستگاه‌ها", "BARCHA AVTOMATLAR", "ВСЕ АВТОМАТЫ"],
    ["NEW SEASON", "فصل جدید", "YANGI MAVSUM", "НОВЫЙ СЕЗОН"],
    ["A complete play system in UV-resistant plastic on a steel frame.", "مجموعه کامل بازی از پلاستیک مقاوم در برابر نور خورشید روی چارچوب فولادی.", "Quyosh nuriga chidamli plastik va po‘lat ramkadan iborat to‘liq o‘yin majmuasi.", "Полноценный игровой комплекс из устойчивого к ультрафиолету пластика на стальном каркасе."],
    ["Save", "ذخیره", "Saqlash", "Сохранить"],
    ["Saved to favorites", "به علاقه‌مندی‌ها اضافه شد", "Sevimlilarga qo‘shildi", "Добавлено в избранное"],
    ["results", "نتیجه", "natija", "результатов"],
    ["Try “boxing”, “claw” or “VR”.", "«بوکس»، «چنگک» یا «VR» را امتحان کنید.", "“Boks”, “kran” yoki “VR” deb qidirib ko‘ring.", "Попробуйте «бокс», «клешня» или «VR»."],
    ["Practical help for your machines", "راهنمای کاربردی برای دستگاه‌های شما", "Avtomatlaringiz uchun amaliy yordam", "Практическая помощь по вашим автоматам"],
    ["Follow clear video guides for common machine issues, with step-by-step instructions under each video.", "با راهنماهای ویدیویی روشن، مشکلات رایج دستگاه را حل کنید؛ زیر هر ویدیو دستورالعمل گام‌به‌گام هست.", "Avtomatlardagi keng tarqalgan muammolar bo‘yicha aniq video qo‘llanmalar — har bir video ostida bosqichma-bosqich ko‘rsatma.", "Понятные видеоинструкции по частым неисправностям — с пошаговым описанием под каждым видео."],
    ["Repair and maintenance videos", "ویدیوهای تعمیر و نگهداری", "Ta’mirlash va texnik xizmat videolari", "Видео по ремонту и обслуживанию"],
    ["Video guides and written steps will appear here.", "راهنماهای ویدیویی و مراحل نوشتاری اینجا نمایش داده می‌شوند.", "Video qo‘llanmalar va yozma qadamlar shu yerda paydo bo‘ladi.", "Здесь появятся видео и пошаговые инструкции."],
    ["Send us the videos when they are ready. We’ll add each one with a clear explanation and numbered steps.", "وقتی ویدیوها آماده شد برای ما بفرستید. هرکدام را با توضیح روشن و مراحل شماره‌دار اضافه می‌کنیم.", "Videolar tayyor bo‘lganda bizga yuboring. Har birini aniq tushuntirish va raqamlangan qadamlar bilan qo‘shamiz.", "Пришлите видео, когда будут готовы. Мы добавим каждое с понятным объяснением и пронумерованными шагами."],
    ["For electrical faults, damaged cables or unsafe operation, switch off and unplug the machine before contacting support.", "در صورت خرابی برقی، کابل آسیب‌دیده یا کار ناایمن، پیش از تماس با پشتیبانی دستگاه را خاموش کرده و از برق بکشید.", "Elektr nosozligi, shikastlangan kabel yoki xavfli ishlashda qo‘llab-quvvatlash xizmatiga murojaat qilishdan oldin avtomatni o‘chirib, tokdan uzing.", "При неисправности электрики, повреждённом кабеле или небезопасной работе выключите автомат и отключите его от сети, прежде чем обращаться в поддержку."],
    ["Rental request added — choose dates at checkout", "درخواست کرایه اضافه شد؛ تاریخ را هنگام ثبت سفارش بنویسید", "Ijara so‘rovi qo‘shildi — sanalarni buyurtmada yozing", "Запрос на аренду добавлен — укажите даты при оформлении"],
    ["rental added", "کرایه اضافه شد", "ijara qo‘shildi", "аренда добавлена"],
    ["added to your bag", "به سبد شما اضافه شد", "savatga qo‘shildi", "добавлен в корзину"]
  );
  UI_PHRASES.push(
    ["Contact us now to know the wholesale price.", "همین حالا با ما تماس بگیرید تا قیمت عمده را بدانید.", "Ulgurji narxni bilish uchun hoziroq biz bilan bog‘laning.", "Свяжитесь с нами сейчас, чтобы узнать оптовую цену."],
    ["Ordering several machines? Contact us now to know the wholesale price.", "چند دستگاه سفارش می‌دهید؟ همین حالا با ما تماس بگیرید تا قیمت عمده را بدانید.", "Bir nechta avtomat buyurtma qilyapsizmi? Ulgurji narxni bilish uchun hoziroq bog‘laning.", "Заказываете несколько автоматов? Свяжитесь с нами сейчас, чтобы узнать оптовую цену."],
    ["5 body colors", "۵ رنگ بدنه", "5 xil korpus rangi", "5 цветов корпуса"],
    ["Wholesale price", "قیمت عمده", "Ulgurji narx", "Оптовая цена"],
    ["Best sellers", "پرفروش‌ترین‌ها", "Eng ko‘p sotilganlar", "Хиты продаж"],
    ["Our best-selling boxing machines", "پرفروش‌ترین دستگاه‌های بوکس ما", "Eng ko‘p sotiladigan boks avtomatlarimiz", "Наши самые продаваемые боксёрские автоматы"],
    ["Pays back in about 2 months*", "بازگشت سرمایه حدود ۲ ماه*", "Taxminan 2 oyda o‘zini oqlaydi*", "Окупаемость примерно за 2 месяца*"],
    ["PLAYMAX machines: boxing, prize claws, vending, VR, playgrounds and table games", "دستگاه‌های PLAYMAX: بوکس، چنگک جایزه، فروش خودکار، واقعیت مجازی، پارک بازی و بازی‌های میزی", "PLAYMAX avtomatlari: boks, sovrinli kran, savdo avtomatlari, VR, bolalar maydonchalari va stol o‘yinlari", "Автоматы PLAYMAX: бокс, автоматы с призами, вендинг, VR, детские площадки и настольные игры"],
    ["PLAYMAX boxing machines: KING, MANGU and UFC", "دستگاه‌های بوکس PLAYMAX: KING، MANGU و UFC", "PLAYMAX boks avtomatlari: KING, MANGU va UFC", "Боксёрские автоматы PLAYMAX: KING, MANGU и UFC"],
    ["PLAYMAX machines", "دستگاه‌های PLAYMAX", "PLAYMAX avtomatlari", "Автоматы PLAYMAX"],
    ["PLAYMAX boxing machines", "دستگاه‌های بوکس PLAYMAX", "PLAYMAX boks avtomatlari", "Боксёрские автоматы PLAYMAX"],
    ["News", "اخبار", "Yangiliklar", "Новости"],
    ["Latest from PLAYMAX", "تازه‌ترین‌ها از PLAYMAX", "PLAYMAX yangiliklari", "Новое от PLAYMAX"],
    ["Announcement", "اطلاعیه", "E’lon", "Объявление"],
    ["TikTok", "TikTok", "TikTok", "TikTok"]
  );
  UI_PHRASES.push(
    ["Price confirmed on order", "قیمت هنگام سفارش تأیید می‌شود", "Narx buyurtmada tasdiqlanadi", "Цена подтверждается при заказе"],
    ["© 2026 PLAYMAX. Prices are confirmed on order.", "© 2026 PLAYMAX. قیمت‌ها هنگام سفارش تأیید می‌شوند.", "© 2026 PLAYMAX. Narxlar buyurtmada tasdiqlanadi.", "© 2026 PLAYMAX. Цены подтверждаются при заказе."]
  );
  UI_PHRASES.push(
    ["Delete this post?", "این آگهی حذف شود؟", "Bu e’lon o‘chirilsinmi?", "Удалить это объявление?"],
    ["Delete", "حذف", "O‘chirish", "Удалить"],
    ["Block this user from posting?", "این کاربر از ارسال آگهی مسدود شود؟", "Bu foydalanuvchiga e’lon joylashni taqiqlaysizmi?", "Запретить этому пользователю публиковать объявления?"],
    ["They can still browse the marketplace, but cannot post.", "او همچنان می‌تواند بازار را ببیند، اما نمی‌تواند آگهی بگذارد.", "U bozorni ko‘ra oladi, lekin e’lon joylay olmaydi.", "Пользователь сможет просматривать объявления, но не сможет публиковать."],
    ["Block only", "فقط مسدود کن", "Faqat bloklash", "Только заблокировать"],
    ["Block and delete all their posts", "مسدود کن و همه آگهی‌هایش را حذف کن", "Bloklash va barcha e’lonlarini o‘chirish", "Заблокировать и удалить все его объявления"],
    ["✏️ Edit", "✏️ ویرایش", "✏️ Tahrirlash", "✏️ Изменить"],
    ["🗑 Delete", "🗑 حذف", "🗑 O‘chirish", "🗑 Удалить"],
    ["⛔ Block user", "⛔ مسدود کردن کاربر", "⛔ Foydalanuvchini bloklash", "⛔ Заблокировать"],
    ["Unblock user", "رفع مسدودیت کاربر", "Blokdan chiqarish", "Разблокировать"],
    ["Unblock", "رفع مسدودیت", "Blokdan chiqarish", "Разблокировать"],
    ["Your post", "آگهی شما", "Sizning e’loningiz", "Ваше объявление"],
    ["Blocked user", "کاربر مسدود", "Bloklangan foydalanuvchi", "Заблокирован"],
    ["Edited", "ویرایش‌شده", "Tahrirlangan", "Изменено"],
    ["Edit post", "ویرایش آگهی", "E’lonni tahrirlash", "Редактировать объявление"],
    ["Save changes", "ذخیره تغییرات", "O‘zgarishlarni saqlash", "Сохранить изменения"],
    ["Saving…", "در حال ذخیره…", "Saqlanmoqda…", "Сохранение…"],
    ["🛡️ Admin mode", "🛡️ حالت مدیر", "🛡️ Administrator rejimi", "🛡️ Режим администратора"],
    ["You can edit or delete any post and block users from posting. Customers can only edit and delete their own posts.", "شما می‌توانید هر آگهی را ویرایش یا حذف کنید و کاربران را از ارسال آگهی مسدود کنید. مشتریان فقط آگهی‌های خودشان را ویرایش و حذف می‌کنند.", "Siz istalgan e’lonni tahrirlashingiz yoki o‘chirishingiz va foydalanuvchilarni bloklashingiz mumkin. Mijozlar faqat o‘z e’lonlarini tahrirlaydi va o‘chiradi.", "Вы можете изменять и удалять любые объявления и блокировать пользователей. Клиенты могут менять и удалять только свои объявления."],
    ["Blocked users", "کاربران مسدود", "Bloklangan foydalanuvchilar", "Заблокированные пользователи"],
    ["No blocked users.", "هیچ کاربر مسدودی وجود ندارد.", "Bloklangan foydalanuvchilar yo‘q.", "Заблокированных пользователей нет."],
    ["User", "کاربر", "Foydalanuvchi", "Пользователь"],
    ["⛔ Your account has been blocked from posting by PLAYMAX. You can still browse the marketplace.", "⛔ حساب شما از طرف PLAYMAX برای ارسال آگهی مسدود شده است. همچنان می‌توانید بازار را ببینید.", "⛔ Hisobingizga PLAYMAX tomonidan e’lon joylash taqiqlangan. Bozorni ko‘rishingiz mumkin.", "⛔ PLAYMAX запретил вашему аккаунту публиковать объявления. Просматривать объявления по-прежнему можно."],
    ["You can browse the posts. Posting is not available with your current access.", "می‌توانید آگهی‌ها را ببینید. با دسترسی فعلی امکان ارسال آگهی ندارید.", "E’lonlarni ko‘rishingiz mumkin. Joriy ruxsat bilan e’lon joylab bo‘lmaydi.", "Вы можете просматривать объявления. С текущим доступом публикация недоступна."],
    ["Loading posts…", "در حال بارگذاری آگهی‌ها…", "E’lonlar yuklanmoqda…", "Загрузка объявлений…"],
    ["Posts are visible to everyone. Each person can edit or delete only their own posts.", "آگهی‌ها برای همه قابل مشاهده است. هر کس فقط آگهی‌های خودش را ویرایش یا حذف می‌کند.", "E’lonlarni hamma ko‘radi. Har kim faqat o‘z e’lonlarini tahrirlashi yoki o‘chirishi mumkin.", "Объявления видят все. Каждый может изменять и удалять только свои объявления."],
    ["User blocked and their posts deleted", "کاربر مسدود شد و آگهی‌هایش حذف شد", "Foydalanuvchi bloklandi va e’lonlari o‘chirildi", "Пользователь заблокирован, его объявления удалены"],
    ["User blocked from posting", "کاربر از ارسال آگهی مسدود شد", "Foydalanuvchiga e’lon joylash taqiqlandi", "Пользователю запрещено публиковать"],
    ["User unblocked", "مسدودیت کاربر برداشته شد", "Foydalanuvchi blokdan chiqarildi", "Пользователь разблокирован"],
    ["Changes saved", "تغییرات ذخیره شد", "O‘zgarishlar saqlandi", "Изменения сохранены"],
    ["Your account is blocked from posting.", "حساب شما برای ارسال آگهی مسدود است.", "Hisobingizga e’lon joylash taqiqlangan.", "Вашему аккаунту запрещено публиковать."],
    ["You cannot do this with your current access.", "با دسترسی فعلی نمی‌توانید این کار را انجام دهید.", "Joriy ruxsat bilan buni qilib bo‘lmaydi.", "С текущим доступом это действие недоступно."],
    ["The marketplace storage is full. Delete old posts first.", "فضای بازار پر است. ابتدا آگهی‌های قدیمی را حذف کنید.", "Bozor xotirasi to‘lgan. Avval eski e’lonlarni o‘chiring.", "Хранилище объявлений заполнено. Сначала удалите старые объявления."],
    ["This post no longer exists.", "این آگهی دیگر وجود ندارد.", "Bu e’lon endi mavjud emas.", "Этого объявления больше нет."],
    ["Could not save. Check the connection and try again.", "ذخیره نشد. اتصال را بررسی کنید و دوباره تلاش کنید.", "Saqlab bo‘lmadi. Internetni tekshirib, qayta urinib ko‘ring.", "Не удалось сохранить. Проверьте подключение и попробуйте снова."],
    ["Remove photo", "حذف عکس", "Rasmni o‘chirish", "Удалить фото"]
  );
  UI_PHRASES.push(
    ["Phone / WhatsApp", "تلفن / واتس‌اپ", "Telefon / WhatsApp", "Телефон / WhatsApp"],
    ["Email (optional)", "ایمیل (اختیاری)", "Email (ixtiyoriy)", "Эл. почта (необязательно)"],
    ["Preferred contact", "راه تماس ترجیحی", "Qulay aloqa usuli", "Удобный способ связи"],
    ["Phone call", "تماس تلفنی", "Telefon qo‘ng‘irog‘i", "Звонок"],
    ["Email", "ایمیل", "Email", "Эл. почта"],
    ["We will contact you this way to confirm the order.", "برای تأیید سفارش از این راه با شما تماس می‌گیریم.", "Buyurtmani tasdiqlash uchun shu yo‘l bilan bog‘lanamiz.", "Мы свяжемся с вами этим способом, чтобы подтвердить заказ."]
  );
  UI_PHRASES.push(
    ["Why are you reporting this post?", "چرا این آگهی را گزارش می‌کنید؟", "Nega bu e’lon haqida xabar beryapsiz?", "Почему вы жалуетесь на это объявление?"],
    ["Spam", "هرزنامه", "Spam", "Спам"],
    ["Offensive", "توهین‌آمیز", "Haqoratli", "Оскорбительное"],
    ["Fake or scam", "جعلی یا کلاهبرداری", "Soxta yoki firibgarlik", "Подделка или мошенничество"],
    ["Other", "دیگر", "Boshqa", "Другое"],
    ["🚩 Report", "🚩 گزارش", "🚩 Shikoyat", "🚩 Пожаловаться"],
    ["Reports", "گزارش‌ها", "Shikoyatlar", "Жалобы"],
    ["No reports.", "گزارشی وجود ندارد.", "Shikoyatlar yo‘q.", "Жалоб нет."],
    ["Delete post", "حذف آگهی", "E’lonni o‘chirish", "Удалить объявление"],
    ["Dismiss", "نادیده گرفتن", "Yopish", "Отклонить"],
    ["Thank you. PLAYMAX will review this post.", "سپاس. PLAYMAX این آگهی را بررسی می‌کند.", "Rahmat. PLAYMAX bu e’lonni ko‘rib chiqadi.", "Спасибо. PLAYMAX проверит это объявление."],
    ["Report dismissed", "گزارش بسته شد", "Shikoyat yopildi", "Жалоба отклонена"],
    ["Your post contains words that are not allowed. Please edit it.", "آگهی شما کلمات غیرمجاز دارد. لطفاً آن را ویرایش کنید.", "E’loningizda taqiqlangan so‘zlar bor. Iltimos, tahrirlang.", "В объявлении есть запрещённые слова. Пожалуйста, исправьте его."],
    ["Offers", "پیشنهادها", "Takliflar", "Предложения"],
    ["Previous slide", "اسلاید قبلی", "Oldingi slayd", "Предыдущий слайд"],
    ["Next slide", "اسلاید بعدی", "Keyingi slayd", "Следующий слайд"]
  );
  UI_PHRASES.push(
    ["Privacy & terms", "حریم خصوصی و شرایط", "Maxfiylik va shartlar", "Конфиденциальность и условия"],
    ["By posting you agree to the marketplace rules.", "با انتشار آگهی، قوانین بازار را می‌پذیرید.", "E’lon joylash orqali bozor qoidalariga rozilik bildirasiz.", "Публикуя объявление, вы соглашаетесь с правилами."]
  );
  UI_PHRASES.push(
    ["Welcome to the PLAYMAX marketplace", "به بازار PLAYMAX خوش آمدید", "PLAYMAX bozoriga xush kelibsiz", "Добро пожаловать в объявления PLAYMAX"],
    ["🤝 Welcome to the PLAYMAX marketplace", "🤝 به بازار PLAYMAX خوش آمدید", "🤝 PLAYMAX bozoriga xush kelibsiz", "🤝 Добро пожаловать в объявления PLAYMAX"],
    ["Sell your machine to buyers across Central Asia — free. Keep it friendly and trusted for everyone:", "دستگاه خود را رایگان به خریداران سراسر آسیای میانه بفروشید. بازار را برای همه دوستانه و قابل اعتماد نگه دارید:", "Avtomatingizni butun Markaziy Osiyo bo‘ylab xaridorlarga bepul soting. Bozorni hamma uchun do‘stona va ishonchli saqlang:", "Продавайте свой автомат покупателям по всей Центральной Азии — бесплатно. Давайте сохраним площадку дружелюбной и надёжной:"],
    ["📸 Real machines with clear photos", "📸 دستگاه واقعی با عکس واضح", "📸 Aniq rasmli haqiqiy avtomatlar", "📸 Реальные автоматы с чёткими фото"],
    ["💲 An honest price and description", "💲 قیمت و توضیح صادقانه", "💲 Halol narx va tavsif", "💲 Честная цена и описание"],
    ["🤝 Respectful words — no insults", "🤝 کلمات محترمانه، بدون توهین", "🤝 Hurmatli so‘zlar — haqoratsiz", "🤝 Уважительные слова — без оскорблений"],
    ["📞 Correct contacts so buyers can reach you", "📞 راه تماس درست تا خریداران به شما برسند", "📞 Xaridorlar bog‘lanishi uchun to‘g‘ri kontaktlar", "📞 Верные контакты, чтобы покупатели могли связаться"],
    ["Marketplace rules", "قوانین بازار", "Bozor qoidalari", "Правила объявлений"]
  );
  const UI_LOOKUP = Object.fromEntries(UI_PHRASES.map(([en, fa, uz, ru]) => [en.trim().toLocaleLowerCase(), { en, fa, uz, ru }]));
  // Templates for text that mixes fixed words with names or numbers. $1 is kept (or translated when marked with *).
  const UI_PATTERNS = [
    [/^Add (.+) to bag$/i, { fa: '$1 را به سبد اضافه کنید', uz: '$1 ni savatga qo‘shish', ru: 'Добавить $1 в корзину' }],
    [/^([\d.,]+) m tall$/i, { fa: 'ارتفاع $1 متر', uz: 'Balandligi $1 m', ru: 'Высота $1 м' }],
    [/^([\d.,]+) mm tall$/i, { fa: 'ارتفاع $1 میلی‌متر', uz: 'Balandligi $1 mm', ru: 'Высота $1 мм' }],
    [/^([\d.,]+) m$/i, { fa: '$1 متر', uz: '$1 m', ru: '$1 м' }],
    [/^([\d.,]+) cm$/i, { fa: '$1 سانتی‌متر', uz: '$1 sm', ru: '$1 см' }],
    [/^([\d.,]+) mm$/i, { fa: '$1 میلی‌متر', uz: '$1 mm', ru: '$1 мм' }],
    [/^([\d.,]+) kg$/i, { fa: '$1 کیلوگرام', uz: '$1 kg', ru: '$1 кг' }],
    [/^([\d.,]+) months?$/i, { fa: '$1 ماه', uz: '$1 oy', ru: '$1 мес.' }],
    [/^([\d.,]+) days?$/i, { fa: '$1 روز', uz: '$1 kun', ru: '$1 дн.' }],
    [/^(\$[\d,.]+) each$/i, { fa: 'هر عدد $1', uz: 'har biri $1', ru: '$1 за шт.' }],
    [/^\((\$[\d,.]+) each\)$/i, { fa: '(هر عدد $1)', uz: '(har biri $1)', ru: '($1 за шт.)' }],
    [/^Installation · (\$[\d,.]+) each$/i, { fa: 'نصب · هر عدد $1', uz: 'O‘rnatish · har biri $1', ru: 'Установка · $1 за шт.' }],
    [/^Slide (\d+)$/i, { fa: 'اسلاید $1', uz: '$1-slayd', ru: 'Слайд $1' }],
    [/^(.+) to scale$/i, { fa: '$1 در اندازه واقعی', uz: '$1 haqiqiy o‘lchamda', ru: '$1 в масштабе' }],
    [/^(.+) original$/i, { fa: '$1 — رنگ اصلی', uz: '$1 — asl rangi', ru: '$1 — исходный цвет' }],
    [/^(.+) in original red$/i, { fa: '$1 با رنگ اصلی سرخ', uz: '$1 asl qizil rangda', ru: '$1 в исходном красном цвете' }],
    [/^(.+) in the selected color$/i, { fa: '$1 با رنگ انتخاب‌شده', uz: '$1 tanlangan rangda', ru: '$1 в выбранном цвете' }],
    [/^Interactive 3D model of (.+)\. Drag to rotate, scroll or pinch to zoom\.$/i, { fa: 'مدل سه‌بعدی $1. برای چرخاندن بکشید و برای بزرگ‌نمایی اسکرول کنید.', uz: '$1 ning 3D modeli. Aylantirish uchun suring, kattalashtirish uchun g‘ildirakni aylantiring.', ru: '3D-модель $1. Перетащите, чтобы вращать, прокрутите, чтобы приблизить.' }],
    [/^3D model of (.+)$/i, { fa: 'مدل سه‌بعدی $1', uz: '$1 ning 3D modeli', ru: '3D-модель $1' }],
    [/^Open (.+)$/i, { fa: 'باز کردن $1', uz: '$1 ni ochish', ru: 'Открыть $1' }],
    [/^Enter (.+)$/i, { fa: 'وارد کنید: *1', uz: 'Kiriting: *1', ru: 'Введите: *1' }],
    [/^Salaam, (.+)\.$/i, { fa: 'سلام، $1.', uz: 'Assalomu alaykum, $1.', ru: 'Салам, $1.' }],
    [/^More (.+)$/i, { fa: 'بیشتر: $1', uz: 'Yana: $1', ru: 'Ещё: $1' }],
    [/^(.+) · RENTAL$/i, { fa: '$1 · کرایه', uz: '$1 · IJARA', ru: '$1 · АРЕНДА' }],
    [/^(.+) added to your bag$/i, { fa: '$1 به سبد شما اضافه شد', uz: '$1 savatga qo‘shildi', ru: '$1 добавлен в корзину' }],
    [/^(.+) rental added$/i, { fa: 'کرایه $1 اضافه شد', uz: '$1 ijarasi qo‘shildi', ru: 'Аренда $1 добавлена' }],
    [/^(\d+) results?$/i, { fa: '$1 نتیجه', uz: '$1 ta natija', ru: 'Результатов: $1' }]
  ];
  const MODELS_UP = () => PRODUCTS.map((p) => p.model.toUpperCase()).sort((a, b) => b.length - a.length);
  function translateText(value, lang) {
    const raw = String(value == null ? '' : value), key = raw.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
    if (!lang || lang === 'en' || !key) return value;
    const row = UI_LOOKUP[key];
    if (row && row[lang]) return row[lang];
    if (raw.includes('\n')) return raw.split('\n').map((part) => translateText(part, lang)).join('\n');
    const text = raw.trim().replace(/\s+/g, ' ');
    for (const [re, tpl] of UI_PATTERNS) {
      const m = text.match(re);
      if (m && tpl[lang]) return tpl[lang].replace('*1', translateText(m[1], lang)).replace('$1', m[1]);
    }
    // a price in brackets at the end: "BOX 03 — Boxer Champion ($1,300)"
    const pm = text.match(/^(.+?)\s*(\(\$[\d,.]+\))$/);
    if (pm) { const t = translateText(pm[1], lang); if (t !== pm[1]) return t + ' ' + pm[2]; }
    // parts joined by separators: translate each part
    for (const sep of [' · ', ' — ', ' / ']) {
      if (text.includes(sep)) { const parts = text.split(sep), out = parts.map((x) => translateText(x, lang)); if (out.some((x, i) => x !== parts[i])) return out.join(sep); }
    }
    // a model name followed by the product name: "BOX 03 Boxer Champion"
    const up = text.toUpperCase();
    for (const m of MODELS_UP()) {
      if (up.startsWith(m + ' ') && text.length > m.length + 1) { const rest = text.slice(m.length + 1), t = translateText(rest, lang); if (t !== rest) return text.slice(0, m.length) + ' ' + t; }
    }
    return value;
  }
  // Every text node and attribute keeps its original English source, so switching language
  // (including back to English) always translates from the source, never from a previous translation.
  const SRC_TEXT = typeof WeakMap === 'function' ? new WeakMap() : null;
  const SRC_ATTR = typeof WeakMap === 'function' ? new WeakMap() : null;
  function localizeDOM(root, lang) {
    if (!root || !lang) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode(node) {
      const p = node.parentElement;
      return !p || p.closest('script,style,svg,code,[data-no-translate]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }});
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const now = node.nodeValue; let rec = SRC_TEXT && SRC_TEXT.get(node);
      // a node changed by page code since we last touched it carries new source text
      if (!rec || now !== rec.out) { rec = { src: now, out: now }; if (SRC_TEXT) SRC_TEXT.set(node, rec); }
      const before = rec.src;
      let next = before;
      if (lang !== 'en') {
        const leading = (before.match(/^\s*/) || [''])[0], trailing = (before.match(/\s*$/) || [''])[0];
        const after = translateText(before, lang);
        next = after === before ? before : leading + String(after).trim() + trailing;
      }
      if (next !== now) node.nodeValue = next;
      rec.out = next;
    }
    const attrs = ['placeholder','aria-label','title','alt'];
    const els = [root, ...root.querySelectorAll('*')];
    for (const el of els) if (el.getAttribute) {
      if (el.closest && el.closest('[data-no-translate]')) continue;
      let map = SRC_ATTR && SRC_ATTR.get(el); if (!map && SRC_ATTR) { map = {}; SRC_ATTR.set(el, map); }
      for (const attr of attrs) {
        const value = el.getAttribute(attr); if (!value) continue;
        let rec = map && map[attr]; if (!rec || value !== rec.out) { rec = { src: value, out: value }; if (map) map[attr] = rec; }
        const next = lang === 'en' ? rec.src : translateText(rec.src, lang);
        if (next !== value) el.setAttribute(attr, next);
        rec.out = next;
      }
    }
  }

  const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem('pmx:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('pmx:' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  function heightMm(p) {
    for (const s of p.specs) {
      let m = s.match(/(\d[\d.]*)\s*×\s*(\d[\d.]*)\s*×\s*(?:approx\.\s*)?(\d[\d.]*)\s*(mm|cm)/i);
      if (m) return { w: +m[1] * (m[4] === 'cm' ? 10 : 1), d: +m[2] * (m[4] === 'cm' ? 10 : 1), h: +m[3] * (m[4] === 'cm' ? 10 : 1) };
      m = s.match(/(\d+)\s*mm height/i);
      if (m) return { w: null, d: null, h: +m[1] };
    }
    return null;
  }

  /* ---------- Body-only recolor ---------- */
  const imgCache = {};
  function loadImg(src) {
    if (!imgCache[src]) imgCache[src] = new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    return imgCache[src];
  }
  const recolorCache = {};
  function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  async function recolor(product, colorIdx) {
    const st = product.studio;
    if (!st || colorIdx == null || colorIdx === st.native) return product.img;
    const key = product.id + ':' + colorIdx;
    if (recolorCache[key]) return recolorCache[key];
    const [base, mask] = await Promise.all([loadImg(product.img), loadImg(st.mask)]);
    const w = base.naturalWidth, h = base.naturalHeight;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(mask, 0, 0, w, h); const md = ctx.getImageData(0, 0, w, h).data;
    ctx.clearRect(0, 0, w, h); ctx.drawImage(base, 0, 0, w, h);
    const id = ctx.getImageData(0, 0, w, h); const d = id.data;
    const t = hexRgb(COLORS[colorIdx].hex);
    for (let i = 0; i < d.length; i += 4) {
      const a = md[i] / 255; if (a < 0.02) continue;
      const l = (0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2]) / 255;
      let k = Math.log2(Math.max(l / st.med, 0.04)); k = Math.max(-1.6, Math.min(1, k));
      for (let ch = 0; ch < 3; ch++) {
        let v = k >= 0 ? t[ch] + (255 - t[ch]) * k * 0.55 : t[ch] * (1 + k * 0.42);
        d[i + ch] = d[i + ch] * (1 - a) + v * a;
      }
    }
    ctx.putImageData(id, 0, 0);
    const url = c.toDataURL('image/png');
    recolorCache[key] = url; return url;
  }

  /* ---------- 360 viewer (drag to spin a single photo) ---------- */
  function spin360(box, imgEl, shadowEl) {
    let angle = 0, dragging = false, lastX = 0, vel = 0, raf = 0, auto = true, autoUntil = performance.now() + 2600;
    const apply = () => {
      const a = ((angle % 360) + 360) % 360; const back = a > 90 && a < 270;
      const cos = Math.abs(Math.cos(a * Math.PI / 180));
      imgEl.style.transform = 'perspective(1400px) rotateY(' + angle + 'deg)' + (back ? ' scaleX(-1)' : '');
      imgEl.style.filter = 'drop-shadow(0 22px 26px rgba(11,42,111,.25)) brightness(' + (back ? 0.9 : 1) + ')';
      if (shadowEl) shadowEl.style.transform = 'scaleX(' + (0.55 + 0.45 * cos) + ')';
      box.setAttribute('aria-valuenow', Math.round(a));
    };
    const loop = (now) => {
      if (!dragging) {
        if (auto && now < autoUntil) angle += 2.2; else { auto = false; angle += vel; vel *= 0.94; }
      }
      apply();
      if (dragging || auto || Math.abs(vel) > 0.05) raf = requestAnimationFrame(loop); else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    box.addEventListener('pointerdown', (e) => { dragging = true; auto = false; lastX = e.clientX; vel = 0; box.setPointerCapture(e.pointerId); kick(); });
    box.addEventListener('pointermove', (e) => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; angle += dx * 0.7; vel = dx * 0.7; });
    const up = () => { dragging = false; kick(); };
    box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
    box.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') { angle -= 15; apply(); } if (e.key === 'ArrowRight') { angle += 15; apply(); } });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { auto = false; }
    kick();
    return { reset() { angle = 0; vel = 0; apply(); } };
  }


  /* ---------- ordering through WhatsApp / Telegram ---------- */
  const ICONS = {
    tiktok: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#000"/><path fill="#25F4EE" d="M10.3 10.4v-.8a5.6 5.6 0 0 0-.8 0 5.3 5.3 0 1 0 3.1 9.6 5.3 5.3 0 0 1-2.3-8.8z"/><path fill="#25F4EE" d="M10.4 18.7a2.4 2.4 0 0 0 2.4-2.3V5.3h2a3.9 3.9 0 0 1-.1-.8h-2.8v11.1a2.4 2.4 0 0 1-3.5 2 2.4 2.4 0 0 0 2 1.1zM18.4 9.2V8.4a3.9 3.9 0 0 1-2.2-.6 4 4 0 0 0 2.2 1.4z"/><path fill="#FE2C55" d="M16.2 7.8a4 4 0 0 1-1-2.5h-.7a4 4 0 0 0 1.7 2.5zM9.5 13.2a2.4 2.4 0 0 0-1.1 4.5 2.4 2.4 0 0 1 2-3.8 2.6 2.6 0 0 1 .7.1v-2.8a5.6 5.6 0 0 0-.7 0h-.1v2.1a2.4 2.4 0 0 0-.8-.1z"/><path fill="#FE2C55" d="M18.4 9.2v2.1a6.8 6.8 0 0 1-4-1.3v5.8a5.3 5.3 0 0 1-8.3 4.3 5.3 5.3 0 0 0 9.2-3.6V10.7a6.8 6.8 0 0 0 4 1.3V9.3a4 4 0 0 1-.9-.1z"/><path fill="#fff" d="M14.4 15.8V10a6.8 6.8 0 0 0 4 1.3V9.2a4 4 0 0 1-2.2-1.4 4 4 0 0 1-1.7-2.5h-2v11.1a2.4 2.4 0 0 1-4.4 1.3 2.4 2.4 0 0 1 1.1-4.5 2.4 2.4 0 0 1 .8.1v-2.1a5.3 5.3 0 0 0-3.7 9 5.3 5.3 0 0 0 8.1-4.4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><defs><radialGradient id="pmIg" cx="30%" cy="107%" r="150%"><stop offset="0" stop-color="#fdf497"/><stop offset=".05" stop-color="#fdf497"/><stop offset=".45" stop-color="#fd5949"/><stop offset=".6" stop-color="#d6249f"/><stop offset=".9" stop-color="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="6.5" fill="url(#pmIg)"/><rect x="5" y="5" width="14" height="14" rx="4.2" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16.4" cy="7.6" r="1.1" fill="#fff"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="#25D366" d="M12 .5A11.4 11.4 0 0 0 2.2 17.8L.6 23.5l5.9-1.5A11.4 11.4 0 1 0 12 .5z"/><path fill="#fff" d="M12 2.4a9.5 9.5 0 0 0-8.1 14.5l.2.4-1 3.6 3.7-1 .4.2A9.5 9.5 0 1 0 12 2.4z"/><path fill="#25D366" d="M12 3.3a8.6 8.6 0 0 0-7.3 13.2l.2.3-.8 3 3-.8.3.2A8.6 8.6 0 1 0 12 3.3z"/><path fill="#fff" d="M17.3 14.5c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#229ED9"/><path fill="#fff" d="M5.4 11.8 17 7.3c.5-.2 1 .1.8.9l-2 9.3c-.1.7-.5.8-1.1.5l-3-2.2-1.5 1.4c-.2.2-.3.3-.6.3l.2-3.1 5.6-5c.2-.2 0-.3-.4-.1l-6.9 4.3-3-.9c-.6-.2-.6-.7.3-1z"/></svg>'
  };
  const LABELS = {
    en: { order: 'New order', machine: 'Machine', qty: 'Quantity', color: 'Body color', details: 'Details', name: 'Name', contact: 'Phone or email', country: 'Country', city: 'City', address: 'Address', note: 'Message', sub: 'Machines', ship: 'Shipping', install: 'Installation', total: 'Total', photo: 'Photo', rent: 'Rental', std: 'Standard', phone: 'Phone / WhatsApp', email: 'Email', pref: 'Preferred contact', count: 'Machines in total', units: 'pcs', each: 'each', confirm: 'Please contact me to confirm the order.', customer: 'Customer', delivery: 'Delivery', items: 'Order', pWa: 'WhatsApp', pTg: 'Telegram', pCall: 'Phone call', pMail: 'Email' },
    fa: { order: 'سفارش جدید', machine: 'دستگاه', qty: 'تعداد', color: 'رنگ بدنه', details: 'جزئیات', name: 'نام', contact: 'تلفن یا ایمیل', country: 'کشور', city: 'شهر', address: 'آدرس', note: 'پیام', sub: 'دستگاه‌ها', ship: 'ارسال', install: 'نصب', total: 'مجموع', photo: 'عکس', rent: 'کرایه', std: 'استاندارد', phone: 'تلفن / واتس‌اپ', email: 'ایمیل', pref: 'راه تماس ترجیحی', count: 'تعداد کل دستگاه‌ها', units: 'عدد', each: 'هر عدد', confirm: 'لطفاً برای تأیید سفارش با من تماس بگیرید.', customer: 'مشتری', delivery: 'ارسال', items: 'سفارش', pWa: 'واتس‌اپ', pTg: 'تلگرام', pCall: 'تماس تلفنی', pMail: 'ایمیل' },
    uz: { order: 'Yangi buyurtma', machine: 'Avtomat', qty: 'Soni', color: 'Korpus rangi', details: 'Tafsilotlar', name: 'Ism', contact: 'Telefon yoki email', country: 'Mamlakat', city: 'Shahar', address: 'Manzil', note: 'Xabar', sub: 'Avtomatlar', ship: 'Yetkazish', install: 'O‘rnatish', total: 'Jami', photo: 'Rasm', rent: 'Ijara', std: 'Standart', phone: 'Telefon / WhatsApp', email: 'Email', pref: 'Qulay aloqa usuli', count: 'Jami avtomatlar', units: 'dona', each: 'donasi', confirm: 'Buyurtmani tasdiqlash uchun men bilan bog‘laning.', customer: 'Mijoz', delivery: 'Yetkazish', items: 'Buyurtma', pWa: 'WhatsApp', pTg: 'Telegram', pCall: 'Telefon qo‘ng‘irog‘i', pMail: 'Email' },
    ru: { order: 'Новый заказ', machine: 'Автомат', qty: 'Количество', color: 'Цвет корпуса', details: 'Детали', name: 'Имя', contact: 'Телефон или эл. почта', country: 'Страна', city: 'Город', address: 'Адрес', note: 'Сообщение', sub: 'Автоматы', ship: 'Доставка', install: 'Установка', total: 'Итого', photo: 'Фото', rent: 'Аренда', std: 'Стандарт', phone: 'Телефон / WhatsApp', email: 'Эл. почта', pref: 'Удобный способ связи', count: 'Всего автоматов', units: 'шт.', each: 'за шт.', confirm: 'Пожалуйста, свяжитесь со мной для подтверждения заказа.', customer: 'Клиент', delivery: 'Доставка', items: 'Заказ', pWa: 'WhatsApp', pTg: 'Telegram', pCall: 'Звонок', pMail: 'Эл. почта' }
  };
  // Builds the order form text that is sent to the company chat.
  function orderMessage(o, lang) {
    const L = LABELS[lang] || LABELS.en, tr = (s) => translateText(s, lang);
    const prefName = { wa: L.pWa, tg: L.pTg, call: L.pCall, mail: L.pMail }[o.pref] || '';
    const count = o.items.reduce((a, it) => a + (+it.qty || 0), 0);
    const lines = ['🛒 PLAYMAX — ' + L.order + ' ' + o.id, '', '👤 ' + L.customer];
    lines.push(L.name + ': ' + o.name);
    if (o.phone) lines.push('📞 ' + L.phone + ': ' + o.phone);
    if (o.email) lines.push('✉️ ' + L.email + ': ' + o.email);
    if (!o.phone && !o.email && o.contact) lines.push(L.contact + ': ' + o.contact);
    if (prefName) lines.push('💬 ' + L.pref + ': ' + prefName);
    lines.push('', '📍 ' + L.delivery, L.country + ': ' + tr(o.country), L.city + ': ' + o.city);
    if (o.addr) lines.push(L.address + ': ' + o.addr);
    lines.push('', '📦 ' + L.items);
    o.items.forEach((it, i) => {
      lines.push((i + 1) + '. ' + it.model + ' — ' + tr(it.name) + (it.rent ? ' (' + L.rent + ')' : ''));
      lines.push('   ' + L.qty + ': ' + it.qty + ' ' + L.units + ' × ' + money(it.price) + ' = ' + money(it.qty * it.price));
      if (it.color) lines.push('   ' + L.color + ': ' + it.color);
      if (it.note) lines.push('   ' + L.details + ': ' + it.note);
      if (it.photo) lines.push('   🖼 ' + L.photo + ': ' + it.photo);
    });
    lines.push('', L.count + ': ' + count + ' ' + L.units, L.sub + ': ' + money(o.sub), L.ship + ' (' + tr(o.country) + '): ' + money(o.ship));
    if (o.inst) lines.push(L.install + ': ' + money(o.inst));
    lines.push('💰 ' + L.total + ': ' + money(o.total));
    if (o.msg) lines.push('', '📝 ' + L.note + ': ' + o.msg);
    lines.push('', L.confirm);
    return lines.join('\n');
  }

  const waLink = (text) => CONTACT.whatsapp + '?text=' + encodeURIComponent(text);
  const tgLink = () => CONTACT.telegram;
  function copyText(text) {
    try { if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text); } catch (e) { /* fall back */ }
    return new Promise((res) => { const t = document.createElement('textarea'); t.value = text; t.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) { /* ignore */ } t.remove(); res(); });
  }

  /* ---------- marketplace: posts by customers who sell machines ---------- */
  // Prototype storage: posts are kept in this browser. Replace load/save with a server to share them with everyone.
  const market = {
    list() { return store.get('market', []); },
    add(post) { const all = market.list(); all.unshift(post); return market.save(all); },
    remove(id) { return market.save(market.list().filter((x) => x.id !== id)); },
    save(all) { try { localStorage.setItem('pmx:market', JSON.stringify(all)); return true; } catch (e) { return false; } }
  };
  // Shrinks a photo so several fit in storage and load fast.
  function compressImage(file, max = 900, q = 0.72) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onerror = rej;
      r.onload = () => { const img = new Image(); img.onerror = rej; img.onload = () => {
        const s = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL('image/jpeg', q)); }; img.src = r.result; };
      r.readAsDataURL(file);
    });
  }
  // Contact links for a marketplace post.
  function sellerLinks(c) {
    const digits = (v) => String(v || '').replace(/[^\d+]/g, '');
    const out = [];
    if (c.whatsapp) out.push(['whatsapp', 'https://wa.me/' + digits(c.whatsapp).replace(/^\+/, '')]);
    if (c.telegram) { const v = String(c.telegram).trim(); out.push(['telegram', /^[+\d][\d\s-]*$/.test(v) ? 'https://t.me/' + (digits(v).startsWith('+') ? digits(v) : '+' + digits(v)) : 'https://t.me/' + v.replace(/^@/, '').replace(/^https?:\/\/t\.me\//, '')]); }
    if (c.phone) out.push(['phone', 'tel:' + digits(c.phone)]);
    if (c.instagram) out.push(['instagram', /^https?:/.test(c.instagram) ? c.instagram : 'https://www.instagram.com/' + String(c.instagram).replace(/^@/, '')]);
    if (c.other && /^https?:\/\//.test(c.other)) out.push(['link', c.other]);
    return out;
  }

  /* ---------- AI engine (keyword-driven demo) ---------- */
  const CITY = { kabul: 'Afghanistan', herat: 'Afghanistan', mazar: 'Afghanistan', kandahar: 'Afghanistan', jalalabad: 'Afghanistan', 'کابل': 'Afghanistan', 'هرات': 'Afghanistan', 'مزار': 'Afghanistan', 'افغانستان': 'Afghanistan', tashkent: 'Uzbekistan', toshkent: 'Uzbekistan', samarkand: 'Uzbekistan', samarqand: 'Uzbekistan', bukhara: 'Uzbekistan', 'ташкент': 'Uzbekistan', dushanbe: 'Tajikistan', bishkek: 'Kyrgyzstan', almaty: 'Kazakhstan', astana: 'Kazakhstan', ashgabat: 'Turkmenistan', tehran: 'Iran', mashhad: 'Iran', karachi: 'Pakistan', lahore: 'Pakistan', islamabad: 'Pakistan', moscow: 'Russia', 'москва': 'Russia', istanbul: 'Türkiye', ankara: 'Türkiye', dubai: 'UAE & Gulf', doha: 'UAE & Gulf', riyadh: 'UAE & Gulf', berlin: 'Europe', london: 'Europe', paris: 'Europe' };
  const KW = {
    boxing: ['box', 'punch', 'бокс', 'boks', 'بوکس', 'مشت'], arcade: ['claw', 'prize', 'toy', 'приз', 'kran', 'جایزه', 'عروسک'],
    playground: ['kid', 'child', 'playground', 'дет', 'bola', 'کودک', 'اطفال', 'slide'], vr: ['vr', 'virtual', 'вирту', 'مجازی'],
    tablegames: ['hockey', 'table', 'football', 'foosball', 'хоккей', 'стол', 'xokkey', 'هاکی', 'میز'], vending: ['vending', 'drink', 'snack', 'вендинг', 'نوشیدنی'],
    rides: ['ride', 'carousel', 'bungee', 'trampoline', 'карусел', 'batut', 'چرخ'], massage: ['massage', 'chair', 'массаж', 'massaj', 'ماساژ'],
    archery: ['archery', 'laser', 'shoot', 'стрел', 'تیر'], inflatable: ['inflatable', 'bumper', 'castle', 'надув', 'بادی'], challenge: ['strength', 'hammer', 'reaction', 'hercules', 'сила', 'kuch', 'زور']
  };
  function aiAnswer(q, rates) {
    const s = q.toLowerCase();
    const has = (arr) => arr.some((w) => s.includes(w));
    const R = rates || RATES;
    let country = null;
    for (const r of R) if (s.includes(r.country.toLowerCase().split(' ')[0])) country = r.country;
    for (const c in CITY) if (s.includes(c)) country = CITY[c];
    if (country && has(['ship', 'deliver', 'send', 'cost', 'how much', 'price', 'доставк', 'yetkaz', 'ارسال', 'انتقال', 'هزینه', 'to '])) {
      const r = R.find((x) => x.country === country) || R[R.length - 1];
      return { text: 'Delivery to ' + country + ' starts from ' + money(r.rate) + ' per machine (initial rate).\nSeveral machines in one order share the truck, so each one costs less to ship. Installation and setup can be added at checkout.', cards: [] };
    }
    if (has(['profit', 'pay back', 'payback', 'earn', 'income', 'return', 'прибыл', 'окуп', 'foyda', 'سود', 'درآمد'])) {
      const nums = (s.match(/\d+(\.\d+)?/g) || []).map(Number);
      const players = nums.find((n) => n >= 5 && n <= 500) || 30; const price = nums.find((n) => n > 0 && n <= 5) || 1;
      const monthly = players * price * 30; const months = 900 / monthly;
      return { text: 'Example with BOX 01 (' + money(900) + '):\n• ' + players + ' players a day × $' + price + ' ≈ ' + money(monthly) + ' a month.\n• It pays for itself in about ' + (months < 1 ? Math.max(1, Math.round(months * 30)) + ' days' : (Math.round(months * 10) / 10) + ' months') + '.\nOpen the profit calculator to try your own rent and electricity costs.', cards: [1], action: 'calc' };
    }
    if (has(['pay', 'visa', 'cash', 'deposit', 'оплат', 'налич', 'to‘lov', 'tolov', 'naqd', 'پرداخت', 'نقد', 'ویزا'])) return { text: 'Payment depends on where the machine goes:\n• Same country as our warehouse — cash on delivery (or Visa if you prefer).\n• Shipping abroad — pay online by Visa: the full price, or a 50% deposit now and the other half on delivery.\nThe checkout picks the right options automatically from your country.', cards: [] };
    if (has(['3d', '360', 'rotate', 'angle', 'size', 'height', 'tall', 'размер', 'рост', 'o‘lcham', 'اندازه', 'قد'])) return { text: 'MANGU and UFC have a live 3D model: turn them around, zoom in, and switch on the 1.75 m person and the measurements — 221 cm high, 130 cm deep at the top, 80 cm wide, 100 kg.', cards: [32, 33] };
    if (has(['color', 'colour', 'цвет', 'rang', 'رنگ'])) return { text: 'Machine bodies come in five factory colors: white, black, blue, red and green. Only the body/frame is painted — the punch bag, metal plate, screen and stickers stay as they are.\nOpen the Color studio to compare.', cards: [32, 33, 1], action: 'studio' };
    if (has(['mall', 'center', 'centre', 'тц', 'markaz', 'مرکز', 'مال'])) return { text: 'For a mall corner of 30–40 m², start with a boxing machine plus a prize claw. Boxing pulls teens and adults, the claw pulls kids and families, and together they need about 4 m² and one socket each.', cards: [1, 10] };
    if (has(['cafe', 'café', 'restaurant', 'кафе', 'kafe', 'کافه', 'رستوران'])) return { text: 'Cafés do best with compact, social games: air hockey, table football or a prize claw near the entrance. Add a boxing machine if you have about 2 m² and a lively crowd.', cards: [17, 20, 10] };
    if (has(['park', 'outdoor', 'парк', 'پارک'])) return { text: 'For parks: a kids playground system, a carousel or bungee trampoline, plus a strength tester for adults. Ask me for sizes before you plan the space.', cards: [13, 27, 24] };
    if (has(['event', 'wedding', 'rent', 'аренд', 'ijara', 'کرایه', 'محفل', 'عروسی'])) return { text: 'Yes, we rent machines for events. Pick a machine, the event date and the city at checkout and choose “Rent for an event”. Our team confirms availability and the price by phone.', cards: [1, 29] };
    if (has(['install', 'warranty', 'guarantee', 'монтаж', 'гарант', 'نصب', 'ضمانت'])) return { text: 'Our team delivers, installs and trains your staff. Warranty terms are confirmed by the PLAYMAX team. Spare parts and service are available after the sale.', cards: [] };
    for (const cat in KW) if (has(KW[cat])) {
      const list = PRODUCTS.filter((p) => p.cat === cat && p.visible).slice(0, 3);
      const c = CATS.find((x) => x.id === cat);
      return { text: 'Here are our ' + c.name.en.toLowerCase() + ' — ' + PRODUCTS.filter((p) => p.cat === cat).length + ' in the catalog. Prices start from ' + money(Math.min(...PRODUCTS.filter((p) => p.cat === cat).map((p) => p.price))) + '. Tap one to see every angle, the 360° view and sizes.', cards: list.map((p) => p.id), action: 'cat:' + cat };
    }
    if (has(['price', 'cost', 'cheap', 'how much', 'цена', 'narx', 'قیمت'])) return { text: 'Prices start at ' + money(700) + ' (air hockey, archery, bumper balls) and go up to ' + money(1500) + ' (massage chair). Boxing machines are ' + money(900) + '–' + money(1400) + '. All prices here are demo prices and are confirmed on order.', cards: [17, 1, 12] };
    if (has(['hello', 'hi', 'salam', 'salaam', 'привет', 'سلام', 'assalom'])) return { text: 'Salaam! Tell me about your space, budget or audience — I’ll suggest machines, estimate the profit and price the delivery.', cards: [] };
    return { text: 'I can help with machines, prices, delivery, profit and colors. Try: “Shipping to Kabul?”, “Best machine for a café?” or “Payback with 40 players a day?”', cards: [] };
  }

  /* ---------- Intro engine ---------- */
  const LETTERS = [
    { src: 'assets/L0.png', cx: 79, color: '#1F5BD8' }, { src: 'assets/L1.png', cx: 140, color: '#22B0F0' },
    { src: 'assets/L2.png', cx: 205, color: '#1F5BD8' }, { src: 'assets/L3.png', cx: 268, color: '#22B0F0' },
    { src: 'assets/L4.png', cx: 343, color: '#E8352B' }, { src: 'assets/L5.png', cx: 422, color: '#FF8A1F' },
    { src: 'assets/L6.png', cx: 497, color: '#FFC233' }
  ];
  function playIntro(root, opts) {
    opts = opts || {};
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.innerHTML = '';
    root.classList.add('pmx-intro');
    const W = () => root.clientWidth, H = () => root.clientHeight;
    const grid = document.createElement('div'); grid.className = 'pmx-grid'; root.appendChild(grid);
    const products = document.createElement('div'); products.className = 'pmx-products';
    [['assets/c/mangu-front-red.webp','BOXING'],['assets/p10.webp','PRIZE CLAW'],['assets/p29.webp','VR EXPERIENCE']].forEach(([src,label])=>{const item=document.createElement('figure');item.className='pmx-product';const im=document.createElement('img');im.src=src;im.alt='';const cap=document.createElement('figcaption');cap.textContent=label;item.append(im,cap);products.appendChild(item);});
    const canvas = document.createElement('canvas'); canvas.className = 'pmx-canvas'; root.insertBefore(products, canvas); root.appendChild(canvas);
    const cam = document.createElement('div'); cam.className = 'pmx-cam'; root.appendChild(cam);
    const layer = document.createElement('div'); layer.className = 'pmx-layer'; cam.appendChild(layer);
    const ring = new Image(); ring.src = 'assets/ring.png'; ring.className = 'pmx-ring'; ring.alt = ''; layer.appendChild(ring);
    const cal = new Image(); cal.src = 'assets/cal.png'; cal.className = 'pmx-cal'; cal.alt = ''; layer.appendChild(cal);
    const glint = document.createElement('div'); glint.className = 'pmx-glint'; layer.appendChild(glint);
    const letters = LETTERS.map((L, i) => { const im = new Image(); im.src = L.src; im.alt = ''; im.className = 'pmx-letter'; layer.appendChild(im); return Object.assign({ el: im, i }, L); });
    const tag = document.createElement('div'); tag.className = 'pmx-tag'; tag.innerHTML = (opts.tagline || 'PLAY YOUR WAY').split('').map((ch, i) => '<span style="animation-delay:' + (3.15 + i * 0.04).toFixed(2) + 's">' + (ch === ' ' ? '&nbsp;' : ch) + '</span>').join(''); root.appendChild(tag);
    const wipe = document.createElement('div'); wipe.className = 'pmx-wipe'; wipe.innerHTML = '<i></i><i></i><i></i><i></i><i></i>'; root.appendChild(wipe);
    root.setAttribute('role', 'img'); root.setAttribute('aria-label', 'PLAYMAX logo assembling');

    const ctx = canvas.getContext('2d');
    let S = 1, ox = 0, oy = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
    function layout() {
      const w = W(), h = H(); canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      S = Math.min(w * 0.86 / 580, h * 0.6 / 568); ox = (w - 580 * S) / 2; oy = h * 0.44 - 284 * S;
      layer.style.transform = 'translate(' + ox + 'px,' + oy + 'px) scale(' + S + ')';
    }
    layout(); const ro = new ResizeObserver(layout); ro.observe(root);

    const parts = []; const waves = [];
    const rnd = (a, b) => a + Math.random() * (b - a);
    const start = performance.now();
    const T0 = 0.75, STEP = 0.2, FALL = 0.62;
    letters.forEach((L, i) => {
      L.t0 = T0 + i * STEP; L.land = L.t0 + FALL; L.x0 = rnd(-160, 160) + (L.cx - 290) * 0.6; L.r0 = rnd(-55, 55); L.landed = false; L.hist = [];
      L.el.style.opacity = '0';
    });
    let shakeT = -1, shakeAmp = 0, done = false, finished = false;
    function stagePt(cx, cy) { return [ox + cx * S, oy + cy * S]; }
    function emitImpact(L) {
      const [x, y] = stagePt(L.cx, 300);
      waves.push({ x, y: y - 46 * S, r: 10, a: 1, c: L.color });
      for (let k = 0; k < 26; k++) parts.push({ x: x + rnd(-30, 30) * S, y, vx: rnd(-5, 5), vy: rnd(-7, -1.5), g: 0.32, life: 1, decay: rnd(0.015, 0.03), s: rnd(2, 6), c: k % 3 ? L.color : '#FFFFFF', sq: Math.random() > 0.5 });
      shakeT = performance.now(); shakeAmp = 7;
    }
    function emitFinale() {
      const cols = ['#1F5BD8', '#22B0F0', '#E8352B', '#FF4F8B', '#FFC233', '#FF8A1F'];
      const [x, y] = stagePt(290, 254);
      for (let k = 0; k < 140; k++) { const a = rnd(0, Math.PI * 2), v = rnd(4, 15); parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, g: 0.22, life: 1, decay: rnd(0.006, 0.013), s: rnd(4, 10), c: cols[k % 6], sq: true, rot: rnd(0, 6), vr: rnd(-0.3, 0.3) }); }
      waves.push({ x, y, r: 40, a: 1, c: '#FFC233', big: true });
      shakeT = performance.now(); shakeAmp = 12;
    }
    const easeIn = (t) => t * t * t;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    function frame(now) {
      if (finished) return;
      const t = (now - start) / 1000;
      const w = W(), h = H();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      // light pillars marking the landing spots
      letters.forEach((L) => {
        const a0 = L.t0 - 0.45, a1 = L.land + 0.2;
        if (t > a0 && t < a1) {
          const p = Math.min(1, (t - a0) / 0.3) * (t > L.land ? Math.max(0, 1 - (t - L.land) / 0.2) : 1);
          const [x] = stagePt(L.cx, 0); const g = ctx.createLinearGradient(0, 0, 0, oy + 300 * S);
          g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, L.color + '55');
          ctx.globalAlpha = p; ctx.fillStyle = g; ctx.fillRect(x - 34 * S, 0, 68 * S, oy + 300 * S); ctx.globalAlpha = 1;
        }
      });
      // letters
      letters.forEach((L) => {
        if (t < L.t0) return;
        const p = Math.min(1, (t - L.t0) / FALL);
        let dy, rot, sx = 1, sy = 1, dx;
        if (p < 1) { const e = easeIn(p); dy = -(oy / S + 360) * (1 - e); dx = L.x0 * (1 - easeOut(p)); rot = L.r0 * (1 - e); }
        else {
          const q = (t - L.land);
          dx = 0; rot = 0; dy = 0;
          if (q < 0.42) { const k = q / 0.42; const bounce = Math.sin(k * Math.PI) * 26 * (1 - k); dy = -bounce; sy = 1 - 0.22 * Math.exp(-q * 14); sx = 1 + 0.16 * Math.exp(-q * 14); }
          if (!L.landed) { L.landed = true; emitImpact(L); }
        }
        L.el.style.opacity = '1';
        L.el.style.transformOrigin = L.cx + 'px 307px';
        L.el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + rot + 'deg) scale(' + sx + ',' + sy + ')';
        L.el.style.filter = p < 1 ? 'blur(' + (3 * (1 - p)).toFixed(1) + 'px)' : 'none';
        // trail
        const [x, y] = stagePt(L.cx + dx, 254 + dy);
        L.hist.push([x, y]); if (L.hist.length > 9) L.hist.shift();
        if (p < 1 && L.hist.length > 2) {
          const [x0, y0] = L.hist[0]; const g = ctx.createLinearGradient(x0, y0, x, y);
          g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, L.color + 'AA');
          ctx.strokeStyle = g; ctx.lineCap = 'round'; ctx.lineWidth = 46 * S; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke();
        }
      });
      // waves and particles
      for (let i = waves.length - 1; i >= 0; i--) {
        const wv = waves[i]; wv.r += wv.big ? 16 : 7; wv.a -= wv.big ? 0.02 : 0.035; if (wv.a <= 0) { waves.splice(i, 1); continue; }
        ctx.globalAlpha = wv.a; ctx.strokeStyle = wv.c; ctx.lineWidth = wv.big ? 10 : 5; ctx.beginPath(); ctx.ellipse(wv.x, wv.y, wv.r, wv.r * (wv.big ? 1 : 0.35), 0, 0, Math.PI * 2); ctx.stroke();
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= 0.985; p.life -= p.decay; if (p.rot != null) p.rot += p.vr;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.c;
        if (p.sq) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot || 0); ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); }
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.s / 2, 0, Math.PI * 2); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
      // camera shake
      if (shakeT > 0) { const k = (now - shakeT) / 1000; const amp = shakeAmp * Math.exp(-k * 9); cam.style.transform = amp > 0.2 ? 'translate(' + rnd(-amp, amp) + 'px,' + rnd(-amp, amp) + 'px)' : 'none'; }
      const allLanded = letters.every((L) => L.landed);
      if (allLanded && !done && t > letters[6].land + 0.12) { done = true; emitFinale(); root.classList.add('pmx-assembled'); }
      if (t > 3.35 && !root.classList.contains('pmx-products-reveal')) root.classList.add('pmx-products-reveal');
      if (t > 8.45 && !root.classList.contains('pmx-exit')) { root.classList.add('pmx-exit'); }
      if (t > 9.45 &&!root.classList.contains('pmx-reveal')) { root.classList.add('pmx-reveal'); if (opts.onReveal) opts.onReveal(); }
      if (t > 10) { finish(); return; }
      requestAnimationFrame(frame);
    }
    function finish() {
      if (finished) return; finished = true; ro.disconnect();
      if (opts.onDone) opts.onDone();
    }
    if (reduce) {
      letters.forEach((L) => { L.el.style.opacity = '1'; }); root.classList.add('pmx-assembled', 'pmx-static', 'pmx-products-reveal');
      setTimeout(finish, 1200);
    } else requestAnimationFrame(frame);
    return { skip: finish };
  }

  const INTRO_CSS = `
.pmx-intro{position:absolute;inset:0;overflow:hidden;background:radial-gradient(70% 60% at 50% 40%,#FFFFFF 0%,#FFF6E8 60%,#FFEFD6 100%);z-index:100}
.pmx-intro::before{content:"";position:absolute;inset:-20%;background:radial-gradient(30% 30% at 18% 22%,rgba(34,176,240,.28),transparent 70%),radial-gradient(28% 28% at 82% 26%,rgba(255,79,139,.24),transparent 70%),radial-gradient(40% 30% at 50% 92%,rgba(255,194,51,.4),transparent 70%);animation:pmx-drift 9s ease-in-out infinite alternate}
.pmx-grid{position:absolute;left:-50%;right:-50%;bottom:-8%;height:52%;background-image:linear-gradient(rgba(31,91,216,.32) 2px,transparent 2px),linear-gradient(90deg,rgba(31,91,216,.32) 2px,transparent 2px);background-size:72px 72px;transform:perspective(460px) rotateX(66deg);transform-origin:50% 0;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 40%);mask-image:linear-gradient(to bottom,transparent,#000 40%);animation:pmx-grid .9s linear infinite}
.pmx-products{position:absolute;z-index:1;inset-inline:0;bottom:13%;height:42%;display:flex;justify-content:space-between;align-items:flex-end;padding-inline:clamp(10px,7vw,100px);pointer-events:none}
.pmx-product{width:28%;height:100%;margin:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;opacity:0;transform:translateY(36px) scale(.92);filter:drop-shadow(0 20px 26px rgba(11,42,111,.23));transition:opacity .8s ease,transform 1s cubic-bezier(.22,1,.36,1)}
.pmx-product img{display:block;width:100%;height:calc(100% - 22px);object-fit:contain}
.pmx-product figcaption{font:800 10px/1.2 var(--body,system-ui);letter-spacing:.16em;color:#0B2A6F;margin-top:6px}
.pmx-product:nth-child(2){transition-delay:.12s}.pmx-product:nth-child(3){transition-delay:.24s}
.pmx-products-reveal .pmx-product{opacity:1;transform:translateY(0) scale(1)}
.pmx-canvas{position:absolute;inset:0;z-index:2;pointer-events:none}
.pmx-cam{position:absolute;inset:0;z-index:3;will-change:transform}
.pmx-layer{position:absolute;left:0;top:0;width:580px;height:568px;transform-origin:0 0}
.pmx-letter,.pmx-ring,.pmx-cal{position:absolute;left:0;top:0;width:580px;height:568px;max-width:none;will-change:transform}
.pmx-ring{opacity:0;transform:scale(.3) rotate(-200deg)}
.pmx-cal{clip-path:inset(0 0 0 100%)}
.pmx-glint{position:absolute;left:0;top:0;width:580px;height:568px;border-radius:50%;overflow:hidden;pointer-events:none;mix-blend-mode:overlay}
.pmx-glint::after{content:"";position:absolute;top:-20%;bottom:-20%;left:-45%;width:36%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.95),transparent);transform:skewX(-18deg)}
.pmx-assembled .pmx-ring{animation:pmx-ring 1.1s cubic-bezier(.34,1.56,.64,1) .05s both}
.pmx-assembled .pmx-cal{animation:pmx-write .9s cubic-bezier(.65,0,.35,1) .45s both}
.pmx-assembled .pmx-glint::after{animation:pmx-glint 1s ease-in-out .9s both}
.pmx-tag{position:absolute;z-index:4;left:0;right:0;bottom:5%;text-align:center;font:800 clamp(15px,2.2vw,24px)/1 'Unbounded',system-ui,sans-serif;letter-spacing:.42em;color:#0B2A6F}
.pmx-tag span{display:inline-block;opacity:0;transform:translateY(14px);animation:pmx-up .5s cubic-bezier(.22,1,.36,1) both}
.pmx-wipe{position:absolute;z-index:8;inset:0;pointer-events:none;display:flex}
.pmx-wipe i{flex:1;transform:translateY(-102%)}
.pmx-wipe i:nth-child(1){background:#1F5BD8}.pmx-wipe i:nth-child(2){background:#22B0F0}.pmx-wipe i:nth-child(3){background:#E8352B}.pmx-wipe i:nth-child(4){background:#FF8A1F}.pmx-wipe i:nth-child(5){background:#FFC233}
.pmx-exit .pmx-wipe i{animation:pmx-wipe 1.2s cubic-bezier(.76,0,.24,1) both}
.pmx-exit .pmx-wipe i:nth-child(2){animation-delay:.04s}.pmx-exit .pmx-wipe i:nth-child(3){animation-delay:.08s}.pmx-exit .pmx-wipe i:nth-child(4){animation-delay:.12s}.pmx-exit .pmx-wipe i:nth-child(5){animation-delay:.16s}
.pmx-reveal{background:transparent!important}.pmx-reveal::before,.pmx-reveal>*:not(.pmx-wipe){visibility:hidden}
.pmx-static .pmx-ring{opacity:1;transform:none;animation:none}.pmx-static .pmx-cal{clip-path:none;animation:none}.pmx-static .pmx-tag span{opacity:1;transform:none;animation:none}
@keyframes pmx-ring{to{opacity:1;transform:none}}
@keyframes pmx-write{to{clip-path:inset(0 0 0 0)}}
@keyframes pmx-glint{to{left:120%}}
@keyframes pmx-up{to{opacity:1;transform:none}}
@keyframes pmx-grid{to{background-position:0 72px}}
@keyframes pmx-drift{to{transform:translate(2%,-3%) scale(1.05)}}
@keyframes pmx-wipe{0%{transform:translateY(-102%)}40%,62%{transform:translateY(0)}100%{transform:translateY(102%)}}
@media(max-width:600px){.pmx-products{height:34%;bottom:16%;padding-inline:5px}.pmx-product{width:32%}.pmx-product figcaption{font-size:8px;letter-spacing:.09em}.pmx-tag{font-size:clamp(10px,3vw,16px);letter-spacing:.22em}}
`;



  // ---------- Firebase (Firestore REST) ----------
  // Same surface as the artifact db used by the marketplace: doc(path).get/set/delete/onSnapshot, collection(path).onSnapshot.
  // Customers get an anonymous account; the owner signs in with email/password in the Admin app.
  const FIREBASE = { apiKey: '', projectId: '' };
  const fsEnc = (v) => {
    if (v === null || v === undefined) return { nullValue: null };
    if (typeof v === 'boolean') return { booleanValue: v };
    if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    if (typeof v === 'string') return { stringValue: v };
    if (Array.isArray(v)) return { arrayValue: { values: v.map(fsEnc) } };
    const fields = {}; Object.keys(v).forEach((k) => { if (v[k] !== undefined) fields[k] = fsEnc(v[k]); }); return { mapValue: { fields } };
  };
  const fsDec = (v) => {
    if (!v || typeof v !== 'object') return null;
    if ('stringValue' in v) return v.stringValue; if ('integerValue' in v) return Number(v.integerValue); if ('doubleValue' in v) return v.doubleValue;
    if ('booleanValue' in v) return v.booleanValue; if ('nullValue' in v) return null; if ('timestampValue' in v) return v.timestampValue;
    if ('arrayValue' in v) return (v.arrayValue.values || []).map(fsDec);
    if ('mapValue' in v) { const o = {}; const f = v.mapValue.fields || {}; Object.keys(f).forEach((k) => { o[k] = fsDec(f[k]); }); return o; }
    return null;
  };
  const fsFields = (fields) => fsDec({ mapValue: { fields: fields || {} } });
  function firebaseAuth(cfg, storeKey) {
    const key = 'fb.' + (storeKey || 'anon') + '.' + cfg.projectId;
    let sess = store.get(key, null);
    const save = (x) => { sess = x; store.set(key, x); };
    const idt = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    const post = (url, body) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then((r) => r.json().then((j) => { if (!r.ok) { const e = new Error((j.error && j.error.message) || 'auth'); e.code = (j.error && j.error.message) || 'auth'; throw e; } return j; }));
    const keep = (j) => save({ uid: j.localId || j.user_id, idToken: j.idToken || j.id_token, refresh: j.refreshToken || j.refresh_token, exp: Date.now() + ((+j.expiresIn || +j.expires_in || 3600) - 120) * 1000, email: j.email || (sess && sess.email) || '' });
    return {
      get uid() { return sess && sess.uid; }, get email() { return sess && sess.email; }, signedIn: () => !!(sess && sess.refresh),
      async token(anon) {
        if (sess && sess.idToken && Date.now() < sess.exp) return sess.idToken;
        if (sess && sess.refresh) {
          const r = await fetch('https://securetoken.googleapis.com/v1/token?key=' + encodeURIComponent(cfg.apiKey), { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(sess.refresh) });
          const j = await r.json(); if (r.ok) { keep(j); return sess.idToken; } save(null);
        }
        if (!anon) return null;
        keep(await post(idt + 'signUp?key=' + encodeURIComponent(cfg.apiKey), { returnSecureToken: true })); return sess.idToken;
      },
      async signIn(email, password) { keep(await post(idt + 'signInWithPassword?key=' + encodeURIComponent(cfg.apiKey), { email, password, returnSecureToken: true })); return sess; },
      signOut() { save(null); }
    };
  }
  function firestoreDb(cfg, auth, opts) {
    const base = 'https://firestore.googleapis.com/v1/projects/' + encodeURIComponent(cfg.projectId) + '/databases/(default)/documents/';
    const anon = !(opts && opts.noAnon); const poll = (opts && opts.pollMs) || 20000; const active = (opts && opts.active) || (() => true);
    const subs = new Set();
    const call = async (method, path, body, needAuth) => {
      const h = { 'Content-Type': 'application/json' }; const t = await auth.token(anon && needAuth).catch(() => null); if (t) h.Authorization = 'Bearer ' + t;
      const r = await fetch(base + path, { method, headers: h, body: body ? JSON.stringify(body) : undefined, cache: 'no-store' });
      if (r.status === 404 && method === 'GET') return null;
      const j = r.status === 204 ? {} : await r.json().catch(() => ({}));
      if (!r.ok) { const e = { code: r.status === 403 || r.status === 401 ? 'invalid_argument' : r.status === 429 ? 'resource_exhausted' : 'unavailable', message: (j.error && j.error.message) || String(r.status) }; throw e; }
      return j;
    };
    const snapDoc = (id, data) => ({ id, exists: !!data, data: () => data || undefined, metadata: { fromCache: false, hasPendingWrites: false } });
    const refresh = () => subs.forEach((f) => f(true));
    const watch = (tick) => { const f = (force) => { if (force || (active() && (typeof document === 'undefined' || document.visibilityState !== 'hidden'))) tick(); }; subs.add(f); f(true); const t = setInterval(() => f(false), poll); return () => { subs.delete(f); clearInterval(t); }; };
    if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') subs.forEach((f) => f(false)); });
    const docRef = (path) => ({ id: path.split('/').pop(), path,
      get: async () => { const j = await call('GET', path); return snapDoc(path.split('/').pop(), j ? fsFields(j.fields) : null); },
      set: async (data) => { await call('PATCH', path, { fields: fsEnc(data).mapValue.fields }, true); refresh(); },
      update: async (data) => { await call('PATCH', path, { fields: fsEnc(data).mapValue.fields }, true); refresh(); },
      delete: async () => { await call('DELETE', path, null, true); refresh(); },
      onSnapshot(next, err) { let last = ''; return watch(() => call('GET', path).then((j) => { const d = j ? fsFields(j.fields) : null; const k = JSON.stringify(d); if (k !== last) { last = k; next(snapDoc(path.split('/').pop(), d)); } }).catch((e) => err && err(e))); },
      collection: (c) => collRef(path + '/' + c) });
    const collRef = (path) => ({ path, doc: (id) => docRef(path + '/' + (id || Date.now().toString(36) + Math.random().toString(36).slice(2, 8))),
      async list() { let out = [], tok = ''; for (let i = 0; i < 10; i++) { const j = await call('GET', path + '?pageSize=300' + (tok ? '&pageToken=' + encodeURIComponent(tok) : '')); (j && j.documents || []).forEach((d) => out.push(snapDoc(d.name.split('/').pop(), fsFields(d.fields)))); tok = j && j.nextPageToken; if (!tok) break; } return out; },
      onSnapshot(next, err) { let last = ''; const me = this; return watch(() => me.list().then((docs) => { const k = JSON.stringify(docs.map((d) => [d.id, d.data()])); if (k !== last) { last = k; next({ docs, size: docs.length, empty: !docs.length, docChanges: () => [], metadata: { fromCache: false, hasPendingWrites: false } }); } }).catch((e) => err && err(e))); } });
    return { doc: docRef, collection: collRef, refresh, auth };
  }

  // ---------- Live content ----------
  // The PLAYMAX Admin app publishes content.json next to index.html (website and app repos).
  // Both read it on every start and whenever they come back to the screen, so changes appear without a new version.
  CONTACT.tiktok = CONTACT.tiktok || 'https://www.tiktok.com/@playmax.uz.af';
  CONTACT.tiktokHandle = CONTACT.tiktokHandle || '@playmax.uz.af';
  const BASE_RATES = RATES.map((r) => ({ ...r }));
  const BASE_CONTACT = { ...CONTACT };
  const BASE_PRODUCTS = PRODUCTS.map((p) => ({ id: p.id, price: p.price, name: p.name, model: p.model, specs: p.specs.slice(), img: p.img, photo: p.photo, isNew: p.isNew, colors: p.colors, views: p.views }));
  const NEWS = [];

  // Offers strip on the home page (website + app). The Admin app replaces these with content.json "promos".
  const DEFAULT_PROMOS = [
    { id: 'vision', theme: 'blue', icon: '🎯', cta: 'store', title: { en: 'Our vision', fa: 'چشم‌انداز ما', uz: 'Bizning maqsadimiz', ru: 'Наше видение' }, text: { en: 'World-class arcade and family entertainment in every city of Central Asia — with fair prices, fast delivery and real service.', fa: 'سرگرمی آرکید و خانوادگی در سطح جهانی در هر شهر آسیای میانه؛ با قیمت منصفانه، ارسال سریع و خدمات واقعی.', uz: 'Markaziy Osiyoning har bir shahrida jahon darajasidagi arkada va oilaviy ko‘ngilochar o‘yinlar — adolatli narx, tez yetkazish va haqiqiy xizmat bilan.', ru: 'Аркадные и семейные развлечения мирового уровня в каждом городе Центральной Азии — с честными ценами, быстрой доставкой и настоящим сервисом.' }, button: { en: 'See the machines', fa: 'دیدن دستگاه‌ها', uz: 'Avtomatlarni ko‘rish', ru: 'Смотреть автоматы' } },
    { id: 'offers', theme: 'pink', icon: '🎁', cta: 'tiktok', ctas: ['tiktok', 'instagram'], title: { en: 'New offers are coming', fa: 'پیشنهادهای جدید در راه است', uz: 'Yangi takliflar tez orada', ru: 'Скоро новые предложения' }, text: { en: 'New machines and seasonal discounts are on the way. Follow us so you don’t miss them.', fa: 'دستگاه‌های جدید و تخفیف‌های فصلی در راه است. ما را دنبال کنید تا از دستشان ندهید.', uz: 'Yangi avtomatlar va mavsumiy chegirmalar yo‘lda. O‘tkazib yubormaslik uchun bizni kuzatib boring.', ru: 'Скоро новые автоматы и сезонные скидки. Подпишитесь, чтобы ничего не пропустить.' }, button: { en: 'Follow on TikTok', fa: 'دنبال کردن در تیک‌تاک', uz: 'TikTokda kuzatish', ru: 'Подписаться в TikTok' } },
    { id: 'wholesale', theme: 'navy', icon: '🏷️', cta: 'wa', ctas: ['wa', 'tg'], title: { en: 'We sell wholesale', fa: 'ما عمده می‌فروشیم', uz: 'Ulgurji sotamiz', ru: 'Продаём оптом' }, text: { en: 'Opening a game zone or buying several machines? Contact us now for wholesale prices.', fa: 'فضای بازی راه می‌اندازید یا چند دستگاه می‌خرید؟ همین حالا برای قیمت عمده با ما تماس بگیرید.', uz: 'O‘yin zonasi ochyapsizmi yoki bir nechta avtomat olyapsizmi? Ulgurji narxlar uchun hoziroq bog‘laning.', ru: 'Открываете игровую зону или берёте несколько автоматов? Свяжитесь с нами, чтобы узнать оптовые цены.' }, button: { en: 'WhatsApp', fa: 'واتس‌اپ', uz: 'WhatsApp', ru: 'WhatsApp' } },
    { id: 'reviews', theme: 'green', icon: '⭐', cta: 'wa', ctas: ['wa', 'tg'], title: { en: 'Customer reviews', fa: 'نظرات مشتریان', uz: 'Mijozlar fikri', ru: 'Отзывы клиентов' }, text: { en: 'Bought or rented from PLAYMAX? Send us your feedback — real customer reviews will appear here.', fa: 'از PLAYMAX خرید یا کرایه کرده‌اید؟ نظرتان را بفرستید؛ نظرات واقعی مشتریان اینجا نمایش داده می‌شود.', uz: 'PLAYMAXdan sotib oldingizmi yoki ijaraga oldingizmi? Fikringizni yuboring — mijozlarning haqiqiy fikrlari shu yerda chiqadi.', ru: 'Покупали или арендовали у PLAYMAX? Пришлите отзыв — здесь появятся настоящие отзывы клиентов.' }, button: { en: 'Send feedback', fa: 'ارسال نظر', uz: 'Fikr yuborish', ru: 'Оставить отзыв' } }
  ];
  const PROMOS = DEFAULT_PROMOS.slice();
  const HERO = { title: null, text: null };
  // Custom pages made in the Admin app (title, text, photos, buttons); shown in the menu when inMenu is set.
  const PAGES = [];
  function pageHtml(pg, lang, storeAttr) {
    if (!pg) return '';
    const gal = (pg.gallery || []).filter(Boolean);
    return '<article class="pm-page" data-no-translate>' + (pg.img ? '<img class="pm-cover" src="' + esc(pg.img) + '" alt="">' : '') +
      (pg.text ? '<p class="pm-ptext" dir="auto">' + esc(pickLang(pg.text, lang)) + '</p>' : '') +
      (gal.length ? '<div class="pm-gal">' + gal.map((u) => '<img src="' + esc(u) + '" alt="" loading="lazy">').join('') + '</div>' : '') +
      ctaHtml(pg, lang, storeAttr) + '</article>';
  }
  const pageTitle = (pg, lang) => (pg ? pickLang(pg.title, lang) : '');

  // Home page layout: section order/visibility + custom blocks (managed from the admin app).
  const HOME = { order: null, hidden: [], blocks: [] };
  const HOME_KEYS = ['hero', 'ticker', 'cats', 'news', 'promos', 'studio', 'delivery', 'maint'];
  const BLOCK_TYPES = ['text', 'image', 'imgtext', 'gallery', 'video', 'button', 'banner'];
  const BLOCK_THEMES = { white: ['#FFFFFF', '#0B2A6F'], sky: ['#E6F4FD', '#0B2A6F'], gold: ['#FFF4D5', '#5A3B00'], pink: ['#FFE8F0', '#6E1638'], green: ['#E5F7EC', '#0D4A2A'], navy: ['#0B2A6F', '#FFFFFF'], blue: ['linear-gradient(135deg,#22B0F0,#1F5BD8 70%)', '#FFFFFF'], sunset: ['linear-gradient(135deg,#FF4F8B,#FF8A1F)', '#FFFFFF'] };
  function homeArrange(sections, defOrder, platform) {
    const blocks = HOME.blocks.filter((b) => b.where === 'both' || b.where === platform);
    const out = []; const seen = new Set();
    const order = HOME.order && HOME.order.length ? HOME.order.slice() : defOrder.slice();
    defOrder.forEach((k) => { if (!order.includes(k)) order.push(k); });
    blocks.forEach((b) => { if (!order.includes(b.id)) order.push(b.id); });
    order.forEach((k) => {
      if (seen.has(k)) return; seen.add(k);
      if (HOME.hidden.includes(k)) return;
      if (Object.prototype.hasOwnProperty.call(sections, k)) { out.push(sections[k] || ''); return; }
      const b = blocks.find((x) => x.id === k); if (b) out.push(sections.__block ? sections.__block(b) : '');
    });
    return out.join('');
  }
  function blockHtml(b, lang, storeAttr, imgMap) {
    if (!b) return '';
    const im = (u) => esc(imgMap ? imgMap(u) : u);
    const th = BLOCK_THEMES[b.theme] || BLOCK_THEMES.white;
    const title = pickLang(b.title, lang), text = pickLang(b.text, lang);
    const head = (title ? '<h3 class="pmb-t" dir="auto">' + esc(title) + '</h3>' : '') + (text ? '<p class="pmb-x" dir="auto">' + esc(text) + '</p>' : '');
    const ctas = ctaHtml(b, lang, storeAttr);
    let inner = '';
    if (b.type === 'image') inner = (b.img ? '<img class="pmb-img" src="' + im(b.img) + '" alt="" loading="lazy">' : '') + (head || ctas ? '<div class="pmb-c">' + head + ctas + '</div>' : '');
    else if (b.type === 'imgtext') inner = '<div class="pmb-split' + (b.side === 'end' ? ' rev' : '') + '">' + (b.img ? '<img class="pmb-img" src="' + im(b.img) + '" alt="" loading="lazy">' : '') + '<div class="pmb-c">' + head + ctas + '</div></div>';
    else if (b.type === 'gallery') inner = (head ? '<div class="pmb-c">' + head + '</div>' : '') + ((b.gallery || []).length ? '<div class="pmb-gal">' + b.gallery.map((u) => '<img src="' + im(u) + '" alt="" loading="lazy">').join('') + '</div>' : '') + (ctas ? '<div class="pmb-c">' + ctas + '</div>' : '');
    else if (b.type === 'video') inner = videoEmbed(b.video) + (head || ctas ? '<div class="pmb-c">' + head + ctas + '</div>' : '');
    else inner = '<div class="pmb-c">' + head + ctas + '</div>';
    if (!inner.replace(/<[^>]+>/g, '').trim() && !/<(img|iframe|video)/.test(inner)) return '';
    return '<div class="pmb pmb-' + esc(b.type) + ' pmb-s-' + esc(b.size) + ' pmb-a-' + esc(b.align) + (th[1] === '#FFFFFF' ? ' pmb-dark' : '') + '" style="background:' + th[0] + ';color:' + th[1] + '" data-no-translate>' + inner + '</div>';
  }
  const BLOCK_CSS = '.pmb{box-sizing:border-box;width:100%;max-width:100%;margin-inline:auto;border-radius:24px;overflow:hidden;overflow-wrap:anywhere;word-break:break-word;box-shadow:0 1px 0 rgba(11,42,111,.06),0 12px 30px -16px rgba(11,42,111,.3)}.pmb *{box-sizing:border-box;max-width:100%}.pmb-s-s{max-width:520px}.pmb-s-m{max-width:780px}.pmb-s-l{max-width:1060px}.pmb-s-full{max-width:100%}.pmb-c{padding:22px 24px;display:flex;flex-direction:column;gap:10px;min-width:0}.pmb-a-center .pmb-c{text-align:center;align-items:center}.pmb-a-end .pmb-c{text-align:end;align-items:flex-end}.pmb-a-start .pmb-c{text-align:start;align-items:flex-start}.pmb-t{margin:0;font-size:clamp(20px,2.6vw,30px);line-height:1.2;font-weight:900;color:inherit}.pmb-x{margin:0;white-space:pre-line;font-weight:600;line-height:1.65;font-size:16px;opacity:.88}.pmb-img{display:block;width:100%;height:auto;max-height:520px;object-fit:contain;background:rgba(255,255,255,.35)}.pmb-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center}.pmb-split.rev .pmb-img{order:2}.pmb-split .pmb-img{height:100%;max-height:440px}.pmb-gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;padding:0 24px 22px}.pmb-gal img{width:100%;aspect-ratio:1;object-fit:contain;background:rgba(255,255,255,.55);border-radius:14px}.pmb .pm-vid{border-radius:0}.pmb-banner .pmb-c{padding:16px 22px;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:space-between}.pmb-banner.pmb-a-center .pmb-c{justify-content:center}.pmb-banner .pmb-t{font-size:clamp(17px,2vw,22px)}.pmb-banner .pmb-x{font-size:14px}.pmb .pm-ctas{display:flex;flex-wrap:wrap;gap:10px;width:auto;grid-template-columns:none}.pmb-a-center .pm-ctas{justify-content:center}.pmb-a-end .pm-ctas{justify-content:flex-end}.pmb .pm-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 18px;border-radius:14px;border:0;background:#0B2A6F;color:#fff;font-weight:800;font-size:15px;text-decoration:none;cursor:pointer;white-space:normal;text-align:center;box-shadow:0 4px 0 rgba(0,0,0,.18)}.pmb .pm-cta svg{flex:0 0 auto}.pmb-dark .pm-cta{background:#fff;color:#0B2A6F}.pmb-button .pmb-c{padding:26px 24px}@media (max-width:640px){.pmb{border-radius:20px}.pmb-split{grid-template-columns:1fr}.pmb-split.rev .pmb-img{order:0}.pmb-split .pmb-img{height:auto;max-height:340px}.pmb-img{max-height:380px}.pmb-c{padding:18px 18px}.pmb-gal{grid-template-columns:repeat(2,minmax(0,1fr));padding:0 18px 18px}.pmb-x{font-size:15px}.pmb-banner .pmb-c{flex-direction:column;align-items:flex-start}.pmb-banner.pmb-a-center .pmb-c{align-items:center}.pmb .pm-cta{flex:1 1 auto}}';
  const BLOCK_APP_CSS = '.pmb-pad{padding:16px 16px 0}.pmb-pad .pmb{border-radius:20px}.pmb-pad .pmb-split{grid-template-columns:1fr}.pmb-pad .pmb-split.rev .pmb-img{order:0}.pmb-pad .pmb-split .pmb-img{height:auto;max-height:300px}.pmb-pad .pmb-img{max-height:340px}.pmb-pad .pmb-c{padding:16px}.pmb-pad .pmb-gal{grid-template-columns:repeat(2,minmax(0,1fr));padding:0 16px 16px}.pmb-pad .pmb-t{font-size:20px}.pmb-pad .pmb-x{font-size:14px}.pmb-pad .pmb-banner .pmb-c{flex-direction:column;align-items:flex-start}.pmb-pad .pmb-banner.pmb-a-center .pmb-c{align-items:center}.pmb-pad .pm-cta{flex:1 1 auto;font-size:14px;min-height:42px}';
  // Maintenance video guides (managed from the admin app).
  const GUIDES = [];
  const GL = { steps: { en: 'Steps', fa: 'مراحل', uz: 'Qadamlar', ru: 'Шаги' }, all: { en: 'All machines', fa: 'همه دستگاه‌ها', uz: 'Barcha avtomatlar', ru: 'Все автоматы' }, general: { en: 'General', fa: 'عمومی', uz: 'Umumiy', ru: 'Общее' }, watch: { en: 'Watch the video', fa: 'تماشای ویدیو', uz: 'Videoni ko‘rish', ru: 'Смотреть видео' }, empty: { en: 'Video guides will appear here soon.', fa: 'راهنماهای ویدیویی به‌زودی اینجا نمایش داده می‌شوند.', uz: 'Video qo‘llanmalar tez orada shu yerda paydo bo‘ladi.', ru: 'Видеоинструкции скоро появятся здесь.' } };
  function videoEmbed(u, poster) {
    u = safeUrl(u); if (!u) return '';
    let m;
    if ((m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/i))) {
      const tall = /shorts\//i.test(u);
      return '<div class="pm-vid' + (tall ? ' tall' : '') + '"><iframe src="https://www.youtube-nocookie.com/embed/' + m[1] + '?rel=0" title="video" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    }
    if ((m = u.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/i))) return '<div class="pm-vid tall"><iframe src="https://www.tiktok.com/embed/v2/' + m[1] + '" title="video" loading="lazy" allow="encrypted-media; fullscreen" allowfullscreen></iframe></div>';
    if ((m = u.match(/instagram\.com\/(?:p|reel|reels|tv)\/([\w-]+)/i))) return '<div class="pm-vid tall"><iframe src="https://www.instagram.com/reel/' + m[1] + '/embed" title="video" loading="lazy" allowfullscreen></iframe></div>';
    if (/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(u)) return '<div class="pm-vid file"><video controls playsinline preload="metadata"' + (poster ? ' poster="' + esc(poster) + '"' : '') + ' src="' + esc(u) + '"></video></div>';
    return '';
  }
  let guideClickBound = false;
  function guidesHtml(lang) {
    const L = (k) => GL[k][lang] || GL[k].en;
    if (!guideClickBound && typeof document !== 'undefined') {
      guideClickBound = true;
      document.addEventListener('click', (e) => {
        const b = e.target.closest && e.target.closest('[data-gfilter]'); if (!b) return;
        const box = b.closest('.pm-guides'); if (!box) return; const f = b.dataset.gfilter;
        box.querySelectorAll('[data-gfilter]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        box.querySelectorAll('.pm-guide').forEach((g) => { g.style.display = f === 'all' || g.dataset.machine === f ? '' : 'none'; });
      });
    }
    if (!GUIDES.length) return '';
    const mName = (id) => { const p = id && PRODUCTS.find((x) => String(x.id) === String(id)); return p ? p.model : ''; };
    const ids = []; GUIDES.forEach((g) => { const k = g.machine && mName(g.machine) ? String(g.machine) : 'general'; if (!ids.includes(k)) ids.push(k); });
    const chips = ids.length > 1 ? '<div class="pm-gchips" role="group"><button type="button" data-gfilter="all" aria-pressed="true">' + esc(L('all')) + '</button>' + ids.map((k) => '<button type="button" data-gfilter="' + esc(k) + '" aria-pressed="false">' + esc(k === 'general' ? L('general') : mName(k)) + '</button>').join('') + '</div>' : '';
    const card = (g) => {
      const steps = String(pickLang(g.steps, lang) || '').split(/\n+/).map((s) => s.replace(/^\s*(\d+[.)\-]|[-•*])\s*/, '').trim()).filter(Boolean);
      const vid = videoEmbed(g.video, g.poster);
      const k = g.machine && mName(g.machine) ? String(g.machine) : 'general';
      return '<article class="pm-guide" data-machine="' + esc(k) + '" data-no-translate>' + (vid || (g.video ? '<a class="pm-cta pm-vlink" href="' + esc(g.video) + '" target="_blank" rel="noopener">▶ ' + esc(L('watch')) + '</a>' : '')) +
        '<div class="pm-gbody">' + (k !== 'general' ? '<span class="pm-gtag">' + esc(mName(k)) + '</span>' : '') + '<h3 dir="auto">' + esc(pickLang(g.title, lang)) + '</h3>' +
        (g.text ? '<p class="pm-gtext" dir="auto">' + esc(pickLang(g.text, lang)) + '</p>' : '') +
        (steps.length ? '<div class="pm-gsteps"><b>' + esc(L('steps')) + '</b><ol dir="auto">' + steps.map((s) => '<li>' + esc(s) + '</li>').join('') + '</ol></div>' : '') + '</div></article>';
    };
    return '<div class="pm-guides">' + chips + '<div class="pm-glist">' + GUIDES.map(card).join('') + '</div></div>';
  }
  const GUIDE_CSS = '.pm-guides{display:flex;flex-direction:column;gap:16px}.pm-gchips{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}.pm-gchips button{flex:0 0 auto;border:0;border-radius:999px;padding:9px 16px;font-family:inherit;font-weight:800;font-size:13px;line-height:1;background:#fff;color:#0B2A6F;box-shadow:0 0 0 1.5px rgba(11,42,111,.14) inset;cursor:pointer}.pm-gchips button[aria-pressed=true]{background:#0B2A6F;color:#fff;box-shadow:none}.pm-glist{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;align-items:start}.pm-guide{background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 1px 0 rgba(11,42,111,.06),0 10px 30px -14px rgba(11,42,111,.28);display:flex;flex-direction:column}.pm-vid{position:relative;width:100%;aspect-ratio:16/9;background:#0B1530}.pm-vid.tall{aspect-ratio:9/14;max-height:600px}.pm-vid iframe,.pm-vid video{position:absolute;inset:0;width:100%;height:100%;border:0;object-fit:contain;background:#0B1530}.pm-vlink{margin:16px 16px 0;align-self:flex-start;background:#0B2A6F;color:#fff}.pm-gbody{padding:16px 18px 20px;display:flex;flex-direction:column;gap:8px}.pm-gtag{align-self:flex-start;background:#E6F4FD;color:#1F5BD8;font-family:inherit;font-weight:800;font-size:11px;line-height:1;padding:6px 10px;border-radius:999px}.pm-guide h3{font-size:19px;line-height:1.25;margin:0}.pm-gtext{white-space:pre-line;font-weight:600;color:#45506B;line-height:1.6;margin:0}.pm-gsteps{background:#FFF8EC;border-radius:14px;padding:12px 14px}.pm-gsteps b{font-size:13px;color:#8A5A00}.pm-gsteps ol{margin:8px 0 0;padding-inline-start:22px;display:flex;flex-direction:column;gap:6px;font-weight:600;color:#1B2440;line-height:1.5}';

  const PROMO_THEMES = { blue: 'linear-gradient(135deg,#22B0F0,#1F5BD8 70%)', pink: 'linear-gradient(135deg,#FF4F8B,#FF8A1F)', navy: 'linear-gradient(155deg,#12347F,#0B2A6F 60%,#081D4E)', green: 'linear-gradient(135deg,#1E9E52,#22B0A0)', gold: 'linear-gradient(135deg,#FFC233,#FF8A1F)', red: 'linear-gradient(135deg,#E8352B,#FF4F8B)' };
  // Buttons for an offer card or a custom page: WhatsApp, Telegram, TikTok, Instagram, store or a link.
  function ctaHtml(p, lang, storeAttr) {
    const BTN = { store: [null, ''], wa: ['whatsapp', 'WhatsApp'], tg: ['telegram', 'Telegram'], tiktok: ['tiktok', 'TikTok'], instagram: ['instagram', 'Instagram'], link: [null, ''] };
    const one = (p, k, label) => {
      if (k === 'store') return '<button class="pm-cta" ' + storeAttr + '>' + label + ' <span class="pm-arr" aria-hidden="true">→</span></button>';
      const href = k === 'wa' ? CONTACT.whatsapp : k === 'tg' ? CONTACT.telegram : k === 'tiktok' ? CONTACT.tiktok : k === 'instagram' ? CONTACT.instagram : k === 'link' ? p.link : '';
      if (!href) return '';
      const ic = BTN[k] && BTN[k][0] ? ICONS[BTN[k][0]] : '';
      return '<a class="pm-cta" href="' + esc(href) + '" target="_blank" rel="noopener">' + ic + ' ' + label + '</a>'; };
    const build = () => { const list = (Array.isArray(p.ctas) && p.ctas.length ? p.ctas : [p.cta]).filter((k) => k && k !== 'none'); if (!list.length) return '';
      const custom = esc(pickLang(p.button, lang) || '');
      const html = list.map((k) => one(p, k, list.length === 1 && custom ? custom : esc((BTN[k] && BTN[k][1]) || custom || 'Open'))).join('');
      return '<div class="pm-ctas">' + html + '</div>'; };
    return build();
  }
  function promoHtml(lang, storeAttr) {
    if (!PROMOS.length) return '';
    const cta = (p) => ctaHtml(p, lang, storeAttr);
    const card = (p) => { const quote = pickLang(p.quote, lang);
      return '<article class="pm-card" style="background:' + (PROMO_THEMES[p.theme] || PROMO_THEMES.blue) + '" data-no-translate><div class="pm-body">' + (p.title ? '<h3 dir="auto">' + esc(pickLang(p.title, lang)) + '</h3>' : '') + (quote ? '<p class="pm-quote" dir="auto">“' + esc(quote) + '”</p>' + (p.author ? '<p class="pm-author" dir="auto">★★★★★ · ' + esc(p.author) + '</p>' : '') : '') + (p.text ? '<p class="pm-text" dir="auto">' + esc(pickLang(p.text, lang)) + '</p>' : '') + cta(p) + '</div><div class="pm-art">' + (p.img ? '<img src="' + esc(p.img) + '" alt="" loading="lazy">' : '<span class="pm-ic" aria-hidden="true">' + esc(p.icon || '✨') + '</span>') + '</div></article>'; };
    return '<div class="pm-promo" role="region" aria-label="Offers"><div class="pm-track">' + PROMOS.map(card).join('') + '</div>' + (PROMOS.length > 1 ? '<div class="pm-ctl"><button class="pm-arrow pm-prev" aria-label="Previous slide"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>' + PROMOS.map((p, i) => '<button class="pm-dot' + (i ? '' : ' on') + '" aria-label="Slide ' + (i + 1) + '"></button>').join('') + '<button class="pm-arrow pm-next" aria-label="Next slide"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button></div>' : '') + '</div>';
  }
  // Auto-moving carousel that people can also swipe, drag or step through.
  function carousel(wrap, ms) {
    const track = wrap && wrap.querySelector('.pm-track'); if (!track || track.__pmCarousel) return; track.__pmCarousel = true;
    const n = track.children.length; if (n < 2) return;
    const w = () => track.clientWidth || 1, rtl = () => getComputedStyle(track).direction === 'rtl', idx = () => Math.round(Math.abs(track.scrollLeft) / w());
    let hold = 0; const pause = () => { hold = Date.now() + 9000; };
    const goTo = (i) => { i = (i + n) % n; track.scrollTo({ left: (rtl() ? -1 : 1) * i * w(), behavior: 'smooth' }); };
    const dots = [...wrap.querySelectorAll('.pm-dot')];
    track.addEventListener('scroll', () => { const i = idx(); dots.forEach((d, k) => d.classList.toggle('on', k === i)); }, { passive: true });
    dots.forEach((d, k) => d.addEventListener('click', () => { pause(); goTo(k); }));
    const prev = wrap.querySelector('.pm-prev'), next = wrap.querySelector('.pm-next');
    if (prev) prev.addEventListener('click', () => { pause(); goTo(idx() + (rtl() ? 1 : -1)); });
    if (next) next.addEventListener('click', () => { pause(); goTo(idx() + (rtl() ? -1 : 1)); });
    ['pointerdown', 'touchstart', 'wheel'].forEach((ev) => track.addEventListener(ev, pause, { passive: true }));
    wrap.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hold = Date.now() + 36e5; }); wrap.addEventListener('pointerleave', () => { hold = Date.now() + 2000; });
    let drag = null;
    track.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; drag = { x: e.clientX, l: track.scrollLeft, start: idx(), moved: false }; track.classList.add('drag'); });
    window.addEventListener('pointermove', (e) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 5) drag.moved = true; track.scrollLeft = drag.l - dx; });
    window.addEventListener('pointerup', () => { if (!drag) return; const d = Math.abs(track.scrollLeft) - Math.abs(drag.l), st = drag.start, moved = drag.moved; drag = null; track.classList.remove('drag'); if (moved) { track.__dragged = true; setTimeout(() => { track.__dragged = false; }, 60); goTo(st + (Math.abs(d) > w() * 0.15 ? Math.sign(d) : 0)); } });
    track.addEventListener('click', (e) => { if (track.__dragged) { e.preventDefault(); e.stopPropagation(); } }, true);
    const t = setInterval(() => { if (!document.body.contains(track)) return clearInterval(t); if (Date.now() < hold || document.visibilityState === 'hidden') return; goTo(idx() + 1); }, ms || 5000);
  }
  const SETTINGS = { install: 50, updated: null };
  const LANG_KEYS = ['en', 'fa', 'uz', 'ru'];
  const safeUrl = (u) => {
    u = String(u == null ? '' : u).trim();
    if (/^data:image\/(png|jpe?g|webp|gif);base64,/i.test(u) || /^https:\/\//i.test(u)) return u;
    if (/^[\w\-./]+$/.test(u) && !u.includes('..')) return u; // relative path inside the site
    return '';
  };
  const str = (v, max = 400) => String(v == null ? '' : v).slice(0, max);
  const langObj = (o, max) => { if (!o) return null; if (typeof o === 'string') return { en: str(o, max) }; const r = {}; LANG_KEYS.forEach((k) => { if (o[k]) r[k] = str(o[k], max); }); return Object.keys(r).length ? r : null; };
  const pickLang = (o, lang) => (o ? o[lang] || o.en || o.fa || o.uz || o.ru || '' : '');
  function addPhrase(en, tr) {
    const key = String(en || '').trim().toLocaleLowerCase(); if (!key || !tr) return;
    if (!(tr.fa || tr.uz || tr.ru)) return;
    UI_LOOKUP[key] = { en: String(en), fa: tr.fa || String(en), uz: tr.uz || String(en), ru: tr.ru || String(en) };
  }
  function applyContent(c) {
    if (!c || typeof c !== 'object') return false;
    for (let i = PRODUCTS.length - 1; i >= 0; i--) if (PRODUCTS[i].custom) PRODUCTS.splice(i, 1);
    BASE_PRODUCTS.forEach((b) => { const p = PRODUCTS.find((x) => x.id === b.id); if (p) Object.assign(p, { deleted: false, price: b.price, name: b.name, model: b.model, specs: b.specs.slice(), img: b.img, photo: b.photo, isNew: b.isNew, colors: b.colors, views: b.views, visible: true, desc: null, gallery: null }); });
    const ov = c.products && typeof c.products === 'object' ? c.products : {};
    Object.keys(ov).forEach((id) => {
      const p = PRODUCTS.find((x) => x.id === +id), o = ov[id]; if (!p || !o || typeof o !== 'object') return;
      if (+o.price > 0) p.price = +o.price;
      if (o.hidden != null) p.visible = !o.hidden;
      if (o.deleted) { p.visible = false; p.deleted = true; }
      if (o.model) p.model = str(o.model, 40);
      if (o.name) p.name = str(o.name, 80);
      if (o.names) addPhrase(p.name, langObj(o.names, 80));
      if (Array.isArray(o.specs) && o.specs.length) p.specs = o.specs.slice(0, 12).map((x) => str(x, 120));
      if (o.desc) p.desc = langObj(o.desc, 2000);
      if (o.isNew != null) p.isNew = !!o.isNew;
      const gal = Array.isArray(o.gallery) ? o.gallery.map(safeUrl).filter(Boolean).slice(0, 10) : [];
      const im = safeUrl(o.img) || gal[0];
      if (im) { p.img = im; p.photo = true; p.colors = null; p.views = null; }
      if (gal.length) p.gallery = [p.img, ...gal.filter((u) => u !== p.img)];
    });
    (Array.isArray(c.added) ? c.added : []).slice(0, 200).forEach((a) => {
      if (!a || !(+a.id >= 1000) || !CATS.some((k) => k.id === a.cat) || PRODUCTS.some((x) => x.id === +a.id)) return;
      const gal = Array.isArray(a.gallery) ? a.gallery.map(safeUrl).filter(Boolean).slice(0, 10) : [];
      const im = safeUrl(a.img) || gal[0] || '';
      const p = { id: +a.id, model: str(a.model || 'NEW', 40), name: str(a.name || a.model || 'Machine', 80), cat: a.cat, price: Math.max(0, +a.price || 0), specs: (Array.isArray(a.specs) ? a.specs : []).slice(0, 12).map((x) => str(x, 120)), img: im, photo: true, studio: null, visible: !a.hidden, landscape: !!a.landscape, colors: null, views: null, model3d: null, isNew: a.isNew !== false, custom: true, desc: langObj(a.desc, 2000), gallery: gal.length ? [im, ...gal.filter((u) => u !== im)] : null };
      PRODUCTS.push(p); if (a.names) addPhrase(p.name, langObj(a.names, 80));
    });
    const rates = Array.isArray(c.rates) ? c.rates.filter((r) => r && r.country && isFinite(r.rate) && +r.rate >= 0).slice(0, 40) : [];
    RATES.splice(0, RATES.length, ...(rates.length ? rates.map((r) => ({ country: str(r.country, 60), rate: +r.rate })) : BASE_RATES.map((r) => ({ ...r }))));
    rates.forEach((r) => { if (r.names) addPhrase(r.country, langObj(r.names, 60)); });
    Object.keys(CONTACT).forEach((k) => delete CONTACT[k]); Object.assign(CONTACT, BASE_CONTACT);
    const ct = c.contact && typeof c.contact === 'object' ? c.contact : {};
    if (ct.phone) { const d = String(ct.phone).replace(/\D/g, ''); if (d.length >= 7) Object.assign(CONTACT, { phone: str(ct.phone, 30), phoneRaw: '+' + d, whatsapp: 'https://wa.me/' + d, telegram: 'https://t.me/+' + d }); }
    if (ct.whatsapp) { const d = String(ct.whatsapp).replace(/\D/g, ''); if (d.length >= 7) CONTACT.whatsapp = 'https://wa.me/' + d; }
    if (ct.telegram) { const t = String(ct.telegram).trim(); CONTACT.telegram = /^https:\/\//.test(t) ? t : /^\+?\d[\d\s]+$/.test(t) ? 'https://t.me/+' + t.replace(/\D/g, '') : 'https://t.me/' + t.replace(/^@/, ''); }
    if (ct.email && /^\S+@\S+\.\S+$/.test(ct.email)) CONTACT.email = str(ct.email, 80);
    ['instagram', 'facebook', 'tiktok'].forEach((k) => { if (ct[k] && /^https:\/\//.test(ct[k])) CONTACT[k] = str(ct[k], 200); });
    if (ct.instagram) { const m = String(ct.instagram).match(/instagram\.com\/([^/?#]+)/); if (m) CONTACT.instagramHandle = '@' + m[1]; }
    if (ct.tiktok) { const m = String(ct.tiktok).match(/tiktok\.com\/(@[^/?#]+)/); if (m) CONTACT.tiktokHandle = m[1]; }
    PROMOS.splice(0, PROMOS.length, ...(Array.isArray(c.promos) ? c.promos.filter((x) => x && (x.title || x.text || x.quote)).slice(0, 12).map((x) => ({ id: str(x.id, 40), theme: PROMO_THEMES[x.theme] ? x.theme : 'blue', icon: str(x.icon, 8), title: langObj(x.title, 120), text: langObj(x.text, 400), quote: langObj(x.quote, 400), author: str(x.author, 60), img: safeUrl(x.img), cta: ['store', 'wa', 'tg', 'tiktok', 'instagram', 'link', 'none'].includes(x.cta) ? x.cta : 'none', ctas: Array.isArray(x.ctas) ? x.ctas.filter((k) => ['store', 'wa', 'tg', 'tiktok', 'instagram', 'link'].includes(k)).slice(0, 3) : null, link: safeUrl(x.link), button: langObj(x.button, 40) })) : DEFAULT_PROMOS));
    PAGES.splice(0, PAGES.length, ...(Array.isArray(c.pages) ? c.pages.filter((x) => x && x.id && x.title).slice(0, 20).map((x) => ({ id: String(x.id).replace(/[^\w-]/g, '').slice(0, 40), title: langObj(x.title, 80), text: langObj(x.text, 4000), img: safeUrl(x.img), gallery: Array.isArray(x.gallery) ? x.gallery.map(safeUrl).filter(Boolean).slice(0, 8) : [], ctas: Array.isArray(x.ctas) ? x.ctas.filter((k) => ['store', 'wa', 'tg', 'tiktok', 'instagram', 'link'].includes(k)).slice(0, 3) : [], link: safeUrl(x.link), button: langObj(x.button, 40), inMenu: x.inMenu !== false })).filter((x) => x.id && x.title) : []));
    GUIDES.splice(0, GUIDES.length, ...(Array.isArray(c.guides) ? c.guides.filter((x) => x && x.id && x.title).slice(0, 60).map((x) => ({ id: String(x.id).replace(/[^\w-]/g, '').slice(0, 40), title: langObj(x.title, 120), text: langObj(x.text, 2000), steps: langObj(x.steps, 4000), video: safeUrl(x.video), poster: safeUrl(x.poster), machine: x.machine ? String(x.machine).replace(/\D/g, '').slice(0, 6) : '' })).filter((x) => x.id && x.title) : []));
    { const h = c.home && typeof c.home === 'object' ? c.home : {}; const okId = (k) => typeof k === 'string' && /^[\w-]{1,40}$/.test(k);
      HOME.blocks = (Array.isArray(h.blocks) ? h.blocks : []).filter((b) => b && okId(b.id) && BLOCK_TYPES.includes(b.type)).slice(0, 30).map((b) => ({ id: b.id, type: b.type, size: ['s', 'm', 'l', 'full'].includes(b.size) ? b.size : 'l', theme: BLOCK_THEMES[b.theme] ? b.theme : 'white', align: ['start', 'center', 'end'].includes(b.align) ? b.align : 'start', side: b.side === 'end' ? 'end' : 'start', where: ['both', 'web', 'app'].includes(b.where) ? b.where : 'both', title: langObj(b.title, 120), text: langObj(b.text, 2000), img: safeUrl(b.img), gallery: Array.isArray(b.gallery) ? b.gallery.map(safeUrl).filter(Boolean).slice(0, 8) : [], video: safeUrl(b.video), ctas: Array.isArray(b.ctas) ? b.ctas.filter((k) => ['store', 'wa', 'tg', 'tiktok', 'instagram', 'link'].includes(k)).slice(0, 3) : [], link: safeUrl(b.link), button: langObj(b.button, 40) }));
      HOME.order = Array.isArray(h.order) ? h.order.filter(okId).slice(0, 60) : null;
      HOME.hidden = Array.isArray(h.hidden) ? h.hidden.filter(okId).slice(0, 60) : []; }
    HERO.title = c.hero && langObj(c.hero.title, 120); HERO.text = c.hero && langObj(c.hero.text, 400);
    FIREBASE.apiKey = c.firebase && /^[\w-]{20,60}$/.test(c.firebase.apiKey || '') ? c.firebase.apiKey : '';
    FIREBASE.projectId = c.firebase && /^[a-z0-9-]{4,40}$/.test(c.firebase.projectId || '') ? c.firebase.projectId : '';
    SETTINGS.install = isFinite(c.install) && c.install !== null && +c.install >= 0 ? +c.install : 50;
    SETTINGS.updated = c.updated || null;
    BLOCKED.extra = Array.isArray(c.blockedWords) ? c.blockedWords.map((w) => String(w).toLocaleLowerCase().trim()).filter(Boolean).slice(0, 300) : [];
    NEWS.splice(0, NEWS.length, ...(Array.isArray(c.news) ? c.news : []).filter((n) => n && (n.title || n.text)).slice(0, 20).map((n) => ({ id: str(n.id, 40), date: str(n.date, 30), title: langObj(n.title, 120), text: langObj(n.text, 1500), img: safeUrl(n.img), link: safeUrl(n.link) })));
    return true;
  }
  const CONTENT_KEY = 'content.live';
  let contentBusy = false;
  function loadContent(onChange, opts) {
    const cached = store.get(CONTENT_KEY, null);
    if (!(opts && opts.skipCache) && cached) applyContent(cached);
    if (typeof fetch !== 'function' || contentBusy) return;
    contentBusy = true;
    fetch('content.json?t=' + Date.now(), { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)).then((c) => {
      contentBusy = false; if (!c || typeof c !== 'object') return;
      const before = JSON.stringify(store.get(CONTENT_KEY, null));
      if (JSON.stringify(c) === before) return;
      store.set(CONTENT_KEY, c); applyContent(c); if (onChange) onChange();
    }).catch(() => { contentBusy = false; });
  }
  function watchContent(onChange) {
    loadContent(onChange);
    if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') loadContent(onChange, { skipCache: true }); });
  }


  // ---------- Shared marketplace ----------
  // Shared mode (a database is available): everyone sees every post; each person edits and deletes only
  // their own posts; the owner (admin) edits or deletes any post and can block a user from posting.
  // Storage layout: posts/<userId> = { items:[post…] }, posts/<userId>/ph/<photoId> = { data }, mod/bans = { users:{ <userId>:{at,seller} } }.
  // Without a database the marketplace falls back to this device only.
  const MK = { mode: 'local', backend: 'local', ready: false, me: null, admin: false, canPost: true, banned: false, posts: [], bans: {}, reports: [], error: null };
  let mkAuth = null, mkActive = () => true, mkLocalShown = false;
  const BLOCKED = { words: ['fuck', 'fucking', 'shit', 'bitch', 'asshole', 'bastard', 'porn', 'nude', 'whore', 'slut', 'сука', 'блять', 'бля', 'мудак', 'шлюха', 'гандон', 'jalab', 'qanjiq', 'iflos', 'harom', 'جنده', 'کیر', 'کونی', 'حرومزاده', 'فاحشه'], roots: ['хуй', 'хуе', 'пизд', 'ебат', 'ебан', 'выеб', 'заеб', 'fuck', 'porn'], extra: [] };
  function mkBadWords(text) {
    const toks = String(text || '').toLocaleLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    const all = BLOCKED.words.concat(BLOCKED.extra);
    return toks.some((t) => all.includes(t) || BLOCKED.roots.some((r) => t.startsWith(r)));
  }
  const mkSubs = new Set();
  const mkEmit = () => mkSubs.forEach((fn) => { try { fn(MK); } catch (e) { /* listener error */ } });
  let mkDb = null, mkOwn = [];
  const mkPhotoCache = {}, mkPhotoBusy = {};
  const mkNewId = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const mkClean = (post) => {
    const c = post.contacts || {}; const t = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
    return { id: t(post.id, 40), at: +post.at || Date.now(), title: t(post.title, 80), cat: t(post.cat, 20), cond: post.cond === 'new' ? 'new' : 'used', price: Math.max(0, Math.round(+post.price || 0)), country: t(post.country, 40), city: t(post.city, 40), desc: t(post.desc, 1200), seller: t(post.seller, 50),
      contacts: { phone: t(c.phone, 30), whatsapp: t(c.whatsapp, 30), telegram: t(c.telegram, 40), instagram: t(c.instagram, 60), other: t(c.other, 200) } };
  };
  function mkLocal() { MK.posts = market.list().map((p) => ({ ...p, author: 'local', mine: true })); }
  async function mkInit() {
    if (MK.mode === 'shared') return;
    if (!mkLocalShown) { mkLocalShown = true; mkLocal(); MK.ready = true; mkEmit(); }
    let db = null, id = null, owner = false, canW = null, backend = '';
    const C = typeof window !== 'undefined' ? window.claude : null;
    if (C && typeof C.use === 'function') {
      try { const [d, u] = await Promise.all([C.use('db'), C.use('user')]); if (d) { db = d; backend = 'artifact'; if (u) [id, owner, canW] = await Promise.all([u.id(), u.isOwner(), u.can('data.write')]); } } catch (e) { db = null; }
    }
    if (!db && FIREBASE.apiKey && FIREBASE.projectId && typeof fetch === 'function') {
      mkAuth = firebaseAuth(FIREBASE, 'anon'); db = firestoreDb(FIREBASE, mkAuth, { active: () => mkActive() }); backend = 'firebase'; id = mkAuth.uid || null; canW = true;
    }
    if (!db || MK.mode === 'shared') return;
    mkDb = db;
    Object.assign(MK, { mode: 'shared', backend, me: id, admin: !!owner, canPost: backend === 'firebase' || (!!id && canW !== false), posts: [], ready: false }); mkEmit();
    db.collection('posts').onSnapshot((snap) => {
      const out = [];
      snap.docs.forEach((d) => { const items = (d.data() || {}).items; (Array.isArray(items) ? items : []).forEach((it) => { if (it && it.id) out.push({ ...it, author: d.id, mine: !!MK.me && d.id === MK.me }); }); });
      out.sort((a, b) => (b.at || 0) - (a.at || 0));
      const own = snap.docs.find((d) => d.id === MK.me); mkOwn = own ? ((own.data() || {}).items || []).slice() : [];
      MK.posts = out; MK.ready = true; mkEmit();
    }, (e) => { MK.error = e && e.code; MK.ready = true; mkEmit(); });
    db.doc('mod/bans').onSnapshot((snap) => { MK.bans = (snap.exists && (snap.data() || {}).users) || {}; MK.banned = !!(MK.me && MK.bans[MK.me]); mkEmit(); }, () => {});
    if (MK.admin) db.collection('reports').onSnapshot((snap) => { const out = []; snap.docs.forEach((d) => ((d.data() || {}).items || []).forEach((r) => out.push({ ...r, reporter: d.id }))); out.sort((a, b) => (b.at || 0) - (a.at || 0)); MK.reports = out; mkEmit(); }, () => {});
  }
  async function mkEnsureId() {
    if (MK.me) return MK.me;
    if (MK.backend === 'firebase' && mkAuth) { await mkAuth.token(true); MK.me = mkAuth.uid; MK.banned = !!MK.bans[MK.me]; }
    return MK.me;
  }
  async function mkReport(post, reason) {
    if (MK.mode !== 'shared') return 'denied';
    try {
      if (!(await mkEnsureId())) return 'denied';
      const mine = store.get('mk.reports.' + MK.backend, []);
      const item = { id: mkNewId('r'), at: Date.now(), author: String(post.author), post: String(post.id), title: String(post.title || '').slice(0, 80), reason: String(reason || '').slice(0, 40) };
      const items = [item].concat(mine).slice(0, 30);
      await mkDb.doc('reports/' + MK.me).set({ items, updatedAt: Date.now() }); store.set('mk.reports.' + MK.backend, items); return true;
    } catch (e) { return mkFail(e); }
  }
  async function mkDismissReport(reporter, id) {
    if (!MK.admin) return 'denied';
    try { const ref = mkDb.doc('reports/' + reporter); const snap = await ref.get(); const items = ((snap.exists && snap.data().items) || []).filter((x) => x.id !== id); await ref.set({ items, updatedAt: Date.now() }); MK.reports = MK.reports.filter((x) => !(x.reporter === reporter && x.id === id)); mkEmit(); return true; } catch (e) { return mkFail(e); }
  }
  async function mkPutPhotos(author, list) { // list: [{ref}|{data}] -> photo ids
    const ids = [];
    for (const ph of list.slice(0, 4)) {
      if (ph.ref) { ids.push(ph.ref); continue; }
      const pid = mkNewId('f'); await mkDb.doc('posts/' + author + '/ph/' + pid).set({ data: ph.data, at: Date.now() });
      mkPhotoCache[author + '/' + pid] = ph.data; ids.push(pid);
    }
    return ids;
  }
  const mkDropPhotos = (author, refs) => refs.forEach((r) => { if (r && !/^data:/.test(r)) mkDb.doc('posts/' + author + '/ph/' + r).delete().catch(() => {}); });
  const mkFail = (e) => (e && e.code === 'quota_exceeded' ? 'full' : e && e.code === 'invalid_argument' ? 'denied' : 'error');
  async function mkAdd(post, photos) {
    const clean = mkClean({ ...post, id: mkNewId('m'), at: Date.now() });
    if (MK.mode !== 'shared') { const ok = market.add({ ...clean, photos }); mkLocal(); mkEmit(); return ok ? true : 'space'; }
    if (mkBadWords(clean.title + ' ' + clean.desc + ' ' + clean.seller)) return 'words';
    if (MK.banned) return 'banned'; if (!MK.canPost) return 'denied';
    try {
      if (!(await mkEnsureId())) return 'denied'; if (MK.bans[MK.me]) { MK.banned = true; mkEmit(); return 'banned'; }
      const ids = await mkPutPhotos(MK.me, photos.map((data) => ({ data })));
      const items = [{ ...clean, photos: ids }].concat(mkOwn).slice(0, 40);
      await mkDb.doc('posts/' + MK.me).set({ items, updatedAt: Date.now() }); mkOwn = items; return true;
    } catch (e) { return mkFail(e); }
  }
  async function mkEdit(author, id, fields, photoList) { // photoList: [{ref}|{data}]
    if (MK.mode !== 'shared') {
      const all = market.list(); const i = all.findIndex((x) => x.id === id); if (i < 0) return 'missing';
      all[i] = { ...all[i], ...mkClean({ ...all[i], ...fields, id, at: all[i].at }), photos: photoList.map((p) => p.data || p.ref), edited: Date.now() };
      const ok = market.save(all); mkLocal(); mkEmit(); return ok ? true : 'space';
    }
    if (author !== MK.me && !MK.admin) return 'denied'; if (MK.banned && !MK.admin) return 'banned';
    if (!MK.admin && mkBadWords([fields.title, fields.desc, fields.seller].join(' '))) return 'words';
    try {
      const ref = mkDb.doc('posts/' + author); const snap = await ref.get(); const items = ((snap.exists && snap.data().items) || []).slice();
      const i = items.findIndex((x) => x.id === id); if (i < 0) return 'missing';
      const ids = await mkPutPhotos(author, photoList);
      mkDropPhotos(author, (items[i].photos || []).filter((r) => !ids.includes(r)));
      items[i] = { ...mkClean({ ...items[i], ...fields, id, at: items[i].at }), photos: ids, edited: Date.now(), editedBy: author === MK.me ? 'self' : 'admin' };
      await ref.set({ items, updatedAt: Date.now() }); if (author === MK.me) mkOwn = items; return true;
    } catch (e) { return mkFail(e); }
  }
  async function mkRemove(author, id) {
    if (MK.mode !== 'shared') { market.remove(id); mkLocal(); mkEmit(); return true; }
    if (author !== MK.me && !MK.admin) return 'denied'; if (MK.banned && !MK.admin) return 'banned';
    try {
      const ref = mkDb.doc('posts/' + author); const snap = await ref.get(); const items = (snap.exists && snap.data().items) || [];
      const gone = items.find((x) => x.id === id); const rest = items.filter((x) => x.id !== id);
      await ref.set({ items: rest, updatedAt: Date.now() }); if (gone) mkDropPhotos(author, gone.photos || []);
      if (author === MK.me) mkOwn = rest; return true;
    } catch (e) { return mkFail(e); }
  }
  async function mkBan(author, on, purge) {
    if (MK.mode !== 'shared' || !MK.admin || !author || author === MK.me) return 'denied';
    try {
      const users = { ...MK.bans };
      if (on) { const last = MK.posts.find((p) => p.author === author); users[author] = { at: Date.now(), seller: last ? String(last.seller || '').slice(0, 50) : '' }; } else delete users[author];
      await mkDb.doc('mod/bans').set({ users }); MK.bans = users; mkEmit();
      if (on && purge) {
        const ref = mkDb.doc('posts/' + author); const snap = await ref.get(); const items = (snap.exists && snap.data().items) || [];
        await ref.set({ items: [], updatedAt: Date.now() }); items.forEach((it) => mkDropPhotos(author, it.photos || []));
      }
      return true;
    } catch (e) { return mkFail(e); }
  }
  // <img> for a post photo: data URLs show at once; shared photos load lazily (call hydrate after rendering).
  const MK_BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
  function mkImg(post, ref, alt, cls) {
    const a = ' alt="' + esc(alt || '') + '"' + (cls ? ' class="' + cls + '"' : '');
    if (/^data:image\//.test(ref)) return '<img src="' + ref + '"' + a + ' loading="lazy">';
    const key = post.author + '/' + ref; const hit = mkPhotoCache[key];
    return '<img src="' + (hit || MK_BLANK) + '"' + a + (hit ? '' : ' data-mkph="' + esc(key) + '"') + ' style="background:#E4F4FE">';
  }
  function mkHydrate(root) {
    if (!mkDb || !root || !root.querySelectorAll) return;
    root.querySelectorAll('img[data-mkph]').forEach((img) => {
      const key = img.getAttribute('data-mkph'); const fill = (src) => { if (src) { img.src = src; img.removeAttribute('data-mkph'); } };
      if (mkPhotoCache[key]) return fill(mkPhotoCache[key]);
      const [author, pid] = key.split('/');
      (mkPhotoBusy[key] = mkPhotoBusy[key] || mkDb.doc('posts/' + author + '/ph/' + pid).get().then((s) => { const d = s.exists ? (s.data() || {}).data : ''; if (/^data:image\//.test(d)) mkPhotoCache[key] = d; return mkPhotoCache[key]; }).catch(() => null)).then(fill);
    });
  }
  // Privacy policy + terms (required by the app stores), in the four languages.
  const PRIVACY = {"en": {"title": "Privacy policy and terms", "updated": "Last updated: 24 October 2026", "sec": [["Who we are", "PLAYMAX sells and rents arcade, boxing and family-entertainment machines in Uzbekistan, Afghanistan and Central Asia. You can reach us at the phone and email on the Contact page."], ["What we collect", "When you order, the details you type (name, phone, email, country, city, address and message) are sent by you to our WhatsApp or Telegram chat. The website and the app do not keep them on a server. Your bag and account details stay on your own device."], ["Marketplace posts", "Posts you publish in the marketplace (title, description, price, photos and contacts) are public and visible to everyone. Your device gets an anonymous ID, so only you can edit or delete your posts. Reports you send are seen only by PLAYMAX."], ["How we use information", "Only to answer you, confirm orders, deliver, install and service machines. We do not sell your data."], ["Your choices", "You can delete your marketplace posts at any time. To ask us to delete any information about you, contact us and we will do it."], ["Marketplace rules", "Post only real machines with honest descriptions and photos you have the right to use. Offensive, misleading or illegal content is not allowed. PLAYMAX may edit or remove any post and block users who break these rules. Deals between buyers and sellers are their own responsibility."], ["Prices and orders", "Prices shown are confirmed by PLAYMAX before an order is final. Delivery cost is one price for the whole order, by country."], ["Children", "The services are not directed at children under 13."], ["Changes", "If we change this policy, we will update the date at the top of this page."]]}, "fa": {"title": "حریم خصوصی و شرایط استفاده", "updated": "آخرین به‌روزرسانی: ۲۴ اکتبر ۲۰۲۶", "sec": [["ما کی هستیم", "PLAYMAX دستگاه‌های آرکید، بوکس و سرگرمی خانوادگی را در ازبکستان، افغانستان و آسیای میانه می‌فروشد و کرایه می‌دهد. از طریق تلفن و ایمیل صفحه تماس با ما در ارتباط باشید."], ["چه اطلاعاتی جمع می‌کنیم", "هنگام سفارش، اطلاعاتی که وارد می‌کنید (نام، تلفن، ایمیل، کشور، شهر، آدرس و پیام) را خودتان به گفتگوی واتس‌اپ یا تلگرام ما می‌فرستید. وب‌سایت و اپلیکیشن آن‌ها را روی سرور نگه نمی‌دارند. سبد خرید و اطلاعات حساب شما روی دستگاه خودتان می‌ماند."], ["آگهی‌های بازار", "آگهی‌هایی که در بازار منتشر می‌کنید (عنوان، توضیح، قیمت، عکس‌ها و راه‌های تماس) عمومی هستند و همه آن‌ها را می‌بینند. دستگاه شما یک شناسه ناشناس می‌گیرد تا فقط خودتان بتوانید آگهی‌تان را ویرایش یا حذف کنید. گزارش‌هایی که می‌فرستید فقط برای PLAYMAX قابل دیدن است."], ["استفاده از اطلاعات", "فقط برای پاسخ به شما، تأیید سفارش، ارسال، نصب و خدمات دستگاه‌ها. ما اطلاعات شما را نمی‌فروشیم."], ["انتخاب‌های شما", "هر زمان می‌توانید آگهی‌های خود را حذف کنید. برای حذف هر اطلاعاتی درباره خودتان با ما تماس بگیرید."], ["قوانین بازار", "فقط دستگاه‌های واقعی را با توضیح درست و عکس‌هایی که حق استفاده‌شان را دارید منتشر کنید. محتوای توهین‌آمیز، گمراه‌کننده یا غیرقانونی مجاز نیست. PLAYMAX می‌تواند هر آگهی را ویرایش یا حذف کند و کاربرانی را که این قوانین را رعایت نکنند مسدود کند. معامله بین خریدار و فروشنده مسئولیت خود آن‌هاست."], ["قیمت‌ها و سفارش‌ها", "قیمت‌ها پیش از نهایی شدن سفارش توسط PLAYMAX تأیید می‌شوند. هزینه ارسال یک مبلغ برای کل سفارش و بر اساس کشور است."], ["کودکان", "این خدمات برای کودکان زیر ۱۳ سال نیست."], ["تغییرات", "اگر این سیاست تغییر کند، تاریخ بالای این صفحه را به‌روز می‌کنیم."]]}, "uz": {"title": "Maxfiylik siyosati va shartlar", "updated": "Oxirgi yangilanish: 2026-yil 24-oktabr", "sec": [["Biz kimmiz", "PLAYMAX O‘zbekiston, Afg‘oniston va Markaziy Osiyoda arkada, boks va oilaviy ko‘ngilochar avtomatlarni sotadi va ijaraga beradi. Biz bilan Aloqa sahifasidagi telefon va email orqali bog‘lanishingiz mumkin."], ["Qanday ma’lumot yig‘amiz", "Buyurtma berganingizda kiritgan ma’lumotlaringiz (ism, telefon, email, mamlakat, shahar, manzil va xabar) siz tomonidan WhatsApp yoki Telegram chatimizga yuboriladi. Sayt va ilova ularni serverda saqlamaydi. Savat va hisob ma’lumotlaringiz o‘z qurilmangizda qoladi."], ["Bozor e’lonlari", "Bozorda joylagan e’lonlaringiz (sarlavha, tavsif, narx, rasmlar va aloqa) ommaviy bo‘lib, hamma ko‘radi. Qurilmangiz anonim ID oladi, shuning uchun e’loningizni faqat siz tahrirlay yoki o‘chira olasiz. Yuborgan shikoyatlaringizni faqat PLAYMAX ko‘radi."], ["Ma’lumotdan foydalanish", "Faqat sizga javob berish, buyurtmani tasdiqlash, yetkazish, o‘rnatish va avtomatlarga xizmat ko‘rsatish uchun. Ma’lumotlaringizni sotmaymiz."], ["Sizning tanlovingiz", "E’lonlaringizni istalgan vaqtda o‘chirishingiz mumkin. Siz haqingizdagi har qanday ma’lumotni o‘chirishni so‘rash uchun biz bilan bog‘laning."], ["Bozor qoidalari", "Faqat haqiqiy avtomatlarni to‘g‘ri tavsif va foydalanish huquqingiz bor rasmlar bilan joylang. Haqoratli, chalg‘ituvchi yoki noqonuniy kontent taqiqlanadi. PLAYMAX istalgan e’lonni tahrirlashi yoki o‘chirishi va qoidalarni buzgan foydalanuvchilarni bloklashi mumkin. Xaridor va sotuvchi o‘rtasidagi bitimlar ularning o‘z mas’uliyatida."], ["Narxlar va buyurtmalar", "Ko‘rsatilgan narxlar buyurtma yakunlanishidan oldin PLAYMAX tomonidan tasdiqlanadi. Yetkazish narxi butun buyurtma uchun mamlakat bo‘yicha bitta narx."], ["Bolalar", "Xizmatlar 13 yoshgacha bo‘lgan bolalarga mo‘ljallanmagan."], ["O‘zgarishlar", "Siyosat o‘zgarsa, sahifa yuqorisidagi sanani yangilaymiz."]]}, "ru": {"title": "Политика конфиденциальности и условия", "updated": "Последнее обновление: 24 октября 2026 г.", "sec": [["Кто мы", "PLAYMAX продаёт и сдаёт в аренду аркадные, боксёрские и семейные игровые автоматы в Узбекистане, Афганистане и Центральной Азии. Связаться с нами можно по телефону и эл. почте со страницы «Контакты»."], ["Какие данные мы получаем", "При заказе данные, которые вы вводите (имя, телефон, эл. почта, страна, город, адрес и сообщение), вы сами отправляете в наш чат WhatsApp или Telegram. Сайт и приложение не хранят их на сервере. Корзина и данные аккаунта остаются на вашем устройстве."], ["Объявления", "Объявления, которые вы публикуете (название, описание, цена, фото и контакты), общедоступны и видны всем. Ваше устройство получает анонимный ID, поэтому изменять и удалять объявления можете только вы. Ваши жалобы видит только PLAYMAX."], ["Как мы используем данные", "Только чтобы ответить вам, подтвердить заказ, доставить, установить и обслуживать автоматы. Мы не продаём ваши данные."], ["Ваш выбор", "Вы можете удалить свои объявления в любое время. Чтобы попросить удалить любые данные о вас, свяжитесь с нами."], ["Правила объявлений", "Публикуйте только реальные автоматы с честным описанием и фото, на которые у вас есть права. Оскорбительный, вводящий в заблуждение или незаконный контент запрещён. PLAYMAX может изменить или удалить любое объявление и заблокировать нарушителей. Сделки между покупателем и продавцом — их собственная ответственность."], ["Цены и заказы", "Цены подтверждаются PLAYMAX до окончательного оформления заказа. Доставка — одна цена за весь заказ в зависимости от страны."], ["Дети", "Сервисы не предназначены для детей младше 13 лет."], ["Изменения", "Если политика изменится, мы обновим дату вверху страницы."]]}};
  function privacyHtml(lang) { const d = PRIVACY[lang] || PRIVACY.en; return '<div class="pm-legal" data-no-translate dir="' + (lang === 'fa' ? 'rtl' : 'ltr') + '"><p class="pm-upd">' + esc(d.updated) + '</p>' + d.sec.map(([h, t]) => '<h2>' + esc(h) + '</h2><p>' + esc(t) + '</p>').join('') + '<p class="pm-contact">' + esc(CONTACT.email) + ' · <span dir="ltr">' + esc(CONTACT.phone) + '</span></p></div>'; }
  const privacyTitle = (lang) => (PRIVACY[lang] || PRIVACY.en).title;
  const mk = { state: MK, init: mkInit, report: mkReport, dismissReport: mkDismissReport, badWords: mkBadWords, setActive: (fn) => { mkActive = fn; }, refresh: () => { if (mkDb && mkDb.refresh) mkDb.refresh(); }, on: (fn) => { mkSubs.add(fn); return () => mkSubs.delete(fn); }, add: mkAdd, edit: mkEdit, remove: mkRemove, ban: mkBan, img: mkImg, hydrate: mkHydrate, photoUrl: (post, ref) => (/^data:/.test(ref) ? ref : mkPhotoCache[post.author + '/' + ref] || '') };

  window.PM = { CATS, PRODUCTS, COLORS, RATES, CONTACT, I18N, UI_PHRASES, translateText, localizeDOM, money, esc, store, heightMm, recolor, spin360, aiAnswer, playIntro, INTRO_CSS, colorSrc, nativeColor, FLAG, LANGS, ICONS, orderMessage, waLink, tgLink, copyText, market, compressImage, sellerLinks, NEWS, SETTINGS, applyContent, loadContent, watchContent, pickLang, safeUrl, addPhrase, mk, PROMOS, HERO, promoHtml, carousel, FIREBASE, firebaseAuth, firestoreDb, fsEnc, fsDec, privacyHtml, privacyTitle, PAGES, pageHtml, pageTitle, ctaHtml, GUIDES, guidesHtml, videoEmbed, GUIDE_CSS, HOME, HOME_KEYS, BLOCK_TYPES, BLOCK_THEMES, homeArrange, blockHtml, BLOCK_CSS, BLOCK_APP_CSS };
})();
