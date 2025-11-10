'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface AddActivityButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * AddActivityButton Component
 * 
 * Floating action button for creating new habits.
 * 
 * Features:
 * - Floating position at bottom of screen
 * - Primary button style with + icon
 * - Smooth animations and hover effects
 * - Accessible with aria-label
 * 
 * @example
 * ```tsx
 * <AddActivityButton onClick={handleAddHabit} />
 * ```
 */
export const AddActivityButton: React.FC<AddActivityButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <Button
      variant="primary"
      size="lg"
      onClick={onClick}
      aria-label="Add new habit"
      className={cn(
        // Fixed positioning at bottom center
        'fixed bottom-6 left-1/2 -translate-x-1/2',
        'z-20',
        // Shadow for depth
        'shadow-3xl shadow-black/30',
        // Extra padding for icon
        'px-40 py-3',
        // Hover lift effect
        'active:scale-95',
        'transition-all duration-200',
        'cursor-pointer',
        'backdrop-blur-xs',
        '!bg-black/30 hover:!bg-black/40',
        className
      )}
    >
      <Plus className="w-5 h-5 mr-2" />
      <span className="font-semibold">Add Habit</span>
    </Button>
  );
};
