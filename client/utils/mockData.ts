import { Project } from "@shared/api";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    clientEmail: "contact@techstartup.com",
    teamName: "TechStartup",
    manager: "Sarah Chen",
    stage: "in_progress",
    status: "active",
    estimation: "40 hours",
    timeline: "4 weeks",
    meetingNotes: "Discussed MVP requirements and timeline",
    nda: "Signed",
    sponsor: "Alex Johnson",
    qpmSummary: "Web platform for SaaS analytics",
    comments: "High priority client, potential long-term engagement",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    approvalsStatus: "pending",
  },
  {
    id: "proj-2",
    clientEmail: "info@retailco.com",
    teamName: "RetailCo",
    manager: "Michael Torres",
    stage: "planning",
    status: "active",
    estimation: "60 hours",
    timeline: "8 weeks",
    meetingNotes: "E-commerce platform redesign",
    nda: "Signed",
    sponsor: "Emma Davis",
    qpmSummary: "Complete platform modernization",
    comments: "Needs mobile-first approach",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-22",
    approvalsStatus: "approved",
  },
  {
    id: "proj-3",
    clientEmail: "hello@designstudio.com",
    teamName: "DesignStudio",
    manager: "Sarah Chen",
    stage: "prospecting",
    status: "active",
    estimation: "20 hours",
    timeline: "2 weeks",
    meetingNotes: "Initial discovery call completed",
    nda: "Pending",
    sponsor: "Chris Miller",
    qpmSummary: "Brand identity and website design",
    comments: "Awaiting NDA signature",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
    approvalsStatus: "pending",
  },
  {
    id: "proj-4",
    clientEmail: "ops@logistics.com",
    teamName: "LogisticsPro",
    manager: "Michael Torres",
    stage: "review",
    status: "active",
    estimation: "80 hours",
    timeline: "10 weeks",
    meetingNotes: "Supply chain management system",
    nda: "Signed",
    sponsor: "James Wilson",
    qpmSummary: "Real-time tracking and analytics dashboard",
    comments: "Ready for final client review",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-20",
    approvalsStatus: "approved",
  },
  {
    id: "proj-5",
    clientEmail: "contact@fintech.com",
    teamName: "FinTech Solutions",
    manager: "Sarah Chen",
    stage: "signed_off",
    status: "completed",
    estimation: "100 hours",
    timeline: "12 weeks",
    meetingNotes: "Mobile banking application",
    nda: "Signed",
    sponsor: "Patricia Brown",
    qpmSummary: "Secure payment processing platform",
    comments: "Project successfully completed and delivered",
    createdAt: "2023-12-01",
    updatedAt: "2024-01-15",
    approvalsStatus: "approved",
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
