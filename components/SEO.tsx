import type { Metadata } from "next";

const SITE_URL = "https://keifaldiafa.com";
const SITE_NAME = "كيف الضيافة";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generates comprehensive Next.js Metadata for any page.
 * Includes Open Graph, Twitter Cards, canonical URL, and alternates.
 *
 * Usage in page.tsx:
 * ```ts
 * import { generatePageMetadata } from "@/components/SEO";
 *
 * export const metadata = generatePageMetadata({
 *   title: "خدماتنا",
 *   description: "...",
 *   path: "/services",
 * });
 * ```
 */
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = `${SITE_NAME} - ${title}`,
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords = [],
  noIndex = false,
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const url = `${SITE_URL}${path}`;

  const defaultKeywords = [
    "كيف الضيافة",
    "خدمات الضيافة",
    "ضيافة فاخرة",
    "قهوة سعودية",
    "ضيافة الرياض",
    "ضيافة السعودية",
    "Keif Al-Diafa",
    "Saudi hospitality",
  ];

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
      languages: {
        "ar-SA": url,
      },
    },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      locale: "ar_SA",
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: "image/jpeg",
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: twitterCard,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
      creator: "@keifdiafa",
      site: "@keifdiafa",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/**
 * Site-wide constants for consistent SEO across the application.
 */
export const SEO_CONSTANTS = {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  PHONE: "+966508252134",
  EMAIL: "info@keifdiafa.com",
  WHATSAPP: "966508252134",
  INSTAGRAM: "https://www.instagram.com/keifaldiafa",
  ADDRESS: {
    city: "الرياض",
    region: "منطقة الرياض",
    country: "SA",
    countryName: "المملكة العربية السعودية",
  },
} as const;
