export const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'incomplete', label: 'Incomplete' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];



export const STATUS_COLORS = {
  Incomplete: 'bg-amber-100 text-amber-700 border-amber-200',
  in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};



export const STATUS_LABELS = {
  Incomplete: 'Incomplete',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}
