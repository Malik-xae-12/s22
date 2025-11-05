import { useState } from "react";
import { User } from "@shared/api";
import { MOCK_AUDIT_LOGS } from "@/utils/mockData";
import { Search, Filter, Calendar } from "lucide-react";

interface AuditLogProps {
  currentUser: User | null;
}

export default function AuditLog({ currentUser }: AuditLogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [resourceFilter, setResourceFilter] = useState("");

  const logs = MOCK_AUDIT_LOGS;

  // Get unique values for filters
  const uniqueActions = Array.from(new Set(logs.map((l) => l.action)));
  const uniqueUsers = Array.from(new Set(logs.map((l) => l.user)));
  const uniqueResources = Array.from(new Set(logs.map((l) => l.resourceType)));

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = actionFilter === "" || log.action === actionFilter;
    const matchesUser = userFilter === "" || log.user === userFilter;
    const matchesResource =
      resourceFilter === "" || log.resourceType === resourceFilter;

    return matchesSearch && matchesAction && matchesUser && matchesResource;
  });

  const getActionColor = (
    action: string,
  ):
    | "bg-blue-50 text-blue-700"
    | "bg-green-50 text-green-700"
    | "bg-yellow-50 text-yellow-700"
    | "bg-red-50 text-red-700" => {
    if (action.includes("Created")) return "bg-green-50 text-green-700";
    if (action.includes("Updated") || action.includes("Modified"))
      return "bg-blue-50 text-blue-700";
    if (action.includes("Deleted")) return "bg-red-50 text-red-700";
    return "bg-yellow-50 text-yellow-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Audit Log</h1>
        <p className="text-slate-600 mt-1">
          Track all user actions and system changes
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by action or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Action Type
            </label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              User
            </label>
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Users</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Resource Type
            </label>
            <select
              value={resourceFilter}
              onChange={(e) => setResourceFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Resources</option>
              {uniqueResources.map((resource) => (
                <option key={resource} value={resource}>
                  {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setSearchQuery("");
            setActionFilter("");
            setUserFilter("");
            setResourceFilter("");
          }}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No audit logs found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">
                    User
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-900">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(
                          log.action,
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{log.user}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
                        {log.resourceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {log.projectId || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <details className="text-xs">
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                          View
                        </summary>
                        <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-200 text-slate-700">
                          <pre className="text-xs overflow-auto max-h-32">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
          <p className="text-xs text-slate-600 uppercase font-medium">
            Total Logs
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {filteredLogs.length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
          <p className="text-xs text-slate-600 uppercase font-medium">
            Unique Users
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {new Set(filteredLogs.map((l) => l.userId)).size}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
          <p className="text-xs text-slate-600 uppercase font-medium">
            Projects Involved
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {
              new Set(
                filteredLogs.filter((l) => l.projectId).map((l) => l.projectId),
              ).size
            }
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
          <p className="text-xs text-slate-600 uppercase font-medium">
            Date Range
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {filteredLogs.length > 0
              ? `${new Date(filteredLogs[filteredLogs.length - 1].timestamp).toLocaleDateString()} - ${new Date(filteredLogs[0].timestamp).toLocaleDateString()}`
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
