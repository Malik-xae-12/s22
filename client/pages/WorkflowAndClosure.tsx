import React, { useMemo, useState } from "react";
import { User } from "@shared/api";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  FileUp,
  FolderOpen,
  Briefcase,
  Search,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  Users,
  Paperclip,
} from "lucide-react";
import {
  MOCK_PROJECTS,
  MOCK_STAGES,
  MOCK_TASKS,
  MOCK_WORKFLOW_ITEMS,
  formatDate,
} from "@/utils/mockData";
import ApprovalModal from "@/components/ApprovalModal";
import { AnimatePresence, motion } from "framer-motion";

interface WorkflowAndClosureProps {
  currentUser: User | null;
}

type ApprovalState = "approved" | "awaiting" | "rejected" | "rework";

type TabKey = "stages" | "tasks";

const primaryGradient = "bg-gradient-to-r from-blue-600 to-indigo-600";

const statusStyles: Record<ApprovalState, { border: string; bg: string; text: string }> = {
  approved: { border: "border-green-300", bg: "bg-green-50", text: "text-green-700" },
  awaiting: { border: "border-yellow-300", bg: "bg-yellow-50", text: "text-yellow-700" },
  rejected: { border: "border-red-300", bg: "bg-red-50", text: "text-red-700" },
  rework: { border: "border-red-300", bg: "bg-red-50", text: "text-red-700" },
};

function approvalLabel(v: ApprovalState) {
  switch (v) {
    case "approved":
      return "Approved";
    case "awaiting":
      return "Awaiting Approval";
    case "rejected":
      return "Rejected";
    case "rework":
      return "Rework Required";
  }
}

function statusIcon(v: ApprovalState) {
  switch (v) {
    case "approved":
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    case "awaiting":
      return <Clock className="w-5 h-5 text-yellow-600" />;
    case "rejected":
      return <XCircle className="w-5 h-5 text-red-600" />;
    case "rework":
      return <MessageSquare className="w-5 h-5 text-red-600" />;
  }
}

function useApprovalLookup() {
  const byEntity = useMemo(() => {
    const map = new Map<string, { status: ApprovalState; approvedBy?: string; approvalDate?: string }>();
    for (const item of MOCK_WORKFLOW_ITEMS) {
      map.set(item.entityId, {
        status: item.approvalStatus as ApprovalState,
        approvedBy: item.approvedBy,
        approvalDate: item.approvalDate,
      });
    }
    return map;
  }, []);
  return byEntity;
}

function getDerivedStageApproval(stage: (typeof MOCK_STAGES)[0], lookup: ReturnType<typeof useApprovalLookup>): {
  state: ApprovalState;
  approvedBy?: string;
  approvalDate?: string;
} {
  const item = lookup.get(stage.id);
  if (item) return { state: item.status, approvedBy: item.approvedBy, approvalDate: item.approvalDate };
  if (stage.approvedBy) return { state: "approved", approvedBy: stage.approvedBy, approvalDate: stage.approvalDate };
  return { state: "awaiting" };
}

function getDerivedTaskApproval(task: (typeof MOCK_TASKS)[0], lookup: ReturnType<typeof useApprovalLookup>): {
  state: ApprovalState;
  approvedBy?: string;
  approvalDate?: string;
} {
  const item = lookup.get(task.id);
  if (item) return { state: item.status, approvedBy: item.approvedBy, approvalDate: item.approvalDate };
  if (task.status === "completed") return { state: "approved" };
  return { state: "awaiting" };
}

function isOverdue(dueDate: string, status: string) {
  const today = new Date();
  const due = new Date(dueDate + "T23:59:59");
  return due < today && status !== "completed";
}

