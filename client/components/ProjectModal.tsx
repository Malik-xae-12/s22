import React, { useState, useEffect } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { MOCK_USERS } from "@/utils/mockData";

const CURRENCIES = [
  { code: "INR", symbol: "₹" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
];
const BILLING_TYPES = ["Fixed Cost", "Time & Material", "Non-Billable"];
const SAMPLE_CLIENTS = ["TechStartup", "RetailCo", "Design Studio", "LogisticsPro", "FinTech Solutions"];
const SAMPLE_PROPOSALS = ["TS-2025-001", "RC-2025-002", "DS-2025-003", "LP-2025-004", "FT-2025-005"];

export default function ProjectModal({ isOpen, onClose, project }: any) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const projectManagers = MOCK_USERS.filter((u) => u.role === "team" || u.role === "admin");

  const [formData, setFormData] = useState({
    name: project?.name || "",
    clientName: project?.teamName || "",
    manager: project?.manager || "",
    startDate: project?.startDate || "",
    endDate: project?.endDate || "",
    estimatedHours: project?.estimatedHours || "",
    estimatedCost: project?.estimatedCost || "",
    billingType: project?.billingType || "Fixed Cost",
    currency: project?.currency || "INR",
    proposal: project?.proposal || "",
  });

  // Reset step to 1 whenever modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  // Reset form data when project prop changes
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        clientName: project.teamName || "",
        manager: project.manager || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        estimatedHours: project.estimatedHours || "",
        estimatedCost: project.estimatedCost || "",
        billingType: project.billingType || "Fixed Cost",
        currency: project.currency || "INR",
        proposal: project.proposal || "",
      });
    } else {
      // Reset to empty form for new project
      setFormData({
        name: "",
        clientName: "",
        manager: "",
        startDate: "",
        endDate: "",
        estimatedHours: "",
        estimatedCost: "",
        billingType: "Fixed Cost",
        currency: "INR",
        proposal: "",
      });
    }
  }, [project, isOpen]);

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
    console.log("✅ Project Created:", formData);
    setStep(1); // Reset step after submission
    onClose();
  };

  const handleClose = () => {
    setStep(1); // Reset step when closing
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {project ? "Edit Project" : "Create New Project"}
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
              <h3 className="text-slate-800 font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Project Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                  type="text"
                  name="clientName"
                  placeholder="Client Name"
                  value={formData.clientName}
                  list="client-list"
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                />
                <datalist id="client-list">
                  {SAMPLE_CLIENTS.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
                <select
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option value="">Select Manager</option>
                  {projectManagers.map((u) => (
                    <option key={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-slate-800 font-semibold mb-4">Timeline & Estimation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="number"
                  name="estimatedHours"
                  placeholder="Estimated Hours"
                  value={formData.estimatedHours}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                  type="number"
                  name="estimatedCost"
                  placeholder="Estimated Cost"
                  value={formData.estimatedCost}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-slate-800 font-semibold mb-4">Billing & Proposal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <select
                  name="billingType"
                  value={formData.billingType}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                >
                  {BILLING_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code}>{c.code}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="proposal"
                  placeholder="Proposal ID"
                  value={formData.proposal}
                  list="proposal-list"
                  onChange={handleChange}
                  className="border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
                />
                <datalist id="proposal-list">
                  {SAMPLE_PROPOSALS.map((p) => (
                    <option key={p} value={p} />
                  ))}
                </datalist>
              </div>
            </div>
          )}

          {/* Buttons */}
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
                Create Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}