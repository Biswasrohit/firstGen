"use client";

import { useAuth } from "@/lib/auth-context";
import { TopNav } from "@/components/layout/TopNav";

export default function SettingsPage() {
  const { user, logOut } = useAuth();

  return (
    <div>
      <TopNav title="Settings" />
      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-2xl space-y-6">
          {user && (
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="font-display font-semibold text-on-surface mb-4">Profile</h2>
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
              </div>
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
