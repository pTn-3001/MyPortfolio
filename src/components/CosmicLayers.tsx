"use client";

import React from "react";
import Image from "next/image";
import EarthSatelliteOrbit from "./EarthSatelliteOrbit";

interface CosmicLayersProps {
  mouseOffset: { x: number; y: number };
}

export default function CosmicLayers({ mouseOffset }: CosmicLayersProps) {
  // Layer 0 Parallax: gentle opposite movement (reduced sway)
  const bgShiftX = -mouseOffset.x * 10;
  const bgShiftY = -mouseOffset.y * 10;

  // Layer 2 Parallax: satellites & stations move subtly
  const satShiftX = -mouseOffset.x * 14;
  const satShiftY = -mouseOffset.y * 14;

  const stationShiftX = -mouseOffset.x * 12;
  const stationShiftY = -mouseOffset.y * 12;

  return (
    <>
      {/* Layer 0: Deep Space Universe Background with Earth shifted upward */}
      <div
        className="pointer-events-none fixed -bottom-[15px] -left-[30px] -right-[30px] -top-[75px] z-0 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${bgShiftX}px, ${bgShiftY - 40}px, 0px) scale(1.04)`,
        }}
      >
        <Image
          src="/assets/images/space.png"
          alt="Deep Space Universe"
          fill
          priority
          sizes="100vw"
          className="select-none object-cover"
        />
        {/* Ambient deep space blue-violet radial vignette overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,15,0.45)_70%,rgba(1,3,8,0.85)_100%)]" />
      </div>

      {/* Layer 2: Cosmic Assets */}
      {/* Orbital Base Station: Scaled by 1.2x, placed on East edge, centered vertically */}
      <div
        className="pointer-events-none fixed right-[1%] top-[46%] z-20 aspect-[2752/1536] w-[156px] -translate-y-1/2 select-none transition-transform duration-500 ease-out md:w-[240px] lg:w-[288px]"
        style={{
          transform: `translate3d(${stationShiftX}px, ${stationShiftY}px, 0px)`,
        }}
      >
        <div className="drop-shadow(0 0 15px rgba(0, 242, 254, 0.4)) drop-shadow(0 0 30px rgba(0, 150, 255, 0.2)) relative h-full w-full animate-float-slow filter">
          <Image
            src="/assets/images/orbital_station.png"
            alt="Orbital Station Base"
            fill
            sizes="(max-width: 768px) 130px, 240px"
            className="pointer-events-none object-contain"
          />
          {/* Pulsing telemetry signal beacon on station antenna */}
          <div className="absolute left-[48%] top-[38%] h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400 opacity-80" />
          <div className="absolute left-[48%] top-[38%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f2fe]" />
        </div>
      </div>

      {/* Earth Satellite Orbit: Smooth elliptical orbit around Earth, no unwanted border, hover sonar waves & CV download */}
      <EarthSatelliteOrbit satShiftX={satShiftX} satShiftY={satShiftY} />
    </>
  );
}
