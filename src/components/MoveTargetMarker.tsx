"use client";

import React from "react";

interface MoveTargetMarkerProps {
  x: number; // percentage
  y: number; // percentage
}

export default function MoveTargetMarker({ x, y }: MoveTargetMarkerProps) {
  return (
    <div
      className="z-25 pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        {/* Expanding Green Ripple */}
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-emerald-400 opacity-75" />

        {/* Outer Hexagon/Circle Ring */}
        <div className="h-8 w-8 animate-pulse rounded-full border border-emerald-300 shadow-[0_0_12px_#10b981]" />

        {/* 4 Inward Directional Reticle Arrows (Classic MOBA move indicator) */}
        <div className="absolute top-0 h-1.5 w-1.5 rotate-45 border-l-2 border-t-2 border-emerald-400" />
        <div className="absolute bottom-0 h-1.5 w-1.5 rotate-45 border-b-2 border-r-2 border-emerald-400" />
        <div className="absolute left-0 h-1.5 w-1.5 rotate-45 border-b-2 border-l-2 border-emerald-400" />
        <div className="absolute right-0 h-1.5 w-1.5 rotate-45 border-r-2 border-t-2 border-emerald-400" />

        {/* Center Target Dot */}
        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      </div>
    </div>
  );
}
