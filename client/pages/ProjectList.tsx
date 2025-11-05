import { useState } from "react";
import { User } from "@shared/api";
import { isAdmin, isTeamMember } from "@/utils/auth";
import {
  MOCK_PROJECTS,
  STAGE_COLORS,
  getStageLabel,
  getStatusLabel,
} from "@/utils/mockData";
import { Link } from "react-router-dom";
import { Search, Filter, Plus } from "lucide-react";

interface ProjectListProps {
  currentUser: User | null;
}

export default function ProjectList({ currentUser }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState(MOCK_PROJECTS);

  const handleAddProject = (
    newProject: Omit<Project, "id" | "createdAt" | "updatedAt" | "progress">
  ) => {
    const project: Project = {
      ...newProject,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      progress: 0,
    };
    setProjects([...projects, project]);
  };

  const getRelevantProjects = () => {
    let filtered = projects;

    if (!isAdmin(currentUser)) {
      if (isTeamMember(currentUser)) {
        filtered = filtered.filter((p) => p.manager === currentUser?.name);
      } else {
        filtered = filtered.filter((p) => p.clientEmail === currentUser?.email);
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.teamName.toLowerCase().includes(query) ||
          p.manager.toLowerCase().includes(query) ||
          p.clientEmail.toLowerCase().includes(query),
      );
    }

    if (stageFilter) {
      filtered = filtered.filter((p) => p.stage === stageFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    return filtered;
  };

  const filteredProjects = getRelevantProjects();

  const stages = [
    { value: "prospecting", label: "Prospecting" },
    { value: "planning", label: "Planning" },
    { value: "in_progress", label: "In Progress" },
    { value: "review", label: "Review" },
    { value: "signed_off", label: "Signed Off" },
  ];

  const statuses = [
    { value: "active", label: "Active" },
    { value: "on_hold", label: "On Hold" },
    { value: "completed", label: "Completed" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1">
            {isAdmin(currentUser)
              ? "Manage all projects across your organization"
              : isTeamMember(currentUser)
                ? "View and manage your assigned projects"
                : "Track your project progress"}
          </p>
        </div>
        {(isAdmin(currentUser) || isTeamMember(currentUser)) && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Stage
            </label>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Stages</option>
              {stages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery("");
                setStageFilter("");
                setStatusFilter("");
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-slate-600">
              No projects found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">
                    Team Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">
                    Manager
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">
                    Stage
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">
                    Estimation
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">
                    Timeline
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">
                    Approval
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProjects.map((project) => {
                  const stageColor =
                    STAGE_COLORS[project.stage] || STAGE_COLORS.prospecting;
                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {project.teamName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {project.clientEmail}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {project.manager}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${stageColor.bg} ${stageColor.text}`}
                        >
                          {getStageLabel(project.stage)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "active"
                              ? "bg-green-50 text-green-700"
                              : project.status === "completed"
                                ? "bg-blue-50 text-blue-700"
                                : project.status === "on_hold"
                                  ? "bg-yellow-50 text-yellow-700"
                                  : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          {getStatusLabel(project.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {project.estimation}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {project.timeline}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            project.approvalsStatus === "approved"
                              ? "bg-green-50 text-green-700"
                              : project.approvalsStatus === "rejected"
                                ? "bg-red-50 text-red-700"
                                : "bg-orange-50 text-orange-700"
                          }`}
                        >
                          {project.approvalsStatus.charAt(0).toUpperCase() +
                            project.approvalsStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/projects/${project.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Total Projects</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {filteredProjects.length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Active</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {filteredProjects.filter((p) => p.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Completed</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {filteredProjects.filter((p) => p.status === "completed").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Pending Approval</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {
              filteredProjects.filter((p) => p.approvalsStatus === "pending")
                .length
            }
          </p>
        </div>
      </div>
    </div>
  );
}
