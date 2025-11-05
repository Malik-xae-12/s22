import { useState } from "react";
import { User } from "@shared/api";
import {
  MOCK_DOCUMENTS,
  MOCK_PROJECTS,
  formatDate,
  formatBytes,
} from "@/utils/mockData";
import { FileText, Upload, Filter, Search, Download } from "lucide-react";

interface DocumentsProps {
  currentUser: User | null;
}

export default function Documents({ currentUser }: DocumentsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const documents = MOCK_DOCUMENTS;
  const projects = MOCK_PROJECTS;

  // Get all unique tags
  const allTags = Array.from(new Set(documents.flatMap((d) => d.tags)));

  // Filter documents
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      searchQuery === "" ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProject =
      selectedProject === "" || doc.projectId === selectedProject;

    const matchesTag = selectedTag === "" || doc.tags.includes(selectedTag);

    return matchesSearch && matchesProject && matchesTag;
  });

  // Group by project
  const grouped = projects.reduce(
    (acc, project) => {
      const projectDocs = filteredDocs.filter(
        (d) => d.projectId === project.id,
      );
      if (projectDocs.length > 0) {
        acc[project.id] = {
          project,
          documents: projectDocs,
        };
      }
      return acc;
    },
    {} as Record<
      string,
      {
        project: (typeof projects)[0];
        documents: (typeof documents)[];
      }
    >,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Document Repository
          </h1>
          <p className="text-slate-600 mt-1">
            Manage and access project documents with version history
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Search Documents
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by document name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Filter by Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.teamName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Filter by Tag
            </label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedProject("");
            setSelectedTag("");
          }}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Documents by Project */}
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
          <FileText className="w-12 h-12 mx-auto mb-2 text-slate-400" />
          <p className="text-slate-600">No documents found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.values(grouped).map(({ project, documents: projectDocs }) => (
            <div
              key={project.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden"
            >
              {/* Project Header */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900">{project.teamName}</h3>
                <p className="text-sm text-slate-600 mt-1">
                  {projectDocs.length} documents
                </p>
              </div>

              {/* Documents List */}
              <div className="divide-y divide-slate-200">
                {projectDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900">
                            {doc.name}
                          </p>
                          <p className="text-sm text-slate-600 mt-0.5">
                            {formatBytes(doc.size)} •{" "}
                            {formatDate(doc.uploadedAt)}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Uploaded by {doc.uploadedBy}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="px-2 py-1 bg-slate-100 text-xs font-medium text-slate-700 rounded">
                          v{doc.versions.length}
                        </span>
                        <button className="p-2 hover:bg-slate-100 rounded text-slate-600 hover:text-blue-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    {doc.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap mb-3">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Version History */}
                    {doc.versions.length > 1 && (
                      <details className="text-xs">
                        <summary className="cursor-pointer text-slate-600 hover:text-slate-900 font-medium">
                          View {doc.versions.length} versions
                        </summary>
                        <div className="mt-2 ml-8 border-l border-slate-200 pl-4 space-y-1 text-slate-600">
                          {doc.versions.map((ver) => (
                            <div key={ver.version}>
                              <p className="font-medium">
                                v{ver.version} • {formatDate(ver.uploadedAt)}
                              </p>
                              <p className="text-slate-500">
                                {formatBytes(ver.size)} by {ver.uploadedBy}
                              </p>
                              <p className="text-slate-500">{ver.changes}</p>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
