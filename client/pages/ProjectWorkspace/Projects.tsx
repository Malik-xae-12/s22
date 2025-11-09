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
    <div className="space-y-6 relative pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base">Manage and track all projects in your portfolio</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-medium"
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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                <th className="px-6 py-4 text-left font-semibold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  Project Name
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Client Name</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  Manager
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Start Date</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">End Date</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Est. Hours
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Est. Cost
                </th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Billing Type</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Currency</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Proposal</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Progress</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 transition-all duration-200">
                  <td className="px-6 py-4 font-semibold text-slate-900">{project.name}</td>
                  <td className="px-6 py-4 text-slate-600">{project.teamName}</td>
                  <td className="px-6 py-4 text-slate-600">{project.manager}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{project.startDate}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{project.endDate}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{project.estimatedHours}h</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{formatCurrency(project.estimatedCost, project.currency)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {project.billingType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{project.currency}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">{project.proposal}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 w-10">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                        title="Edit project"
                      >
                        <Edit className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 group-hover:text-red-700" />
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
      <ProjectModal isOpen={isModalOpen} onClose={handleCloseModal} project={editingProject} />
    </div>
  );
}
