"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Mail,
  Copy,
  Check,
  Code2,
  Cpu,
  GraduationCap,
  Briefcase,
  Terminal,
  Star,
  Calendar,
  MapPin,
  Phone,
  Globe,
  CircleUser,
  FolderOpen,
  Video,
} from "lucide-react";
import { soundEngine } from "@/utils/audio";
import { ItemConfig } from "@/types";
import TechLogo from "./TechLogos";
import {
  aboutData,
  projectsData,
  skillsData,
  experienceData,
  educationData,
  contactData,
} from "@/data";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 0 0 0-3.26 1.63 1.63 0 0 0 0 3.26m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface SectionModalProps {
  activeItem: ItemConfig | null;
  onClose: () => void;
}

export default function SectionModal({ activeItem, onClose }: SectionModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundEngine.playCloseModal();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    soundEngine.playClick();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleClose = () => {
    soundEngine.playCloseModal();
    onClose();
  };

  const getContactIcon = (iconName: string) => {
    switch (iconName) {
      case "mail":
        return <Mail className="h-4 w-4 text-cyan-400" />;
      case "github":
        return <GithubIcon className="h-4 w-4 text-white" />;
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4 text-[#0077B5]" />;
      case "facebook":
        return <FacebookIcon className="h-4 w-4 text-[#1877F2]" />;
      default:
        return <Mail className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <AnimatePresence>
      {activeItem && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex select-none items-center justify-center p-3 sm:p-6">
          {/* Hologram Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#020713]/85 backdrop-blur-md"
          />

          {/* Sci-Fi Glassmorphism Modal Frame */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-cyan-400/40 bg-[#061427]/95 text-white shadow-[0_0_50px_rgba(0,242,254,0.3)]"
          >
            {/* Tech Grid Pattern Texture Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,242,254,0.08),transparent_70%)]" />

            {/* Modal Header HUD */}
            <div className="relative flex items-center justify-between border-b border-cyan-500/25 bg-[#040e1e]/90 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/60 bg-cyan-950/80 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                  {activeItem.id === "about" && (
                    <CircleUser className="h-5 w-5 text-cyan-300" />
                  )}
                  {activeItem.id === "education" && (
                    <GraduationCap className="h-5 w-5 text-cyan-300" />
                  )}
                  {activeItem.id === "skills" && (
                    <Code2 className="h-5 w-5 text-cyan-300" />
                  )}
                  {activeItem.id === "projects" && (
                    <FolderOpen className="h-5 w-5 text-cyan-300" />
                  )}
                  {activeItem.id === "experience" && (
                    <Briefcase className="h-5 w-5 text-cyan-300" />
                  )}
                  {activeItem.id === "contact" && (
                    <Mail className="h-5 w-5 text-cyan-300" />
                  )}
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                    {activeItem.category}
                  </div>
                  <h2
                    id="modal-headline"
                    className="flex items-center gap-2 font-sans text-lg font-bold tracking-wide text-white sm:text-xl"
                  >
                    {activeItem.title}
                    <span className="font-mono text-xs font-normal text-cyan-300/70">
                      [{activeItem.subtitle}]
                    </span>
                  </h2>
                </div>
              </div>

              {/* Glowing Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close dialog"
                className="group relative rounded-lg border border-cyan-400/40 bg-cyan-950/60 p-2 text-cyan-300 transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_15px_#00f2fe]"
              >
                <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* Modal Body with Custom Scrollbar */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5 text-slate-200">
              {/* ================= SECTION: ABOUT ================= */}
              {activeItem.id === "about" && (
                <div className="space-y-5">
                  {/* Top Profile Banner with Scaled-Up 1.2x Profile Photo */}
                  <div className="flex flex-col items-center gap-6 rounded-xl border border-cyan-500/30 bg-[#0c1f38]/70 p-5 sm:flex-row">
                    {/* Enlarged Avatar Frame (20% larger: w-36 h-36 sm:w-40 sm:h-40) */}
                    <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl border-2 border-cyan-400 bg-[#081729] shadow-[0_0_30px_rgba(0,242,254,0.5)] sm:h-40 sm:w-40">
                      <Image
                        src={aboutData.avatarSrc}
                        alt={aboutData.fullName}
                        fill
                        sizes="(max-width: 768px) 144px, 160px"
                        priority
                        className="object-cover"
                      />
                      {/* Cyber Hologram Corners */}
                      <div className="absolute left-1.5 top-1.5 h-2.5 w-2.5 border-l-2 border-t-2 border-cyan-300" />
                      <div className="absolute right-1.5 top-1.5 h-2.5 w-2.5 border-r-2 border-t-2 border-cyan-300" />
                      <div className="absolute bottom-1.5 left-1.5 h-2.5 w-2.5 border-b-2 border-l-2 border-cyan-300" />
                      <div className="absolute bottom-1.5 right-1.5 h-2.5 w-2.5 border-b-2 border-r-2 border-cyan-300" />
                    </div>

                    <div className="flex-1 space-y-1.5 text-center sm:text-left">
                      <div className="flex items-center justify-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-400 sm:justify-start">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        {aboutData.role}
                      </div>
                      <h3 className="text-2xl font-bold tracking-wide text-white sm:text-3xl">
                        {aboutData.fullName}
                      </h3>
                      <p className="font-sans text-xs leading-relaxed text-slate-300 sm:text-sm">
                        {aboutData.bio}
                      </p>
                    </div>
                  </div>

                  {/* Personal Bio Details Grid (Replacing the 4 power bars) */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {/* Date of Birth */}
                    <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-[#081930]/80 p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950 text-cyan-400">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/80">
                          DATE OF BIRTH
                        </div>
                        <div className="truncate text-xs font-bold text-white">
                          {aboutData.details.birthDate}
                        </div>
                      </div>
                    </div>

                    {/* Nationality */}
                    <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-[#081930]/80 p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950 text-amber-400">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/80">
                          NATIONALITY
                        </div>
                        <div className="truncate text-xs font-bold text-white">
                          {aboutData.details.nationality}
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-[#081930]/80 p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950 text-emerald-400">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/80">
                          LOCATION
                        </div>
                        <div className="truncate text-xs font-bold text-white">
                          {aboutData.details.location}
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-[#081930]/80 p-3.5 sm:col-span-2 md:col-span-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950 text-cyan-300">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/80">
                          EMAIL ADDRESS
                        </div>
                        <div className="truncate font-mono text-xs font-bold text-white">
                          {aboutData.details.email}
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-[#081930]/80 p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950 text-teal-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/80">
                          PHONE CONTACT
                        </div>
                        <div className="truncate font-mono text-xs font-bold text-white">
                          {aboutData.details.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Philosophy & Bio */}
                  <div className="space-y-2 rounded-xl border border-cyan-500/20 bg-[#09182d]/60 p-4">
                    <h4 className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-cyan-400">
                      <Terminal className="h-3.5 w-3.5" />
                      CAREER ORIENTATION
                    </h4>
                    <p className="font-sans text-xs italic leading-relaxed text-slate-300 sm:text-sm">
                      &quot;{aboutData.careerOrientation}&quot;
                    </p>
                  </div>
                </div>
              )}

              {/* ================= SECTION: PROJECTS ================= */}
              {activeItem.id === "projects" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {projectsData.map((proj) => (
                    <div
                      key={proj.id}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-cyan-500/25 bg-[#0a1b33]/85 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,242,254,0.25)]"
                    >
                      {/* Project Preview Thumbnail */}
                      <div className="relative flex h-36 w-full items-center justify-center overflow-hidden border-b border-cyan-500/20 bg-[#040e1e]">
                        {proj.thumbnailSrc && (
                          <div className="relative flex h-full w-full items-center justify-center p-3">
                            <Image
                              src={proj.thumbnailSrc}
                              alt={proj.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 360px"
                              className="group-hover:scale-108 object-contain p-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transition-transform duration-500"
                            />
                          </div>
                        )}
                        {/* Futuristic Tech Grid Mask Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1b33] via-transparent to-transparent" />

                        {/* Top Action Buttons (Code, Video, Live) */}
                        <div className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1.5">
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 rounded-lg border border-cyan-400/40 bg-[#0e2444]/90 p-1.5 text-xs text-cyan-300 shadow-sm backdrop-blur-sm transition-all hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white"
                              title="View Source Code"
                            >
                              <GithubIcon className="h-3.5 w-3.5" />
                              <span className="font-mono text-[11px]">Code</span>
                            </a>
                          )}
                          {/* Video Demo Button */}
                          {(proj.video ||
                            (proj.demo &&
                              /youtube\.com|youtu\.be|vimeo\.com|\.mp4$/i.test(
                                proj.demo
                              ))) && (
                            <a
                              href={proj.video || proj.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 rounded-lg border border-cyan-400 bg-cyan-600/30 p-1.5 text-xs text-cyan-200 shadow-[0_0_10px_rgba(0,242,254,0.4)] backdrop-blur-sm transition-all hover:bg-cyan-500 hover:text-white"
                              title="Watch Demo Video"
                            >
                              <Video className="h-3.5 w-3.5" />
                              <span className="font-mono text-[11px]">Video</span>
                            </a>
                          )}
                          {/* Live Web Preview Button */}
                          {proj.demo &&
                            proj.demo !== "#" &&
                            !/youtube\.com|youtu\.be|vimeo\.com|\.mp4$/i.test(
                              proj.demo
                            ) && (
                              <a
                                href={proj.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 rounded-lg border border-cyan-400 bg-cyan-600/30 p-1.5 text-xs text-cyan-200 shadow-[0_0_10px_rgba(0,242,254,0.4)] backdrop-blur-sm transition-all hover:bg-cyan-500 hover:text-white"
                                title="Open Live Preview"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span className="font-mono text-[11px]">Live</span>
                              </a>
                            )}
                        </div>
                      </div>

                      {/* Project Body */}
                      <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
                        <div>
                          {/* Clean Title without badge tag */}
                          <h4 className="text-base font-bold tracking-wide text-white transition-colors group-hover:text-cyan-300">
                            {proj.name}
                          </h4>

                          <p className="mt-2 text-xs leading-relaxed text-slate-300">
                            {proj.desc}
                          </p>

                          {/* Key Highlights */}
                          {proj.highlights && proj.highlights.length > 0 && (
                            <div className="mt-2.5 space-y-1">
                              {proj.highlights.map((h, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-200/90"
                                >
                                  <span className="text-[10px] text-cyan-400">▹</span>
                                  <span>{h}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 border-t border-cyan-500/15 pt-2">
                          {proj.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="rounded-md border border-cyan-500/25 bg-[#0d264a] px-2 py-0.5 font-mono text-[10px] text-slate-300"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= SECTION: SKILLS ================= */}
              {activeItem.id === "skills" && (
                <div className="space-y-5">
                  {skillsData.map((cat) => (
                    <div
                      key={cat.id}
                      className="rounded-xl border border-cyan-500/25 bg-[#081a33]/80 p-4"
                    >
                      <h4 className="mb-3.5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                        <span className="h-2 w-2 rounded-sm bg-cyan-400" />
                        {cat.title}
                      </h4>
                      {/* Skills Grid with Genuine Tech Logos and No Text Badges */}
                      {cat.id === "languages" ? (
                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                          {cat.skills.map((s, i) => (
                            <div
                              key={i}
                              className="group flex items-center gap-3 rounded-xl border border-cyan-500/25 bg-[#0d264a]/90 px-3.5 py-2.5 transition-all hover:border-cyan-400 hover:bg-[#10305c] hover:shadow-[0_0_12px_rgba(0,242,254,0.25)]"
                            >
                              <TechLogo
                                name={s.iconKey}
                                iconUrl={s.iconUrl}
                                className="h-4 w-4 shrink-0 rounded-sm object-cover transition-transform group-hover:scale-110"
                              />
                              <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">
                                {s.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                          {cat.skills.map((s, i) => (
                            <div
                              key={i}
                              className="group flex items-center gap-2.5 rounded-xl border border-cyan-500/25 bg-[#0d264a]/90 px-3 py-2 transition-all hover:border-cyan-400 hover:bg-[#10305c] hover:shadow-[0_0_12px_rgba(0,242,254,0.25)]"
                            >
                              <TechLogo
                                name={s.iconKey}
                                iconUrl={s.iconUrl}
                                className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
                              />
                              <span
                                className="truncate text-xs font-semibold tracking-wide text-white"
                                title={s.name}
                              >
                                {s.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ================= SECTION: EXPERIENCE ================= */}
              {activeItem.id === "experience" && (
                <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-cyan-600 before:to-transparent">
                  {experienceData.map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Glowing Node */}
                      <div className="absolute -left-[30px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#071324] bg-cyan-400 shadow-[0_0_10px_#00f2fe]" />

                      <div className="space-y-2 rounded-xl border border-cyan-500/25 bg-[#091c36]/70 p-4">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                          <h4 className="text-base font-bold text-white">{item.role}</h4>
                          <span className="w-fit rounded border border-cyan-400/40 bg-cyan-950/80 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                            {item.period}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400/90">
                          <span>@{item.company}</span>
                          {item.location && (
                            <>
                              <span>•</span>
                              <span className="font-sans text-slate-400">
                                {item.location}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Tech stack chips */}
                        {item.techStack && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.techStack.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="rounded border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 font-mono text-[10px] text-cyan-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
                          {item.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-1.5">
                              <span className="mt-0.5 text-cyan-400">▹</span>
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= SECTION: EDUCATION ================= */}
              {activeItem.id === "education" && (
                <div className="space-y-4">
                  {educationData.map((edu) => (
                    <div
                      key={edu.id}
                      className="space-y-3 rounded-xl border border-cyan-500/25 bg-[#0a1e3b]/70 p-4 sm:p-5"
                    >
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="text-lg font-bold text-white sm:text-xl">
                            {edu.institution}
                          </h3>
                          {(edu.degree || edu.major) && (
                            <p className="mt-0.5 text-xs text-cyan-200 sm:text-sm">
                              {edu.degree}
                              {edu.degree && edu.major && " - "}
                              {edu.major}
                            </p>
                          )}
                        </div>

                        <div className="text-left sm:text-right">
                          {edu.gpa && (
                            <span className="rounded border border-cyan-400 bg-cyan-950 px-2.5 py-1 font-mono text-xs font-bold text-cyan-300 shadow-[0_0_10px_rgba(0,242,254,0.3)]">
                              {edu.gpa}
                            </span>
                          )}
                          <div className="mt-1 font-mono text-[10px] text-slate-400">
                            {edu.period}
                          </div>
                        </div>
                      </div>

                      {/* Academic highlights */}
                      {edu.highlights && edu.highlights.length > 0 && (
                        <div className="border-t border-cyan-500/20 pt-3">
                          <h4 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                            NOTABLE ACHIEVEMENTS
                          </h4>
                          <div className="grid grid-cols-1 gap-2 text-xs text-slate-300 sm:grid-cols-2">
                            {edu.highlights.map((h, hIdx) => (
                              <div
                                key={hIdx}
                                className="flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-[#0d2547] p-2"
                              >
                                <Star className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ================= SECTION: CONTACT ================= */}
              {activeItem.id === "contact" && (
                <div className="space-y-4">
                  {/* 4 Communication Cards: Email, GitHub, LinkedIn, Facebook */}
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    {contactData.channels.map((chan) => (
                      <div
                        key={chan.id}
                        className="group flex items-center justify-between rounded-xl border border-cyan-500/30 bg-[#091a33]/90 p-4 transition-all hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.25)]"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950 transition-colors group-hover:border-cyan-400">
                            {getContactIcon(chan.iconName)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-mono text-[10px] tracking-wider text-cyan-300/80">
                              {chan.label}
                            </div>
                            <div className="truncate font-mono text-xs font-bold text-white">
                              {chan.value}
                            </div>
                          </div>
                        </div>

                        {/* Action buttons: Copy & External Link */}
                        <div className="ml-2 flex shrink-0 items-center gap-1.5">
                          <button
                            onClick={() =>
                              handleCopy(chan.id, chan.copyValue || chan.value)
                            }
                            title="Copy to clipboard"
                            className="rounded-lg border border-cyan-500/30 bg-[#0d2442] p-1.5 text-xs text-cyan-300 transition-all hover:border-cyan-300 hover:text-white"
                          >
                            {copiedKey === chan.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>

                          {chan.link && (
                            <a
                              href={chan.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open in new tab"
                              className="rounded-lg border border-cyan-400 bg-cyan-600/30 p-1.5 text-xs text-cyan-200 shadow-[0_0_8px_rgba(0,242,254,0.3)] transition-all hover:bg-cyan-500 hover:text-white"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer HUD */}
            <div className="flex select-none items-center justify-between border-t border-cyan-500/20 bg-[#050f1f] px-6 py-2.5 font-mono text-[10px] text-cyan-400/70">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />
                <span>STATUS: VERIFIED</span>
              </div>
              <div>[ ESC OR CLICK OUTSIDE TO CLOSE ]</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
