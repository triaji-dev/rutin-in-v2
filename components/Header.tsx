'use client';

import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ToggleGroup } from '@/components/ui/Toggle';
import { useViewMode, useHabits } from '@/hooks/useHabits';
import { useDownload } from '@/hooks/useDownload';
import { useUpload } from '@/hooks/useUpload';
import { cn } from '@/lib/utils';
import { ViewMode } from '@/lib/types';

/**
 * Header Component
 * 
 * Main application header with logo, data management buttons, and view toggle.
 * 
 * Features:
 * - Logo/title display
 * - Download button (export habits to JSON)
 * - Upload button (import habits from JSON)
 * - View mode toggle (Weekly vs Grid/Overview)
 * - Glassmorphism effect styling
 * - Sticky positioning
 * - Responsive layout
 * 
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export const Header: React.FC = () => {
  const viewMode = useViewMode();
  const setViewMode = useHabits(state => state.setViewMode);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadHabits = useDownload();
  const uploadHabits = useUpload();

  const handleDownload = () => {
    downloadHabits();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadHabits(file);
      // Reset input so same file can be selected again
      event.target.value = '';
    }
  };

  const handleViewModeChange = (value: string) => {
    setViewMode(value as ViewMode);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-30',
        'w-full',
        'px-4 sm:px-6 lg:px-8',
        'py-4',
        // Glassmorphism effect
        'bg-zinc-800/70 backdrop-blur-[15px]',
        'border-b border-white/10',
        // Shadow
        'shadow-lg shadow-black/10'
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Rutin.in
            </h1>
            <span className="hidden sm:inline text-sm text-zinc-400 font-normal">
              — Build better habits
            </span>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle */}
            <ToggleGroup
              value={viewMode}
              onValueChange={handleViewModeChange}
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'overview', label: 'Grid' },
              ]}
              className="hidden sm:flex"
            />

            {/* Download Button */}
            <Button
              variant="icon"
              size="md"
              onClick={handleDownload}
              aria-label="Download habits"
              title="Download habits as JSON"
            >
              <Download className="w-5 h-5" />
            </Button>

            {/* Upload Button */}
            <Button
              variant="icon"
              size="md"
              onClick={handleUploadClick}
              aria-label="Upload habits"
              title="Upload habits from JSON"
            >
              <Upload className="w-5 h-5" />
            </Button>

            {/* Hidden file input for upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleFileChange}
              className="hidden"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Mobile View Toggle - shown below on small screens */}
        <div className="sm:hidden mt-3">
          <ToggleGroup
            value={viewMode}
            onValueChange={handleViewModeChange}
            options={[
              { value: 'weekly', label: 'Weekly' },
              { value: 'overview', label: 'Grid' },
            ]}
            className="w-full"
          />
        </div>
      </div>
    </header>
  );
};
