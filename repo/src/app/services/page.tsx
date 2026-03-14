import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { generatePageMetadata } from "@/components/SEO";
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateWebPageSchema,
} from "@/lib/schema";

const SITE_URL = "https://keifaldiafa.com";

export const metadata: Metadata = generatePageMetadata({
  title: "خدماتنا",
  description:
    "خدمات الضيافة الفاخرة - مضيفون ومضيفات محترفون، صباح قهوة سعودية، سقاء زمزم، خدمات فنية وتراثية، معدات فاخرة وأكثر. تغطية شاملة لجميع مناطق المملكة.",
  path: "/services",
  keywords: [
    "مضيفون",
    "مضيفات",
    "صباح قهوة",
    "سقاء زمزم",
    "خدمات فنية",
    "خطاط",
    "رسام",
    "فرقة شعبية",
    "خيمة تراثية",
    "ضيافة مناسبات",
  ],
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "الرئيسية", url: SITE_URL },
  { name: "خدماتنا", url: `${SITE_URL}/services` },
]);

const serviceSchema = generateServiceSchema({
  name: "خدمات الضيافة الفاخرة",
  description:
    "مضيفون ومضيفات محترفون، صباح قهوة سعودية، سقاء زمزم، خدمات فنية وتراثية، معدات فاخرة",
  url: `${SITE_URL}/services`,
});

const webPageSchema = generateWebPageSchema({
  name: "خدماتنا - كيف الضيافة",
  description:
    "استعرض مجموعة خدمات الضيافة الفاخرة لدينا - مضيفون، قهوة سعودية، خدمات فنية والمزيد",
  url: `${SITE_URL}/services`,
});

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <ServicesClient />
    </>
  );
}
