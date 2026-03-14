"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  SERVICE_IMAGES,
  OUTFIT_IMAGES,
  SERVICES_MALE,
  SERVICES_FEMALE,
  SERVICES_FEMALE_EXTENDED,
  SERVICES_ARTISTIC,
} from "@/lib/images";

const WA = "966508252134";

interface OutfitItem { name: string; img: string; desc: string; }
interface ServiceItem { id: string; title: string; subtitle: string; img: string; description: string; features: string[]; outfits: OutfitItem[]; }
interface ServiceCategory { key: string; label: string; sublabel: string; icon: string; color: string; services: ServiceItem[]; }

const categories: ServiceCategory[] = [
  {
    key: "male", label: "الخدمات الرجالية", sublabel: "Male Hospitality", icon: "👨‍💼", color: "#B8860B",
    services: [
      { id: "hosts", title: "مضيفون", subtitle: "Male Hosts", img: SERVICE_IMAGES.maleWaiter, description: "مضيفون محترفون مدربون على أعلى معايير الضيافة الدولية والأصالة العربية.", features: ["زي رسمي أنيق", "خبرة +5 سنوات", "لغات متعددة", "بروتوكول VIP"], outfits: [{ name: "حزام", img: OUTFIT_IMAGES.hizam, desc: "زي رسمي بحزام أنيق" }, { name: "دقلة", img: OUTFIT_IMAGES.dagla, desc: "دقلة سعودية أصيلة" }, { name: "دقلة وجنبية", img: OUTFIT_IMAGES.daglaJanbiya, desc: "دقلة مع جنبية تراثية" }, { name: "سديرية", img: OUTFIT_IMAGES.sideriya, desc: "سديرية أنيقة" }, { name: "مكاوي", img: OUTFIT_IMAGES.makkawi, desc: "زي مكاوي تراثي" }] },
      { id: "zamzam", title: "سقّاء زمزم", subtitle: "Zamzam Server", img: SERVICE_IMAGES.zamzam, description: "سقاء زمزم بأسلوب تراثي فاخر يعكس أصالة الضيافة السعودية.", features: ["زي تراثي أصيل", "إبريق نحاسي فاخر", "خدمة شخصية", "تقديم فوري"], outfits: [{ name: "زي السقّاء التراثي", img: OUTFIT_IMAGES.safarjia, desc: "زي تراثي أصيل" }] },
      { id: "safarjia", title: "صبّاح قهوة / سفرجي", subtitle: "Coffee Butler", img: SERVICE_IMAGES.butler, description: "صبّاح قهوة محترف يقدم القهوة السعودية الأصيلة بأسلوب يليق بضيوفكم.", features: ["قهوة سعودية طازجة", "دلال نحاسية أصيلة", "تمر وحلويات", "خدمة مستمرة"], outfits: [{ name: "ثوب سعودي مع بشت", img: OUTFIT_IMAGES.safarjia, desc: "زي تقليدي فاخر" }] },
      { id: "sawas", title: "سوّاس", subtitle: "Valet Service", img: SERVICE_IMAGES.sawas, description: "خدمة صف السيارات بأعلى معايير الاحترافية والأمان.", features: ["خدمة سريعة", "تأمين شامل", "فريق مدرب", "تنظيم المواقف"], outfits: [{ name: "بدلة رسمية", img: OUTFIT_IMAGES.sawas, desc: "بدلة رسمية أنيقة" }] },
    ],
  },
  {
    key: "female", label: "الخدمات النسائية", sublabel: "Female Hospitality", icon: "👩‍💼", color: "#D4A017",
    services: [
      {
        id: "hostesses",
        title: "مضيفات",
        subtitle: "Female Hosts",
        img: SERVICES_FEMALE_EXTENDED.hostesses[0],
        description: "مضيفات محترفات بمظهر راقٍ وخدمة استثنائية لمناسباتكم النسائية.",
        features: ["مظهر أنيق وراقٍ", "خدمة احترافية", "تنسيق المناسبات", "استقبال VIP"],
        outfits: [
          { name: "عباءة فاخرة - 1", img: SERVICES_FEMALE_EXTENDED.hostesses[0], desc: "عباءة مصممة خصيصاً" },
          { name: "عباءة فاخرة - 2", img: SERVICES_FEMALE_EXTENDED.hostesses[1], desc: "عباءة راقية بتصميم مميز" },
        ],
      },
      {
        id: "safarjiat",
        title: "سفرجيات",
        subtitle: "Female Butlers",
        img: SERVICES_FEMALE_EXTENDED.safarjiat[0],
        description: "سفرجيات محترفات يقدمن القهوة السعودية والشاي والتمر بأسلوب راقٍ للمناسبات النسائية.",
        features: ["قهوة سعودية طازجة", "دلال فاخرة", "تمر وحلويات", "خدمة متواصلة"],
        outfits: [
          { name: "زي سفرجية - 1", img: SERVICES_FEMALE_EXTENDED.safarjiat[0], desc: "زي أنيق خاص بالسفرجيات" },
          { name: "زي سفرجية - 2", img: SERVICES_FEMALE_EXTENDED.safarjiat[1], desc: "زي رسمي فاخر" },
        ],
      },
      {
        id: "cleaning-female",
        title: "عاملات نظافة",
        subtitle: "Cleaning Staff",
        img: SERVICES_FEMALE_EXTENDED.cleaning[0],
        description: "طاقم نظافة نسائي مدرب ومتخصص لضمان نظافة المكان طوال فترة المناسبة.",
        features: ["تنظيف مستمر", "معدات حديثة", "فريق مدرب", "خدمة سريعة"],
        outfits: [
          { name: "زي عمل - 1", img: SERVICES_FEMALE_EXTENDED.cleaning[0], desc: "زي عمل أنيق ومريح" },
          { name: "زي عمل - 2", img: SERVICES_FEMALE_EXTENDED.cleaning[1], desc: "زي عمل مميز" },
        ],
      },
    ],
  },
  {
    key: "artistic", label: "الخدمات الفنية", sublabel: "Artistic Services", icon: "🎨", color: "#F0C040",
    services: [
      { id: "calligrapher", title: "خطاط", subtitle: "Arabic Calligrapher", img: SERVICE_IMAGES.calligrapher, description: "خطاط محترف يضيف لمسة فنية راقية لمناسباتكم.", features: ["خط عربي أصيل", "كتابة أسماء الضيوف", "لوحات فنية حية", "هدايا مخصصة"], outfits: [] },
      { id: "artist", title: "رسّام بورتريه", subtitle: "Portrait Artist", img: SERVICE_IMAGES.artist, description: "رسام بورتريه محترف يرسم لوحات حية لضيوفكم.", features: ["رسم حي سريع", "أنماط متنوعة", "هدايا تذكارية", "تجربة تفاعلية"], outfits: [] },
      { id: "folkband", title: "فرقة شعبية", subtitle: "Folk Band", img: SERVICE_IMAGES.folkband, description: "فرقة شعبية تضيف أجواء حماسية أصيلة لمناسباتكم.", features: ["عرض حي", "أغاني تراثية", "أجواء حماسية", "فقرات متنوعة"], outfits: [] },
      { id: "heritage-tent", title: "خيمة تراثية", subtitle: "Heritage Tent", img: SERVICE_IMAGES.heritageTent, description: "خيمة تراثية سعودية مجهزة بالكامل لإضافة لمسة أصالة.", features: ["تجهيز كامل", "ديكور تراثي", "إضاءة مميزة", "أحجام متعددة"], outfits: [] },
      { id: "counter", title: "كاونتر ضيافة", subtitle: "Hospitality Counter", img: SERVICE_IMAGES.counter, description: "كاونتر ضيافة فاخر مجهز بالكامل.", features: ["تصميم أنيق", "تجهيزات كاملة", "أحجام متعددة", "توصيل وتركيب"], outfits: [] },
      { id: "photo-booth", title: "ركن التصوير", subtitle: "Photo Booth", img: SERVICE_IMAGES.photoBooth, description: "ركن تصوير احترافي لتوثيق لحظات مناسباتكم.", features: ["خلفيات متنوعة", "طباعة فورية", "إكسسوارات ممتعة", "صور رقمية"], outfits: [] },
      { id: "buffet", title: "بوفيه متكامل", subtitle: "Full Buffet", img: SERVICE_IMAGES.buffet, description: "تجهيز بوفيه متكامل بأطباق فاخرة ومتنوعة.", features: ["أطباق عالمية", "تقديم فاخر", "معدات حديثة", "فريق متخصص"], outfits: [] },
      { id: "mobile-table", title: "طاولة متنقلة", subtitle: "Mobile Table", img: SERVICE_IMAGES.mobileTable, description: "طاولة متنقلة فاخرة لتقديم المشروبات والحلويات.", features: ["تصميم أنيق", "حركة سهلة", "أحجام متعددة", "تخصيص كامل"], outfits: [] },
    ],
  },
];

