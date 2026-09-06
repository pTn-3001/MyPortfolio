"use client";

import React, { useEffect, useRef } from "react";

interface MeteorParticle {
  x: number;
  y: number;
  speed: number;
  scale: number;
  opacity: number;
  angle: number; // travel angle in radians
  fadeSpeed: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const meteorImg = new Image();
    meteorImg.src = "/assets/images/meteor.webp";

    const meteors: MeteorParticle[] = [];
    let lastSpawnTime = 0;
    const spawnInterval = 4200; // spawn every ~4.2s

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", resize);
    resize();

    // Spawn meteor traveling from TOP-LEFT to BOTTOM-RIGHT
    const spawnMeteor = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Start from upper-left quadrant
      const startX = Math.random() * (width * 0.5) - 120;
      const startY = -80 + Math.random() * (height * 0.3);

      // Angle: ~36 degrees (down-right diagonal)
      const angle = (36 * Math.PI) / 180 + (Math.random() - 0.5) * 0.08;

      meteors.push({
        x: startX,
        y: startY,
        speed: (1.4 + Math.random() * 0.8) * 1.2, // Faster by 1.2x (~1.7 to 2.6 px/frame)
        scale: 0.16 + Math.random() * 0.1,
        opacity: 0.0,
        angle,
        fadeSpeed: 0.02,
      });
    };

    // Enhanced Cosmic Twinkling Stars & Cross Sparkles
    interface CosmicStar {
      x: number;
      y: number;
      size: number;
      phase: number;
      speed: number;
      type: "dot" | "glow" | "cross";
      color: string;
      glowColor: string;
    }

    const starPalette = [
      { color: "255, 255, 255", glow: "200, 240, 255" }, // Pure Diamond White
      { color: "0, 242, 254", glow: "0, 200, 255" }, // Electric Cyan
      { color: "254, 215, 102", glow: "255, 180, 50" }, // Starlight Amber
      { color: "192, 132, 252", glow: "168, 85, 247" }, // Cosmic Lavender
    ];

    const starParticles: CosmicStar[] = [];
    const totalStars = 95;

    for (let i = 0; i < totalStars; i++) {
      const p = starPalette[Math.floor(Math.random() * starPalette.length)];
      let type: "dot" | "glow" | "cross" = "dot";
      let size = Math.random() * 1.4 + 0.6;

      if (i < 16) {
        // 16 Four-Point Cross Sparkle Stars (✦)
        type = "cross";
        size = Math.random() * 2.8 + 2.4;
      } else if (i < 42) {
        // 26 Medium Pulsing Glow Stars
        type = "glow";
        size = Math.random() * 2.0 + 1.2;
      }

      starParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.025,
        type,
        color: p.color,
        glowColor: p.glow,
      });
    }

    let isMeteorLoaded = false;
    meteorImg.onload = () => {
      isMeteorLoaded = true;
    };

    const render = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Render cosmic twinkling stars and 4-point cross sparkles
      for (const star of starParticles) {
        star.phase += star.speed;
        const pulse = (Math.sin(star.phase) + 1) * 0.5; // 0 to 1
        const alpha = 0.15 + pulse * 0.8;
        const currentSize = star.size * (0.75 + pulse * 0.4);

        if (star.type === "cross") {
          // 4-Point Diamond Sparkle Star (✦)
          ctx.save();
          ctx.translate(star.x, star.y);

          // Subtle background glow halo
          const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize * 2.5);
          halo.addColorStop(0, `rgba(${star.glowColor}, ${alpha * 0.6})`);
          halo.addColorStop(1, `rgba(${star.glowColor}, 0)`);
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(0, 0, currentSize * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // 4-Point cross rays (Vertical & Horizontal tapered beams)
          const rayLen = currentSize * 2.2;
          const rayThick = Math.max(0.6, currentSize * 0.28);

          ctx.fillStyle = `rgba(${star.color}, ${alpha})`;

          // Vertical diamond spike
          ctx.beginPath();
          ctx.moveTo(0, -rayLen);
          ctx.lineTo(rayThick, 0);
          ctx.lineTo(0, rayLen);
          ctx.lineTo(-rayThick, 0);
          ctx.closePath();
          ctx.fill();

          // Horizontal diamond spike
          ctx.beginPath();
          ctx.moveTo(-rayLen, 0);
          ctx.lineTo(0, rayThick);
          ctx.lineTo(rayLen, 0);
          ctx.lineTo(0, -rayThick);
          ctx.closePath();
          ctx.fill();

          // Core bright center dot
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.3)})`;
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(0.8, rayThick * 0.9), 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        } else if (star.type === "glow") {
          // Medium star with soft radial glow
          ctx.save();
          const radGrad = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            currentSize * 2.0
          );
          radGrad.addColorStop(0, `rgba(${star.color}, ${alpha})`);
          radGrad.addColorStop(0.4, `rgba(${star.glowColor}, ${alpha * 0.4})`);
          radGrad.addColorStop(1, `rgba(${star.glowColor}, 0)`);
          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, currentSize * 2.0, 0, Math.PI * 2);
          ctx.fill();

          // Center spark
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, currentSize * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Tiny ambient stardust twinkle
          ctx.fillStyle = `rgba(${star.color}, ${alpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, currentSize * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Spawn meteors at gentle intervals
      if (time - lastSpawnTime > spawnInterval) {
        spawnMeteor();
        lastSpawnTime = time + (Math.random() * 1500 - 750);
      }

      // Render & update meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];

        // Fade in / out smoothly
        if (m.opacity < 0.9 && m.y < h * 0.7) {
          m.opacity = Math.min(0.9, m.opacity + m.fadeSpeed);
        } else if (m.y >= h * 0.7) {
          m.opacity = Math.max(0, m.opacity - m.fadeSpeed * 1.2);
        }

        // Travel from top-left to bottom-right
        const vx = Math.cos(m.angle) * m.speed;
        const vy = Math.sin(m.angle) * m.speed;
        m.x += vx;
        m.y += vy;

        ctx.save();
        ctx.globalAlpha = m.opacity;
        ctx.translate(m.x, m.y);

        // Orient meteor head forward towards bottom-right:
        // Cleaned meteor.png has head at bottom-left (~138°).
        // Rotating by (m.angle - 138°) aligns the head in the direction of travel!
        const rawAngle = (138 * Math.PI) / 180;
        ctx.rotate(m.angle - rawAngle);

        if (isMeteorLoaded && meteorImg.naturalWidth > 0) {
          const imgW = (meteorImg.naturalWidth || 1313) * m.scale;
          const imgH = (meteorImg.naturalHeight || 982) * m.scale;

          // Glowing cyan/purple cosmic aura behind meteor head
          const glowGrad = ctx.createRadialGradient(
            -imgW * 0.29,
            imgH * 0.32,
            3,
            -imgW * 0.29,
            imgH * 0.32,
            imgW * 0.22
          );
          glowGrad.addColorStop(0, "rgba(0, 242, 254, 0.75)");
          glowGrad.addColorStop(0.5, "rgba(147, 51, 234, 0.35)");
          glowGrad.addColorStop(1, "rgba(147, 51, 234, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(-imgW * 0.29, imgH * 0.32, imgW * 0.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.drawImage(meteorImg, -imgW / 2, -imgH / 2, imgW, imgH);
        }

        ctx.restore();

        // Remove offscreen
        if (m.x > w + 250 || m.y > h + 250 || m.opacity <= 0) {
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
    />
  );
}
