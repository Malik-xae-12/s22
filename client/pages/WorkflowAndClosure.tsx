import React, { useState } from "react";
import { User } from "@shared/api";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  FileUp,
} from "lucide-react";
import { MOCK_WORKFLOW_ITEMS } from "@/utils/mockData";
import ApprovalModal from "@/components/ApprovalModal";

interface WorkflowAndClosureProps {
  currentUser: User | null;
}

export default function WorkflowAndClosure({
  currentUser,
}: WorkflowAndClosureProps) {
  const [workflowItems] = useState(MOCK_WORKFLOW_ITEMS);
  const [selectedItem, setSelectedItem] = useState<
    (typeof MOCK_WORKFLOW_ITEMS)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case "rejected":
        return <XCircle className="w-6 h-6 text-red-600" />;
      case "awaiting":
        return <Clock className="w-6 h-6 text-yellow-600" />;
      case "rework":
        return <MessageSquare className="w-6 h-6 text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      approved: "bg-green-50 border-green-200",
      rejected: "bg-red-50 border-red-200",
      awaiting: "bg-yellow-50 border-yellow-200",
      rework: "bg-orange-50 border-orange-200",
    };
    return colors[status] || "bg-gray-50 border-gray-200";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      approved: "Approved",
      rejected: "Rejected",
      awaiting: "Awaiting Approval",
      rework: "Rework Required",
    };
    return labels[status] || status;
  };

  const getEntityTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      project: "bg-blue-100 text-blue-700",
      stage: "bg-purple-100 text-purple-700",
      task: "bg-indigo-100 text-indigo-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const handleApprovalAction = (item: (typeof MOCK_WORKFLOW_ITEMS)[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Workflow & Closure
        </h1>
        <p className="text-slate-600 mt-1">
          Monitor and manage project approvals and closure workflows
        </p>
      </div>

      {/* Timeline Section */}
      <div className="space-y-4">
        {workflowItems.map((item, index) => (
          <div
            key={item.id}
            className={`relative border-2 rounded-lg p-6 transition-all ${getStatusColor(item.approvalStatus)}`}
          >
            {/* Timeline Line */}
            {index < workflowItems.length - 1 && (
              <div className="absolute left-8 top-full w-1 h-6 bg-slate-300" />
            )}

            <div className="flex gap-4">
              {/* Status Icon */}
              <div className="flex-shrink-0 pt-1">
                {getStatusIcon(item.approvalStatus)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getEntityTypeBadge(item.entityType)}`}
                      >
                        {item.entityType.charAt(0).toUpperCase() +
                          item.entityType.slice(1)}
                      </span>
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                        {getStatusLabel(item.approvalStatus)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {item.entityName}
                    </h3>
                    {item.approvedBy && (
                      <p className="text-sm text-slate-600 mt-1">
                        Approved by{" "}
                        <span className="font-semibold">{item.approvedBy}</span>
                        {item.approvalDate && (
                          <span> on {item.approvalDate}</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* Remarks */}
                <div className="bg-white/50 p-3 rounded-lg mb-4 border border-slate-200/50">
                  <p className="text-sm text-slate-700">{item.remarks}</p>
                </div>

                {/* Attachments */}
                {item.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <FileUp className="w-4 h-4" />
                      Attachments
                    </h4>
                    <div className="space-y-2">
                      {item.attachments.map((att) => (
                        <a
                          key={att.id}
                          href={att.url}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <FileUp className="w-4 h-4" />
                          {att.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {item.approvalStatus === "awaiting" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprovalAction(item)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApprovalAction(item)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprovalAction(item)}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                    >
                      Request Rework
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Approval Modal */}
      <ApprovalModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </div>
  );
}
