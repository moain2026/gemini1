"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { DallahLogo } from "@/components/DallahLogo";
import { navLinks, useWhatsAppUrl } from "@/components/Navbar";

export default function Footer() {
  const waUrl = useWhatsAppUrl();

  return (
    <footer
      className="relative pt-16 pb-32 md:pb-16 overflow-hidden"
      role="contentinfo"
      style={{
        background: "linear-gradient(180deg, #0f0f0f 0%, #080602 100%)",
        borderTop: "1px solid rgba(184,134,11,0.1)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #B8860B 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <DallahLogo size={44} />
              <div>
                <p className="gold-gradient-text" style={{ fontSize: "1.3rem", fontWeight: 800 }}>كيف الضيافة</p>
                <p className="text-[#B8860B]/50" style={{ fontSize: "0.62rem", letterSpacing: "0.25em" }}>KEIF AL-DIAFA · LUXURY HOSPITALITY</p>
              </div>
            </div>
            <p className="text-[#F5F5DC]/50 text-sm leading-relaxed max-w-sm">
              منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية الأصيلة. نحوّل كل مناسبة إلى ذكرى لا تُنسى.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <motion.a href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="واتساب" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full flex items-center justify-center min-h-[44px]" style={{ background: "#25D36612", border: "1px solid #25D36630", color: "#25D366" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </motion.a>
              <motion.a href="https://www.instagram.com/keifaldiafa" target="_blank" rel="noopener noreferrer" aria-label="إنستغرام" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full flex items-center justify-center min-h-[44px]" style={{ background: "#E1306C12", border: "1px solid #E1306C30", color: "#E1306C" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </motion.a>
              <motion.a href="https://www.tiktok.com/@keifaldiafa" target="_blank" rel="noopener noreferrer" aria-label="تيك توك" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full flex items-center justify-center min-h-[44px]" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
              </motion.a>
              <motion.a href="tel:+966508252134" aria-label="اتصل بنا" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full flex items-center justify-center min-h-[44px]" style={{ background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.3)", color: "#B8860B" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#B8860B] mb-4" style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em" }}>روابط سريعة</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#F5F5DC]/50 text-sm hover:text-[#B8860B] transition-colors duration-200 flex items-center gap-2 group min-h-[36px]">
                    <span className="w-3 h-px bg-[#B8860B]/30 group-hover:w-5 group-hover:bg-[#B8860B] transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#B8860B] mb-4" style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em" }}>معلومات التواصل</h3>
            <div className="space-y-3">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>, text: "+966 50 825 2134", href: "tel:+966508252134" },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>, text: "info@keifdiafa.com", href: "mailto:info@keifdiafa.com" },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>, text: "الرياض، المملكة العربية السعودية", href: "#" },
              ].map((item) => (
                <a key={item.text} href={item.href} className="flex items-start gap-3 text-[#F5F5DC]/50 text-sm hover:text-[#B8860B] transition-colors duration-200 group min-h-[36px]" target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  <span className="mt-0.5 flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>

            {/* Services summary */}
            <h3 className="text-[#B8860B] mb-3 mt-6" style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em" }}>خدماتنا</h3>
            <div className="flex flex-wrap gap-1.5">
              {["مضيفون", "مضيفات", "سفرجي", "سقاء", "سواس", "خطاط", "رسام", "فرقة شعبية"].map((s) => (
                <span key={s} className="text-[#F5F5DC]/40 text-xs px-2 py-1 rounded-full" style={{ background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.1)" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(184,134,11,0.08)" }}>
          <p className="text-[#F5F5DC]/30 text-xs">© {new Date().getFullYear()} كيف الضيافة. جميع الحقوق محفوظة.</p>
          <p className="text-[#B8860B]/30 text-xs" style={{ letterSpacing: "0.1em" }}>KEIF AL-DIAFA · LUXURY HOSPITALITY · KSA</p>
        </div>
      </div>
    </footer>
  );
}
