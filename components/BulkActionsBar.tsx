/**
 * BulkActionsBar component for bulk operations in select mode
 * Displays action buttons at the top of the screen
 */

'use client';

import React from 'react';
import { Palette, Trash2, CheckSquare, Square, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useHabits, useSelectedHabits } from '@/hooks/useHabits';

export interface BulkActionsBarProps {
  /** Callback when change color button is clicked */
  onChangeColor: () => void;
  
  /** Callback when delete button is clicked */
  onDelete: () => void;
}

/**
 * Bulk Actions Bar Component
 * 
 * Features:
 * - Display 5 action buttons:
 *   1. Change Color (blue icon)
 *   2. Delete (red icon)
 *   3. Select All (green icon)
 *   4. Unselect All (yellow icon)
 *   5. Exit Select Mode (gray icon)
 * - Position at top of screen
 * - zinc-800 background with rounded corners
 * - Shows count of selected habits
 * 
 * @example
 * ```tsx
 * <BulkActionsBar
 *   onChangeColor={() => openColorModal()}
 *   onDelete={() => openDeleteModal()}
 * />
 * ```
 */
export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  onChangeColor,
  onDelete,
}) => {
  const selectedHabits = useSelectedHabits();
  const selectAllHabits = useHabits((state) => state.selectAllHabits);
  const clearSelectedHabits = useHabits((state) => state.clearSelectedHabits);
  const toggleSelectMode = useHabits((state) => state.toggleSelectMode);
  const habits = useHabits((state) => state.habits);

  const selectedCount = selectedHabits.size;
  const allSelected = selectedCount === habits.length && habits.length > 0;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Selected Count */}
          <div className="text-sm text-zinc-300 font-medium min-w-[100px]">
            {selectedCount} selected
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-zinc-700" />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Change Color - Blue */}
            <Button
              variant="icon"
              onClick={onChangeColor}
              disabled={selectedCount === 0}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 disabled:text-zinc-600 disabled:hover:bg-transparent"
              aria-label="Change color of selected habits"
              title="Change Color"
            >
              <Palette className="w-5 h-5" />
            </Button>

            {/* Delete - Red */}
            <Button
              variant="icon"
              onClick={onDelete}
              disabled={selectedCount === 0}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 disabled:text-zinc-600 disabled:hover:bg-transparent"
              aria-label="Delete selected habits"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </Button>

            {/* Divider */}
            <div className="h-6 w-px bg-zinc-700 mx-1" />

            {/* Select All - Green */}
            <Button
              variant="icon"
              onClick={selectAllHabits}
              disabled={allSelected}
              className="text-green-400 hover:text-green-300 hover:bg-green-500/10 disabled:text-zinc-600 disabled:hover:bg-transparent"
              aria-label="Select all habits"
              title="Select All"
            >
              <CheckSquare className="w-5 h-5" />
            </Button>

            {/* Unselect All - Yellow */}
            <Button
              variant="icon"
              onClick={clearSelectedHabits}
              disabled={selectedCount === 0}
              className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 disabled:text-zinc-600 disabled:hover:bg-transparent"
              aria-label="Unselect all habits"
              title="Unselect All"
            >
              <Square className="w-5 h-5" />
            </Button>

            {/* Divider */}
            <div className="h-6 w-px bg-zinc-700 mx-1" />

            {/* Exit Select Mode - Gray */}
            <Button
              variant="icon"
              onClick={toggleSelectMode}
              className="text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700"
              aria-label="Exit select mode"
              title="Exit Select Mode"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
