"use client";

import React, { useState } from "react";
import Image from "next/image";
import { soundEngine } from "@/utils/audio";
import { ItemConfig } from "@/types";

export type { ItemConfig } from "@/types";

interface InteractiveItemProps {
  item: ItemConfig;
  onClick: (item: ItemConfig) => void;
}

export default function InteractiveItem({ item, onClick }: InteractiveItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    soundEngine.playOpenModal();
    onClick(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      soundEngine.playOpenModal();
      onClick(item);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      data-island-item="true"
      aria-label={`Open ${item.title}`}
      className="group pointer-events-auto absolute z-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation select-none focus:outline-none"
      style={{
        left: item.left,
        top: item.top,
        width: item.width,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Invisible hit shield to guarantee 100% click & hover capture without edge flicker */}
      <div className="pointer-events-auto absolute -inset-3 z-20 cursor-pointer rounded-2xl bg-white/[0.001]" />
      {/* Ground Cyber Beacon Ring underneath the item */}
      <div className="pointer-events-none absolute bottom-[2%] left-1/2 aspect-[2.2/1] w-[75%] -translate-x-1/2 translate-y-1/2">
        {/* Outer pulse ring */}
        <div
          className={`h-full w-full rounded-[50%] border-2 border-cyan-400/60 transition-all duration-500 ${
            isHovered
              ? "scale-125 border-cyan-300 opacity-100 shadow-[0_0_18px_#00f2fe]"
              : "animate-pulseGlow opacity-40"
          }`}
        />
        {/* Inner core glow */}
        <div className="absolute inset-[25%] rounded-[50%] bg-cyan-400/25 blur-[3px]" />
      </div>

      {/* Floating Graphic Element with Hover Lift and Neon Glow */}
      <div
        className="pointer-events-none relative aspect-square w-full transform transition-all duration-300 ease-out"
        style={{
          transform: isHovered
            ? "scale(1.08) translateY(-6px)"
            : "scale(1) translateY(0px)",
          filter: isHovered
            ? "drop-shadow(0 0 15px #00f2fe) drop-shadow(0 0 30px rgba(0, 242, 254, 0.6))"
            : "drop-shadow(0 4px 10px rgba(0,0,0,0.45))",
        }}
      >
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 140px, 260px"
          priority
          className="pointer-events-none object-contain transition-transform duration-300 group-hover:brightness-110"
        />

        {/* Subtle holographic ping dot indicator */}
        <div className="pointer-events-none absolute right-2 top-1 h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f2fe]" />
        </div>
      </div>

      {/* Pixel-Styled Tooltip Popup Label */}
      <div
        className={`pointer-events-none absolute -top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap transition-all duration-200 ${
          isHovered
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="pixel-tooltip relative rounded border border-cyan-400 px-3 py-1.5 text-center shadow-[0_0_15px_rgba(0,242,254,0.5)]">
          {/* Top category label */}
          <div className="flex items-center justify-center gap-1 font-mono text-[10px] uppercase tracking-widest text-cyan-300">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            {item.category || "MODULE"}
          </div>

          {/* Title */}
          <div className="font-sans text-xs font-bold tracking-wide text-white shadow-black drop-shadow md:text-sm">
            {item.title}
          </div>

          {/* Bottom prompt hint */}
          <div className="mt-0.5 font-mono text-[9px] tracking-wider text-cyan-400/80">
            [ CLICK TO ACCESS ]
          </div>

          {/* Downward pointing tooltip arrow */}
          <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-cyan-400 bg-[#050f1e]" />
        </div>
      </div>
    </div>
  );
}
