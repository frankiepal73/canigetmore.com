import React from 'react';
import { TrendingUp, Users, Briefcase, Award } from 'lucide-react';
import type { InsightCard } from '../types';

const insights: InsightCard[] = [
  {
    title: 'Market Rate',
    value: '$120,000',
    change: 5.2,
    icon: TrendingUp,
  },
  {
    title: 'Peer Comparison',
    value: 'Top 25%',
    change: 3.1,
    icon: Users,
  },
  {
    title: 'Remote Jobs',
    value: '64%',
    change: 12.5,
    icon: Briefcase,
  },
  {
    title: 'Skills Match',
    value: '85%',
    change: 4.2,
    icon: Award,
  },
];

export default function SalaryInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {insights.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <item.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <span className={`text-sm font-medium ${
              item.change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.change > 0 ? '+' : ''}{item.change}%
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.value}</h3>
          <p className="text-sm text-gray-500">{item.title}</p>
        </div>
      ))}
    </div>
  );
}