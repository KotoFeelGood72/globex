import { useSession } from "next-auth/react";
import { UserRole } from "@/lib/types/access";

export interface AccessHook {
  canManageUsers: () => boolean;
  canManageCompanies: () => boolean;
  canViewReports: () => boolean;
  canUsePlanningTools: () => boolean;
}

export const useAccess = (): AccessHook => {
  const { data: session } = useSession();
  const userRole = session?.user?.role || "user";

  return {
    canManageUsers: () => {
      return userRole === "admin";
    },
    canManageCompanies: () => {
      return ["admin", "partner"].includes(userRole);
    },
    canViewReports: () => {
      return true; // Все пользователи могут просматривать отчеты
    },
    canUsePlanningTools: () => {
      return ["admin", "partner"].includes(userRole);
    },
  };
};
