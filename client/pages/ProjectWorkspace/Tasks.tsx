import React, { useState, useMemo } from "react";
import {
  User as UserIcon,
  Plus,
  Filter,
  Calendar,
  CheckCircle,
  Zap,
  Users,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import { User } from "@shared/api";
import { MOCK_TASKS, MOCK_PROJECTS, MOCK_STAGES } from "@/utils/mockData";
import TaskModal from "@/components/TaskModal";

interface TasksProps {
  currentUser: User | null;
}

export default function Tasks({ currentUser }: TasksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [tasks] = useState(MOCK_TASKS);

  // Modal states
  const [isPeopleModalOpen, setIsPeopleModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  // Filters
  const [filters, setFilters] = useState({
    projectName: "",
    stageName: "",
    taskName: "",
    startDate: "",
    endDate: "",
  });
  const [showFilters, setShowFilters] = useState(true);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      projectName: "",
      stageName: "",
      taskName: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const openPeopleModal = (task: any) => {
    setSelectedTask(task);
    setIsPeopleModalOpen(true);
  };

  const closePeopleModal = () => {
    setSelectedTask(null);
    setIsPeopleModalOpen(false);
  };

  const openDateModal = (task: any) => {
    setSelectedTask(task);
    setIsDateModalOpen(true);
  };

  const closeDateModal = () => {
    setSelectedTask(null);
    setIsDateModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; icon: any }> = {
      pending: { bg: "bg-gray-100", text: "text-gray-700", icon: null },
      in_progress: { bg: "bg-blue-100", text: "text-blue-700", icon: Zap },
      completed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
    };
    return colors[status] || colors.pending;
  };

  const getStatusLabel = (status: string) =>
    status === "pending" ? "Pending" : status === "in_progress" ? "In Progress" : "Completed";

  const getProjectName = (projectId: string) =>
    MOCK_PROJECTS.find((p) => p.id === projectId)?.name || "Unknown";

  const getStageName = (stageId: string) =>
    MOCK_STAGES.find((s) => s.id === stageId)?.name || "Unknown";

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filters.projectName) {
      result = result.filter((t) =>
        getProjectName(t.projectId).toLowerCase().includes(filters.projectName.toLowerCase())
      );
    }
    if (filters.stageName) {
      result = result.filter((t) =>
        getStageName(t.stageId).toLowerCase().includes(filters.stageName.toLowerCase())
      );
    }
    if (filters.taskName) {
      result = result.filter((t) => t.name.toLowerCase().includes(filters.taskName.toLowerCase()));
    }
    if (filters.startDate) {
      result = result.filter((t) => t.startDate >= filters.startDate);
    }
    if (filters.endDate) {
      result = result.filter((t) => t.dueDate <= filters.endDate);
    }

    return result;
  }, [tasks, filters]);

  return (
    <div className="space-y-6 relative pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
          <p className="text-slate-600 mt-1 text-sm">Manage and track all project tasks</p>
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
            New Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showFilters ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-600 mb-1">Project Name</label>
              <input
                type="text"
                name="projectName"
                placeholder="Search project..."
                value={filters.projectName}
                onChange={handleFilterChange}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-600 mb-1">Stage Name</label>
              <input
                type="text"
                name="stageName"
                placeholder="Search stage..."
                value={filters.stageName}
                onChange={handleFilterChange}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-600 mb-1">Task Name</label>
              <input
                type="text"
                name="taskName"
                placeholder="Search task..."
                value={filters.taskName}
                onChange={handleFilterChange}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-600 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-600 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
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
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {[
                  "Task Name",
                  "Project Name",
                  "Stage Name",
                  "Assigned To",
                  "Dates",
                  "Status",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filteredTasks.map((task, idx) => {
                const statusColor = getStatusColor(task.status);
                const StatusIcon = statusColor.icon;
                return (
                  <tr
                    key={task.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                    }`}
                  >
                    <td className="px-6 py-3 text-sm font-semibold text-slate-900">
                      {task.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-600">{getProjectName(task.projectId)}</td>
                    <td className="px-6 py-3 text-sm text-slate-600">{getStageName(task.stageId)}</td>

                    {/* Assigned */}
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => openPeopleModal(task)}
                        className="p-2 rounded-full hover:bg-slate-100 transition"
                      >
                        <Users className="w-5 h-5 text-blue-600" />
                      </button>
                    </td>

                    {/* Dates */}
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => openDateModal(task)}
                        className="p-2 rounded-full hover:bg-slate-100 transition"
                      >
                        <Calendar className="w-5 h-5 text-slate-700" />
                      </button>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}
                      >
                        {StatusIcon && <StatusIcon className="w-3 h-3" />}
                        {getStatusLabel(task.status)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-3 flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(task)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Delete task: ${task.name}`)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assigned Members Modal */}
      {isPeopleModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
            <button onClick={closePeopleModal} className="absolute top-3 right-3 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Assigned Members</h2>

            <div className="space-y-3">
              {selectedTask?.assignedToList?.length ? (
                selectedTask.assignedToList.map((person: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200"
                  >
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-slate-700">{person.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">{person.role}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">No members assigned.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Task Dates Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-6 relative text-sm text-slate-700">
            <button onClick={closeDateModal} className="absolute top-3 right-3 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Task Dates</h2>

            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Start Date:</span>
                <span>{selectedTask?.startDate || "Not Set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">End Date:</span>
                <span>{selectedTask?.dueDate || "Not Set"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} task={editingTask} />
    </div>
  );
}
