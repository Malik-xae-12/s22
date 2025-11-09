import {
  Project,
  Meeting,
  Document,
  AuditLog,
  User,
  WorkflowUpdate,
} from "@shared/api";

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@sales2signoff.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    company: "Sales2Signoff",
    phone: "+1-555-0100",
    bio: "Platform administrator and project overseer",
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "team",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    company: "Acme Corp",
    phone: "+1-555-0101",
    bio: "Senior Project Manager",
  },
  {
    id: "user-3",
    name: "Michael Torres",
    email: "michael.torres@company.com",
    role: "team",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    company: "Acme Corp",
    phone: "+1-555-0102",
    bio: "Technical Lead",
  },
  {
    id: "user-4",
    name: "Jane Client",
    email: "jane@client.com",
    role: "client",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    company: "Client Solutions",
    phone: "+1-555-0103",
    bio: "Client Project Sponsor",
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "TechStartup Web Platform",
    clientName: "TechStartup Inc",
    clientEmail: "contact@techstartup.com",
    teamName: "TechStartup",
    manager: "Sarah Chen",
    description:
      "Build a responsive web platform for SaaS analytics and reporting",
    stage: "in_progress",
    status: "active",
    estimation: 40,
    budget: 15000,
    timeline: "4 weeks",
    startDate: "2025-01-15",
    endDate: "2025-02-12",
    meetingNotes: "Discussed MVP requirements and timeline",
    nda: "Signed",
    sponsor: "Alex Johnson",
    qpmSummary: "Web platform for SaaS analytics",
    comments: "High priority client, potential long-term engagement",
    assignedTeam: ["user-2", "user-3"],
    createdAt: "2025-01-15",
    updatedAt: "2025-01-20",
    approvalsStatus: "pending",
    progress: 65,
    estimatedHours: 240,
    estimatedCost: 850000,
    billingType: "Fixed Cost",
    currency: "INR",
    proposal: "TS-2025-001",
    presalesMode: "Discovery",
    projectMode: "Fixed Price",
    projectType: "Web Development",
    priority: "High",
    department: "Engineering",
  },
  {
    id: "proj-2",
    name: "RetailCo Platform Redesign",
    clientName: "RetailCo Ltd",
    clientEmail: "info@retailco.com",
    teamName: "RetailCo",
    manager: "Michael Torres",
    description: "Complete e-commerce platform modernization and redesign",
    stage: "planning",
    status: "active",
    estimation: 60,
    budget: 25000,
    timeline: "8 weeks",
    startDate: "2025-01-10",
    endDate: "2025-03-07",
    meetingNotes: "E-commerce platform redesign",
    nda: "Signed",
    sponsor: "Emma Davis",
    qpmSummary: "Complete platform modernization",
    comments: "Needs mobile-first approach",
    assignedTeam: ["user-2", "user-3"],
    createdAt: "2025-01-10",
    updatedAt: "2025-01-22",
    approvalsStatus: "approved",
    progress: 30,
    estimatedHours: 480,
    estimatedCost: 1750000,
    billingType: "Time & Material",
    currency: "INR",
    proposal: "RC-2025-002",
    presalesMode: "Proposal",
    projectMode: "Time & Material",
    projectType: "E-commerce",
    priority: "High",
    department: "Engineering",
  },
  {
    id: "proj-3",
    name: "Design Studio Branding",
    clientEmail: "hello@designstudio.com",
    teamName: "DesignStudio",
    manager: "Sarah Chen",
    description: "Complete brand identity and website design package",
    stage: "prospecting",
    status: "active",
    estimation: 20,
    budget: 8000,
    timeline: "2 weeks",
    startDate: "2025-01-22",
    endDate: "2025-02-05",
    meetingNotes: "Initial discovery call completed",
    nda: "Pending",
    sponsor: "Chris Miller",
    qpmSummary: "Brand identity and website design",
    comments: "Awaiting NDA signature",
    assignedTeam: ["user-2"],
    createdAt: "2025-01-22",
    updatedAt: "2025-01-22",
    approvalsStatus: "pending",
    progress: 10,
    estimatedHours: 80,
    estimatedCost: 350000,
    billingType: "Fixed Cost",
    currency: "INR",
    proposal: "DS-2025-003",
  },
  {
    id: "proj-4",
    name: "LogisticsPro Supply Chain",
    clientEmail: "ops@logistics.com",
    teamName: "LogisticsPro",
    manager: "Michael Torres",
    description: "Real-time tracking and analytics dashboard for supply chain",
    stage: "review",
    status: "active",
    estimation: 80,
    budget: 35000,
    timeline: "10 weeks",
    startDate: "2025-01-05",
    endDate: "2025-03-16",
    meetingNotes: "Supply chain management system",
    nda: "Signed",
    sponsor: "James Wilson",
    qpmSummary: "Real-time tracking and analytics dashboard",
    comments: "Ready for final client review",
    assignedTeam: ["user-2", "user-3"],
    createdAt: "2025-01-05",
    updatedAt: "2025-01-20",
    approvalsStatus: "approved",
    progress: 85,
    estimatedHours: 520,
    estimatedCost: 2100000,
    billingType: "Fixed Cost",
    currency: "INR",
    proposal: "LP-2025-004",
  },
  {
    id: "proj-5",
    name: "FinTech Mobile Banking",
    clientEmail: "contact@fintech.com",
    teamName: "FinTech Solutions",
    manager: "Sarah Chen",
    description: "Secure mobile banking application with payment processing",
    stage: "signed_off",
    status: "completed",
    estimation: 100,
    budget: 50000,
    timeline: "12 weeks",
    startDate: "2024-12-01",
    endDate: "2025-01-15",
    meetingNotes: "Mobile banking application",
    nda: "Signed",
    sponsor: "Patricia Brown",
    qpmSummary: "Secure payment processing platform",
    comments: "Project successfully completed and delivered",
    assignedTeam: ["user-2", "user-3"],
    createdAt: "2024-12-01",
    updatedAt: "2025-01-15",
    approvalsStatus: "approved",
    progress: 100,
    estimatedHours: 650,
    estimatedCost: 2750000,
    billingType: "Fixed Cost",
    currency: "INR",
    proposal: "FT-2025-005",
  },
];

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: "meet-1",
    projectId: "proj-1",
    title: "TechStartup Kickoff Meeting",
    date: "2025-01-15",
    startTime: "10:00",
    endTime: "11:30",
    participants: ["user-2", "user-3", "Alex Johnson"],
    agenda: "Discuss project scope, timeline, and deliverables",
    notes:
      "Agreed on MVP scope. Initial timeline: 4 weeks. Need design assets by 2025-01-20.",
    decisions: ["MVP scope finalized", "Weekly meetings scheduled"],
    actionItems: ["Prepare design mockups", "Set up development environment"],
    attachments: ["scope-document.pdf"],
    summary: "Project kicked off with clear scope and timeline established.",
    createdAt: "2025-01-15",
    createdBy: "user-2",
  },
  {
    id: "meet-2",
    projectId: "proj-1",
    title: "Weekly Progress Check",
    date: "2025-01-20",
    startTime: "14:00",
    endTime: "14:45",
    participants: ["user-2", "user-3"],
    agenda: "Review current progress and blockers",
    notes:
      "Design mockups reviewed and approved. Backend API setup underway. No major blockers.",
    decisions: ["Proceed with frontend development"],
    actionItems: ["Complete API endpoints by 2025-01-25"],
    attachments: [],
    summary: "Progress on track. Design approved, backend progressing well.",
    createdAt: "2025-01-20",
    createdBy: "user-2",
  },
  {
    id: "meet-3",
    projectId: "proj-2",
    title: "RetailCo Planning Session",
    date: "2025-01-12",
    startTime: "09:00",
    endTime: "10:30",
    participants: ["user-3", "Emma Davis"],
    agenda: "Discuss technical architecture and platform requirements",
    notes:
      "Mobile-first approach agreed. Database migration strategy discussed.",
    decisions: ["Use React + Node.js stack", "Migrate data in phases"],
    actionItems: ["Create detailed technical spec", "Prepare migration plan"],
    attachments: ["requirements.docx"],
    summary: "Technical foundation set for platform redesign.",
    createdAt: "2025-01-12",
    createdBy: "user-3",
  },
  {
    id: "meet-4",
    projectId: "proj-4",
    title: "LogisticsPro Review Meeting",
    date: "2025-01-18",
    startTime: "13:00",
    endTime: "14:15",
    participants: ["user-2", "user-3", "James Wilson"],
    agenda: "Final review of tracking dashboard features",
    notes:
      "Dashboard tested with sample data. All KPIs showing correctly. Client satisfied.",
    decisions: ["Approve for production release"],
    actionItems: ["Deploy to production", "Provide training materials"],
    attachments: ["final-review-notes.pdf"],
    summary: "Dashboard approved for production. Training needed.",
    createdAt: "2025-01-18",
    createdBy: "user-3",
  },
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    projectId: "proj-1",
    name: "TechStartup Project Charter",
    type: "pdf",
    size: 1250000,
    uploadedAt: "2025-01-15",
    uploadedBy: "user-2",
    versions: [
      {
        version: 1,
        uploadedAt: "2025-01-15",
        uploadedBy: "user-2",
        changes: "Initial upload",
        size: 1250000,
      },
      {
        version: 2,
        uploadedAt: "2025-01-18",
        uploadedBy: "user-2",
        changes: "Updated scope section",
        size: 1300000,
      },
    ],
    tags: ["charter", "scope", "requirements"],
  },
  {
    id: "doc-2",
    projectId: "proj-1",
    name: "UI Design Mockups",
    type: "pdf",
    size: 5420000,
    uploadedAt: "2025-01-17",
    uploadedBy: "user-3",
    versions: [
      {
        version: 1,
        uploadedAt: "2025-01-17",
        uploadedBy: "user-3",
        changes: "Initial design mockups",
        size: 5420000,
      },
    ],
    tags: ["design", "ui", "mockups"],
  },
  {
    id: "doc-3",
    projectId: "proj-2",
    name: "Technical Architecture Document",
    type: "docx",
    size: 2180000,
    uploadedAt: "2025-01-12",
    uploadedBy: "user-3",
    versions: [
      {
        version: 1,
        uploadedAt: "2025-01-12",
        uploadedBy: "user-3",
        changes: "Initial architecture",
        size: 1950000,
      },
      {
        version: 2,
        uploadedAt: "2025-01-20",
        uploadedBy: "user-3",
        changes: "Added API endpoints section",
        size: 2180000,
      },
    ],
    tags: ["architecture", "technical", "specification"],
  },
  {
    id: "doc-4",
    projectId: "proj-4",
    name: "Dashboard Specification",
    type: "pdf",
    size: 3100000,
    uploadedAt: "2025-01-08",
    uploadedBy: "user-2",
    versions: [
      {
        version: 1,
        uploadedAt: "2025-01-08",
        uploadedBy: "user-2",
        changes: "Initial specification",
        size: 2900000,
      },
      {
        version: 2,
        uploadedAt: "2025-01-15",
        uploadedBy: "user-3",
        changes: "Added KPI definitions",
        size: 3100000,
      },
    ],
    tags: ["specification", "dashboard", "requirements"],
  },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: "audit-1",
    action: "Created project",
    user: "Sarah Chen",
    userId: "user-2",
    projectId: "proj-1",
    resourceType: "project",
    timestamp: "2025-01-15T10:00:00Z",
    details: { projectName: "TechStartup Web Platform", budget: 15000 },
  },
  {
    id: "audit-2",
    action: "Updated project status",
    user: "Michael Torres",
    userId: "user-3",
    projectId: "proj-1",
    resourceType: "project",
    timestamp: "2025-01-20T14:30:00Z",
    details: { oldStatus: "planning", newStatus: "in_progress" },
  },
  {
    id: "audit-3",
    action: "Scheduled meeting",
    user: "Sarah Chen",
    userId: "user-2",
    projectId: "proj-1",
    resourceType: "meeting",
    timestamp: "2025-01-15T11:00:00Z",
    details: { meetingTitle: "TechStartup Kickoff Meeting" },
  },
  {
    id: "audit-4",
    action: "Uploaded document",
    user: "Michael Torres",
    userId: "user-3",
    projectId: "proj-1",
    resourceType: "document",
    timestamp: "2025-01-17T09:30:00Z",
    details: { documentName: "UI Design Mockups", documentType: "pdf" },
  },
  {
    id: "audit-5",
    action: "Updated project progress",
    user: "Sarah Chen",
    userId: "user-2",
    projectId: "proj-1",
    resourceType: "project",
    timestamp: "2025-01-21T16:00:00Z",
    details: {
      oldProgress: 50,
      newProgress: 65,
      phase: "Frontend Development",
    },
  },
  {
    id: "audit-6",
    action: "Added meeting notes",
    user: "Sarah Chen",
    userId: "user-2",
    projectId: "proj-1",
    resourceType: "meeting",
    timestamp: "2025-01-20T15:00:00Z",
    details: { meetingId: "meet-2", actionItemsCount: 1 },
  },
  {
    id: "audit-7",
    action: "Created project",
    user: "Michael Torres",
    userId: "user-3",
    projectId: "proj-2",
    resourceType: "project",
    timestamp: "2025-01-10T08:00:00Z",
    details: { projectName: "RetailCo Platform Redesign", budget: 25000 },
  },
  {
    id: "audit-8",
    action: "Updated approval status",
    user: "Admin User",
    userId: "user-1",
    projectId: "proj-2",
    resourceType: "project",
    timestamp: "2025-01-22T10:00:00Z",
    details: { oldStatus: "pending", newStatus: "approved" },
  },
];

