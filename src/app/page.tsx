"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import CosmicLayers from "@/components/CosmicLayers";
import FloatingIsland from "@/components/FloatingIsland";
import NavigationHUD from "@/components/NavigationHUD";
import SectionModal from "@/components/SectionModal";
import SciFiPreloader from "@/components/SciFiPreloader";
import { ItemConfig } from "@/types";

export default function Home() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState<ItemConfig | null>(null);

  // Target coordinates for smoothed lerp
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const currentOffsetRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  // Smooth lerp mouse tracking loop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      targetOffsetRef.current = { x: nx, y: ny };
    };

    // For mobile/touch sway: gentle auto-sway when no mouse is active
    let autoSwayTime = 0;
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const lerpLoop = () => {
      if (isTouchDevice) {
        autoSwayTime += 0.015;
        targetOffsetRef.current = {
          x: Math.sin(autoSwayTime) * 0.3,
          y: Math.cos(autoSwayTime * 0.8) * 0.2,
        };
      }

      // Smooth dampening factor
      const factor = 0.05;
      currentOffsetRef.current.x +=
        (targetOffsetRef.current.x - currentOffsetRef.current.x) * factor;
      currentOffsetRef.current.y +=
        (targetOffsetRef.current.y - currentOffsetRef.current.y) * factor;

      setMouseOffset({
        x: currentOffsetRef.current.x,
        y: currentOffsetRef.current.y,
      });

      animFrameIdRef.current = requestAnimationFrame(lerpLoop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animFrameIdRef.current = requestAnimationFrame(lerpLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  const handleSelectItem = useCallback((item: ItemConfig) => {
    setActiveItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveItem(null);
  }, []);

  return (
    <main className="relative h-screen w-screen select-none overflow-hidden bg-[#050b14]">
      {/* Layer 0 & Layer 2: Deep Space Background & Cosmic Orbiting Assets */}
      <CosmicLayers mouseOffset={mouseOffset} />

      {/* Layer 1: HTML5 Canvas for Floating Glowing Meteors & Stardust particles */}
      <BackgroundCanvas />

      {/* Layer 3 & Layer 4: Main Floating Isometric Island, Hotspot Items & Doraemon Companion */}
      <div className="flex h-full w-full items-center justify-center">
        <FloatingIsland mouseOffset={mouseOffset} onSelectItem={handleSelectItem} />
      </div>

      {/* Layer 5: Sci-Fi Telemetry Navigation HUD & Quick Launch Dock */}
      <NavigationHUD
        onSelectItem={handleSelectItem}
        activeItemId={activeItem?.id || null}
      />

      {/* Layer 6: Sci-Fi Section Detail Modal Popup */}
      <SectionModal activeItem={activeItem} onClose={handleCloseModal} />

      {/* Layer 7: Sci-Fi Telemetry Asset Preloader */}
      <SciFiPreloader />
    </main>
  );
}
