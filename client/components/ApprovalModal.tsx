import React, { useState } from "react";
import { X, Upload } from "lucide-react";

interface WorkflowItem {
  id: string;
  entityType: "project" | "stage" | "task";
  entityId: string;
  entityName: string;
  approvalStatus: "awaiting" | "approved" | "rejected" | "rework";
  approvedBy?: string;
  approvalDate?: string;
  remarks: string;
  attachments: Array<{ id: string; name: string; url: string }>;
}

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: WorkflowItem | null;
}

export default function ApprovalModal({ isOpen, onClose, item }: ApprovalModalProps) {
  const [action, setAction] = useState<"approve" | "reject" | "rework" | null>(null);
  const [formData, setFormData] = useState({
    remarks: "",
    attachments: [] as File[],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(e.target.files || [])],
      }));
    }
  };

  const handleRemarksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      remarks: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Approval action:", { action, ...formData, item });
    setAction(null);
    setFormData({ remarks: "", attachments: [] });
    onClose();
  };

  const handleActionClick = (act: "approve" | "reject" | "rework") => {
    setAction(act);
  };

  if (!isOpen || !item) return null;

  const isActionSelected = action !== null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isActionSelected ? `${action.charAt(0).toUpperCase() + action.slice(1)} Item` : "Approval Action"}
            </h2>
            <p className="text-sm text-slate-600 mt-1">{item.entityName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {!isActionSelected ? (
            <>
              {/* Item Details */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Entity Type</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {item.entityType.charAt(0).toUpperCase() + item.entityType.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium">Current Status</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {item.approvalStatus.charAt(0).toUpperCase() + item.approvalStatus.slice(1).replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Selection */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-900">Select Action</p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleActionClick("approve")}
                    className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-colors text-center"
                  >
                    <p className="text-lg font-bold text-green-700">✓</p>
                    <p className="text-sm font-semibold text-green-700">Approve</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActionClick("reject")}
                    className="p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors text-center"
                  >
                    <p className="text-lg font-bold text-red-700">✕</p>
                    <p className="text-sm font-semibold text-red-700">Reject</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleActionClick("rework")}
                    className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 hover:border-orange-400 transition-colors text-center"
                  >
                    <p className="text-lg font-bold text-orange-700">↻</p>
                    <p className="text-sm font-semibold text-orange-700">Rework</p>
                  </button>
                </div>
              </div>

              {/* Current Item Remarks */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm font-semibold text-slate-900 mb-2">Item Remarks</p>
                <p className="text-sm text-slate-700">{item.remarks}</p>
              </div>
            </>
          ) : (
            <>
              {/* Action Confirmation Header */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Performing action on:</p>
                <p className="text-sm font-semibold text-slate-900">{item.entityName}</p>
              </div>

              {/* Remarks Input */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Add Remarks / Comments
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={handleRemarksChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${action === "approve" ? "Approval comments..." : action === "reject" ? "Rejection reason..." : "Rework requirements..."}`}
                  rows={4}
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Upload Supporting Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-sm font-medium">Click to upload files</span>
                  </label>
                  {formData.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                          <span className="text-sm text-slate-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                attachments: prev.attachments.filter((_, i) => i !== idx),
                              }));
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Info Message */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  {action === "approve"
                    ? "This will approve the item and notify all stakeholders."
                    : action === "reject"
                      ? "This will reject the item. Please provide clear reasons."
                      : "This will request rework. Please specify what needs to be changed."}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAction(null)}
                  className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors font-medium ${
                    action === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : action === "reject"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  {action === "approve"
                    ? "Approve"
                    : action === "reject"
                      ? "Reject"
                      : "Request Rework"}
                </button>
              </div>
            </>
          )}

          {/* Cancel Button (when not in action selection) */}
          {!isActionSelected && (
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
