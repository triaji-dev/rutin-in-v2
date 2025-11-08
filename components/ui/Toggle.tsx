/**
 * Toggle/Switch component with smooth animations
 * Used for view mode switching and other boolean states
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps {
  /** Whether the toggle is checked/active */
  checked: boolean;
  
  /** Callback when toggle state changes */
  onChange: (checked: boolean) => void;
  
  /** Optional label for the toggle */
  label?: string;
  
  /** Size of the toggle */
  size?: 'sm' | 'md' | 'lg';
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Custom className */
  className?: string;
  
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Animated Toggle/Switch component
 * 
 * @example
 * ```tsx
 * const [isEnabled, setIsEnabled] = useState(false);
 * 
 * <Toggle
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   label="Enable Feature"
 * />
 * ```
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  size = 'md',
  disabled = false,
  className,
  ariaLabel,
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  // Size variants
  const sizeStyles = {
    sm: {
      container: 'h-5 w-9',
      slider: 'h-4 w-4',
      translate: 'translate-x-4',
    },
    md: {
      container: 'h-6 w-11',
      slider: 'h-5 w-5',
      translate: 'translate-x-5',
    },
    lg: {
      container: 'h-7 w-14',
      slider: 'h-6 w-6',
      translate: 'translate-x-7',
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      {/* Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel || label}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          // Base styles
          'relative inline-flex items-center rounded-full',
          'transition-colors duration-200 ease-in-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'focus-visible:ring-green-500 focus-visible:ring-offset-zinc-900',
          // Size
          currentSize.container,
          // Colors based on state
          checked
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-zinc-700 hover:bg-zinc-600',
          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer'
        )}
      >
        {/* Slider Circle */}
        <span
          className={cn(
            // Base styles
            'inline-block rounded-full bg-white',
            'transition-transform duration-200 ease-in-out',
            'shadow-sm',
            // Size
            currentSize.slider,
            // Position based on checked state
            checked ? currentSize.translate : 'translate-x-0.5'
          )}
        />
      </button>

      {/* Optional Label */}
      {label && (
        <span
          className={cn(
            'text-sm font-medium select-none',
            disabled ? 'text-zinc-500' : 'text-zinc-300',
            !disabled && 'cursor-pointer'
          )}
          onClick={handleToggle}
        >
          {label}
        </span>
      )}
    </div>
  );
};

/**
 * Toggle Group component for mutually exclusive options (like view modes)
 */
export interface ToggleGroupProps {
  /** Current selected value */
  value: string;
  
  /** Callback when value changes */
  onValueChange: (value: string) => void;
  
  /** Options to display */
  options: Array<{
    value: string;
    label: string;
  }>;
  
  /** Custom className */
  className?: string;
  
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Toggle Group for mutually exclusive options
 * Perfect for view mode switching (Weekly vs Grid)
 * 
 * @example
 * ```tsx
 * <ToggleGroup
 *   value={viewMode}
 *   onValueChange={setViewMode}
 *   options={[
 *     { value: 'weekly', label: 'Weekly' },
 *     { value: 'overview', label: 'Grid' }
 *   ]}
 * />
 * ```
 */
export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  value,
  onValueChange,
  options,
  className,
  disabled = false,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1',
        'bg-zinc-800 rounded-lg p-1',
        'border border-zinc-700',
        className
      )}
      role="group"
    >
      {options.map((option) => {
        const isActive = value === option.value;
        
        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onValueChange(option.value)}
            className={cn(
              // Base styles
              'px-4 py-1.5 rounded-md',
              'text-sm font-medium',
              'transition-all duration-200 ease-in-out',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'focus-visible:ring-green-500 focus-visible:ring-offset-zinc-900',
              // Active state
              isActive
                ? 'bg-zinc-700 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50',
              // Disabled state
              disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
