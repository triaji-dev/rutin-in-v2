/**
 * Utility functions for Rutin.in habit tracker application
 */

import { clsx, type ClassValue } from 'clsx';
import { WEEKLY_DAYS_COUNT, OVERVIEW_DAYS_COUNT } from './constants';

/**
 * Formats a Date object to "YYYY-MM-DD" string
 * @param date - Date object to format
 * @returns Formatted date string in "YYYY-MM-DD" format
 *
 * @example
 * formatDate(new Date('2025-01-10')) // "2025-01-10"
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Gets an array of the last 7 days (including today) in reverse chronological order
 * Used for weekly view display
 * @returns Array of Date objects for the last 7 days, reversed (oldest to newest when rendered left to right)
 *
 * @example
 * getWeekDays() // [7 days ago, 6 days ago, ..., yesterday, today]
 */
export function getWeekDays(): Date[] {
  const days: Date[] = [];
  const today = new Date();

  for (let i = WEEKLY_DAYS_COUNT - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date);
  }

  return days;
}

/**
 * Gets an array of the last 126 days (18 weeks) in reverse chronological order
 * Used for overview/grid view display
 * @returns Array of Date objects for the last 126 days, reversed (oldest to newest when rendered)
 *
 * @example
 * getOverviewDays() // [126 days ago, 125 days ago, ..., yesterday, today]
 */
export function getOverviewDays(): Date[] {
  const days: Date[] = [];
  const today = new Date();

  for (let i = OVERVIEW_DAYS_COUNT - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date);
  }

  return days;
}

/**
 * Combines class names conditionally using clsx
 * Useful for conditional Tailwind classes
 * @param inputs - Class values to combine
 * @returns Combined class string
 *
 * @example
 * cn('base-class', condition && 'conditional-class', { 'object-class': true })
 * // "base-class conditional-class object-class"
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Escapes HTML special characters in a string to prevent XSS attacks
 * @param text - Text to escape
 * @returns Escaped text safe for HTML rendering
 *
 * @example
 * escapeHTML('<script>alert("xss")</script>')
 * // "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 */
export function escapeHTML(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'/]/g, char => map[char] || char);
}

/**
 * Gets the day name from a Date object
 * @param date - Date object
 * @returns Short day name (Mon, Tue, etc.)
 *
 * @example
 * getDayName(new Date('2025-01-10')) // "Fri"
 */
export function getDayName(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

/**
 * Gets the month name from a Date object
 * @param date - Date object
 * @param short - Whether to return short month name (default: true)
 * @returns Month name
 *
 * @example
 * getMonthName(new Date('2025-01-10')) // "Jan"
 * getMonthName(new Date('2025-01-10'), false) // "January"
 */
export function getMonthName(date: Date, short: boolean = true): string {
  const months = short
    ? [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
    : [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
  return months[date.getMonth()];
}

/**
 * Checks if two dates are the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if dates are the same day
 *
 * @example
 * isSameDay(new Date('2025-01-10'), new Date('2025-01-10')) // true
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return formatDate(date1) === formatDate(date2);
}

/**
 * Checks if a date is today
 * @param date - Date to check
 * @returns True if date is today
 *
 * @example
 * isToday(new Date()) // true
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 *
 * @example
 * const debouncedSave = debounce(() => saveToLocalStorage(), 500);
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generates a unique habit ID based on timestamp
 * @returns Habit ID in format "habit-${timestamp}"
 *
 * @example
 * generateHabitId() // "habit-1704931200000"
 */
export function generateHabitId(): string {
  return `habit-${Date.now()}`;
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 *
 * @example
 * truncateText("This is a long text", 10) // "This is a..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Downloads a file with the given content and filename
 * @param content - File content as string
 * @param filename - Filename for download
 * @param mimeType - MIME type (default: application/json)
 *
 * @example
 * downloadFile(JSON.stringify(data), 'backup.json')
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string = 'application/json'
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
