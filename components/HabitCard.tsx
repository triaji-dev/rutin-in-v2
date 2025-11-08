'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit } from '@/lib/types';
import { HabitCardHeader } from '@/components/HabitCardHeader';
import { DateCircle } from '@/components/DateCircle';
import { DateGrid } from '@/components/DateGrid';
import { NoteDisplay } from '@/components/NoteDisplay';
import { getWeekDays, getOverviewDays, formatDate } from '@/lib/utils';
import { useViewMode, useIsHabitSelected } from '@/hooks/useHabits';

interface HabitCardProps {
  habit: Habit;
  onNameChange: (name: string) => void;
  onDateToggle: (dateString: string) => void;
  onOptionsClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onNoteClick: () => void;
  onCardClick?: () => void;
  isSelectMode: boolean;
  className?: string;
}

/**
 * HabitCard Component
 * 
 * Main habit card component with drag & drop, inline editing, and date tracking.
 * 
 * Features:
 * - Integrate HabitCardHeader (inline name editing + options)
 * - Integrate DateCircle for weekly view
 * - Integrate DateGrid for overview
 * - Drag handle for reordering
 * - Integrate NoteDisplay
 * - useSortable hook from @dnd-kit
 * - Select mode (blue border, reduced opacity)
 * - Glassmorphism styling
 * 
 * @example
 * ```tsx
 * <HabitCard
 *   habit={habit}
 *   onNameChange={(name) => updateHabit(habit.id, { name })}
 *   onDateToggle={(date) => toggleDate(habit.id, date)}
 *   onOptionsClick={(e) => openContextMenu(e, habit.id)}
 *   onNoteClick={() => openNoteModal(habit.id)}
 *   isSelectMode={selectMode}
 * />
 * ```
 */
export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onNameChange,
  onDateToggle,
  onOptionsClick,
  onNoteClick,
  onCardClick,
  isSelectMode,
  className,
}) => {
  const viewMode = useViewMode();
  const isSelected = useIsHabitSelected(habit.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: habit.id,
    disabled: isSelectMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Get dates based on view mode
  const weekDays = getWeekDays();
  const overviewDays = getOverviewDays();

  const handleCardClick = () => {
    if (isSelectMode && onCardClick) {
      onCardClick();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative',
        'p-4 sm:p-5',
        'rounded-xl',
        // Glassmorphism effect
        'bg-zinc-800/70 backdrop-blur-[15px]',
        'border',
        // Border colors
        isSelected
          ? 'border-blue-500/70'
          : 'border-white/10',
        // Shadow
        'shadow-lg shadow-black/10',
        // Transitions
        'transition-all duration-200 ease-in-out',
        // Dragging state
        isDragging && 'opacity-50 scale-105 cursor-grabbing z-50',
        // Select mode
        isSelectMode && 'cursor-pointer',
        isSelectMode && !isSelected && 'hover:border-blue-500/30',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Drag Handle */}
      {!isSelectMode && (
        <div
          {...attributes}
          {...listeners}
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1',
            'w-6 h-12',
            'flex items-center justify-center',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-200',
            'cursor-grab active:cursor-grabbing',
            'text-zinc-500 hover:text-zinc-300',
            'touch-none'
          )}
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      )}

      {/* Card Content */}
      <div
        className={cn(
          'transition-opacity duration-200',
          isSelected && 'opacity-40'
        )}
      >
        {/* Header */}
        <HabitCardHeader
          habitName={habit.name}
          onNameChange={onNameChange}
          onOptionsClick={onOptionsClick}
        />

        {/* Dates Section */}
        <div className="mt-4">
          {viewMode === 'weekly' ? (
            // Weekly View: DateCircles
            <div className="flex items-center gap-2 flex-wrap">
              {weekDays.map((date) => {
                const dateString = formatDate(date);
                const isCompleted = habit.completedDates.has(dateString);

                return (
                  <DateCircle
                    key={dateString}
                    date={date}
                    isCompleted={isCompleted}
                    color={habit.color}
                    onToggle={() => onDateToggle(dateString)}
                  />
                );
              })}
            </div>
          ) : (
            // Overview: DateGrid
            <DateGrid
              dates={overviewDays}
              completedDates={habit.completedDates}
              color={habit.color}
            />
          )}
        </div>

        {/* Note Display */}
        {habit.notes && (
          <NoteDisplay
            note={habit.notes}
            onReadMore={onNoteClick}
          />
        )}
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div
          className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
          aria-label="Selected"
        >
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
