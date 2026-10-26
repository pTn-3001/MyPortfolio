import { ProjectItem } from "@/types";

export const projectsData: ProjectItem[] = [
  {
    id: "cicd-gitops-microservices",
    name: "End-to-End CI/CD Pipeline with GitOps for Microservices",
    desc: "Automated CI/CD and GitOps delivery pipeline for an 8-service Spring Boot monorepo, integrating shift-left security scanning and multi-environment Kubernetes orchestration.",
    tech: ["Jenkins", "Kubernetes", "Docker", "Helm", "ArgoCD"],
    github: "https://github.com/pTn-3001/petclinic-devops.git",
    thumbnailSrc: "/assets/projects/cicd.webp",
    highlights: [
      "Automated monorepo CI/CD in Jenkins with selective microservice builds & unit testing",
      "Shift-left security scanning (SonarQube SAST, OWASP Dependency-Check, Trivy) before publishing Docker images",
      "Multi-environment Kubernetes deployments (dev, staging, sandbox) via Helm charts & pull-based GitOps with ArgoCD",
    ],
  },
  {
    id: "laas-portal",
    name: "Lab-as-a-Service (LaaS) Platform",
    desc: "An on-premise cloud training platform built as an Nx Monorepo comprising 3 Next.js portals and 6 NestJS microservices with isolated per-service PostgreSQL databases on an OpenStack private cloud.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma ORM", "OpenStack", "Docker"],
    github: "https://github.com/pTn-3001/Lab-as-a-Service.git",
    video: "https://youtu.be/U2W9UBZ9fuo",
    thumbnailSrc: "/assets/projects/laas.webp",
    highlights: [
      "End-to-end virtual lab lifecycle: dynamic VM & network provisioning with VXLAN multi-tenant isolation & resource reclamation",
      "Custom VM image diffing and approval workflow for specialized lab templates",
      "Browser-based terminal access via WebSocket proxy and real-time automated checkpoint grading from guest VMs",
    ],
  },
  {
    id: "kumon-cms",
    name: "Kumon Center Management System",
    desc: "Production management platform actively used by Kumon Gia Hoa Center, enforcing 4-role RBAC to digitize daily educational, administrative, and financial operations.",
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Docker Compose",
      "Cloudflare Tunnel",
      "Tailwind CSS",
    ],
    github: "https://github.com/pTn-3001/Kumon-Center-Management.git",
    demo: "https://kumon.ptn2026.id.vn",
    thumbnailSrc: "/assets/projects/kumon.webp",
    highlights: [
      "4-role RBAC (Admin, Teacher, Assistant, Consultant) for streamlined daily operations",
      "Complete student lifecycle: CRM leads, consulting, trial conversion, class scheduling, attendance, worksheets & PDF certificate generation",
      "Financial and HR modules for tuition, payroll, timekeeping, and monthly KPI analytics dashboards",
    ],
  },
  {
    id: "telecom-asterisk-voip",
    name: "Asterisk VoIP PBX & Advanced IVR System",
    desc: "Enterprise VoIP PBX communications system built with Asterisk, featuring SIP/IAX2 trunking, custom dialplan routing, automated IVR call navigation, and voicemail services.",
    tech: ["Asterisk", "VoIP", "Zoiper", "VMWare", "Linux"],
    github: "https://github.com/pTn-3001/Asterisk-VoIP.git",
    video: "https://youtu.be/trUYVGyFeLY",
    thumbnailSrc: "/assets/projects/voip.webp",
    highlights: [
      "Interactive Voice Response (IVR) with custom multi-level audio prompts and dialplan routing",
      "Time-based call management, business hours routing & automated voicemail services",
      "SIP/IAX2 extensions & trunking configured and validated with softphones across virtual networks",
    ],
  },
];
