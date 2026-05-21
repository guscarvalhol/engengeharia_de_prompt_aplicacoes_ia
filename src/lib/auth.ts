export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

type AuthState = { user: AuthUser; token: string } | null;

const STORAGE_KEY = 'selfmetrics_auth';

export function getAuthState(): AuthState {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function setAuthState(state: AuthState) {
  if (state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getCurrentUser(): AuthUser | null {
  return getAuthState()?.user ?? null;
}

export async function login(email: string, password: string): Promise<{ user: AuthUser; token: string }> {
  // Simulated login - in production, use Supabase Auth
  const storedUsers = JSON.parse(localStorage.getItem('selfmetrics_users') ?? '{}');
  const user = storedUsers[email];

  if (!user || user.password !== password) {
    throw new Error('Email ou senha inválidos');
  }

  const state = { user: { id: user.id, email: user.email, name: user.name }, token: 'mock_token' };
  setAuthState(state);
  return state;
}

export async function signup(email: string, password: string, name: string): Promise<{ user: AuthUser; token: string }> {
  const storedUsers = JSON.parse(localStorage.getItem('selfmetrics_users') ?? '{}');

  if (storedUsers[email]) {
    throw new Error('Email já cadastrado');
  }

  const id = crypto.randomUUID();
  storedUsers[email] = { id, email, password, name };
  localStorage.setItem('selfmetrics_users', JSON.stringify(storedUsers));

  const state = { user: { id, email, name }, token: 'mock_token' };
  setAuthState(state);
  return state;
}

export function logout() {
  setAuthState(null);
}
