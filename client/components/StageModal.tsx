import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { MOCK_PROJECTS } from "@/utils/mockData";

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage?: any;
}

export default function StageModal({ isOpen, onClose, stage }: StageModalProps) {
  const [formData, setFormData] = useState({
    name: stage?.name || "",
    projectId: stage?.projectId || "",
    owner: stage?.owner || "",
    type: stage?.type || "planning",
    startDate: stage?.startDate || "",
    endDate: stage?.endDate || "",
    remarks: stage?.remarks || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New stage:", formData);
    setFormData({
      name: "",
      projectId: "",
      owner: "",
      type: "planning",
      startDate: "",
      endDate: "",
      remarks: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        {/* Gradient Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {stage ? "Edit Stage" : "Create New Stage"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {stage ? "Update stage details" : "Add a new project stage"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Row 1: Stage Name & Project */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Stage Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all"
                placeholder="e.g., Requirements & Planning"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Project
              </label>
              <div className="relative">
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all appearance-none"
                  required
                >
                  <option value="">Select a project</option>
                  {MOCK_PROJECTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Owner & Stage Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Stage Owner
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all"
                placeholder="Owner name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Stage Type
              </label>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all appearance-none"
                  required
                >
                  <option value="planning">Planning</option>
                  <option value="execution">Execution</option>
                  <option value="testing">Testing</option>
                  <option value="delivery">Delivery</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 3: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all"
                required
              />
            </div>
          </div>

          {/* Row 4: Remarks */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Remarks
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all"
              placeholder="Stage remarks and notes"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              {stage ? "Update Stage" : "Create Stage"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
