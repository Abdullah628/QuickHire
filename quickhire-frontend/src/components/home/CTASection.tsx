import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--color-primary)] rounded-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Start posting
                <br />
                jobs today
              </h2>
              <p className="text-white/80 mt-4 text-base">
                Start posting jobs for only $10.
              </p>
              <Link
                href="/register"
                className="inline-block mt-6 bg-white text-[var(--color-primary)] px-8 py-3 rounded-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Sign Up For Free
              </Link>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="relative hidden lg:block p-4 pr-0">
              <div className="bg-white rounded-tl-lg rounded-bl-lg p-4 shadow-2xl mr-0">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Q</span>
                    </div>
                    <span className="font-semibold text-sm text-[var(--color-dark)]">
                      QuickHire Dashboard
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-[var(--color-gray)]">Applications</p>
                      <p className="text-2xl font-bold text-[var(--color-primary)]">76</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-[var(--color-gray)]">Interviews</p>
                      <p className="text-2xl font-bold text-[var(--color-accent-green)]">3</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-[var(--color-gray)]">Messages</p>
                      <p className="text-2xl font-bold text-[var(--color-secondary)]">24</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-[var(--color-gray)]">Job Views</p>
                      <p className="text-xl font-bold text-[var(--color-dark)]">2,342</p>
                      <div className="mt-2 h-12 flex items-end gap-1">
                        {[40, 60, 35, 80, 55, 70, 45].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-[var(--color-primary)] opacity-60 rounded-t"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-xs text-[var(--color-gray)]">Job Applied</p>
                      <p className="text-xl font-bold text-[var(--color-dark)]">654</p>
                      <div className="mt-2 h-12 flex items-end gap-1">
                        {[60, 45, 75, 50, 65, 40, 55].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-[var(--color-secondary)] opacity-60 rounded-t"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
