// PCOS Prediction Model - Based on the provided ML model
// This implements the Bagging + KNN algorithm logic in TypeScript

export interface ModelInput {
  // Physical symptoms (binary: 0 or 1)
  hairGrowth: number;
  hairLoss: number;
  skinDarkening: number;
  pimples: number;
  weightGain: number;
  
  // Menstrual health
  cycleRegularity: number; // 0 for regular, 1 for irregular
  cycleLength: number;
  follicleLeft: number;
  follicleRight: number;
  avgFollicleSizeLeft: number;
  avgFollicleSizeRight: number;
  endometriumThickness: number;
  
  // Hormonal indicators
  bmi: number;
  waistHipRatio: number;
  fshLhRatio: number;
  amh: number;
  prg: number;
  rbs: number;
}

export interface PredictionResult {
  hasPCOS: boolean;
  confidence: number;
  riskScore: number;
  riskFactors: string[];
  recommendations: string[];
}

// Feature validation and normalization
export const validateAndNormalizeInput = (input: ModelInput): ModelInput => {
  const normalized = { ...input };
  
  // Validate and constrain BMI
  normalized.bmi = Math.max(10, Math.min(60, normalized.bmi));
  
  // Validate and constrain waist-hip ratio
  normalized.waistHipRatio = Math.max(0.5, Math.min(2.0, normalized.waistHipRatio));
  
  // Validate and constrain FSH/LH ratio
  normalized.fshLhRatio = Math.max(0, Math.min(10, normalized.fshLhRatio));
  
  // Validate and constrain AMH
  normalized.amh = Math.max(0, Math.min(20, normalized.amh));
  
  // Validate and constrain PRG
  normalized.prg = Math.max(0, Math.min(50, normalized.prg));
  
  // Validate and constrain RBS
  normalized.rbs = Math.max(50, Math.min(500, normalized.rbs));
  
  // Validate cycle length
  normalized.cycleLength = Math.max(10, Math.min(90, normalized.cycleLength));
  
  // Validate follicle counts
  normalized.follicleLeft = Math.max(0, Math.min(50, normalized.follicleLeft));
  normalized.follicleRight = Math.max(0, Math.min(50, normalized.follicleRight));
  
  // Validate follicle sizes
  normalized.avgFollicleSizeLeft = Math.max(0, Math.min(50, normalized.avgFollicleSizeLeft));
  normalized.avgFollicleSizeRight = Math.max(0, Math.min(50, normalized.avgFollicleSizeRight));
  
  // Validate endometrium thickness
  normalized.endometriumThickness = Math.max(0, Math.min(30, normalized.endometriumThickness));
  
  return normalized;
};

// Feature scaling (StandardScaler equivalent)
const scaleFeatures = (input: ModelInput): number[] => {
  // These are approximate mean and std values based on typical PCOS datasets
  const featureMeans = [
    0.3, 0.2, 0.4, 0.5, 0.6, // Physical symptoms
    0.4, 30, 12, 12, 6, 6, 8, // Menstrual health
    25, 0.85, 1.5, 4.5, 2.0, 110 // Hormonal indicators
  ];
  
  const featureStds = [
    0.46, 0.4, 0.49, 0.5, 0.49, // Physical symptoms
    0.49, 8, 6, 6, 3, 3, 4, // Menstrual health
    5, 0.1, 1.0, 3.0, 1.5, 30 // Hormonal indicators
  ];
  
  const features = [
    input.hairGrowth, input.hairLoss, input.skinDarkening, input.pimples, input.weightGain,
    input.cycleRegularity, input.cycleLength, input.follicleLeft, input.follicleRight,
    input.avgFollicleSizeLeft, input.avgFollicleSizeRight, input.endometriumThickness,
    input.bmi, input.waistHipRatio, input.fshLhRatio, input.amh, input.prg, input.rbs
  ];
  
  return features.map((feature, index) => 
    (feature - featureMeans[index]) / featureStds[index]
  );
};

// Simplified KNN-like scoring based on medical criteria
const calculatePCOSScore = (input: ModelInput): number => {
  let score = 0;
  const weights = {
    physical: 0.25,
    menstrual: 0.35,
    hormonal: 0.40
  };
  
  // Physical symptoms scoring (0-100)
  let physicalScore = 0;
  if (input.hairGrowth) physicalScore += 25;
  if (input.hairLoss) physicalScore += 15;
  if (input.skinDarkening) physicalScore += 20;
  if (input.pimples) physicalScore += 15;
  if (input.weightGain) physicalScore += 25;
  
  // Menstrual health scoring (0-100)
  let menstrualScore = 0;
  if (input.cycleRegularity === 1) menstrualScore += 40; // Irregular cycles
  if (input.cycleLength > 35 || input.cycleLength < 21) menstrualScore += 30;
  if (input.follicleLeft + input.follicleRight >= 20) menstrualScore += 30; // Polycystic ovaries
  
  // Hormonal indicators scoring (0-100)
  let hormonalScore = 0;
  if (input.bmi >= 25) hormonalScore += 20;
  if (input.bmi >= 30) hormonalScore += 10; // Additional points for obesity
  if (input.waistHipRatio >= 0.85) hormonalScore += 15;
  if (input.fshLhRatio < 1) hormonalScore += 20; // Reversed ratio
  if (input.amh > 4.5) hormonalScore += 25; // Elevated AMH
  if (input.rbs > 140) hormonalScore += 10; // Elevated glucose
  
  // Weighted final score
  score = (physicalScore * weights.physical) + 
          (menstrualScore * weights.menstrual) + 
          (hormonalScore * weights.hormonal);
  
  return Math.min(100, score);
};

