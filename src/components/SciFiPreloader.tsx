"use client";

import React, { useState, useEffect } from "react";

const CRITICAL_ASSETS = [
  "/assets/images/space.webp",
  "/assets/images/island.webp",
  "/assets/images/orbital_station.webp",
  "/assets/images/satelline.webp",
  "/assets/images/doraemon.webp",
  "/assets/images/about.webp",
  "/assets/images/education.webp",
  "/assets/images/skills.webp",
  "/assets/images/projects.webp",
  "/assets/images/experience.webp",
  "/assets/images/contact.webp",
  "/assets/images/meteor.webp",
  "/assets/profile_photo.webp",
];

interface SciFiPreloaderProps {
  onComplete?: () => void;
}

export default function SciFiPreloader({ onComplete }: SciFiPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING TELEMETRY LINK...");

  useEffect(() => {
    let loadedCount = 0;
    const total = CRITICAL_ASSETS.length;
    let isCancelled = false;

    const updateProgress = () => {
      if (isCancelled) return;
      loadedCount++;
      const pct = Math.min(100, Math.round((loadedCount / total) * 100));
      setProgress(pct);

      if (pct < 35) {
        setStatusText("INITIALIZING TELEMETRY LINK...");
      } else if (pct < 70) {
        setStatusText("CALIBRATING ORBITAL SECTORS...");
      } else if (pct < 100) {
        setStatusText("SYNCHRONIZING CELESTIAL ISLAND...");
      } else {
        setStatusText("ALL SYSTEMS ONLINE · READY");
      }

      if (loadedCount >= total) {
        finishLoading();
      }
    };

    const finishLoading = () => {
      setTimeout(() => {
        if (isCancelled) return;
        setIsExiting(true);
        setTimeout(() => {
          if (isCancelled) return;
          setIsLoaded(true);
          onComplete?.();
        }, 500);
      }, 250);
    };

    // Preload critical assets
    CRITICAL_ASSETS.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Safety fallback: maximum 2.5s in case of slow network
    const fallbackTimer = setTimeout(() => {
      if (!isLoaded && !isExiting) {
        setProgress(100);
        setStatusText("SYSTEM OVERRIDE · LAUNCHING");
        finishLoading();
      }
    }, 2500);

    return () => {
      isCancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, [isLoaded, isExiting, onComplete]);

  if (isLoaded) return null;

  return (
    <div
      aria-label="System Initializing Screen"
      className={`fixed inset-0 z-50 flex select-none flex-col items-center justify-center bg-[#050b14] transition-opacity duration-500 ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient background deep space glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.08)_0%,rgba(5,11,20,0.95)_70%)]" />

      {/* Cyber Grid Scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Main Holo Container */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Orbital Radar Spinning Ring Graphic */}
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
          <div className="absolute inset-0 animate-spin rounded-full border border-dashed border-cyan-400/40 duration-[10s]" />
          <div className="absolute inset-2 animate-spin rounded-full border border-cyan-300/30 border-t-cyan-400 duration-[5s] [animation-direction:reverse]" />
          <div className="absolute inset-4 animate-ping rounded-full border border-cyan-400/50 duration-1000" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/80 bg-[#021526]/80 shadow-[0_0_15px_#00f2fe]">
            <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f2fe]" />
          </div>
        </div>

        {/* Sci-Fi PROJECT HUD Box */}
        <div
          className="relative min-w-[280px] max-w-[420px] border border-cyan-400/30 bg-[#010e1a]/80 p-5 shadow-[0_0_30px_rgba(0,242,254,0.15)] backdrop-blur-md sm:min-w-[340px]"
          style={{
            clipPath:
              "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
          }}
        >
          {/* Corner brackets */}
          <span className="absolute -left-[1px] -top-[1px] h-3 w-3 border-l-2 border-t-2 border-cyan-400" />
          <span className="absolute -right-[1px] -top-[1px] h-3 w-3 border-r-2 border-t-2 border-cyan-400" />
          <span className="absolute -bottom-[1px] -left-[1px] h-3 w-3 border-b-2 border-l-2 border-cyan-400" />
          <span className="absolute -bottom-[1px] -right-[1px] h-3 w-3 border-b-2 border-r-2 border-cyan-400" />

          {/* Header */}
          <div className="mb-3 flex items-center justify-between border-b border-cyan-400/20 pb-2">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-300">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
              <span>NABITO ROOM</span>
            </div>
            <div className="font-mono text-[10px] text-cyan-400/70">STATION UPLINK</div>
          </div>

          {/* Percentage & Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between font-mono">
              <span className="text-[10px] uppercase tracking-wider text-cyan-400/80">
                {statusText}
              </span>
              <span className="text-sm font-bold text-cyan-300 drop-shadow-[0_0_8px_#00f2fe]">
                {progress}%
              </span>
            </div>

            <div className="relative h-2 w-full overflow-hidden rounded-sm border border-cyan-500/40 bg-[#020b14]">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-[#00f2fe] shadow-[0_0_12px_#00f2fe] transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
              <div className="pointer-events-none absolute inset-0 animate-pulse bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)]" />
            </div>
          </div>

          {/* Footer Sci-Fi Telemetry */}
          <div className="mt-3 flex items-center justify-between font-mono text-[8px] tracking-wider text-cyan-500/80">
            <span>QUANTUM CORE: STABLE</span>
            <span>SHIELD MATRIX: 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
