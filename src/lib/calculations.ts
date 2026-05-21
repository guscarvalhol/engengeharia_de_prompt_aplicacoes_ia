export function calcBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function calcWHR(waistCm: number, hipCm: number): number {
  return waistCm / hipCm;
}

export type BMICategory = {
  label: string;
  color: string;
  bg: string;
};

export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return { label: 'Abaixo do Peso', color: 'text-blue-400', bg: 'bg-blue-400/20 border-blue-400/40' };
  if (bmi < 25) return { label: 'Peso Normal', color: 'text-emerald-400', bg: 'bg-emerald-400/20 border-emerald-400/40' };
  if (bmi < 30) return { label: 'Sobrepeso', color: 'text-yellow-400', bg: 'bg-yellow-400/20 border-yellow-400/40' };
  if (bmi < 35) return { label: 'Obesidade Grau I', color: 'text-orange-400', bg: 'bg-orange-400/20 border-orange-400/40' };
  if (bmi < 40) return { label: 'Obesidade Grau II', color: 'text-red-400', bg: 'bg-red-400/20 border-red-400/40' };
  return { label: 'Obesidade Grau III', color: 'text-red-600', bg: 'bg-red-600/20 border-red-600/40' };
}

export type WHRCategory = {
  label: string;
  color: string;
  bg: string;
};

export function getWHRCategory(whr: number, isMale: boolean): WHRCategory {
  const low = isMale ? 0.9 : 0.8;
  const high = isMale ? 1.0 : 0.85;
  if (whr < low) return { label: 'Baixo Risco', color: 'text-emerald-400', bg: 'bg-emerald-400/20 border-emerald-400/40' };
  if (whr < high) return { label: 'Risco Moderado', color: 'text-yellow-400', bg: 'bg-yellow-400/20 border-yellow-400/40' };
  return { label: 'Alto Risco', color: 'text-red-400', bg: 'bg-red-400/20 border-red-400/40' };
}

export type MedicalRecord = {
  id: string;
  userId?: string;
  weight_kg: number;
  height_cm: number;
  neck_cm: number | null;
  chest_cm: number | null;
  waist_cm: number | null;
  hip_cm: number | null;
  bicep_cm: number | null;
  thigh_cm: number | null;
  bmi: number;
  whr: number | null;
  created_at: string;
};