export default function WorkflowAndClosure({ currentUser }: WorkflowAndClosureProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("stages");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "completed" | "awaiting">("all");
  const [selectedItem, setSelectedItem] = useState<import("@/utils/mockData").WorkflowItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const approvalLookup = useApprovalLookup();

  const projects = useMemo(() => {
    return MOCK_PROJECTS.filter((p) => {
      const matchesQuery = [p.name, p.manager, p.clientName].some((v) => v.toLowerCase().includes(query.toLowerCase()));
      if (!matchesQuery) return false;
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return p.status === "active";
      if (statusFilter === "completed") return p.status === "completed";
      if (statusFilter === "awaiting") {
        const hasAwaiting = MOCK_WORKFLOW_ITEMS.some(
          (it) => it.entityType === "project" && it.entityId === p.id && it.approvalStatus === "awaiting",
        );
        return hasAwaiting || p.approvalsStatus === "pending";
      }
      return true;
    });
  }, [query, statusFilter]);

  const currentProject = useMemo(() => MOCK_PROJECTS.find((p) => p.id === selectedProjectId) || null, [selectedProjectId]);

  const projectStages = useMemo(() =>
    currentProject ? MOCK_STAGES.filter((s) => s.projectId === currentProject.id).sort((a, b) => a.startDate.localeCompare(b.startDate)) : [],
  [currentProject]);

  const projectTasks = useMemo(() =>
    currentProject ? MOCK_TASKS.filter((t) => t.projectId === currentProject.id).sort((a, b) => a.dueDate.localeCompare(b.dueDate)) : [],
  [currentProject]);

  const buildItemFromStage = (stage: (typeof MOCK_STAGES)[0]): import("@/utils/mockData").WorkflowItem => {
    const d = getDerivedStageApproval(stage, approvalLookup);
    const wf = MOCK_WORKFLOW_ITEMS.find((it) => it.entityId === stage.id);
    return {
      id: `wf-modal-${stage.id}`,
      entityType: "stage",
      entityId: stage.id,
      entityName: stage.name,
      approvalStatus: d.state,
      approvedBy: d.approvedBy,
      approvalDate: d.approvalDate,
      remarks: stage.remarks,
      attachments: wf ? wf.attachments : [],
    };
  };

  const buildItemFromTask = (task: (typeof MOCK_TASKS)[0]): import("@/utils/mockData").WorkflowItem => {
    const d = getDerivedTaskApproval(task, approvalLookup);
    return {
      id: `wf-modal-${task.id}`,
      entityType: "task",
      entityId: task.id,
      entityName: task.name,
      approvalStatus: d.state,
      approvedBy: d.approvedBy,
      approvalDate: d.approvalDate,
      remarks: task.comments,
      attachments: task.attachments,
    };
  };

  const openApprovalForStage = (stage: (typeof MOCK_STAGES)[0]) => {
    setSelectedItem(buildItemFromStage(stage));
    setIsModalOpen(true);
  };

  const openApprovalForTask = (task: (typeof MOCK_TASKS)[0]) => {
    setSelectedItem(buildItemFromTask(task));
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Workflow &amp; Closure</h1>
        <p className="text-slate-600 mt-1">Monitor and manage project approvals and closure workflows</p>
      </div>

      <AnimatePresence mode="wait">
        {!currentProject ? (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, managers, clients..."
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="awaiting">Awaiting Approval</option>
                </select>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((p) => {
                const awaiting = MOCK_WORKFLOW_ITEMS.some(
                  (it) => it.entityType === "project" && it.entityId === p.id && it.approvalStatus === "awaiting",
                );
                return (
                  <div
                    key={p.id}
                    className="relative rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_25%_25%,#2563eb,transparent_35%),radial-gradient(circle_at_75%_25%,#4f46e5,transparent_35%)]" />
                    <div className="p-6 relative">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${primaryGradient} text-white flex items-center justify-center`}>
                            {(p.projectType || "").toLowerCase().includes("web") ? (
                              <FolderOpen className="w-5 h-5" />
                            ) : (
                              <Briefcase className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 leading-tight">{p.name}</h3>
                            <p className="text-xs text-slate-600">Manager: {p.manager}</p>
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${awaiting || p.approvalsStatus === "pending" ? "bg-yellow-100 text-yellow-800" : p.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                        >
                          {awaiting || p.approvalsStatus === "pending" ? "Awaiting Approval" : p.status === "completed" ? "Completed" : "Active"}
                        </span>
                      </div>

                      <p className="text-sm text-slate-700 mt-3 line-clamp-2">{p.description}</p>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{p.progress}%</span>
                      </div>

                      <button
                        onClick={() => setSelectedProjectId(p.id)}
                        className={`mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium ${primaryGradient} hover:opacity-95 transition`}
                      >
                        View Workflow
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header with Back */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedProjectId(null);
                    setActiveTab("stages");
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Projects
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{currentProject?.name}</h2>
                  <p className="text-slate-600 text-sm">Manager: {currentProject?.manager}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-full max-w-md">
              {([
                { key: "stages", label: "Stage Flow", icon: <WorkflowBadge /> },
                { key: "tasks", label: "Task Flow", icon: <TaskBadge /> },
              ] as Array<{ key: TabKey; label: string; icon: React.ReactNode }>).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                    activeTab === t.key ? `${primaryGradient} text-white shadow` : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {activeTab === "stages" ? (
                  <motion.div key="tab-stages" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.2 }} className="space-y-4">
                    {projectStages.map((stage, idx) => {
                      const derived = getDerivedStageApproval(stage, approvalLookup);
                      const styles = statusStyles[derived.state];
                      return (
                        <div key={stage.id} className={`relative rounded-xl border-2 ${styles.border} ${styles.bg} p-6 transition-all hover:shadow-md`}>
                          {/* Connector */}
                          {idx < projectStages.length - 1 && (
                            <div className="absolute left-6 top-full w-0.5 h-6 bg-slate-300" />
                          )}

                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 pt-1">{statusIcon(derived.state)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-700">Stage</span>
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-700">{approvalLabel(derived.state)}</span>
                                  </div>
                                  <h3 className="text-lg font-bold text-slate-900">{stage.name}</h3>
                                  <p className="text-sm text-slate-600 mt-1">Owner: <span className="font-medium">{stage.owner}</span></p>
                                  {(derived.approvedBy || derived.approvalDate) && (
                                    <p className="text-sm text-slate-600 mt-1">
                                      Approved by <span className="font-semibold">{derived.approvedBy}</span>
                                      {derived.approvalDate && <span> on {formatDate(derived.approvalDate)}</span>}
                                    </p>
                                  )}
                                </div>
                                {derived.state === "awaiting" && (
                                  <div className="flex-shrink-0 flex items-center gap-2">
                                    <button onClick={() => openApprovalForStage(stage)} className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold">Approve</button>
                                    <button onClick={() => openApprovalForStage(stage)} className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold">Reject</button>
                                    <button onClick={() => openApprovalForStage(stage)} className="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold">Rework</button>
                                  </div>
                                )}
                              </div>

                              <div className="bg-white/60 border border-slate-200/70 rounded-lg p-3 mt-3">
                                <p className="text-sm text-slate-700">{stage.remarks}</p>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                                <InfoPill label="Start" value={formatDate(stage.startDate)} icon={<CalendarDays className="w-4 h-4" />} />
                                <InfoPill label="End" value={formatDate(stage.endDate)} icon={<CalendarDays className="w-4 h-4" />} />
                                <InfoPill label="Status" value={stage.status.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase())} />
                                <InfoPill label="Completion" value={`${stage.completion}%`} />
                              </div>

                              {/* Attachments (if any via approvals) */}
                              {(() => {
                                const wf = MOCK_WORKFLOW_ITEMS.find((it) => it.entityId === stage.id);
                                if (!wf || wf.attachments.length === 0) return null;
                                return (
                                  <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2"><Paperclip className="w-4 h-4" /> Attachments</h4>
                                    <div className="space-y-2">
                                      {wf.attachments.map((att) => (
                                        <a key={att.id} href={att.url} className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                                          <FileUp className="w-4 h-4" />
                                          {att.name}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {projectStages.length === 0 && (
                      <EmptyState title="No stages" subtitle="Stages for this project will appear here." />
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="tab-tasks" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }} className="grid gap-4 md:grid-cols-2">
                    {projectTasks.map((task) => {
                      const derived = getDerivedTaskApproval(task, approvalLookup);
                      const overdue = isOverdue(task.dueDate, task.status);
                      const ring = overdue ? "border-red-300 bg-red-50" : "border-slate-200 bg-white";
                      return (
                        <div key={task.id} className={`rounded-xl border ${ring} p-5 shadow-sm hover:shadow-md transition-all`}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-1 rounded text-xs font-semibold bg-indigo-100 text-indigo-700">Task</span>
                                <span className="px-2 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-700">{approvalLabel(derived.state)}</span>
                              </div>
                              <h3 className="font-semibold text-slate-900">{task.name}</h3>
                              <p className="text-sm text-slate-600 mt-1 flex items-center gap-2"><Users className="w-4 h-4" /> Assigned to {task.assignedTo}</p>
                            </div>
                            {derived.state === "awaiting" && (
                              <div className="flex-shrink-0 flex items-center gap-2">
                                <button onClick={() => openApprovalFor({ kind: "task", data: task })} className="px-2.5 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold">Approve</button>
                                <button onClick={() => openApprovalFor({ kind: "task", data: task })} className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold">Reject</button>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                            <InfoPill label="Start" value={formatDate(task.startDate)} icon={<CalendarDays className="w-4 h-4" />} />
                            <InfoPill label="Due" value={formatDate(task.dueDate)} icon={<CalendarDays className="w-4 h-4" />} />
                            <InfoPill label="Status" value={task.status.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase())} />
                          </div>

                          <div className="bg-slate-50 rounded-lg border border-slate-200 p-3 mt-3">
                            <p className="text-sm text-slate-700">{task.comments}</p>
                          </div>

                          {task.attachments.length > 0 && (
                            <div className="mt-3">
                              <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2"><Paperclip className="w-4 h-4" /> Attachments</h4>
                              <div className="space-y-2">
                                {task.attachments.map((att) => (
                                  <a key={att.id} href={att.url} className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    <FileUp className="w-4 h-4" />
                                    {att.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {projectTasks.length === 0 && (
                      <div className="md:col-span-2">
                        <EmptyState title="No tasks" subtitle="Tasks for this project will appear here." />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Approval Modal (re-using existing component and behavior) */}
      <ApprovalModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem as any}
      />
    </div>
  );
}

function InfoPill({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
      {icon}
      <div>
        <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{label}</p>
        <p className="text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
      <FolderOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
    </div>
  );
}

function WorkflowBadge() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-purple-100 text-purple-700 text-[10px] font-bold">S</span>
  );
}

function TaskBadge() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold">T</span>
  );
}
