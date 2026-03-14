"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  HERO_IMG as heroImg,
  COFFEE_IMG as coffeeImg,
  CATERING_IMG as cateringImg,
  TEA_IMG as teaImg,
  EVENT_IMG as eventImg,
  WAITER_IMG as waiterImg,
  PORTFOLIO_IMG as portfolioImg,
  DATES_IMG as datesImg,
  FOOD_IMG as foodImg,
} from "@/lib/images";

const WA = "966508252134";

type FilterType = "all" | "occasions" | "events";

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  category: FilterType;
  tags: string[];
  /** ارتفاع نسبي للـ Masonry: "short" | "medium" | "tall" */
  height: "short" | "medium" | "tall";
}

const projects: Project[] = [
  // المناسبات
  { id: 1,  image: eventImg,     title: "حفل زفاف فاخر",       description: "ضيافة متكاملة لحفل زفاف ٣٠٠ ضيف بأرقى التقديمات",                category: "occasions", tags: ["زفاف", "ضيافة", "فاخر"],       height: "tall"   },
  { id: 4,  image: teaImg,       title: "جلسة شاي ملكية",      description: "جلسة شاي فاخرة بأفضل أنواع الشاي العالمي",                    category: "occasions", tags: ["شاي", "فاخر", "ملكي"],         height: "short"  },
  { id: 5,  image: waiterImg,    title: "حفل تخرج جامعي",      description: "فريق مضيفين محترف لحفل تخرج بجامعة الملك سعود",               category: "occasions", tags: ["تخرج", "جامعة", "احتفال"],     height: "medium" },
  { id: 8,  image: portfolioImg, title: "حفل افتتاح مشروع",    description: "ضيافة فاخرة لحفل افتتاح مشروع عقاري كبير",                    category: "occasions", tags: ["افتتاح", "عقاري", "فاخر"],     height: "tall"   },
  { id: 12, image: coffeeImg,    title: "ضيافة VIP",            description: "ضيافة خاصة لكبار الضيوف في مناسبة خاصة",                      category: "occasions", tags: ["VIP", "مناسبة", "خاص"],        height: "short"  },
  // الفعاليات
  { id: 3,  image: cateringImg,  title: "مؤتمر الأعمال الدولي", description: "ضيافة كاملة لمؤتمر ٥٠٠ مشارك على مدار ثلاثة أيام",          category: "events",    tags: ["مؤتمر", "أعمال", "دولي"],      height: "medium" },
  { id: 2,  image: coffeeImg,    title: "ضيافة شركة أرامكو",    description: "تقديم القهوة السعودية بأسلوب تراثي في فعالية شركة أرامكو",    category: "events",    tags: ["شركات", "قهوة", "فعالية"],     height: "tall"   },
  { id: 11, image: heroImg,      title: "فعالية موسم الرياض",   description: "مشاركتنا في تقديم ضيافة موسم الرياض الثالث",                  category: "events",    tags: ["موسم", "رياض", "فعالية"],      height: "short"  },
  { id: 6,  image: datesImg,     title: "فعالية شركة سابك",     description: "تجهيز ضيافة فاخرة لفعالية شركة سابك السنوية",                 category: "events",    tags: ["شركات", "فعالية", "سنوية"],    height: "medium" },
  { id: 10, image: foodImg,      title: "فعالية وزارة الطاقة",  description: "تجهيز بوفيه فاخر لفعالية حكومية كبرى",                        category: "events",    tags: ["حكومية", "فعالية", "فاخر"],    height: "tall"   },
];

const filters: { key: FilterType; label: string; icon: string }[] = [
  { key: "all",       label: "الكل",       icon: "◎" },
  { key: "occasions", label: "المناسبات",  icon: "🎉" },
  { key: "events",    label: "الفعاليات",  icon: "🏢" },
];

const heightMap = { short: "200px", medium: "280px", tall: "380px" };

