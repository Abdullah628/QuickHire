'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import {
  HiOutlinePaintBrush,
  HiOutlineMegaphone,
  HiOutlineChartBar,
  HiOutlineBanknotes,
  HiOutlineComputerDesktop,
  HiOutlineCodeBracket,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import { jobService } from '@/lib/services';
import { CategoryStat } from '@/types';

const categoryConfig = [
  {
    name: 'Design',
    icon: HiOutlinePaintBrush,
    fallbackCount: 235,
  },
  {
    name: 'Sales',
    icon: HiOutlineMegaphone,
    fallbackCount: 756,
  },
  {
    name: 'Marketing',
    icon: HiOutlineChartBar,
    fallbackCount: 140,
  },
  {
    name: 'Finance',
    icon: HiOutlineBanknotes,
    fallbackCount: 325,
  },
  {
    name: 'Technology',
    icon: HiOutlineComputerDesktop,
    fallbackCount: 436,
  },
  {
    name: 'Engineering',
    icon: HiOutlineCodeBracket,
    fallbackCount: 542,
  },
  {
    name: 'Business',
    icon: HiOutlineBriefcase,
    fallbackCount: 211,
  },
  {
    name: 'Human Resource',
    icon: HiOutlineUserGroup,
    fallbackCount: 346,
  },
];

export default function CategoriesSection() {
  const [stats, setStats] = useState<CategoryStat[]>([]);
  const [activeCategory, setActiveCategory] = useState('Marketing');

  useEffect(() => {
    jobService.getCategoryStats().then((res) => {
      setStats(res.data);
    }).catch(() => {});
  }, []);

  const getCount = (name: string) => {
    const stat = stats.find((s) => s._id === name);
    if (stat) return stat.count;
    return categoryConfig.find((c) => c.name === name)?.fallbackCount || 0;
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-dark)]">
            Explore by{' '}
            <span className="text-[var(--color-secondary)]">category</span>
          </h2>
          <Link
            href="/jobs"
            className="text-[var(--color-primary)] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
          >
            Show all jobs <HiArrowRight />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categoryConfig.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <Link
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                key={cat.name}
                onMouseEnter={() => setActiveCategory(cat.name)}
                className={`group p-6 rounded-sm border transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg shadow-purple-200'
                    : 'bg-white border-[var(--color-border)] hover:border-[var(--color-primary)]'
                }`}
              >
                <Icon
                  className={`text-3xl mb-4 ${
                    isActive
                      ? 'text-white'
                      : 'text-[var(--color-primary)]'
                  }`}
                  size={40}
                />
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    isActive ? 'text-white' : 'text-[var(--color-dark)]'
                  }`}
                >
                  {cat.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm ${
                      isActive
                        ? 'text-white/80'
                        : 'text-[var(--color-gray)]'
                    }`}
                  >
                    {getCount(cat.name)} jobs available
                  </span>
                  <HiArrowRight
                    className={`text-sm ${
                      isActive
                        ? 'text-white'
                        : 'text-[var(--color-dark)]'
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