export const STAGE_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  prospecting: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  planning: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  in_progress: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  review: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  signed_off: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
};

export function getStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    prospecting: "Prospecting",
    planning: "Planning",
    in_progress: "In Progress",
    review: "Review",
    signed_off: "Signed Off",
  };
  return labels[stage] || stage;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: "Active",
    on_hold: "On Hold",
    completed: "Completed",
    archived: "Archived",
  };
  return labels[status] || status;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Mock Stages
export interface Stage {
  id: string;
  projectId: string;
  name: string;
  owner: string;
  type: "planning" | "execution" | "testing" | "delivery";
  startDate: string;
  endDate: string;
  completion: number;
  status: "not_started" | "in_progress" | "completed";
  approvedBy?: string;
  approvalDate?: string;
  remarks: string;
}

export const MOCK_STAGES: Stage[] = [
  {
    id: "stage-1",
    projectId: "proj-1",
    name: "Requirements & Planning",
    owner: "Sarah Chen",
    type: "planning",
    startDate: "2025-01-15",
    endDate: "2025-01-20",
    completion: 100,
    status: "completed",
    approvedBy: "Admin User",
    approvalDate: "2025-01-20",
    remarks: "All requirements validated and approved",
  },
  {
    id: "stage-2",
    projectId: "proj-1",
    name: "Design & Architecture",
    owner: "Michael Torres",
    type: "planning",
    startDate: "2025-01-20",
    endDate: "2025-01-28",
    completion: 85,
    status: "in_progress",
    remarks: "Design mockups completed, awaiting final review",
  },
  {
    id: "stage-3",
    projectId: "proj-1",
    name: "Backend Development",
    owner: "Sarah Chen",
    type: "execution",
    startDate: "2025-01-28",
    endDate: "2025-02-10",
    completion: 60,
    status: "in_progress",
    remarks: "API endpoints 70% complete, database setup done",
  },
  {
    id: "stage-4",
    projectId: "proj-1",
    name: "Frontend Development",
    owner: "Michael Torres",
    type: "execution",
    startDate: "2025-02-01",
    endDate: "2025-02-12",
    completion: 50,
    status: "in_progress",
    remarks: "UI components in development",
  },
  {
    id: "stage-5",
    projectId: "proj-2",
    name: "Requirements Gathering",
    owner: "Michael Torres",
    type: "planning",
    startDate: "2025-01-10",
    endDate: "2025-01-25",
    completion: 100,
    status: "completed",
    approvedBy: "Admin User",
    approvalDate: "2025-01-25",
    remarks: "Client requirements documented",
  },
  {
    id: "stage-6",
    projectId: "proj-2",
    name: "System Design",
    owner: "Sarah Chen",
    type: "planning",
    startDate: "2025-01-25",
    endDate: "2025-02-08",
    completion: 40,
    status: "in_progress",
    remarks: "Technical architecture in progress",
  },
];

