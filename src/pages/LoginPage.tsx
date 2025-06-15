import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Mail, Calendar, UserCheck, ArrowRight } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { useUser } from '../context/UserContext';
import { UserData } from '../App';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 12 || parseInt(formData.age) > 80) {
      newErrors.age = 'Age must be between 12 and 80 years';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    } else if (formData.gender !== 'female') {
      newErrors.gender = 'This assessment is currently available for females only';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const userData: UserData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        age: parseInt(formData.age),
        gender: formData.gender
      };
      setUser(userData);
      navigate('/assessment');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-6">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ShePredicts</h1>
            <p className="text-gray-600 text-lg">
              Start your personalized PCOS health assessment journey
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Create Your Profile</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-2 text-purple-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-2 text-purple-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Age Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-2 text-purple-600" />
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.age ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-300'
                  }`}
                  placeholder="Enter your age"
                  min="12"
                  max="80"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UserCheck className="inline h-4 w-4 mr-2 text-purple-600" />
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-300'
                  }`}
                >
                  <option value="">Select your gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Begin Health Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Privacy Notice */}
            <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-800">
                <strong>Privacy & Security:</strong> Your personal information is encrypted and secure. 
                We never share your data with third parties and you can delete your account at any time.
              </p>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Medical Disclaimer:</strong> This assessment is for informational purposes only 
                and should not replace professional medical advice. Please consult with a healthcare 
                provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};