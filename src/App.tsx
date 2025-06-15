import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { ContactPage } from './pages/ContactPage';
import { HistoryPage } from './pages/HistoryPage';
import { UserProvider } from './context/UserContext';

export interface UserData {
  name: string;
  email: string;
  age: number;
  gender: string;
}

export interface PhysicalSymptoms {
  hairGrowth: boolean;
  hairLoss: boolean;
  skinDarkening: boolean;
  pimples: boolean;
  weightGain: boolean;
}

export interface MenstrualHealth {
  cycleRegularity: 'regular' | 'irregular';
  cycleLength: number;
  follicleLeft: number;
  follicleRight: number;
  avgFollicleSizeLeft: number;
  avgFollicleSizeRight: number;
  endometriumThickness: number;
}

export interface HormonalIndicators {
  bmi: number;
  waistHipRatio: number;
  fshLhRatio: number;
  amh: number;
  prg: number;
  rbs: number;
}

export interface AssessmentData {
  physicalSymptoms: PhysicalSymptoms;
  menstrualHealth: MenstrualHealth;
  hormonalIndicators: HormonalIndicators;
}

export interface AssessmentResult {
  id: string;
  date: string;
  userData: UserData;
  assessmentData: AssessmentData;
  prediction: {
    hasPCOS: boolean;
    confidence: number;
    riskScore: number;
    riskFactors: string[];
  };
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;