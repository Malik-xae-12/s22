import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { MOCK_USERS } from "@/utils/mockData";

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  projectName?: string;
}

export default function ScheduleMeetingModal({
  isOpen,
  onClose,
  projectId,
  projectName,
}: ScheduleMeetingModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: [] as string[],
    agenda: "",
    notes: "",
  });

  const [actionItems, setActionItems] = useState<string[]>([]);
  const [newAction, setNewAction] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleParticipantToggle = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.includes(userId)
        ? prev.participants.filter((id) => id !== userId)
        : [...prev.participants, userId],
    }));
  };

  const handleAddActionItem = () => {
    if (newAction.trim()) {
      setActionItems([...actionItems, newAction]);
      setNewAction("");
    }
  };

  const handleRemoveActionItem = (index: number) => {
    setActionItems(actionItems.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // In a real app, this would save to the backend
    console.log("Meeting scheduled:", {
      ...formData,
      actionItems,
      projectId,
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      participants: [],
      agenda: "",
      notes: "",
    });
    setActionItems([]);
    setNewAction("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Schedule Meeting
            {projectName && <span className="text-slate-600 font-normal ml-2">({projectName})</span>}
          </h2>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Meeting Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Weekly Progress Sync"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start Time *
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                End Time *
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Participants */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Participants
            </label>
            <div className="space-y-2">
              {MOCK_USERS.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.participants.includes(user.id)}
                    onChange={() => handleParticipantToggle(user.id)}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700">
                    {user.name} ({user.role})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Agenda
            </label>
            <textarea
              name="agenda"
              value={formData.agenda}
              onChange={handleInputChange}
              placeholder="List the topics to be discussed"
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Meeting Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Notes (Post-Meeting)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add notes after the meeting..."
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Items */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Action Items
            </label>
            <div className="space-y-2">
              {actionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200"
                >
                  <p className="text-sm text-slate-700">{item}</p>
                  <button
                    onClick={() => handleRemoveActionItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddActionItem();
                  }
                }}
                placeholder="Add action item..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleAddActionItem}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.title || !formData.date || !formData.startTime}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
