import { LucideIcon } from "lucide-react";

export type UserRole = "admin" | "manager" | "user" | "unauthorized";

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  roles?: UserRole[];
  children?: NavItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface MobileNavConfig {
  mainNav: NavSection[];
  sidebarNav: NavSection[];
}
