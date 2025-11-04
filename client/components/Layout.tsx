import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "@shared/api";
import {
  LayoutDashboard,
  FolderOpen,
  Plus,
  Zap,
  BarChart3,
  Settings,
  FileText,
  Search,
  Calendar,
  MessageSquare,
  Users,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { isAdmin } from "@/utils/auth";

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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard, admin: false },
    { label: "Projects", href: "/projects", icon: FolderOpen, admin: false },
    { label: "Add Project", href: "/add-project", icon: Plus, admin: false },
    { label: "Workflow", href: "/workflow", icon: Zap, admin: false },
    { label: "Analytics", href: "/analytics", icon: BarChart3, admin: true },
    { label: "Documents", href: "/documents", icon: FileText, admin: false },
    { label: "Search", href: "/search", icon: Search, admin: false },
    { label: "Calendar", href: "/calendar", icon: Calendar, admin: false },
    { label: "Chat", href: "/chat", icon: MessageSquare, admin: false },
    {
      label: "Client View",
      href: "/client-summary",
      icon: Users,
      admin: false,
    },
    { label: "Audit Log", href: "/audit", icon: FileText, admin: true },
    { label: "Settings", href: "/settings", icon: Settings, admin: false },
  ];

  const visibleItems = navItems.filter(
    (item) => !item.admin || isAdmin(currentUser),
  );

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

          {/* User Switcher for Demo */}
          <div className="space-y-1 mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase px-2">
              Demo Mode
            </p>
            <button
              onClick={() => onUserChange?.("admin")}
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                currentUser?.role === "admin"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700/50 text-slate-300"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => onUserChange?.("team")}
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                currentUser?.role === "team"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700/50 text-slate-300"
              }`}
            >
              Team Member
            </button>
            <button
              onClick={() => onUserChange?.("client")}
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                currentUser?.role === "client"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700/50 text-slate-300"
              }`}
            >
              Client
            </button>
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
          <div className="text-sm text-slate-600">{currentUser?.company}</div>
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
