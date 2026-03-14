"use client";

import { useState } from "react";

interface ImageSkeletonProps {
  className?: string;
  aspectRatio?: string;
}

export function ImageSkeleton({ className = "", aspectRatio }: ImageSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-br from-charcoal-mid to-charcoal-light ${className}`}
      style={{ aspectRatio }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <svg
          className="w-10 h-10 text-gold/20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Hook to manage image loading state with skeleton fallback
 */
export function useImageLoading() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return {
    loaded,
    error,
    onLoad: () => setLoaded(true),
    onError: () => setError(true),
    showSkeleton: !loaded && !error,
  };
}
