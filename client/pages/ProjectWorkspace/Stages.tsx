import React, { useState } from "react";
import { User } from "@shared/api";
import { Plus, MoreHorizontal } from "lucide-react";
import { MOCK_STAGES, MOCK_PROJECTS } from "@/utils/mockData";
import StageModal from "@/components/StageModal";

interface StagesProps {
  currentUser: User | null;
}

export default function Stages({ currentUser }: StagesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stages] = useState(MOCK_STAGES);

  const getStageTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      planning: "bg-purple-50 text-purple-700",
      execution: "bg-blue-50 text-blue-700",
      testing: "bg-yellow-50 text-yellow-700",
      delivery: "bg-green-50 text-green-700",
    };
    return colors[type] || "bg-gray-50 text-gray-700";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      not_started: "bg-gray-50 text-gray-700",
      in_progress: "bg-yellow-50 text-yellow-700",
      completed: "bg-green-50 text-green-700",
    };
    return colors[status] || "bg-gray-50 text-gray-700";
  };

  const getProjectName = (projectId: string) => {
    return MOCK_PROJECTS.find((p) => p.id === projectId)?.name || "Unknown Project";
  };

  const stageTypeLabels: Record<string, string> = {
    planning: "Planning",
    execution: "Execution",
    testing: "Testing",
    delivery: "Delivery",
  };

  const statusLabels: Record<string, string> = {
    not_started: "Not Started",
    in_progress: "In Progress",
    completed: "Completed",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Project Stages</h1>
          <p className="text-slate-600 mt-1">Manage and monitor project execution stages</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          New Stage
        </button>
      </div>

      {/* Stages Grid with Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Stage Header */}
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{stage.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Project: <span className="font-medium">{getProjectName(stage.projectId)}</span>
                  </p>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="flex gap-2 mt-4">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStageTypeColor(stage.type)}`}>
                  {stageTypeLabels[stage.type]}
                </span>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(stage.status)}`}>
                  {statusLabels[stage.status]}
                </span>
              </div>
            </div>

            {/* Stage Details */}
            <div className="p-6 space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-600">Progress</p>
                  <span className="text-sm font-semibold text-slate-900">{stage.completion}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${stage.completion}%` }}
                  />
                </div>
              </div>

              {/* Stage Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600 font-medium">Stage Owner</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{stage.owner}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-medium">Timeline</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {stage.startDate} to {stage.endDate}
                  </p>
                </div>
              </div>

              {/* Approval Info */}
              {stage.approvedBy && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-700 font-medium">Approved by {stage.approvedBy}</p>
                  <p className="text-xs text-green-600">{stage.approvalDate}</p>
                </div>
              )}

              {/* Remarks */}
              <div>
                <p className="text-xs text-slate-600 font-medium mb-2">Remarks</p>
                <p className="text-sm text-slate-700">{stage.remarks}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stage Modal */}
      <StageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
