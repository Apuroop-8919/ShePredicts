import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { AssessmentFlow } from '../components/AssessmentFlow';
import { useUser } from '../context/UserContext';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <AssessmentFlow userData={user} />
    </div>
  );
};