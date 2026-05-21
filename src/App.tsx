import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Landing } from './components/Landing';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { MeasurementStepper } from './components/MeasurementStepper';
import { History } from './components/History';
import { Advisor } from './components/Advisor';
import { TechnicalSheet } from './components/TechnicalSheet';
import { getCurrentUser, logout as authLogout } from './lib/auth';
import { getRecords, saveRecord, MedicalRecord } from './lib/medical';
import { calcBMI, calcWHR } from './lib/calculations';

type View = 'landing' | 'login' | 'dashboard' | 'new' | 'history' | 'advisor' | 'sheet';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState(getCurrentUser());
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      setView('landing');
      setLoading(false);
    } else {
      const userRecords = getRecords(user.id);
      setRecords(userRecords);
      setView('dashboard');
      setLoading(false);
    }
  }, [user]);

  function handleAuthSuccess() {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      const userRecords = getRecords(currentUser.id);
      setRecords(userRecords);
      setView('dashboard');
    }
  }

  function handleLogout() {
    authLogout();
    setUser(null);
    setRecords([]);
    setSelectedRecord(null);
    setView('landing');
  }

  async function handleSaveRecord(formData: {
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
  }) {
    if (!user) return;

    const newRecord = saveRecord(user.id, formData);
    setRecords(prev => [newRecord, ...prev]);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setView('dashboard');
    }, 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-700 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Show navbar only when authenticated */}
      {user && <Navbar />}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-gray-950 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg z-50 animate-bounce">
          <span>✓</span> Medição salva com sucesso!
        </div>
      )}

      <main className={`${user ? 'flex-1 pt-16' : 'flex-1'}`}>
        <div className={`${user ? 'max-w-3xl' : ''} mx-auto px-4 sm:px-6 lg:px-8 ${user ? 'py-10' : ''}`}>
          {/* Landing View */}
          {view === 'landing' && (
            <>
              <Landing onGetStarted={() => setView('login')} />
            </>
          )}

          {/* Login View */}
          {view === 'login' && (
            <Login onSuccess={handleAuthSuccess} />
          )}

          {/* Dashboard View */}
          {view === 'dashboard' && user && (
            <Dashboard
              records={records}
              userName={user.name}
              onNewConsult={() => setView('new')}
              onViewHistory={() => setView('history')}
              onViewAdvisor={(record) => {
                setSelectedRecord(record);
                setView('advisor');
              }}
              onViewSheet={(record) => {
                setSelectedRecord(record);
                setView('sheet');
              }}
              onLogout={handleLogout}
            />
          )}

          {/* New Measurement View */}
          {view === 'new' && user && (
            <MeasurementStepper
              onSave={handleSaveRecord}
              onCancel={() => setView('dashboard')}
            />
          )}

          {/* History View */}
          {view === 'history' && user && (
            <History
              records={records}
              onBack={() => setView('dashboard')}
              userId={user.id}
              onViewAdvisor={(record) => {
                setSelectedRecord(record);
                setView('advisor');
              }}
              onViewSheet={(record) => {
                setSelectedRecord(record);
                setView('sheet');
              }}
            />
          )}

          {/* Advisor View */}
          {view === 'advisor' && selectedRecord && (
            <Advisor
              record={selectedRecord}
              onBack={() => setView('dashboard')}
            />
          )}

          {/* Technical Sheet View */}
          {view === 'sheet' && selectedRecord && user && (
            <TechnicalSheet
              record={selectedRecord}
              onBack={() => setView('dashboard')}
              userId={user.id}
            />
          )}
        </div>
      </main>

      {/* Show footer only when authenticated or on landing */}
      {user || view === 'landing' ? <Footer /> : null}
    </div>
  );
}
