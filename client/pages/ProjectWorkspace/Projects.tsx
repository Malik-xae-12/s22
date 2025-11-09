import React, { useState } from "react";
import { User } from "@shared/api";
import {
  Plus,
  Edit,
  Trash2,
  Briefcase,
  Users,
  Zap,
  AlertCircle,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { MOCK_PROJECTS } from "@/utils/mockData";
import ProjectModal from "@/components/ProjectModal";

interface ProjectsProps {
  currentUser: User | null;
}

export default function Projects({ currentUser }: ProjectsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projects] = useState(MOCK_PROJECTS);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    department: "",
    clientName: "",
    projectName: "",
    startDateFrom: "",
    startDateTo: "",
  });

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: "",
      priority: "",
      department: "",
      clientName: "",
      projectName: "",
      startDateFrom: "",
      startDateTo: "",
    });
  };

  const filteredProjects = projects.filter((project) => {
    if (filters.status && project.status !== filters.status) return false;
    if (filters.priority && project.priority !== filters.priority) return false;
    if (filters.department && project.department !== filters.department)
      return false;
    if (
      filters.clientName &&
      !project.clientName?.toLowerCase().includes(filters.clientName.toLowerCase())
    )
      return false;
    if (
      filters.projectName &&
      !project.name.toLowerCase().includes(filters.projectName.toLowerCase())
    )
      return false;
    if (filters.startDateFrom && project.startDate < filters.startDateFrom)
      return false;
    if (filters.startDateTo && project.startDate > filters.startDateTo)
      return false;
    return true;
  });

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: Briefcase,
      color: "bg-blue-50 text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Active Projects",
      value: projects.filter((p) => p.status === "active").length,
      icon: Zap,
      color: "bg-yellow-50 text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      label: "Completed Projects",
      value: projects.filter((p) => p.status === "completed").length,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Pending Approvals",
      value: projects.filter((p) => p.approvalsStatus === "pending").length,
      icon: AlertCircle,
      color: "bg-orange-50 text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6 relative pb-20 md:pb-0">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
            <p className="text-slate-600 mt-1 text-sm">
              Manage and track all projects in your portfolio
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all text-slate-700 font-medium text-sm"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>
        </div>

        {/* Filters */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showFilters ? "mt-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-4">
            {/* Row 1 */}
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={filters.clientName}
                  onChange={(e) => handleFilterChange("clientName", e.target.value)}
                  placeholder="Search client..."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium text-slate-700 transition-all"
                />
              </div>

              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={filters.projectName}
                  onChange={(e) => handleFilterChange("projectName", e.target.value)}
                  placeholder="Search project..."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium text-slate-700 transition-all"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-32">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Start Date From
                </label>
                <input
                  type="date"
                  value={filters.startDateFrom}
                  onChange={(e) => handleFilterChange("startDateFrom", e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium text-slate-700 transition-all"
                />
              </div>

              <div className="flex-1 min-w-32">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Start Date To
                </label>
                <input
                  type="date"
                  value={filters.startDateTo}
                  onChange={(e) => handleFilterChange("startDateTo", e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium text-slate-700 transition-all"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium text-slate-700 cursor-pointer transition-all"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Priority
                </label>
                <div className="relative">
                  <select
                    value={filters.priority}
                    onChange={(e) => handleFilterChange("priority", e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium text-slate-700 cursor-pointer transition-all"
                  >
                    <option value="">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Department
                </label>
                <div className="relative">
                  <select
                    value={filters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium text-slate-700 cursor-pointer transition-all"
                  >
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <button
                onClick={handleResetFilters}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  {stat.label}
                </p>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className="w-4 h-4 text-slate-700" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProjects.map((project, idx) => (
                <tr
                  key={project.id}
                  className={`hover:bg-slate-50 transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900">
                      {project.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm">
                      {project.clientName || project.teamName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {project.manager}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm">
                      {project.startDate}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm">
                      {project.endDate}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 hover:bg-blue-100 text-blue-600 hover:text-blue-700 rounded-lg transition-all duration-200"
                        title="Edit project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={editingProject}
      />

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-40"
        title="Create new project"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
