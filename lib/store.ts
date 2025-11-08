import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit, ViewMode } from './types';

interface HabitStore {
  habits: Habit[];
  viewMode: ViewMode;
  selectMode: boolean;
  selectedHabits: Set<string>;

  // Actions
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleDate: (habitId: string, date: string) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleSelectMode: () => void;
  toggleSelection: (id: string) => void;
  selectAll: () => void;
  unselectAll: () => void;
  bulkDelete: () => void;
  bulkChangeColor: (color: string) => void;
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      viewMode: 'weekly',
      selectMode: false,
      selectedHabits: new Set(),

      addHabit: habit => set(state => ({ habits: [...state.habits, habit] })),

      updateHabit: (id, updates) =>
        set(state => ({
          habits: state.habits.map(h =>
            h.id === id ? { ...h, ...updates } : h
          ),
        })),

      deleteHabit: id =>
        set(state => ({
          habits: state.habits.filter(h => h.id !== id),
        })),

      toggleDate: (habitId, date) =>
        set(state => ({
          habits: state.habits.map(h => {
            if (h.id === habitId) {
              const newDates = new Set(h.completedDates);
              if (newDates.has(date)) {
                newDates.delete(date);
              } else {
                newDates.add(date);
              }
              return { ...h, completedDates: newDates };
            }
            return h;
          }),
        })),

      setViewMode: mode => set({ viewMode: mode }),

      toggleSelectMode: () =>
        set(state => ({
          selectMode: !state.selectMode,
          selectedHabits: new Set(),
        })),

      toggleSelection: id =>
        set(state => {
          const newSelected = new Set(state.selectedHabits);
          if (newSelected.has(id)) {
            newSelected.delete(id);
          } else {
            newSelected.add(id);
          }
          return { selectedHabits: newSelected };
        }),

      selectAll: () =>
        set(state => ({
          selectedHabits: new Set(state.habits.map(h => h.id)),
        })),

      unselectAll: () => set({ selectedHabits: new Set() }),

      bulkDelete: () =>
        set(state => ({
          habits: state.habits.filter(h => !state.selectedHabits.has(h.id)),
          selectedHabits: new Set(),
          selectMode: false,
        })),

      bulkChangeColor: color =>
        set(state => ({
          habits: state.habits.map(h =>
            state.selectedHabits.has(h.id) ? { ...h, color } : h
          ),
          selectedHabits: new Set(),
          selectMode: false,
        })),
    }),
    {
      name: 'rutin-in-storage',
      // Custom serialization for Set
      partialize: state => ({
        habits: state.habits.map(h => ({
          ...h,
          completedDates: Array.from(h.completedDates),
        })),
        viewMode: state.viewMode,
      }),
    }
  )
);