function ServiceModal({ service, onClose }: { service: ServiceItem; onClose: () => void }) {
  const [selectedOutfit, setSelectedOutfit] = useState(0);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={`تفاصيل خدمة ${service.title}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ type: "spring", damping: 25, stiffness: 250 }} onClick={(e) => e.stopPropagation()} className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl" style={{ background: "linear-gradient(160deg, rgba(25,20,8,0.98), rgba(15,12,5,0.99))", border: "1px solid rgba(184,134,11,0.25)", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}>
        <button onClick={onClose} className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-[#F5F5DC]/60 hover:text-[#F5F5DC] transition-colors" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>✕</button>
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
          <ImageWithFallback
            src={service.outfits.length > 0 ? service.outfits[selectedOutfit].img : service.img}
            alt={service.outfits.length > 0 ? service.outfits[selectedOutfit].name : service.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 img-overlay" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-[#B8860B] text-xs mb-1" style={{ letterSpacing: "0.15em" }}>{service.subtitle}</p>
            <h2 className="text-[#F5F5DC]" style={{ fontSize: "1.8rem", fontWeight: 800}}>{service.title}</h2>
            {service.outfits.length > 0 && (
              <p className="text-[#F5F5DC]/70 text-sm mt-1">{service.outfits[selectedOutfit].desc}</p>
            )}
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-[#F5F5DC]/65 text-sm leading-relaxed mb-6">{service.description}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2"><div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.3)" }}><svg viewBox="0 0 16 16" fill="#B8860B" className="w-3 h-3"><path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" /></svg></div><span className="text-[#F5F5DC]/60 text-sm">{f}</span></div>
            ))}
          </div>
          {service.outfits.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[#B8860B] text-sm mb-3" style={{ fontWeight: 700 }}>الأزياء المتاحة</h3>
              <div className="flex gap-3 overflow-x-auto scroll-hide pb-2">
                {service.outfits.map((o, i) => (
                  <button key={i} onClick={() => setSelectedOutfit(i)} className="flex-shrink-0 w-24 rounded-xl overflow-hidden transition-all duration-300" style={{ border: selectedOutfit === i ? "2px solid #B8860B" : "2px solid rgba(184,134,11,0.1)", opacity: selectedOutfit === i ? 1 : 0.6 }}>
                    <ImageWithFallback src={o.img} alt={o.name} className="w-full h-20 object-cover" />
                    <p className="text-center text-xs py-1 text-[#F5F5DC]/60">{o.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن خدمة ${service.title}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 rounded-full text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #1da851, #25D366)", fontWeight: 700, fontSize: "1rem", boxShadow: "0 6px 25px rgba(37,211,102,0.35)" }}>
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            احجز عبر واتساب
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceCard({ service, onClick, index }: { service: ServiceItem; onClick: () => void; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.06, duration: 0.5 }} onClick={onClick} className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: "3/4" }}>
      <ImageWithFallback src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 img-overlay" />
      <div className="absolute inset-0 bg-[#B8860B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[#B8860B]" style={{ fontSize: "0.65rem", background: "rgba(10,8,2,0.85)", backdropFilter: "blur(10px)", border: "1px solid rgba(184,134,11,0.3)", letterSpacing: "0.05em" }}>{service.subtitle}</div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-[#F5F5DC]" style={{ fontSize: "1.05rem", fontWeight: 700 }}>{service.title}</h3>
        <p className="text-[#F5F5DC]/50 text-xs mt-1 line-clamp-2">{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function ServicesClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    if (selectedService) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedService]);

  const currentCategory = categories[activeTab];

  return (
    <div>
      <Breadcrumbs />
      {/* HERO */}
      <section className="relative pt-6 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(184,134,11,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[#B8860B] mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ خدماتنا ✦</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[#F5F5DC] mb-4 font-tajawal" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15}}>باقة متكاملة من<br /><span className="gold-gradient-text">الضيافة الفاخرة</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[#F5F5DC]/55 max-w-xl mx-auto text-sm leading-relaxed">اكتشف مجموعة خدماتنا المتكاملة المصممة لتلبية جميع احتياجات الضيافة في مناسباتكم</motion.p>
        </div>
      </section>

      {/* TABS */}
      <section className="px-4 mb-12">
        <div className="max-w-5xl mx-auto flex justify-center gap-3 flex-wrap">
          {categories.map((cat, i) => (
            <motion.button key={cat.key} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab(i)} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300" style={{ background: activeTab === i ? `rgba(184,134,11,0.15)` : "rgba(255,255,255,0.03)", border: `1px solid ${activeTab === i ? "rgba(184,134,11,0.4)" : "rgba(184,134,11,0.1)"}`, color: activeTab === i ? "#B8860B" : "rgba(245,245,220,0.5)", fontWeight: activeTab === i ? 700 : 400 }}>
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentCategory.services.map((service, i) => (
                  <ServiceCard key={service.id} service={service} onClick={() => setSelectedService(service)} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="mt-16 text-center p-8 sm:p-12 rounded-3xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(25,20,8,0.9), rgba(15,12,5,0.95))", border: "1px solid rgba(184,134,11,0.2)" }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(184,134,11,0.06) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="text-[#F5F5DC] mb-3" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 800}}>لم تجد ما تبحث عنه؟</h2>
              <p className="text-[#F5F5DC]/50 text-sm mb-6 max-w-lg mx-auto">تواصل معنا وسنصمم لك باقة ضيافة مخصصة تناسب مناسبتك</p>
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white" style={{ background: "linear-gradient(135deg, #1da851, #25D366)", fontWeight: 700, boxShadow: "0 6px 25px rgba(37,211,102,0.35)" }}>
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                تواصل عبر واتساب
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
      </AnimatePresence>
    </div>
  );
}
