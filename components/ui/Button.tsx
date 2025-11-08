/**
 * Button component with multiple variants
 * Supports primary, secondary, danger, ghost, and icon variants
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * Reusable Button component with Tailwind CSS styling
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 * 
 * <Button variant="danger" size="sm">
 *   Delete
 * </Button>
 * 
 * <Button variant="icon" aria-label="Settings">
 *   <SettingsIcon />
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles for all buttons
    const baseStyles = cn(
      'inline-flex items-center justify-center',
      'font-medium rounded-lg',
      'transition-all duration-200 ease-in-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'select-none'
    );

    // Variant styles
    const variantStyles = {
      primary: cn(
        'bg-zinc-700 text-zinc-200',
        'hover:bg-zinc-600 active:bg-zinc-800',
        'focus-visible:ring-zinc-500',
        'shadow-sm'
      ),
      secondary: cn(
        'bg-transparent text-zinc-300',
        'border border-zinc-600',
        'hover:bg-zinc-700 hover:border-zinc-500',
        'active:bg-zinc-800',
        'focus-visible:ring-zinc-500'
      ),
      danger: cn(
        'bg-red-600 text-white',
        'hover:bg-red-700 active:bg-red-800',
        'focus-visible:ring-red-500',
        'shadow-sm'
      ),
      ghost: cn(
        'bg-transparent text-zinc-400',
        'hover:bg-zinc-800 hover:text-zinc-200',
        'active:bg-zinc-700',
        'focus-visible:ring-zinc-500'
      ),
      icon: cn(
        'bg-transparent text-zinc-400',
        'hover:bg-zinc-700 hover:text-zinc-200',
        'active:bg-zinc-800',
        'focus-visible:ring-zinc-500',
        'rounded-lg'
      ),
    };

    // Size styles
    const sizeStyles = {
      sm: variant === 'icon' ? 'p-1.5 h-8 w-8' : 'px-3 py-1.5 text-sm h-8',
      md: variant === 'icon' ? 'p-2 h-10 w-10' : 'px-6 py-2 text-base h-10',
      lg: variant === 'icon' ? 'p-2.5 h-12 w-12' : 'px-8 py-3 text-lg h-12',
    };

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          isLoading && 'relative text-transparent',
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