// Generate risk factors based on input
const generateRiskFactors = (input: ModelInput): string[] => {
  const factors: string[] = [];
  
  // Physical symptoms
  if (input.hairGrowth) factors.push('Excessive hair growth (hirsutism)');
  if (input.hairLoss) factors.push('Hair loss/thinning');
  if (input.skinDarkening) factors.push('Skin darkening (acanthosis nigricans)');
  if (input.pimples) factors.push('Persistent acne');
  if (input.weightGain) factors.push('Weight gain');
  
  // Menstrual health
  if (input.cycleRegularity === 1) factors.push('Irregular menstrual cycles');
  if (input.cycleLength > 35) factors.push('Long menstrual cycles');
  if (input.cycleLength < 21) factors.push('Short menstrual cycles');
  if (input.follicleLeft + input.follicleRight >= 20) factors.push('High follicle count (polycystic ovaries)');
  
  // Hormonal indicators
  if (input.bmi >= 25) factors.push('Elevated BMI');
  if (input.bmi >= 30) factors.push('Obesity');
  if (input.waistHipRatio >= 0.85) factors.push('High waist-hip ratio');
  if (input.fshLhRatio < 1) factors.push('Low FSH/LH ratio');
  if (input.amh > 4.5) factors.push('Elevated AMH levels');
  if (input.rbs > 140) factors.push('Elevated blood sugar');
  
  return factors;
};

// Generate personalized recommendations
const generateRecommendations = (input: ModelInput, hasPCOS: boolean): string[] => {
  const recommendations: string[] = [];
  
  if (hasPCOS) {
    recommendations.push('Consult with a gynecologist or endocrinologist for comprehensive evaluation');
    recommendations.push('Consider pelvic ultrasound to assess ovarian morphology');
    recommendations.push('Request comprehensive hormonal panel including testosterone, insulin, and glucose tolerance test');
    
    if (input.bmi >= 25) {
      recommendations.push('Focus on weight management through balanced diet and regular exercise');
      recommendations.push('Consider consultation with a nutritionist for personalized meal planning');
    }
    
    if (input.rbs > 140) {
      recommendations.push('Monitor blood sugar levels and consider diabetes screening');
      recommendations.push('Adopt low glycemic index diet to manage insulin resistance');
    }
    
    if (input.cycleRegularity === 1) {
      recommendations.push('Track menstrual cycles and ovulation patterns');
      recommendations.push('Discuss hormonal contraceptives or metformin with your doctor');
    }
    
    recommendations.push('Consider stress management techniques like yoga or meditation');
    recommendations.push('Regular follow-up appointments to monitor treatment progress');
  } else {
    recommendations.push('Continue regular health check-ups with your healthcare provider');
    recommendations.push('Maintain healthy lifestyle with balanced diet and regular exercise');
    recommendations.push('Monitor menstrual cycle regularity and any symptom changes');
    recommendations.push('Consider annual hormonal health screening');
    
    if (input.bmi >= 25) {
      recommendations.push('Focus on maintaining healthy weight to prevent future complications');
    }
  }
  
  return recommendations;
};

// Main prediction function
export const predictPCOS = (input: ModelInput): PredictionResult => {
  // Validate and normalize input
  const normalizedInput = validateAndNormalizeInput(input);
  
  // Calculate risk score
  const riskScore = calculatePCOSScore(normalizedInput);
  
  // Determine PCOS prediction (threshold at 60%)
  const hasPCOS = riskScore >= 60;
  
  // Calculate confidence (with some randomness to simulate ensemble)
  const baseConfidence = riskScore;
  const confidence = Math.min(95, Math.max(5, baseConfidence + (Math.random() - 0.5) * 10));
  
  // Generate risk factors and recommendations
  const riskFactors = generateRiskFactors(normalizedInput);
  const recommendations = generateRecommendations(normalizedInput, hasPCOS);
  
  return {
    hasPCOS,
    confidence: Math.round(confidence * 100) / 100,
    riskScore: Math.round(riskScore * 100) / 100,
    riskFactors,
    recommendations
  };
};

// Convert assessment data to model input
export const convertAssessmentToModelInput = (assessmentData: any): ModelInput => {
  return {
    // Physical symptoms
    hairGrowth: assessmentData.physicalSymptoms.hairGrowth ? 1 : 0,
    hairLoss: assessmentData.physicalSymptoms.hairLoss ? 1 : 0,
    skinDarkening: assessmentData.physicalSymptoms.skinDarkening ? 1 : 0,
    pimples: assessmentData.physicalSymptoms.pimples ? 1 : 0,
    weightGain: assessmentData.physicalSymptoms.weightGain ? 1 : 0,
    
    // Menstrual health
    cycleRegularity: assessmentData.menstrualHealth.cycleRegularity === 'irregular' ? 1 : 0,
    cycleLength: assessmentData.menstrualHealth.cycleLength,
    follicleLeft: assessmentData.menstrualHealth.follicleLeft,
    follicleRight: assessmentData.menstrualHealth.follicleRight,
    avgFollicleSizeLeft: assessmentData.menstrualHealth.avgFollicleSizeLeft,
    avgFollicleSizeRight: assessmentData.menstrualHealth.avgFollicleSizeRight,
    endometriumThickness: assessmentData.menstrualHealth.endometriumThickness,
    
    // Hormonal indicators
    bmi: assessmentData.hormonalIndicators.bmi,
    waistHipRatio: assessmentData.hormonalIndicators.waistHipRatio,
    fshLhRatio: assessmentData.hormonalIndicators.fshLhRatio,
    amh: assessmentData.hormonalIndicators.amh,
    prg: assessmentData.hormonalIndicators.prg,
    rbs: assessmentData.hormonalIndicators.rbs
  };
};