import React from 'react';
import { ChevronLeft, AlertCircle, CheckCircle, Calendar, FileText, Heart, Brain, TrendingUp } from 'lucide-react';
import { UserData, AssessmentData } from '../../App';
import { useUser } from '../../context/UserContext';
import { predictPCOS, convertAssessmentToModelInput } from '../../utils/pcosModel';

interface ResultsStepProps {
  userData: UserData;
  assessmentData: AssessmentData;
  onRestart: () => void;
  onPrevious: () => void;
}

export const ResultsStep: React.FC<ResultsStepProps> = ({ 
  userData, 
  assessmentData, 
  onRestart, 
  onPrevious 
}) => {
  const { assessmentHistory } = useUser();
  
  // Get prediction using ML model
  const modelInput = convertAssessmentToModelInput(assessmentData);
  const prediction = predictPCOS(modelInput);

  const getRiskLevel = () => {
    if (prediction.confidence >= 70) return { level: 'High', color: 'red', bgColor: 'red-50', borderColor: 'red-200' };
    if (prediction.confidence >= 40) return { level: 'Moderate', color: 'orange', bgColor: 'orange-50', borderColor: 'orange-200' };
    return { level: 'Low', color: 'green', bgColor: 'green-50', borderColor: 'green-200' };
  };

  const risk = getRiskLevel();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Assessment Results</h2>
          <p className="text-gray-600 text-lg">
            Based on advanced machine learning analysis of your health data
          </p>
        </div>

        {/* Main Risk Assessment Card */}
        <div className={`border-2 rounded-2xl p-8 mb-8 bg-${risk.bgColor} border-${risk.borderColor}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {prediction.hasPCOS ? (
                <AlertCircle className={`h-12 w-12 text-${risk.color}-600`} />
              ) : (
                <CheckCircle className={`h-12 w-12 text-${risk.color}-600`} />
              )}
              <div>
                <h3 className={`text-2xl font-bold text-${risk.color}-900`}>
                  {prediction.hasPCOS ? 'Elevated PCOS Risk Detected' : 'Low PCOS Risk'}
                </h3>
                <p className={`text-${risk.color}-700 text-lg`}>
                  AI Confidence: {prediction.confidence.toFixed(1)}% • Risk Score: {prediction.riskScore.toFixed(1)}/100
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-4xl font-bold text-${risk.color}-800`}>
                {risk.level}
              </div>
              <div className={`text-sm text-${risk.color}-600`}>Risk Level</div>
            </div>
          </div>
          
          <p className={`text-lg mb-6 text-${risk.color}-800`}>
            {prediction.hasPCOS 
              ? 'Our AI model has identified several risk factors associated with PCOS. We strongly recommend consulting with a healthcare professional for comprehensive evaluation and proper diagnosis.'
              : 'Our AI analysis indicates a low likelihood of PCOS based on your current health profile. Continue maintaining healthy habits and regular medical check-ups.'
            }
          </p>

          {prediction.riskFactors.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className={`font-bold text-${risk.color}-900 mb-4 flex items-center space-x-2`}>
                <TrendingUp className="h-5 w-5" />
                <span>AI-Identified Risk Factors ({prediction.riskFactors.length})</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prediction.riskFactors.map((factor, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 bg-${risk.color}-50 rounded-lg`}>
                    <div className={`w-2 h-2 bg-${risk.color}-500 rounded-full`}></div>
                    <span className={`text-${risk.color}-800 text-sm font-medium`}>{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Heart className="h-6 w-6 text-pink-600" />
            <span>Personalized AI Recommendations</span>
          </h3>
          <div className="grid gap-4">
            {prediction.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center mt-1 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-800 font-medium">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps for High Risk */}
        {prediction.hasPCOS && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-200">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-amber-700" />
              <span>Immediate Action Plan</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-600 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center mt-1">1</div>
                <div>
                  <div className="font-semibold text-amber-900">Schedule Medical Consultation</div>
                  <div className="text-amber-800 text-sm">Book appointment with gynecologist/endocrinologist within 2-4 weeks</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-amber-600 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center mt-1">2</div>
                <div>
                  <div className="font-semibold text-amber-900">Request Comprehensive Testing</div>
                  <div className="text-amber-800 text-sm">Pelvic ultrasound, hormone panel (testosterone, insulin, glucose tolerance)</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-amber-600 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center mt-1">3</div>
                <div>
                  <div className="font-semibold text-amber-900">Prepare Health Documentation</div>
                  <div className="text-amber-800 text-sm">Print this report and maintain symptom diary for your healthcare provider</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessment Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <span>Assessment Summary</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Object.values(assessmentData.physicalSymptoms).filter(Boolean).length}/5
              </div>
              <div className="text-sm font-medium text-gray-700">Physical Symptoms</div>
              <div className="text-xs text-gray-500 mt-1">Present indicators</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-pink-600 mb-1">
                {assessmentData.menstrualHealth.cycleLength}
              </div>
              <div className="text-sm font-medium text-gray-700">Cycle Length</div>
              <div className="text-xs text-gray-500 mt-1">
                {assessmentData.menstrualHealth.cycleRegularity} pattern
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                {assessmentData.hormonalIndicators.bmi.toFixed(1)}
              </div>
              <div className="text-sm font-medium text-gray-700">BMI</div>
              <div className="text-xs text-gray-500 mt-1">
                AMH: {assessmentData.hormonalIndicators.amh.toFixed(1)} ng/mL
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        {assessmentHistory.length > 1 && (
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Your Health Journey</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-700">Previous Assessment</div>
                <div className="text-lg font-semibold text-blue-900">
                  {assessmentHistory[1].prediction.confidence.toFixed(1)}% risk
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl">
                  {prediction.confidence > assessmentHistory[1].prediction.confidence ? '📈' : '📉'}
                </div>
                <div className="text-xs text-blue-600">Trend</div>
              </div>
              <div>
                <div className="text-sm text-blue-700">Current Assessment</div>
                <div className="text-lg font-semibold text-blue-900">
                  {prediction.confidence.toFixed(1)}% risk
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button
            onClick={onPrevious}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Step</span>
          </button>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onRestart}
              className="px-6 py-3 border-2 border-purple-300 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-all"
            >
              Take New Assessment
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Download Report
            </button>
          </div>
        </div>

        {/* Enhanced Medical Disclaimer */}
        <div className="mt-8 p-6 bg-gray-100 rounded-2xl border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-2">Important Medical Disclaimer</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>ShePredicts AI Assessment:</strong> This assessment uses advanced machine learning algorithms 
            trained on medical data to provide risk evaluation. However, it is for informational and educational 
            purposes only and does not constitute medical advice. The AI model has limitations and should not be 
            used as a substitute for professional medical consultation, diagnosis, or treatment. Always seek the 
            advice of qualified healthcare providers regarding any medical condition. The accuracy of AI predictions 
            may vary based on individual circumstances and data quality.
          </p>
        </div>
      </div>
    </div>
  );
};