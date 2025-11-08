'use client';

import React from 'react';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Header } from '@/components/Header';
import { HabitCard } from '@/components/HabitCard';
import { useHabitsArray, useHabits, useSelectMode } from '@/hooks/useHabits';

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
  const selectMode = useSelectMode();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  
  const reorderHabits = useHabits((state) => state.reorderHabits);
  const updateHabit = useHabits((state) => state.updateHabit);
  const toggleDate = useHabits((state) => state.toggleDate);
  const addSelectedHabit = useHabits((state) => state.addSelectedHabit);
  const removeSelectedHabit = useHabits((state) => state.removeSelectedHabit);
  const selectedHabitsSet = useHabits((state) => state.selectedHabits);

  // Toggle habit selection
  const toggleHabitSelection = (habitId: string) => {
    if (selectedHabitsSet.has(habitId)) {
      removeSelectedHabit(habitId);
    } else {
      addSelectedHabit(habitId);
    }
  };

  // Drag start handler
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Drag end handler - reorder habits
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = habits.findIndex((h) => h.id === active.id);
    const newIndex = habits.findIndex((h) => h.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(habits, oldIndex, newIndex).map((h) => h.id);
      reorderHabits(newOrder);
    }
  };

  // Drag cancel handler
  const handleDragCancel = () => {
    setActiveId(null);
  };

  // Find the active habit for drag overlay
  const activeHabit = activeId ? habits.find((h) => h.id === activeId) : null;

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Drag and Drop Context */}
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
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
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onNameChange={(name) => updateHabit(habit.id, { name })}
                    onDateToggle={(dateString) => toggleDate(habit.id, dateString)}
                    onOptionsClick={() => {
                      // TODO: Phase 9 - Open context menu
                      console.log('Options clicked for habit:', habit.id);
                    }}
                    onNoteClick={() => {
                      // TODO: Phase 10 - Open note modal
                      console.log('Note clicked for habit:', habit.id);
                    }}
                    onCardClick={() => {
                      if (selectMode) {
                        toggleHabitSelection(habit.id);
                      }
                    }}
                    isSelectMode={selectMode}
                  />
                ))
              )}
            </div>
          </SortableContext>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeHabit ? (
              <div className="opacity-90 rotate-3 scale-105">
                <HabitCard
                  habit={activeHabit}
                  onNameChange={() => {}}
                  onDateToggle={() => {}}
                  onOptionsClick={() => {}}
                  onNoteClick={() => {}}
                  isSelectMode={false}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}
