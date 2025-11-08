'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ColorKey } from '@/lib/types';
import { COLOR_SETS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

interface DateGridProps {
  dates: Date[];
  completedDates: Set<string>;
  color: ColorKey;
  className?: string;
}

/**
 * DateGrid Component
 * 
 * Grid of 126 squares (18 weeks x 7 days) for overview display.
 * 
 * Features:
 * - Display 126 date squares (18 weeks)
 * - Apply theme color for completed dates
 * - No interaction (display only)
 * - Size: w-3.5 h-3.5 (14x14px)
 * - Gap: gap-1 (4px)
 * - Grid layout: 7 columns (one week per row)
 * 
 * @example
 * ```tsx
 * <DateGrid
 *   dates={getOverviewDays()}
 *   completedDates={habit.completedDates}
 *   color={habit.color}
 * />
 * ```
 */
export const DateGrid: React.FC<DateGridProps> = ({
  dates,
  completedDates,
  color,
  className,
}) => {
  const colorValue = COLOR_SETS[color].completed;

  return (
    <div
      className={cn(
        'grid grid-cols-7 gap-0.5',
        className
      )}
      role="img"
      aria-label="Habit completion history grid"
    >
      {dates.map((date, index) => {
        const dateString = formatDate(date);
        const isCompleted = completedDates.has(dateString);

        return (
          <div
            key={`${dateString}-${index}`}
            className={cn(
              'w-2.5 h-2.5',
              'rounded-sm',
              'transition-colors duration-150',
              isCompleted ? '' : 'bg-zinc-800/60'
            )}
            style={
              isCompleted
                ? {
                    backgroundColor: colorValue,
                  }
                : undefined
            }
            title={`${date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}${isCompleted ? ' - completed' : ''}`}
          />
        );
      })}
    </div>
  );
};