// Mock Tasks
export interface Task {
  id: string;
  stageId: string;
  projectId: string;
  name: string;
  assignedTo: string;
  priority: "low" | "medium" | "high" | "critical";
  startDate: string;
  dueDate: string;
  status: "pending" | "in_progress" | "review" | "completed";
  estimatedHours: number;
  actualHours: number;
  comments: string;
  attachments: Array<{ id: string; name: string; url: string }>;
}

export const MOCK_TASKS: Task[] = [
  {
    id: "task-1",
    stageId: "stage-3",
    projectId: "proj-1",
    name: "Database Schema Design",
    assignedTo: "Michael Torres",
    priority: "high",
    startDate: "2025-01-28",
    dueDate: "2025-02-02",
    status: "completed",
    estimatedHours: 16,
    actualHours: 14,
    comments: "Schema optimized for performance",
    attachments: [],
  },
  {
    id: "task-2",
    stageId: "stage-3",
    projectId: "proj-1",
    name: "API Endpoints Implementation",
    assignedTo: "Michael Torres",
    priority: "high",
    startDate: "2025-02-02",
    dueDate: "2025-02-10",
    status: "in_progress",
    estimatedHours: 40,
    actualHours: 28,
    comments: "70% complete, user endpoints remaining",
    attachments: [
      {
        id: "att-1",
        name: "API Specification.pdf",
        url: "#",
      },
    ],
  },
  {
    id: "task-3",
    stageId: "stage-4",
    projectId: "proj-1",
    name: "Login & Registration UI",
    assignedTo: "Sarah Chen",
    priority: "critical",
    startDate: "2025-02-01",
    dueDate: "2025-02-05",
    status: "in_progress",
    estimatedHours: 12,
    actualHours: 10,
    comments: "Form validation in progress",
    attachments: [],
  },
  {
    id: "task-4",
    stageId: "stage-4",
    projectId: "proj-1",
    name: "Dashboard Components",
    assignedTo: "Sarah Chen",
    priority: "high",
    startDate: "2025-02-05",
    dueDate: "2025-02-12",
    status: "pending",
    estimatedHours: 24,
    actualHours: 0,
    comments: "Waiting for backend API completion",
    attachments: [],
  },
  {
    id: "task-5",
    stageId: "stage-2",
    projectId: "proj-1",
    name: "Wireframe Design",
    assignedTo: "Michael Torres",
    priority: "high",
    startDate: "2025-01-20",
    dueDate: "2025-01-24",
    status: "completed",
    estimatedHours: 20,
    actualHours: 18,
    comments: "All wireframes approved by client",
    attachments: [
      {
        id: "att-2",
        name: "Wireframes.figma",
        url: "#",
      },
    ],
  },
  {
    id: "task-6",
    stageId: "stage-2",
    projectId: "proj-1",
    name: "Visual Design Mockups",
    assignedTo: "Sarah Chen",
    priority: "high",
    startDate: "2025-01-24",
    dueDate: "2025-01-28",
    status: "in_progress",
    estimatedHours: 28,
    actualHours: 24,
    comments: "Pending final color scheme approval",
    attachments: [
      {
        id: "att-3",
        name: "Mockups_v2.pdf",
        url: "#",
      },
    ],
  },
  {
    id: "task-7",
    stageId: "stage-6",
    projectId: "proj-2",
    name: "System Architecture Planning",
    assignedTo: "Michael Torres",
    priority: "critical",
    startDate: "2025-01-25",
    dueDate: "2025-02-01",
    status: "in_progress",
    estimatedHours: 32,
    actualHours: 12,
    comments: "Reviewing cloud infrastructure options",
    attachments: [
      {
        id: "att-4",
        name: "Architecture_Draft.docx",
        url: "#",
      },
    ],
  },
  {
    id: "task-8",
    stageId: "stage-6",
    projectId: "proj-2",
    name: "Database Schema Design",
    assignedTo: "Sarah Chen",
    priority: "high",
    startDate: "2025-02-01",
    dueDate: "2025-02-08",
    status: "pending",
    estimatedHours: 24,
    actualHours: 0,
    comments: "Blocked by architecture planning",
    attachments: [],
  },
];

