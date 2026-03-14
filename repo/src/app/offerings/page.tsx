import { Metadata } from "next";
import OfferingsClient from "./OfferingsClient";
import { generatePageMetadata } from "@/components/SEO";
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateWebPageSchema,
} from "@/lib/schema";

const SITE_URL = "https://keifaldiafa.com";

export const metadata: Metadata = generatePageMetadata({
  title: "تقديماتنا",
  description:
    "أرقى التقديمات والمشروبات - قهوة سعودية أصيلة، شاي فاخر، حلويات شرقية وغربية، تمور فاخرة ومعدات ضيافة للإيجار. جودة لا مثيل لها.",
  path: "/offerings",
  keywords: [
    "قهوة سعودية",
    "شاي فاخر",
    "حلويات",
    "تمور فاخرة",
    "مشروبات باردة",
    "تقديمات مناسبات",
    "ضيافة عربية",
    "معدات ضيافة",
  ],
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "الرئيسية", url: SITE_URL },
  { name: "تقديماتنا", url: `${SITE_URL}/offerings` },
]);

const serviceSchema = generateServiceSchema({
  name: "تقديمات الضيافة الفاخرة",
  description:
    "قهوة سعودية أصيلة، شاي فاخر، حلويات شرقية وغربية، تمور فاخرة ومعدات ضيافة",
  url: `${SITE_URL}/offerings`,
});

const webPageSchema = generateWebPageSchema({
  name: "تقديماتنا - كيف الضيافة",
  description:
    "استعرض مجموعة التقديمات الفاخرة من المشروبات والحلويات والتمور",
  url: `${SITE_URL}/offerings`,
});

export default function OfferingsPage() {
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
      <OfferingsClient />
    </>
  );
}
