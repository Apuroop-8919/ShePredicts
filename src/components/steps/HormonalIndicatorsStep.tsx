import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { HormonalIndicators } from '../../App';

interface HormonalIndicatorsStepProps {
  initialData?: HormonalIndicators;
  onComplete: (data: HormonalIndicators) => void;
  onPrevious: () => void;
}

export const HormonalIndicatorsStep: React.FC<HormonalIndicatorsStepProps> = ({ 
  initialData, 
  onComplete, 
  onPrevious 
}) => {
  const [data, setData] = useState<HormonalIndicators>(
    initialData || {
      bmi: 0,
      waistHipRatio: 0,
      fshLhRatio: 0,
      amh: 0,
      prg: 0,
      rbs: 0
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTooltips, setShowTooltips] = useState<Record<string, boolean>>({});

  const toggleTooltip = (field: string) => {
    setShowTooltips(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (data.bmi < 10 || data.bmi > 60) {
      newErrors.bmi = 'BMI should be between 10-60';
    }

    if (data.waistHipRatio < 0.5 || data.waistHipRatio > 2.0) {
      newErrors.waistHipRatio = 'Waist:Hip ratio should be between 0.5-2.0';
    }

    if (data.fshLhRatio < 0 || data.fshLhRatio > 10) {
      newErrors.fshLhRatio = 'FSH/LH ratio should be between 0-10';
    }

    if (data.amh < 0 || data.amh > 20) {
      newErrors.amh = 'AMH should be between 0-20 ng/mL';
    }

    if (data.prg < 0 || data.prg > 50) {
      newErrors.prg = 'Progesterone should be between 0-50 ng/mL';
    }

    if (data.rbs < 50 || data.rbs > 500) {
      newErrors.rbs = 'Random Blood Sugar should be between 50-500 mg/dL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof HormonalIndicators, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete(data);
    }
  };

  const tooltipContent = {
    bmi: 'Body Mass Index - calculated as weight (kg) divided by height squared (m²). Normal range: 18.5-24.9',
    waistHipRatio: 'Waist circumference divided by hip circumference. Higher values indicate abdominal obesity',
    fshLhRatio: 'Follicle Stimulating Hormone to Luteinizing Hormone ratio. Important for assessing ovarian function',
    amh: 'Anti-Müllerian Hormone - indicates ovarian reserve and function. Higher levels associated with PCOS',
    prg: 'Progesterone level - important for menstrual cycle regulation and ovulation',
    rbs: 'Random Blood Sugar - blood glucose level taken at any time. Normal: 70-140 mg/dL'
  };

  const indicators = [
    {
      key: 'bmi' as keyof HormonalIndicators,
      label: 'BMI (Body Mass Index)',
      unit: 'kg/m²',
      placeholder: 'e.g., 24.5',
      step: '0.1',
      min: 10,
      max: 60
    },
    {
      key: 'waistHipRatio' as keyof HormonalIndicators,
      label: 'Waist:Hip Ratio',  
      unit: 'ratio',
      placeholder: 'e.g., 0.85',
      step: '0.01',
      min: 0.5,
      max: 2.0
    },
    {
      key: 'fshLhRatio' as keyof HormonalIndicators,
      label: 'FSH/LH Ratio',
      unit: 'ratio',
      placeholder: 'e.g., 1.2',
      step: '0.1',
      min: 0,
      max: 10
    },
    {
      key: 'amh' as keyof HormonalIndicators,
      label: 'AMH (Anti-Müllerian Hormone)',
      unit: 'ng/mL',
      placeholder: 'e.g., 4.2',
      step: '0.1',
      min: 0,
      max: 20
    },
    {
      key: 'prg' as keyof HormonalIndicators,
      label: 'PRG (Progesterone)',
      unit: 'ng/mL',
      placeholder: 'e.g., 1.5',
      step: '0.1',
      min: 0,
      max: 50
    },
    {
      key: 'rbs' as keyof HormonalIndicators,
      label: 'RBS (Random Blood Sugar)',
      unit: 'mg/dL',
      placeholder: 'e.g., 95',
      step: '1',
      min: 50,
      max: 500
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hormonal Indicators Assessment</h2>
          <p className="text-gray-600 text-lg">
            Please provide your latest laboratory values and body measurements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {indicators.map((indicator) => (
            <div key={indicator.key}>
              <div className="flex items-center space-x-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {indicator.label}
                </label>
                <button
                  onClick={() => toggleTooltip(indicator.key)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
              
              {showTooltips[indicator.key] && (
                <p className="text-sm text-gray-600 mb-3 bg-blue-50 p-3 rounded border">
                  {tooltipContent[indicator.key]}
                </p>
              )}

              <div className="relative">
                <input
                  type="number"
                  step={indicator.step}
                  value={data[indicator.key]}
                  onChange={(e) => handleInputChange(indicator.key, parseFloat(e.target.value) || 0)}
                  className={`w-full px-4 py-3 pr-20 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors[indicator.key] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={indicator.placeholder}
                  min={indicator.min}
                  max={indicator.max}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 text-sm">{indicator.unit}</span>
                </div>
              </div>
              
              {errors[indicator.key] && (
                <p className="text-red-500 text-sm mt-1">{errors[indicator.key]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-2">
            <div className="text-yellow-600 mt-0.5">⚠️</div>
            <div>
              <h4 className="text-yellow-800 font-medium mb-1">Important Note</h4>
              <p className="text-yellow-700 text-sm">
                Please ensure all values are from recent laboratory tests (within the last 3 months) for accurate assessment. 
                If you don't have some values, you can enter approximate values or consult with your healthcare provider.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <span>Get Assessment Results</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};