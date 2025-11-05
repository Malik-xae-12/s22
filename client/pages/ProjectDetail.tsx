import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { User } from "@shared/api";
import { MOCK_PROJECTS, MOCK_MEETINGS, MOCK_DOCUMENTS, formatDate, formatBytes } from "@/utils/mockData";
import {
  ArrowLeft,
  Calendar,
  Users,
  DollarSign,
  Clock,
  FileText,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react";
import ScheduleMeetingModal from "@/components/ScheduleMeetingModal";

interface ProjectDetailProps {
  currentUser: User | null;
}

export default function ProjectDetail({ currentUser }: ProjectDetailProps) {
  const { id } = useParams();
  const project = MOCK_PROJECTS.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "meetings">("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Project not found</p>
        <Link to="/projects" className="text-blue-600 hover:underline mt-2 inline-block">
          Back to Projects
        </Link>
      </div>
    );
  }

  const meetings = MOCK_MEETINGS.filter((m) => m.projectId === id);
  const documents = MOCK_DOCUMENTS.filter((d) => d.projectId === id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            to="/projects"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
          <p className="text-slate-600 mt-1">{project.description}</p>
        </div>
        {/* {(isAdmin(currentUser) || isTeamMember(currentUser)) && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        )} */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Stage</p>
              <p className="text-lg font-bold text-slate-900 mt-1">
                {project.stage.replace(/_/g, " ").toUpperCase()}
              </p>
            </div>
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Status</p>
              <p className="text-lg font-bold text-slate-900 mt-1">
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Progress</p>
              <p className="text-lg font-bold text-slate-900 mt-1">{project.progress}%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {project.progress}%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Approval</p>
              <p className="text-lg font-bold text-slate-900 mt-1">
                {project.approvalsStatus.charAt(0).toUpperCase() + project.approvalsStatus.slice(1)}
              </p>
            </div>
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-slate-900">Project Progress</p>
          <p className="text-xs font-medium text-slate-600">{project.progress}% complete</p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-8">
          {["overview", "documents", "meetings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-2 py-4 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "documents" && (
                <span className="ml-2 text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                  {documents.length}
                </span>
              )}
              {tab === "meetings" && (
                <span className="ml-2 text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                  {meetings.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Details */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-600 uppercase">Team</p>
                    <p className="text-slate-900 font-medium mt-1">{project.teamName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-600 uppercase">Manager</p>
                    <p className="text-slate-900 font-medium mt-1">{project.manager}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-600 uppercase">Start Date</p>
                    <p className="text-slate-900 font-medium mt-1">{formatDate(project.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-600 uppercase">End Date</p>
                    <p className="text-slate-900 font-medium mt-1">{formatDate(project.endDate)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-600 uppercase">Client Email</p>
                  <p className="text-slate-900 font-medium mt-1">{project.clientEmail}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-600 uppercase">Sponsor</p>
                  <p className="text-slate-900 font-medium mt-1">{project.sponsor}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-600 uppercase">NDA Status</p>
                  <p
                    className={`text-slate-900 font-medium mt-1 inline-block px-2 py-1 rounded text-sm ${
                      project.nda === "Signed"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {project.nda}
                  </p>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Notes & Comments</h3>
              <p className="text-slate-700">{project.comments}</p>
            </div>

            {/* QPM Summary */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">QPM Summary</h3>
              <p className="text-slate-700">{project.qpmSummary}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-slate-600">Estimation</p>
                    <p className="font-medium text-slate-900">{project.estimation} hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-slate-600">Budget</p>
                    <p className="font-medium text-slate-900">${project.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-slate-600">Team Members</p>
                    <p className="font-medium text-slate-900">{project.assignedTeam.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members */}
            {project.assignedTeam.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Assigned Team</h3>
                <div className="space-y-2">
                  {project.assignedTeam.map((userId) => {
                    const user = [
                      { id: "user-2", name: "Sarah Chen" },
                      { id: "user-3", name: "Michael Torres" },
                    ].find((u) => u.id === userId);
                    return (
                      <div key={userId} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                        <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold">
                          {user?.name.charAt(0)}
                        </div>
                        <p className="text-sm font-medium">{user?.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Project Documents</h3>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm">
              + Upload Document
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-900">{doc.name}</p>
                        <p className="text-sm text-slate-600">
                          {formatBytes(doc.size)} • Uploaded {formatDate(doc.uploadedAt)} by {doc.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-slate-100 text-xs font-medium text-slate-700 rounded">
                      v{doc.versions.length}
                    </span>
                  </div>

                  {doc.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {doc.versions.length > 1 && (
                    <div className="mt-3 text-xs text-slate-600">
                      <details>
                        <summary className="cursor-pointer font-medium">View Version History</summary>
                        <div className="mt-2 space-y-1 pl-4 border-l border-slate-200">
                          {doc.versions.map((ver) => (
                            <div key={ver.version} className="text-slate-600">
                              <p>
                                <strong>v{ver.version}</strong> - {formatDate(ver.uploadedAt)} by {ver.uploadedBy}
                              </p>
                              <p className="text-slate-500">{ver.changes}</p>
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "meetings" && (
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Meeting History</h3>
            <button
              onClick={() => setIsMeetingModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm"
            >
              + Schedule Meeting
            </button>
          </div>

          {meetings.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No meetings scheduled yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-slate-900">{meeting.title}</p>
                      <p className="text-sm text-slate-600">
                        {formatDate(meeting.date)} • {meeting.startTime} - {meeting.endTime}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 mb-3">{meeting.notes}</p>

                  {meeting.actionItems.length > 0 && (
                    <div className="mb-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-xs font-medium text-yellow-900 uppercase mb-1">Action Items</p>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        {meeting.actionItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {meeting.decisions.length > 0 && (
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs font-medium text-blue-900 uppercase mb-1">Decisions</p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        {meeting.decisions.map((decision, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{decision}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Meeting Scheduling Modal */}
      <ScheduleMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        projectId={id}
        projectName={project?.name}
      />
    </div>
  );
}
