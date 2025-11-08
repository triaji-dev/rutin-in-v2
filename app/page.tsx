'use client';

import { Header } from '@/components/Header';
import { HabitCard } from '@/components/HabitCard';
import { BulkActionsBar } from '@/components/BulkActionsBar';
import { useHabitStore } from '@/lib/store';
import { Plus } from 'lucide-react';

export default function Home() {
  const { habits, selectMode, addHabit } = useHabitStore();

  const handleAddHabit = () => {
    const colors = Object.keys(COLOR_SETS);
    const lastColor = habits[habits.length - 1]?.color;
    const availableColors = colors.filter((c) => c !== lastColor);
    const randomColor =
      availableColors[Math.floor(Math.random() * availableColors.length)];

    addHabit({
      id: `habit-${Date.now()}`,
      name: 'New Activity',
      color: randomColor,
      completedDates: new Set(),
      createdAt: Date.now(),
    });
  };

  return (
    <div className="container mx-auto max-w-sm p-4 pt-6 min-h-screen bg-zinc-900">
      <Header />
      
      {selectMode && <BulkActionsBar />}

      <div className="space-y-4">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>

      <button
        onClick={handleAddHabit}
        className="mt-6 w-full bg-zinc-800 border border-dashed border-zinc-600 hover:bg-zinc-700 text-zinc-400 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add Activity
      </button>
    </div>
  );
}