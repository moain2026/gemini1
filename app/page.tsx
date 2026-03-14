import { Metadata } from "next";
import { HomePageClient } from "./HomePageClient";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/schema";

const SITE_URL = "https://keifaldiafa.com";

export const metadata: Metadata = {
  title: "كيف الضيافة | خدمات الضيافة الفاخرة في المملكة العربية السعودية",
  description:
    "كيف الضيافة - منصة خدمات الضيافة الفاخرة في المملكة العربية السعودية. قهوة سعودية، شاي، تقديمات راقية وفريق احترافي لمناسباتكم. +500 مناسبة ناجحة.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "كيف الضيافة | خدمات الضيافة الفاخرة في المملكة العربية السعودية",
    description:
      "منصة خدمات الضيافة الفاخرة - قهوة سعودية، شاي، تقديمات راقية وفريق احترافي",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "كيف الضيافة - خدمات الضيافة الفاخرة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كيف الضيافة | خدمات الضيافة الفاخرة",
    description: "منصة خدمات الضيافة الفاخرة في المملكة العربية السعودية",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const faqSchema = generateFAQSchema([
  {
    question: "ما هي خدمات كيف الضيافة؟",
    answer:
      "نقدم خدمات ضيافة فاخرة شاملة تتضمن: مضيفون ومضيفات محترفون، صباح قهوة سعودية، سقاء زمزم، خدمات فنية (خطاط، رسام، فرقة شعبية)، تأجير معدات، وتقديمات فاخرة من مشروبات حارة وباردة وحلويات.",
  },
  {
    question: "ما هي المناطق التي تغطيها كيف الضيافة؟",
    answer:
      "نغطي جميع مناطق المملكة العربية السعودية بما في ذلك الرياض، جدة، مكة المكرمة، المدينة المنورة، الدمام، الخبر، الطائف، أبها، تبوك، حائل، نجران وجازان.",
  },
  {
    question: "كيف يمكنني التواصل مع كيف الضيافة؟",
    answer:
      "يمكنك التواصل معنا عبر واتساب على الرقم +966508252134 أو البريد الإلكتروني info@keifdiafa.com أو زيارة صفحة التواصل على موقعنا.",
  },
  {
    question: "هل تقدمون استشارة مجانية؟",
    answer:
      "نعم، نقدم استشارة مجانية لتصميم تجربة ضيافة فاخرة تناسب مناسبتك. تواصل معنا عبر واتساب أو نموذج الاتصال.",
  },
]);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "الرئيسية", url: SITE_URL },
]);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomePageClient />
    </>
  );
}
