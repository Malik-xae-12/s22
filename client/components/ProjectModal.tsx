import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { MOCK_USERS } from "@/utils/mockData";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
}

const CURRENCIES = [
  { code: "INR", symbol: "₹", flag: "🇮🇳" },
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
];

const BILLING_TYPES = ["Fixed Cost", "Time & Material", "Non-Billable"];

const SAMPLE_PROPOSALS = [
  "TS-2025-001",
  "RC-2025-002",
  "DS-2025-003",
  "LP-2025-004",
  "FT-2025-005",
];

const SAMPLE_CLIENTS = [
  "TechStartup",
  "RetailCo",
  "Design Studio",
  "LogisticsPro",
  "FinTech Solutions",
];

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
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

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Project data:", formData);
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
    onClose();
  };

  if (!isOpen) return null;

  const currentCurrency = CURRENCIES.find((c) => c.code === formData.currency);
  const projectManagers = MOCK_USERS.filter(
    (u) => u.role === "team" || u.role === "admin",
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        {/* Gradient Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {project ? "Edit Project" : "Create New Project"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {project
                ? "Update project details"
                : "Add a new project to your portfolio"}
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
          {/* Row 1: Project Name & Client */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 peer"
                placeholder=" "
                required
              />
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium ${
                  focusedField === "name" || formData.name
                    ? "top-2 text-xs text-blue-600 bg-white px-1 -translate-y-2"
                    : "top-3.5 text-slate-600"
                }`}
              >
                Project Name
              </label>
            </div>

            {/* Client Name */}
            <div className="relative">
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                onFocus={() => setFocusedField("clientName")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 peer"
                placeholder=" "
                list="client-list"
                required
              />
              <datalist id="client-list">
                {SAMPLE_CLIENTS.map((client) => (
                  <option key={client} value={client} />
                ))}
              </datalist>
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium ${
                  focusedField === "clientName" || formData.clientName
                    ? "top-2 text-xs text-blue-600 bg-white px-1 -translate-y-2"
                    : "top-3.5 text-slate-600"
                }`}
              >
                Client Name
              </label>
            </div>
          </div>

          {/* Row 2: Manager & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project Manager */}
            <div className="relative md:col-span-1">
              <select
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                onFocus={() => setFocusedField("manager")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 appearance-none peer"
                required
              >
                <option value="">Select Manager</option>
                {projectManagers.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium ${
                  focusedField === "manager" || formData.manager
                    ? "top-2 text-xs text-blue-600 bg-white px-1 -translate-y-2"
                    : "top-3.5 text-slate-600"
                }`}
              >
                Project Manager
              </label>
              <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Start Date */}
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                onFocus={() => setFocusedField("startDate")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300"
                required
              />
              <label className="absolute left-4 top-2 text-xs text-blue-600 bg-white px-1 font-medium">
                Start Date
              </label>
            </div>

            {/* End Date */}
            <div className="relative">
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                onFocus={() => setFocusedField("endDate")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300"
                required
              />
              <label className="absolute left-4 top-2 text-xs text-blue-600 bg-white px-1 font-medium">
                End Date
              </label>
            </div>
          </div>

          {/* Row 3: Hours & Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estimated Hours */}
            <div className="relative">
              <input
                type="number"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={handleChange}
                onFocus={() => setFocusedField("estimatedHours")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 peer"
                placeholder=" "
                required
              />
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium ${
                  focusedField === "estimatedHours" || formData.estimatedHours
                    ? "top-2 text-xs text-blue-600 bg-white px-1 -translate-y-2"
                    : "top-3.5 text-slate-600"
                }`}
              >
                Estimated Hours
              </label>
              <span className="absolute right-4 top-3.5 text-slate-500 font-medium">
                hrs
              </span>
            </div>

            {/* Estimated Cost with Currency */}
            <div className="relative">
              <input
                type="number"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleChange}
                onFocus={() => setFocusedField("estimatedCost")}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 peer"
                placeholder=" "
                required
              />
              <label
                className={`absolute left-12 transition-all duration-300 pointer-events-none font-medium ${
                  focusedField === "estimatedCost" || formData.estimatedCost
                    ? "top-2 text-xs text-blue-600 bg-white px-1 -translate-y-2"
                    : "top-3.5 text-slate-600"
                }`}
              >
                Estimated Cost
              </label>
              <span className="absolute left-4 top-3.5 text-xl font-bold text-slate-700">
                {currentCurrency?.symbol}
              </span>
            </div>
          </div>

          {/* Row 4: Billing Type, Currency & Proposal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Billing Type */}
            <div className="relative">
              <select
                name="billingType"
                value={formData.billingType}
                onChange={handleChange}
                onFocus={() => setFocusedField("billingType")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 appearance-none peer"
              >
                {BILLING_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label className="absolute left-4 top-2 text-xs text-blue-600 bg-white px-1 font-medium">
                Billing Type
              </label>
              <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Currency */}
            <div className="relative">
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                onFocus={() => setFocusedField("currency")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 appearance-none peer"
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.flag} {curr.code}
                  </option>
                ))}
              </select>
              <label className="absolute left-4 top-2 text-xs text-blue-600 bg-white px-1 font-medium">
                Currency
              </label>
              <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Proposal */}
            <div className="relative">
              <input
                type="text"
                name="proposal"
                value={formData.proposal}
                onChange={handleChange}
                onFocus={() => setFocusedField("proposal")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 peer"
                placeholder=" "
                list="proposal-list"
              />
              <datalist id="proposal-list">
                {SAMPLE_PROPOSALS.map((prop) => (
                  <option key={prop} value={prop} />
                ))}
              </datalist>
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium ${
                  focusedField === "proposal" || formData.proposal
                    ? "top-2 text-xs text-blue-600 bg-white px-1 -translate-y-2"
                    : "top-3.5 text-slate-600"
                }`}
              >
                Proposal ID
              </label>
            </div>
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
              {project ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
