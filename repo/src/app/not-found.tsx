import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة - 404",
  description: "عذرا، الصفحة التي تبحث عنها غير موجودة. يمكنك العودة للصفحة الرئيسية.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1
          className="gold-gradient-text mb-4 font-tajawal"
          style={{
            fontSize: "clamp(5rem, 15vw, 10rem)",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <h2
          className="text-[#F5F5DC] mb-3 font-tajawal"
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
          }}
        >
          الصفحة غير موجودة
        </h2>
        <p className="text-[#F5F5DC]/50 text-sm mb-8 leading-relaxed">
          عذرا، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[#0f0f0f]"
          style={{
            background: "linear-gradient(135deg, #B8860B, #D4A017)",
            fontWeight: 700,
            boxShadow: "0 4px 20px rgba(184,134,11,0.3)",
          }}
        >
          <span>&#8594;</span>
          <span>العودة للرئيسية</span>
        </Link>
      </div>
    </div>
  );
}
