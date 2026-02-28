import Link from 'next/link';
import { Job } from '@/types';
import Badge from '@/components/ui/Badge';
import { HiArrowRight } from 'react-icons/hi';

interface JobCardProps {
  job: Job;
}

const tagColors: Record<string, 'yellow' | 'green' | 'red' | 'orange' | 'blue' | 'primary'> = {
  Marketing: 'yellow',
  Design: 'green',
  Business: 'red',
  Technology: 'orange',
  Sales: 'blue',
  Finance: 'primary',
  Engineering: 'blue',
  'Human Resource': 'green',
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group block bg-white border border-[var(--color-border)] rounded-sm p-5 hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        {/* Company Logo */}
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
          {job.companyLogo ? (
            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-[var(--color-primary)]">
              {job.company.charAt(0)}
            </div>
          ) : (
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {job.company.charAt(0)}
            </span>
          )}
        </div>
        <Badge variant="primary">{job.type}</Badge>
      </div>

      <h3 className="text-lg font-semibold text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors mb-1">
        {job.title}
      </h3>

      <p className="text-sm text-[var(--color-gray)] mb-3">
        {job.company} · {job.location}
      </p>

      <p className="text-sm text-[var(--color-dark-light)] mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {job.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant={tagColors[tag] || 'primary'}>
            {tag}
          </Badge>
        ))}
      </div>
    </Link>
  );
}

export function JobCardHorizontal({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group flex items-center gap-4 bg-white border border-[var(--color-border)] rounded-sm p-4 hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300"
    >
      {/* Company Logo */}
      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
        <span className="text-xl font-bold text-[var(--color-primary)]">
          {job.company.charAt(0)}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors">
          {job.title}
        </h3>
        <p className="text-sm text-[var(--color-gray)]">
          {job.company} · {job.location}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant={job.type === 'Full-Time' ? 'green' : 'yellow'}>
            {job.type}
          </Badge>
          {job.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant={tagColors[tag] || 'primary'}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <HiArrowRight className="text-[var(--color-gray)] group-hover:text-[var(--color-primary)] shrink-0 hidden sm:block" />
    </Link>
  );
}
