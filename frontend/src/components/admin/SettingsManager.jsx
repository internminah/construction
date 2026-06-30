"use client";

import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Mail, PhoneCall, MapPin, Building2, ShieldCheck, Activity } from "@/components/common/Icons";

export default function SettingsManager({ companyInfo }) {
  const [activeSubTab, setActiveSubTab] = useState("profile"); // profile | security | system
  const [toast, setToast] = useState(null);

  // 1. Company Profile State
  const [companyName, setCompanyName] = useState(companyInfo.name || "I Constructions");
  const [tagline, setTagline] = useState(companyInfo.tagline || "");
  const [email, setEmail] = useState(companyInfo.email || "");
  const [phone, setPhone] = useState(companyInfo.phone || "");
  const [address, setAddress] = useState(companyInfo.address || "");
  const [mapHref, setMapHref] = useState(companyInfo.mapHref || "");
  const [foundedYear, setFoundedYear] = useState(companyInfo.foundedYear || 2015);
  const [description, setDescription] = useState(companyInfo.description || "");
  const [detailedDescription, setDetailedDescription] = useState(companyInfo.detailedDescription || "");

  // 2. Security State
  const [username, setUsername] = useState("admin");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 3. System Preferences State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [apiFallback, setApiFallback] = useState(true);
  const [verboseLogging, setVerboseLogging] = useState(false);
  const [backupInterval, setBackupInterval] = useState("daily");

  // Load persistence if available in browser (system preferences only)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const storedMaintenance = localStorage.getItem("settings_maintenanceMode");
        if (storedMaintenance) setMaintenanceMode(storedMaintenance === "true");

        const storedApiFallback = localStorage.getItem("settings_apiFallback");
        if (storedApiFallback) setApiFallback(storedApiFallback === "true");

        const storedLogging = localStorage.getItem("settings_verboseLogging");
        if (storedLogging) setVerboseLogging(storedLogging === "true");

        const storedBackup = localStorage.getItem("settings_backupInterval");
        if (storedBackup) setBackupInterval(storedBackup);

        const storedUsername = localStorage.getItem("settings_username");
        if (storedUsername) setUsername(storedUsername);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Utility to show toast notifications
  const showNotification = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Submit profile handler to database
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        showNotification("Not authorized. Please log in again.", "error");
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: companyName,
          tagline,
          description,
          detailedDescription,
          foundedYear,
          address,
          email,
          phone,
          mapHref
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          showNotification("Company profile details updated successfully!");
          // Reload page to propagate new settings immediately across the layout
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          showNotification(data.message || "Failed to update settings.", "error");
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        showNotification(errData.message || "Failed to save changes.", "error");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      showNotification("Network error. Failed to save changes.", "error");
    }
  };

  // Submit security credentials handler
  const handleSaveCredentials = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      showNotification("Please provide your current administrator password.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification("New password and confirm password fields do not match.", "error");
      return;
    }
    if (newPassword.length < 6) {
      showNotification("New password must be at least 6 characters long.", "error");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("settings_username", username);
      localStorage.setItem("settings_adminPassword", newPassword);
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showNotification("Administrator login credentials updated successfully!");
  };

  // Submit system preferences handler
  const handleSavePreferences = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("settings_maintenanceMode", maintenanceMode.toString());
      localStorage.setItem("settings_apiFallback", apiFallback.toString());
      localStorage.setItem("settings_verboseLogging", verboseLogging.toString());
      localStorage.setItem("settings_backupInterval", backupInterval);
    }
    showNotification("System preferences saved and applied.");
  };

  return (
    <AdminLayout companyInfo={{ ...companyInfo, name: companyName }} activeTab="Settings">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border text-sm font-poppins font-medium animate-bounce ${
          toast.type === "error"
            ? "bg-red-50 text-red-800 border-red-200"
            : "bg-white text-emerald-800 border-emerald-200"
        }`}>
          <span className={`w-2.5 h-2.5 rounded-full ${
            toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
          }`} />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="font-poppins font-bold text-3xl text-slate-dark">System Settings</h1>
        <p className="font-sans text-slate-light text-sm mt-1">
          Configure office metadata, update administrator passwords, and adjust fallback system metrics.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-mint-dark/50 gap-6 text-sm font-poppins font-bold text-slate-light">
        <button
          onClick={() => setActiveSubTab("profile")}
          className={`pb-3 transition-colors relative cursor-pointer ${
            activeSubTab === "profile" ? "text-primary" : "hover:text-slate-dark"
          }`}
        >
          Company Profile
          {activeSubTab === "profile" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t" />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab("security")}
          className={`pb-3 transition-colors relative cursor-pointer ${
            activeSubTab === "security" ? "text-primary" : "hover:text-slate-dark"
          }`}
        >
          Security & Credentials
          {activeSubTab === "security" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t" />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab("system")}
          className={`pb-3 transition-colors relative cursor-pointer ${
            activeSubTab === "system" ? "text-primary" : "hover:text-slate-dark"
          }`}
        >
          System Preferences
          {activeSubTab === "system" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t" />
          )}
        </button>
      </div>

      {/* Tab Contents */}
      {activeSubTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Office Identity & Metadata
              </h3>
              <p className="text-xs text-slate-light mt-0.5">These parameters are rendered across the contact cards, footers, and page titles.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Company name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Company Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Support Email Address</label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-light/65">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Contact Phone Number</label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-light/65">
                    <PhoneCall className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Founded Year</label>
                <input
                  type="number"
                  value={foundedYear}
                  onChange={(e) => setFoundedYear(parseInt(e.target.value) || 2015)}
                  className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Physical Office Location</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-light/65">
                  <MapPin className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-mint border border-primary/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Google Maps Href Link</label>
              <input
                type="url"
                value={mapHref}
                onChange={(e) => setMapHref(e.target.value)}
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Short Brand Overview</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                />
              </div>

              <div>
                <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Detailed Biography Description</label>
                <textarea
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  rows="4"
                  className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-light text-mint font-poppins font-semibold text-sm rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {activeSubTab === "security" && (
        <form onSubmit={handleSaveCredentials} className="space-y-6">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Security Credentials
              </h3>
              <p className="text-xs text-slate-light mt-0.5">Modify administrator access parameters and API secret auth token configurations.</p>
            </div>

            <div>
              <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Admin Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
              />
            </div>

            <div className="border-t border-mint-dark/50 pt-5">
              <h4 className="font-poppins font-bold text-sm text-slate-dark uppercase tracking-wider mb-4">Change System Password</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-poppins font-bold text-slate-light uppercase tracking-wider block">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-2.5 mt-1 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-light text-mint font-poppins font-semibold text-sm rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Update Credentials
            </button>
          </div>
        </form>
      )}

      {activeSubTab === "system" && (
        <form onSubmit={handleSavePreferences} className="space-y-6">
          <div className="bg-white border border-primary/5 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="border-b border-mint-dark pb-4">
              <h3 className="font-poppins font-bold text-lg text-slate-dark flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                System Configuration Preferences
              </h3>
              <p className="text-xs text-slate-light mt-0.5">Control fallback switches, dev mode states, and database logs.</p>
            </div>

            <div className="space-y-4">
              {/* Toggle 1: Maintenance Mode */}
              <div className="flex items-center justify-between p-4 bg-mint/30 border border-primary/5 rounded-xl">
                <div>
                  <span className="font-poppins font-bold text-sm text-slate-dark block">Maintenance Mode</span>
                  <span className="text-xs text-slate-light font-sans block mt-0.5">
                    Redirect all frontend client page loads to a 503 Maintenance template.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Toggle 2: API Mock Fallbacks */}
              <div className="flex items-center justify-between p-4 bg-mint/30 border border-primary/5 rounded-xl">
                <div>
                  <span className="font-poppins font-bold text-sm text-slate-dark block">API Mock Fallbacks</span>
                  <span className="text-xs text-slate-light font-sans block mt-0.5">
                    Enable client components to automatically revert to data mocks if backend server returns an error.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={apiFallback}
                    onChange={(e) => setApiFallback(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Toggle 3: Verbose Logging */}
              <div className="flex items-center justify-between p-4 bg-mint/30 border border-primary/5 rounded-xl">
                <div>
                  <span className="font-poppins font-bold text-sm text-slate-dark block">Developer Console Logging</span>
                  <span className="text-xs text-slate-light font-sans block mt-0.5">
                    Print full API payload requests and JSON structures in browser logs.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verboseLogging}
                    onChange={(e) => setVerboseLogging(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Select: Backup Frequency */}
              <div className="p-4 bg-mint/30 border border-primary/5 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="font-poppins font-bold text-sm text-slate-dark block">Database Backup Frequency</span>
                  <span className="text-xs text-slate-light font-sans block mt-0.5">
                    Select how frequently the SQL snapshot backups are saved to storage buckets.
                  </span>
                </div>
                <select
                  value={backupInterval}
                  onChange={(e) => setBackupInterval(e.target.value)}
                  className="bg-white border border-primary/10 rounded-lg px-3 py-2 text-xs font-poppins font-bold text-slate-dark focus:outline-none focus:border-primary transition-all cursor-pointer"
                >
                  <option value="hourly">Every Hour (Dev only)</option>
                  <option value="daily">Daily Backup (Recommended)</option>
                  <option value="weekly">Weekly Archive</option>
                  <option value="none">Disable Auto-Backups</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-light text-mint font-poppins font-semibold text-sm rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Save Preferences
            </button>
          </div>
        </form>
      )}

    </AdminLayout>
  );
}
