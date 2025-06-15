import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserData, AssessmentResult } from '../App';

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  assessmentHistory: AssessmentResult[];
  addAssessmentResult: (result: AssessmentResult) => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>([]);

  const addAssessmentResult = (result: AssessmentResult) => {
    setAssessmentHistory(prev => [result, ...prev]);
  };

  const isLoggedIn = user !== null;

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      assessmentHistory,
      addAssessmentResult,
      isLoggedIn
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};