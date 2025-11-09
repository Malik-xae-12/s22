import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { MOCK_PROJECTS, MOCK_STAGES } from "@/utils/mockData";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: any;
}

export default function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: task?.name || "",
    stageId: task?.stageId || "",
    projectId: task?.projectId || "",
    assignedTo: task?.assignedTo || "",
    priority: task?.priority || "medium",
    startDate: task?.startDate || "",
    dueDate: task?.dueDate || "",
    estimatedHours: task?.estimatedHours || "",
  });

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  // Reset form data when editing or new task
  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || "",
        stageId: task.stageId || "",
        projectId: task.projectId || "",
        assignedTo: task.assignedTo || "",
        priority: task.priority || "medium",
        startDate: task.startDate || "",
        dueDate: task.dueDate || "",
        estimatedHours: task.estimatedHours || "",
      });
    } else {
      setFormData({
        name: "",
        stageId: "",
        projectId: "",
        assignedTo: "",
        priority: "medium",
        startDate: "",
        dueDate: "",
        estimatedHours: "",
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("✅ New Task Created:", formData);
    setStep(1);
    onClose();
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <button onClick={handleClose} className="p-2 rounded hover:bg-slate-100">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 flex items-center justify-between">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-medium text-sm ${
                  s === step
                    ? "bg-blue-600 text-white"
                    : s < step
                    ? "bg-green-500 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-2 rounded-full ${
                    s < step ? "bg-green-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-8">
          {step === 1 && (
            <div>
              <h3 className="text-slate-800 font-semibold mb-4">Task Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Task Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />

                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                  required
                >
                  <option value="">Select Project</option>
                  {MOCK_PROJECTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <select
                  name="stageId"
                  value={formData.stageId}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                  required
                >
                  <option value="">Select Stage</option>
                  {MOCK_STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="assignedTo"
                  placeholder="Assigned To"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-slate-800 font-semibold mb-4">Priority & Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>

                <input
                  type="number"
                  name="estimatedHours"
                  placeholder="Estimated Hours"
                  value={formData.estimatedHours}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                />

                <div>
                  <label className="text-sm text-slate-600 mb-1 block">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-600 mb-1 block">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <h3 className="text-slate-800 font-semibold mb-4">Review Task Details</h3>
              <p className="text-slate-600 text-sm mb-4">
                Please verify all information before creating the task.
              </p>
              <div className="border border-slate-200 rounded-lg p-4 text-left text-sm space-y-2">
                <p><strong>Task:</strong> {formData.name}</p>
                <p><strong>Project:</strong> {formData.projectId}</p>
                <p><strong>Stage:</strong> {formData.stageId}</p>
                <p><strong>Assigned To:</strong> {formData.assignedTo}</p>
                <p><strong>Priority:</strong> {formData.priority}</p>
                <p><strong>Start:</strong> {formData.startDate}</p>
                <p><strong>Due:</strong> {formData.dueDate}</p>
                <p><strong>Est. Hours:</strong> {formData.estimatedHours}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-slate-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-2 rounded-lg text-slate-600 border border-slate-300 hover:bg-slate-100 transition"
              >
                ← Previous
              </button>
            ) : (
              <div />
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Create Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
