"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TopNav } from "@/components/layout/TopNav";
import { getDemoPosts, categoryLabels } from "@/data/demo-posts";
import type { CommunityPost } from "@/lib/types";

const categoryFilters = Object.keys(categoryLabels);

function PostCard({ post }: { post: CommunityPost }) {
  const categoryLabel = categoryLabels[post.category] ?? post.category;

  return (
    <div className="bg-white rounded-2xl shadow-soft p-5">
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
          {post.authorName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-on-surface">{post.authorName}</p>
          <p className="text-xs text-on-surface-variant">
            {post.university} &middot; {post.authorCountry}
          </p>
        </div>
        <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {categoryLabel}
        </span>
      </div>

      {/* Content */}
      <p className="text-sm text-on-surface leading-relaxed mb-4">{post.content}</p>

      {/* Footer */}
      <div className="flex items-center gap-4 text-xs text-on-surface-variant">
        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          {post.upvotes}
        </button>
        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.commentCount} comments
        </button>
        <span className="ml-auto">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const posts = getDemoPosts();

  const filtered =
    activeFilter === "all"
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  return (
    <div>
      <TopNav title="University Community" subtitle="Local tips from fellow students" />

      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-3xl">
          {/* Filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-6 px-6">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeFilter === cat
                    ? "bg-primary text-on-primary"
                    : "bg-white shadow-soft text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {filtered.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, ease: "easeOut" as const }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-on-surface-variant">No posts in this category yet.</p>
            </div>
          )}

          {/* Concierge insight */}
          <div className="mt-8 bg-primary-container/20 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-lg">{"\u{1F4A1}"}</span>
              <div>
                <p className="text-sm font-medium text-primary mb-1">Community Tip</p>
                <p className="text-sm text-on-surface">
                  The best financial advice often comes from students who arrived a semester before
                  you. They know which local banks are most international-student-friendly and which
                  phone plans actually work on campus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
