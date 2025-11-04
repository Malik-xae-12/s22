/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export type UserRole = "admin" | "team" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
}

export type ProjectStage = "prospecting" | "planning" | "in_progress" | "review" | "signed_off";
export type ProjectStatus = "active" | "on_hold" | "completed" | "archived";

export interface Project {
  id: string;
  clientEmail: string;
  teamName: string;
  manager: string;
  stage: ProjectStage;
  status: ProjectStatus;
  estimation: string;
  timeline: string;
  meetingNotes: string;
  nda: string;
  sponsor: string;
  qpmSummary: string;
  comments: string;
  createdAt: string;
  updatedAt: string;
  approvalsStatus: "pending" | "approved" | "rejected";
}

export interface WorkflowUpdate {
  id: string;
  projectId: string;
  notes: string;
  effortSpent: number;
  dependencies: string;
  createdAt: string;
  createdBy: string;
}

export interface DemoResponse {
  message: string;
}
