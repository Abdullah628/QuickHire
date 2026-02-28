'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    toast.success('Subscribed successfully!');
    setEmail('');
  };

  return (
    <footer className="bg-[var(--color-footer-bg)] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold text-white">QuickHire</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Great platform for job seeker that passionate about startups. Find
              your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-3">
              {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Get job notifications
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-[var(--color-dark)] px-4 py-2.5 rounded-sm text-sm outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-sm font-semibold text-sm hover:bg-[var(--color-primary-dark)] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            2021 @ QuickHire. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[FaFacebookF, FaInstagram, FaDribbble, FaLinkedinIn, FaTwitter].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
                >
                  <Icon size={14} />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
