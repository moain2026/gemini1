"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  HOT_DRINKS_IMAGES,
  COLD_DRINKS_IMAGES,
  DATES_IMAGES,
  SWEETS_IMAGES,
  PASTRY_IMAGES,
  SERVING_EQUIPMENT_IMAGES,
} from "@/lib/images";

const WA = "966508252134";

interface OfferingItem {
  name: string;
  description: string;
  img: string;
  height: "short" | "medium" | "tall";
}
interface CategoryData {
  id: string;
  label: string;
  icon: string;
  description: string;
  items: OfferingItem[];
}

const heightMap = { short: "180px", medium: "260px", tall: "360px" };

const categories: CategoryData[] = [
  {
    id: "hot", label: "المشروبات الحارة", icon: "☕", description: "قهوة سعودية أصيلة وشاي فاخر ومشروبات دافئة",
    items: [
      { name: "القهوة التركية",      description: "قهوة تركية بالوجه التقليدي معدّة بحرفية",                 img: HOT_DRINKS_IMAGES.turkishCoffee,    height: "tall"   },
      { name: "الشاي الأحمر",        description: "شاي أحمر فاخر بنكهة غنية ومميزة",                        img: HOT_DRINKS_IMAGES.redTea,            height: "medium" },
      { name: "الشاي الأخضر",        description: "شاي أخضر طبيعي منعش ومفيد للصحة",                         img: HOT_DRINKS_IMAGES.greenTea,          height: "short"  },
      { name: "شاي الكرك",           description: "شاي كرك بالحليب والتوابل على الطريقة الأصيلة",            img: HOT_DRINKS_IMAGES.karakTea,          height: "tall"   },
      { name: "السحلب",              description: "سحلب ساخن بالقرفة والمكسرات لمسة شتوية فاخرة",            img: HOT_DRINKS_IMAGES.sahlab,            height: "medium" },
      { name: "زنجبيل بالأناناس",    description: "مشروب الزنجبيل الدافئ بالأناناس الطبيعي منعش وصحي",       img: HOT_DRINKS_IMAGES.gingerPineapple,   height: "short"  },
      { name: "الكابتشينو",          description: "كابتشينو إيطالي فاخر بالرغوة الكريمية",                   img: HOT_DRINKS_IMAGES.cappuccino,        height: "tall"   },
    ],
  },
  {
    id: "cold", label: "المشروبات الباردة", icon: "🧊", description: "مشروبات منعشة وباردة تليق بالمناسبات",
    items: [
      { name: "عصائر طبيعية طازجة",       description: "عصائر فواكه طبيعية طازجة معصورة لحظتها",           img: COLD_DRINKS_IMAGES.freshJuice,  height: "tall"   },
      { name: "موهيتو بنكهات مختلفة",     description: "موهيتو منعش بنكهات متعددة مع النعناع الطازج",      img: COLD_DRINKS_IMAGES.mojito,      height: "medium" },
      { name: "عرق سوس",                  description: "مشروب عرق السوس الأصيل المنعش والمفيد للصحة",       img: COLD_DRINKS_IMAGES.arakSous,    height: "short"  },
      { name: "كركديه",                   description: "شراب الكركديه الأحمر المنعش بطعمه الفريد",           img: COLD_DRINKS_IMAGES.karkade,     height: "tall"   },
      { name: "تمر هندي",                 description: "شراب التمر الهندي الحامض المنعش بالنكهة الأصيلة",   img: COLD_DRINKS_IMAGES.tamarind,    height: "medium" },
      { name: "سوبيا",                    description: "سوبيا بجوز الهند والقرفة مشروب تراثي سعودي أصيل",   img: COLD_DRINKS_IMAGES.sobia,       height: "short"  },
      { name: "سموذي فواكه",              description: "سموذي طازج من أفضل الفواكه الموسمية",               img: COLD_DRINKS_IMAGES.smoothie,    height: "tall"   },
      { name: "آيس لاتيه",               description: "لاتيه مثلج بنكهات مختلفة من أجود مطاحن القهوة",     img: COLD_DRINKS_IMAGES.icedLatte,   height: "medium" },
    ],
  },
  {
    id: "dates", label: "التمور الفاخرة", icon: "🌴", description: "أجود أنواع التمور السعودية الفاخرة",
    items: [
      { name: "تمر سكري محشي",             description: "تمر سكري فاخر محشو بالمكسرات الملكية",              img: DATES_IMAGES.sukariStuffed,      height: "tall"   },
      { name: "تمر خلاص محشي",             description: "تمر خلاص محشي بالقشدة واللوز المحمص",               img: DATES_IMAGES.khalasStuffed,      height: "medium" },
      { name: "تمر خلاص بالسمسم والطحينية", description: "تمر خلاص فاخر بالسمسم المحمص والطحينية الطبيعية",  img: DATES_IMAGES.khalasSesame,       height: "short"  },
      { name: "تمر محشي بالمكسرات",         description: "تشكيلة تمور محشية بأنواع مكسرات فاخرة",            img: DATES_IMAGES.stuffedDates,       height: "tall"   },
      { name: "تمر محشي مشكّل",            description: "تمور محشية بمزيج من الشوكولاتة والمكسرات",          img: DATES_IMAGES.stuffedDates2,      height: "medium" },
      { name: "تمر محشي فاخر",             description: "تشكيلة فاخرة من التمور المحشية للمناسبات",          img: DATES_IMAGES.stuffedDates3,      height: "short"  },
      { name: "تمر محشي ملكي",             description: "تمور ملكية محشية بالفستق والكاجو",                  img: DATES_IMAGES.stuffedDates5,      height: "tall"   },
      { name: "نخلة تمر سكري",             description: "تمر سكري طبيعي معروض بأناقة على نخلة تقديم",       img: DATES_IMAGES.palmSukari,         height: "medium" },
      { name: "نخلة تمر سكري محشي",        description: "نخلة تقديم فاخرة بتمر سكري محشي بالمكسرات",        img: DATES_IMAGES.palmSukariStuffed,  height: "tall"   },
      { name: "نخلة تمر خلاص محشي",        description: "نخلة تقديم أنيقة بتمر خلاص محشي بالقشدة",          img: DATES_IMAGES.palmKhalasStuffed,  height: "short"  },
      { name: "تمور مشكّلة",               description: "تشكيلة متنوعة من أجود التمور السعودية",             img: DATES_IMAGES.datesAssorted,      height: "medium" },
    ],
  },
  {
    id: "sweets", label: "الحلويات", icon: "🍰", description: "حلويات شرقية وغربية فاخرة بأيدي أمهر الحلوانيين",
    items: [
      { name: "بقلاوة فاخرة",           description: "بقلاوة تركية أصلية بالفستق الحلبي",                     img: SWEETS_IMAGES.baklava,            height: "tall"   },
      { name: "كنافة نابلسية",          description: "كنافة بالجبن والقطر على الطريقة النابلسية الأصيلة",       img: SWEETS_IMAGES.kunafa,             height: "medium" },
      { name: "شوكولاتة باتشي",         description: "شوكولاتة باتشي الفاخرة بتشكيلة أنيقة للمناسبات",        img: SWEETS_IMAGES.patchiChocolate,    height: "short"  },
      { name: "شوكولاتة بستاني",        description: "شوكولاتة بستاني الفاخرة بنكهات متنوعة ومميزة",           img: SWEETS_IMAGES.bostaniChocolate,   height: "tall"   },
      { name: "كرواسون بالشوكولاتة",    description: "كرواسون فرنسي محشو بالشوكولاتة الداكنة الفاخرة",         img: SWEETS_IMAGES.chocolateCroissant, height: "medium" },
      { name: "بان كيك",                description: "بان كيك طازج بأنواع التوبينج الفاخرة",                   img: SWEETS_IMAGES.pancake,            height: "short"  },
    ],
  },
  {
    id: "pastry", label: "المعجنات", icon: "🥐", description: "معجنات طازجة متنوعة محضرة بعناية",
    items: [
      { name: "سمبوسة",               description: "سمبوسة ذهبية مقرمشة بحشوات اللحم والجبن المتنوعة",       img: PASTRY_IMAGES.samosa,          height: "tall"   },
      { name: "فطائر بالفواكه",        description: "فطائر محشوة بالفواكه الموسمية الطازجة",                    img: PASTRY_IMAGES.fruitPie,        height: "medium" },
      { name: "معجنات عربية",          description: "تشكيلة معجنات عربية أصيلة بحشوات متنوعة",                 img: PASTRY_IMAGES.arabicPastry,    height: "short"  },
      { name: "معجنات متنوعة",         description: "باقة متنوعة من المعجنات الطازجة للمناسبات",               img: PASTRY_IMAGES.assortedPastry,  height: "tall"   },
      { name: "مقبلات فاخرة",          description: "مقبلات ومعجنات صغيرة فاخرة لحفلات الاستقبال",             img: PASTRY_IMAGES.appetizers,      height: "medium" },
    ],
  },
  {
    id: "equipment", label: "معدات التقديم", icon: "⚙️", description: "أدوات ومعدات تقديم فاخرة للإيجار",
    items: [
      { name: "دلة قهوة ذهبية",         description: "دلة قهوة عربية ذهبية فاخرة بتصميم تراثي أنيق",          img: SERVING_EQUIPMENT_IMAGES.goldenDallah,  height: "tall"   },
      { name: "دلة قهوة تراثية",        description: "دلة قهوة عربية تقليدية بلمسة من الأصالة السعودية",       img: SERVING_EQUIPMENT_IMAGES.coffeeDallah,  height: "medium" },
      { name: "فنجان قهوة",             description: "فناجين قهوة عربية أنيقة بزخارف ذهبية",                   img: SERVING_EQUIPMENT_IMAGES.coffeeFinjan,  height: "short"  },
      { name: "أكواب قهوة",             description: "طقم أكواب قهوة فاخرة بتصميم عصري أنيق",                  img: SERVING_EQUIPMENT_IMAGES.coffeeCups,    height: "tall"   },
      { name: "كأس قهوة",              description: "كؤوس قهوة كريستالية بلمسات ذهبية راقية",                  img: SERVING_EQUIPMENT_IMAGES.coffeeGlass,   height: "medium" },
      { name: "كأس زجاجي",             description: "كؤوس زجاجية شفافة بتصميم أنيق للمناسبات",                 img: SERVING_EQUIPMENT_IMAGES.glassCup,      height: "short"  },
      { name: "كوب شاي",               description: "أكواب شاي بتصميم تراثي سعودي أنيق",                       img: SERVING_EQUIPMENT_IMAGES.teaCup,        height: "tall"   },
      { name: "كوب شاي أبيض",          description: "أكواب شاي بيضاء كلاسيكية بحواف ذهبية",                    img: SERVING_EQUIPMENT_IMAGES.whiteTeaCup,   height: "medium" },
      { name: "كوب شاي زجاجي",         description: "أكواب شاي زجاجية أنيقة تُظهر جمال لون المشروب",           img: SERVING_EQUIPMENT_IMAGES.glassTeaCup,   height: "short"  },
      { name: "كوب قهوة",              description: "أكواب قهوة عصرية بتصميم فاخر للمناسبات الراقية",           img: SERVING_EQUIPMENT_IMAGES.coffeeMug,     height: "tall"   },
    ],
  },
];

