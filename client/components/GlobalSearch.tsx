import { useState, useEffect, useRef } from "react";
import { MOCK_PROJECTS, MOCK_DOCUMENTS, MOCK_MEETINGS } from "@/utils/mockData";
import { Search, FileText, Calendar, MessageSquare, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<
    Array<{
      type: "project" | "document" | "meeting";
      id: string;
      title: string;
      subtitle?: string;
      link: string;
    }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const projectResults = MOCK_PROJECTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.teamName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).map((p) => ({
      type: "project" as const,
      id: p.id,
      title: p.name,
      subtitle: p.teamName,
      link: `/projects/${p.id}`,
    }));

    const documentResults = MOCK_DOCUMENTS.filter((d) =>
      d.name.toLowerCase().includes(q)
    ).map((d) => ({
      type: "document" as const,
      id: d.id,
      title: d.name,
      subtitle: MOCK_PROJECTS.find((p) => p.id === d.projectId)?.teamName,
      link: "/documents",
    }));

    const meetingResults = MOCK_MEETINGS.filter((m) =>
      m.title.toLowerCase().includes(q)
    ).map((m) => ({
      type: "meeting" as const,
      id: m.id,
      title: m.title,
      subtitle: m.date,
      link: "/calendar",
    }));

    setResults([...projectResults, ...documentResults, ...meetingResults]);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "project":
        return <FolderOpen className="w-4 h-4 text-blue-600" />;
      case "document":
        return <FileText className="w-4 h-4 text-purple-600" />;
      case "meeting":
        return <Calendar className="w-4 h-4 text-green-600" />;
      default:
        return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, documents, meetings..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-600">
              No results found for "{query}"
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {/* Projects Section */}
              {results.filter((r) => r.type === "project").length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-600 uppercase bg-slate-50 border-b border-slate-200">
                    Projects
                  </div>
                  {results
                    .filter((r) => r.type === "project")
                    .map((result) => (
                      <Link
                        key={result.id}
                        to={result.link}
                        onClick={() => {
                          setQuery("");
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          {getIcon(result.type)}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {result.title}
                            </p>
                            <p className="text-xs text-slate-600 truncate">
                              {result.subtitle}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </>
              )}

              {/* Documents Section */}
              {results.filter((r) => r.type === "document").length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-600 uppercase bg-slate-50 border-b border-slate-200">
                    Documents
                  </div>
                  {results
                    .filter((r) => r.type === "document")
                    .map((result) => (
                      <Link
                        key={result.id}
                        to={result.link}
                        onClick={() => {
                          setQuery("");
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          {getIcon(result.type)}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {result.title}
                            </p>
                            <p className="text-xs text-slate-600 truncate">
                              {result.subtitle}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </>
              )}

              {/* Meetings Section */}
              {results.filter((r) => r.type === "meeting").length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-600 uppercase bg-slate-50 border-b border-slate-200">
                    Meetings
                  </div>
                  {results
                    .filter((r) => r.type === "meeting")
                    .map((result) => (
                      <Link
                        key={result.id}
                        to={result.link}
                        onClick={() => {
                          setQuery("");
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          {getIcon(result.type)}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {result.title}
                            </p>
                            <p className="text-xs text-slate-600 truncate">
                              {result.subtitle}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
