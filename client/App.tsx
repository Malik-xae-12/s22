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
          element={<Placeholder title="Project Detail" />}
        />
        <Route
          path="/add-project"
          element={<Placeholder title="Add Project" />}
        />
        <Route
          path="/workflow"
          element={<Placeholder title="Workflow Tracker" />}
        />
        <Route
          path="/analytics"
          element={<Placeholder title="Analytics Dashboard" />}
        />
        <Route
          path="/documents"
          element={<Placeholder title="Document Repository" />}
        />
        <Route
          path="/search"
          element={<Placeholder title="Advanced Search" />}
        />
        <Route
          path="/calendar"
          element={<Placeholder title="Calendar & Milestones" />}
        />
        <Route
          path="/chat"
          element={<Placeholder title="Team Communication" />}
        />
        <Route
          path="/client-summary"
          element={<Placeholder title="Client Summary" />}
        />
        <Route path="/audit" element={<Placeholder title="Audit Log" />} />
        <Route path="/settings" element={<Placeholder title="Settings" />} />
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
