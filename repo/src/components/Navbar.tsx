"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { DallahLogo } from "@/components/DallahLogo";

const WA_NUMBER = "966508252134";

const navLinks = [
  { href: "/", label: "الرئيسية", icon: "⌂" },
  { href: "/services", label: "خدماتنا", icon: "◈" },
  { href: "/offerings", label: "تقديماتنا", icon: "☕" },
  { href: "/portfolio", label: "معرض الأعمال", icon: "◻" },
  { href: "/about", label: "من نحن", icon: "✦" },
  { href: "/contact", label: "تواصل معنا", icon: "✉" },
];

function useWhatsAppUrl() {
  const pathname = usePathname() ?? "/";
  const messages: Record<string, string> = {
    "/services": "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.",
    "/offerings": "مرحباً، أود الاستفسار عن تقديماتكم وتوزيعاتكم الفاخرة.",
    "/portfolio": "مرحباً، رأيت أعمالكم وأود الاستفسار عن باقات الضيافة.",
    "/about": "مرحباً، تعرفت على كيف الضيافة وأود الاستفسار عن خدماتكم.",
    "/contact": "مرحباً، أود التواصل معكم للاستفسار عن خدمات الضيافة.",
  };
  const msg = messages[pathname] ?? "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export { navLinks, useWhatsAppUrl, WA_NUMBER };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const pathname = usePathname() ?? "/";
  const waUrl = useWhatsAppUrl();

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setScrollDir(y > lastY ? "down" : "up");
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* ══════════════════════ HEADER ══════════════════════ */}
      <motion.header
        initial={false}
        animate={{
          y: scrolled && scrollDir === "down" ? -80 : 0,
          backgroundColor: scrolled ? "rgba(10,8,2,0.95)" : "transparent",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,134,11,0.12)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
        }}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="الصفحة الرئيسية">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <DallahLogo size={40} />
              <motion.div
                className="absolute -inset-1 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(184,134,11,0.15) 0%, transparent 70%)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            <div className="block">
              <span className="block gold-gradient-text" style={{ fontSize: "1.15rem", fontWeight: 800, lineHeight: 1.1 }}>
                كيف الضيافة
              </span>
              <span className="block text-[#B8860B]/60" style={{ fontSize: "0.6rem", letterSpacing: "0.25em" }}>
                KEIF AL-DIAFA
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="التنقل الرئيسي">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-lg text-sm transition-all duration-200 min-h-[44px] flex items-center ${
                  isActive(link.href) ? "text-[#B8860B]" : "text-[#F5F5DC]/70 hover:text-[#B8860B]"
                }`}
                style={{ fontWeight: isActive(link.href) ? 600 : 400 }}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.2)" }}
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#0f0f0f] min-h-[44px]"
              style={{
                background: "linear-gradient(135deg, #B8860B, #D4A017)",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(184,134,11,0.3)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              تواصل الآن
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════ BOTTOM MOBILE NAV ══════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom bottom-nav" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="flex gap-3">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#25D366] min-h-[44px]" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)" }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              <span style={{ fontWeight: 600 }}>واتساب</span>
            </a>
            <a href="tel:+966508252134" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#B8860B] min-h-[44px]" style={{ background: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.2)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span style={{ fontWeight: 600 }}>اتصال</span>
            </a>
          </div>
          <motion.button onClick={toggleMenu} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[#0f0f0f] min-h-[44px]" style={{ background: menuOpen ? "linear-gradient(135deg, #8B6914, #B8860B)" : "linear-gradient(135deg, #B8860B, #D4A017)", fontWeight: 700, fontSize: "0.85rem", boxShadow: "0 4px 20px rgba(184,134,11,0.4)" }} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen} aria-controls="mobile-nav-menu">
            <motion.span aria-hidden="true" animate={{ rotate: menuOpen ? 45 : 0 }} transition={{ duration: 0.25 }}>{menuOpen ? "✕" : "☰"}</motion.span>
            <span>القائمة</span>
          </motion.button>
        </div>
      </div>

      {/* ══════════════════════ SLIDE-UP MENU ══════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={closeMenu} />
            <motion.nav initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} id="mobile-nav-menu" className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(18,14,5,0.98) 0%, rgba(12,10,3,0.99) 100%)", backdropFilter: "blur(30px) saturate(200%)", borderTop: "1px solid rgba(184,134,11,0.25)", boxShadow: "0 -20px 80px rgba(184,134,11,0.1)", paddingBottom: "max(100px, calc(80px + env(safe-area-inset-bottom)))" }} role="navigation" aria-label="القائمة الرئيسية">
              <div className="max-w-lg mx-auto px-5 pt-6">
                <div className="w-10 h-1 bg-[#B8860B]/40 rounded-full mx-auto mb-5" />
                <div className="flex items-center justify-center gap-3 mb-6">
                  <DallahLogo size={32} />
                  <span className="gold-gradient-text" style={{ fontSize: "1.1rem", fontWeight: 800 }}>كيف الضيافة</span>
                </div>
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.045, duration: 0.25 }}>
                      <Link href={link.href} onClick={closeMenu} className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all duration-200 min-h-[48px] ${isActive(link.href) ? "text-[#B8860B]" : "text-[#F5F5DC]/75 hover:text-[#B8860B] hover:bg-[#B8860B]/5"}`} style={{ background: isActive(link.href) ? "rgba(184,134,11,0.1)" : undefined, border: isActive(link.href) ? "1px solid rgba(184,134,11,0.25)" : "1px solid transparent", fontWeight: isActive(link.href) ? 700 : 400, fontSize: "1rem" }}>
                        <div className="flex items-center gap-3">
                          <span className="text-[#B8860B]/60 text-sm">{link.icon}</span>
                          <span>{link.label}</span>
                        </div>
                        {isActive(link.href) && <span className="text-[#B8860B] text-xs">●</span>}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
