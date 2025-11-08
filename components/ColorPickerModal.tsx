/**
 * ColorPickerModal component for changing habit colors
 * Wraps ColorPicker in a Modal
 * Handles single and bulk color changes
 */

'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { useHabits } from '@/hooks/useHabits';
import { ColorKey } from '@/lib/types';

export interface ColorPickerModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  
  /** Callback when modal should close */
  onClose: () => void;
  
  /** Type of color change: single habit ID, 'bulk', or null */
  colorChangeType: string | 'bulk' | null;
  
  /** Number of selected habits (for bulk change) */
  selectedCount?: number;
}

/**
 * Color Picker Modal for Habit Color Changes
 * 
 * Features:
 * - Show modal on change color action
 * - Handle single habit color change
 * - Handle bulk color change for multiple habits
 * - Update habits with new color
 * - Close modal automatically after selection
 * 
 * @example
 * ```tsx
 * <ColorPickerModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   colorChangeType="habit-123"
 *   selectedCount={1}
 * />
 * ```
 */
export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  colorChangeType,
  selectedCount = 0,
}) => {
  const habits = useHabits((state) => state.habits);
  const updateHabit = useHabits((state) => state.updateHabit);
  const selectedHabits = useHabits((state) => state.selectedHabits);

  // Get current color for single habit
  const currentColor = colorChangeType && colorChangeType !== 'bulk' 
    ? habits.find(h => h.id === colorChangeType)?.color
    : undefined;

  // Determine title based on change type
  const isBulkChange = colorChangeType === 'bulk';
  const title = isBulkChange
    ? `Change Color for ${selectedCount} Habit${selectedCount !== 1 ? 's' : ''}`
    : 'Change Color';

  // Handle color selection
  const handleColorSelect = (color: ColorKey) => {
    if (isBulkChange) {
      // Bulk change: update all selected habits
      selectedHabits.forEach(habitId => {
        updateHabit(habitId, { color });
      });
    } else if (colorChangeType) {
      // Single change: update specific habit
      updateHabit(colorChangeType, { color });
    }

    // Close modal after selection
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnBackdropClick={true}
      closeOnEscape={true}
    >
      <div className="py-2">
        {/* Color Picker */}
        <ColorPicker
          selectedColor={currentColor}
          onColorSelect={handleColorSelect}
        />

        {/* Helper text */}
        <p className="text-xs text-center text-zinc-500 mt-4">
          Click a color to apply changes
        </p>
      </div>
    </Modal>
  );
};
