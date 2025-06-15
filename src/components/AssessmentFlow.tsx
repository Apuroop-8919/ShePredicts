import React, { useState } from 'react';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserData, AssessmentData, PhysicalSymptoms, MenstrualHealth, HormonalIndicators, AssessmentResult } from '../App';
import { PhysicalSymptomsStep } from './steps/PhysicalSymptomsStep';
import { MenstrualHealthStep } from './steps/MenstrualHealthStep';
import { HormonalIndicatorsStep } from './steps/HormonalIndicatorsStep';
import { ResultsStep } from './steps/ResultsStep';
import { ProgressBar } from './ProgressBar';
import { useUser } from '../context/UserContext';
import { predictPCOS, convertAssessmentToModelInput } from '../utils/pcosModel';

interface AssessmentFlowProps {
  userData: UserData;
}

export const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ userData }) => {
  const { setUser, addAssessmentResult } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({});

  const steps = [
    { id: 1, title: 'Physical Symptoms', description: 'Basic physical indicators' },
    { id: 2, title: 'Menstrual Health', description: 'Cycle and reproductive health' },
    { id: 3, title: 'Hormonal Indicators', description: 'Laboratory values and ratios' },
    { id: 4, title: 'Results', description: 'AI-powered assessment results' }
  ];

  const handleLogout = () => {
    setUser(null);
  };

  const handlePhysicalSymptomsComplete = (data: PhysicalSymptoms) => {
    setAssessmentData(prev => ({ ...prev, physicalSymptoms: data }));
    setCurrentStep(2);
  };

  const handleMenstrualHealthComplete = (data: MenstrualHealth) => {
    setAssessmentData(prev => ({ ...prev, menstrualHealth: data }));
    setCurrentStep(3);
  };

  const handleHormonalIndicatorsComplete = (data: HormonalIndicators) => {
    const completeAssessmentData = { 
      ...assessmentData, 
      hormonalIndicators: data 
    } as AssessmentData;
    
    setAssessmentData(completeAssessmentData);
    
    // Generate prediction using ML model
    const modelInput = convertAssessmentToModelInput(completeAssessmentData);
    const prediction = predictPCOS(modelInput);
    
    // Save assessment result
    const assessmentResult: AssessmentResult = {
      id: `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      userData,
      assessmentData: completeAssessmentData,
      prediction: {
        hasPCOS: prediction.hasPCOS,
        confidence: prediction.confidence,
        riskScore: prediction.riskScore,
        riskFactors: prediction.riskFactors
      }
    };
    
    addAssessmentResult(assessmentResult);
    setCurrentStep(4);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestartAssessment = () => {
    setCurrentStep(1);
    setAssessmentData({});
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PhysicalSymptomsStep
            initialData={assessmentData.physicalSymptoms}
            onComplete={handlePhysicalSymptomsComplete}
          />
        );
      case 2:
        return (
          <MenstrualHealthStep
            initialData={assessmentData.menstrualHealth}
            onComplete={handleMenstrualHealthComplete}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <HormonalIndicatorsStep
            initialData={assessmentData.hormonalIndicators}
            onComplete={handleHormonalIndicatorsComplete}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <ResultsStep
            userData={userData}
            assessmentData={assessmentData as AssessmentData}
            onRestart={handleRestartAssessment}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                ShePredicts Assessment
              </h1>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Welcome, {userData.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {renderStep()}
      </div>
    </div>
  );
};