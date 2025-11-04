import { User, Project, UserRole, ProjectStage, ProjectStatus, WorkflowUpdate } from "@shared/api";

export type { User, Project, UserRole, ProjectStage, ProjectStatus, WorkflowUpdate };

export interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}
