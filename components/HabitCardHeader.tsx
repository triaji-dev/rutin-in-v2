'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ColorKey } from '@/lib/types';
import { COLOR_SETS } from '@/lib/constants';

interface HabitCardHeaderProps {
  habitName: string;
  habitColor: ColorKey;
  onNameChange: (name: string) => void;
  onOptionsClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  editTrigger?: number;
  className?: string;
}

/**
 * HabitCardHeader Component
 * 
 * Header section of a habit card with inline editable name and options menu.
 * 
 * Features:
 * - Display habit name with inline editing
 * - Click to edit mode
 * - Enter key to save
 * - Blur to save
 * - Escape to cancel editing
 * - Default to "Untitled" if empty
 * - Three-dot options button
 * - Auto-focus on edit mode
 * - Auto-select text on edit
 * 
 * @example
 * ```tsx
 * <HabitCardHeader
 *   habitName={habit.name}
 *   habitColor={habit.color}
 *   onNameChange={(name) => updateHabit(habit.id, { name })}
 *   onOptionsClick={(e) => openContextMenu(e)}
 * />
 * ```
 */
export const HabitCardHeader: React.FC<HabitCardHeaderProps> = ({
  habitName,
  habitColor,
  onNameChange,
  onOptionsClick,
  editTrigger = 0,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(habitName);
  const inputRef = useRef<HTMLInputElement>(null);

  const colorValue = COLOR_SETS[habitColor].completed;

  // Reset edit value when habitName changes externally
  useEffect(() => {
    setEditValue(habitName);
  }, [habitName]);

  // Trigger edit mode when editTrigger changes
  useEffect(() => {
    if (editTrigger > 0) {
      setIsEditing(true);
    }
  }, [editTrigger]);

  // Auto-focus and select text when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    
    // Save the name (even if empty, we'll show "Untitled" in display)
    onNameChange(trimmedValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original value
    setEditValue(habitName);
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      handleCancel();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const displayName = habitName.trim() || 'Untitled';

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        className
      )}
    >
      {/* Check Icon */}
      <div 
        className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center"
        style={{ 
          borderColor: colorValue,
          color: colorValue 
        }}
      >
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
      </div>

      {/* Habit Name - Editable */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={cn(
            'flex-1 px-2 py-1 -mx-2 -my-1',
            'text-base font-bold text-white',
            'bg-zinc-700/50 rounded-md',
            'border-2 border-green-500',
            'outline-none',
            'placeholder:text-zinc-500'
          )}
          placeholder="Enter habit name"
          maxLength={100}
        />
      ) : (
        <button
          type="button"
          onClick={handleStartEdit}
          className={cn(
            'flex-1 text-left px-2 py-1 -mx-2 -my-1',
            'text-base font-bold',
            'rounded-md',
            'transition-colors duration-150',
            'hover:bg-zinc-700/30',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-800',
            // Show "Untitled" in gray if empty
            !habitName.trim() && 'text-zinc-400'
          )}
          style={
            habitName.trim()
              ? { color: colorValue }
              : undefined
          }
          aria-label={`Edit habit name: ${displayName}`}
        >
          {displayName}
        </button>
      )}

      {/* Options Button (Three Dots) */}
      <Button
        variant="icon"
        size="sm"
        onClick={onOptionsClick}
        aria-label="Open options menu"
        className={cn(
          'shrink-0',
          'text-zinc-400 hover:text-zinc-200',
          'hover:bg-zinc-700/50'
        )}
      >
        <MoreVertical className="w-5 h-5" />
      </Button>
    </div>
  );
};
