import React from 'react';
import { ArrowRight } from 'lucide-react';

const trends = [
  {
    title: 'Remote Work Adoption',
    description: 'Remote work opportunities have increased by 45% in your field',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Emerging Skills',
    description: 'AI and Machine Learning skills showing 3x demand growth',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Industry Growth',
    description: 'Tech sector salaries increased 8% year over year',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
];

export default function MarketTrends() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trends.map((trend) => (
        <div
          key={trend.title}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="h-48 overflow-hidden">
            <img
              src={trend.image}
              alt={trend.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{trend.title}</h3>
            <p className="text-gray-600 mb-4">{trend.description}</p>
            <button className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
              Learn more
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}