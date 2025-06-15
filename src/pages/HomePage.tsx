import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Brain, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { useUser } from '../context/UserContext';

export const HomePage: React.FC = () => {
  const { isLoggedIn } = useUser();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms trained on comprehensive medical data for accurate PCOS prediction.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected with industry-standard security measures.'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Receive tailored recommendations and insights based on your unique health profile.'
    },
    {
      icon: Users,
      title: 'Expert Validated',
      description: 'Our assessment criteria are validated by gynecologists and reproductive health specialists.'
    }
  ];

  const benefits = [
    'Early detection and intervention',
    'Comprehensive health assessment',
    'Personalized treatment recommendations',
    'Track your health journey over time',
    'Evidence-based medical insights',
    'Convenient at-home screening'
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      age: 28,
      text: 'ShePredicts helped me understand my symptoms and guided me to seek proper medical care. The assessment was thorough and easy to complete.',
      rating: 5
    },
    {
      name: 'Dr. Emily Chen',
      title: 'Gynecologist',
      text: 'This platform provides valuable preliminary screening that helps patients come to consultations better prepared and informed.',
      rating: 5
    },
    {
      name: 'Maria L.',
      age: 32,
      text: 'The detailed analysis and recommendations gave me confidence to discuss my concerns with my doctor. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4 mr-2" />
              Empowering Women's Health Through AI
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                ShePredicts
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-gray-700">
                AI-Powered PCOS Detection
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your reproductive health with our advanced AI assessment tool. 
              Get personalized insights, early detection, and expert-validated recommendations 
              for PCOS screening and management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={isLoggedIn ? "/assessment" : "/login"}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <span>Start Free Assessment</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/contact"
                className="flex items-center space-x-2 border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ShePredicts?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with medical expertise 
              to provide accurate, accessible PCOS screening.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Health Assessment
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our AI-powered platform evaluates multiple health indicators to provide 
                you with accurate PCOS risk assessment and personalized recommendations.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Quick Assessment</h3>
                  <p className="text-gray-600">Complete in just 10-15 minutes</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-700">Physical Symptoms</span>
                    <span className="text-purple-600 font-semibold">5 questions</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="font-medium text-gray-700">Menstrual Health</span>
                    <span className="text-pink-600 font-semibold">7 indicators</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <span className="font-medium text-gray-700">Hormonal Markers</span>
                    <span className="text-indigo-600 font-semibold">6 values</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Women Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users and medical professionals say about ShePredicts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  {testimonial.title && (
                    <div className="text-sm text-purple-600">{testimonial.title}</div>
                  )}
                  {testimonial.age && (
                    <div className="text-sm text-gray-500">Age {testimonial.age}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of women who have already taken the first step towards 
            better reproductive health with our AI-powered assessment.
          </p>
          
          <Link
            to={isLoggedIn ? "/assessment" : "/login"}
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Start Your Assessment Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <p className="text-purple-200 text-sm mt-4">
            Free • Secure • Takes only 10-15 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ShePredicts</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering women's health through AI-powered insights and personalized care.
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2024 ShePredicts. All rights reserved. This platform is for informational purposes only and should not replace professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};