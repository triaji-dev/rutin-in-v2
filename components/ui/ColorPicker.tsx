'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { COLOR_SETS } from '@/lib/constants';
import { ColorKey } from '@/lib/types';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  selectedColor?: ColorKey;
  onColorSelect: (color: ColorKey) => void;
  className?: string;
}

/**
 * ColorPicker Component
 * 
 * Displays a grid of 10 color swatches for habit color selection.
 * 
 * Features:
 * - Grid layout (5 columns x 2 rows)
 * - Visual feedback on hover (scale, ring)
 * - Shows checkmark for selected color
 * - Smooth transitions
 * - Touch-friendly (44x44px targets)
 * - Keyboard accessible
 * 
 * @example
 * ```tsx
 * <ColorPicker
 *   selectedColor="green"
 *   onColorSelect={(color) => updateHabitColor(habitId, color)}
 * />
 * ```
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
  className,
}) => {
  const [hoveredColor, setHoveredColor] = useState<ColorKey | null>(null);

  // Get all color keys in consistent order
  const colorKeys: ColorKey[] = [
    'green',
    'blue',
    'purple',
    'pink',
    'orange',
    'yellow',
    'teal',
    'red',
    'indigo',
    'gray',
  ];

  const handleColorClick = (color: ColorKey) => {
    onColorSelect(color);
  };

  const handleKeyDown = (event: React.KeyboardEvent, color: ColorKey) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleColorClick(color);
    }
  };

  return (
    <div
      className={cn(
        'grid grid-cols-5 gap-3',
        'p-4',
        className
      )}
      role="radiogroup"
      aria-label="Select habit color"
    >
      {colorKeys.map((colorKey) => {
        const isSelected = selectedColor === colorKey;
        const isHovered = hoveredColor === colorKey;
        const colorValue = COLOR_SETS[colorKey].completed;

        return (
          <button
            key={colorKey}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${colorKey} color`}
            onClick={() => handleColorClick(colorKey)}
            onKeyDown={(e) => handleKeyDown(e, colorKey)}
            onMouseEnter={() => setHoveredColor(colorKey)}
            onMouseLeave={() => setHoveredColor(null)}
            className={cn(
              // Size & shape
              'w-11 h-11 rounded-full',
              // Layout
              'flex items-center justify-center',
              // Border & ring
              'border-2 border-transparent',
              'ring-2 ring-transparent',
              // Transitions
              'transition-all duration-200 ease-in-out',
              // Focus
              'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900',
              // Hover effects
              isHovered && 'scale-110 ring-white/30',
              // Selected state
              isSelected && 'ring-white/50',
              // Cursor
              'cursor-pointer'
            )}
            style={{
              backgroundColor: colorValue,
            }}
          >
            {/* Checkmark for selected color */}
            {isSelected && (
              <Check
                className="w-5 h-5 text-white drop-shadow-lg"
                strokeWidth={3}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

/**
 * ColorPickerModal Component
 * 
 * A ready-to-use modal wrapper for ColorPicker.
 * Useful for displaying color picker in a modal dialog.
 * 
 * @example
 * ```tsx
 * <ColorPickerModal
 *   isOpen={isColorModalOpen}
 *   onClose={() => setIsColorModalOpen(false)}
 *   selectedColor={habit.color}
 *   onColorSelect={(color) => {
 *     updateHabitColor(habit.id, color);
 *     setIsColorModalOpen(false);
 *   }}
 * />
 * ```
 */
interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor?: ColorKey;
  onColorSelect: (color: ColorKey) => void;
  title?: string;
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
  onColorSelect,
  title = 'Choose Color',
}) => {
  if (!isOpen) return null;

  const handleColorSelect = (color: ColorKey) => {
    onColorSelect(color);
    // Auto-close modal after selection
    setTimeout(() => {
      onClose();
    }, 150); // Small delay for visual feedback
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="color-picker-title"
      >
        <div
          className={cn(
            'bg-zinc-800 rounded-xl shadow-2xl',
            'border border-zinc-700',
            'w-full max-w-sm',
            'animate-in fade-in zoom-in-95 duration-200'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-zinc-700">
            <h2
              id="color-picker-title"
              className="text-lg font-semibold text-white"
            >
              {title}
            </h2>
          </div>

          {/* Color Grid */}
          <ColorPicker
            selectedColor={selectedColor}
            onColorSelect={handleColorSelect}
            className="px-2 py-2"
          />

          {/* Footer */}
          <div className="px-6 py-4 border-t border-zinc-700 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'px-4 py-2 rounded-lg',
                'text-sm font-medium',
                'text-zinc-300 hover:text-white',
                'bg-zinc-700 hover:bg-zinc-600',
                'transition-colors duration-150',
                'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800'
              )}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Compact ColorPicker variant
 * Smaller size for inline use in forms or cards
 */
interface CompactColorPickerProps {
  selectedColor?: ColorKey;
  onColorSelect: (color: ColorKey) => void;
  className?: string;
}

export const CompactColorPicker: React.FC<CompactColorPickerProps> = ({
  selectedColor,
  onColorSelect,
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex flex-wrap gap-2',
        className
      )}
      role="radiogroup"
      aria-label="Select color"
    >
      {(['green', 'blue', 'purple', 'pink', 'orange', 'yellow', 'teal', 'red', 'indigo', 'gray'] as ColorKey[]).map((colorKey) => {
        const isSelected = selectedColor === colorKey;
        const colorValue = COLOR_SETS[colorKey].completed;

        return (
          <button
            key={colorKey}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${colorKey} color`}
            onClick={() => onColorSelect(colorKey)}
            className={cn(
              'w-8 h-8 rounded-full',
              'flex items-center justify-center',
              'border-2',
              'transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900',
              'hover:scale-110',
              isSelected ? 'border-white scale-110' : 'border-transparent'
            )}
            style={{
              backgroundColor: colorValue,
            }}
          >
            {isSelected && (
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            )}
          </button>
        );
      })}
    </div>
  );
};
