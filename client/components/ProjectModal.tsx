import React, { useState, useEffect } from "react";
import { X, Edit2, Trash2 } from "lucide-react";
import { MOCK_USERS } from "@/utils/mockData";

export default function ProjectModal({ isOpen, onClose, project }: any) {
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: project?.name || "",
    clientName: project?.clientName || "",
    manager: project?.manager || "",
    presalesMode: project?.presalesMode || "",
    projectMode: project?.projectMode || "",
    projectType: project?.projectType || "",
    description: project?.description || "",
    priority: project?.priority || "",
    department: project?.department || "",
    startDate: project?.startDate || "",
    endDate: project?.endDate || "",
    estimatedHours: project?.estimatedHours || "",
    estimatedCost: project?.estimatedCost || "",
    billingType: project?.billingType || "",
    currency: project?.currency || "USD",
    nda: project?.nda || "Pending",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        clientName: project.clientName || "",
        manager: project.manager || "",
        presalesMode: project.presalesMode || "",
        projectMode: project.projectMode || "",
        projectType: project.projectType || "",
        description: project.description || "",
        priority: project.priority || "",
        department: project.department || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        estimatedHours: project.estimatedHours || "",
        estimatedCost: project.estimatedCost || "",
        billingType: project.billingType || "",
        currency: project.currency || "USD",
        nda: project.nda || "Pending",
      });
      setIsEditMode(false);
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Project updated:", formData);
    setIsEditMode(false);
    onClose();
  };

  const fieldGroups = [
    {
      title: "Basic Information",
      fields: [
        { label: "Project Name", key: "name", type: "text" },
        { label: "Client Name", key: "clientName", type: "text" },
        { label: "Manager Name", key: "manager", type: "text" },
        { label: "Department", key: "department", type: "text" },
      ],
    },
    {
      title: "Project Configuration",
      fields: [
        { label: "PreSales Mode", key: "presalesMode", type: "text" },
        { label: "Project Mode", key: "projectMode", type: "text" },
        { label: "Project Type", key: "projectType", type: "text" },
        { label: "Priority", key: "priority", type: "text" },
      ],
    },
    {
      title: "Timeline",
      fields: [
        { label: "Start Date", key: "startDate", type: "date" },
        { label: "End Date", key: "endDate", type: "date" },
      ],
    },
    {
      title: "Budget & Billing",
      fields: [
        { label: "Estimated Hours", key: "estimatedHours", type: "number" },
        { label: "Estimated Cost", key: "estimatedCost", type: "number" },
        { label: "Billing Type", key: "billingType", type: "text" },
        { label: "Currency", key: "currency", type: "text" },
      ],
    },
    {
      title: "Legal",
      fields: [{ label: "NDA Required", key: "nda", type: "text" }],
    },
    {
      title: "Description",
      fields: [
        { label: "Project Description", key: "description", type: "textarea" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {project ? "Project Details" : "New Project"}
          </h2>
          <div className="flex items-center gap-2">
            {project && (
              <>
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-all"
                  title="Edit project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {fieldGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      {field.label}
                    </label>
                    {isEditMode ? (
                      field.type === "textarea" ? (
                        <textarea
                          name={field.key}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.key}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      )
                    ) : (
                      <div className="px-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium">
                        {formData[field.key as keyof typeof formData] || "—"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {isEditMode && (
          <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3 bg-slate-50">
            <button
              onClick={() => setIsEditMode(false)}
              className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 font-medium text-slate-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
            >
              Save Changes
            </button>
          </div>
        )}

        {!isEditMode && (
          <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3 bg-slate-50">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 font-medium text-slate-700 transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
