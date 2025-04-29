'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="RebateForge Logo"
              width={60}
              height={60}
              className="drop-shadow-sm"
            />
            <span className="text-lg font-semibold text-gray-900">RebateForge</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Rebate management doesn't have to be this hard.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The open-source platform that helps manufacturers and distributors manage rebates efficiently. 
              No more spreadsheets, no more errors, no more headaches.
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-5 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent shadow-sm hover:border-gray-300 transition-colors duration-200"
                  required
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-gray-900 text-white cursor-pointer rounded-xl px-6 py-3 font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {status === 'loading' ? 'Requesting Access...' : 'Join Waitlist'}
                </button>
              </div>
              {status === 'success' && (
                <p className="text-green-600 text-sm mt-2">Thanks for your interest! We'll be in touch soon.</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
              )}
            </form>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Set up your rebate programs</h3>
                    <p className="text-gray-600">Define your rebate rules, tiers, and conditions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect with your partners</h3>
                    <p className="text-gray-600">Give your distributors and retailers access to their own portal. They can view their performance and claims in real-time.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Automate calculations</h3>
                    <p className="text-gray-600">Let the system handle the math. Automatic calculations based on your rules, with full audit trails.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden">
                <div className="absolute inset-0 z-10"></div>
                <Image
                  src="/hero.png"
                  alt="RebateForge Platform Preview"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gray-900 rounded-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="RebateForge Logo"
                width={30}
                height={30}
                className="drop-shadow-sm"
              />
              <span className="text-base font-semibold text-gray-900">RebateForge</span>
            </div>
            <p className="text-sm text-gray-600">The open source alternative to Enable</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
