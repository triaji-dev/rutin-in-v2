'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ColorKey } from '@/lib/types';
import { COLOR_SETS } from '@/lib/constants';
import { getDayName } from '@/lib/utils';

interface DateCircleProps {
  date: Date;
  isCompleted: boolean;
  color: ColorKey;
  onToggle: () => void;
  className?: string;
}

/**
 * DateCircle Component
 * 
 * Circular date element for weekly view showing day name and date number.
 * 
 * Features:
 * - Display day name (3 letters: Mon, Tue, etc.)
 * - Display date number
 * - Click to toggle completion
 * - Apply theme color when completed
 * - Hover effects
 * - Size: w-8 h-8 (32x32px)
 * - Border: zinc-600
 * 
 * @example
 * ```tsx
 * <DateCircle
 *   date={new Date()}
 *   isCompleted={true}
 *   color="green"
 *   onToggle={() => toggleDate(habitId, dateString)}
 * />
 * ```
 */
export const DateCircle: React.FC<DateCircleProps> = ({
  date,
  isCompleted,
  color,
  onToggle,
  className,
}) => {
  const dayName = getDayName(date); // Mon, Tue, Wed, etc.
  const dateNumber = date.getDate();
  const colorValue = COLOR_SETS[color].completed;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex flex-col items-center justify-center',
        'w-8 h-8',
        'rounded-full',
        'border-2',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-zinc-800',
        'cursor-pointer',
        // Completed state
        isCompleted
          ? 'border-transparent shadow-sm'
          : 'border-zinc-600 hover:border-zinc-500',
        // Hover effects
        !isCompleted && 'hover:bg-zinc-700/30',
        isCompleted && 'hover:opacity-90',
        className
      )}
      style={
        isCompleted
          ? {
              backgroundColor: colorValue,
              boxShadow: `0 0 0 2px ${colorValue}20`,
            }
          : undefined
      }
      aria-label={`${dayName}, ${dateNumber}${isCompleted ? ' - completed' : ' - not completed'}`}
      aria-pressed={isCompleted}
    >
      <span
        className={cn(
          'text-[10px] font-medium leading-none',
          isCompleted ? 'text-white' : 'text-zinc-500'
        )}
      >
        {dayName}
      </span>
      <span
        className={cn(
          'text-xs font-bold leading-none mt-0.5',
          isCompleted ? 'text-white' : 'text-zinc-300'
        )}
      >
        {dateNumber}
      </span>
    </button>
  );
};
