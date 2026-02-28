import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'yellow' | 'green' | 'red' | 'orange' | 'blue' | 'outline';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-purple-50 text-[var(--color-primary)] border border-[var(--color-primary)]',
    yellow: 'bg-amber-50 text-[var(--color-accent-yellow)] border border-[var(--color-accent-yellow)]',
    green: 'bg-emerald-50 text-[var(--color-accent-green)] border border-[var(--color-accent-green)]',
    red: 'bg-red-50 text-[var(--color-accent-red)] border border-[var(--color-accent-red)]',
    orange: 'bg-orange-50 text-[var(--color-accent-orange)] border border-[var(--color-accent-orange)]',
    blue: 'bg-blue-50 text-[var(--color-secondary)] border border-[var(--color-secondary)]',
    outline: 'bg-transparent text-[var(--color-dark-light)] border border-[var(--color-border)]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
