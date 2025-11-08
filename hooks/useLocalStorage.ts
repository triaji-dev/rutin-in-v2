import { Habit, HabitJSON } from '@/lib/types';
import { formatDate, generateHabitId } from '@/lib/utils';
import { useHabits } from './useHabits';

const STORAGE_KEY = 'rutin-in-habits-v1';

type StoredPayload = {
  version: number;
  habits: HabitJSON[]; // serialized habits
  timestamp?: string;
};

function serializeHabits(habits: Habit[]) {
  return habits.map(h => ({
    ...h,
    // convert Set to Array for JSON
    completedDates: Array.from(h.completedDates),
  }));
}

function deserializeHabits(raw: HabitJSON[]): Habit[] {
  return raw.map(
    r =>
      ({
        ...r,
        completedDates: new Set(r.completedDates || []),
      } as Habit)
  );
}

export function saveHabitsToStorage(habits: Habit[]) {
  if (typeof window === 'undefined') return;
  try {
    const payload: StoredPayload = {
      version: 1,
      habits: serializeHabits(habits),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.error('Failed to save habits to localStorage', e);
  }
}

export function loadHabitsFromStorage(): Habit[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredPayload = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.habits)) return null;
    return deserializeHabits(parsed.habits);
  } catch (e) {
    console.error('Failed to load habits from localStorage', e);
    return null;
  }
}

/**
 * Initialize localStorage sync.
 * - Loads existing habits if available
 * - If none found, creates a sensible default habit
 * - Subscribes to store changes and saves to localStorage
 */
export function initLocalStorageSync() {
  if (typeof window === 'undefined') return;

  const stored = loadHabitsFromStorage();
  if (stored && stored.length > 0) {
    // Populate store with deserialized habits
    useHabits.setState({ habits: stored });
  } else {
    // Create default habit if none exist
    const id = generateHabitId();
    const today = formatDate(new Date());
    const yesterday = formatDate(new Date(Date.now() - 86400000));

    const defaultHabit: Habit = {
      id,
      name: 'Membaca Buku',
      color: 'green',
      completedDates: new Set([yesterday, today]),
      createdAt: Date.now(),
      notes: '',
    };

    useHabits.setState({ habits: [defaultHabit] });
    saveHabitsToStorage([defaultHabit]);
  }

  // Subscribe to habit changes and persist (listen to full state and persist habits)
  useHabits.subscribe(state => {
    saveHabitsToStorage(state.habits);
  });
}
