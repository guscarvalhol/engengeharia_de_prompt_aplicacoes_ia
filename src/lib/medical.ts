export type MedicalRecord = {
  id: string;
  userId: string;
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

const STORAGE_KEY = 'selfmetrics_records';

export function getRecords(userId: string): MedicalRecord[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  const records: MedicalRecord[] = stored ? JSON.parse(stored) : [];
  return records.filter(r => r.userId === userId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function saveRecord(userId: string, record: Omit<MedicalRecord, 'id' | 'userId' | 'created_at'>): MedicalRecord {
  const stored = localStorage.getItem(STORAGE_KEY);
  const records: MedicalRecord[] = stored ? JSON.parse(stored) : [];

  const newRecord: MedicalRecord = {
    ...record,
    id: crypto.randomUUID(),
    userId,
    created_at: new Date().toISOString(),
  };

  records.push(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return newRecord;
}

export function getRecordById(id: string): MedicalRecord | undefined {
  const stored = localStorage.getItem(STORAGE_KEY);
  const records: MedicalRecord[] = stored ? JSON.parse(stored) : [];
  return records.find(r => r.id === id);
}

export function getRecordsInRange(userId: string, days: number): MedicalRecord[] {
  const records = getRecords(userId);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  return records.filter(r => new Date(r.created_at) >= cutoff);
}
