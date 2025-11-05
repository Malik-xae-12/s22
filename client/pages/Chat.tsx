import { useState } from "react";
import { User } from "@shared/api";
import { MOCK_PROJECTS } from "@/utils/mockData";
import { Send, MessageSquare } from "lucide-react";

interface ChatProps {
  currentUser: User | null;
}

export default function Chat({ currentUser }: ChatProps) {
  const projects = MOCK_PROJECTS;
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || "");
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      userId: "user-2",
      userName: "Sarah Chen",
      content: "Just finished the UI mockups for the design phase",
      timestamp: "2025-01-20T14:30:00Z",
    },
    {
      id: "msg-2",
      userId: "user-3",
      userName: "Michael Torres",
      content: "Great! I'll review them and start the API implementation",
      timestamp: "2025-01-20T14:45:00Z",
    },
    {
      id: "msg-3",
      userId: "user-2",
      userName: "Sarah Chen",
      content: "@Michael Can you prioritize the authentication endpoints?",
      timestamp: "2025-01-20T15:00:00Z",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      userId: currentUser?.id || "user-1",
      userName: currentUser?.name || "User",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Team Communication</h1>
        <p className="text-slate-600 mt-1">Real-time project channels and discussions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Project List Sidebar */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col">
          <div className="border-b border-slate-200 p-4">
            <h3 className="font-bold text-slate-900">Projects</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`w-full text-left px-4 py-3 border-l-4 transition-colors ${
                  selectedProjectId === project.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <p className="font-medium text-slate-900 text-sm">{project.teamName}</p>
                <p className="text-xs text-slate-600 mt-0.5">{project.manager}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-slate-200 p-4 bg-slate-50">
            <h3 className="font-bold text-slate-900">{selectedProject?.teamName}</h3>
            <p className="text-sm text-slate-600 mt-0.5">{selectedProject?.description}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const isCurrentUser = message.userId === currentUser?.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      isCurrentUser
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-900 rounded-bl-none"
                    }`}
                  >
                    {!isCurrentUser && (
                      <p className="text-xs font-medium opacity-75 mb-0.5">
                        {message.userName}
                      </p>
                    )}
                    <p className="text-sm break-words">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isCurrentUser ? "text-blue-100" : "text-slate-600"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-4 bg-slate-50">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message... (Shift+Enter for new line)"
                rows={2}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
