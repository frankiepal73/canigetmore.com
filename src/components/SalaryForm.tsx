import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitSalaryData } from '../services/salary';

export default function SalaryForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    salary: '',
    company: '',
    location: '',
    experience: '',
    remote: false,
    skills: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitSalaryData({
        role: formData.role,
        salary: Number(formData.salary),
        company: formData.company,
        location: formData.location,
        experience: Number(formData.experience),
        remote: formData.remote,
        skills: formData.skills.split(',').map(s => s.trim()),
      });
      
      navigate('/insights', { state: formData });
    } catch (error) {
      console.error('Failed to submit salary data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <input
            type="text"
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. Software Engineer"
            required
          />
        </div>
        
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
            Annual Salary
          </label>
          <input
            type="number"
            id="salary"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. 120000"
            required
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. Google"
            required
          />
        </div>
        
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            id="experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. 5"
            required
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. San Francisco"
            required
          />
        </div>
        
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
            Key Skills
          </label>
          <input
            type="text"
            id="skills"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. React, Node.js"
            required
          />
        </div>

        <div className="flex items-center mt-8">
          <input
            type="checkbox"
            id="remote"
            checked={formData.remote}
            onChange={(e) => setFormData({ ...formData, remote: e.target.checked })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
            Remote Position
          </label>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="h-5 w-5 mr-2" />
          {isSubmitting ? 'Analyzing...' : 'Analyze Salary'}
        </button>
      </div>
    </form>
  );
}