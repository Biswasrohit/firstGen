"use client";

import { useAuth } from "@/lib/auth-context";

interface TopNavProps {
  title: string;
  subtitle?: string;
}

export function TopNav({ title, subtitle }: TopNavProps) {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 lg:px-8 py-4 bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
      <div>
        <h1 className="font-display text-xl lg:text-2xl font-bold text-on-surface">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-on-surface-variant">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {user && (
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}
