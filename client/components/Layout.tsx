import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "@shared/api";
import {
  LayoutDashboard,
  FolderOpen,
  Zap,
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import GlobalSearch from "./GlobalSearch";

interface LayoutProps {
  children: React.ReactNode;
  currentUser: User | null;
  onUserChange?: (role: "admin" | "team" | "client") => void;
}

export default function Layout({
  children,
  currentUser,
  onUserChange,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [workspaceOpen, setWorkspaceOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "Project Workspace",
      icon: FolderOpen,
      submenu: [
        { label: "Projects", href: "/workspace/projects" },
        { label: "Stages", href: "/workspace/stages" },
        { label: "Tasks", href: "/workspace/tasks" },
      ],
    },
    { label: "Workflow & Closure", href: "/workflow", icon: Workflow },
  ];

  const isActiveRoute = (href: string) => location.pathname === href;
  const isWorkspaceActive = location.pathname.startsWith("/workspace");

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg">Sales2Signoff</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden hover:bg-slate-700 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-700 p-4">
          <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-lg bg-slate-700/30">
            <img
              src={
                currentUser?.avatar ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              }
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {currentUser?.name}
              </p>
              <p className="text-xs text-slate-300 truncate">
                {currentUser?.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700/50 transition-colors text-sm"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4" />
                Light
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                Dark
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-slate-900">
            Sales2Signoff
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600">{currentUser?.company}</div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100">
              <span className="text-xs font-semibold text-slate-600 uppercase">
                Role:
              </span>
              <span
                className={`text-sm font-medium capitalize ${
                  currentUser?.role === "admin"
                    ? "text-red-600"
                    : currentUser?.role === "team"
                      ? "text-blue-600"
                      : "text-green-600"
                }`}
              >
                {currentUser?.role === "admin"
                  ? "Administrator"
                  : currentUser?.role === "team"
                    ? "Manager"
                    : "Member"}
              </span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-slate-50">
          <main className="container mx-auto p-6">{children}</main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
