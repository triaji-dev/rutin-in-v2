import { useHabits } from './useHabits';
import { HabitJSON } from '@/lib/types';
import { formatDate } from '@/lib/utils';

/**
 * Hook for downloading habits as JSON backup file
 *
 * Features:
 * - Exports all habits with completedDates (as arrays) and notes
 * - Includes version and timestamp metadata
 * - Generates filename: rutin-in-backup-YYYY-MM-DD.json
 * - Triggers browser download
 *
 * @example
 * ```tsx
 * const downloadHabits = useDownload();
 *
 * <button onClick={downloadHabits}>Download</button>
 * ```
 */
export function useDownload() {
  const habits = useHabits(state => state.habits);

  const downloadHabits = () => {
    if (habits.length === 0) {
      alert('No habits to download');
      return;
    }

    try {
      // Serialize habits (convert Set to Array)
      const serializedHabits: HabitJSON[] = habits.map(h => ({
        id: h.id,
        name: h.name,
        color: h.color,
        completedDates: Array.from(h.completedDates),
        notes: h.notes,
        createdAt: h.createdAt,
      }));

      // Create export payload
      const exportData = {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        habits: serializedHabits,
      };

      // Convert to JSON string
      const jsonString = JSON.stringify(exportData, null, 2);

      // Generate filename with current date
      const today = formatDate(new Date());
      const filename = `rutin-in-backup-${today}.json`;

      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`Downloaded ${habits.length} habits to ${filename}`);
    } catch (error) {
      console.error('Failed to download habits', error);
      alert('Failed to download habits. Please try again.');
    }
  };

  return downloadHabits;
}