// Mock Workflow Items (Approvals)
export interface WorkflowItem {
  id: string;
  entityType: "project" | "stage" | "task";
  entityId: string;
  entityName: string;
  approvalStatus: "awaiting" | "approved" | "rejected" | "rework";
  approvedBy?: string;
  approvalDate?: string;
  remarks: string;
  attachments: Array<{ id: string; name: string; url: string }>;
}

export const MOCK_WORKFLOW_ITEMS: WorkflowItem[] = [
  {
    id: "wf-item-1",
    entityType: "project",
    entityId: "proj-1",
    entityName: "TechStartup Web Platform",
    approvalStatus: "awaiting",
    remarks: "Pending final sign-off from project sponsor",
    attachments: [],
  },
  {
    id: "wf-item-2",
    entityType: "stage",
    entityId: "stage-1",
    entityName: "Requirements & Planning",
    approvalStatus: "approved",
    approvedBy: "Admin User",
    approvalDate: "2025-01-20",
    remarks: "All requirements validated and approved",
    attachments: [
      {
        id: "att-5",
        name: "Requirements_Approval.pdf",
        url: "#",
      },
    ],
  },
  {
    id: "wf-item-3",
    entityType: "stage",
    entityId: "stage-2",
    entityName: "Design & Architecture",
    approvalStatus: "awaiting",
    remarks: "Awaiting design review from client",
    attachments: [
      {
        id: "att-6",
        name: "Design_Mockups.pdf",
        url: "#",
      },
    ],
  },
  {
    id: "wf-item-4",
    entityType: "task",
    entityId: "task-1",
    entityName: "Database Schema Design",
    approvalStatus: "approved",
    approvedBy: "Michael Torres",
    approvalDate: "2025-02-02",
    remarks: "Schema approved for implementation",
    attachments: [],
  },
  {
    id: "wf-item-5",
    entityType: "project",
    entityId: "proj-2",
    entityName: "RetailCo Platform Redesign",
    approvalStatus: "approved",
    approvedBy: "Admin User",
    approvalDate: "2025-01-22",
    remarks: "Project approved for execution phase",
    attachments: [],
  },
];

