import { User } from "@shared/api";
import { isAdmin, isTeamMember } from "@/utils/auth";
import { MOCK_PROJECTS } from "@/utils/mockData";
import { TrendingUp, Users, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface IndexProps {
  currentUser: User | null;
}

export default function Index({ currentUser }: IndexProps) {
  const projects = MOCK_PROJECTS;
  const activeProjects = projects.filter((p) => p.status === "active");
  const completedProjects = projects.filter((p) => p.status === "completed");
  const pendingApprovals = projects.filter((p) => p.approvalsStatus === "pending");

  const getRelevantProjects = () => {
    if (isAdmin(currentUser)) {
      return projects;
    } else if (isTeamMember(currentUser)) {
      return projects.filter((p) => p.manager === currentUser?.name);
    } else {
      return projects.filter((p) => p.clientEmail === currentUser?.email);
    }
  };

  const relevantProjects = getRelevantProjects();

  const stats = [
    {
      label: "Total Projects",
      value: relevantProjects.length,
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50",
      trend: "+2 this month",
    },
    {
      label: "Active Projects",
      value: relevantProjects.filter((p) => p.status === "active").length,
      icon: Clock,
      color: "text-yellow-600 bg-yellow-50",
      trend: isTeamMember(currentUser) ? "Your active projects" : "In progress",
    },
    {
      label: "Completed",
      value: relevantProjects.filter((p) => p.status === "completed").length,
      icon: CheckCircle,
      color: "text-green-600 bg-green-50",
      trend: "Successfully delivered",
    },
    {
      label: "Pending Approval",
      value: relevantProjects.filter((p) => p.approvalsStatus === "pending").length,
      icon: AlertCircle,
      color: "text-orange-600 bg-orange-50",
      trend: "Awaiting review",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
        <p className="text-blue-100 text-lg">
          {isAdmin(currentUser)
            ? "Monitor all projects and team performance"
            : isTeamMember(currentUser)
              ? "Manage your projects and track progress"
              : "Track your project status and approvals"}
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            to="/projects"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            View Projects
          </Link>
          {(isAdmin(currentUser) || isTeamMember(currentUser)) && (
            <Link
              to="/add-project"
              className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Create Project
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-slate-500">{stat.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Recent Projects</h2>
          <Link to="/projects" className="text-blue-600 hover:text-blue-700 font-medium">
            View All
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Team Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Manager</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Stage</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Estimation</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {relevantProjects.slice(0, 5).map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">{project.teamName}</td>
                    <td className="px-6 py-4 text-slate-600">{project.manager}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {project.stage.replace(/_/g, " ").toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === "active"
                            ? "bg-green-50 text-green-700"
                            : project.status === "completed"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{project.estimation}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(isAdmin(currentUser) || isTeamMember(currentUser)) && (
            <Link
              to="/add-project"
              className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <p className="font-semibold text-slate-900">Create New Project</p>
              <p className="text-sm text-slate-600 mt-1">Add a new project to track</p>
            </Link>
          )}
          <Link
            to="/workflow"
            className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <p className="font-semibold text-slate-900">Workflow Updates</p>
            <p className="text-sm text-slate-600 mt-1">View project progress</p>
          </Link>
          <Link
            to="/documents"
            className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <p className="font-semibold text-slate-900">Documents</p>
            <p className="text-sm text-slate-600 mt-1">Access project files</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