// ─────────────────────────────────────────────
// Lightbox مع سحب ذكي
// ─────────────────────────────────────────────
function Lightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: OfferingItem[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);
  const bgOpacity = useTransform(dragX, [-200, 0, 200], [0.5, 1, 0.5]);
  const item = items[index];

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= items.length) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, items.length]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
      const { velocity, offset } = info;
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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  goTo(index - 1);
      if (e.key === "ArrowLeft")   goTo(index + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goTo, index]);

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ?  300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -300 :  300, opacity: 0, scale: 0.92 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(5,4,2,0.92)", backdropFilter: "blur(18px)", opacity: bgOpacity }}
      />

      {/* إغلاق */}
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

      {/* عداد */}
      <div className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full text-xs text-[#B8860B]"
        style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(184,134,11,0.2)" }}>
        {index + 1} / {items.length}
      </div>

      {/* أزرار تنقل */}
      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); goTo(index - 1); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-[#F5F5DC]/70 hover:text-[#B8860B] transition-colors"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(184,134,11,0.2)" }} aria-label="السابق">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {index < items.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); goTo(index + 1); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-[#F5F5DC]/70 hover:text-[#B8860B] transition-colors"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(184,134,11,0.2)" }} aria-label="التالي">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* الصورة */}
      <div className="relative z-10 w-full max-w-md px-4" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={item.name}
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
              boxShadow: "0 40px 80px rgba(0,0,0,0.8)",
            }}
            onDragEnd={handleDragEnd}
            className="rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
          >
            <div className="relative flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
              <ImageWithFallback src={item.img} alt={item.name} className="w-full object-contain" style={{ maxHeight: "50vh" }} priority />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full text-[#F5F5DC]/40 text-xs"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                اسحب للتنقل
              </div>
            </div>
            <div className="p-5">
              <h2 className="text-[#F5F5DC] mb-1.5" style={{ fontSize: "1.3rem", fontWeight: 800 }}>{item.name}</h2>
              <p className="text-[#F5F5DC]/55 text-sm mb-5">{item.description}</p>
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent(`مرحباً، أود الاستفسار عن ${item.name}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-white text-sm"
                style={{ background: "linear-gradient(135deg, #1da851, #25D366)", fontWeight: 700, boxShadow: "0 6px 25px rgba(37,211,102,0.3)" }}
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                استفسر عبر واتساب
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* نقاط تنقل */}
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === index ? "24px" : "8px", height: "8px", background: i === index ? "#B8860B" : "rgba(184,134,11,0.25)" }}
              aria-label={`العنصر ${i + 1}`}
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
function MasonryCard({ item, onClick }: { item: OfferingItem; onClick: () => void }) {
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
      aria-label={`عرض ${item.name}`}
      className="relative rounded-2xl overflow-hidden cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#B8860B]"
      style={{ height: heightMap[item.height], boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
    >
      <ImageWithFallback src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,4,2,0.88) 0%, rgba(5,4,2,0.1) 55%, transparent 100%)" }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(184,134,11,0.12) 0%, transparent 70%)" }} />

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-[#F5F5DC]" style={{ fontSize: "0.9rem", fontWeight: 700 }}>{item.name}</h3>
        <p className="text-[#F5F5DC]/50 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{item.description}</p>
      </div>

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
export default function OfferingsClient() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const currentCat = categories[activeCategory];

  const openLightbox = useCallback((itemName: string) => {
    const idx = currentCat.items.findIndex((i) => i.name === itemName);
    if (idx !== -1) setLightboxIndex(idx);
  }, [currentCat]);

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
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[#B8860B] mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ تقديماتنا ✦</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[#F5F5DC] mb-4 font-tajawal" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15 }}>
            تقديمات فاخرة<br /><span className="gold-gradient-text">تليق بضيوفكم</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[#F5F5DC]/55 max-w-xl mx-auto text-sm leading-relaxed">
            أرقى المشروبات والتقديمات من قهوة سعودية أصيلة وشاي فاخر وحلويات شرقية وغربية
          </motion.p>
        </div>
      </section>

      {/* TABS */}
      <section className="px-4 mb-10">
        <div className="max-w-5xl mx-auto flex justify-center gap-2 flex-wrap">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveCategory(i); setLightboxIndex(null); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-300"
              style={{
                background: activeCategory === i ? "rgba(184,134,11,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeCategory === i ? "rgba(184,134,11,0.4)" : "rgba(184,134,11,0.1)"}`,
                color: activeCategory === i ? "#B8860B" : "rgba(245,245,220,0.5)",
                fontWeight: activeCategory === i ? 700 : 400,
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-3"
            >
              {currentCat.items.map((item) => (
                <div key={item.name} className="break-inside-avoid mb-3">
                  <MasonryCard item={item} onClick={() => openLightbox(item.name)} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={currentCat.items}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
