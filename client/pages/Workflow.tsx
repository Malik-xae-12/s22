import { useState } from "react";
import { User } from "@shared/api";
import { MOCK_PROJECTS, MOCK_WORKFLOW_UPDATES } from "@/utils/mockData";
import { Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { isTeamMember } from "@/utils/auth";

interface WorkflowProps {
  currentUser: User | null;
}

export default function Workflow({ currentUser }: WorkflowProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  // Show all projects for demo purposes
  const projects = MOCK_PROJECTS;

  const currentProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : projects[0];

  const projectUpdates = currentProject
    ? MOCK_WORKFLOW_UPDATES.filter((u) => u.projectId === currentProject.id)
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200 text-green-700";
      case "in_progress":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "pending":
        return "bg-blue-50 border-blue-200 text-blue-700";
      default:
        return "bg-slate-50 border-slate-200 text-slate-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, " ");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Workflow Tracker
          </h1>
          <p className="text-slate-600 mt-1">
            Monitor project updates and progress
          </p>
        </div>
        <Link
          to="/add-project"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Update
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Project List Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden sticky top-6">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Projects</h3>
            </div>
            <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                    selectedProjectId === project.id
                      ? "bg-blue-50 border-l-4 border-blue-600"
                      : ""
                  }`}
                >
                  <p className="font-medium text-slate-900 text-sm">
                    {project.teamName}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {project.manager}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">
                      {project.progress}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow Updates */}
        <div className="lg:col-span-3">
          {currentProject ? (
            <div className="space-y-6">
              {/* Project Header */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {currentProject.name}
                    </h2>
                    <p className="text-slate-600 mt-2">
                      {currentProject.description}
                    </p>
                  </div>
                  <Link
                    to={`/projects/${currentProject.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600 font-medium">
                      Manager
                    </p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {currentProject.manager}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600 font-medium">
                      Estimation
                    </p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {currentProject.estimation}h
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600 font-medium">Status</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1 capitalize">
                      {currentProject.status}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600 font-medium">
                      Progress
                    </p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {currentProject.progress}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Updates Timeline */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Project Updates
                </h3>

                {projectUpdates.length === 0 ? (
                  <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
                    <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">
                      No workflow updates yet
                    </p>
                    <p className="text-slate-500 text-sm mt-1">
                      Updates will appear here as the project progresses
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projectUpdates.map((update) => (
                      <div
                        key={update.id}
                        className={`border-l-4 rounded-lg p-6 bg-white shadow-sm ${
                          update.status === "completed"
                            ? "border-l-green-500 bg-green-50"
                            : update.status === "in_progress"
                              ? "border-l-yellow-500 bg-yellow-50"
                              : "border-l-blue-500 bg-blue-50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-0.5">
                              {getStatusIcon(update.status)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-900">
                                {update.title}
                              </h4>
                              <p className="text-slate-700 text-sm mt-2">
                                {update.notes}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${getStatusColor(
                              update.status,
                            )}`}
                          >
                            {getStatusLabel(update.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="bg-white bg-opacity-50 rounded p-3">
                            <p className="text-xs text-slate-600 font-medium uppercase">
                              Effort
                            </p>
                            <p className="text-lg font-bold text-slate-900 mt-1">
                              {update.effort}
                            </p>
                          </div>
                          <div className="bg-white bg-opacity-50 rounded p-3">
                            <p className="text-xs text-slate-600 font-medium uppercase">
                              Deliverables
                            </p>
                            <p className="text-sm font-semibold text-slate-900 mt-1">
                              {update.deliverables}
                            </p>
                          </div>
                          <div className="bg-white bg-opacity-50 rounded p-3">
                            <p className="text-xs text-slate-600 font-medium uppercase">
                              Date
                            </p>
                            <p className="text-sm font-semibold text-slate-900 mt-1">
                              {new Date(update.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">
                No projects to display
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Select a project from the list to view updates
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
