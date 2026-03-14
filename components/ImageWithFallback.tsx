"use client";

import { useState, memo } from "react";
import Image from "next/image";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

// Shimmer placeholder for blur-up effect
const shimmerBase64 = (w = 700, h = 475) =>
  `data:image/svg+xml;base64,${btoa(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g"><stop stop-color="#1a1a1a" offset="20%"/><stop stop-color="#242424" offset="50%"/><stop stop-color="#1a1a1a" offset="70%"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#1a1a1a"/><rect width="${w}" height="${h}" fill="url(#g)"><animate attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"/></rect></svg>`
  )}`;

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  fill?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  sizes?: string;
  quality?: number;
}

/**
 * ImageWithFallback - Next.js Image component with error fallback and shimmer placeholder.
 * Uses next/image for automatic optimization (WebP/AVIF, lazy loading, srcset).
 */
function ImageWithFallbackInner({
  src,
  alt,
  className,
  priority = false,
  loading,
  fill = false,
  width,
  height,
  style,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  quality = 75,
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    return (
      <div
        className={`inline-block bg-[#1a1a1a] text-center align-middle ${className ?? ""}`}
        style={style}
        role="img"
        aria-label={`\u062e\u0637\u0623 \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0635\u0648\u0631\u0629: ${alt}`}
      >
        <div className="flex items-center justify-center w-full h-full min-h-[80px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ERROR_IMG_SRC}
            alt="\u062e\u0637\u0623 \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0635\u0648\u0631\u0629"
            width={88}
            height={88}
          />
        </div>
      </div>
    );
  }

  const commonProps = {
    src,
    alt,
    className,
    style,
    sizes,
    quality,
    priority,
    loading: (priority ? "eager" : loading || "lazy") as "lazy" | "eager",
    onError: () => setDidError(true),
    placeholder: "blur" as const,
    blurDataURL: shimmerBase64(),
  };

  if (fill) {
    return <Image {...commonProps} fill />;
  }

  return (
    <Image
      {...commonProps}
      width={width || 800}
      height={height || 600}
    />
  );
}

export const ImageWithFallback = memo(ImageWithFallbackInner);
