/**
 * Constants for Rutin.in habit tracker application
 */

import { ColorKey, ColorTheme } from './types';

/**
 * Color theme sets for habits
 * Each color has a 'completed' shade used for:
 * - Filled date circles in weekly view
 * - Filled squares in grid view
 * - Habit name text color
 * - Border accents
 */
export const COLOR_SETS: Record<ColorKey, ColorTheme> = {
  green: {
    completed: '#4ade80', // Fresh, natural
  },
  blue: {
    completed: '#3b82f6', // Calm, focus
  },
  purple: {
    completed: '#a855f7', // Creative, unique
  },
  pink: {
    completed: '#ec4899', // Energetic, fun
  },
  orange: {
    completed: '#f97316', // Warm, active
  },
  yellow: {
    completed: '#facc15', // Bright, optimistic
  },
  teal: {
    completed: '#14b8a6', // Balanced, modern
  },
  red: {
    completed: '#ef4444', // Passionate, urgent
  },
  indigo: {
    completed: '#6366f1', // Deep, thoughtful
  },
  gray: {
    completed: '#9ca3af', // Neutral, subtle
  },
};

/**
 * Default habit color
 */
export const DEFAULT_COLOR: ColorKey = 'green';

/**
 * Export data version
 */
export const EXPORT_VERSION = '1.1';

/**
 * LocalStorage key for habits
 */
export const STORAGE_KEY = 'habits';

/**
 * Date format constant
 */
export const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * Number of days in weekly view
 */
export const WEEKLY_DAYS_COUNT = 7;

/**
 * Number of days in overview/grid view (18 weeks)
 */
export const OVERVIEW_DAYS_COUNT = 126;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION = {
  FAST: 200,
  NORMAL: 250,
  SLOW: 300,
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  CONTEXT_MENU: 50,
  MODAL_BACKDROP: 100,
  MODAL: 110,
  BULK_ACTIONS_BAR: 40,
} as const;
