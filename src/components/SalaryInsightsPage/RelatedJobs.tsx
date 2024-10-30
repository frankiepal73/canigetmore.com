import React from 'react';
import { MapPin, Building, Briefcase } from 'lucide-react';

const jobs = [
  {
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$140,000 - $180,000',
    posted: '2d ago',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    title: 'Staff Engineer',
    company: 'Meta',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$160,000 - $200,000',
    posted: '3d ago',
    logo: 'https://images.unsplash.com/photo-1496200186974-4293800e2c20?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    title: 'Engineering Manager',
    company: 'Apple',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$180,000 - $220,000',
    posted: '1w ago',
    logo: 'https://images.unsplash.com/photo-1611174743420-3d7df880ce32?auto=format&fit=crop&w=100&h=100&q=80',
  },
];

export default function RelatedJobs() {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={`${job.company}-${job.title}`}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start space-x-4">
            <img
              src={job.logo}
              alt={job.company}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {job.posted}
                </span>
              </div>
              
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.type}
                </span>
                <span className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  {job.salary}
                </span>
              </div>
              
              <div className="mt-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}