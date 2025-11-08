export interface Habit {
  id: string;
  name: string;
  color: ColorKey;
  completedDates: Set<string>;
  note?: string;
  createdAt: number;
}

export interface HabitJSON {
  id: string;
  name: string;
  color: ColorKey;
  completedDates: string[];
  note?: string;
  createdAt: number;
}

export type ViewMode = 'weekly' | 'overview';

export type ColorKey =
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'orange'
  | 'yellow'
  | 'teal'
  | 'red'
  | 'indigo'
  | 'gray';

export interface ExportData {
  version: string;
  exportedAt: string;
  habits: HabitJSON[];
}