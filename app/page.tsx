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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-green-50 to-green-200">
      <div className="flex-1 flex items-center justify-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 items-center w-full max-w-md">
          <Image
            src="/logo.png"
            alt="RebateForge Logo"
            width={200}
            height={200}
            className="drop-shadow-lg"
          />
          <h1 className="text-5xl font-bold text-green-900">RebateForge</h1>
          <p className="text-lg text-green-800 text-center">An open source rebate management platform for managing rebates between manufacturers, distributors, and retailers.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-green-300 rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md bg-white/80"
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-gradient-to-r from-green-600 to-green-700 cursor-pointer text-white rounded px-4 py-2 font-semibold shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Subscribing...' : 'Get Early Access'}
            </button>
            {status === 'success' && (
              <p className="text-green-600 text-center">Thanks for subscribing! We will be in touch soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-center">{errorMessage}</p>
            )}
          </form>
        </main>
      </div>
      
      <footer className="w-full max-w-md mx-auto mt-20 text-center text-green-800 pb-8">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center gap-4 text-sm">
          </div>
          <p className="text-sm">RebateForge the open source alternative to Enable.</p>
        </div>
      </footer>
    </div>
  );
}
