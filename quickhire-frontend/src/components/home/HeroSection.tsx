'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiSearch, HiLocationMarker } from 'react-icons/hi';

export default function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('search', keyword);
    if (location) params.set('location', location);
    router.push(`/jobs?${params.toString()}`);
  };

  const popularSearches = ['UI Designer', 'UX Researcher', 'Android', 'Admin'];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 border border-[var(--color-primary)] rotate-45" />
        <div className="absolute top-40 right-40 w-48 h-48 border border-[var(--color-primary)] rotate-45" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-[var(--color-primary)] rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-tight text-[var(--color-dark)]">
              Discover
              <br />
              more than
              <br />
              <span className="text-[var(--color-secondary)] relative inline-block">
                5000+ Jobs
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C30 2 60 4 90 6C120 8 150 3 198 7"
                    stroke="#26A4FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 10C40 5 80 7 120 4C160 2 180 8 198 5"
                    stroke="#26A4FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-base lg:text-lg text-[var(--color-dark-light)] leading-relaxed">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="mt-8 bg-white rounded-lg shadow-lg border border-gray-100 p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <div className="flex items-center gap-2 flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-3 sm:pb-0 sm:pr-3">
                <HiSearch className="text-[var(--color-gray)] shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full outline-none text-sm text-[var(--color-dark)] placeholder-[var(--color-gray-light)]"
                />
              </div>
              <div className="flex items-center gap-2 flex-1 pb-3 sm:pb-0 sm:pr-3">
                <HiLocationMarker
                  className="text-[var(--color-gray)] shrink-0"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Florence, Italy"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full outline-none text-sm text-[var(--color-dark)] placeholder-[var(--color-gray-light)]"
                />
              </div>
              <button
                type="submit"
                className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-sm font-semibold text-sm hover:bg-[var(--color-primary-dark)] transition-colors whitespace-nowrap"
              >
                Search my job
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-[var(--color-gray)]">Popular :</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setKeyword(term);
                    router.push(`/jobs?search=${encodeURIComponent(term)}`);
                  }}
                  className="text-sm text-[var(--color-dark-light)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {term}
                  {term !== popularSearches[popularSearches.length - 1] && ','}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Hero Image Placeholder */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="w-full max-w-md aspect-square bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-[var(--color-primary)] opacity-10 rotate-45" />
              <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-[var(--color-secondary)] opacity-10 rotate-12" />
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full opacity-20" />
                <p className="mt-4 text-sm text-[var(--color-gray)]">
                  Place hero image in
                  <br />
                  public/assets/images/
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
