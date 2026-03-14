# CLAUDE.md - دليل الوكلاء الذكي لمشروع كيف الضيافة

> **تعليمات إلزامية:** عند دخول أي وكيل ذكي (Claude, Gemini, GPT, أو غيره) يجب قراءة هذا الملف **كاملاً** قبل أي عمل. يجب فهم المشروع أولاً ثم تحديث هذا الملف وملفات التوثيق بعد كل تعديل.

---

## 1. نظرة عامة على المشروع

| البند | القيمة |
|-------|--------|
| **الاسم** | كيف الضيافة (Keif Al-Diafa) |
| **النوع** | موقع تعريفي فاخر لشركة خدمات ضيافة سعودية |
| **الإطار** | Next.js 14 (App Router) + React 18 + TypeScript |
| **التنسيق** | Tailwind CSS 3.4 + PostCSS + Autoprefixer |
| **الأنيميشن** | motion (Framer Motion) 12.x |
| **الكاروسيل** | embla-carousel-react 8.x |
| **اللغة** | عربي (RTL) - اتجاه من اليمين لليسار |
| **الموقع** | https://keifaldiafa.com |
| **المستودع** | https://github.com/moain2026/keif-aldiafa-website |
| **الفرع الرئيسي** | main |

---

## 2. هيكل المشروع التفصيلي

```
keif-aldiafa-website/
├── public/
│   ├── favicon.ico, icon-192.png, icon-512.png
│   ├── og-image.jpg              # صورة OpenGraph
│   ├── manifest.json             # PWA manifest
│   └── images/                   # الصور (Git LFS)
│       ├── hero/                 # 3 صور رئيسية
│       ├── events/               # 82 صورة فعالية
│       ├── weddings/             # 18 صورة زفاف
│       ├── distributions/        # 5 صور توزيعات
│       ├── equipment/            # 21 صورة معدات
│       ├── partners/             # 36 شعار شريك
│       └── services/             # صور الخدمات
│           ├── male/             # خدمات رجالية
│           ├── female/           # خدمات نسائية
│           └── artistic/         # خدمات فنية
├── src/
│   ├── app/                      # App Router (الصفحات)
│   │   ├── layout.tsx            # التخطيط الجذري (RootLayout)
│   │   ├── template.tsx          # قالب مشترك (ClientLayout wrapper)
│   │   ├── page.tsx              # الصفحة الرئيسية (Server Component)
│   │   ├── HomePageClient.tsx    # مكون العميل للصفحة الرئيسية
│   │   ├── loading.tsx           # مؤشر التحميل
│   │   ├── not-found.tsx         # صفحة 404
│   │   ├── robots.ts             # ملف robots.txt
│   │   ├── sitemap.ts            # خريطة الموقع
│   │   ├── services/             # صفحة الخدمات
│   │   ├── offerings/            # صفحة التقديمات
│   │   ├── portfolio/            # صفحة معرض الأعمال
│   │   ├── about/                # صفحة من نحن
│   │   └── contact/              # صفحة التواصل
│   ├── components/               # المكونات المشتركة
│   │   ├── ClientLayout.tsx      # تخطيط العميل (Navbar + Footer + WhatsApp)
│   │   ├── Navbar.tsx            # شريط التنقل (ديسكتوب + جوال)
│   │   ├── Footer.tsx            # التذييل
│   │   ├── FloatingWhatsApp.tsx  # زر واتساب العائم
│   │   ├── ImageWithFallback.tsx # مكون صورة مع fallback
│   │   ├── OptimizedImage.tsx    # مكون صورة محسّن (بديل)
│   │   ├── PartnersSlider.tsx    # سلايدر الشركاء (Embla Carousel)
│   │   ├── Breadcrumbs.tsx       # مسار التنقل
│   │   ├── DallahLogo.tsx        # شعار الدلة SVG
│   │   ├── ImageSkeleton.tsx     # هيكل تحميل الصور
│   │   └── SEO.tsx               # مولد Metadata للصفحات
│   ├── lib/                      # المكتبات المساعدة
│   │   ├── images.ts             # مسارات الصور المركزية
│   │   ├── schema.ts             # Schema.org generators
│   │   └── utils.ts              # أدوات مساعدة (cn)
│   └── styles/
│       └── globals.css           # الأنماط العامة + Design System
├── scripts/
│   └── copy-images.sh            # سكريبت نسخ الصور
├── docs/                         # ملفات التوثيق
│   └── PROJECT_ANALYSIS.md       # التحليل التفصيلي
├── CLAUDE.md                     # هذا الملف (دليل الوكلاء)
├── README.md                     # الملف التعريفي
├── AUDIT_REPORT_AR.md            # تقرير التدقيق
├── next.config.js                # إعدادات Next.js
├── tailwind.config.js            # إعدادات Tailwind
├── tsconfig.json                 # إعدادات TypeScript
├── postcss.config.js             # إعدادات PostCSS
├── package.json                  # التبعيات والأوامر
└── .gitattributes                # Git LFS tracking
```

---

## 3. نمط البنية (Architecture Pattern)

