import { useState } from "react";
import { User } from "@shared/api";
import { MOCK_PROJECTS, MOCK_MEETINGS } from "@/utils/mockData";
import { ChevronLeft, ChevronRight, Clock, Users, MapPin } from "lucide-react";

interface CalendarProps {
  currentUser: User | null;
}

export default function Calendar({ currentUser }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // Jan 2025
  const [view, setView] = useState<"month" | "list">("month");

  const projects = MOCK_PROJECTS;
  const meetings = MOCK_MEETINGS;

  // Get days in month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  // Get events for a date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return meetings.filter((m) => m.date === dateStr);
  };

  // Get projects timeline events
  const getTimelineEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return projects.filter(
      (p) => p.startDate === dateStr || p.endDate === dateStr,
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Days of week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Calendar & Milestones
          </h1>
          <p className="text-slate-600 mt-1">
            Track project timelines and meetings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 rounded-lg font-medium ${
              view === "month"
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg font-medium ${
              view === "list"
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Month/Year Navigation */}
      <div className="bg-white rounded-lg p-4 border border-slate-200 flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-slate-100 rounded"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-slate-900">{monthName}</h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-slate-100 rounded"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {view === "month" ? (
        <>
          {/* Calendar Grid */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            {/* Days of week header */}
            <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="p-4 text-center font-semibold text-slate-900"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 divide-x divide-y divide-slate-200">
              {calendarDays.map((day, idx) => {
                const date = day
                  ? new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day,
                    )
                  : null;
                const dayEvents = date ? getEventsForDate(date) : [];
                const timelineEvents = date
                  ? getTimelineEventsForDate(date)
                  : [];
                const isToday =
                  date && new Date().toDateString() === date.toDateString();

                return (
                  <div
                    key={idx}
                    className={`p-2 min-h-32 ${
                      day === null
                        ? "bg-slate-50"
                        : isToday
                          ? "bg-blue-50"
                          : "bg-white"
                    }`}
                  >
                    {day && (
                      <>
                        <p
                          className={`text-sm font-bold mb-1 ${
                            isToday ? "text-blue-600" : "text-slate-900"
                          }`}
                        >
                          {day}
                        </p>

                        {/* Meetings */}
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className="mb-1 p-1 bg-blue-100 border border-blue-300 rounded text-xs text-blue-900 truncate hover:bg-blue-200 cursor-pointer"
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}

                        {/* Timeline Events */}
                        {timelineEvents.map((event) => (
                          <div
                            key={event.id}
                            className="mb-1 p-1 bg-green-100 border border-green-300 rounded text-xs text-green-900 truncate hover:bg-green-200 cursor-pointer"
                            title={event.name}
                          >
                            {event.name}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* List View */}
          <div className="space-y-4">
            {/* Upcoming Meetings */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Upcoming Meetings
              </h3>
              {meetings.length === 0 ? (
                <p className="text-slate-600">No meetings scheduled</p>
              ) : (
                <div className="space-y-3">
                  {meetings
                    .sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                    )
                    .map((meeting) => (
                      <div
                        key={meeting.id}
                        className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-slate-900">
                            {meeting.title}
                          </p>
                          <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded font-medium">
                            {meeting.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {meeting.startTime} - {meeting.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {meeting.participants.length} participants
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Project Timeline */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Project Timeline
              </h3>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50"
                  >
                    <p className="font-medium text-slate-900">{project.name}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Team: {project.teamName}
                    </p>
                    <div className="mt-2 text-sm text-slate-600">
                      <p>
                        <strong>Start:</strong> {project.startDate} |{" "}
                        <strong>End:</strong> {project.endDate}
                      </p>
                      <p className="mt-1">
                        <strong>Progress:</strong> {project.progress}%
                      </p>
                    </div>
                    <div className="mt-2 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
