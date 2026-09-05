"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import InteractiveItem from "./InteractiveItem";
import DoraemonChampion from "./DoraemonChampion";
import MoveTargetMarker from "./MoveTargetMarker";
import { soundEngine } from "@/utils/audio";
import { ItemConfig } from "@/types";
import { ISLAND_ITEMS } from "@/data/islandItems";

export { ISLAND_ITEMS };

interface FloatingIslandProps {
  mouseOffset: { x: number; y: number };
  onSelectItem: (item: ItemConfig) => void;
}

export default function FloatingIsland({
  mouseOffset,
  onSelectItem,
}: FloatingIslandProps) {
  // Island Sway Parallax: Increased shift to 6px as requested
  const tiltX = -mouseOffset.y * 1.5;
  const tiltY = mouseOffset.x * 1.8;
  const shiftX = mouseOffset.x * 6; // 6px
  const shiftY = mouseOffset.y * 6; // 6px

  const islandRef = useRef<HTMLDivElement | null>(null);

  // Doraemon LoL-Style Click-to-Move state (starts on front deck by the room)
  const [doraemonPos, setDoraemonPos] = useState({ x: 30, y: 58 });
  const [targetPos, setTargetPos] = useState({ x: 30, y: 58 });
  const [isMoving, setIsMoving] = useState(false);
  const [facingRight, setFacingRight] = useState(false);
  const [moveMarker, setMoveMarker] = useState<{
    x: number;
    y: number;
    key: number;
  } | null>(null);

  // Helper function to decode WMO 4677 weather interpretation code to clear English condition
  const getWeatherCondition = (code: number): string => {
    switch (code) {
      case 0:
        return "CLEAR SKY";
      case 1:
        return "MOSTLY CLEAR";
      case 2:
        return "PARTLY CLOUDY";
      case 3:
        return "OVERCAST";
      case 45:
      case 48:
        return "FOGGY";
      case 51:
      case 53:
      case 55:
        return "DRIZZLE";
      case 56:
      case 57:
        return "FREEZING DRIZZLE";
      case 61:
      case 63:
      case 65:
        return "RAIN";
      case 66:
      case 67:
        return "FREEZING RAIN";
      case 71:
      case 73:
      case 75:
      case 77:
        return "SNOW";
      case 80:
      case 81:
      case 82:
        return "RAIN SHOWERS";
      case 85:
      case 86:
        return "SNOW SHOWERS";
      case 95:
        return "THUNDERSTORM";
      case 96:
      case 99:
        return "HAIL THUNDERSTORM";
      default:
        return "ATMOSPHERE STABLE";
    }
  };

  // Helper function to calculate UV radiation threat level (WHO Standard)
  const getUvLevel = (uv: number): string => {
    if (uv == null || isNaN(uv)) return "Low";
    if (uv >= 11) return "Extreme";
    if (uv >= 8) return "Very High";
    if (uv >= 6) return "High";
    if (uv >= 3) return "Moderate";
    return "Low";
  };

  // Live real-time weather telemetry at coords 10.785039, 106.649240 (Open-Meteo API)
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    uvLevel: string;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=10.785039&longitude=106.649240&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,uv_index"
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data?.current && isMounted) {
          const code = data.current.weather_code ?? 0;
          const cond = getWeatherCondition(code);

          const uv =
            typeof data.current.uv_index === "number" ? data.current.uv_index : 0;
          const level = getUvLevel(uv);
          const wind =
            typeof data.current.wind_speed_10m === "number"
              ? data.current.wind_speed_10m
              : 0;

          setWeather({
            temp: Math.round(data.current.temperature_2m * 10) / 10,
            condition: cond,
            humidity: data.current.relative_humidity_2m ?? 0,
            windSpeed: Math.round(wind * 10) / 10,
            uvIndex: uv,
            uvLevel: level,
          });
        }
      } catch (err) {
        console.warn("Weather sync error:", err);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 15 * 60 * 1000); // sync every 15 min
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Calculate strict walkable boundary so Doraemon never steps off the island cliff
  const clampWalkable = (rawX: number, rawY: number) => {
    const clampedX = Math.max(25, Math.min(80, rawX));

    // Calculate maximum walkable Y based on isometric contour of island surface
    let maxY = 70;
    if (clampedX <= 50) {
      // Slopes from Y: 58% at X: 25% to Y: 71% at X: 50%
      maxY = 58 + (clampedX - 25) * ((71 - 58) / 25);
    } else {
      // Slopes up from Y: 71% at X: 50% to Y: 54% at X: 80%
      maxY = 71 - (clampedX - 50) * ((71 - 54) / 30);
    }

    const minY = 32;
    const clampedY = Math.max(minY, Math.min(maxY, rawY));

    return { x: clampedX, y: clampedY };
  };

  // Handle Island Ground Click (Left Click or Right Click) to Move Doraemon
  const handleGroundClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // 1. If click came from an interactive item or button, NEVER move Doraemon
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('[data-island-item="true"]') ||
        target?.closest('[data-doraemon="true"]') ||
        target?.closest('[data-telemetry="true"]') ||
        target?.closest("button")
      ) {
        return;
      }

      if (!islandRef.current) return;
      const rect = islandRef.current.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 100;
      const clickY = ((e.clientY - rect.top) / rect.height) * 100;

      // 2. Proximity check: If the click coordinate is within 5% of ANY item, open modal and DO NOT move Doraemon
      const nearbyItem = ISLAND_ITEMS.find((item) => {
        const itemX = parseFloat(item.left);
        const itemY = parseFloat(item.top);
        return Math.hypot(clickX - itemX, clickY - itemY) < 5.0;
      });

      if (nearbyItem) {
        soundEngine.playOpenModal();
        onSelectItem(nearbyItem);
        return;
      }

      // Strictly clamp within surface boundary
      const safe = clampWalkable(clickX, clickY);

      // Play subtle LoL move audio
      soundEngine.playMoveCommand();

      // Show green reticle marker
      const markerKey = Date.now();
      setMoveMarker({ x: safe.x, y: safe.y, key: markerKey });
      setTimeout(() => {
        setMoveMarker((prev) => (prev?.key === markerKey ? null : prev));
      }, 700);

      // Set target and direction
      setFacingRight(safe.x > doraemonPos.x);
      setTargetPos({ x: safe.x, y: safe.y });
      setIsMoving(true);
    },
    [doraemonPos.x, onSelectItem]
  );

  // Smooth movement loop toward target
  useEffect(() => {
    if (!isMoving) return;

    let frameId: number;
    const speed = 0.08;

    const step = () => {
      setDoraemonPos((current) => {
        const dx = targetPos.x - current.x;
        const dy = targetPos.y - current.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 0.5) {
          setIsMoving(false);
          return targetPos;
        }

        return {
          x: current.x + dx * speed,
          y: current.y + dy * speed,
        };
      });

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isMoving, targetPos]);

  return (
    <div className="perspective-[1200px] pointer-events-none relative z-30 flex h-full w-full items-center justify-center">
      {/* Floating Island Container with Subtly Dampened Parallax & Vertical Float */}
      <div
        ref={islandRef}
        onClick={handleGroundClick}
        onContextMenu={(e) => {
          e.preventDefault();
          handleGroundClick(e);
        }}
        className="pointer-events-auto relative aspect-[2708/1568] w-[94vw] max-w-[1280px] cursor-crosshair transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${shiftX}px, ${shiftY}px, 0px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft, Gentle Vertical Levitation Wrapper */}
        <div className="relative h-full w-full animate-float">
          {/* Ambient Celestial Island Shadow underneath */}
          <div className="bg-[#00f2fe]/8 pointer-events-none absolute bottom-[4%] left-[18%] -z-10 h-[24%] w-[64%] animate-pulseGlow rounded-[50%] blur-[45px]" />
          <div className="pointer-events-none absolute bottom-[2%] left-[22%] -z-10 h-[18%] w-[56%] rounded-[50%] bg-[#020d20]/80 blur-[25px]" />

          {/* Layer 3: Island Base Graphic */}
          <div className="relative h-full w-full select-none">
            <Image
              src="/assets/images/island.png"
              alt="Isometric Space Island"
              fill
              priority
              sizes="(max-width: 1280px) 94vw, 1280px"
              className="pointer-events-none object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.55)]"
            />
          </div>

          {/* LoL-Style Click Target Marker */}
          {moveMarker && <MoveTargetMarker x={moveMarker.x} y={moveMarker.y} />}

          {/* 6 Core Portfolio Hotspots (About, Projects, Skills, Experience, Education, Contact) */}
          {ISLAND_ITEMS.map((item) => (
            <InteractiveItem
              key={item.id}
              item={item}
              onClick={(clickedItem) => {
                onSelectItem(clickedItem);
              }}
            />
          ))}

          {/* Doraemon Companion (Movement only, no modal) */}
          <DoraemonChampion
            position={doraemonPos}
            isMoving={isMoving}
            facingRight={facingRight}
          />

          {/* Island Cyber Telemetry Ambient Overlay with League of Legends PROJECT (Siêu Phẩm) HUD Frame */}
          <div
            data-telemetry="true"
            className="group/project pointer-events-auto absolute left-[6%] top-[15%] hidden select-none font-mono text-[9px] tracking-widest opacity-45 transition-all duration-300 ease-out hover:scale-[1.01] hover:opacity-100 md:block"
          >
            {/* Hologram Panel Container (Light, translucent & angular) */}
            <div
              className="relative border border-cyan-400/25 bg-[#010e1a]/30 px-3.5 py-2.5 shadow-[0_0_12px_rgba(0,242,254,0.1)] backdrop-blur-[2px] transition-all duration-300 group-hover/project:border-cyan-400/60 group-hover/project:bg-[#021526]/50 group-hover/project:shadow-[0_0_24px_rgba(0,242,254,0.3)]"
              style={{
                clipPath:
                  "polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)",
              }}
            >
              {/* Subtle Sci-Fi Scanline Projection Layer */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0)_50%,rgba(0,242,254,0.03)_50%)] bg-[length:100%_4px]" />

              {/* PROJECT Top Visor Beam Line */}
              <div className="pointer-events-none absolute -top-[2px] left-0 right-0 flex items-center justify-between px-3">
                <span className="h-[1px] w-8 bg-cyan-400/80 shadow-[0_0_6px_#00f2fe]" />
                <div className="flex items-center gap-1 opacity-75">
                  <span className="h-[2px] w-1 bg-cyan-300" />
                  <span className="h-[1px] w-6 bg-cyan-400/50" />
                  <span className="h-[2px] w-1 bg-cyan-300" />
                </div>
                <span className="h-[1px] w-8 bg-cyan-400/80 shadow-[0_0_6px_#00f2fe]" />
              </div>

              {/* 4 Sharp LoL PROJECT Chamfered Corner Reticle Laser Brackets */}
              <svg className="pointer-events-none absolute -left-[1px] -top-[1px] h-3.5 w-3.5 text-cyan-300 drop-shadow-[0_0_4px_#00f2fe]">
                <path
                  d="M 0 11 L 0 3 L 3 0 L 11 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <svg className="pointer-events-none absolute -right-[1px] -top-[1px] h-3.5 w-3.5 text-cyan-300 drop-shadow-[0_0_4px_#00f2fe]">
                <path
                  d="M 0 0 L 8 0 L 11 3 L 11 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <svg className="pointer-events-none absolute -bottom-[1px] -left-[1px] h-3.5 w-3.5 text-cyan-300 drop-shadow-[0_0_4px_#00f2fe]">
                <path
                  d="M 0 0 L 0 8 L 3 11 L 11 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <svg className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-3.5 w-3.5 text-cyan-300 drop-shadow-[0_0_4px_#00f2fe]">
                <path
                  d="M 0 11 L 8 11 L 11 8 L 11 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Visor Bottom Chamfer Notch Line (LoL PROJECT Visor Style) */}
              <div className="pointer-events-none absolute -bottom-[3px] left-1/2 flex -translate-x-1/2 items-center gap-1.5 opacity-60 transition-opacity group-hover/project:opacity-100">
                <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-cyan-400" />
                <div className="h-1 w-1 rotate-45 border border-cyan-300 bg-cyan-400/50 shadow-[0_0_4px_#00f2fe]" />
                <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-cyan-400" />
              </div>

              {/* Hologram Header Bar */}
              <div className="mb-1.5 flex items-center justify-between border-b border-cyan-400/20 pb-1 text-[8px]">
                <div className="flex items-center gap-1.5 text-cyan-300">
                  <span className="h-1.5 w-1.5 rotate-45 bg-cyan-400 shadow-[0_0_6px_#00f2fe]" />
                  <span className="font-bold tracking-wider">HOME</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-1 w-2.5 bg-cyan-400 shadow-[0_0_4px_#00f2fe]" />
                  <span className="h-1 w-1.5 bg-cyan-400/70" />
                  <span className="h-1 w-1 bg-cyan-400/40" />
                </div>
              </div>

              {/* Telemetry Data Content */}
              <div className="space-y-0.5 text-cyan-400/80">
                <div className="flex items-center gap-1.5 text-cyan-300/90 transition-colors group-hover/project:text-cyan-200">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span>LOCATION: HO CHI MINH CITY, VIETNAM [UTC+7]</span>
                </div>
                <div className="transition-colors group-hover/project:text-white">
                  COORDINATES: 10.785039°N, 106.649240°E
                </div>
                {weather ? (
                  <>
                    <div className="transition-colors group-hover/project:text-cyan-200">
                      TEMPERATURE: {weather.temp}°C · HUMIDITY: {weather.humidity}%
                    </div>
                    <div className="transition-colors group-hover/project:text-cyan-200">
                      WIND: {(weather.windSpeed ?? 0).toFixed(1)} km/h · UV INDEX:{" "}
                      {(weather.uvIndex ?? 0).toFixed(1)} (
                      {weather.uvLevel || getUvLevel(weather.uvIndex ?? 0)})
                    </div>
                    <div className="transition-colors group-hover/project:text-cyan-300">
                      CONDITION: {weather.condition}
                    </div>
                  </>
                ) : (
                  <div className="animate-pulse text-cyan-400/60">
                    WEATHER TELEMETRY: SYNCHRONIZING...
                  </div>
                )}
              </div>
            </div>

            {/* Holographic Targeting Leader Line pointing toward Island (LoL PROJECT Target Lock HUD) */}
            <svg className="pointer-events-none absolute -bottom-6 right-6 h-6 w-12 overflow-visible opacity-35 transition-opacity duration-300 group-hover/project:opacity-85">
              <path
                d="M 0 0 L 8 10 H 20 L 26 16"
                fill="none"
                stroke="#00f2fe"
                strokeWidth="1"
                strokeDasharray="3 2"
                className="drop-shadow-[0_0_4px_#00f2fe]"
              />
              <circle cx="26" cy="16" r="1.5" fill="#00f2fe" className="animate-pulse" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
