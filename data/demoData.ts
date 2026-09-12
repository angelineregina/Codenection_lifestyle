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

export type CommitmentPriority = 'High' | 'Medium' | 'Low';
export type CommitmentDate = 'Today' | 'Tomorrow' | 'This week';
export type AssessedCommitment = {
  id: string;
  title: string;
  date: CommitmentDate;
  durationMinutes: number;
  durationLabel: string;
  priority: CommitmentPriority;
  mentalDemand: number;
  physicalDemand: number;
  socialDemand: number;
  errandsDemand: number;
  canMove: boolean;
};

export type NewCommitment = Omit<AssessedCommitment, 'id'>;

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

export type WorkloadSnapshot = {
  workloadPercent: number;
  plannedDemand: string;
  availableCapacity: string;
  recoveryPlanned: string;
  status: string;
  explanation: string;
  factors: string[];
  drivers: string[];
  dimensions: RiskDimension[];
};

function clampWorkloadValue(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function calculateWorkloadSnapshot(commitments: AssessedCommitment[]): WorkloadSnapshot {
  const availableCapacityHours = 7;
  const baseDemandHours = 8.6;
  const baseWorkloadPercent = 108;
  const addedHours = commitments.reduce((total, commitment) => total + commitment.durationMinutes / 60, 0);
  const plannedDemandHours = baseDemandHours + addedHours;
  const workloadPercent = Math.round(baseWorkloadPercent + (addedHours / availableCapacityHours) * 100);
  const getDimensionValue = (key: 'mentalDemand' | 'physicalDemand' | 'socialDemand' | 'errandsDemand', baseValue: number) => {
    const pressure = commitments.reduce((total, commitment) => total + (commitment[key] - 3) * commitment.durationMinutes, 0);
    return clampWorkloadValue(baseValue + (pressure / (availableCapacityHours * 60)) * 18);
  };
  const dimensions: RiskDimension[] = [
    { id: 'mental', label: 'Mental', value: getDimensionValue('mentalDemand', 88), tier: 'high' },
    { id: 'time', label: 'Time', value: clampWorkloadValue(82 + (addedHours / availableCapacityHours) * 100), tier: 'high' },
    { id: 'physical', label: 'Physical', value: getDimensionValue('physicalDemand', 54), tier: 'medium' },
    { id: 'social', label: 'Social', value: getDimensionValue('socialDemand', 41), tier: 'manageable' },
    { id: 'errands', label: 'Errands', value: getDimensionValue('errandsDemand', 32), tier: 'manageable' },
  ];
  const hasCommitments = commitments.length > 0;
  const status = workloadPercent >= 100 ? 'High workload' : workloadPercent >= 85 ? 'Moderate workload' : 'Manageable workload';
  const factors = hasCommitments ? [
    workloadSustainability.factors[0],
    `${commitments.length} added commitment${commitments.length === 1 ? '' : 's'}`,
    `${plannedDemandHours.toFixed(1)} h planned demand`,
  ] : workloadSustainability.factors;
  const drivers = hasCommitments ? [
    ...riskAnalysis.drivers.slice(0, 1),
    `Added: ${commitments.map((commitment) => commitment.title).join(', ')}`,
    `${plannedDemandHours.toFixed(1)} h planned vs ${availableCapacityHours.toFixed(1)} h capacity`,
    riskAnalysis.drivers[3],
  ] : riskAnalysis.drivers;

  return {
    workloadPercent,
    plannedDemand: `${plannedDemandHours.toFixed(1)} h`,
    availableCapacity: `${availableCapacityHours.toFixed(1)} h`,
    recoveryPlanned: riskAnalysis.capacity.recoveryPlanned,
    status,
    explanation: hasCommitments ? `${commitments.length} added commitment${commitments.length === 1 ? '' : 's'} now contribute ${addedHours.toFixed(1)} h to today's planned demand.` : workloadSustainability.explanation,
    factors,
    drivers,
    dimensions,
  };
}

export type InsightTrendPoint = { label: string; value: number };
export type RecoveryTrendPoint = { label: string; minutes: number };
export type InsightDimension = { id: string; label: string; value: number };

export const weeklyInsights = {
  period: 'Mon 7 Sep - Sun 13 Sep',
  workloadTrend: [
    { label: 'Mon', value: 78 },
    { label: 'Tue', value: 86 },
    { label: 'Wed', value: 92 },
    { label: 'Thu', value: 108 },
    { label: 'Fri', value: 96 },
    { label: 'Sat', value: 72 },
    { label: 'Sun', value: 68 },
  ] satisfies InsightTrendPoint[],
  moodTrend,
  stressTrend: [
    { day: 'Mon', value: 4 },
    { day: 'Tue', value: 5 },
    { day: 'Wed', value: 6 },
    { day: 'Thu', value: 8 },
    { day: 'Fri', value: 6 },
    { day: 'Sat', value: 4 },
    { day: 'Sun', value: 3 },
  ],
  recoveryTrend: [
    { label: 'Mon', minutes: 35 },
    { label: 'Tue', minutes: 40 },
    { label: 'Wed', minutes: 55 },
    { label: 'Thu', minutes: 20 },
    { label: 'Fri', minutes: 45 },
    { label: 'Sat', minutes: 80 },
    { label: 'Sun', minutes: 90 },
  ] satisfies RecoveryTrendPoint[],
  dimensions: [
    { id: 'mental', label: 'Mental', value: 78 },
    { id: 'time', label: 'Time', value: 74 },
    { id: 'physical', label: 'Physical', value: 48 },
    { id: 'social', label: 'Social', value: 42 },
    { id: 'errands', label: 'Errands', value: 35 },
  ] satisfies InsightDimension[],
  workloadTakeaway: 'Workload peaked on Thursday when several deadlines overlapped.',
  recoveryTakeaway: 'Your lowest recovery time occurred on the same day as your highest workload.',
  weeklyTakeaway: 'Your workload became less sustainable when deadline pressure increased and recovery time dropped. Protecting even one recovery block helped your later days feel more manageable.',
};

export type FriendStatus = 'focused' | 'on-a-break' | 'in-class' | 'offline';
export type AvatarTone = 'blue' | 'violet' | 'mint' | 'orange';
export type FriendActivity = { task: string; timeRange: string };
export type FriendUpdate = { id: string; text: string; timeAgo: string };

export type Friend = {
  id: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  status: FriendStatus;
  statusDuration: string;
  lastSeen: string;
  streakDays: number;
  moodDelta: string;
  focusMinutesToday: number;
  activity: FriendActivity | null;
  statusQuote: string;
  updates: FriendUpdate[];
};

export const friendStatusLabels: Record<FriendStatus, string> = {
  focused: 'Focused',
  'on-a-break': 'On a break',
  'in-class': 'In class',
  offline: 'Offline',
};

export const friends: Friend[] = [
  {
    id: 'jia-en',
    name: 'Jia En',
    initials: 'JE',
    tone: 'blue',
    status: 'focused',
    statusDuration: 'for 25 min',
    lastSeen: 'Online now',
    streakDays: 12,
    moodDelta: '+8% calmer this week',
    focusMinutesToday: 95,
    activity: { task: 'Deep work · FIT3143', timeRange: '2:00 – 4:00 PM' },
    statusQuote: 'In the zone, one task at a time.',
    updates: [
      { id: 'jia-en-1', text: 'Completed a 90-minute focus session', timeAgo: '12 min ago' },
      { id: 'jia-en-2', text: 'Hit a 12-day streak', timeAgo: '3 hr ago' },
    ],
  },
  {
    id: 'marcus',
    name: 'Marcus',
    initials: 'M',
    tone: 'orange',
    status: 'on-a-break',
    statusDuration: 'for 10 min',
    lastSeen: 'Online now',
    streakDays: 5,
    moodDelta: 'Steady mood this week',
    focusMinutesToday: 60,
    activity: { task: 'Recovery break', timeRange: '3:00 – 3:15 PM' },
    statusQuote: 'Recharging before the next block.',
    updates: [
      { id: 'marcus-1', text: 'Took a recovery break', timeAgo: '10 min ago' },
      { id: 'marcus-2', text: 'Logged a study session', timeAgo: '2 hr ago' },
    ],
  },
  {
    id: 'alya',
    name: 'Alya',
    initials: 'A',
    tone: 'violet',
    status: 'in-class',
    statusDuration: 'for 40 min',
    lastSeen: 'Online now',
    streakDays: 8,
    moodDelta: 'Calmer than last week',
    focusMinutesToday: 45,
    activity: { task: 'BIO2010 Lecture', timeRange: '1:30 – 3:00 PM' },
    statusQuote: 'Taking notes, staying present.',
    updates: [
      { id: 'alya-1', text: "Checked in before class", timeAgo: '40 min ago' },
      { id: 'alya-2', text: "Completed today's reading", timeAgo: '5 hr ago' },
    ],
  },
  {
    id: 'daniel',
    name: 'Daniel',
    initials: 'D',
    tone: 'mint',
    status: 'focused',
    statusDuration: 'for 5 min',
    lastSeen: 'Online now',
    streakDays: 3,
    moodDelta: 'Mood steady today',
    focusMinutesToday: 20,
    activity: { task: 'Assignment draft', timeRange: '3:10 – 4:10 PM' },
    statusQuote: 'Just getting started on this one.',
    updates: [
      { id: 'daniel-1', text: 'Started a new focus session', timeAgo: '5 min ago' },
    ],
  },
  {
    id: 'wei-lin',
    name: 'Wei Lin',
    initials: 'WL',
    tone: 'blue',
    status: 'offline',
    statusDuration: '',
    lastSeen: 'Last seen 2 hr ago',
    streakDays: 15,
    moodDelta: 'Had a calmer week',
    focusMinutesToday: 0,
    activity: null,
    statusQuote: 'Taking some time off today.',
    updates: [
      { id: 'wei-lin-1', text: 'Completed a 15-day streak milestone', timeAgo: 'yesterday' },
    ],
  },
  {
    id: 'siti',
    name: 'Siti',
    initials: 'S',
    tone: 'orange',
    status: 'offline',
    statusDuration: '',
    lastSeen: 'Last seen 5 hr ago',
    streakDays: 2,
    moodDelta: 'Stress easing this week',
    focusMinutesToday: 0,
    activity: null,
    statusQuote: 'Back tomorrow, feeling okay.',
    updates: [
      { id: 'siti-1', text: 'Sent you a thank-you message', timeAgo: '5 hr ago' },
    ],
  },
  {
    id: 'kenji',
    name: 'Kenji',
    initials: 'K',
    tone: 'violet',
    status: 'offline',
    statusDuration: '',
    lastSeen: 'Last seen yesterday',
    streakDays: 0,
    moodDelta: 'New to check-ins',
    focusMinutesToday: 0,
    activity: null,
    statusQuote: 'Just getting started with focus tracking.',
    updates: [
      { id: 'kenji-1', text: 'Joined Beating the Burnout', timeAgo: 'yesterday' },
    ],
  },
  {
    id: 'rachel',
    name: 'Rachel',
    initials: 'R',
    tone: 'mint',
    status: 'offline',
    statusDuration: '',
    lastSeen: 'Last seen 2 days ago',
    streakDays: 21,
    moodDelta: 'Consistently steady',
    focusMinutesToday: 0,
    activity: null,
    statusQuote: 'Taking a short break from check-ins.',
    updates: [
      { id: 'rachel-1', text: 'Hit a 21-day streak', timeAgo: '2 days ago' },
    ],
  },
];

export type QuickMessageIcon = 'heart' | 'sparkles' | 'coffee' | 'thumbsUp' | 'wave' | 'sun';
export type QuickMessage = { id: string; text: string; icon: QuickMessageIcon };

export const quickMessages: QuickMessage[] = [
  { id: 'thinking-of-you', text: 'Thinking of you today', icon: 'heart' },
  { id: 'proud', text: "Proud of how you're showing up", icon: 'sparkles' },
  { id: 'break-reminder', text: 'Take a short break if you need one', icon: 'coffee' },
  { id: 'cheering', text: 'Cheering you on!', icon: 'thumbsUp' },
  { id: 'here-for-you', text: "I'm here if you need to talk", icon: 'wave' },
  { id: 'great-day', text: 'Hope you have a great day', icon: 'sun' },
];

export const socialQuote = {
  text: 'Small check-ins build strong circles. A little support goes a long way.',
  author: 'Beating the Burnout',
};
