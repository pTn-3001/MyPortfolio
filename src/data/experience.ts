import { ExperienceItem } from "@/types";

export const experienceData: ExperienceItem[] = [
  {
    period: "10/2025 — 02/2026",
    role: "IT Intern",
    company: "Robusta Technology and Training",
    location: "Ho Chi Minh City, Vietnam",
    techStack: [
      "Linux",
      "Docker",
      "Kubernetes",
      "Nginx",
      "Python",
      "NestJS",
      "Next.js",
      "PostgreSQL",
    ],
    bullets: [
      "Contributed to IT infrastructure operations, server monitoring (Monit), and deployment automation to ensure high system availability.",
      "Evaluated and deployed Learning Management Systems (LMS) for enterprise training operations.",
      "Developed and deployed internal business applications (RobustCert, LAAS) using Next.js, NestJS, and Flutter.",
    ],
  },
  {
    period: "07/2025 — 09/2025",
    role: "IT Helpdesk",
    company: "Kumon Gia Hoa Education Center",
    location: "Ho Chi Minh City, Vietnam",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Networking Basics",
      "Windows",
    ],
    bullets: [
      "Provided technical support for hardware, software, and network operations to ensure seamless daily academic workflows.",
      "Managed student lifecycles, subject enrollments, and automated financial KPI reporting aligned with Kumon business logic.",
      "Engineered and deployed a full-stack management system featuring DOCX-to-PDF certificate generation, role-based access control, and zero-downtime deployment via Docker and Cloudflare Tunnel.",
    ],
  },
];
