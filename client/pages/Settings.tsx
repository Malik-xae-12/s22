import { useState } from "react";
import { User } from "@shared/api";
import { MOCK_USERS } from "@/utils/mockData";
import {
  Save,
  Mail,
  Phone,
  MapPin,
  Bell,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

interface SettingsProps {
  currentUser: User | null;
}

export default function Settings({ currentUser }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications"
  >("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    bio: currentUser?.bio || "",
    company: currentUser?.company || "",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState({
    projectUpdates: true,
    meetings: true,
    approvals: true,
    chat: true,
    emails: true,
    sms: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          Manage your profile and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-8">
          {["profile", "security", "notifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-2 py-4 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar & Info */}
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <div className="text-center">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-slate-900">
                {currentUser?.name}
              </h3>
              <p className="text-sm text-slate-600 mt-1 capitalize">
                {currentUser?.role}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {currentUser?.company}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-200 text-left space-y-2 text-xs text-slate-600">
                <p>
                  <strong>Member Since:</strong> January 2025
                </p>
                <p>
                  <strong>Last Login:</strong> Today
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Profile Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="current"
                    value={passwordData.current}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="new"
                  value={passwordData.new}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm"
                  value={passwordData.confirm}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                Update Password
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 mb-3">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Add an extra layer of security to your account
              </p>
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium text-sm">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h3>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => {
                const labels: Record<string, string> = {
                  projectUpdates: "Project Updates",
                  meetings: "Meeting Reminders",
                  approvals: "Approval Requests",
                  chat: "Chat Messages",
                  emails: "Email Notifications",
                  sms: "SMS Notifications",
                };

                return (
                  <label
                    key={key}
                    className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleNotificationToggle(key as any)}
                      className="w-4 h-4 rounded border-slate-300"
                    />
                    <span className="flex-1">
                      <p className="font-medium text-slate-900">
                        {labels[key]}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {key === "projectUpdates" &&
                          "Get notified of project milestones"}
                        {key === "meetings" &&
                          "Reminders for upcoming meetings"}
                        {key === "approvals" && "When approval is requested"}
                        {key === "chat" && "New messages in project channels"}
                        {key === "emails" && "Receive email notifications"}
                        {key === "sms" && "Receive SMS alerts"}
                      </p>
                    </span>
                  </label>
                );
              })}

              <button className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
