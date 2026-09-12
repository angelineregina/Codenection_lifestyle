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
  status: 'High workload',
  explanation: 'Deadline compression and low recovery are pressing on your capacity today.',
  factors: ['Deadline compression', 'Low recovery time', 'Multiple commitments'],
  estimatedWorkHours: 8.6,
  availableHours: 7,
  metrics: [
    { label: 'Time pressure', value: 'High' },
    { label: 'Cognitive demand', value: 'High' },
    { label: 'Recovery', value: 'Low' },
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

export type WhatIfTask = {
  id: string;
  title: string;
  time: string;
  duration: string;
  durationMinutes: number;
  priority: 'High priority' | 'Medium priority' | 'Lower priority';
};

export const whatIfTasks: WhatIfTask[] = [
  { id: 'fit3143-deep-work', title: 'FIT3143 Deep Work', time: '10:30 AM', duration: '2 hrs', durationMinutes: 120, priority: 'High priority' },
  { id: 'club-meeting-prep', title: 'Club meeting prep', time: '4:00 PM', duration: '60 min', durationMinutes: 60, priority: 'Medium priority' },
  { id: 'assignment-polish', title: 'Assignment polish', time: '6:00 PM', duration: '90 min', durationMinutes: 90, priority: 'Lower priority' },
  { id: 'group-project', title: 'Group project', time: '2:00 PM', duration: '2 hrs', durationMinutes: 120, priority: 'High priority' },
];

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
  baselineLabel: 'Baseline: Quick Vibe Check - 3:05 PM',
  sessionNote: 'A few session cues have changed from your starting point, and this session has been running for a while without a break. This may be a good time to check in and reset.',
  disclaimer: 'These signals support your workload picture and do not determine burnout on their own.',
  metrics: [
    { id: 'session-length', label: 'Session length', value: `${focusSessionDurationMinutes} min`, caption: 'Since you started', icon: 'clock' },
    { id: 'break-status', label: 'Break status', value: 'No break yet', caption: 'This session', icon: 'coffee' },
    { id: 'blink-rate', label: 'Blink rate', value: '+18%', caption: 'vs your baseline', icon: 'eye' },
    { id: 'yawning', label: 'Yawning', value: '2', caption: 'in this session', icon: 'smile' },
    { id: 'posture-shifts', label: 'Posture shifts', value: '3', caption: 'in this session', icon: 'user' },
    { id: 'eye-closure', label: 'Eye closure', value: 'Slight increase', caption: 'vs your baseline', icon: 'info' },
  ] satisfies FocusMetric[],
};

export const focusSuggestion = {
  title: 'Take a 5-minute break',
  subtitle: "You've been studying for 52 minutes without a break. A short reset may help before continuing.",
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
  score: 108,
  status: 'High workload',
  changeLabel: 'Above realistic capacity',
  caption: 'Your workload may be hard to sustain today. Several factors are putting pressure on your available capacity.',
  updatedLabel: 'Based on today\'s demo plan',
  capacity: {
    workloadPercent: 108,
    plannedDemand: '8.6 h',
    availableCapacity: '7.0 h',
    recoveryPlanned: '20 min',
    status: 'High workload',
  },
  dimensions: [
    { id: 'mental', label: 'Mental', value: 88, tier: 'high' },
    { id: 'time', label: 'Time', value: 82, tier: 'high' },
    { id: 'physical', label: 'Physical', value: 54, tier: 'medium' },
    { id: 'social', label: 'Social', value: 41, tier: 'manageable' },
    { id: 'errands', label: 'Errands', value: 32, tier: 'manageable' },
  ] satisfies RiskDimension[],
  factors: [
    { id: 'deadline-compression', label: 'Deadline compression', detail: '3 important deadlines within 5 days', icon: 'deadline' },
    { id: 'mental-workload', label: 'High mental demand', detail: '4 cognitively demanding tasks today', icon: 'brain' },
    { id: 'insufficient-recovery', label: 'Low recovery', detail: 'Only 20 min of recovery across a long day', icon: 'sleep' },
    { id: 'increased-commitments', label: 'Multiple commitments', detail: 'Study, project, and personal tasks overlap', icon: 'social' },
  ] satisfies RiskFactor[],
  drivers: [
    'FIT3143 deep work — high demand',
    'Group project — medium demand',
    '8.6 h planned vs 7.0 h capacity',
    '20 min recovery planned across an 8.6 h day',
  ],
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
    { id: 'jul-21', label: 'Jul 21', value: 72 },
    { id: 'jul-28', label: 'Jul 28', value: 80 },
    { id: 'aug-4', label: 'Aug 4', value: 94 },
    { id: 'aug-11', label: 'Aug 11', value: 102 },
    { id: 'current', label: 'Now', value: 108 },
  ] satisfies RiskTrendPoint[],
  keyInsight: 'Today is being driven by deadline compression, high mental demand, and too little recovery time.',
};
