import { ProjectItem } from "@/types";

export const projectsData: ProjectItem[] = [
  {
    id: "laas-portal",
    name: "Lab-as-a-Service (LaaS) Platform",
    desc: "A cloud-based IT training and virtual hands-on lab platform built as an Nx Monorepo, featuring real-time lab environment orchestration, microservices architecture, automated grading, and 3 specialized portals.",
    tech: [
      "Nx Monorepo",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "Tailwind CSS",
    ],
    github: "https://github.com/pTn-3001/Lab-as-a-Service.git",
    video: "https://youtu.be/U2W9UBZ9fuo",
    thumbnailSrc: "/assets/projects/laas.png",
    highlights: [
      "Microservices Architecture & API Gateway",
      "Multi-Portal Nx Monorepo Management",
      "Lab Lifecycle & Auto-Grading Engine",
    ],
  },
  {
    id: "kumon-cms",
    name: "Kumon Center Management System",
    desc: "An enterprise operational management platform for Kumon centers, automating student enrollments, academic progress tracking, attendance, financial workflows, and multi-role RBAC access control.",
    tech: ["Next.js", "PostgreSQL", "Prisma ORM", "Docker", "Cloudflare", "TailwindCSS"],
    github: "https://github.com/pTn-3001/Kumon-Center-Management.git",
    demo: "https://kumon.ptn2026.id.vn",
    thumbnailSrc:
      "https://csaed.hcmue.edu.vn/wp-content/uploads/2025/05/LOGO-NTT-12-1.png",
    highlights: [
      "Docker & Cloudflare Tunnel Deployment",
      "Granular RBAC & Role Management",
      "Automated Financials & PDF Generation",
    ],
  },
  {
    id: "telecom-asterisk-voip",
    name: "Asterisk VoIP PBX & Advanced IVR System",
    desc: "A VoIP PBX system built with Asterisk, featuring SIP/IAX2 trunking, custom dialplan routing, automated IVR call navigation, voicemail services, and time-based call management.",
    tech: ["Asterisk", "VoIP", "Zoiper", "VMWare"],
    github: "https://github.com/pTn-3001/Asterisk-VoIP.git",
    video:
      "https://drive.google.com/drive/folders/1v5GGhRmg8jGx0TWJ81MqdwDOIm7IGLrD?usp=sharing",
    thumbnailSrc: "/assets/projects/voip.jpg",
    highlights: [
      "Interactive Voice Response (IVR) & Custom Audio Prompts",
      "Time-Based Call Routing & Exception Handling",
      "SIP/IAX2 Extensions & Voicemail Integration",
    ],
  },
];
