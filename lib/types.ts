/**
 * Core data types for Rutin.in habit tracker application
 */

/**
 * Habit object representing a single habit with tracking data
 */
export interface Habit {
  /** Unique identifier in format "habit-${timestamp}" */
  id: string;

  /** Display name of the habit */
  name: string;

  /** Color theme key */
  color: ColorKey;

  /** Set of completed dates in "YYYY-MM-DD" format */
  completedDates: Set<string>;

  /** Optional notes/description for the habit */
  notes?: string;

  /** Timestamp when habit was created */
  createdAt?: number;
}

/**
 * Serialized habit for localStorage and export
 * (completedDates as Array instead of Set)
 */
export interface HabitJSON {
  id: string;
  name: string;
  color: ColorKey;
  completedDates: string[];
  notes?: string;
  createdAt?: number;
}

/**
 * View mode type
 */
export type ViewMode = 'weekly' | 'overview';

/**
 * Color keys for habit themes
 */
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

/**
 * Export file format
 */
export interface ExportData {
  version: string;
  exportedAt: string;
  habits: HabitJSON[];
}

/**
 * Application state structure for Zustand store
 */
export interface AppState {
  // ============================================
  // Habits Data
  // ============================================

  /** Array of all habits */
  habits: Habit[];

  // ============================================
  // UI State
  // ============================================

  /** Current view mode for displaying dates */
  viewMode: ViewMode;

  /** Whether select mode is active for bulk operations */
  selectMode: boolean;

  /** Set of habit IDs currently selected */
  selectedHabits: Set<string>;

  // ============================================
  // Modal State
  // ============================================

  /** ID of habit to delete, or 'bulk' for multiple, or null */
  habitToDelete: string | 'bulk' | null;

  /** ID of habit to change color, or 'bulk' for multiple, or null */
  habitToColor: string | 'bulk' | null;

  /** ID of habit for note modal, or null */
  noteModalHabitId: string | null;

  // ============================================
  // Drag State
  // ============================================

  /** Reference to currently dragged element */
  draggedItem: HTMLElement | null;

  // ============================================
  // Habit Actions
  // ============================================

  /** Replace all habits */
  setHabits: (habits: Habit[]) => void;

  /** Add a new habit */
  addHabit: (habit: Habit) => void;

  /** Update habit properties */
  updateHabit: (id: string, updates: Partial<Habit>) => void;

  /** Delete a habit by ID */
  deleteHabit: (id: string) => void;

  /** Toggle date completion for a habit */
  toggleDate: (habitId: string, date: string) => void;

  /** Reorder habits based on new ID order */
  reorderHabits: (newOrder: string[]) => void;

  // ============================================
  // View Actions
  // ============================================

  /** Set the current view mode */
  setViewMode: (mode: ViewMode) => void;

  /** Toggle select mode on/off */
  toggleSelectMode: () => void;

  /** Add a habit to selection */
  addSelectedHabit: (id: string) => void;

  /** Remove a habit from selection */
  removeSelectedHabit: (id: string) => void;

  /** Clear all selected habits */
  clearSelectedHabits: () => void;

  /** Select all habits */
  selectAllHabits: () => void;

  // ============================================
  // Modal Actions
  // ============================================

  /** Set habit ID for delete modal */
  setHabitToDelete: (id: string | 'bulk' | null) => void;

  /** Set habit ID for color picker modal */
  setHabitToColor: (id: string | 'bulk' | null) => void;

  /** Set habit ID for note modal */
  setNoteModalHabitId: (id: string | null) => void;

  // ============================================
  // Notes Actions
  // ============================================

  /** Add or update note for a habit */
  addNote: (habitId: string, note: string) => void;

  /** Get note for a habit */
  getNote: (habitId: string) => string | undefined;

  /** Check if habit has a note */
  hasNote: (habitId: string) => boolean;
}

/**
 * Color theme configuration
 */
export interface ColorTheme {
  completed: string;
}

/**
 * Context menu item
 */
export interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}
