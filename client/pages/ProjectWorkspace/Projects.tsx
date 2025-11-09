import React, { useState } from "react";
import { User } from "@shared/api";
import { Plus, MoreHorizontal, Edit, Trash2, Briefcase, Users, Clock, DollarSign } from "lucide-react";
import { MOCK_PROJECTS, MOCK_STAGES } from "@/utils/mockData";
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

  const formatCurrency = (amount: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      INR: "₹",
      USD: "$",
      EUR: "€",
    };
    const symbol = currencySymbols[currency] || currency;
    return `${symbol} ${amount.toLocaleString()}`;
  };

  const summaryCards = [
    { label: "Total Projects", value: projects.length, color: "blue" },
    { label: "Active Projects", value: projects.filter((p) => p.status === "active").length, color: "yellow" },
    { label: "Completed Projects", value: projects.filter((p) => p.status === "completed").length, color: "green" },
    { label: "Pending Approvals", value: projects.filter((p) => p.approvalsStatus === "pending").length, color: "orange" },
  ];

  const getStageCount = (projectId: string) => {
    return MOCK_STAGES.filter((s) => s.projectId === projectId).length;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-yellow-50 text-yellow-700",
      completed: "bg-green-50 text-green-700",
      on_hold: "bg-gray-50 text-gray-700",
    };
    return colors[status] || "bg-gray-50 text-gray-700";
  };

  const getApprovalColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-orange-50 text-orange-700",
      approved: "bg-green-50 text-green-700",
      rejected: "bg-red-50 text-red-700",
    };
    return colors[status] || "bg-gray-50 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1">Manage and track all projects in your portfolio</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const colorClasses: Record<string, string> = {
            blue: "bg-blue-50 text-blue-700",
            yellow: "bg-yellow-50 text-yellow-700",
            green: "bg-green-50 text-green-700",
            orange: "bg-orange-50 text-orange-700",
          };
          return (
            <div key={card.label} className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600">{card.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Project Name</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Client Name</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Project Manager</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Start Date</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">End Date</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Stages</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Progress</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Approval</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{project.name}</td>
                  <td className="px-6 py-4 text-slate-600">{project.clientEmail}</td>
                  <td className="px-6 py-4 text-slate-600">{project.manager}</td>
                  <td className="px-6 py-4 text-slate-600">{project.startDate}</td>
                  <td className="px-6 py-4 text-slate-600">{project.endDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{getStageCount(project.id)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getApprovalColor(project.approvalsStatus)}`}>
                      {project.approvalsStatus.charAt(0).toUpperCase() + project.approvalsStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
