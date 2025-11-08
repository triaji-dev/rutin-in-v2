'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit } from '@/lib/types';
import { HabitCardHeader } from '@/components/HabitCardHeader';
import { DateCircle } from '@/components/DateCircle';
import { DateGrid } from '@/components/DateGrid';
import { NoteDisplay } from '@/components/NoteDisplay';
import { ContextMenu, ContextMenuItem } from '@/components/ui/ContextMenu';
import { getWeekDays, getOverviewDays, formatDate, getDayName } from '@/lib/utils';
import { useViewMode, useIsHabitSelected } from '@/hooks/useHabits';
import { Pencil, Palette, FileText, CheckSquare, Trash2 } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onNameChange: (name: string) => void;
  onDateToggle: (dateString: string) => void;
  onNoteClick: () => void;
  onCardClick?: () => void;
  onChangeColor: () => void;
  onDelete: () => void;
  onEnterSelectMode: () => void;
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
 * - Context menu (right-click and three-dot button)
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
 *   onNoteClick={() => openNoteModal(habit.id)}
 *   onChangeColor={() => openColorModal(habit.id)}
 *   onDelete={() => openDeleteModal(habit.id)}
 *   onEnterSelectMode={() => enterSelectMode(habit.id)}
 *   isSelectMode={selectMode}
 * />
 * ```
 */
export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onNameChange,
  onDateToggle,
  onNoteClick,
  onCardClick,
  onChangeColor,
  onDelete,
  onEnterSelectMode,
  isSelectMode,
  className,
}) => {
  const viewMode = useViewMode();
  const isSelected = useIsHabitSelected(habit.id);
  const [contextMenu, setContextMenu] = useState<{ isOpen: boolean; x: number; y: number }>({
    isOpen: false,
    x: 0,
    y: 0,
  });
  const [editNameTrigger, setEditNameTrigger] = useState(0);

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

  // Context menu handlers
  const handleRightClick = (event: React.MouseEvent) => {
    if (isSelectMode) return; // Disable context menu in select mode
    
    event.preventDefault();
    setContextMenu({
      isOpen: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isSelectMode) return; // Disable context menu in select mode
    
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setContextMenu({
      isOpen: true,
      x: rect.right,
      y: rect.bottom,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, isOpen: false });
  };

  // Context menu items
  const contextMenuItems: ContextMenuItem[] = [
    {
      id: 'edit',
      label: 'Edit Name',
      icon: <Pencil className="w-4 h-4" />,
      onClick: () => {
        handleCloseContextMenu();
        // Trigger edit mode by incrementing counter
        setEditNameTrigger(prev => prev + 1);
      },
    },
    {
      id: 'color',
      label: 'Change Color',
      icon: <Palette className="w-4 h-4" />,
      onClick: () => {
        handleCloseContextMenu();
        onChangeColor();
      },
    },
    {
      id: 'note',
      label: habit.notes ? 'Edit Note' : 'Add Note',
      icon: <FileText className="w-4 h-4" />,
      onClick: () => {
        handleCloseContextMenu();
        onNoteClick();
      },
    },
    {
      id: 'select',
      label: 'Select Mode',
      icon: <CheckSquare className="w-4 h-4" />,
      onClick: () => {
        handleCloseContextMenu();
        onEnterSelectMode();
      },
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      variant: 'danger' as const,
      onClick: () => {
        handleCloseContextMenu();
        onDelete();
      },
    },
  ];

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        onContextMenu={handleRightClick}
        data-habit-id={habit.id}
        className={cn(
        'group relative',
        'p-3 sm:p-4',
        'rounded-lg',
        // Glassmorphism effect
        'bg-zinc-800/90 backdrop-blur-[15px]',
        'border',
        // Border colors
        isSelected
          ? 'border-blue-500/70'
          : 'border-white/5',
        // Shadow
        'shadow-md shadow-black/20',
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
          habitColor={habit.color}
          onNameChange={onNameChange}
          onOptionsClick={handleOptionsClick}
          editTrigger={editNameTrigger}
        />

        {/* Dates Section */}
        <div className="mt-3">
          {viewMode === 'weekly' ? (
            // Weekly View: DateCircles with day labels on top
            <div className="flex flex-col">
              {/* Day Labels Row */}
              <div className="flex items-center gap-1.5 mb-1.5">
                {weekDays.map((date) => {
                  const dayName = getDayName(date);
                  return (
                    <div
                      key={`label-${formatDate(date)}`}
                      className="w-9 text-center"
                    >
                      <span className="text-[11px] font-medium text-zinc-500">
                        {dayName}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Date Circles Row */}
              <div className="flex items-center gap-1.5">
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

      {/* Context Menu */}
      <ContextMenu
        items={contextMenuItems}
        isOpen={contextMenu.isOpen}
        onClose={handleCloseContextMenu}
        position={{ x: contextMenu.x, y: contextMenu.y }}
      />
    </>
  );
};
