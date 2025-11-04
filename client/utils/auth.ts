import { User, UserRole } from "@shared/api";

// Mock user for demo - in production, this would come from authentication service
const MOCK_USERS = {
  admin: {
    id: "user-1",
    name: "Admin User",
    email: "admin@sales2signoff.com",
    role: "admin" as UserRole,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    company: "Sales2Signoff",
  },
  team: {
    id: "user-2",
    name: "John Manager",
    email: "john@company.com",
    role: "team" as UserRole,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    company: "Acme Corp",
  },
  client: {
    id: "user-3",
    name: "Jane Client",
    email: "jane@client.com",
    role: "client" as UserRole,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    company: "Client Solutions",
  },
};

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem("currentUser");
  if (stored) {
    return JSON.parse(stored);
  }
  // Return admin by default for demo
  return MOCK_USERS.admin;
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

export function switchUser(role: "admin" | "team" | "client"): User {
  const user = MOCK_USERS[role];
  setCurrentUser(user);
  return user;
}

export function isAdmin(user: User | null): boolean {
  return user?.role === "admin";
}

export function isTeamMember(user: User | null): boolean {
  return user?.role === "team";
}

export function isClient(user: User | null): boolean {
  return user?.role === "client";
}

export function canViewAllProjects(user: User | null): boolean {
  return isAdmin(user);
}

export function canCreateProject(user: User | null): boolean {
  return isAdmin(user) || isTeamMember(user);
}

export function canEditProject(user: User | null): boolean {
  return isAdmin(user) || isTeamMember(user);
}

export function canAccessDocuments(user: User | null): boolean {
  return user !== null;
}

export function canAccessAuditLog(user: User | null): boolean {
  return isAdmin(user);
}

export function canAccessDashboard(user: User | null): boolean {
  return isAdmin(user);
}
