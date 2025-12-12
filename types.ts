export enum Screen {
  SPLASH = 'SPLASH',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
  TRACKING = 'TRACKING',
  EDUCATION = 'EDUCATION',
  PROFILE = 'PROFILE'
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export enum ActivityType {
  EXERCISE = 'EXERCISE',
  MEDITATION = 'MEDITATION',
  SLEEP = 'SLEEP',
  NUTRITION = 'NUTRITION',
  MOOD = 'MOOD'
}

export interface ActivityLog {
  id: string;
  type: ActivityType;
  value: number; // e.g., minutes, hours, scale 1-5
  date: string;
  note?: string;
}

export interface EducationalContent {
  title: string;
  body: string;
  category: ActivityType;
}
