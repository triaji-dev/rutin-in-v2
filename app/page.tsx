'use client';

import React from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Header } from '@/components/Header';
import { useHabitsArray } from '@/hooks/useHabits';

/**
 * Home Page Component
 * 
 * Main application page displaying the habit tracker interface.
 * 
 * Features:
 * - Header with logo, download/upload, and view toggle
 * - Main container for habit cards
 * - DndContext for drag and drop functionality
 * - Dark theme styling
 * - Responsive layout
 * 
 * Phase 4: Basic layout and structure
 * Phase 6: Full drag & drop implementation
 */
export default function Home() {
  const habits = useHabitsArray();

  // TODO: Phase 6 - Implement drag and drop handler
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    // TODO: Implement reorder logic
    console.log('Drag ended:', { active: active.id, over: over.id });
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Drag and Drop Context */}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={habits.map((habit) => habit.id)}
            strategy={verticalListSortingStrategy}
          >
            {/* Habit Cards Container */}
            <div className="space-y-4">
              {habits.length === 0 ? (
                // Empty State
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-zinc-400 text-lg mb-2">
                    No habits yet
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Create your first habit to get started
                  </p>
                </div>
              ) : (
                // Habit Cards List
                habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="p-6 rounded-xl bg-zinc-800/70 backdrop-blur-[15px] border border-white/10"
                  >
                    {/* TODO: Phase 5 - Replace with HabitCard component */}
                    <h3 className="text-lg font-semibold text-white">
                      {habit.name || 'Untitled'}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      {habit.completedDates.size} days completed
                    </p>
                  </div>
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
}
