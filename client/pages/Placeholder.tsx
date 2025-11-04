import { useParams } from "react-router-dom";
import { Construction } from "lucide-react";

interface PlaceholderProps {
  title?: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  const params = useParams();
  const pageName =
    title || (typeof params.page === "string" ? params.page : "This page");

  const pageDescriptions: Record<string, string> = {
    "add-project":
      "Create a new project with all required details and timeline information.",
    "project-detail":
      "View and edit project details, approvals status, and comments.",
    workflow:
      "Track chronological updates and project progress with effort tracking.",
    analytics:
      "Admin dashboard with charts, metrics, and performance analytics.",
    documents:
      "Upload, manage, and access project-related documents with role-based access.",
    search:
      "Search and filter projects by multiple criteria with saved presets.",
    calendar: "Calendar and Gantt-style milestone view for project timelines.",
    chat: "Threaded team communication with @mentions, notifications, and file attachments.",
    "client-summary":
      "Client-facing dashboard showing progress, updates, and approvals.",
    audit:
      "Timestamped audit logs of user actions for compliance and tracking.",
    settings:
      "User profile settings, password change, and notification preferences.",
    "test-environment":
      "Sandbox for testing experimental features and components.",
  };

  const description =
    pageDescriptions[pageName.toLowerCase()] ||
    `This feature is being built to enhance the Sales2Signoff experience. Check back soon!`;

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Construction className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {pageName.charAt(0).toUpperCase() +
            pageName
              .slice(1)
              .replace(/-/g, " ")
              .replace(/([A-Z])/g, " $1")}
        </h1>
        <p className="text-slate-600 mb-6">{description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
          <p className="font-medium mb-2">💡 Feature Coming Soon</p>
          <p>
            Provide feedback or request this feature by prompting the builder to
            continue.
          </p>
        </div>
      </div>
    </div>
  );
}
