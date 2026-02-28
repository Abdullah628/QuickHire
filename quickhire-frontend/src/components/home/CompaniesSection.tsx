export default function CompaniesSection() {
  const companies = [
    { name: 'Vodafone', text: 'vodafone' },
    { name: 'Intel', text: 'intel' },
    { name: 'Tesla', text: 'TESLA' },
    { name: 'AMD', text: 'AMD' },
    { name: 'Talkit', text: 'Talkit' },
  ];

  return (
    <section className="bg-[var(--color-bg-light)] py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[var(--color-gray)] text-sm mb-6">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap items-center justify-between gap-8">
          {companies.map((company) => (
            <div
              key={company.name}
              className="text-[var(--color-gray)] text-xl sm:text-2xl font-bold tracking-wider opacity-60 hover:opacity-100 transition-opacity"
            >
              {company.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
