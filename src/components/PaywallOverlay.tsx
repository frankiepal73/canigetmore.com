import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TokenPurchaseModal from './TokenPurchaseModal';

interface PaywallOverlayProps {
  onPurchase: () => void;
}

export default function PaywallOverlay({ onPurchase }: PaywallOverlayProps) {
  const { isAuthenticated, user } = useAuth();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  return (
    <>
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-indigo-100 p-3">
              <Lock className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-center mb-4">
            Unlock Advanced Analytics
          </h3>
          
          <p className="text-gray-600 text-center mb-6">
            Get access to detailed salary insights, company comparisons, and market trends.
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              {user?.tokens ? (
                <button
                  onClick={onPurchase}
                  className="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-indigo-700 transition-colors"
                >
                  Use 1 Token ({user.tokens} remaining)
                </button>
              ) : null}
              <button
                onClick={() => setShowPurchaseModal(true)}
                className="w-full bg-white text-indigo-600 border border-indigo-600 rounded-lg px-4 py-3 font-medium hover:bg-indigo-50 transition-colors"
              >
                Purchase More Tokens
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <a
                href="/login"
                className="block w-full bg-indigo-600 text-white text-center rounded-lg px-4 py-3 font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign in to Purchase
              </a>
              <p className="text-sm text-gray-500 text-center">
                Don't have an account?{' '}
                <a href="/register" className="text-indigo-600 hover:text-indigo-700">
                  Sign up
                </a>
              </p>
            </div>
          )}
        </div>
      </div>

      {showPurchaseModal && (
        <TokenPurchaseModal onClose={() => setShowPurchaseModal(false)} />
      )}
    </>
  );
}