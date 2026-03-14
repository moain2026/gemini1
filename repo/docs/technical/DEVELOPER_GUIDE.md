# الدليل التقني للمبرمجين | Developer Guide 🛠️
> **كيف الضيافة: بنية تقنية متينة، أداء عالٍ، وأمان متقدم.**

---

## 🏗️ البنية التحتية (Architecture)
المشروع مبني على **Next.js 14** باستخدام **App Router**.

### 1. فصل المكونات (Component Separation)
- **Server Components:** توجد في `page.tsx` لكل صفحة. تُستخدم لتعريف الـ `metadata` والـ `schema.org`.
- **Client Components:** توجد في ملفات `*Client.tsx`. تُستخدم للتفاعل، الأنيميشن، والـ `state`.

### 2. نظام التنسيق (Styling System)
- **Tailwind CSS:** يُستخدم لكافة التنسيقات.
- **CSS Variables:** معرفة في `src/styles/globals.css` للألوان الأساسية (ذهبي، أسود، كريمي).
- **Global Styles:** تشمل إعدادات الخطوط (`Amiri`, `IBM Plex Sans Arabic`) وتنسيقات الـ `scrollbar` والـ `glassmorphism`.

---

## 📂 هيكل المجلدات (Folder Structure)
- `src/app/`: المسارات والصفحات.
- `src/components/`: المكونات القابلة لإعادة الاستخدام.
- `src/lib/`: المكتبات المساعدة (images, schema, utils).
- `src/styles/`: التنسيقات العالمية.
- `public/`: الأصول الثابتة (icons, images, manifest).
- `docs/`: التوثيق الشامل.

---

## 🚀 الأداء والتحسين (Performance)
- **SSG:** الصفحات تُبنى كصفحات ثابتة لضمان أقصى سرعة.
- **Image Optimization:** استخدام `next/image` مع `webp` و `shimmer placeholder`.
- **Code Splitting:** تقسيم الكود تلقائياً عبر Next.js.
- **Dynamic Imports:** للمكونات الثقيلة مثل `FloatingWhatsApp`.

---

## 🔒 الأمان (Security)
- **Security Headers:** معرفة في `next.config.js` (HSTS, CSP, X-Frame-Options, etc).
- **X-Powered-By:** معطل لزيادة الأمان.
- **CSP:** إعدادات صارمة للتحكم في المصادر الخارجية.

---

## 🛠️ أدوات التطوير (Dev Tools)
- **TypeScript:** لضمان أمان الأنواع.
- **ESLint:** لفحص جودة الكود.
- **Prettier:** لتنسيق الكود.
- **pnpm:** لإدارة التبعيات بسرعة.

---

## 📝 ملاحظات هامة
- عند إضافة صفحة جديدة، تأكد من تحديث `sitemap.ts` و `robots.ts`.
- التزم بنمط التسمية (PascalCase للمكونات، camelCase للمتغيرات).
- تأكد من دعم الـ `Accessibility` (ARIA labels, semantic HTML).

---
*تم إعداد هذا الدليل لضمان جودة الكود واستمرارية التطوير.*