// ─────────────────────────────────────────────
// Lightbox مع سحب ذكي للانتقال بين الصور
// ─────────────────────────────────────────────
function Lightbox({
  projects,
  initialIndex,
  onClose,
}: {
  projects: Project[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);
  const bgOpacity = useTransform(dragX, [-200, 0, 200], [0.5, 1, 0.5]);
  const project = projects[index];

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= projects.length) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, projects.length]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
      const { velocity, offset } = info;
      // سرعة السحب أو مسافة كافية تُشغّل الانتقال
      if (velocity.x < -300 || offset.x < -80) {
        goTo(index + 1);
      } else if (velocity.x > 300 || offset.x > 80) {
        goTo(index - 1);
      } else {
        animate(dragX, 0, { type: "spring", stiffness: 400, damping: 40 });
      }
    },
    [goTo, index, dragX]
  );

  // إغلاق بـ Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(index - 1);
      if (e.key === "ArrowLeft")  goTo(index + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goTo, index]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:  (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.92 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center"
      onClick={onClose}
    >
      {/* خلفية معتمة */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(5,4,2,0.92)", backdropFilter: "blur(18px)", opacity: bgOpacity }}
      />

      {/* زر إغلاق */}
      <button
        onClick={onClose}
        className="absolute top-5 left-5 z-20 w-11 h-11 rounded-full flex items-center justify-center text-[#F5F5DC]/70 hover:text-[#F5F5DC] transition-colors"
        style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(184,134,11,0.2)" }}
        aria-label="إغلاق"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* عداد الصور */}
      <div className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full text-xs text-[#B8860B]"
        style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(184,134,11,0.2)" }}>
        {index + 1} / {projects.length}
      </div>

      {/* أزرار التنقل */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); goTo(index - 1); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-[#F5F5DC]/70 hover:text-[#B8860B] transition-colors"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(184,134,11,0.2)" }}
          aria-label="السابق"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {index < projects.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goTo(index + 1); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-[#F5F5DC]/70 hover:text-[#B8860B] transition-colors"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(184,134,11,0.2)" }}
          aria-label="التالي"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* الصورة الرئيسية */}
      <div className="relative z-10 w-full max-w-3xl px-4" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 38 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            style={{
              x: dragX,
              background: "linear-gradient(160deg, rgba(25,20,8,0.98), rgba(15,12,5,0.99))",
              border: "1px solid rgba(184,134,11,0.25)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(184,134,11,0.08)",
            }}
            onDragEnd={handleDragEnd}
            className="rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
          >
            <div className="relative flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full object-contain"
                style={{ maxHeight: "50vh" }}
                priority
              />
              {/* تلميح السحب */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full text-[#F5F5DC]/40 text-xs"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                اسحب للتنقل
              </div>
            </div>
            <div className="p-6">
              <div className="flex gap-1.5 flex-wrap mb-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-[#B8860B] text-xs"
                    style={{ background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.2)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1.4rem", fontWeight: 800 }}>{project.title}</h2>
              <p className="text-[#F5F5DC]/55 text-sm mb-5">{project.description}</p>
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent(`مرحباً، رأيت مشروع "${project.title}" وأود حجز خدمة مشابهة.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-white text-sm"
                style={{ background: "linear-gradient(135deg, #1da851, #25D366)", fontWeight: 700, boxShadow: "0 6px 25px rgba(37,211,102,0.3)" }}
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                احجز خدمة مشابهة
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* نقاط التنقل */}
        <div className="flex justify-center gap-2 mt-5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? "24px" : "8px",
                height: "8px",
                background: i === index ? "#B8860B" : "rgba(184,134,11,0.25)",
              }}
              aria-label={`الصورة ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// بطاقة Masonry
// ─────────────────────────────────────────────
function MasonryCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      aria-label={`عرض ${project.title}`}
      className="relative rounded-2xl overflow-hidden cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#B8860B]"
      style={{
        height: heightMap[project.height],
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <ImageWithFallback
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {/* تدرج سفلي */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,4,2,0.88) 0%, rgba(5,4,2,0.1) 55%, transparent 100%)" }} />
      {/* تأثير ذهبي عند hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(184,134,11,0.12) 0%, transparent 70%)" }} />

      {/* تاغات */}
      <div className="absolute top-3 right-3 flex gap-1 flex-wrap">
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-full text-[#B8860B]"
            style={{ fontSize: "0.58rem", background: "rgba(5,4,2,0.82)", backdropFilter: "blur(10px)", border: "1px solid rgba(184,134,11,0.3)" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* معلومات الصورة */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-[#F5F5DC]" style={{ fontSize: "0.92rem", fontWeight: 700 }}>{project.title}</h3>
        <p className="text-[#F5F5DC]/50 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* أيقونة تكبير */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
        style={{ background: "rgba(184,134,11,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(184,134,11,0.4)" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// الصفحة الرئيسية
// ─────────────────────────────────────────────
export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  const openLightbox = useCallback((projectId: number) => {
    const idx = filtered.findIndex((p) => p.id === projectId);
    if (idx !== -1) setLightboxIndex(idx);
  }, [filtered]);

  // منع scroll عند فتح الـ lightbox
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <div>
      <Breadcrumbs />

      {/* HERO */}
      <section className="relative pt-6 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(184,134,11,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[#B8860B] mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ أعمالنا ✦</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[#F5F5DC] mb-4 font-tajawal" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15 }}>
            معرض <span className="gold-gradient-text">أعمالنا</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[#F5F5DC]/55 max-w-xl mx-auto text-sm leading-relaxed">
            لمحة عن مناسباتنا السابقة وخدماتنا المتميزة التي قدمناها لعملائنا الكرام
          </motion.p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-4 mb-10">
        <div className="max-w-5xl mx-auto flex justify-center gap-2 flex-wrap">
          {filters.map((f) => (
            <motion.button
              key={f.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveFilter(f.key); setLightboxIndex(null); }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm transition-all duration-300"
              style={{
                background: activeFilter === f.key ? "rgba(184,134,11,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeFilter === f.key ? "rgba(184,134,11,0.4)" : "rgba(184,134,11,0.1)"}`,
                color: activeFilter === f.key ? "#B8860B" : "rgba(245,245,220,0.5)",
                fontWeight: activeFilter === f.key ? 700 : 400,
              }}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-3"
            >
              {filtered.map((project) => (
                <div key={project.id} className="break-inside-avoid mb-3">
                  <MasonryCard project={project} onClick={() => openLightbox(project.id)} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-16 text-center p-8 sm:p-12 rounded-3xl relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(25,20,8,0.9), rgba(15,12,5,0.95))", border: "1px solid rgba(184,134,11,0.2)" }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(184,134,11,0.06) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="text-[#F5F5DC] mb-3" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 800 }}>أعجبك ما رأيت؟</h2>
              <p className="text-[#F5F5DC]/50 text-sm mb-6 max-w-lg mx-auto">تواصل معنا الآن ودعنا نصنع لك مناسبة استثنائية</p>
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent("مرحباً، لقد اطلعت على معرض أعمالكم وأرغب في ترتيب مماثل.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #1da851, #25D366)", fontWeight: 700, boxShadow: "0 6px 25px rgba(37,211,102,0.35)" }}
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                احجز الآن عبر واتساب
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            projects={filtered}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
