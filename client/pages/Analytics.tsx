import { useState } from "react";
import { User } from "@shared/api";
import { MOCK_PROJECTS, MOCK_USERS } from "@/utils/mockData";
import {
  TrendingUp,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";

interface AnalyticsProps {
  currentUser: User | null;
}

export default function Analytics({ currentUser }: AnalyticsProps) {
  const [selectedMonth, setSelectedMonth] = useState("2025-01");

  const projects = MOCK_PROJECTS;

  // Calculate KPIs
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed",
  ).length;
  const pendingApprovals = projects.filter(
    (p) => p.approvalsStatus === "pending",
  ).length;

  const thisMonthDelta = {
    total: 2,
    active: 1,
    completed: 1,
    pending: 2,
  };

  // Calculate team workload
  const teamWorkload = MOCK_USERS.filter((u) => u.role === "team").map(
    (user) => {
      const assignedProjects = projects.filter((p) => p.manager === user.name);
      const totalHours = assignedProjects.reduce(
        (sum, p) => sum + p.estimation,
        0,
      );
      const totalBudget = assignedProjects.reduce(
        (sum, p) => sum + (p.budget || 0),
        0,
      );
      const completedCount = assignedProjects.filter(
        (p) => p.status === "completed",
      ).length;
      const capacity = Math.round((totalHours / 160) * 100); // Assuming 160 hours per month capacity

      return {
        name: user.name,
        projects: assignedProjects.length,
        hours: totalHours,
        budget: totalBudget,
        completed: completedCount,
        capacity: Math.min(capacity, 100),
      };
    },
  );

  // Monthly data
  const monthlyData = [
    { month: "September", started: 1, completed: 0 },
    { month: "October", started: 2, completed: 1 },
    { month: "November", started: 2, completed: 0 },
    { month: "December", started: 0, completed: 1 },
  ];

  // Top performers
  const topPerformers = [...teamWorkload].sort(
    (a, b) => b.completed - a.completed,
  );

  // Bottlenecks
  const bottlenecks = projects
    .filter((p) => p.progress < 50 && p.status === "active")
    .map((p) => ({
      project: p.name,
      stage: p.stage,
      progress: p.progress,
      manager: p.manager,
    }));

  // Export function
  const handleExportCSV = () => {
    const headers = [
      "Project Name",
      "Team",
      "Manager",
      "Status",
      "Stage",
      "Progress",
      "Budget",
    ];
    const rows = projects.map((p) => [
      p.name,
      p.teamName,
      p.manager,
      p.status,
      p.stage,
      p.progress,
      p.budget,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `projects-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Analytics & Insights
          </h1>
          <p className="text-slate-600 mt-1">
            Monitor project performance and team metrics
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Month Selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700">
          Select Month:
        </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase">
                Total Projects
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {totalProjects}
              </p>
              <p className="text-xs text-green-600 mt-1">
                +{thisMonthDelta.total} this month
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase">
                Active
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {activeProjects}
              </p>
              <p className="text-xs text-green-600 mt-1">
                +{thisMonthDelta.active} this month
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase">
                Completed
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {completedProjects}
              </p>
              <p className="text-xs text-green-600 mt-1">
                +{thisMonthDelta.completed} this month
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase">
                Pending Approvals
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {pendingApprovals}
              </p>
              <p className="text-xs text-orange-600 mt-1">
                {thisMonthDelta.pending} awaiting review
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Monthly Project Activity
          </h3>
          <div className="space-y-4">
            {monthlyData.map((item) => (
              <div key={item.month}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-700">
                    {item.month}
                  </p>
                  <span className="text-xs text-slate-600">
                    Started: {item.started} | Completed: {item.completed}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 flex gap-1">
                    {Array(item.started)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-blue-500 rounded flex-1"
                          title="Project started"
                        />
                      ))}
                  </div>
                  <div className="flex-1 flex gap-1">
                    {Array(item.completed)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-green-500 rounded flex-1"
                          title="Project completed"
                        />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Capacity */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Team Capacity Utilization
          </h3>
          <div className="space-y-4">
            {teamWorkload.map((team) => (
              <div key={team.name}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-700">
                    {team.name}
                  </p>
                  <span
                    className={`text-xs font-semibold ${
                      team.capacity >= 80 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {team.capacity}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      team.capacity >= 80
                        ? "bg-red-500"
                        : team.capacity >= 60
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${team.capacity}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {team.hours} hours allocated
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Top Performers
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Manager
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Projects
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Completed
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Total Hours
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">
                  Budget Managed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {topPerformers.map((performer) => (
                <tr key={performer.name} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {performer.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {performer.projects}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                      {performer.completed}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {performer.hours}h
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    ${performer.budget}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottlenecks */}
      {bottlenecks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-3">
                Projects at Risk
              </h3>
              <div className="space-y-2">
                {bottlenecks.map((project, idx) => (
                  <div key={idx} className="text-sm text-red-800">
                    <p className="font-medium">
                      {project.project} - {project.progress}% complete
                    </p>
                    <p className="text-red-700">
                      Stage: {project.stage} | Manager: {project.manager}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Overview */}
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Budget Allocation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-blue-600">
              ${projects.reduce((sum, p) => sum + (p.budget || 0), 0)}
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Budget Utilized</p>
            <p className="text-2xl font-bold text-green-600">
              $
              {Math.round(
                projects
                  .filter((p) => p.status !== "completed")
                  .reduce((sum, p) => sum + (p.budget || 0) * 0.6, 0),
              )}
            </p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Budget Remaining</p>
            <p className="text-2xl font-bold text-yellow-600">
              $
              {Math.round(
                projects.reduce((sum, p) => sum + (p.budget || 0), 0) -
                  projects
                    .filter((p) => p.status !== "completed")
                    .reduce((sum, p) => sum + (p.budget || 0) * 0.6, 0),
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
