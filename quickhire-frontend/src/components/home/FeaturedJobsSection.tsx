'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import JobCard from '@/components/jobs/JobCard';
import { jobService } from '@/lib/services';
import { Job } from '@/types';

export default function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobService
      .getAll({ featured: 'true', limit: '8' })
      .then((res) => setJobs(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-dark)]">
            Featured{' '}
            <span className="text-[var(--color-secondary)]">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="text-[var(--color-primary)] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
          >
            Show all jobs <HiArrowRight />
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-100 rounded-sm h-56"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
