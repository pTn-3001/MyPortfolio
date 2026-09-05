/**
 * Core Type Definitions for PTN Space Island Portfolio
 * Provides strict type safety across all components and data stores.
 */

export type SectionId =
  "about" | "projects" | "skills" | "experience" | "education" | "contact";

export type ItemCategory =
  | "CITIZEN ID"
  | "PROJECT HUB"
  | "TOOLKIT ARSENAL"
  | "CAREER ORBIT"
  | "ACADEMY ARCHIVE"
  | "CONNECT NOW";

export interface ItemConfig {
  id: SectionId;
  title: string;
  subtitle: string;
  imageSrc: string;
  left: string;
  top: string;
  width: string;
  category: ItemCategory;
}

// ---------------- ABOUT SECTION TYPES ----------------
export interface PersonalDetails {
  birthDate: string;
  nationality: string;
  location: string;
  email: string;
  phone: string;
}

export interface AboutData {
  role: string;
  fullName: string;
  bio: string;
  avatarSrc: string;
  details: PersonalDetails;
  careerOrientation: string;
}

// ---------------- PROJECTS SECTION TYPES ----------------
export interface ProjectItem {
  id: string;
  name: string;
  desc: string;
  tech: string[];
  github: string;
  demo?: string;
  video?: string;
  thumbnailSrc?: string;
  highlights?: string[];
}

// ---------------- SKILLS SECTION TYPES ----------------
export interface SkillItem {
  name: string;
  iconKey: string;
  iconUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName?: string;
  skills: SkillItem[];
}

// ---------------- EXPERIENCE SECTION TYPES ----------------
export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location?: string;
  techStack?: string[];
  bullets: string[];
}

// ---------------- EDUCATION SECTION TYPES ----------------
export interface EducationItem {
  id: string;
  institution: string;
  degree?: string;
  major?: string;
  period: string;
  gpa?: string;
  highlights?: string[];
}

export type EducationData = EducationItem[];

// ---------------- CONTACT SECTION TYPES ----------------
export interface ContactChannel {
  id: "email" | "github" | "linkedin" | "facebook";
  label: string;
  value: string;
  link?: string;
  copyValue?: string;
  iconName: "mail" | "github" | "linkedin" | "facebook";
}

export interface ContactData {
  channels: ContactChannel[];
}
