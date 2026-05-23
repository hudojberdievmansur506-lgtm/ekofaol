import { EcoActivity, GreenProject, LeaderboardUser } from './types';

// Let's import or define standard paths for the generated images
export const IMAGES = {
  heroStudents: '/src/assets/images/hero_students_green_1779519553890.png',
  campusPanels: '/src/assets/images/green_campus_panels_1779519576836.png',
  botanicalGarden: '/src/assets/images/botanical_garden_dpi_1779519600695.png'
};

export const INITIAL_ECO_ACTIVITIES: EcoActivity[] = [
  {
    id: 'act-1',
    title: '"Yashil Makon" loihasi: Guliston DPI hovlisida 150 ta daraxt ko\'chati ekildi',
    category: 'planting',
    studentName: 'Bobur Ravshanov va Tabiiy fanlar koʻngillilari',
    faculty: 'Tabiiy fanlar fakulteti',
    description: 'Guliston davlat pedagogika instituti talabalari "Yashil Makon" umummilliy loyihasi doirasida faol ishtirok etdilar. Kampus hududini yanada yashillashtirish maqsadida mevali va manzarali daraxt turlari, jumladan qayragʻoch, archa va eman koʻchatlari oʻtqazildi. Ushbu aksiya atrof-muhitni muhofaza qilish, havo tozaligini ta\'minlash va talabalar orasida ekologik madaniyatni yuksaltirish maqsadida tashkil etildi.',
    date: '2026-05-18',
    images: [
      { url: IMAGES.heroStudents, alt: 'GulDPI hovlisida daraxt ekish' },
      { url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800', alt: 'Koʻchatlarni sugʻorish' },
      { url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800', alt: 'Yashil hudud' }
    ],
    likes: 124
  },
  {
    id: 'act-2',
    title: '"Qogʻoz va plastmassa tejamkorligi" ekologik aksiyasi',
    category: 'recycling',
    studentName: 'Zuhra Alimova',
    faculty: 'Aniq fanlar fakulteti',
    description: 'Pedagogika instituti yotoqxonalari va oʻquv binolarida chiqindilarni saralash va qogʻoz sarfini kamaytirish boʻyicha tizimli ishlar yoʻlga qoʻyildi. Ekofaol talabalar tashabbusi bilan 450 kg makulatura va 120 kg plastik idishlar yigʻilib, maxsus qayta ishlash korxonalariga topshirildi. Evaziga olingan mablagʻlarga institut kutubxonasi va yashil burchagi uchun yangi adabiyotlar va xona oʻsimliklari sotib olindi.',
    date: '2026-05-12',
    images: [
      { url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800', alt: 'Plastik va qogʻoz saralash idishlari' },
      { url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=800', alt: 'Makulatura toʻplash jarayoni' }
    ],
    likes: 89
  },
  {
    id: 'act-3',
    title: 'Sirdaryo sohili boʻyida ekologik tozalash hashari',
    category: 'clean_up',
    studentName: 'Eco-Guard studentlar guruhi',
    faculty: 'Pedagogika va jismoniy madaniyat fakulteti',
    description: 'Guliston shahri yaqinidagi Sirdaryo daryosi qirgʻoqlarini maishiy va plastik chiqindilardan tozalash maqsadida 80 nafarga yaqin koʻngilli talabalar ishtirokida keng koʻlamli hashar oʻtkazildi. Hashar natijasida qirgʻoq boʻyidan 2 tonnadan ortiq turli xil plastik shishalar, salofan va polietilen mahsulotlar yigʻilib, utilizatsiya qilish uchun olib ketildi.',
    date: '2026-05-05',
    images: [
      { url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800', alt: 'Daryo boʻyini tozalash' },
      { url: 'https://images.unsplash.com/photo-1554972147-79b865b36c6e?auto=format&fit=crop&q=80&w=800', alt: 'Chiqindilarni qoplarga solish' },
      { url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=800', alt: 'Tozalangan toza hudud' }
    ],
    likes: 142
  },
  {
    id: 'act-4',
    title: 'Maktab oʻquvchilari uchun ekologik darslar va treninglar',
    category: 'education',
    studentName: 'Jasur Temirov',
    faculty: 'Xorijiy tillar fakulteti',
    description: 'Pedagogika instituti talabalari maktablarda amaliyot oʻtash davomida "Yashil Sayyora" mavzusida interaktiv darslar tashkil etdilar. Oʻquvchilarga ekologik madaniyat asoslari, chiqindilarni saralash, suvni tejash hamda tabiatni asrash boʻyicha qiziqarli oʻyinlar orqali tushuntirish berildi. Bu boʻlajak oʻqituvchilarning jamiyat oldidagi ekologik maʼsuliyatining isbotidir.',
    date: '2026-04-28',
    images: [
      { url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800', alt: 'Maktabda ekologiya darsi' },
      { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800', alt: 'Interaktiv oʻyinlar' }
    ],
    likes: 95
  }
];

export const GREEN_INSTITUTE_PROJECTS: GreenProject[] = [
  {
    id: 'proj-1',
    title: 'Institut Quyosh energiyasi tizimlari',
    category: 'energy',
    description: 'GuldPI barcha oʻquv va laboratoriya binolari tomlariga zamonaviy yuqori samarali quyosh panellari oʻrnatildi. Ushbu tizim institutning elektr energiyasiga boʻlgan ehtiyojini qariyb 35-40% qismini ekologik toza va barqaror energiya manbai hisobiga qondirish imkonini beradi. Shuningdek, kampus hududidagi barcha yoritgichlar toʻliq tejamkor LED chiroqlarga almashtirildi.',
    highlights: [
      '350 kVt/soat quvvatga ega quyosh batareyalari',
      'Binolarning LED yoritish tizimlariga 100% oʻtilganligi',
      'Yillik elektr tushumi xarajatlarining 38% ga tejalishi',
      'Karbodioksid (CO2) chiqindilarini yillik 45 tonnaga kamaytirish'
    ],
    metrics: [
      { label: 'Quyosh energiyasi ulushi', value: '38%', progress: 38 },
      { label: 'LED chiroqlar qoplami', value: '100%', progress: 100 },
      { label: 'Yillik energiya tejamkorligi', value: '120,000 kVt', progress: 85 }
    ],
    images: [
      { url: IMAGES.campusPanels, alt: 'Institut Quyosh panellari' },
      { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800', alt: 'Modern Solar Arrays' },
      { url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800', alt: 'Eco Power Generation' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Botanika bogʻi va "Yashil belbogʻ" oromgohi',
    category: 'flora',
    description: 'Guliston davlat pedagogika instituti hududida biologiya va botanika yoʻnalishi professor-oʻqituvchilari hamda talabalari hamkorligida doimiy yashil hudud (Botanika bogʻi) tashkil etilgan. Ushbu bogʻ nafaqat dars mashgʻulotlari uchun amaliy baza boʻlib xizmat qiladi, balki kampusning mikroiqlimini yaxshilaydi, toza havoni taminlaydi va harorat moʻtadilligini ushlab turadi.',
    highlights: [
      '120 dan ortiq nodir va endemik oʻsimlik turlari',
      'Talabalar amaliy tadqiqotlari uchun zamonaviy issiqxona (Greenhouse)',
      'Ona tabiat burchagi va soya ostidagi dars mashgʻulotlar maydonchasi',
      'Yillik 5,000+ dekorativ gullar yetishtirish va tarqatish'
    ],
    metrics: [
      { label: 'Oʻsimlik turlari bioxilligi', value: '120+ tur', progress: 75 },
      { label: 'Oromgoh yashillik maydoni', value: '1.8 Gektar', progress: 90 },
      { label: 'Yillik koʻchat yetishtirish', value: '5,000 ta', progress: 65 }
    ],
    images: [
      { url: IMAGES.botanicalGarden, alt: 'Botanika bogʻi va talabalar' },
      { url: 'https://images.unsplash.com/photo-1440615496174-8b89a78a9477?auto=format&fit=crop&q=80&w=800', alt: 'Yashil oʻsimliklar' },
      { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800', alt: 'Issiqxona va koʻchatlar' }
    ]
  },
  {
    id: 'proj-3',
    title: 'Suv resurslarini tejash: Tomchilatib sugʻorish tizimi',
    category: 'water',
    description: 'Guliston mintaqasining iqlim sharoitidan kelib chiqib, suv sarfini optimal darajada kamaytirish uchun institut yashil maydonlarida toʻliq tomchilatib sugʻorish texnologiyasi joriy etildi. Bu texnologiya har bir koʻchatga ehtiyojidan kelib chiqib, meʼyorida suv quyish imkonini berdi va isrofgarchilikning oldini oldi.',
    highlights: [
      'Daraxtzorlar va gulzorlarga yotqizilgan 4,500 metr datchikli shlanglar',
      'Suv sarfini anʼanaviy sugʻorishga qaraganda 60% gacha tejash',
      'Tungi avtomatlashtirilgan sugʻorish va datchikli aqlli boshqaruv tizimi',
      'Yer osti sizot suvlaridan filtrlash orqali unumli foydalanish'
    ],
    metrics: [
      { label: 'Sugʻorish tejamkorligi', value: '62% tejam', progress: 62 },
      { label: 'Avtomatlashgan qamrov', value: '80%', progress: 80 },
      { label: 'Sugʻorish shlanglari uzunligi', value: '4.5 km', progress: 70 }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800', alt: 'Tomchilatib sugʻorish jihozi' },
      { url: 'https://images.unsplash.com/photo-1463171359979-300627526191?auto=format&fit=crop&q=80&w=800', alt: 'Aqlli sugʻorish texnologiyalari' }
    ]
  }
];

export const ECO_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'l-1',
    name: 'Asadbek Toshpoʻlatov',
    faculty: 'Tabiiy fanlar',
    points: 1250,
    rank: 1,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    activitiesCount: 14
  },
  {
    id: 'l-2',
    name: 'Sardor Qahramonov',
    faculty: 'Aniq fanlar',
    points: 1040,
    rank: 2,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    activitiesCount: 11
  },
  {
    id: 'l-3',
    name: 'Madina Shodiyeva',
    faculty: 'Xorijiy tillar',
    points: 980,
    rank: 3,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    activitiesCount: 9
  },
  {
    id: 'l-4',
    name: 'Jasurbek Alimov',
    faculty: 'Pedagogika va jismoniy madaniyat',
    points: 850,
    rank: 4,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    activitiesCount: 8
  },
  {
    id: 'l-5',
    name: 'Nigora Yoʻldosheva',
    faculty: 'Tabiiy fanlar',
    points: 790,
    rank: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    activitiesCount: 7
  }
];

export const INSTITUT_ECO_STATS = [
  { label: 'Ekilgan barcha yashil daraxt koʻchatlari', value: '11,450+', description: 'GuldPI va uning hududlarida joriy yil davomida', suffix: 'daraxt' },
  { label: 'Qayta ishlangan chiqindilar ulushi', value: '1,240 kg', description: 'Makulatura, karton va plastik idishlar saralanishi', suffix: 'kg' },
  { label: 'Oʻrnatilgan muqobil energiya manbalari (panellar)', value: '350 kVt', description: 'Tizimning toliq kuchi', suffix: 'kVt/soat' },
  { label: 'Yiliga tejalgan toza ichimlik va sugʻorish suvi', value: '1.2 MLN litr', description: 'Aqlli tomchilab sugʻorish tizimi samarasida', suffix: 'litr' }
];

export const ECO_TIPS = [
  {
    title: 'Qogʻozsiz dars jarayonini joriy qiling',
    description: 'Pedagog sifatida oʻquv materiallarini raqamlashtiring. Mustaqil ishlar, test va slaydlar uchun elektron vositalardan foydalaning va yuzlab daraxtlarni saqlab qoling.'
  },
  {
    title: 'Kichik chiqindini ham alohida idishga tashlang',
    description: 'Institut yoʻlaklari va yotoqxonadagi eko-qutilardan foydalaning. Saralangan plastik shishalar sement yoxud kiyim-kechak iplariga aylantiriladi!'
  },
  {
    title: 'Sugʻorish va ichimlik suvini asrang',
    description: 'Chorva yoki bogʻlar va institut dush, jomadonlarida ortiqcha oqib turgan suv joʻmraklarini oʻz vaqtida yoping va atrofdegilarning mas’uliyatini oshiring.'
  },
  {
    title: 'Xonadan chiqayotganda chiroq va jihozlarni oʻchiring',
    description: 'Auditoriya boʻsh qolishi bilan proyektor va svetidod yoritgichlarini oʻchirib tarmoqdan uzish orqali uglerod chiqindisini tonnalarga kamaytiramiz.'
  }
];
