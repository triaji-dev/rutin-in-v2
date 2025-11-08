'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { truncateText } from '@/lib/utils';

interface NoteDisplayProps {
  note: string;
  onReadMore: () => void;
  maxLength?: number;
  className?: string;
}

/**
 * NoteDisplay Component
 * 
 * Display note preview below habit card with truncation and "Read more" link.
 * 
 * Features:
 * - Display note preview
 * - Truncate long text
 * - "Read more" link when truncated
 * - Click to open note modal
 * - Only render when note exists
 * 
 * @example
 * ```tsx
 * {habit.notes && (
 *   <NoteDisplay
 *     note={habit.notes}
 *     onReadMore={() => openNoteModal(habit.id)}
 *   />
 * )}
 * ```
 */
export const NoteDisplay: React.FC<NoteDisplayProps> = ({
  note,
  onReadMore,
  maxLength = 100,
  className,
}) => {
  if (!note || note.trim().length === 0) {
    return null;
  }

  const isTruncated = note.length > maxLength;
  const displayText = isTruncated ? truncateText(note, maxLength) : note;

  return (
    <div
      className={cn(
        'mt-3 pt-3 border-t border-zinc-700/50',
        className
      )}
    >
      <p className="text-sm text-zinc-400 leading-relaxed">
        {displayText}
        {isTruncated && (
          <>
            {' '}
            <button
              type="button"
              onClick={onReadMore}
              className={cn(
                'inline-flex items-center',
                'text-green-400 hover:text-green-300',
                'font-medium',
                'transition-colors duration-150',
                'focus:outline-none focus-visible:underline'
              )}
              aria-label="Read full note"
            >
              Read more
            </button>
          </>
        )}
      </p>
    </div>
  );
};
