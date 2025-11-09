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
  phone?: string;
  bio?: string;
}

export type ProjectStage =
  | "prospecting"
  | "planning"
  | "in_progress"
  | "review"
  | "signed_off";
export type ProjectStatus = "active" | "on_hold" | "completed" | "archived";

export interface Project {
  id: string;
  name: string;
  clientEmail: string;
  teamName: string;
  manager: string;
  description: string;
  stage: ProjectStage;
  status: ProjectStatus;
  estimation: number;
  budget?: number;
  timeline: string;
  startDate: string;
  endDate: string;
  meetingNotes: string;
  nda: string;
  sponsor: string;
  qpmSummary: string;
  comments: string;
  assignedTeam: string[];
  createdAt: string;
  updatedAt: string;
  approvalsStatus: "pending" | "approved" | "rejected";
  progress: number;
  estimatedHours?: number;
  estimatedCost?: number;
  billingType?: string;
  currency?: string;
  proposal?: string;
}

export interface Meeting {
  id: string;
  projectId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string[];
  agenda: string;
  notes: string;
  decisions: string[];
  actionItems: string[];
  attachments: string[];
  summary?: string;
  createdAt: string;
  createdBy: string;
}

export interface Document {
  id: string;
  projectId: string;
  name: string;
  type: "pdf" | "docx" | "image" | "other";
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  versions: DocumentVersion[];
  tags: string[];
}

export interface DocumentVersion {
  version: number;
  uploadedAt: string;
  uploadedBy: string;
  changes: string;
  size: number;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  userId: string;
  projectId?: string;
  resourceType: "project" | "meeting" | "document" | "user" | "system";
  timestamp: string;
  details: Record<string, any>;
  ipAddress?: string;
}

export interface WorkflowUpdate {
  id: string;
  projectId: string;
  title: string;
  notes: string;
  status: "pending" | "in_progress" | "completed";
  effort: string;
  deliverables: string;
  date: string;
  createdAt: string;
  createdBy: string;
}

export interface ChatMessage {
  id: string;
  projectId?: string;
  channelId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
  mentions?: string[];
}

export interface DemoResponse {
  message: string;
}
