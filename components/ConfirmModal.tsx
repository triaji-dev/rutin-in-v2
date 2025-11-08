/**
 * ConfirmModal component for delete confirmations
 * Displays different messages for single vs bulk delete
 * Handles keyboard shortcuts (Enter to confirm, Escape to cancel)
 */

'use client';

import React, { useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useHabits } from '@/hooks/useHabits';

export interface ConfirmModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  
  /** Callback when modal should close */
  onClose: () => void;
  
  /** Callback when user confirms */
  onConfirm: () => void;
  
  /** Type of deletion: single habit ID, 'bulk', or null */
  deleteType: string | 'bulk' | null;
  
  /** Number of selected habits (for bulk delete) */
  selectedCount?: number;
}

/**
 * Confirmation Modal for Delete Actions
 * 
 * Features:
 * - Different messages for single vs bulk delete
 * - Confirm/Cancel buttons
 * - Enter key confirms
 * - Escape key cancels
 * - Dark theme styling
 * 
 * @example
 * ```tsx
 * <ConfirmModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleDelete}
 *   deleteType="habit-123"
 *   selectedCount={1}
 * />
 * ```
 */
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  deleteType,
  selectedCount = 0,
}) => {
  const habits = useHabits((state) => state.habits);

  // Get habit name for single delete
  const habitName = deleteType && deleteType !== 'bulk' 
    ? habits.find(h => h.id === deleteType)?.name || 'Untitled'
    : '';

  // Determine message based on delete type
  const isBulkDelete = deleteType === 'bulk';
  const title = isBulkDelete ? 'Delete Multiple Habits?' : 'Delete Habit?';
  
  const message = isBulkDelete
    ? `Are you sure you want to delete ${selectedCount} habit${selectedCount !== 1 ? 's' : ''}? This action cannot be undone.`
    : `Are you sure you want to delete "${habitName}"? This action cannot be undone.`;

  // Handle Enter key to confirm
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onConfirm();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onConfirm]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnBackdropClick={true}
      closeOnEscape={true}
    >
      <div className="space-y-6">
        {/* Message */}
        <p className="text-zinc-300 text-sm leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="min-w-20"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            className="min-w-20"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