### نمط الصفحات (Server + Client Split)
كل صفحة تتبع نمطاً ثابتاً:
1. **`page.tsx`** (Server Component): يحتوي Metadata + Schema.org JSON-LD + يستدعي مكون العميل
2. **`*Client.tsx`** (Client Component): يحتوي الواجهة التفاعلية

```
صفحة.tsx (Server) → Metadata + Schema → ClientComponent.tsx (Client) → الواجهة
```

### التخطيط (Layout Stack)
```
RootLayout (layout.tsx)
  └─ Template (template.tsx)
       └─ ClientLayout (Navbar + main + Footer + FloatingWhatsApp)
            └─ Page Content
```

---

## 4. التقنيات والمكتبات

| المكتبة | الإصدار | الاستخدام |
|---------|---------|----------|
| next | ^14.2.15 | إطار العمل الأساسي |
| react / react-dom | ^18.3.1 | واجهة المستخدم |
| motion | ^12.23.24 | الأنيميشن (Framer Motion) |
| embla-carousel-react | ^8.6.0 | سلايدر الشركاء |
| react-responsive-masonry | ^2.7.1 | (مثبّت لكن غير مستخدم حالياً) |
| lucide-react | ^0.487.0 | (مثبّت لكن غير مستخدم حالياً) |
| class-variance-authority | ^0.7.1 | (مثبّت لكن غير مستخدم حالياً) |
| clsx + tailwind-merge | latest | دمج الكلاسات (cn helper) |
| tailwindcss | ^3.4.0 | التنسيق |
| typescript | ^5.5.0 | نوع البيانات |

---

## 5. نظام التصميم (Design System)

### الألوان
```
charcoal:     #0f0f0f (الخلفية الأساسية)
charcoal-mid: #1a1a1a
charcoal-light: #242424
gold:         #B8860B (اللون الرئيسي)
gold-deep:    #8B6914
gold-bright:  #D4A017
gold-shimmer: #F0C040
cream:        #F5F5DC (النصوص)
```

### الخطوط
- **IBM Plex Sans Arabic**: الخط الأساسي (Google Fonts)
- **Tajawal**: الخط الثانوي (للعناوين)

### الكلاسات المخصصة (globals.css)
- `.gold-gradient-text` - نص بتدرج ذهبي متحرك
- `.card-luxury` - بطاقة فاخرة مع hover effect
- `.img-overlay` - طبقة gradient فوق الصور
- `.glass` / `.glass-light` - تأثير زجاجي
- `.whatsapp-pulse` - نبض زر واتساب
- `.bottom-nav` - شريط التنقل السفلي (جوال)

---

## 6. الأوامر المتاحة

```bash
npm run dev    # تشغيل بيئة التطوير (http://localhost:3000)
npm run build  # بناء للإنتاج
npm run start  # تشغيل الإنتاج
npm run lint   # فحص الكود
```

---

## 7. ملاحظات مهمة للوكلاء

### يجب الانتباه إلى:
1. **RTL (اتجاه اليمين لليسار)**: الموقع بالعربية، كل التنسيقات RTL
2. **Git LFS**: الصور تُتبّع عبر Git LFS (انظر `.gitattributes`)
3. **Client Components**: معظم الصفحات تعتمد على Client Components (لاحظ `"use client"`)
4. **Google Fonts**: الخطوط تُحمّل من `next/font/google` - قد تفشل في بيئات محظورة
5. **رقم الواتساب**: `966535636933` - يُستخدم في عدة أماكن
6. **SITE_URL**: `https://keifaldiafa.com` - معرّف في عدة ملفات

### المشاكل المعروفة:
1. **اعتماد مكثف على Client Components**: يزيد حجم JS المنقول للمتصفح
2. **أنيميشن كثيف بـ motion**: يؤثر على الأداء في الأجهزة المتوسطة
3. **مكتبات غير مستخدمة**: `lucide-react`, `react-responsive-masonry`, `class-variance-authority`
4. **صور كثيرة**: ~236 صورة webp في `public/images/`

### عند إجراء تعديلات:
1. **اقرأ الملف المعني بالكامل** قبل التعديل
2. **حافظ على نمط التصميم** (الألوان الذهبية، الخلفية الداكنة)
3. **تأكد من RTL** في أي مكون جديد
4. **حدّث هذا الملف** بعد أي تغيير جوهري
5. **حدّث `docs/PROJECT_ANALYSIS.md`** عند إضافة مكونات أو صفحات
6. **اختبر البناء** بـ `npm run build` بعد التعديلات

---

## 8. سجل التحديثات

| التاريخ | التحديث | الملفات المتأثرة |
|---------|---------|-----------------|
| 2026-03-08 | إنشاء ملف CLAUDE.md وملفات التوثيق | CLAUDE.md, README.md, docs/ |
| 2026-03-08 | إصلاح robots.ts (إزالة حظر `/_next/`) | src/app/robots.ts |
| 2026-03-08 | تحليل شامل وتوثيق المشروع | docs/PROJECT_ANALYSIS.md |

---

## 9. التواصل والمعلومات

- **الموقع**: https://keifaldiafa.com
- **واتساب**: +966535636933
- **البريد**: info@keifdiafa.com
- **إنستغرام**: @keifdiafa
- **العنوان**: الرياض، المملكة العربية السعودية
