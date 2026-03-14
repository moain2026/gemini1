import { Metadata } from "next";
import AboutClient from "./AboutClient";
import { generatePageMetadata } from "@/components/SEO";
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/schema";

const SITE_URL = "https://keifaldiafa.com";

export const metadata: Metadata = generatePageMetadata({
  title: "من نحن",
  description:
    "تعرف على كيف الضيافة - أكثر من 8 سنوات خبرة في تقديم خدمات الضيافة الفاخرة في المملكة العربية السعودية. فريق محترف وتغطية شاملة لجميع المناطق.",
  path: "/about",
  keywords: [
    "عن كيف الضيافة",
    "شركة ضيافة سعودية",
    "خبرة ضيافة",
    "فريق ضيافة محترف",
    "تاريخ كيف الضيافة",
  ],
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "الرئيسية", url: SITE_URL },
  { name: "من نحن", url: `${SITE_URL}/about` },
]);

const webPageSchema = generateWebPageSchema({
  name: "من نحن - كيف الضيافة",
  description:
    "تعرف على كيف الضيافة - أكثر من 8 سنوات خبرة في تقديم خدمات الضيافة الفاخرة",
  url: `${SITE_URL}/about`,
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <AboutClient />
    </>
  );
}
