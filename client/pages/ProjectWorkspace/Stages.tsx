import React, { useState, useMemo } from "react";
import {
  Plus,
  Zap,
  CheckCircle,
  Filter,
  Calendar,
  Upload,
  X,
  Edit2,
  Trash2,
} from "lucide-react";
import { MOCK_STAGES, MOCK_PROJECTS } from "@/utils/mockData";
import StageModal from "@/components/StageModal";

export default function Stages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<any>(null);
  const [stages, setStages] = useState(MOCK_STAGES);

  // Modals
  const [selectedStage, setSelectedStage] = useState<any>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    projectName: "",
    stageName: "",
    startDate: "",
    actualEndDate: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(true);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      projectName: "",
      stageName: "",
      startDate: "",
      actualEndDate: "",
      status: "",
    });
  };

  const handleEdit = (stage: any) => {
    setEditingStage(stage);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStage(null);
  };

  const openDateModal = (stage: any) => {
    setSelectedStage(stage);
    setIsDateModalOpen(true);
  };

  const closeDateModal = () => {
    setIsDateModalOpen(false);
    setSelectedStage(null);
  };

  const openUploadModal = (stage: any) => {
    setSelectedStage(stage);
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
    setSelectedStage(null);
  };

  const deleteStage = (id: string) => {
    if (confirm("Are you sure you want to delete this stage?")) {
      setStages((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; icon: any }> = {
      not_started: { bg: "bg-gray-100", text: "text-gray-700", icon: null },
      in_progress: { bg: "bg-blue-100", text: "text-blue-700", icon: Zap },
      completed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
    };
    return colors[status] || colors.not_started;
  };

  const getStatusLabel = (status: string) => {
    return status === "not_started"
      ? "Not Started"
      : status === "in_progress"
      ? "In Progress"
      : "Completed";
  };

  const getProjectName = (projectId: string) => {
    return MOCK_PROJECTS.find((p) => p.id === projectId)?.name || "Unknown";
  };

  const filteredStages = useMemo(() => {
    let result = stages;

    if (filters.projectName) {
      result = result.filter((s) =>
        getProjectName(s.projectId)
          .toLowerCase()
          .includes(filters.projectName.toLowerCase())
      );
    }
    if (filters.stageName) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(filters.stageName.toLowerCase())
      );
    }
    if (filters.startDate) {
      result = result.filter((s) => s.startDate >= filters.startDate);
    }
    if (filters.actualEndDate) {
      result = result.filter((s) => s.approvalDate >= filters.actualEndDate);
    }
    if (filters.status) {
      result = result.filter((s) => s.status === filters.status);
    }

    return result;
  }, [stages, filters]);

  return (
    <div className="space-y-6 relative pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Stages</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Manage and track project execution stages
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-all duration-300"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Stage
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showFilters ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
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
                className="px-3 py-2 w-full rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-600 mb-1">
                Stage Name
              </label>
              <input
                type="text"
                name="stageName"
                placeholder="Search stage..."
                value={filters.stageName}
                onChange={handleFilterChange}
                className="px-3 py-2 w-full rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-600 mb-1">
                Start Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="pl-9 pr-3 py-2 w-full rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-600 mb-1">
                Actual End Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  name="actualEndDate"
                  value={filters.actualEndDate}
                  onChange={handleFilterChange}
                  className="pl-9 pr-3 py-2 w-full rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-600 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="px-3 py-2 w-full rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="self-end text-xs text-slate-600 hover:text-red-600 px-3 py-2"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {[
                  "Stage Name",
                  "Project Name",
                  "Dates",
                  "Stage Status",
                  "Upload",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className={`px-6 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider ${
                      ["Dates", "Upload", "Actions"].includes(col)
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
              {filteredStages.length > 0 ? (
                filteredStages.map((stage, idx) => {
                  const statusColor = getStatusColor(stage.status);
                  const StatusIcon = statusColor.icon;
                  return (
                    <tr
                      key={stage.id}
                      className={`hover:bg-slate-50 transition-all duration-300 ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                      }`}
                    >
                      <td className="px-6 py-3 text-sm font-semibold text-slate-900 truncate">
                        {stage.name}
                      </td>

                      <td className="px-6 py-3 text-sm text-slate-600 truncate">
                        {getProjectName(stage.projectId)}
                      </td>

                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => openDateModal(stage)}
                          className="p-2 rounded-full hover:bg-slate-100 transition"
                        >
                          <Calendar className="w-5 h-5 text-slate-700 mx-auto" />
                        </button>
                      </td>

                      <td className="px-6 py-3 text-center">
                        <span
                          className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}
                        >
                          {StatusIcon && <StatusIcon className="w-3 h-3" />}
                          {getStatusLabel(stage.status)}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => openUploadModal(stage)}
                          className="p-2 rounded-full hover:bg-slate-100 transition"
                        >
                          <Upload className="w-5 h-5 text-blue-600 mx-auto" />
                        </button>
                      </td>

                      <td className="px-6 py-3 text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleEdit(stage)}
                            className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteStage(stage.id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded-full transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No stages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stage Modal */}
      <StageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        stage={editingStage}
      />

      {/* Date Modal */}
      {isDateModalOpen && selectedStage && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-6 relative">
            <button
              onClick={closeDateModal}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Stage Dates
            </h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Start Date:</span>
                <span>{selectedStage.startDate || "Not Set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">End Date:</span>
                <span>{selectedStage.endDate || "Not Set"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && selectedStage && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
            <button
              onClick={closeUploadModal}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Upload Files
            </h2>

            <input
              type="file"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />

            <button className="mt-5 w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
