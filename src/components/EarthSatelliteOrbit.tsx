"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { soundEngine } from "@/utils/audio";
import { Download, Check, Radio } from "lucide-react";

interface EarthSatelliteOrbitProps {
  satShiftX: number;
  satShiftY: number;
}

export default function EarthSatelliteOrbit({
  satShiftX,
  satShiftY,
}: EarthSatelliteOrbitProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDownloadCV = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    soundEngine.playSuccess();
    setIsDownloaded(true);

    // Trigger CV PDF download
    const link = document.createElement("a");
    link.href = "/assets/cv/PhanTrungNguyen_Resume.pdf";
    link.download = "PhanTrungNguyen_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Sci-fi confetti burst from satellite position
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.12, y: 0.62 },
      colors: ["#00f2fe", "#4facfe", "#ffffff", "#38bdf8"],
    });

    setTimeout(() => {
      setIsDownloaded(false);
    }, 3500);
  }, []);

  return (
    <div
      className="pointer-events-none fixed bottom-[36%] left-[2%] z-40 select-none transition-transform duration-500 ease-out md:bottom-[38%] md:left-[3%]"
      style={{
        transform: `translate3d(${satShiftX}px, ${satShiftY}px, 0px)`,
      }}
    >
      {/* Gentle stationary floating bob wrapper */}
      <div className="relative animate-float">
        {/* Interactive Satellite Button */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Download Resume / CV via Earth Satellite Uplink"
          className="group pointer-events-auto relative aspect-[2752/1536] w-[130px] cursor-pointer touch-manipulation focus:outline-none sm:w-[160px] md:w-[190px] lg:w-[220px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleDownloadCV}
          onContextMenu={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {/* Expanded invisible hit shield to guarantee 100% reliable hover & click across full body & wings */}
          <div className="pointer-events-auto absolute -inset-4 z-20 cursor-pointer rounded-2xl bg-white/[0.001]" />

          {/* Sonar Radar Wave Rings emitting when hovered */}
          {isHovered && (
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              {/* Primary radar sonar pulse */}
              <span className="absolute h-24 w-24 animate-ping rounded-full border-2 border-cyan-400 opacity-75" />
              {/* Secondary wave ripple */}
              <span className="absolute h-36 w-36 animate-pulse rounded-full border border-cyan-300 opacity-50" />
              {/* Outer dotted scanning radar ring */}
              <span className="absolute h-48 w-48 animate-spin rounded-full border border-dashed border-cyan-400/40 opacity-40 duration-[12s]" />
            </div>
          )}

          {/* Satellite Graphic Body (Flipped horizontally: dish face points right, tilted down-left) */}
          <div
            className="relative h-full w-full scale-x-[-1] transition-all duration-300 ease-out"
            style={{
              filter: isHovered
                ? "drop-shadow(0 0 16px #00f2fe) drop-shadow(0 0 32px rgba(0, 242, 254, 0.6)) brightness(1.15)"
                : "drop-shadow(0 0 12px rgba(0, 242, 254, 0.45)) drop-shadow(0 0 24px rgba(79, 172, 254, 0.25))",
            }}
          >
            <Image
              src="/assets/images/satelline.webp"
              alt="Orbital Satellite Ground Uplink"
              fill
              sizes="(max-width: 768px) 155px, 210px"
              className="pointer-events-none object-contain"
              priority
            />

            {/* Active telemetry signal beacon on central antenna */}
            <div className="pointer-events-none absolute left-[49%] top-[48%] h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#00f2fe]" />
            </div>
          </div>

          {/* Pixel-Styled Tooltip Popup Label (Identical to island items) */}
          <div
            className={`pointer-events-none absolute -top-20 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap transition-all duration-200 ${
              isHovered
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-2 scale-95 opacity-0"
            }`}
          >
            <div className="pixel-tooltip relative rounded border border-cyan-400 bg-[#040e1e]/95 px-3.5 py-2 text-center shadow-[0_0_20px_rgba(0,242,254,0.6)] backdrop-blur-md">
              {/* Top Category Label */}
              <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                SATELLITE UPLINK
              </div>

              {/* Title */}
              <div className="mt-0.5 flex items-center justify-center gap-1.5 font-sans text-xs font-bold tracking-wide text-white drop-shadow md:text-sm">
                {isDownloaded ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-300">CV Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Download resume</span>
                    <span className="rounded border border-cyan-500/40 bg-cyan-950 px-1.5 py-0.5 font-mono text-[9px] text-cyan-300">
                      PDF
                    </span>
                  </>
                )}
              </div>

              {/* Bottom prompt hint */}
              <div className="mt-1 flex items-center justify-center gap-1 font-mono text-[9px] tracking-wider text-cyan-400/90">
                <Radio className="h-2.5 w-2.5 animate-pulse text-cyan-400" />
                <span>
                  {isDownloaded ? "[ TRANSMISSION COMPLETED ]" : "[ CLICK TO DOWNLOAD ]"}
                </span>
              </div>

              {/* Downward pointing tooltip arrow */}
              <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-cyan-400 bg-[#040e1e]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
