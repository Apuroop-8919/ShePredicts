import React, { useState } from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { PhysicalSymptoms } from '../../App';

interface PhysicalSymptomsStepProps {
  initialData?: PhysicalSymptoms;
  onComplete: (data: PhysicalSymptoms) => void;
}

const symptoms = [
  {
    key: 'hairGrowth' as keyof PhysicalSymptoms,
    label: 'Excessive Hair Growth',
    description: 'Unwanted hair growth on face, chest, back, or other areas (hirsutism)',
    icon: '🦱'
  },
  {
    key: 'hairLoss' as keyof PhysicalSymptoms,
    label: 'Hair Loss/Thinning',
    description: 'Thinning hair or male-pattern baldness on the scalp',
    icon: '💇‍♀️'
  },
  {
    key: 'skinDarkening' as keyof PhysicalSymptoms,
    label: 'Skin Darkening',
    description: 'Dark patches of skin, especially around neck, armpits, or groin (acanthosis nigricans)',
    icon: '🔷'
  },
  {
    key: 'pimples' as keyof PhysicalSymptoms,
    label: 'Acne/Pimples',
    description: 'Persistent acne, especially on face, chest, or back',
    icon: '🔴'
  },
  {
    key: 'weightGain' as keyof PhysicalSymptoms,
    label: 'Weight Gain',
    description: 'Unexplained weight gain or difficulty losing weight',
    icon: '⚖️'
  }
];

export const PhysicalSymptomsStep: React.FC<PhysicalSymptomsStepProps> = ({ 
  initialData, 
  onComplete 
}) => {
  const [symptoms_data, setSymptomsData] = useState<PhysicalSymptoms>(
    initialData || {
      hairGrowth: false,
      hairLoss: false,
      skinDarkening: false,
      pimples: false,
      weightGain: false
    }
  );

  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleToggle = (symptom: keyof PhysicalSymptoms) => {
    setSymptomsData(prev => ({
      ...prev,
      [symptom]: !prev[symptom]
    }));
  };

  const handleSubmit = () => {
    onComplete(symptoms_data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Physical Symptoms Assessment</h2>
          <p className="text-gray-600 text-lg">
            Please indicate if you've experienced any of the following symptoms in the past 6 months.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {symptoms.map((symptom) => (
            <div 
              key={symptom.key}
              className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                symptoms_data[symptom.key] 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleToggle(symptom.key)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-2xl">{symptom.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {symptom.label}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTooltip(showTooltip === symptom.key ? null : symptom.key);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </button>
                    </div>
                    {showTooltip === symptom.key && (
                      <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded border">
                        {symptom.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-medium ${
                    symptoms_data[symptom.key] ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {symptoms_data[symptom.key] ? 'Yes' : 'No'}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    symptoms_data[symptom.key] 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {symptoms_data[symptom.key] && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <span>Continue to Menstrual Health</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};