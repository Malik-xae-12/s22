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

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

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
      <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Manage and track all projects in your portfolio
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Client Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Manager
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Project Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  End Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Est. Hours
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Est. Cost
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Billing Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  NDA
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Progress
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projects.map((project, idx) => (
                <tr
                  key={project.id}
                  className={`hover:bg-slate-50 transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900 whitespace-nowrap">
                      {project.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm whitespace-nowrap">
                      {project.clientName || project.teamName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 flex items-center gap-2 whitespace-nowrap">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {project.manager}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm whitespace-nowrap">
                      {project.projectType || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                      project.priority === "Critical"
                        ? "bg-red-100 text-red-700"
                        : project.priority === "High"
                          ? "bg-orange-100 text-orange-700"
                          : project.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                    }`}>
                      {project.priority || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm whitespace-nowrap">
                      {project.department || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm whitespace-nowrap">
                      {project.startDate}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm whitespace-nowrap">
                      {project.endDate}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm whitespace-nowrap">
                      {project.estimatedHours || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm whitespace-nowrap">
                      {project.currency} {project.estimatedCost || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm whitespace-nowrap">
                      {project.billingType || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                      project.nda === "Signed"
                        ? "bg-green-100 text-green-700"
                        : project.nda === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-700"
                    }`}>
                      {project.nda}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-fit">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-8 text-right">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center whitespace-nowrap">
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
