import React, { useState, useMemo } from "react";
import { User } from "@shared/api";
import { Plus, AlertCircle, Circle, CheckCircle2, Filter, X, ChevronDown, Search } from "lucide-react";
import { MOCK_TASKS, MOCK_PROJECTS, MOCK_STAGES } from "@/utils/mockData";
import TaskModal from "@/components/TaskModal";

interface TasksProps {
  currentUser: User | null;
}

export default function Tasks({ currentUser }: TasksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [tasks] = useState(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    project: "",
    stage: "",
    status: "",
  });
  const [sortBy, setSortBy] = useState<"oldest" | "name" | "dueDate">("oldest");

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterId]: value }));
  };

  const handleReset = () => {
    setFilters({ project: "", stage: "", status: "" });
    setSearchQuery("");
    setSortBy("oldest");
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, { bg: string; text: string; icon: any }> = {
      critical: { bg: "bg-red-100", text: "text-red-700", icon: AlertCircle },
      high: { bg: "bg-orange-100", text: "text-orange-700", icon: AlertCircle },
      medium: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Circle },
      low: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle2 },
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-slate-100 text-slate-700",
      in_progress: "bg-blue-100 text-blue-700",
      review: "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
    };
    return colors[status] || "bg-slate-100 text-slate-700";
  };

  const getStatusLabel = (status: string) => {
    return status === "in_progress"
      ? "In Progress"
      : status === "pending"
        ? "Pending"
        : status === "review"
          ? "Under Review"
          : "Completed";
  };

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const getProjectName = (projectId: string) => {
    return MOCK_PROJECTS.find((p) => p.id === projectId)?.name || "Unknown";
  };

  const getStageName = (stageId: string) => {
    return MOCK_STAGES.find((s) => s.id === stageId)?.name || "Unknown";
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks;

    // Apply search
    if (searchQuery) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.comments.toLowerCase().includes(searchQuery.toLowerCase()) ||
          getProjectName(t.projectId).toLowerCase().includes(searchQuery.toLowerCase()) ||
          getStageName(t.stageId).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.project) {
      result = result.filter((t) => t.projectId === filters.project);
    }
    if (filters.stage) {
      result = result.filter((t) => t.stageId === filters.stage);
    }
    if (filters.status) {
      result = result.filter((t) => t.status === filters.status);
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [tasks, searchQuery, filters, sortBy]);

  return (
    <div className="space-y-6 relative pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Manage and track all project tasks
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks, projects, or stages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 ${
                showFilters || activeFiltersCount > 0
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none pl-4 pr-10 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
              >
                <option value="oldest">Oldest First</option>
                <option value="dueDate">Due Date</option>
                <option value="name">Name (A-Z)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Collapsible Filter Section */}
        {showFilters && (
          <div className="border-t border-slate-200 bg-slate-50 p-6 animate-slideDown">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Filter Options</h3>
              <button
                onClick={handleReset}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Project Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Name
                </label>
                <div className="relative">
                  <select
                    value={filters.project}
                    onChange={(e) => handleFilterChange("project", e.target.value)}
                    className="w-full appearance-none px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">All Projects</option>
                    {MOCK_PROJECTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Stage Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Stage Name
                </label>
                <div className="relative">
                  <select
                    value={filters.stage}
                    onChange={(e) => handleFilterChange("stage", e.target.value)}
                    className="w-full appearance-none px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">All Stages</option>
                    {MOCK_STAGES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="w-full appearance-none px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Under Review</option>
                    <option value="completed">Completed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {filters.project && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Project: {getProjectName(filters.project)}
                      <button
                        onClick={() => handleFilterChange("project", "")}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.stage && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Stage: {getStageName(filters.stage)}
                      <button
                        onClick={() => handleFilterChange("stage", "")}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {filters.status && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Status: {getStatusLabel(filters.status)}
                      <button
                        onClick={() => handleFilterChange("status", "")}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredAndSortedTasks.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {tasks.length}
          </span>{" "}
          tasks
        </p>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Task Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAndSortedTasks.length > 0 ? (
                filteredAndSortedTasks.map((task, idx) => {
                  const priorityColor = getPriorityColor(task.priority);
                  const PriorityIcon = priorityColor.icon;
                  const taskProgress =
                    task.estimatedHours > 0
                      ? (task.actualHours / task.estimatedHours) * 100
                      : 0;
                  return (
                    <tr
                      key={task.id}
                      className={`hover:bg-slate-50 transition-colors duration-200 cursor-pointer ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                      onClick={() => handleEdit(task)}
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">
                          {task.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">
                          {getProjectName(task.projectId)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">
                          {getStageName(task.stageId)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">
                          {task.assignedTo}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">
                          {task.startDate || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">
                          {task.dueDate}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}
                        >
                          {getStatusLabel(task.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${priorityColor.bg} ${priorityColor.text}`}
                          >
                            <PriorityIcon className="w-3 h-3" />
                            {getPriorityLabel(task.priority)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-500 font-medium">No tasks found</p>
                      <p className="text-slate-400 text-sm">Try adjusting your filters or search query</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={editingTask}
      />

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-40"
        title="Create new task"
      >
        <Plus className="w-6 h-6" />
      </button>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
