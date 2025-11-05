import { User } from "@shared/api";
import { MOCK_PROJECTS, formatDate } from "@/utils/mockData";
import { Eye, FileText, CheckCircle, AlertCircle, Calendar } from "lucide-react";

interface ClientSummaryProps {
  currentUser: User | null;
}

export default function ClientSummary({ currentUser }: ClientSummaryProps) {
  const projects = MOCK_PROJECTS.filter((p) => p.clientEmail === currentUser?.email);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
        <h1 className="text-4xl font-bold">Your Projects</h1>
        <p className="text-blue-100 mt-2">Track your project progress and approvals</p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
          <Eye className="w-12 h-12 mx-auto mb-3 text-slate-400" />
          <p className="text-slate-600">You have no projects assigned</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              {/* Project Header */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900">{project.name}</h3>
                <p className="text-slate-600 mt-1">{project.description}</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Project Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-slate-600 uppercase">Stage</p>
                    <p className="text-lg font-bold text-slate-900 mt-2">
                      {project.stage.replace(/_/g, " ").toUpperCase()}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-slate-600 uppercase">Status</p>
                    <div className="flex items-center gap-2 mt-2">
                      {project.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      )}
                      <p className="font-bold text-slate-900">
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-slate-600 uppercase">Progress</p>
                    <p className="text-lg font-bold text-slate-900 mt-2">{project.progress}%</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-slate-600 uppercase">Approval</p>
                    <p className="text-lg font-bold text-slate-900 mt-2">
                      {project.approvalsStatus.charAt(0).toUpperCase() + project.approvalsStatus.slice(1)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-slate-900">Overall Progress</p>
                    <p className="text-sm font-bold text-blue-600">{project.progress}% complete</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Key Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">Timeline</h4>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p>
                        <strong className="text-slate-900">Start:</strong> {formatDate(project.startDate)}
                      </p>
                      <p>
                        <strong className="text-slate-900">End:</strong> {formatDate(project.endDate)}
                      </p>
                      <p>
                        <strong className="text-slate-900">Duration:</strong> {project.timeline}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">Project Details</h4>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p>
                        <strong className="text-slate-900">Manager:</strong> {project.manager}
                      </p>
                      <p>
                        <strong className="text-slate-900">Team:</strong> {project.teamName}
                      </p>
                      <p>
                        <strong className="text-slate-900">Sponsor:</strong> {project.sponsor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Summary</h4>
                  <p className="text-slate-700">{project.qpmSummary}</p>
                </div>

                {/* Key Updates */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Key Updates
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Project scope finalized and approved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Design mockups completed and reviewed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Awaiting approval on next phase</span>
                    </li>
                  </ul>
                </div>

                {/* Action Items for Client */}
                {project.approvalsStatus === "pending" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-900 mb-2">Action Required</h4>
                    <p className="text-sm text-yellow-800 mb-3">
                      Your review and approval is requested for the next project phase.
                    </p>
                    <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium text-sm">
                      Review & Approve
                    </button>
                  </div>
                )}

                {/* NDA Status */}
                <div className="text-sm text-slate-600 border-t border-slate-200 pt-4">
                  <p>
                    <strong>NDA Status:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        project.nda === "Signed"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {project.nda}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
