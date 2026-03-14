# كيف الضيافة | Keif Al-Diafa

<div align="center">

**منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

[الموقع المباشر](https://keifaldiafa.com) | [التوثيق](docs/PROJECT_ANALYSIS.md)

</div>

---

## نبذة عن المشروع

موقع **كيف الضيافة** هو منصة تعريفية فاخرة لشركة خدمات الضيافة السعودية، مصمم بأعلى معايير الجودة البصرية والتقنية. يقدم الموقع خدمات الضيافة المتنوعة من مضيفين ومضيفات محترفين، وخدمات القهوة السعودية، والخدمات الفنية والتراثية.

### المميزات الرئيسية
- تصميم فاخر بالهوية السعودية (ذهبي + داكن)
- دعم كامل للغة العربية (RTL)
- أنيميشن سلس مع motion (Framer Motion)
- SEO متقدم (Schema.org, OpenGraph, Sitemap)
- PWA جاهز (manifest.json + icons)
- إمكانية الوصول (Accessibility) محسّنة
- أمان متقدم (Security Headers, CSP)
- تحميل كسول للصور مع placeholder shimmer

---

## التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|----------|
| **Next.js 14** | App Router + SSG + Image Optimization |
| **React 18** | واجهة المستخدم التفاعلية |
| **TypeScript 5.5** | أمان الأنواع |
| **Tailwind CSS 3.4** | التنسيق المرن |
| **motion (Framer)** | الأنيميشن والحركات |
| **Embla Carousel** | سلايدر الشركاء |
| **Git LFS** | إدارة الصور الكبيرة |

---

## التثبيت والتشغيل

### المتطلبات
- Node.js >= 18.x
- npm أو yarn أو pnpm

### التثبيت
```bash
# استنساخ المستودع
git clone https://github.com/moain2026/keif-aldiafa-website.git
cd keif-aldiafa-website

# تثبيت التبعيات
npm install

# تشغيل بيئة التطوير
npm run dev
```

### الأوامر المتاحة
```bash
npm run dev    # بيئة التطوير (http://localhost:3000)
npm run build  # بناء الإنتاج
npm run start  # تشغيل الإنتاج
npm run lint   # فحص الكود
```

---

## هيكل المشروع

```
src/
├── app/                    # صفحات App Router
│   ├── layout.tsx          # التخطيط الجذري
│   ├── template.tsx        # قالب مشترك
│   ├── page.tsx            # الصفحة الرئيسية
│   ├── services/           # خدماتنا
│   ├── offerings/          # تقديماتنا
│   ├── portfolio/          # معرض الأعمال
│   ├── about/              # من نحن
│   ├── contact/            # تواصل معنا
│   ├── robots.ts           # robots.txt
│   └── sitemap.ts          # خريطة الموقع
├── components/             # المكونات المشتركة
│   ├── Navbar.tsx           # شريط التنقل
│   ├── Footer.tsx           # التذييل
│   ├── ImageWithFallback.tsx # مكون صور محسّن
│   ├── PartnersSlider.tsx   # سلايدر الشركاء
│   └── ...
├── lib/                    # المكتبات المساعدة
│   ├── images.ts           # مسارات الصور
│   ├── schema.ts           # بيانات Schema.org
│   └── utils.ts            # أدوات مساعدة
└── styles/
    └── globals.css         # نظام التصميم
```

---

## الصفحات

| الصفحة | المسار | الوصف |
|--------|--------|-------|
| الرئيسية | `/` | شاشة بطل + إحصائيات + أقسام متعددة |
| خدماتنا | `/services` | 3 فئات (رجالية، نسائية، فنية) مع تفاصيل |
| تقديماتنا | `/offerings` | مشروبات + حلويات + معدات للإيجار |
| معرض الأعمال | `/portfolio` | معرض صور مع فلترة وتصفية |
| من نحن | `/about` | قصة الشركة + القيم + الفريق + الجدول الزمني |
| تواصل معنا | `/contact` | نموذج تواصل + واتساب + معلومات الاتصال |

---

## SEO والبيانات المنظمة

الموقع يتضمن:
- **Metadata** شامل لكل صفحة (title, description, keywords)
- **OpenGraph + Twitter Cards** لمشاركة وسائل التواصل
- **Schema.org JSON-LD**:
  - Organization
  - LocalBusiness
  - WebSite
  - BreadcrumbList
  - FAQPage
  - Service
  - WebPage
- **sitemap.xml** ديناميكي
- **robots.txt** محسّن
- **Canonical URLs** لكل صفحة

---

## الأمان

- **Security Headers** شاملة في `next.config.js`:
  - Strict-Transport-Security (HSTS)
  - Content-Security-Policy (CSP)
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
- إخفاء `X-Powered-By`
- ضغط الردود (Compression)
- ETag generation

---

## الأداء

- **SSG**: الصفحات تُبنى كصفحات ثابتة
- **Image Optimization**: WebP/AVIF عبر next/image
- **Lazy Loading**: تحميل كسول للصور
- **Code Splitting**: تقسيم الكود تلقائياً
- **Cache Headers**: تخزين مؤقت طويل للأصول الثابتة
- **Font Display Swap**: عرض فوري للنصوص

---

## للوكلاء الذكيين

> اقرأ ملف [`CLAUDE.md`](CLAUDE.md) للحصول على تعليمات مفصلة حول كيفية التعامل مع هذا المشروع.

---

## الترخيص

جميع الحقوق محفوظة - كيف الضيافة 2024-2026

---

## التواصل

- **واتساب**: [+966535636933](https://wa.me/966535636933)
- **البريد**: [info@keifdiafa.com](mailto:info@keifdiafa.com)
- **إنستغرام**: [@keifdiafa](https://instagram.com/keifdiafa)
- **الموقع**: [keifaldiafa.com](https://keifaldiafa.com)
