import React from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">canigetmore</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
            <button 
              onClick={logout}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Sign out"
            >
              <LogOut className="h-5 w-5 text-gray-500" />
            </button>
            <button className="lg:hidden p-2">
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}