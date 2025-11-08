/**
 * Zustand store for habit tracking application state management
 */

import { create } from 'zustand';
import { AppState, Habit, ViewMode } from '@/lib/types';

/**
 * Main Zustand store for application state
 */
export const useHabits = create<AppState>((set, get) => ({
  // ============================================
  // Initial State
  // ============================================

  habits: [],
  viewMode: 'weekly',
  selectMode: false,
  selectedHabits: new Set<string>(),
  habitToDelete: null,
  habitToColor: null,
  noteModalHabitId: null,
  draggedItem: null,

  // ============================================
  // Habit CRUD Actions
  // ============================================

  /**
   * Replace all habits (used for import/restore)
   */
  setHabits: (habits: Habit[]) => {
    set({ habits });
  },

  /**
   * Add a new habit to the list
   */
  addHabit: (habit: Habit) => {
    set(state => ({
      habits: [...state.habits, habit],
    }));
  },

  /**
   * Update habit properties by ID
   */
  updateHabit: (id: string, updates: Partial<Habit>) => {
    set(state => ({
      habits: state.habits.map(habit =>
        habit.id === id ? { ...habit, ...updates } : habit
      ),
    }));
  },

  /**
   * Delete a habit by ID
   */
  deleteHabit: (id: string) => {
    set(state => ({
      habits: state.habits.filter(habit => habit.id !== id),
      selectedHabits: new Set(
        Array.from(state.selectedHabits).filter(selectedId => selectedId !== id)
      ),
    }));
  },

  /**
   * Reorder habits based on new ID order
   */
  reorderHabits: (newOrder: string[]) => {
    set(state => {
      const habitMap = new Map(state.habits.map(h => [h.id, h]));
      const reorderedHabits = newOrder
        .map(id => habitMap.get(id))
        .filter((h): h is Habit => h !== undefined);
      return { habits: reorderedHabits };
    });
  },

  // ============================================
  // Date Toggle Action
  // ============================================

  /**
   * Toggle date completion for a habit
   */
  toggleDate: (habitId: string, date: string) => {
    set(state => ({
      habits: state.habits.map(habit => {
        if (habit.id !== habitId) return habit;

        const newCompletedDates = new Set(habit.completedDates);
        if (newCompletedDates.has(date)) {
          newCompletedDates.delete(date);
        } else {
          newCompletedDates.add(date);
        }

        return {
          ...habit,
          completedDates: newCompletedDates,
        };
      }),
    }));
  },

  // ============================================
  // View Mode Actions
  // ============================================

  /**
   * Set the current view mode (weekly or overview)
   */
  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
  },

  /**
   * Toggle select mode on/off
   */
  toggleSelectMode: () => {
    set(state => ({
      selectMode: !state.selectMode,
      // Clear selection when exiting select mode
      selectedHabits: !state.selectMode
        ? state.selectedHabits
        : new Set<string>(),
    }));
  },

  /**
   * Add a habit to selection
   */
  addSelectedHabit: (id: string) => {
    set(state => {
      const newSelected = new Set(state.selectedHabits);
      newSelected.add(id);
      return { selectedHabits: newSelected };
    });
  },

  /**
   * Remove a habit from selection
   */
  removeSelectedHabit: (id: string) => {
    set(state => {
      const newSelected = new Set(state.selectedHabits);
      newSelected.delete(id);
      return { selectedHabits: newSelected };
    });
  },

  /**
   * Clear all selected habits
   */
  clearSelectedHabits: () => {
    set({ selectedHabits: new Set<string>() });
  },

  /**
   * Select all habits
   */
  selectAllHabits: () => {
    set(state => ({
      selectedHabits: new Set(state.habits.map(h => h.id)),
    }));
  },

  // ============================================
  // Modal State Actions
  // ============================================

  /**
   * Set habit ID for delete modal
   */
  setHabitToDelete: (id: string | 'bulk' | null) => {
    set({ habitToDelete: id });
  },

  /**
   * Set habit ID for color picker modal
   */
  setHabitToColor: (id: string | 'bulk' | null) => {
    set({ habitToColor: id });
  },

  /**
   * Set habit ID for note modal
   */
  setNoteModalHabitId: (id: string | null) => {
    set({ noteModalHabitId: id });
  },

  // ============================================
  // Notes Actions
  // ============================================

  /**
   * Add or update note for a habit
   */
  addNote: (habitId: string, note: string) => {
    set(state => ({
      habits: state.habits.map(habit =>
        habit.id === habitId ? { ...habit, notes: note } : habit
      ),
    }));
  },

  /**
   * Get note for a habit
   */
  getNote: (habitId: string) => {
    const habit = get().habits.find(h => h.id === habitId);
    return habit?.notes;
  },

  /**
   * Check if habit has a note
   */
  hasNote: (habitId: string) => {
    const habit = get().habits.find(h => h.id === habitId);
    return Boolean(habit?.notes && habit.notes.length > 0);
  },
}));

// ============================================
// Helper Hooks for Common Selectors
// ============================================

/**
 * Get habits array
 */
export const useHabitsArray = () => useHabits(state => state.habits);

/**
 * Get current view mode
 */
export const useViewMode = () => useHabits(state => state.viewMode);

/**
 * Get select mode state
 */
export const useSelectMode = () => useHabits(state => state.selectMode);

/**
 * Get selected habits
 */
export const useSelectedHabits = () => useHabits(state => state.selectedHabits);

/**
 * Get a specific habit by ID
 */
export const useHabit = (id: string) =>
  useHabits(state => state.habits.find(h => h.id === id));

/**
 * Check if a habit is selected
 */
export const useIsHabitSelected = (id: string) =>
  useHabits(state => state.selectedHabits.has(id));

/**
 * Get modal states
 */
export const useModals = () =>
  useHabits(state => ({
    habitToDelete: state.habitToDelete,
    habitToColor: state.habitToColor,
    noteModalHabitId: state.noteModalHabitId,
  }));
