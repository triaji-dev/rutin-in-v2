import { useHabits } from './useHabits';
import { Habit, HabitJSON } from '@/lib/types';

type ImportPayload = {
  version?: string;
  exportedAt?: string;
  habits?: HabitJSON[];
};

/**
 * Hook for uploading and importing habits from JSON backup file
 *
 * Features:
 * - Validates JSON structure
 * - Checks version compatibility
 * - Deserializes completedDates (Array → Set)
 * - Replaces all habits in store
 * - Shows error alerts for invalid files
 *
 * @example
 * ```tsx
 * const uploadHabits = useUpload();
 *
 * <input
 *   type="file"
 *   accept=".json"
 *   onChange={(e) => {
 *     const file = e.target.files?.[0];
 *     if (file) uploadHabits(file);
 *   }}
 * />
 * ```
 */
export function useUpload() {
  const setHabits = useHabits(state => state.setHabits);

  const uploadHabits = async (file: File) => {
    try {
      // Read file content
      const text = await file.text();
      const data: ImportPayload = JSON.parse(text);

      // Validate structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON format');
      }

      if (!Array.isArray(data.habits)) {
        throw new Error('Missing or invalid habits array');
      }

      // Check version compatibility (currently accepting v1.x.x)
      if (data.version && !data.version.startsWith('1.')) {
        const proceed = confirm(
          `This file was created with version ${data.version}. It may not be fully compatible. Continue?`
        );
        if (!proceed) return;
      }

      // Deserialize habits (Array → Set for completedDates)
      const importedHabits: Habit[] = data.habits.map(h => ({
        id: h.id,
        name: h.name || 'Untitled',
        color: h.color || 'green',
        completedDates: new Set(h.completedDates || []),
        notes: h.notes || '',
        createdAt: h.createdAt || Date.now(),
      }));

      // Validate that we have at least one habit
      if (importedHabits.length === 0) {
        throw new Error('No habits found in file');
      }

      // Replace habits in store (this will trigger localStorage sync)
      setHabits(importedHabits);

      console.log(`Imported ${importedHabits.length} habits from ${file.name}`);
      alert(
        `Successfully imported ${importedHabits.length} habit${
          importedHabits.length === 1 ? '' : 's'
        }!`
      );
    } catch (error) {
      console.error('Failed to import habits', error);

      if (error instanceof SyntaxError) {
        alert('Invalid JSON file. Please select a valid backup file.');
      } else if (error instanceof Error) {
        alert(`Import failed: ${error.message}`);
      } else {
        alert('Failed to import habits. Please try again.');
      }
    }
  };

  return uploadHabits;
}
