"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Compass,
  Zap,
  Code2,
  Briefcase,
  GraduationCap,
  Mail,
  Sparkles,
  HelpCircle,
  X,
  CircleUser,
  FolderOpen,
} from "lucide-react";
import { soundEngine } from "@/utils/audio";
import { ItemConfig } from "@/types";
import { ISLAND_ITEMS } from "@/data/islandItems";

interface NavigationHUDProps {
  onSelectItem: (item: ItemConfig) => void;
  activeItemId: string | null;
}

export default function NavigationHUD({
  onSelectItem,
  activeItemId,
}: NavigationHUDProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setIsMuted(soundEngine.isMuted());

    const updateTime = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const getItemIcon = (id: string) => {
    switch (id) {
      case "about":
        return <CircleUser className="h-3.5 w-3.5" />;
      case "education":
        return <GraduationCap className="h-3.5 w-3.5" />;
      case "skills":
        return <Code2 className="h-3.5 w-3.5" />;
      case "projects":
        return <FolderOpen className="h-3.5 w-3.5" />;
      case "experience":
        return <Briefcase className="h-3.5 w-3.5" />;
      case "contact":
        return <Mail className="h-3.5 w-3.5" />;
      default:
        return <Compass className="h-3.5 w-3.5" />;
    }
  };

  return (
    <>
      {/* Top Header HUD Bar */}
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-40 flex select-none items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo & Identity */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/50 bg-[#071325]/90 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            <span className="font-mono text-sm font-black tracking-tighter text-cyan-300">
              PTN
            </span>
            <div className="absolute -right-1 -top-1 h-2 w-2 animate-ping rounded-full bg-cyan-400" />
          </div>

          <div>
            <div className="flex">
              <span className="font-sans text-xs font-bold tracking-wider text-white drop-shadow sm:text-sm">
                NABITO ROOM
              </span>
            </div>
            <div className="hidden font-mono text-[10px] tracking-widest text-cyan-400/70 sm:block">
              MY JOURNEY LOG
            </div>
          </div>
        </div>

        {/* Center Telemetry (Desktop only) */}
        <div className="pointer-events-auto hidden items-center gap-4 rounded-full border border-cyan-500/25 bg-[#071325]/80 px-4 py-1.5 font-mono text-[11px] text-slate-300 backdrop-blur-sm lg:flex">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-emerald-300">ORBIT STABLE</span>
          </div>
          <span className="text-cyan-600">|</span>
          <div className="text-cyan-300">UTC: {currentTime || "00:00:00"}</div>
          <span className="text-cyan-600">|</span>
          <div className="text-slate-400">MODE: OPEN TO WORK</div>
        </div>

        {/* Right Controls: Audio Toggle & Guide */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Guide / Instructions button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setShowGuide(true);
            }}
            title="Navigation Guide"
            className="rounded-lg border border-cyan-500/30 bg-[#071325]/90 p-2 text-cyan-300 transition-all hover:border-cyan-400 hover:text-white hover:shadow-[0_0_12px_rgba(0,242,254,0.4)]"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* Sound Mute Toggle Button */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? "Unmute Procedural Audio" : "Mute Audio"}
            className={`flex items-center gap-1.5 rounded-lg border p-2 transition-all ${
              isMuted
                ? "border-slate-700 bg-slate-900/90 text-slate-400"
                : "border-cyan-400/60 bg-[#071325]/90 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.35)] hover:border-cyan-300"
            }`}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4 animate-pulse" />
            )}
            <span className="hidden font-mono text-[10px] md:inline-block">
              {isMuted ? "AUDIO OFF" : "AUDIO ON"}
            </span>
          </button>
        </div>
      </header>

      {/* Bottom Quick Launch Dock */}
      <nav className="pointer-events-auto fixed bottom-4 left-1/2 z-40 max-w-[95vw] -translate-x-1/2 select-none">
        <div className="flex items-center gap-1 rounded-2xl border border-cyan-400/40 bg-[#071325]/90 px-2.5 py-2 shadow-[0_0_25px_rgba(0,242,254,0.25)] backdrop-blur-md sm:gap-2 sm:px-3">
          {ISLAND_ITEMS.map((item) => {
            const isActive = activeItemId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playOpenModal();
                  onSelectItem(item);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`group relative flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "border border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_12px_#00f2fe]"
                    : "text-slate-300 hover:border hover:border-cyan-500/40 hover:bg-cyan-950/60 hover:text-white"
                }`}
              >
                <div
                  className={`rounded-md p-1 ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-[0_0_8px_#00f2fe]"
                      : "bg-[#0b1e38] text-cyan-300 group-hover:text-cyan-200"
                  }`}
                >
                  {getItemIcon(item.id)}
                </div>

                <span className="hidden whitespace-nowrap font-sans text-[11px] sm:inline-block">
                  {item.title}
                </span>

                {/* Mobile Active Indicator Dot */}
                {isActive && (
                  <span className="absolute -top-1 right-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f2fe] sm:hidden" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Interactive Guide / How to Play Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="crt-scanlines relative w-full max-w-md rounded-2xl border border-cyan-400/50 bg-[#081529] p-6 text-slate-200 shadow-[0_0_30px_rgba(0,242,254,0.4)]">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-3 flex items-center gap-2 font-bold text-cyan-300">
              <HelpCircle className="h-5 w-5" />
              <h3 className="font-sans text-base tracking-wide">
                ISLAND EXPLORATION GUIDE
              </h3>
            </div>

            <div className="space-y-3 font-sans text-xs leading-relaxed text-slate-300">
              <div className="rounded-lg border border-cyan-500/25 bg-[#0d2242] p-2.5">
                <span className="font-mono font-bold text-cyan-300">
                  1. HOVER & DISCOVER:
                </span>{" "}
                Move your cursor over any item on the island to see neon cyan glow, item
                lift, and pixel tooltips.
              </div>

              <div className="rounded-lg border border-cyan-500/25 bg-[#0d2242] p-2.5">
                <span className="font-mono font-bold text-cyan-300">
                  2. CLICK HOTSPOTS:
                </span>{" "}
                Click any floating icon on the island or use the bottom launcher dock to
                access full portfolio details.
              </div>

              <div className="rounded-lg border border-cyan-500/25 bg-[#0d2242] p-2.5">
                <span className="font-mono font-bold text-cyan-300">3. 3D PARALLAX:</span>{" "}
                Move your mouse across the screen to experience multi-depth 3D parallax
                between space, meteors, satellites, and the island.
              </div>

              <div className="rounded-lg border border-cyan-500/25 bg-[#0d2242] p-2.5">
                <span className="font-mono font-bold text-cyan-300">
                  4. DORAEMON COMPANION:
                </span>{" "}
                Click or right-click anywhere on the island ground to guide Doraemon
                around!
              </div>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-4 w-full rounded-lg bg-cyan-500 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all hover:bg-cyan-400"
            >
              CLOSE GUIDE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
