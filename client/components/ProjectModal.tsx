import React, { useState, useEffect } from "react";
import {
  X,
  FileText,
  Workflow,
  CalendarDays,
  CreditCard,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";
import { MOCK_USERS } from "@/utils/mockData";

const CURRENCIES = [
  { code: "INR", symbol: "₹" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
];

const BILLING_TYPES = ["Fixed Cost", "Time & Material", "Non-Billable"];
const PRESALES_MODE = ["Lead", "NDA", "Proposal"];
const PROJECT_MODE = [
  "Full Cycle",
  "Assessment Only",
  "POC Only",
  "Direct Project",
  "Assessment + Project",
  "POC + Project",
];
const PRIORITIES = ["High", "Medium", "Low"];
const STATUS = [
  "Not Started",
  "In Progress",
  "Completed",
  "On Hold",
  "Closed",
];
const DEPARTMENTS = ["IT", "Design", "Marketing", "Sales", "Operations"];
const PROJECT_TYPES = ["Project", "Resource"];
const SAMPLE_PROPOSALS = [
  "TechStartup Web Redesign",
  "RetailCo Mobile App",
  "DesignStudio Branding Package",
  "LogisticsPro Supply Chain Portal",
  "FinTech Digital Platform",
];

export default function ProjectModal({ isOpen, onClose, project }: any) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const projectManagers = MOCK_USERS.filter(
    (u) => u.role === "team" || u.role === "admin"
  );

  const [formData, setFormData] = useState({
    name: "",
    clientName: "",
    manager: "",
    preSalesMode: "Lead",
    projectMode: "Full Cycle",
    projectType: "Project",
    projectDesc: "",
    priority: "High",
    department: "IT",
    status: "In Progress",
    startDate: "",
    endDate: "",
    estimatedHours: "",
    estimatedCost: "",
    billingType: "Fixed Cost",
    currency: "INR",
    proposal: "",
  });

  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((p) => Math.min(p + 1, totalSteps));
  const handlePrev = () => setStep((p) => Math.max(p - 1, 1));
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("✅ Project Created:", formData);
    onClose();
  };

  if (!isOpen) return null;

  const STEP_ICONS = [
    { icon: FileText, label: "Details" },
    { icon: Workflow, label: "Workflow" },
    { icon: CalendarDays, label: "Timeline" },
    { icon: CreditCard, label: "Billing" },
    { icon: ClipboardCheck, label: "Review" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-auto">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {project ? "Edit Project" : "Create New Project"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-8 py-5 flex items-center justify-between bg-slate-50">
          {STEP_ICONS.map((s, i) => {
            const Icon = s.icon;
            const index = i + 1;
            return (
              <div key={i} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                    index === step
                      ? "bg-blue-600 text-white scale-105"
                      : index < step
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-3 rounded-full ${
                      index < step ? "bg-green-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto transition-all duration-500 ease-in-out">
          {/* Step 1 - Project Details */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Project Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="name"
                  label="Project Name *"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Fabric Data Migration"
                />
                <InputField
                  name="clientName"
                  label="Client Name *"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="e.g., TechStartup"
                />
                <SelectField
                  name="manager"
                  label="Project Manager"
                  value={formData.manager}
                  onChange={handleChange}
                  options={projectManagers.map((m) => m.name)}
                />
                <InputField
                  name="projectDesc"
                  label="Project Description"
                  value={formData.projectDesc}
                  onChange={handleChange}
                  placeholder="Enter project details..."
                />
              </div>
            </div>
          )}

          {/* Step 2 - Workflow & Setup */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Workflow & Setup
              </h3>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  name="preSalesMode"
                  label="Pre-Sales Mode"
                  value={formData.preSalesMode}
                  onChange={handleChange}
                  options={PRESALES_MODE}
                />
                <SelectField
                  name="projectMode"
                  label="Project Mode"
                  value={formData.projectMode}
                  onChange={handleChange}
                  options={PROJECT_MODE}
                />
                <SelectField
                  name="projectType"
                  label="Project Type"
                  value={formData.projectType}
                  onChange={handleChange}
                  options={PROJECT_TYPES}
                />
                <SelectField
                  name="priority"
                  label="Priority"
                  value={formData.priority}
                  onChange={handleChange}
                  options={PRIORITIES}
                />
                <SelectField
                  name="department"
                  label="Department"
                  value={formData.department}
                  onChange={handleChange}
                  options={DEPARTMENTS}
                />
                <SelectField
                  name="status"
                  label="Status"
                  value={formData.status}
                  onChange={handleChange}
                  options={STATUS}
                />
              </div>
            </div>
          )}

          {/* Step 3 - Timeline & Estimation */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Timeline & Estimation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  type="date"
                  name="startDate"
                  label="Start Date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <InputField
                  type="date"
                  name="endDate"
                  label="End Date"
                  value={formData.endDate}
                  onChange={handleChange}
                />
                <InputField
                  type="number"
                  name="estimatedHours"
                  label="Estimated Hours"
                  value={formData.estimatedHours}
                  onChange={handleChange}
                />
                <InputField
                  type="number"
                  name="estimatedCost"
                  label="Estimated Cost"
                  value={formData.estimatedCost}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Step 4 - Billing & Proposal */}
          {step === 4 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Billing & Proposal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  name="billingType"
                  label="Billing Type"
                  value={formData.billingType}
                  onChange={handleChange}
                  options={BILLING_TYPES}
                />
                <SelectField
                  name="currency"
                  label="Currency"
                  value={formData.currency}
                  onChange={handleChange}
                  options={CURRENCIES.map((c) => c.code)}
                />
                <InputField
                  name="proposal"
                  label="Proposal Name"
                  value={formData.proposal}
                  onChange={handleChange}
                  list="proposal-list"
                  placeholder="e.g., Fabric Cloud Migration"
                />
                <datalist id="proposal-list">
                  {SAMPLE_PROPOSALS.map((p) => (
                    <option key={p} value={p} />
                  ))}
                </datalist>
              </div>
            </div>
          )}

          {/* Step 5 - Review Summary */}
          {step === 5 && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-slate-800">
                Review Project Summary
              </h3>
              <p className="text-slate-600 text-sm mb-3">
                Please confirm all details before creating the project.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 border border-slate-200 rounded-lg p-5 max-h-[40vh] overflow-y-auto">
                {Object.entries(formData).map(([key, val]) => (
                  <p key={key}>
                    <strong className="capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </strong>{" "}
                    {val || "—"}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex justify-between pt-6 border-t border-slate-200">
            {step > 1 ? (
              <button
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
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                {project ? "Update Project" : "Create Project"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🧩 Fields */
const InputField = ({ label, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm hover:border-slate-400"
    />
  </div>
);

const SelectField = ({ label, options, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        {...props}
        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none shadow-sm hover:border-slate-400 transition"
      >
        <option value="">Select...</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
    </div>
  </div>
);