export const MOCK_WORKFLOW_UPDATES: WorkflowUpdate[] = [
  {
    id: "wf-1",
    projectId: "proj-1",
    title: "Payment gateway integration completed",
    notes:
      "Successfully integrated Stripe payment gateway with webhook support for real-time transaction updates.",
    status: "completed",
    effort: "32h",
    deliverables: "API endpoints, testing documentation",
    date: "2025-04-05",
    createdAt: "2025-04-05T10:00:00Z",
    createdBy: "user-2",
  },
  {
    id: "wf-2",
    projectId: "proj-1",
    title: "Shopping cart functionality in progress",
    notes:
      "Currently working on cart state management and checkout flow. Backend API ready, frontend components 60% complete.",
    status: "in_progress",
    effort: "24h",
    deliverables: "Frontend components, state management",
    date: "2025-04-03",
    createdAt: "2025-04-03T14:30:00Z",
    createdBy: "user-3",
  },
  {
    id: "wf-3",
    projectId: "proj-1",
    title: "User authentication system setup",
    notes:
      "JWT-based authentication implemented. Email verification and password reset functionality completed.",
    status: "completed",
    effort: "18h",
    deliverables: "Auth module, email templates",
    date: "2025-03-28",
    createdAt: "2025-03-28T09:00:00Z",
    createdBy: "user-2",
  },
  {
    id: "wf-4",
    projectId: "proj-2",
    title: "Database schema migration",
    notes:
      "Planning phase for migrating legacy data to new database schema. Initial assessment completed.",
    status: "pending",
    effort: "40h",
    deliverables: "Migration scripts, data validation",
    date: "2025-03-20",
    createdAt: "2025-03-20T11:00:00Z",
    createdBy: "user-3",
  },
  {
    id: "wf-5",
    projectId: "proj-2",
    title: "Mobile responsive design implementation",
    notes:
      "Implementing mobile-first responsive design across all pages. Tablet and desktop versions also in scope.",
    status: "in_progress",
    effort: "35h",
    deliverables: "Responsive components, media queries",
    date: "2025-03-25",
    createdAt: "2025-03-25T13:00:00Z",
    createdBy: "user-2",
  },
  {
    id: "wf-6",
    projectId: "proj-4",
    title: "Analytics dashboard KPI setup",
    notes:
      "Configured all key performance indicators and data visualization for real-time tracking dashboard.",
    status: "completed",
    effort: "28h",
    deliverables: "Dashboard components, KPI calculations",
    date: "2025-03-15",
    createdAt: "2025-03-15T10:30:00Z",
    createdBy: "user-3",
  },
  {
    id: "wf-7",
    projectId: "proj-4",
    title: "Real-time data sync implementation",
    notes:
      "Implementing WebSocket-based real-time data synchronization for live tracking updates.",
    status: "in_progress",
    effort: "32h",
    deliverables: "WebSocket server, client integration",
    date: "2025-03-22",
    createdAt: "2025-03-22T15:00:00Z",
    createdBy: "user-2",
  },
  {
    id: "wf-8",
    projectId: "proj-5",
    title: "Security audit and compliance check",
    notes:
      "Completed comprehensive security audit covering encryption, data protection, and regulatory compliance.",
    status: "completed",
    effort: "45h",
    deliverables: "Audit report, security recommendations",
    date: "2025-02-28",
    createdAt: "2025-02-28T09:00:00Z",
    createdBy: "user-3",
  },
];
