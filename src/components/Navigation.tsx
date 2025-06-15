import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, User, Phone, History, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, setUser, isLoggedIn } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/contact', label: 'Contact', icon: Phone },
    ...(isLoggedIn ? [{ path: '/history', label: 'History', icon: History }] : []),
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                ShePredicts
              </span>
              <div className="text-xs text-gray-500 -mt-1">AI Health Insights</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-gray-900">Welcome, {user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                <User className="h-4 w-4" />
                <span>Get Started</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};