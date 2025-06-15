import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { MenstrualHealth } from '../../App';

interface MenstrualHealthStepProps {
  initialData?: MenstrualHealth;
  onComplete: (data: MenstrualHealth) => void;
  onPrevious: () => void;
}

export const MenstrualHealthStep: React.FC<MenstrualHealthStepProps> = ({ 
  initialData, 
  onComplete, 
  onPrevious 
}) => {
  const [data, setData] = useState<MenstrualHealth>(
    initialData || {
      cycleRegularity: 'regular',
      cycleLength: 28,
      follicleLeft: 0,
      follicleRight: 0,
      avgFollicleSizeLeft: 0,
      avgFollicleSizeRight: 0,
      endometriumThickness: 0
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

    if (data.cycleLength < 10 || data.cycleLength > 90) {
      newErrors.cycleLength = 'Cycle length should be between 10-90 days';
    }

    if (data.follicleLeft < 0 || data.follicleLeft > 50) {
      newErrors.follicleLeft = 'Follicle count should be between 0-50';
    }

    if (data.follicleRight < 0 || data.follicleRight > 50) {
      newErrors.follicleRight = 'Follicle count should be between 0-50';
    }

    if (data.avgFollicleSizeLeft < 0 || data.avgFollicleSizeLeft > 50) {
      newErrors.avgFollicleSizeLeft = 'Follicle size should be between 0-50mm';
    }

    if (data.avgFollicleSizeRight < 0 || data.avgFollicleSizeRight > 50) {
      newErrors.avgFollicleSizeRight = 'Follicle size should be between 0-50mm';
    }

    if (data.endometriumThickness < 0 || data.endometriumThickness > 30) {
      newErrors.endometriumThickness = 'Endometrium thickness should be between 0-30mm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof MenstrualHealth, value: string | number) => {
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
    cycleLength: 'The number of days from the first day of one period to the first day of the next period',
    follicleLeft: 'Number of follicles (small fluid-filled sacs) visible in the left ovary during ultrasound',
    follicleRight: 'Number of follicles visible in the right ovary during ultrasound',
    avgFollicleSizeLeft: 'Average diameter of follicles in the left ovary (in millimeters)',
    avgFollicleSizeRight: 'Average diameter of follicles in the right ovary (in millimeters)',
    endometriumThickness: 'Thickness of the uterine lining measured during ultrasound (in millimeters)'
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Menstrual Health Assessment</h2>
          <p className="text-gray-600 text-lg">
            Please provide information about your menstrual cycle and reproductive health.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Cycle Regularity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menstrual Cycle Regularity
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['regular', 'irregular'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange('cycleRegularity', option as 'regular' | 'irregular')}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    data.cycleRegularity === option
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{option}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {option === 'regular' 
                      ? 'Periods come at predictable intervals' 
                      : 'Periods are unpredictable or infrequent'
                    }
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cycle Length */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Cycle Length (days)
              </label>
              <button
                onClick={() => toggleTooltip('cycleLength')}
                className="text-gray-400 hover:text-gray-600"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            {showTooltips.cycleLength && (
              <p className="text-sm text-gray-600 mb-3 bg-blue-50 p-3 rounded border">
                {tooltipContent.cycleLength}
              </p>
            )}
            <input
              type="number"
              value={data.cycleLength}
              onChange={(e) => handleInputChange('cycleLength', parseInt(e.target.value) || 0)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cycleLength ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="e.g., 28"
              min="10"
              max="90"
            />
            {errors.cycleLength && <p className="text-red-500 text-sm mt-1">{errors.cycleLength}</p>}
          </div>

          {/* Follicle Counts */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Follicle Count (Left Ovary)
                </label>
                <button
                  onClick={() => toggleTooltip('follicleLeft')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
              {showTooltips.follicleLeft && (
                <p className="text-sm text-gray-600 mb-3 bg-blue-50 p-3 rounded border">
                  {tooltipContent.follicleLeft}
                </p>
              )}
              <input
                type="number"
                value={data.follicleLeft}
                onChange={(e) => handleInputChange('follicleLeft', parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.follicleLeft ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., 8"
                min="0"
                max="50"
              />
              {errors.follicleLeft && <p className="text-red-500 text-sm mt-1">{errors.follicleLeft}</p>}
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Follicle Count (Right Ovary)
                </label>
                <button
                  onClick={() => toggleTooltip('follicleRight')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
              {showTooltips.follicleRight && (
                <p className="text-sm text-gray-600 mb-3 bg-blue-50 p-3 rounded border">
                  {tooltipContent.follicleRight}
                </p>
              )}
              <input
                type="number"
                value={data.follicleRight}
                onChange={(e) => handleInputChange('follicleRight', parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.follicleRight ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., 10"
                min="0"
                max="50"
              />
              {errors.follicleRight && <p className="text-red-500 text-sm mt-1">{errors.follicleRight}</p>}
            </div>
          </div>

          {/* Average Follicle Sizes */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Avg Follicle Size - Left (mm)
                </label>
                <button
                  onClick={() => toggleTooltip('avgFollicleSizeLeft')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
              {showTooltips.avgFollicleSizeLeft && (
                <p className="text-sm text-gray-600 mb-3 bg-blue-50 p-3 rounded border">
                  {tooltipContent.avgFollicleSizeLeft}
                </p>
              )}
              <input
                type="number"
                step="0.1"
                value={data.avgFollicleSizeLeft}
                onChange={(e) => handleInputChange('avgFollicleSizeLeft', parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.avgFollicleSizeLeft ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., 5.2"
                min="0"
                max="50"
              />
              {errors.avgFollicleSizeLeft && <p className="text-red-500 text-sm mt-1">{errors.avgFollicleSizeLeft}</p>}
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Avg Follicle Size - Right (mm)
                </label>
                <button
                  onClick={() => toggleTooltip('avgFollicleSizeRight')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
              {showTooltips.avgFollicleSizeRight && (
                <p className="text-sm text-gray-600 mb-3 bg-blue-50 p-3 rounded border">
                  {tooltipContent.avgFollicleSizeRight}
                </p>
              )}
              <input
                type="number"
                step="0.1"
                value={data.avgFollicleSizeRight}
                onChange={(e) => handleInputChange('avgFollicleSizeRight', parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.avgFollicleSizeRight ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., 4.8"
                min="0"
                max="50"
              />
              {errors.avgFollicleSizeRight && <p className="text-red-500 text-sm mt-1">{errors.avgFollicleSizeRight}</p>}
            </div>
          </div>

          {/* Endometrium Thickness */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Endometrium Thickness (mm)
              </label>
              <button
                onClick={() => toggleTooltip('endometriumThickness')}
                className="text-gray-400 hover:text-gray-600"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
            {showTooltips.endometriumThickness && (
              <p className="text-sm text-gray-600 mb-3 bg-blue-50 p-3 rounded border">
                {tooltipContent.endometriumThickness}
              </p>
            )}
            <input
              type="number"
              step="0.1"
              value={data.endometriumThickness}
              onChange={(e) => handleInputChange('endometriumThickness', parseFloat(e.target.value) || 0)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.endometriumThickness ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="e.g., 8.5"
              min="0"
              max="30"
            />
            {errors.endometriumThickness && <p className="text-red-500 text-sm mt-1">{errors.endometriumThickness}</p>}
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
            <span>Continue to Hormonal Indicators</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};