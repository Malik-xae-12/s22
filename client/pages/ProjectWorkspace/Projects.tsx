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
  Calendar,
  Filter,
  X,
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

  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    projectName: "",
    clientName: "",
    dateRange: "",
  });
  const [showFilters, setShowFilters] = useState(true);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ projectName: "", clientName: "", dateRange: "" });
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const openDateModal = (project: any) => {
    setSelectedProject(project);
    setIsDateModalOpen(true);
  };

  const closeDateModal = () => {
    setIsDateModalOpen(false);
    setSelectedProject(null);
  };

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: Briefcase,
      bgColor: "bg-blue-100",
    },
    {
      label: "Active Projects",
      value: projects.filter((p) => p.status === "active").length,
      icon: Zap,
      bgColor: "bg-yellow-100",
    },
    {
      label: "Completed Projects",
      value: projects.filter((p) => p.status === "completed").length,
      icon: CheckCircle,
      bgColor: "bg-green-100",
    },
    {
      label: "Pending Approvals",
      value: projects.filter((p) => p.approvalsStatus === "pending").length,
      icon: AlertCircle,
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6 relative pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Manage and track all projects in your portfolio
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-all"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>

       {/* 🔽 Filter Section with Smooth Animation */}
  <div
    className={`transition-all duration-500 ease-in-out overflow-hidden ${
      showFilters ? "max-h-[300px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
    }`}
  >
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Client Name */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-600 mb-1">
            Client Name
          </label>
          <input
            type="text"
            name="clientName"
            placeholder="Search client..."
            value={filters.clientName}
            onChange={handleFilterChange}
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Project Name */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-600 mb-1">
            Project Name
          </label>
          <input
            type="text"
            name="projectName"
            placeholder="Search project..."
            value={filters.projectName}
            onChange={handleFilterChange}
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Time Range */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-600 mb-1">
            Time Range
          </label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="date"
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="pl-9 pr-3 py-2 w-full rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className="self-end text-xs text-slate-600 hover:text-red-600 px-3 py-2 transition-all duration-200"
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

     

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {[
                  "Project Name",
                  "Client Name",
                  "Manager",
                  "Project Mode",
                  "Project Type",
                  "Dates",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className={`px-6 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider ${
                      ["Dates", "Actions"].includes(col)
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {projects.map((project, idx) => (
                <tr
                  key={project.id}
                  className={`hover:bg-slate-50 transition-all duration-200 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                  }`}
                >
                  <td className="px-6 py-3 font-semibold text-slate-900 whitespace-normal break-words">
                    {project.name}
                  </td>
                  <td className="px-6 py-3 text-slate-600 whitespace-normal break-words">
                    {project.teamName}
                  </td>
                  <td className="px-6 py-3 text-slate-600 flex items-center gap-2 whitespace-normal break-words">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {project.manager}
                  </td>
                  <td className="px-6 py-3 text-slate-600 whitespace-normal break-words">
                    {project.projectMode || "Fixed Price"}
                  </td>
                  <td className="px-6 py-3 text-slate-600 whitespace-normal break-words">
                    {project.projectType || "Web Development"}
                  </td>

                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => openDateModal(project)}
                      className="p-2 rounded-full hover:bg-slate-100 transition"
                    >
                      <Calendar className="w-5 h-5 text-slate-700 mx-auto" />
                    </button>
                  </td>

                  <td className="px-6 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:bg-red-50 p-2 rounded-full transition">
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

      {/* Date Modal */}
      {isDateModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-6 relative">
            <button
              onClick={closeDateModal}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Project Dates
            </h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Start Date:</span>
                <span>{selectedProject.startDate || "Not Set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">End Date:</span>
                <span>{selectedProject.endDate || "Not Set"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
