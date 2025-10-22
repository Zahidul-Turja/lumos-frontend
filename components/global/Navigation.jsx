"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-gray-800 bg-gray-900/70 px-20 py-3 backdrop-blur-md">
      <div className="text-lg font-semibold tracking-wide text-white">
        <Link href="/">⚡ MyApp</Link>
      </div>
      <div className="flex items-center gap-6 text-gray-300">
        <Link href="/blogs" className="transition hover:text-white">
          Blogs
        </Link>
        <Link href="/projects" className="transition hover:text-white">
          Projects
        </Link>
        <Link href="/profile" className="transition hover:text-white">
          Profile
        </Link>
        <Link href="/auth" className="transition hover:text-white">
          Login
        </Link>
      </div>
    </nav>
  );
}
