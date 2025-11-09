import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/ProjectWorkspace/Projects";
import Stages from "@/pages/ProjectWorkspace/Stages";
import Tasks from "@/pages/ProjectWorkspace/Tasks";
import WorkflowAndClosure from "@/pages/WorkflowAndClosure";
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
        <Route
          path="/dashboard"
          element={<Dashboard currentUser={currentUser} />}
        />
        <Route
          path="/workspace/projects"
          element={<Projects currentUser={currentUser} />}
        />
        <Route
          path="/workspace/stages"
          element={<Stages currentUser={currentUser} />}
        />
        <Route
          path="/workspace/tasks"
          element={<Tasks currentUser={currentUser} />}
        />
        <Route
          path="/workflow"
          element={<WorkflowAndClosure currentUser={currentUser} />}
        />
        <Route path="/" element={<Dashboard currentUser={currentUser} />} />
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
