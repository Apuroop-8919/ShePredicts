import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, AlertCircle, CheckCircle, FileText, Download } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { useUser } from '../context/UserContext';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, assessmentHistory, isLoggedIn } = useUser();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRiskLevel = (confidence: number) => {
    if (confidence >= 70) return { level: 'High', color: 'red', bgColor: 'red-50', borderColor: 'red-200' };
    if (confidence >= 40) return { level: 'Moderate', color: 'yellow', bgColor: 'yellow-50', borderColor: 'yellow-200' };
    return { level: 'Low', color: 'green', bgColor: 'green-50', borderColor: 'green-200' };
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Assessment History</h1>
          <p className="text-xl text-gray-600">
            Track your health journey and monitor changes over time
          </p>
        </div>

        {assessmentHistory.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-3xl mb-6">
              <FileText className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Assessments Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't completed any health assessments yet. Take your first assessment to start tracking your health journey.
            </p>
            <button
              onClick={() => navigate('/assessment')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Take Your First Assessment
            </button>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                    <p className="text-3xl font-bold text-gray-900">{assessmentHistory.length}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Latest Risk Score</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {assessmentHistory.length > 0 ? `${assessmentHistory[0].prediction.confidence.toFixed(0)}%` : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Risk Results</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {assessmentHistory.filter(a => a.prediction.confidence >= 70).length}
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-xl">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Low Risk Results</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {assessmentHistory.filter(a => a.prediction.confidence < 40).length}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment History List */}
            <div className="space-y-6">
              {assessmentHistory.map((assessment) => {
                const risk = getRiskLevel(assessment.prediction.confidence);
                return (
                  <div key={assessment.id} className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-purple-100 p-3 rounded-xl">
                            <Calendar className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              Assessment #{assessment.id.slice(-6)}
                            </h3>
                            <p className="text-gray-600">{formatDate(assessment.date)}</p>
                          </div>
                        </div>
                        
                        <div className={`px-4 py-2 rounded-full border bg-${risk.bgColor} border-${risk.borderColor}`}>
                          <span className={`text-${risk.color}-800 font-medium text-sm`}>
                            {risk.level} Risk ({assessment.prediction.confidence.toFixed(1)}%)
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-purple-50 rounded-xl p-4">
                          <h4 className="font-semibold text-purple-900 mb-2">Physical Symptoms</h4>
                          <p className="text-purple-700">
                            {Object.values(assessment.assessmentData.physicalSymptoms).filter(Boolean).length} of 5 present
                          </p>
                        </div>

                        <div className="bg-pink-50 rounded-xl p-4">
                          <h4 className="font-semibold text-pink-900 mb-2">Menstrual Health</h4>
                          <p className="text-pink-700">
                            {assessment.assessmentData.menstrualHealth.cycleRegularity} cycle, 
                            {assessment.assessmentData.menstrualHealth.cycleLength} days
                          </p>
                        </div>

                        <div className="bg-indigo-50 rounded-xl p-4">
                          <h4 className="font-semibold text-indigo-900 mb-2">Key Indicators</h4>
                          <p className="text-indigo-700">
                            BMI: {assessment.assessmentData.hormonalIndicators.bmi.toFixed(1)}, 
                            AMH: {assessment.assessmentData.hormonalIndicators.amh.toFixed(1)}
                          </p>
                        </div>
                      </div>

                      {assessment.prediction.riskFactors.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Risk Factors Identified:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {assessment.prediction.riskFactors.slice(0, 4).map((factor, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-gray-700">{factor}</span>
                              </div>
                            ))}
                          </div>
                          {assessment.prediction.riskFactors.length > 4 && (
                            <p className="text-sm text-gray-500 mt-2">
                              +{assessment.prediction.riskFactors.length - 4} more factors
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                          Assessment completed on {formatDate(assessment.date)}
                        </div>
                        <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors">
                          <Download className="h-4 w-4" />
                          <span>Download Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/assessment')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 mr-4"
              >
                Take New Assessment
              </button>
              <button className="border-2 border-purple-300 text-purple-700 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all">
                Export All Data
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};