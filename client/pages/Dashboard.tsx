import React from "react";
import { User } from "@shared/api";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { MOCK_PROJECTS, MOCK_STAGES, MOCK_TASKS } from "@/utils/mockData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardProps {
  currentUser: User | null;
}

export default function Dashboard({ currentUser }: DashboardProps) {
  const projects = MOCK_PROJECTS;
  const stages = MOCK_STAGES;
  const tasks = MOCK_TASKS;

  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed",
  ).length;
  const pendingApprovals = projects.filter(
    (p) => p.approvalsStatus === "pending",
  ).length;

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50",
      trend: "+2 this month",
    },
    {
      label: "Active Projects",
      value: activeProjects,
      icon: Clock,
      color: "text-yellow-600 bg-yellow-50",
      trend: "In progress",
    },
    {
      label: "Completed Projects",
      value: completedProjects,
      icon: CheckCircle,
      color: "text-green-600 bg-green-50",
      trend: "Successfully delivered",
    },
    {
      label: "Pending Approvals",
      value: pendingApprovals,
      icon: AlertCircle,
      color: "text-orange-600 bg-orange-50",
      trend: "Awaiting review",
    },
  ];

  const projectProgressData = projects.map((p) => ({
    name: p.name.substring(0, 12),
    progress: p.progress,
  }));

  const stageStatusData = [
    {
      name: "Not Started",
      value: stages.filter((s) => s.status === "not_started").length,
    },
    {
      name: "In Progress",
      value: stages.filter((s) => s.status === "in_progress").length,
    },
    {
      name: "Completed",
      value: stages.filter((s) => s.status === "completed").length,
    },
  ];

  const taskStatusData = [
    {
      name: "Pending",
      value: tasks.filter((t) => t.status === "pending").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "in_progress").length,
    },
    {
      name: "Review",
      value: tasks.filter((t) => t.status === "review").length,
    },
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
    },
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {currentUser?.name}!
        </h1>
        <p className="text-blue-100 text-lg">
          Monitor all projects, stages, and tasks in your portfolio
        </p>
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
                  <p className="text-sm font-medium text-slate-600">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {stat.value}
                  </p>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Progress Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Project Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stage Status Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Stage Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stageStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stageStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Task Status Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Task Status Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {taskStatusData.map((item) => (
            <div
              key={item.name}
              className="text-center p-4 rounded-lg bg-slate-50"
            >
              <p className="text-2xl font-bold text-slate-900">{item.value}</p>
              <p className="text-sm text-slate-600">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              title: "Backend Development stage - In Progress",
              desc: "Michael Torres updated the stage progress to 60%",
              time: "2 hours ago",
            },
            {
              title: "Login & Registration UI task assigned",
              desc: "Task assigned to Sarah Chen for TechStartup project",
              time: "5 hours ago",
            },
            {
              title: "Design & Architecture stage created",
              desc: "New stage added to TechStartup Web Platform project",
              time: "1 day ago",
            },
          ].map((activity, idx) => (
            <div
              key={idx}
              className="border-b border-slate-200 pb-4 last:border-b-0"
            >
              <p className="font-medium text-slate-900">{activity.title}</p>
              <p className="text-sm text-slate-600">{activity.desc}</p>
              <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
