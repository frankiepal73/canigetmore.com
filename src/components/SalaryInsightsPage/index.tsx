import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../Navbar';
import SalaryDistribution from './SalaryDistribution';
import CompanyInsights from './CompanyInsights';
import JobMap from './JobMap';
import RelatedJobs from './RelatedJobs';
import PaywallOverlay from '../PaywallOverlay';
import { useAuth } from '../../context/AuthContext';
import { aggregateSalaryData } from '../../services/salaryApi';

export default function SalaryInsightsPage() {
  const location = useLocation();
  const formData = location.state;
  const { isAuthenticated, useToken } = useAuth();
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(true); // Always show paywall initially
  const [estimatedSalary, setEstimatedSalary] = useState<number | null>(null);

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const data = await aggregateSalaryData(formData.role, formData.location);
        setSalaryData(data);
        setEstimatedSalary(data.aggregated.median);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch salary data:', error);
        setError('Failed to fetch salary data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, [formData]);

  const handlePurchaseToken = async () => {
    if (!isAuthenticated) return; // Don't proceed if not authenticated
    
    try {
      const success = await useToken();
      if (success) {
        setShowPaywall(false);
      }
    } catch (error) {
      console.error('Failed to use token:', error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Salary Insights for {formData.role}
            </h1>
            <p className="text-gray-600">
              Based on {formData.location} market data for {formData.experience} years of experience
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse h-96" />
            <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse h-96" />
          </div>
        ) : (
          <>
            {/* Estimated Salary - Always Visible */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Estimated Salary Range</h2>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-indigo-600">
                  ${Math.floor(estimatedSalary! * 0.9).toLocaleString()} - ${Math.ceil(estimatedSalary! * 1.1).toLocaleString()}
                </p>
                <span className="text-gray-500">/year</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Based on recent market data and industry standards
              </p>
            </div>

            {/* Advanced Analytics - Behind Paywall */}
            <div className="relative">
              {showPaywall && <PaywallOverlay onPurchase={handlePurchaseToken} />}
              
              <div className={showPaywall ? 'filter blur-sm' : ''}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <SalaryDistribution data={salaryData} />
                  <CompanyInsights />
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Salary Heat Map</h2>
                  <JobMap data={salaryData} />
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Job Opportunities</h2>
                  <RelatedJobs role={formData.role} location={formData.location} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}