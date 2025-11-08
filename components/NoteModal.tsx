/**
 * NoteModal component for adding/editing habit notes
 * Supports keyboard shortcuts: Ctrl/Cmd+Enter to save, Escape to cancel
 * Auto-focuses textarea on open
 */

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useHabits } from '@/hooks/useHabits';

export interface NoteModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  
  /** Callback when modal should close */
  onClose: () => void;
  
  /** ID of the habit to add/edit note for */
  habitId: string | null;
}

/**
 * Note Modal for Adding/Editing Habit Notes
 * 
 * Features:
 * - Display "Add Note" or "Edit Note" title
 * - Textarea for note content
 * - Save/Cancel buttons
 * - Ctrl/Cmd+Enter to save
 * - Escape to cancel
 * - Auto-focus textarea on open
 * - Integrate with Zustand store
 * 
 * @example
 * ```tsx
 * <NoteModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   habitId="habit-123"
 * />
 * ```
 */
export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  habitId,
}) => {
  if (!isOpen || !habitId) {
    return null;
  }

  return <NoteModalContent isOpen={isOpen} onClose={onClose} habitId={habitId} key={habitId} />;
};

/**
 * Inner component that gets remounted when habitId changes
 */
const NoteModalContent: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  habitId,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addNote = useHabits((state) => state.addNote);
  const getNote = useHabits((state) => state.getNote);
  const habits = useHabits((state) => state.habits);

  // Get habit name for title
  const habit = habitId ? habits.find(h => h.id === habitId) : null;
  const habitName = habit?.name || 'Untitled';
  
  // Get existing note - initialize state once on mount
  const existingNote = habitId ? (getNote(habitId) || '') : '';
  const [noteText, setNoteText] = useState(existingNote);
  
  const isEditMode = Boolean(existingNote);
  const title = isEditMode ? 'Edit Note' : 'Add Note';

  // Auto-focus textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      // Use setTimeout to ensure modal animation completes
      setTimeout(() => {
        textareaRef.current?.focus();
        // Move cursor to end of text
        const length = textareaRef.current?.value.length || 0;
        textareaRef.current?.setSelectionRange(length, length);
      }, 100);
    }
  }, [isOpen]);

  // Save note handler
  const handleSave = useCallback(() => {
    if (!habitId) return;
    
    // Trim whitespace
    const trimmedNote = noteText.trim();
    
    // Save note (empty string removes note)
    addNote(habitId, trimmedNote);
    
    // Close modal
    onClose();
  }, [habitId, noteText, addNote, onClose]);

  // Cancel handler
  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle Ctrl/Cmd+Enter to save
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleSave]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={`${title} - ${habitName}`}
      size="md"
      closeOnBackdropClick={false}
      closeOnEscape={true}
    >
      <div className="space-y-6">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter your note here..."
          className="w-full h-40 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg
                     text-zinc-100 placeholder-zinc-500 resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200"
          maxLength={1000}
        />

        {/* Character count */}
        <div className="text-right text-xs text-zinc-500">
          {noteText.length} / 1000 characters
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-zinc-500">
            Press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400">Ctrl</kbd>
            +<kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400">Enter</kbd> to save
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="min-w-20"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              className="min-w-20"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
