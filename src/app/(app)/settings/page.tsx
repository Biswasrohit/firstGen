"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { TopNav } from "@/components/layout/TopNav";
import { COUNTRIES, UNIVERSITIES, VISA_TYPES } from "@/lib/constants";

export default function SettingsPage() {
  const { user, logOut, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    countryOfOrigin: "",
    visaType: "",
  });

  const startEditing = () => {
    if (user) {
      setFormData({
        name: user.name,
        university: user.university,
        countryOfOrigin: user.countryOfOrigin,
        visaType: user.visaType,
      });
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveProfile = () => {
    updateProfile({
      name: formData.name,
      university: formData.university,
      countryOfOrigin: formData.countryOfOrigin,
      visaType: formData.visaType as "student" | "work" | "immigrant" | "citizen",
    });
    setIsEditing(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <TopNav title="Settings" />
      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-2xl space-y-6">
          {user && (
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-on-surface">Profile</h2>
                {!isEditing && (
                  <button
                    onClick={startEditing}
                    className="text-sm text-primary hover:text-primary-dim font-medium transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1.5">
                      University
                    </label>
                    <select
                      value={formData.university}
                      onChange={(e) => updateField("university", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option value="">Select university</option>
                      {UNIVERSITIES.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1.5">
                      Country of Origin
                    </label>
                    <select
                      value={formData.countryOfOrigin}
                      onChange={(e) => updateField("countryOfOrigin", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1.5">
                      Visa Type
                    </label>
                    <select
                      value={formData.visaType}
                      onChange={(e) => updateField("visaType", e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option value="">Select visa type</option>
                      {VISA_TYPES.map((v) => (
                        <option key={v.value} value={v.value}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={saveProfile}
                      className="px-5 py-2 rounded-full bg-primary text-on-primary font-medium hover:bg-primary-dim transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-5 py-2 rounded-full text-on-surface-variant font-medium hover:bg-surface-container transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Name</span>
                    <span className="text-on-surface font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Email</span>
                    <span className="text-on-surface font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">University</span>
                    <span className="text-on-surface font-medium">{user.university}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Country</span>
                    <span className="text-on-surface font-medium">{user.countryOfOrigin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Visa Type</span>
                    <span className="text-on-surface font-medium">
                      {VISA_TYPES.find((v) => v.value === user.visaType)?.label || user.visaType}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={logOut}
            className="px-6 py-2.5 rounded-full bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
