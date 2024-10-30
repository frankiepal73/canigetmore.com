import React, { useState } from 'react';
import { Coins, X } from 'lucide-react';
import { createCheckoutSession, getTokenPrices } from '../services/payment';

interface TokenPurchaseModalProps {
  onClose: () => void;
}

export default function TokenPurchaseModal({ onClose }: TokenPurchaseModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(5);
  const prices = getTokenPrices();

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const { url } = await createCheckoutSession(selectedQuantity);
      window.location.href = url;
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Purchase Tokens</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {prices.map(({ tokens, price }) => (
            <label
              key={tokens}
              className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedQuantity === tokens
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200'
              }`}
            >
              <input
                type="radio"
                name="tokens"
                value={tokens}
                checked={selectedQuantity === tokens}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                className="sr-only"
              />
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-gray-900">{tokens} Tokens</span>
                  <p className="text-sm text-gray-500">
                    ${(price / tokens).toFixed(2)} per token
                  </p>
                </div>
                <span className="text-lg font-bold text-indigo-600">${price}</span>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Coins className="h-5 w-5 mr-2" />
          {loading ? 'Processing...' : 'Purchase Now'}
        </button>
      </div>
    </div>
  );
}