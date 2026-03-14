import { Metadata } from "next";
import ContactClient from "./ContactClient";
import { generatePageMetadata } from "@/components/SEO";
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/schema";

const SITE_URL = "https://keifaldiafa.com";

export const metadata: Metadata = generatePageMetadata({
  title: "تواصل معنا",
  description:
    "تواصل مع كيف الضيافة - واتساب +966508252134، بريد إلكتروني info@keifdiafa.com. احصل على استشارة مجانية لتصميم تجربة ضيافة فاخرة لمناسبتك.",
  path: "/contact",
  keywords: [
    "تواصل كيف الضيافة",
    "واتساب ضيافة",
    "حجز ضيافة",
    "استشارة مجانية",
    "طلب خدمة ضيافة",
    "رقم كيف الضيافة",
  ],
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "الرئيسية", url: SITE_URL },
  { name: "تواصل معنا", url: `${SITE_URL}/contact` },
]);

const webPageSchema = generateWebPageSchema({
  name: "تواصل معنا - كيف الضيافة",
  description:
    "تواصل مع كيف الضيافة للحصول على استشارة مجانية وحجز خدمات الضيافة",
  url: `${SITE_URL}/contact`,
});

export default function ContactPage() {
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
      <ContactClient />
    </>
  );
}
