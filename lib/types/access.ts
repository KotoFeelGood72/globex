export type UserRole = "admin" | "partner" | "company";

export interface AccessRights {
  reports: "full" | "limited" | "minimal";
  scope: "fullAccess" | "ownCompanies" | "selfOnly";
  planningTools: boolean;
}

export const DEFAULT_ACCESS_RIGHTS: Record<UserRole, AccessRights> = {
  admin: {
    reports: "full",
    scope: "fullAccess",
    planningTools: true,
  },
  partner: {
    reports: "limited",
    scope: "ownCompanies",
    planningTools: true,
  },
  company: {
    reports: "minimal",
    scope: "selfOnly",
    planningTools: false,
  },
};

export interface AccessLevel {
  role: "admin" | "user" | "partner";
  permissions: string[];
}

export const ACCESS_LEVELS: Record<string, AccessLevel> = {
  ADMIN: {
    role: "admin",
    permissions: ["*"],
  },
  PARTNER: {
    role: "partner",
    permissions: ["view_dashboard", "manage_own_data"],
  },
  USER: {
    role: "user",
    permissions: ["view_dashboard"],
  },
}
