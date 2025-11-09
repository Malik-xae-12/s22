import React, { useState, useMemo } from "react";
import { User } from "@shared/api";
import { Plus, AlertCircle, Circle, CheckCircle2 } from "lucide-react";
import { MOCK_TASKS, MOCK_PROJECTS, MOCK_STAGES } from "@/utils/mockData";
import TaskModal from "@/components/TaskModal";
import FilterBar, { FilterConfig } from "@/components/FilterBar";

interface TasksProps {
  currentUser: User | null;
}

export default function Tasks({ currentUser }: TasksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [tasks] = useState(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    project: "",
    stage: "",
    status: "",
  });
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name" | "dueDate">("newest");

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
    setSortBy("newest");
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

  const filterConfigs: FilterConfig[] = [
    {
      id: "project",
      label: "Project Name",
      placeholder: "Filter by project",
      options: MOCK_PROJECTS.map((p) => ({ label: p.name, value: p.id })),
    },
    {
      id: "stage",
      label: "Stage Name",
      placeholder: "Filter by stage",
      options: MOCK_STAGES.map((s) => ({ label: s.name, value: s.id })),
    },
    {
      id: "status",
      label: "Status",
      placeholder: "Filter by status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "In Progress", value: "in_progress" },
        { label: "Under Review", value: "review" },
        { label: "Completed", value: "completed" },
      ],
    },
  ];

  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks;

    // Apply search
    if (searchQuery) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.comments.toLowerCase().includes(searchQuery.toLowerCase())
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
        case "newest":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case "oldest":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
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
          <p className="text-slate-600 mt-1 text-sm">Manage and track all project tasks</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Task
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
          Showing <span className="font-semibold text-slate-900">{filteredAndSortedTasks.length}</span> tasks
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="dueDate">Due Date</option>
          <option value="name">Name (A-Z)</option>
        </select>
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
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAndSortedTasks.length > 0 ? (
                filteredAndSortedTasks.map((task, idx) => {
                  const priorityColor = getPriorityColor(task.priority);
                  const PriorityIcon = priorityColor.icon;
                  const taskProgress = task.estimatedHours > 0 ? (task.actualHours / task.estimatedHours) * 100 : 0;
                  return (
                    <tr key={task.id} className={`hover:bg-slate-50 transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">{task.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">{getProjectName(task.projectId)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">{getStageName(task.stageId)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">{task.assignedTo}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 text-sm">{task.dueDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                              style={{ width: `${Math.min(taskProgress, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700 w-7 text-right">{Math.round(Math.min(taskProgress, 100))}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    No tasks found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} task={editingTask} />

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-40"
        title="Create new task"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
