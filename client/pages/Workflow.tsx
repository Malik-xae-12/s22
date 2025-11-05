import { useState } from "react";
import { User } from "@shared/api";
import { MOCK_PROJECTS, getStageLabel } from "@/utils/mockData";
import { Plus, GripVertical, CheckCircle, AlertCircle } from "lucide-react";

interface WorkflowProps {
  currentUser: User | null;
}

export default function Workflow({ currentUser }: WorkflowProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const projects = MOCK_PROJECTS;

  const stages = [
    "prospecting",
    "planning",
    "in_progress",
    "review",
    "signed_off",
  ];

  const getProjectsByStage = (stage: string) => {
    return projects.filter((p) => p.stage === stage);
  };

  const stageColors: Record<string, string> = {
    prospecting: "border-blue-200 bg-blue-50",
    planning: "border-purple-200 bg-purple-50",
    in_progress: "border-yellow-200 bg-yellow-50",
    review: "border-orange-200 bg-orange-50",
    signed_off: "border-green-200 bg-green-50",
  };

  const stageTextColors: Record<string, string> = {
    prospecting: "text-blue-700",
    planning: "text-purple-700",
    in_progress: "text-yellow-700",
    review: "text-orange-700",
    signed_off: "text-green-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Workflow Tracker
          </h1>
          <p className="text-slate-600 mt-1">
            Manage project stages and progress
          </p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-lg p-4 border border-slate-200 flex gap-4">
        <p className="text-sm font-medium text-slate-700">View:</p>
        <button className="px-4 py-1 bg-blue-600 text-white text-sm rounded font-medium">
          Kanban Board
        </button>
        <button className="px-4 py-1 border border-slate-300 text-slate-700 text-sm rounded font-medium hover:bg-slate-50">
          Timeline
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stages.map((stage) => {
          const stageProjects = getProjectsByStage(stage);
          return (
            <div
              key={stage}
              className="bg-slate-50 rounded-lg p-4 border border-slate-200 min-h-[600px] flex flex-col"
            >
              {/* Stage Header */}
              <div className="mb-4">
                <h3
                  className={`font-bold text-sm mb-1 ${stageTextColors[stage]}`}
                >
                  {getStageLabel(stage)}
                </h3>
                <p className="text-xs text-slate-600">
                  {stageProjects.length} projects
                </p>
              </div>

              {/* Cards */}
              <div className="flex-1 space-y-3 overflow-y-auto">
                {stageProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-3 rounded-lg border-2 cursor-move hover:shadow-md transition-shadow ${stageColors[stage]}`}
                    onClick={() =>
                      setExpandedId(
                        expandedId === project.id ? null : project.id,
                      )
                    }
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-50" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 text-sm leading-tight">
                          {project.teamName}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          {project.manager}
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-2 w-full bg-slate-300 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {project.progress}%
                        </p>

                        {/* Expanded Details */}
                        {expandedId === project.id && (
                          <div className="mt-3 pt-3 border-t border-slate-300 space-y-2 text-xs">
                            <div>
                              <p className="font-medium text-slate-900">
                                {project.name}
                              </p>
                              <p className="text-slate-600 mt-1">
                                {project.description}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <span className="px-2 py-1 bg-white rounded text-slate-600 font-medium">
                                {project.estimation}h
                              </span>
                              <span className="px-2 py-1 bg-white rounded text-slate-600 font-medium">
                                ${project.budget}
                              </span>
                            </div>
                            {project.approvalsStatus === "pending" && (
                              <div className="flex items-center gap-1 text-yellow-700 bg-yellow-50 p-2 rounded">
                                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                <span>Pending approval</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Card Button */}
                {stageProjects.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-slate-500">
                    <p className="text-xs">No projects</p>
                  </div>
                )}
              </div>

              {/* Add Button */}
              <button className="mt-4 w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:bg-white text-sm font-medium flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Workflow Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage) => {
            const count = getProjectsByStage(stage).length;
            const avgProgress =
              count > 0
                ? Math.round(
                    getProjectsByStage(stage).reduce(
                      (sum, p) => sum + p.progress,
                      0,
                    ) / count,
                  )
                : 0;

            return (
              <div
                key={stage}
                className="text-center p-4 bg-slate-50 rounded-lg"
              >
                <p
                  className={`font-medium text-sm mb-2 ${stageTextColors[stage]}`}
                >
                  {getStageLabel(stage)}
                </p>
                <p className="text-2xl font-bold text-slate-900 mb-1">
                  {count}
                </p>
                <p className="text-xs text-slate-600">
                  {count > 0 && `Avg: ${avgProgress}% complete`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workflow Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-slate-900 mb-2">
          💡 About Workflow Stages
        </h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>
            <strong>Prospecting:</strong> Initial client outreach and
            requirements gathering
          </li>
          <li>
            <strong>Planning:</strong> Scope definition, timeline creation, and
            resource allocation
          </li>
          <li>
            <strong>In Progress:</strong> Active development and implementation
            work
          </li>
          <li>
            <strong>Review:</strong> QA testing, client review, and feedback
            implementation
          </li>
          <li>
            <strong>Signed Off:</strong> Client approval and project completion
          </li>
        </ul>
      </div>
    </div>
  );
}
