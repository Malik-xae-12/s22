import React, { useState, useMemo } from "react";
import { User } from "@shared/api";
import { Plus, Zap, AlertCircle, CheckCircle } from "lucide-react";
import { MOCK_STAGES, MOCK_PROJECTS } from "@/utils/mockData";
import StageModal from "@/components/StageModal";
import FilterBar, { FilterConfig } from "@/components/FilterBar";

interface StagesProps {
  currentUser: User | null;
}

export default function Stages({ currentUser }: StagesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<any>(null);
  const [stages] = useState(MOCK_STAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    project: "",
    stageName: "",
    status: "",
  });
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");

  const handleEdit = (stage: any) => {
    setEditingStage(stage);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStage(null);
  };

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterId]: value }));
  };

  const handleReset = () => {
    setFilters({ project: "", stageName: "", status: "" });
    setSearchQuery("");
    setSortBy("newest");
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; icon: any }> = {
      not_started: { bg: "bg-gray-100", text: "text-gray-700", icon: null },
      in_progress: { bg: "bg-blue-100", text: "text-blue-700", icon: Zap },
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
      },
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

  const filterConfigs: FilterConfig[] = [
    {
      id: "project",
      label: "Project Name",
      placeholder: "Filter by project",
      options: MOCK_PROJECTS.map((p) => ({ label: p.name, value: p.id })),
    },
    {
      id: "stageName",
      label: "Stage Name",
      placeholder: "Filter by stage",
      options: [...new Set(stages.map((s) => s.name))].map((name) => ({
        label: name,
        value: name,
      })),
    },
    {
      id: "status",
      label: "Status",
      placeholder: "Filter by status",
      options: [
        { label: "Not Started", value: "not_started" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
      ],
    },
  ];

  const filteredAndSortedStages = useMemo(() => {
    let result = stages;

    // Apply search
    if (searchQuery) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.remarks.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply filters
    if (filters.project) {
      result = result.filter((s) => s.projectId === filters.project);
    }
    if (filters.stageName) {
      result = result.filter((s) => s.name === filters.stageName);
    }
    if (filters.status) {
      result = result.filter((s) => s.status === filters.status);
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [stages, searchQuery, filters, sortBy]);

  return (
    <div className="space-y-6 relative pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Project Stages</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Manage and track project execution stages
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Stage
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={setSearchQuery}
        onReset={handleReset}
        searchQuery={searchQuery}
        filterConfigs={filterConfigs}
      />

      {/* Sorting Controls */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredAndSortedStages.length}
          </span>{" "}
          stages
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {/* Stages Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Stage Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Actual End
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAndSortedStages.length > 0 ? (
                filteredAndSortedStages.map((stage, idx) => {
                  const statusColor = getStatusColor(stage.status);
                  const StatusIcon = statusColor.icon;
                  return (
                    <tr
                      key={stage.id}
                      className={`hover:bg-slate-50 transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">
                          {stage.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">
                          {getProjectName(stage.projectId)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">
                          {stage.startDate}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">
                          {stage.endDate}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">
                          {stage.approvalDate || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}
                          >
                            {StatusIcon && <StatusIcon className="w-3 h-3" />}
                            {getStatusLabel(stage.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                              style={{ width: `${stage.completion}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700 w-7 text-right">
                            {stage.completion}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No stages found matching your filters
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

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-40"
        title="Create new stage"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
