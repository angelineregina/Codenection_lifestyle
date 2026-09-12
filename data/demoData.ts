export type ScheduleIcon =
  | 'strategy'
  | 'focus'
  | 'recovery'
  | 'client'
  | 'health'
  | 'planning'
  | 'reset';

export type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  duration: string;
  category: string;
  icon: ScheduleIcon;
  completed: boolean;
};

export const user = {
  name: 'See Eng',
  greeting: 'Good afternoon',
  subtitle: "You're doing great. Progress counts.",
};

export const energy = {
  score: 78,
  label: 'Good energy',
  caption: "You're in a healthy range. Keep going!",
};

export const weeklyCapacity = {
  score: 62,
  values: [46, 58, 68, 74, 62, 38, 34],
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
};

export const schedule: ScheduleItem[] = [
  { id: 'strategy-sync', time: '9:00 AM', title: 'Strategy sync', duration: '30 min · Work', category: 'Work', icon: 'strategy', completed: true },
  { id: 'deep-work', time: '10:30 AM', title: 'Deep work block', duration: '2 hr · Focus', category: 'Focus', icon: 'focus', completed: false },
  { id: 'recovery-break', time: '1:00 PM', title: 'Recovery break', duration: '30 min · Recovery', category: 'Recovery', icon: 'recovery', completed: false },
  { id: 'client-proposals', time: '3:00 PM', title: 'Client proposals', duration: '1 hr · Work', category: 'Work', icon: 'client', completed: false },
  { id: 'workout', time: '4:30 PM', title: 'Workout', duration: '45 min · Health', category: 'Health', icon: 'health', completed: false },
  { id: 'tomorrow-plan', time: '6:00 PM', title: 'Plan tomorrow', duration: '15 min · Planning', category: 'Planning', icon: 'planning', completed: false },
  { id: 'evening-reset', time: '8:30 PM', title: 'Evening reset', duration: '30 min · Recovery', category: 'Recovery', icon: 'reset', completed: false },
];

export const moodTrend = [
  { day: 'Mon', value: 6 },
  { day: 'Tue', value: 5 },
  { day: 'Wed', value: 7 },
  { day: 'Thu', value: 8 },
  { day: 'Fri', value: 6 },
  { day: 'Sat', value: 5 },
  { day: 'Sun', value: 7 },
];

export const workloadSustainability = {
  status: 'Low Risk',
  explanation: 'Your current workload fits within your available capacity.',
  factors: ['Good sleep routine', 'Balanced workload', 'Stable recovery'],
  estimatedWorkHours: 8,
  availableHours: 12,
  metrics: [
    { label: 'Time pressure', value: 'Low' },
    { label: 'Cognitive demand', value: 'Moderate' },
    { label: 'Recovery', value: 'Good' },
  ],
};

export const smartSuggestion = {
  title: 'Take a 30-minute recovery break',
  subtitle: 'A short break can restore focus and keep your day manageable.',
  details: [
    'Add a 30-minute recovery break at 1:00 PM',
    'Keep your high-priority tasks unchanged',
    'Preserve your evening recovery time',
  ],
};
