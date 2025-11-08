'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  className?: string;
}

/**
 * ContextMenu Component
 * 
 * Displays a context menu (right-click menu) at a specific position.
 * 
 * Features:
 * - Dynamic positioning near cursor or button
 * - Auto-adjusts if near screen edges
 * - Click outside to dismiss
 * - Auto-close on item selection
 * - Escape key to close
 * - Keyboard navigation (Arrow keys, Enter)
 * - Support for danger variant (red text for delete actions)
 * - Icon support for menu items
 * 
 * @example
 * ```tsx
 * const [menuState, setMenuState] = useState({ isOpen: false, x: 0, y: 0 });
 * 
 * const handleRightClick = (e: React.MouseEvent) => {
 *   e.preventDefault();
 *   setMenuState({ isOpen: true, x: e.clientX, y: e.clientY });
 * };
 * 
 * const menuItems: ContextMenuItem[] = [
 *   { id: 'edit', label: 'Edit', icon: <EditIcon />, onClick: () => console.log('Edit') },
 *   { id: 'delete', label: 'Delete', icon: <TrashIcon />, onClick: () => console.log('Delete'), variant: 'danger' }
 * ];
 * 
 * <div onContextMenu={handleRightClick}>
 *   Right click me
 * </div>
 * <ContextMenu
 *   items={menuItems}
 *   isOpen={menuState.isOpen}
 *   onClose={() => setMenuState(prev => ({ ...prev, isOpen: false }))}
 *   position={{ x: menuState.x, y: menuState.y }}
 * />
 * ```
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  isOpen,
  onClose,
  position,
  className,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Calculate adjusted position to prevent menu from going off-screen
  const adjustedPosition = React.useMemo(() => {
    if (!isOpen) return position;

    // This will be refined after first render when we have menuRef dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const estimatedMenuWidth = 180; // min-w-[180px]
    const estimatedMenuHeight = items.length * 40; // Rough estimate

    let { x, y } = position;

    // Adjust horizontal position
    if (x + estimatedMenuWidth > viewportWidth) {
      x = viewportWidth - estimatedMenuWidth - 10; // 10px padding from edge
    }
    if (x < 0) {
      x = 10;
    }

    // Adjust vertical position
    if (y + estimatedMenuHeight > viewportHeight) {
      y = viewportHeight - estimatedMenuHeight - 10; // 10px padding from edge
    }
    if (y < 0) {
      y = 10;
    }

    return { x, y };
  }, [isOpen, position, items.length]);

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Small delay to prevent immediate close from the same click that opened the menu
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle Escape key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const enabledIndices = items
        .map((item, index) => (!item.disabled ? index : -1))
        .filter((index) => index !== -1);

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex((prev) => {
          const currentEnabledIndex = enabledIndices.indexOf(prev);
          const nextEnabledIndex =
            currentEnabledIndex === -1 || currentEnabledIndex === enabledIndices.length - 1
              ? enabledIndices[0]
              : enabledIndices[currentEnabledIndex + 1];
          return nextEnabledIndex;
        });
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex((prev) => {
          const currentEnabledIndex = enabledIndices.indexOf(prev);
          const prevEnabledIndex =
            currentEnabledIndex === -1 || currentEnabledIndex === 0
              ? enabledIndices[enabledIndices.length - 1]
              : enabledIndices[currentEnabledIndex - 1];
          return prevEnabledIndex;
        });
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          const item = items[focusedIndex];
          if (!item.disabled) {
            item.onClick();
            onClose();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, items, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled) return;
    item.onClick();
    onClose();
  };

  return (
    <>
      {/* Backdrop - invisible, just for accessibility */}
      <div
        className="fixed inset-0"
        style={{ zIndex: 40 }}
        aria-hidden="true"
      />

      {/* Context Menu */}
      <div
        ref={menuRef}
        role="menu"
        aria-orientation="vertical"
        className={cn(
          'fixed min-w-[180px] rounded-lg border border-zinc-700',
          'bg-zinc-800 shadow-xl',
          'py-1',
          'animate-in fade-in-0 zoom-in-95 duration-100',
          className
        )}
        style={{
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
          zIndex: 50,
        }}
      >
        {items.map((item, index) => {
          const isFocused = focusedIndex === index;
          const variantStyles =
            item.variant === 'danger'
              ? 'text-red-400 hover:bg-red-950/50 hover:text-red-300'
              : 'text-zinc-200 hover:bg-zinc-700 hover:text-white';

          return (
            <button
              key={item.id}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setFocusedIndex(index)}
              className={cn(
                'w-full px-3 py-2',
                'flex items-center gap-3',
                'text-left text-sm',
                'transition-colors duration-150',
                'outline-none',
                item.disabled
                  ? 'text-zinc-500 cursor-not-allowed opacity-50'
                  : variantStyles,
                isFocused && !item.disabled && 'bg-zinc-700'
              )}
            >
              {item.icon && (
                <span className="shrink-0 w-4 h-4">{item.icon}</span>
              )}
              <span className="flex-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

/**
 * Hook for managing context menu state
 * 
 * @example
 * ```tsx
 * const { menuState, openMenu, closeMenu } = useContextMenu();
 * 
 * const handleRightClick = (e: React.MouseEvent) => {
 *   e.preventDefault();
 *   openMenu(e.clientX, e.clientY);
 * };
 * 
 * <div onContextMenu={handleRightClick}>Right click me</div>
 * <ContextMenu
 *   items={menuItems}
 *   isOpen={menuState.isOpen}
 *   onClose={closeMenu}
 *   position={{ x: menuState.x, y: menuState.y }}
 * />
 * ```
 */
export const useContextMenu = () => {
  const [menuState, setMenuState] = useState({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const openMenu = (x: number, y: number) => {
    setMenuState({ isOpen: true, x, y });
  };

  const closeMenu = () => {
    setMenuState((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    menuState,
    openMenu,
    closeMenu,
  };
};
