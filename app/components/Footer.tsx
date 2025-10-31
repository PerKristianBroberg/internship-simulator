import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-600">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2">
        <Link
          href="/"
          className="hover:text-zinc-800 dark:hover:text-zinc-400 transition-colors"
        >
          Home
        </Link>
        <span className="hidden sm:inline">•</span>
        <Link
          href="/about"
          className="hover:text-zinc-800 dark:hover:text-zinc-400 transition-colors"
        >
          About
        </Link>
      </div>
      <p>
        © {new Date().getFullYear()} Internship Application Simulator. All rights reserved.
      </p>
    </footer>
  );
}
