import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import ProjectList from "@/pages/ProjectList";
import ProjectDetail from "@/pages/ProjectDetail";
import AddProject from "@/pages/AddProject";
import Analytics from "@/pages/Analytics";
import Documents from "@/pages/Documents";
import AuditLog from "@/pages/AuditLog";
import Calendar from "@/pages/Calendar";
import Chat from "@/pages/Chat";
import ClientSummary from "@/pages/ClientSummary";
import Settings from "@/pages/Settings";
import Workflow from "@/pages/Workflow";
import Placeholder from "@/pages/Placeholder";
import NotFound from "@/pages/NotFound";
import { User, UserRole } from "@shared/api";
import { getCurrentUser, setCurrentUser, switchUser } from "@/utils/auth";

const queryClient = new QueryClient();

function AppContent() {
  const [currentUser, setLocalUser] = useState<User | null>(() =>
    getCurrentUser(),
  );

  const handleUserChange = (role: UserRole) => {
    const user = switchUser(role);
    setLocalUser(user);
  };

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);

  return (
    <Layout currentUser={currentUser} onUserChange={handleUserChange}>
      <Routes>
        <Route path="/" element={<Index currentUser={currentUser} />} />
        <Route
          path="/projects"
          element={<ProjectList currentUser={currentUser} />}
        />
        <Route
          path="/projects/:id"
          element={<ProjectDetail currentUser={currentUser} />}
        />
        <Route
          path="/add-project"
          element={<AddProject currentUser={currentUser} />}
        />
        <Route
          path="/workflow"
          element={<Workflow currentUser={currentUser} />}
        />
        <Route
          path="/analytics"
          element={<Analytics currentUser={currentUser} />}
        />
        <Route
          path="/documents"
          element={<Documents currentUser={currentUser} />}
        />
        <Route
          path="/search"
          element={<Placeholder title="Advanced Search" />}
        />
        <Route
          path="/calendar"
          element={<Calendar currentUser={currentUser} />}
        />
        <Route path="/chat" element={<Chat currentUser={currentUser} />} />
        <Route
          path="/client-summary"
          element={<ClientSummary currentUser={currentUser} />}
        />
        <Route path="/audit" element={<AuditLog currentUser={currentUser} />} />
        <Route
          path="/settings"
          element={<Settings currentUser={currentUser} />}
        />
        <Route
          path="/test"
          element={<Placeholder title="Test Environment" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
