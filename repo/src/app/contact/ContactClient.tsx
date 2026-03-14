"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const WA = "966508252134";

const contactMethods = [
  { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>, label: "واتساب", value: "+966 50 825 2134", href: `https://wa.me/${WA}`, color: "#25D366" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: "اتصل بنا", value: "+966 50 825 2134", href: "tel:+966508252134", color: "#B8860B" },
  { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>, label: "إنستغرام", value: "@keifdiafa", href: "https://www.instagram.com/keifaldiafa", color: "#E1306C" },
  { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>, label: "تيك توك", value: "@keifaldiafa", href: "https://www.tiktok.com/@keifaldiafa", color: "#010101" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>, label: "البريد الإلكتروني", value: "info@keifdiafa.com", href: "mailto:info@keifdiafa.com", color: "#B8860B" },
];

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `مرحباً، أنا ${formData.name}
📱 ${formData.phone}
📧 ${formData.email || "غير محدد"}
🎯 الخدمة: ${formData.service || "غير محدد"}
📅 التاريخ: ${formData.date || "غير محدد"}
💬 ${formData.message}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.2), rgba(37,211,102,0.05))", border: "2px solid rgba(37,211,102,0.4)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </motion.div>
          <h2 className="text-[#F5F5DC] mb-3" style={{ fontSize: "1.8rem", fontWeight: 800}}>شكراً لتواصلك!</h2>
          <p className="text-[#F5F5DC]/55 text-sm mb-6">تم إرسال رسالتك عبر واتساب. فريقنا سيتواصل معك في أقرب وقت.</p>
          <button onClick={() => setSubmitted(false)} className="px-6 py-3 rounded-full text-[#B8860B] text-sm" style={{ border: "1px solid rgba(184,134,11,0.3)", fontWeight: 600 }}>إرسال رسالة أخرى</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs />
      {/* HERO */}
      <section className="relative pt-6 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(184,134,11,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[#B8860B] mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ تواصل معنا ✦</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[#F5F5DC] mb-4 font-tajawal" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15}}>نسعد <span className="gold-gradient-text">بخدمتكم</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[#F5F5DC]/55 max-w-xl mx-auto text-sm leading-relaxed">تواصل معنا واحصل على استشارة مجانية لتصميم تجربة ضيافة فاخرة لمناسبتك</motion.p>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="px-4 mb-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {contactMethods.map((method, i) => (
            <motion.a key={i} href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="card-luxury p-5 rounded-2xl text-center">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${method.color}18`, border: `1px solid ${method.color}40`, color: method.color }}>{method.icon}</div>
              <p className="text-[#F5F5DC] text-sm" style={{ fontWeight: 600 }}>{method.label}</p>
              <p className="text-[#F5F5DC]/40 text-xs mt-1">{method.value}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 sm:p-8 rounded-3xl" style={{ background: "linear-gradient(160deg, rgba(25,20,8,0.9), rgba(15,12,5,0.95))", border: "1px solid rgba(184,134,11,0.2)" }}>
            <h2 className="text-[#F5F5DC] mb-6" style={{ fontSize: "1.3rem", fontWeight: 700}}>أرسل لنا رسالتك</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[#F5F5DC]/50 text-xs mb-2">الاسم *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] text-[#F5F5DC] text-sm placeholder-[#F5F5DC]/25" style={{ border: "1px solid rgba(184,134,11,0.15)" }} placeholder="اسمك الكريم" />
              </div>
              <div>
                <label className="block text-[#F5F5DC]/50 text-xs mb-2">رقم الجوال *</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] text-[#F5F5DC] text-sm placeholder-[#F5F5DC]/25" style={{ border: "1px solid rgba(184,134,11,0.15)" }} placeholder="05xxxxxxxx" dir="ltr" />
              </div>
              <div>
                <label className="block text-[#F5F5DC]/50 text-xs mb-2">البريد الإلكتروني</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] text-[#F5F5DC] text-sm placeholder-[#F5F5DC]/25" style={{ border: "1px solid rgba(184,134,11,0.15)" }} placeholder="email@example.com" dir="ltr" />
              </div>
              <div>
                <label className="block text-[#F5F5DC]/50 text-xs mb-2">تاريخ المناسبة</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] text-[#F5F5DC] text-sm" style={{ border: "1px solid rgba(184,134,11,0.15)" }} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[#F5F5DC]/50 text-xs mb-2">نوع الخدمة</label>
              <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] text-[#F5F5DC] text-sm" style={{ border: "1px solid rgba(184,134,11,0.15)" }}>
                <option value="">اختر نوع الخدمة</option>
                <option value="ضيافة رجالية">ضيافة رجالية</option>
                <option value="ضيافة نسائية">ضيافة نسائية</option>
                <option value="خدمات فنية">خدمات فنية</option>
                <option value="تأجير معدات">تأجير معدات</option>
                <option value="باقة متكاملة">باقة متكاملة</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-[#F5F5DC]/50 text-xs mb-2">رسالتك *</label>
              <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] text-[#F5F5DC] text-sm placeholder-[#F5F5DC]/25 resize-none" style={{ border: "1px solid rgba(184,134,11,0.15)" }} placeholder="اكتب تفاصيل مناسبتك هنا..." />
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-3 py-4 rounded-full text-white" style={{ background: "linear-gradient(135deg, #1da851, #25D366)", fontWeight: 700, fontSize: "1rem", boxShadow: "0 6px 25px rgba(37,211,102,0.35)" }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              إرسال عبر واتساب
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="mb-10">
            <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ تغطيتنا ✦</p>
            <h2 className="text-[#F5F5DC]" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 800}}>نصل إليكم في جميع مناطق المملكة</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "الطائف", "أبها", "تبوك", "حائل", "نجران", "جازان"].map((city, i) => (
              <motion.span key={city} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.05 }} className="px-4 py-2 rounded-full text-sm" style={{ background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.15)", color: "rgba(245,245,220,0.6)" }}>{city}</motion.span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
