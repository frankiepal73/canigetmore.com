import React from 'react';
import Navbar from './Navbar';
import SalaryForm from './SalaryForm';
import SalaryInsights from './SalaryInsights';
import MarketTrends from './MarketTrends';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Salary Insights</h1>
          <p className="text-gray-600">
            Get real-time salary insights based on market data and peer comparisons
          </p>
        </div>

        <SalaryForm />
        <SalaryInsights />
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Trends</h2>
          <MarketTrends />
        </div>
      </main>
    </div>
  );
}