"use client";

import React, { useState } from "react";
import Image from "next/image";
import { soundEngine } from "@/utils/audio";

interface DoraemonChampionProps {
  position: { x: number; y: number };
  isMoving: boolean;
  facingRight: boolean;
}

export default function DoraemonChampion({
  position,
  isMoving,
  facingRight,
}: DoraemonChampionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      tabIndex={0}
      data-doraemon="true"
      aria-label="Doraemon Champion Companion"
      className="z-35 pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 touch-manipulation select-none transition-[left,top] duration-500 ease-out before:absolute before:-inset-3 before:content-[''] focus:outline-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: "7%",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {/* Ground Cyber Shadow & Beacon Ring */}
      <div className="pointer-events-none absolute bottom-[2%] left-1/2 aspect-[2.2/1] w-[85%] -translate-x-1/2 translate-y-1/2">
        <div
          className={`h-full w-full rounded-[50%] border-2 transition-all duration-300 ${
            isMoving
              ? "scale-125 border-emerald-400 shadow-[0_0_15px_#10b981]"
              : isHovered
                ? "scale-110 border-cyan-300 shadow-[0_0_12px_#00f2fe]"
                : "animate-pulseGlow border-cyan-400/60 opacity-60"
          }`}
        />
        <div
          className={`absolute inset-[20%] rounded-[50%] blur-[2px] ${
            isMoving ? "bg-emerald-400/30" : "bg-cyan-400/25"
          }`}
        />
      </div>

      {/* Doraemon Graphic with Movement Bob & Hover Glow */}
      <div
        className={`pointer-events-none relative aspect-square w-full transition-transform duration-200 ${
          isMoving ? "animate-bounce" : isHovered ? "-translate-y-1" : "translate-y-0"
        }`}
        style={{
          transform: `${facingRight ? "scaleX(-1)" : "scaleX(1)"} ${
            isHovered ? "scale(1.08)" : "scale(1)"
          }`,
          filter: isHovered
            ? "drop-shadow(0 0 12px #00f2fe) drop-shadow(0 0 25px rgba(0, 242, 254, 0.5))"
            : isMoving
              ? "drop-shadow(0 0 10px #10b981)"
              : "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
        }}
      >
        <Image
          src="/assets/images/doraemon.png"
          alt="Doraemon Explorer"
          fill
          sizes="(max-width: 768px) 80px, 140px"
          priority
          className="pointer-events-none object-contain"
        />

        {/* Status ping indicator */}
        <div className="pointer-events-none absolute right-1 top-0 h-2.5 w-2.5">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
              isMoving ? "bg-emerald-400" : "bg-cyan-400"
            }`}
          />
          <span
            className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
              isMoving
                ? "bg-emerald-300 shadow-[0_0_8px_#10b981]"
                : "bg-cyan-300 shadow-[0_0_8px_#00f2fe]"
            }`}
          />
        </div>
      </div>

      {/* Pixel Tooltip Label */}
      <div
        className={`pointer-events-none absolute -top-14 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap transition-all duration-200 ${
          isHovered
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="pixel-tooltip relative rounded border border-cyan-400 px-2.5 py-1 text-center shadow-[0_0_12px_rgba(0,242,254,0.4)]">
          <div className="flex items-center justify-center gap-1 font-mono text-[8px] uppercase tracking-widest text-cyan-300">
            <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-cyan-400" />
            COMPANION
          </div>
          <div className="font-sans text-[11px] font-bold tracking-wide text-white shadow-black drop-shadow">
            Space Explorer
          </div>
          <div className="mt-0.5 font-mono text-[8px] tracking-wider text-emerald-300/90">
            [ CLICK GROUND TO MOVE ]
          </div>
          <div className="absolute -bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-cyan-400 bg-[#050f1e]" />
        </div>
      </div>
    </div>
  );
}
