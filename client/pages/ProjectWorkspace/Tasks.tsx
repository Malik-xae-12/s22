import React, { useState } from "react";
import { User } from "@shared/api";
import { Plus, MoreHorizontal, MessageSquare, Paperclip, ChevronDown } from "lucide-react";
import { MOCK_TASKS, MOCK_STAGES } from "@/utils/mockData";
import TaskModal from "@/components/TaskModal";

interface TasksProps {
  currentUser: User | null;
}

export default function Tasks({ currentUser }: TasksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [tasks] = useState(MOCK_TASKS);

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-slate-50 text-slate-700",
      medium: "bg-blue-50 text-blue-700",
      high: "bg-orange-50 text-orange-700",
      critical: "bg-red-50 text-red-700",
    };
    return colors[priority] || "bg-gray-50 text-gray-700";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-slate-50 text-slate-700",
      in_progress: "bg-yellow-50 text-yellow-700",
      review: "bg-purple-50 text-purple-700",
      completed: "bg-green-50 text-green-700",
    };
    return colors[status] || "bg-gray-50 text-gray-700";
  };

  const getStageName = (stageId: string) => {
    return MOCK_STAGES.find((s) => s.id === stageId)?.name || "Unknown Stage";
  };

  const priorityLabels: Record<string, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    in_progress: "In Progress",
    review: "Under Review",
    completed: "Completed",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
          <p className="text-slate-600 mt-1">Manage and track all project tasks</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left font-semibold text-slate-900 w-8"></th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Task Name</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Stage</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Assigned To</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Priority</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Due Date</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Hours</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {tasks.map((task) => (
                <React.Fragment key={task.id}>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                        className="p-1 hover:bg-slate-100 rounded transition-colors"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${expandedTaskId === task.id ? "rotate-180" : ""}`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{task.name}</td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{getStageName(task.stageId)}</td>
                    <td className="px-6 py-4 text-slate-600">{task.assignedTo}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {priorityLabels[task.priority]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{task.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                        {statusLabels[task.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      <div className="flex flex-col">
                        <span className="font-semibold">{task.actualHours}/{task.estimatedHours}h</span>
                        <span className="text-slate-500">
                          {task.estimatedHours > 0
                            ? Math.round((task.actualHours / task.estimatedHours) * 100)
                            : 0}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-600" />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row Details */}
                  {expandedTaskId === task.id && (
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <td colSpan={9} className="px-6 py-4">
                        <div className="space-y-4">
                          {/* Comments Section */}
                          <div>
                            <h4 className="font-semibold text-slate-900 text-sm mb-2 flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Comments & Updates
                            </h4>
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                              <p className="text-sm text-slate-700">{task.comments}</p>
                              <input
                                type="text"
                                placeholder="Add a comment..."
                                className="mt-3 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          {/* Attachments Section */}
                          {task.attachments.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-slate-900 text-sm mb-2 flex items-center gap-2">
                                <Paperclip className="w-4 h-4" />
                                Attachments
                              </h4>
                              <div className="space-y-2">
                                {task.attachments.map((att) => (
                                  <a
                                    key={att.id}
                                    href={att.url}
                                    className="flex items-center gap-2 p-2 text-sm text-blue-600 hover:text-blue-700 bg-white rounded-lg border border-slate-200 hover:border-blue-300"
                                  >
                                    <Paperclip className="w-4 h-4" />
                                    {att.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Task Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg border border-slate-200">
                            <div>
                              <p className="text-xs text-slate-600 font-medium">Start Date</p>
                              <p className="text-sm font-semibold text-slate-900 mt-1">{task.startDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 font-medium">Due Date</p>
                              <p className="text-sm font-semibold text-slate-900 mt-1">{task.dueDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 font-medium">Estimated Hours</p>
                              <p className="text-sm font-semibold text-slate-900 mt-1">{task.estimatedHours}h</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 font-medium">Actual Hours</p>
                              <p className="text-sm font-semibold text-slate-900 mt-1">{task.actualHours}h</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
