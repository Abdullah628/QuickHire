'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Header() {
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-xl font-bold text-[var(--color-dark)]">
              QuickHire
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/jobs"
              className="text-[var(--color-dark-light)] hover:text-[var(--color-primary)] transition-colors font-medium"
            >
              Find Jobs
            </Link>
            <Link
              href="/jobs"
              className="text-[var(--color-dark-light)] hover:text-[var(--color-primary)] transition-colors font-medium"
            >
              Browse Companies
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <span className="text-[var(--color-gray)] text-sm">
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-[var(--color-accent-red)] hover:text-red-700 font-semibold transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[var(--color-dark)] p-2"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <nav className="flex flex-col gap-3 pt-4">
              <Link
                href="/jobs"
                className="text-[var(--color-dark-light)] hover:text-[var(--color-primary)] px-2 py-1.5 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                href="/jobs"
                className="text-[var(--color-dark-light)] hover:text-[var(--color-primary)] px-2 py-1.5 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Companies
              </Link>
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-[var(--color-primary)] px-2 py-1.5 font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-[var(--color-accent-red)] text-left px-2 py-1.5 font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href="/login"
                    className="text-[var(--color-primary)] px-2 py-1.5 font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-[var(--color-primary)] text-white text-center px-6 py-2.5 rounded-sm font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
