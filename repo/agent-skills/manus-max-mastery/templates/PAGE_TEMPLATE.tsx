import type { Metadata } from "next";
import { generateWebPageSchema } from "@/lib/schema";

/**
 * ☕ قالب الصفحة المثالي لمشروع "كيف الضيافة"
 * هذا القالب يضمن:
 * 1. SEO متقدم (Metadata)
 * 2. بيانات منظمة (JSON-LD Schema)
 * 3. أداء عالٍ (Server Component)
 * 4. هوية بصرية فاخرة (Amiri + IBM Plex)
 */

export const metadata: Metadata = {
  title: "اسم الصفحة | كيف الضيافة",
  description: "وصف دقيق وجذاب للصفحة يعكس الفخامة والخدمة المقدمة.",
  keywords: ["كيف الضيافة", "ضيافة سعودية", "خدمة فاخرة", "اسم الخدمة"],
};

export default function PageTemplate() {
  const schema = generateWebPageSchema({
    name: "اسم الصفحة",
    description: "وصف الصفحة للـ Schema",
    url: "https://keifaldiafa.com/path-to-page",
  });

  return (
    <>
      {/* 📊 البيانات المنظمة للـ SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main id="main-content" className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* 🖋️ العنوان بخط Amiri الفاخر */}
          <h1 className="text-4xl md:text-6xl font-bold text-cream mb-8 font-amiri text-center">
            عنوان الصفحة الفاخر
          </h1>

          {/* 📝 المحتوى بخط IBM Plex Sans Arabic الواضح */}
          <div className="prose prose-invert max-w-none font-ibm-plex-arabic">
            <p className="text-lg text-cream/80 leading-relaxed">
              ابدأ بكتابة المحتوى هنا مع الحفاظ على لغة عربية فصيحة وراقية...
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
