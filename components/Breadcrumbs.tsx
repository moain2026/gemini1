"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

// Map paths to Arabic labels
const pathLabels: Record<string, string> = {
  "/": "الرئيسية",
  "/services": "خدماتنا",
  "/offerings": "تقديماتنا",
  "/portfolio": "معرض الأعمال",
  "/about": "من نحن",
  "/contact": "تواصل معنا",
};

/**
 * Breadcrumbs - Accessible navigation breadcrumb component.
 *
 * Features:
 * - Auto-generates breadcrumb trail from current path
 * - RTL-friendly with proper Arabic labels
 * - ARIA attributes for accessibility
 * - Styled to match the luxury gold theme
 * - Schema.org BreadcrumbList markup emitted separately in page.tsx
 *
 * Usage:
 * ```tsx
 * <Breadcrumbs />
 * // or with custom items
 * <Breadcrumbs items={[
 *   { label: "الرئيسية", href: "/" },
 *   { label: "خدماتنا", href: "/services" },
 * ]} />
 * ```
 */
export function Breadcrumbs({
  items,
  className = "",
}: {
  items?: BreadcrumbItem[];
  className?: string;
}) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs if none provided
  const breadcrumbs: BreadcrumbItem[] = items || generateBreadcrumbs(pathname);

  // Don't show breadcrumbs on home page
  if (pathname === "/") return null;

  return (
    <nav
      aria-label="التنقل التفصيلي"
      className={`max-w-7xl mx-auto px-4 pt-20 pb-2 ${className}`}
    >
      <ol
        className="flex items-center gap-2 text-sm flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li
              key={crumb.href}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {!isLast ? (
                <>
                  <Link
                    href={crumb.href}
                    className="text-[#B8860B]/70 hover:text-[#B8860B] transition-colors duration-200"
                    itemProp="item"
                  >
                    <span itemProp="name">{crumb.label}</span>
                  </Link>
                  <span
                    className="text-[#F5F5DC]/20 select-none"
                    aria-hidden="true"
                  >
                    /
                  </span>
                </>
              ) : (
                <span
                  className="text-[#F5F5DC]/50"
                  aria-current="page"
                  itemProp="name"
                >
                  {crumb.label}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: "الرئيسية", href: "/" }];

  if (pathname !== "/") {
    const segments = pathname.split("/").filter(Boolean);
    let currentPath = "";

    for (const segment of segments) {
      currentPath += `/${segment}`;
      const label = pathLabels[currentPath] || segment;
      crumbs.push({ label, href: currentPath });
    }
  }

  return crumbs;
}
