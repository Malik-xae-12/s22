import React, { useState, useEffect } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { MOCK_PROJECTS } from "@/utils/mockData";

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage?: any;
}

const STAGE_TYPES = [
  { value: "planning", label: "Planning" },
  { value: "execution", label: "Execution" },
  { value: "testing", label: "Testing" },
  { value: "delivery", label: "Delivery" },
];

export default function StageModal({ isOpen, onClose, stage }: StageModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: stage?.name || "",
    projectId: stage?.projectId || "",
    startDate: stage?.startDate || "",
    endDate: stage?.endDate || "",
    remarks: stage?.remarks || "",
    type: stage?.type || "planning",
  });

  // Reset step whenever modal opens
  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  // Reset form data when editing/creating
  useEffect(() => {
    if (stage) {
      setFormData({
        name: stage.name || "",
        projectId: stage.projectId || "",
        startDate: stage.startDate || "",
        endDate: stage.endDate || "",
        remarks: stage.remarks || "",
        type: stage.type || "planning",
      });
    } else {
      setFormData({
        name: "",
        projectId: "",
        startDate: "",
        endDate: "",
        remarks: "",
        type: "planning",
      });
    }
  }, [stage, isOpen]);

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
    e.stopPropagation();
    console.log("✅ Stage Created:", formData);
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
            {stage ? "Edit Stage" : "Create New Stage"}
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

        {/* Form Steps */}
        <div className="p-6 space-y-8">
          {/* Step 1: Stage Details */}
          {step === 1 && (
            <div>
              <h3 className="text-slate-800 font-semibold mb-4">Stage Details</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stage Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    placeholder="e.g., Requirements & Planning"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stage Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  >
                    {STAGE_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Project *
                  </label>
                  <div className="relative">
                    <select
                      name="projectId"
                      value={formData.projectId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none"
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
            </div>
          )}

          {/* Step 2: Timeline & Notes */}
          {step === 2 && (
            <div>
              <h3 className="text-slate-800 font-semibold mb-4">Timeline & Notes</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    placeholder="Stage remarks and notes"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="text-center py-4">
              <h3 className="text-slate-800 font-semibold mb-4">
                Review Stage Details
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Please verify the entered information before creating the stage.
              </p>
              <div className="border border-slate-200 rounded-lg p-4 text-left text-sm space-y-2 bg-slate-50">
                <p>
                  <strong>Stage Name:</strong> {formData.name || "—"}
                </p>
                <p>
                  <strong>Stage Type:</strong>{" "}
                  {
                    STAGE_TYPES.find((t) => t.value === formData.type)?.label ||
                    "—"
                  }
                </p>
                <p>
                  <strong>Project:</strong> {formData.projectId || "—"}
                </p>
                <p>
                  <strong>Start Date:</strong> {formData.startDate || "—"}
                </p>
                <p>
                  <strong>End Date:</strong> {formData.endDate || "—"}
                </p>
                <p>
                  <strong>Remarks:</strong>{" "}
                  {formData.remarks ? formData.remarks : "—"}
                </p>
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
                {stage ? "Update Stage" : "Create Stage"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
