"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HERO_IMG as heroImg } from "@/lib/images";

const values = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>, title: "الجودة أولاً", desc: "نلتزم بأعلى معايير الجودة في كل تفصيلة من خدماتنا" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>, title: "الأصالة والهوية", desc: "نحافظ على الهوية السعودية الأصيلة في كل خدماتنا" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>, title: "الاحترافية", desc: "فريقنا مدرب على أعلى معايير الاحترافية الدولية" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>, title: "الابتكار", desc: "نبتكر أساليب جديدة ومبهرة في تقديم خدمات الضيافة" },
];



export default function AboutClient() {
  return (
    <div>
      <Breadcrumbs />
      {/* HERO */}
      <section className="relative pt-6 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(184,134,11,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[#B8860B] mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ تعرّف علينا ✦</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[#F5F5DC] mb-4 font-tajawal" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15}}>من نحن في<br /><span className="gold-gradient-text">كيف الضيافة</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[#F5F5DC]/55 max-w-xl mx-auto text-sm leading-relaxed">منذ ٢٠١٦ ونحن نقدم خدمات الضيافة الفاخرة بأعلى معايير الجودة والاحترافية</motion.p>
        </div>
      </section>

      {/* STORY + STATS */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <ImageWithFallback src={heroImg} alt="كيف الضيافة" className="w-full h-full object-cover" />
            <div className="absolute inset-0 img-overlay" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }}>
            <h2 className="text-[#F5F5DC] mb-5" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 800}}>قصتنا</h2>
            <p className="text-[#F5F5DC]/55 text-sm leading-8 mb-6">بدأنا رحلتنا عام ٢٠١٦ برؤية واضحة: تقديم خدمات ضيافة فاخرة تعكس أصالة الثقافة السعودية مع لمسة عصرية مبتكرة. منذ ذلك الحين، قدمنا خدماتنا لأكثر من ٥٠٠ مناسبة، من حفلات الزفاف الفاخرة إلى الفعاليات الحكومية الكبرى.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { num: "+500", label: "مناسبة" },
                { num: "8+", label: "سنوات خبرة" },
                { num: "+200", label: "عميل" },
                { num: "100%", label: "رضا" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="text-center p-4 rounded-2xl" style={{ background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.12)" }}>
                  <p className="gold-gradient-text" style={{ fontSize: "1.5rem", fontWeight: 900 }}>{s.num}</p>
                  <p className="text-[#F5F5DC]/50 text-xs mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #0d0b04 0%, #0f0f0f 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="text-center mb-14">
            <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ قيمنا ✦</p>
            <h2 className="text-[#F5F5DC]" style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)", fontWeight: 800}}>ما يميزنا</h2>
            <div className="mt-4 rounded-full mx-auto" style={{ width: 90, height: 2, background: "linear-gradient(90deg, transparent, #B8860B 30%, #D4A017 60%, transparent)" }} />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} className="card-luxury p-6 rounded-2xl text-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[#B8860B] mx-auto mb-5" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.12), rgba(184,134,11,0.04))", border: "1px solid rgba(184,134,11,0.2)" }}>{v.icon}</div>
                <h3 className="text-[#F5F5DC] mb-3" style={{ fontSize: "1.05rem", fontWeight: 700 }}>{v.title}</h3>
                <p className="text-[#F5F5DC]/50 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
