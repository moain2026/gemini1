"use client";

import { useRef, lazy, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

import { HERO_IMG, HERO_MOBILE_IMG } from "@/lib/images";

const PartnersSlider = lazy(() =>
  import("@/components/PartnersSlider").then((m) => ({ default: m.PartnersSlider }))
);
const WA = "966508252134";

const whyCards = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>, title: "خبرة متميزة", desc: "أكثر من ٨ سنوات في تقديم خدمات الضيافة الفاخرة للمناسبات الكبرى والمحافل الرسمية" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>, title: "فريق احترافي", desc: "كوادر مدربة على أعلى معايير الضيافة الدولية والأصالة العربية" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>, title: "تقديمات فاخرة", desc: "أرقى المشروبات والتقديمات من قهوة سعودية وشاي وحلويات فاخرة" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>, title: "تغطية المملكة", desc: "نصل إلى جميع مناطق المملكة بأسطول من المعدات الفاخرة" },
];

function SectionHeader({ label, title, center = true }: { label?: string; title: string; center?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className={`mb-14 ${center ? "text-center" : ""}`}>
      {label && <p className={`text-[#B8860B] mb-3 ${center ? "text-center" : ""}`} style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ {label} ✦</p>}
      <h2 className={`text-[#F5F5DC] font-tajawal ${center ? "text-center" : ""}`} style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)", fontWeight: 800, lineHeight: 1.3 }}>{title}</h2>
      <div className="mt-4 mb-1 rounded-full" style={{ width: center ? 90 : 70, height: 2, background: "linear-gradient(90deg, transparent, #B8860B 30%, #D4A017 60%, transparent)", margin: "12px auto 0" }} />
    </motion.div>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-[#B8860B]" style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }} animate={{ y: [0, -30, 0], opacity: [0.15, 0.5, 0.15], scale: [1, 1.5, 1] }} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

export function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] max-h-[950px] overflow-hidden" aria-label="الشاشة الرئيسية">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          {/* صورة الهواتف والأجهزة الصغيرة — High-Res Local */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src={HERO_MOBILE_IMG}
              alt="كيف الضيافة - خدمات الضيافة الفاخرة"
              className="object-cover object-center"
              priority={true}
              quality={90}
              sizes="100vw"
              fill={true}
              unoptimized={true}
            />
          </div>
          {/* صورة الشاشات الكبيرة واللابتوب — High-Res Local */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src={HERO_IMG}
              alt="كيف الضيافة - خدمات الضيافة الفاخرة"
              className="object-cover object-center"
              priority={true}
              quality={90}
              sizes="100vw"
              fill={true}
              unoptimized={true}
            />
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/60 via-[#0f0f0f]/25 to-[#0f0f0f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/40 via-transparent to-transparent" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(184,134,11,0.06) 0%, transparent 65%)" }} />
        <Particles />
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-l from-[#B8860B] to-transparent" />
            <span className="text-[#B8860B]" style={{ fontSize: "0.75rem", letterSpacing: "0.4em" }}>SINCE 2016</span>
            <div className="h-px w-12 bg-gradient-to-r from-[#B8860B] to-transparent" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="text-[#F5F5DC] mb-2 font-tajawal" style={{ fontSize: "clamp(3rem, 10vw, 6rem)", fontWeight: 900, lineHeight: 1.1, textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}>كيف الضيافة</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mb-4" style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)", letterSpacing: "0.3em", color: "#B8860B" }}>KEIF AL-DIAFA</motion.p>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-6" style={{ width: 120, height: 2, background: "linear-gradient(90deg, transparent, #B8860B, #D4A017, transparent)" }} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} className="text-[#F5F5DC]/75 max-w-xl mb-10" style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.8 }}>منصة تجربة فاخرة تعكس جودة الضيافة السعودية الأصيلة<br className="hidden sm:block" />نحوّل كل مناسبة إلى لحظة لا تُنسى</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.85 }} className="flex gap-3 flex-wrap justify-center">
            <Link href="/services" className="px-8 py-3.5 rounded-full text-[#0f0f0f] transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #B8860B, #D4A017, #B8860B)", backgroundSize: "200% auto", fontWeight: 800, fontSize: "0.95rem", boxShadow: "0 6px 25px rgba(184,134,11,0.4)" }}>اكتشف خدماتنا</Link>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full transition-all duration-300 hover:bg-white/10" style={{ border: "1px solid rgba(184,134,11,0.5)", color: "#B8860B", fontWeight: 600, fontSize: "0.95rem", backdropFilter: "blur(10px)" }}>تواصل معنا</a>
          </motion.div>
          <motion.div className="absolute bottom-8" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <div className="flex flex-col items-center gap-2" style={{ opacity: 0.5 }}>
              <span className="text-[#B8860B] text-xs" style={{ letterSpacing: "0.2em" }}>اكتشف</span>
              <div className="w-5 h-8 rounded-full border border-[#B8860B]/40 flex items-start justify-center pt-1.5"><motion.div className="w-1 h-2 rounded-full bg-[#B8860B]" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} /></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHY US */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <SectionHeader label="مزايانا التنافسية" title="لماذا كيف الضيافة؟" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyCards.map((card, i) => (<motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1, duration: 0.5 }} className="card-luxury p-6 rounded-2xl relative overflow-hidden group"><div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-[#B8860B]/5 group-hover:bg-[#B8860B]/10 transition-colors duration-500" /><div className="w-14 h-14 rounded-xl flex items-center justify-center text-[#B8860B] mb-5 relative z-10" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.12), rgba(184,134,11,0.04))", border: "1px solid rgba(184,134,11,0.2)" }}>{card.icon}</div><h3 className="text-[#F5F5DC] mb-3 relative z-10" style={{ fontSize: "1.05rem", fontWeight: 700 }}>{card.title}</h3><p className="text-[#F5F5DC]/50 text-sm leading-relaxed relative z-10">{card.desc}</p></motion.div>))}
        </div>
      </section>

      <Suspense fallback={<div className="py-16 text-center text-[#B8860B]/30 text-sm">جاري تحميل الشركاء...</div>}>
        <PartnersSlider />
      </Suspense>

      {/* CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(184,134,11,0.08) 0%, transparent 70%)" }} />
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-[#B8860B] mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ ابدأ رحلتك ✦</p>
          <h2 className="text-[#F5F5DC] mb-5 font-tajawal" style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.25 }}>جاهزون لإضافة لمسة<span className="gold-gradient-text"> فخامة </span>لمناسبتك</h2>
          <p className="text-[#F5F5DC]/55 mb-10 leading-relaxed text-sm sm:text-base">تواصل معنا الآن واحصل على استشارة مجانية لتصميم تجربة ضيافة فاخرة لا تُنسى</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.a href={`https://wa.me/${WA}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #1da851, #25D366)", fontWeight: 700, fontSize: "1rem", boxShadow: "0 6px 25px rgba(37,211,102,0.35)" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              تواصل عبر واتساب
            </motion.a>
            <motion.a href="tel:+966508252134" className="flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#B8860B]/10" style={{ border: "1px solid rgba(184,134,11,0.35)", color: "#B8860B", fontWeight: 600, fontSize: "1rem" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              اتصل بنا الآن
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
