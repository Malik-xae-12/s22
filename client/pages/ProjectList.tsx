import { useState } from "react";
import { Search, Plus, X, Calendar, DollarSign, Clock, User, Mail, FileText, TrendingUp, CheckCircle, AlertCircle, Building } from "lucide-react";

export default function ProfessionalProjectUI() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    manager: "",
    startDate: "",
    endDate: "",
    estimatedHours: "",
    estimatedCost: "",
    billingType: "fixed",
    currency: "USD",
    proposalId: ""
  });

  const projects = [
    { id: 1, name: "TechStartup Web Platform", client: "TechStartup", manager: "Sarah Chen", startDate: "2025-01-15", endDate: "2025-02-12", progress: 65, status: "active" },
    { id: 2, name: "RetailCo Platform Redesign", client: "RetailCo", manager: "Michael Torres", startDate: "2025-01-10", endDate: "2025-03-07", progress: 30, status: "active" },
    { id: 3, name: "Design Studio Branding", client: "DesignStudio", manager: "Sarah Chen", startDate: "2025-01-22", endDate: "2025-02-05", progress: 10, status: "active" },
    { id: 4, name: "LogisticsPro Supply Chain", client: "LogisticsPro", manager: "Michael Torres", startDate: "2025-01-05", endDate: "2025-03-16", progress: 85, status: "active" },
    { id: 5, name: "FinTech Mobile Banking", client: "FinTech Solutions", manager: "Sarah Chen", startDate: "2024-12-01", endDate: "2025-01-15", progress: 100, status: "completed" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Creating project:", formData);
    setIsModalOpen(false);
  };

  const stats = [
    { label: "Total Projects", value: "5", icon: FileText, color: "blue", bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Active Projects", value: "4", icon: TrendingUp, color: "green", bgColor: "bg-green-50", iconColor: "text-green-600" },
    { label: "Completed Projects", value: "1", icon: CheckCircle, color: "purple", bgColor: "bg-purple-50", iconColor: "text-purple-600" },
    { label: "Pending Approvals", value: "2", icon: AlertCircle, color: "amber", bgColor: "bg-amber-50", iconColor: "text-amber-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Projects
              </h1>
              <p className="text-slate-600 text-lg">
                Manage and track all projects in your portfolio
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              New Project
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200/60"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, clients, or managers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Manager</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{project.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{project.client}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{project.manager}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{project.startDate}</td>
                    <td className="px-6 py-4 text-slate-700">{project.endDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              project.progress === 100 ? "bg-green-500" : "bg-blue-500"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 min-w-[3rem]">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Create New Project</h2>
                    <p className="text-blue-100 mt-1">Add a new project to your portfolio</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        placeholder="e.g., E-commerce Platform Redesign"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        placeholder="e.g., RetailCo"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Project Manager *
                      </label>
                      <select
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      >
                        <option value="">Select Manager</option>
                        <option value="Sarah Chen">Sarah Chen</option>
                        <option value="Michael Torres">Michael Torres</option>
                        <option value="Emily Johnson">Emily Johnson</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Timeline
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Budget & Estimation */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Budget & Estimation
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Estimated Hours
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="number"
                          name="estimatedHours"
                          value={formData.estimatedHours}
                          onChange={handleChange}
                          placeholder="120"
                          className="w-full pl-11 pr-14 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">hrs</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Estimated Cost
                      </label>
                      <div className="relative">
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleChange}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-slate-600 text-sm focus:outline-none"
                        >
                          <option value="USD">$</option>
                          <option value="EUR">€</option>
                          <option value="GBP">£</option>
                        </select>
                        <input
                          type="number"
                          name="estimatedCost"
                          value={formData.estimatedCost}
                          onChange={handleChange}
                          placeholder="15000"
                          className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Billing Type
                      </label>
                      <select
                        name="billingType"
                        value={formData.billingType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      >
                        <option value="fixed">Fixed Cost</option>
                        <option value="hourly">Hourly Rate</option>
                        <option value="milestone">Milestone Based</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Proposal ID
                      </label>
                      <input
                        type="text"
                        name="proposalId"
                        value={formData.proposalId}
                        onChange={handleChange}
                        placeholder="PROP-2025-001"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}