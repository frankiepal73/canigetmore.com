import React, { useEffect, useState } from 'react';
import { Building2, Users, TrendingUp } from 'lucide-react';
import { getTopCompanies } from '../../services/company';

interface Company {
  name: string;
  avgSalary: number;
  employees: number;
  growth: number;
}

export default function CompanyInsights() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getTopCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Paying Companies</h3>
      <div className="space-y-4">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors"
          >
            <div>
              <h4 className="font-semibold text-gray-900">{company.name}</h4>
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  ${company.avgSalary.toLocaleString()}
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {company.employees.toLocaleString()}+
                </span>
                <span className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{company.growth}%
                </span>
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              View Jobs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}