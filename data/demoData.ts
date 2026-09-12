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

export type FocusMetricIcon = 'clock' | 'coffee' | 'eye' | 'smile' | 'user' | 'info';

export type FocusMetric = {
  id: string;
  label: string;
  value: string;
  caption: string;
  icon: FocusMetricIcon;
  span?: 'full';
};

const focusSessionDurationMinutes = 52;

export const focusSession = {
  durationMinutes: focusSessionDurationMinutes,
  compareLabel: 'Compared with your Quick Vibe Check',
  fatigueNote: "This session has been running for a while, and a few fatigue-related cues have shifted from where you started. It's worth noticing, not a diagnosis.",
  metrics: [
    { id: 'session-length', label: 'Session length', value: `${focusSessionDurationMinutes} min`, caption: 'Since you started', icon: 'clock' },
    { id: 'break-status', label: 'Break status', value: 'No break yet', caption: 'This session', icon: 'coffee' },
    { id: 'blink-rate', label: 'Blink rate', value: '+18%', caption: 'vs your baseline', icon: 'eye' },
    { id: 'yawning', label: 'Yawning', value: '2', caption: 'in this session', icon: 'smile' },
    { id: 'posture-shifts', label: 'Posture shifts', value: '3', caption: 'in this session', icon: 'user' },
    { id: 'eye-strain', label: 'Eye strain', value: 'Slight increase', caption: 'vs your baseline', icon: 'info', span: 'full' },
  ] satisfies FocusMetric[],
};

export const focusSuggestion = {
  title: 'Take a 5-minute break',
  subtitle: 'A short break may help you recharge before things feel overwhelming.',
};

export type RiskTier = 'high' | 'medium' | 'manageable';

export type RiskDimension = {
  id: string;
  label: string;
  value: number;
  tier: RiskTier;
};

export type RiskFactorIcon = 'deadline' | 'brain' | 'sleep' | 'social';

export type RiskFactor = {
  id: string;
  label: string;
  detail: string;
  icon: RiskFactorIcon;
};

export type RiskDeadline = { id: string; date: string; label: string };
export type SleepDay = { day: string; hours: number };
export type RiskTrendPoint = { id: string; label: string; value: number };

export const riskAnalysis = {
  score: 87,
  status: 'High Risk',
  changeLabel: 'Higher than usual',
  caption: 'Your current workload and recovery patterns may be unsustainable if this continues.',
  updatedLabel: 'Updated just now',
  dimensions: [
    { id: 'mental', label: 'Mental', value: 85, tier: 'high' },
    { id: 'time', label: 'Time', value: 72, tier: 'high' },
    { id: 'physical', label: 'Physical', value: 60, tier: 'medium' },
    { id: 'social', label: 'Social', value: 45, tier: 'medium' },
    { id: 'errands', label: 'Errands', value: 30, tier: 'manageable' },
  ] satisfies RiskDimension[],
  factors: [
    { id: 'deadline-compression', label: 'Deadline compression', detail: '3 major deadlines within 5 days', icon: 'deadline' },
    { id: 'mental-workload', label: 'High mental workload', detail: 'Multiple cognitively demanding tasks', icon: 'brain' },
    { id: 'insufficient-recovery', label: 'Insufficient recovery', detail: "You've had fewer than 6 hours of sleep for 3 days", icon: 'sleep' },
    { id: 'increased-commitments', label: 'Increased commitments', detail: 'More social and extracurricular activities this week', icon: 'social' },
  ] satisfies RiskFactor[],
  deadlines: [
    { id: 'marketing-assignment', date: 'Aug 12', label: 'Marketing assignment' },
    { id: 'ux-report', date: 'Aug 14', label: 'UX Report' },
    { id: 'financial-reflection', date: 'Aug 16', label: 'Financial Reflection' },
  ] satisfies RiskDeadline[],
  mentalWorkloadTags: ['Problem solving', 'Long reading', 'Technical work'],
  sleepByDay: [
    { day: 'Mon', hours: 5 },
    { day: 'Tue', hours: 5.5 },
    { day: 'Wed', hours: 4.5 },
    { day: 'Thu', hours: 6 },
    { day: 'Fri', hours: 6.5 },
    { day: 'Sat', hours: 7 },
    { day: 'Sun', hours: 6 },
  ] satisfies SleepDay[],
  recommendedSleepHours: 8,
  commitmentTags: ['Club events', 'Group projects', 'Personal errands'],
  weeklyTrend: [
    { id: 'jul-21', label: 'Jul 21', value: 58 },
    { id: 'jul-28', label: 'Jul 28', value: 66 },
    { id: 'aug-4', label: 'Aug 4', value: 74 },
    { id: 'aug-11', label: 'Aug 11', value: 80 },
    { id: 'current', label: 'Now', value: 87 },
  ] satisfies RiskTrendPoint[],
  keyInsight: 'Your workload and risk have been increasing over the past two weeks, mainly due to deadline compression and reduced recovery time.',
};
