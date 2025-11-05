import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Project } from "@shared/api";
import { MOCK_PROJECTS } from "@/utils/mockData";
import { ArrowLeft, Plus, Check } from "lucide-react";

interface AddProjectProps {
  currentUser: User | null;
  onProjectAdd?: (project: Project) => void;
}

export default function AddProject({
  currentUser,
  onProjectAdd,
}: AddProjectProps) {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    clientEmail: "",
    manager: currentUser?.name || "",
    name: "",
    description: "",
    stage: "prospecting" as const,
    status: "active" as const,
    estimation: "",
    budget: "",
    timeline: "",
    startDate: "",
    endDate: "",
    sponsor: "",
    qpmSummary: "",
    comments: "",
    nda: "Pending",
    meetingNotes: "",
    approvalsStatus: "pending" as const,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.teamName || !formData.clientEmail || !formData.name) {
      alert("Please fill in all required fields");
      return;
    }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      teamName: formData.teamName,
      clientEmail: formData.clientEmail,
      manager: formData.manager,
      name: formData.name,
      description: formData.description,
      stage: formData.stage,
      status: formData.status,
      estimation: parseInt(formData.estimation) || 0,
      budget: parseInt(formData.budget) || 0,
      timeline: formData.timeline,
      startDate: formData.startDate,
      endDate: formData.endDate,
      sponsor: formData.sponsor,
      qpmSummary: formData.qpmSummary,
      comments: formData.comments,
      nda: formData.nda,
      meetingNotes: formData.meetingNotes,
      approvalsStatus: formData.approvalsStatus,
      assignedTeam: [],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      progress: 0,
    };

    onProjectAdd?.(newProject);
    setSubmitted(true);
    setTimeout(() => {
      navigate("/projects");
    }, 1500);
  };

  const sampleProjects = MOCK_PROJECTS.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>
        <h1 className="text-3xl font-bold text-slate-900">
          Create New Project
        </h1>
        <p className="text-slate-600 mt-1">
          Add a new project with all required details and timeline information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white rounded-lg p-12 border border-slate-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Project Created!
              </h2>
              <p className="text-slate-600">
                Your project has been successfully created. Redirecting to
                projects list...
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 space-y-6"
            >
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., E-commerce Platform Redesign"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleChange}
                      placeholder="e.g., RetailCo"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description of the project"
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Client & Manager */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Client & Manager
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Client Email *
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      placeholder="client@company.com"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Project Manager
                    </label>
                    <input
                      type="text"
                      name="manager"
                      value={formData.manager}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Project Sponsor
                    </label>
                    <input
                      type="text"
                      name="sponsor"
                      value={formData.sponsor}
                      onChange={handleChange}
                      placeholder="e.g., John Doe"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline & Budget */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Timeline & Budget
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Estimation (hours)
                    </label>
                    <input
                      type="number"
                      name="estimation"
                      value={formData.estimation}
                      onChange={handleChange}
                      placeholder="40"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Budget ($)
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="15000"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Timeline Description
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder="e.g., 4 weeks"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Project Status */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Project Status
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Stage
                    </label>
                    <select
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="prospecting">Prospecting</option>
                      <option value="planning">Planning</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="signed_off">Signed Off</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="on_hold">On Hold</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      NDA Status
                    </label>
                    <select
                      name="nda"
                      value={formData.nda}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Signed">Signed</option>
                      <option value="Pending">Pending</option>
                      <option value="Not Required">Not Required</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      QPM Summary
                    </label>
                    <textarea
                      name="qpmSummary"
                      value={formData.qpmSummary}
                      onChange={handleChange}
                      placeholder="Quick Project Management summary"
                      rows={2}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Comments
                    </label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      placeholder="Any additional comments or notes"
                      rows={2}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Meeting Notes
                    </label>
                    <textarea
                      name="meetingNotes"
                      value={formData.meetingNotes}
                      onChange={handleChange}
                      placeholder="Notes from initial client meeting"
                      rows={2}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Project
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/projects")}
                  className="flex-1 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sample Projects Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 sticky top-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Sample Projects
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Reference examples of well-structured projects
            </p>

            <div className="space-y-4">
              {sampleProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      teamName: project.teamName,
                      clientEmail: project.clientEmail,
                      name: project.name,
                      description: project.description,
                      manager: project.manager,
                      estimation: project.estimation.toString(),
                      budget: project.budget?.toString() || "",
                      timeline: project.timeline,
                      startDate: project.startDate,
                      endDate: project.endDate,
                      sponsor: project.sponsor,
                      qpmSummary: project.qpmSummary,
                      comments: project.comments,
                      nda: project.nda,
                      meetingNotes: project.meetingNotes,
                    });
                  }}
                >
                  <p className="font-semibold text-slate-900 text-sm">
                    {project.teamName}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {project.clientEmail}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {project.estimation}h
                    </span>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      ${project.budget}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Click to fill form
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-blue-900 mb-2">
                💡 Pro Tip
              </p>
              <p className="text-xs text-blue-800">
                Click on any sample project to quickly populate the form with
                realistic data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
