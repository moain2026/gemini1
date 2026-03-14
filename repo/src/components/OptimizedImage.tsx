"use client";

import { useState } from "react";
import Image from "next/image";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

/**
 * Shimmer placeholder for image loading
 */
function shimmerBase64(w: number, h: number): string {
  const shimmer = `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#1a1a1a" offset="20%" />
          <stop stop-color="#242424" offset="50%" />
          <stop stop-color="#1a1a1a" offset="80%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#1a1a1a" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.5s" repeatCount="indefinite" />
    </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(shimmer).toString("base64")}`;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

/**
 * OptimizedImage - Uses Next.js Image component for automatic optimization.
 *
 * Features:
 * - Automatic WebP/AVIF conversion
 * - Lazy loading with shimmer placeholder
 * - Responsive sizes
 * - Error fallback
 * - Blur-up loading effect
 *
 * Usage:
 * ```tsx
 * <OptimizedImage
 *   src="https://images.unsplash.com/..."
 *   alt="Description"
 *   fill
 *   className="object-cover"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 * ```
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  quality = 80,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  style,
  objectFit = "cover",
}: OptimizedImageProps) {
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (didError) {
    return (
      <div
        className={`inline-block bg-[#1a1a1a] text-center align-middle ${className}`}
        style={style}
        role="img"
        aria-label={`خطأ في تحميل الصورة: ${alt}`}
      >
        <div className="flex items-center justify-center w-full h-full min-h-[100px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ERROR_IMG_SRC}
            alt={`خطأ في تحميل: ${alt}`}
            width={88}
            height={88}
          />
        </div>
      </div>
    );
  }

  const imageProps = fill
    ? { fill: true as const }
    : { width: width || 800, height: height || 600 };

  return (
    <div
      className={`relative overflow-hidden ${fill ? "" : "inline-block"} ${className}`}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"} ${fill ? `object-${objectFit}` : ""} ${className}`}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={shimmerBase64(width || 800, height || 600)}
        onLoad={() => setIsLoading(false)}
        onError={() => setDidError(true)}
        loading={priority ? "eager" : "lazy"}
      />
      {isLoading && !priority && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "linear-gradient(135deg, #1a1a1a, #242424, #1a1a1a)" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
