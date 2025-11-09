import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Project } from "@shared/api";
import { MOCK_USERS } from "@/utils/mockData";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt" | "progress">,
  ) => void;
}

export default function AddProjectModal({
  isOpen,
  onClose,
  onSubmit,
}: AddProjectModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: "",
    clientName: "",
    clientEmail: "",
    manager: "",
    teamName: "",
    description: "",
    presalesMode: "",
    projectMode: "",
    projectType: "",
    priority: "Medium",
    department: "",
    startDate: "",
    endDate: "",
    estimation: 0,
    budget: 0,
    billingType: "",
    currency: "USD",
    nda: "Pending",
    stage: "prospecting" as const,
    status: "active" as const,
    sponsor: "",
    qpmSummary: "",
    timeline: "",
    meetingNotes: "",
    approvalsStatus: "pending" as const,
    comments: "",
    assignedTeam: [] as string[],
  });

  const managers = MOCK_USERS.filter((u) => u.role === "team");
  const teamMembers = MOCK_USERS.filter((u) => u.role === "team");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "estimation" || name === "budget") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTeamToggle = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      assignedTeam: prev.assignedTeam.includes(userId)
        ? prev.assignedTeam.filter((id) => id !== userId)
        : [...prev.assignedTeam, userId],
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: "",
      clientName: "",
      clientEmail: "",
      manager: "",
      teamName: "",
      description: "",
      presalesMode: "",
      projectMode: "",
      projectType: "",
      priority: "Medium",
      department: "",
      startDate: "",
      endDate: "",
      estimation: 0,
      budget: 0,
      billingType: "",
      currency: "USD",
      nda: "Pending",
      stage: "prospecting",
      status: "active",
      sponsor: "",
      qpmSummary: "",
      timeline: "",
      meetingNotes: "",
      approvalsStatus: "pending",
      comments: "",
      assignedTeam: [],
    });
    setStep(1);
    onClose();
  };

  const isStep1Valid = formData.name && formData.clientName && formData.manager;
  const isStep2Valid = formData.projectType && formData.priority;
  const isStep3Valid =
    formData.startDate && formData.endDate && formData.estimation > 0;
  const isStep4Valid = true;

  const stepTitles = [
    "Basic Information",
    "Project Configuration",
    "Timeline & Budget",
    "Review & Submit",
  ];

  const getStepValidity = (stepNum: number) => {
    switch (stepNum) {
      case 1:
        return isStep1Valid;
      case 2:
        return isStep2Valid;
      case 3:
        return isStep3Valid;
      case 4:
        return isStep4Valid;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header with Stepper */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Create New Project</h2>
              <p className="text-blue-100">{stepTitles[step - 1]}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    step === stepNum
                      ? "bg-white text-blue-600 shadow-lg scale-110"
                      : step > stepNum
                        ? "bg-blue-400 text-white"
                        : "bg-blue-700/50 text-blue-100"
                  }`}
                >
                  {step > stepNum ? <Check className="w-5 h-5" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                      step > stepNum ? "bg-blue-400" : "bg-blue-700/50"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-1 bg-blue-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., E-Commerce Platform"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="e.g., Acme Corp"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Client Email
                  </label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="client@example.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Manager *
                </label>
                <div className="relative">
                  <select
                    name="manager"
                    value={formData.manager}
                    onChange={handleInputChange}
                    className="w-full appearance-none px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  >
                    <option value="">Select Manager</option>
                    {managers.map((manager) => (
                      <option key={manager.id} value={manager.name}>
                        {manager.name}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  placeholder="e.g., Development Team"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the project goals and scope"
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Type *
                  </label>
                  <input
                    type="text"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    placeholder="e.g., Web Development"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Priority *
                  </label>
                  <div className="relative">
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full appearance-none px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    PreSales Mode
                  </label>
                  <input
                    type="text"
                    name="presalesMode"
                    value={formData.presalesMode}
                    onChange={handleInputChange}
                    placeholder="e.g., Discovery"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Mode
                  </label>
                  <input
                    type="text"
                    name="projectMode"
                    value={formData.projectMode}
                    onChange={handleInputChange}
                    placeholder="e.g., Fixed Price"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g., Engineering"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Billing Type
                  </label>
                  <input
                    type="text"
                    name="billingType"
                    value={formData.billingType}
                    onChange={handleInputChange}
                    placeholder="e.g., Monthly"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  NDA Status
                </label>
                <div className="relative">
                  <select
                    name="nda"
                    value={formData.nda}
                    onChange={handleInputChange}
                    className="w-full appearance-none px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Signed">Signed</option>
                    <option value="Not Required">Not Required</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estimated Hours *
                  </label>
                  <input
                    type="number"
                    name="estimation"
                    value={formData.estimation}
                    onChange={handleInputChange}
                    placeholder="e.g., 160"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Estimated Cost
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., 15000"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Currency
                </label>
                <div className="relative">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full appearance-none px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Timeline Summary
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="e.g., 4 weeks development cycle"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-slate-900">
                  Project Summary
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 text-xs font-medium uppercase">
                      Project Name
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {formData.name || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs font-medium uppercase">
                      Client
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {formData.clientName || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs font-medium uppercase">
                      Manager
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {formData.manager || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs font-medium uppercase">
                      Priority
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {formData.priority || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs font-medium uppercase">
                      Start Date
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {formData.startDate || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs font-medium uppercase">
                      End Date
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {formData.endDate || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs font-medium uppercase">
                      Est. Hours
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {formData.estimation || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs font-medium uppercase">
                      Est. Cost
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {formData.currency} {formData.budget || "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Assign Team Members
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-3">
                  {teamMembers.map((user) => (
                    <label
                      key={user.id}
                      className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={formData.assignedTeam.includes(user.id)}
                        onChange={() => handleTeamToggle(user.id)}
                        className="w-4 h-4 rounded border-slate-300 cursor-pointer"
                      />
                      <span className="text-sm text-slate-700">
                        {user.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  placeholder="Any additional notes or special requirements"
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-8 py-4 flex items-center justify-between bg-slate-50">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-sm text-slate-600 font-medium">
            Step {step} of {totalSteps}
          </div>

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!getStepValidity(step)}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-white font-medium text-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
              >
                Create Project
              </button>
            </div>
          )}
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
