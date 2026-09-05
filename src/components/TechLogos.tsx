import React from "react";

interface TechLogoProps {
  name: string;
  iconUrl?: string;
  className?: string;
}

// Fallback Devicon CDN registry in case iconUrl is not directly passed
const DEVICON_URLS: Record<string, string> = {
  typescript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  cplusplus:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  bash: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  tailwind:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  windows:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
  postgresql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  mongodb:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  cloudflare:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
  nestjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
  kubernetes:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  jenkins:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  openstack:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openstack/openstack-original.svg",
  vietnam: "https://flagcdn.com/vn.svg",
  english: "https://flagcdn.com/gb.svg",
};

// Logos with pure black fills that should be inverted/brightened on dark backgrounds
const INVERT_LOGOS = new Set(["bash", "express"]);

export default function TechLogo({
  name,
  iconUrl,
  className = "w-4 h-4",
}: TechLogoProps) {
  const lowerName = name.toLowerCase();
  const url = iconUrl || DEVICON_URLS[lowerName];
  const shouldInvert = INVERT_LOGOS.has(lowerName);

  if (!url) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00f2fe"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }

  return (
    <img
      src={url}
      alt={`${name} logo`}
      className={`${className} object-contain transition-transform duration-200 ${
        shouldInvert ? "brightness-0 invert" : ""
      }`}
      loading="lazy"
    />
  );
}
