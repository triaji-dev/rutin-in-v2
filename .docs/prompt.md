# Rutin.in - Habit Tracker App Rebuild Specification

## Project Overview

Build a modern, minimalist habit tracking application called **rutin.in** using **Next.js 14+, React 18+, TypeScript 5+, and Tailwind CSS v4**. The app allows users to track daily habits with visual feedback, drag-and-drop reordering, color customization, bulk operations, and data export/import functionality.

**Target Stack:**
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **Icons**: Lucide React

---

## Core Features

### 1. Habit Management
- **Create habits** with auto-generated IDs (`habit-${timestamp}`)
- **Edit habit names** by clicking on them (inline editing)
- **Delete habits** with confirmation modal
- **Drag-and-drop reordering** of habit cards
- **Color customization** (10 color themes per habit)
- **Add notes** to each habit card (not per date, per habit)

### 2. Date Tracking
- **Toggle completion** for specific dates by clicking date circles
- **Two view modes**:
  - **Weekly View**: Last 7 days with date circles showing day name and date
  - **Grid/Overview View**: Last 126 days (18 weeks) in a grid layout
- **Visual feedback**: Completed dates fill with the habit's theme color
- **Date format**: `YYYY-MM-DD` stored as Set in habit object

### 3. Select Mode (Bulk Operations)
- **Enter select mode** via context menu or dedicated button
- **Click any card** (except options button) to toggle selection
- **Bulk actions bar** appears at top with 5 buttons:
  1. **Change Color**: Apply color to all selected habits
  2. **Delete**: Remove all selected habits with confirmation
  3. **Select All**: Select all visible habits
  4. **Unselect All**: Clear selection
  5. **Exit Select Mode**: Close bulk mode and clear selection
- **Visual feedback**: Selected cards show blue border (`#3b82f6`)
- **Opacity reduction**: Habit names and dates fade in select mode

### 4. Context Menu
- **Right-click or click options button** (three dots) on card
- **Options**:
  - **Edit**: Focus on habit name input
  - **Change Color**: Open color picker modal
  - **Select Mode**: Enter select mode with current card selected
  - **Delete**: Show confirmation modal for single habit deletion

### 5. Notes Feature
- **Add/Edit notes** for each habit via context menu or dedicated button
- **Notes are attached to habit cards**, not individual dates
- **Display**: Show note preview below habit card when note exists
- **Modal interface** for creating/editing notes with:
  - Title that changes based on edit/create mode
  - Textarea for note content
  - Save button (Ctrl/Cmd+Enter shortcut)
  - Cancel button (Escape shortcut)
- **Visual indicator**: Button/icon changes color when note exists

### 6. Data Management
- **Persistent storage**: localStorage with Set serialization
- **Download habits** as JSON file with timestamp (`rutin-in-backup-YYYY-MM-DD.json`)
- **Upload/Import** JSON file to restore habits
- **Export format**:
  ```json
  {
    "version": "1.1",
    "exportedAt": "ISO timestamp",
    "habits": [
      {
        "id": "habit-1",
        "name": "Membaca Buku",
        "color": "green",
        "completedDates": ["2025-01-10", "2025-01-12"],
        "notes": "Optional notes content",
        "createdAt": 1234567890
      }
    ]
  }
  ```

### 7. View Toggle
- **Toggle between Weekly and Grid view** with animated switch
- **Label highlighting**: Active view shows white text, inactive shows gray
- **Smooth transitions** between view modes
- **Persist view preference** in state

---

## Data Structures

### Habit Object
```typescript
interface Habit {
  id: string;                    // "habit-${timestamp}"
  name: string;                  // Habit title
  color: string;                 // Color theme key (green, blue, etc.)
  completedDates: Set<string>;   // Set of "YYYY-MM-DD" strings
  notes?: string;                // Optional notes content
  createdAt?: number;            // Timestamp
}
```

### State Structure (Zustand)
```typescript
interface AppState {
  // Habits data
  habits: Habit[];
  
  // UI state
  viewMode: 'weekly' | 'overview';
  selectMode: boolean;
  selectedHabits: Set<string>;   // Set of habit IDs
  
  // Modal state
  habitToDelete: string | 'bulk' | null;
  habitToColor: string | 'bulk' | null;
  noteModalHabitId: string | null;
  
  // Drag state
  draggedItem: HTMLElement | null;
  
  // Actions
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleDate: (habitId: string, date: string) => void;
  reorderHabits: (newOrder: string[]) => void;
  
  // View actions
  setViewMode: (mode: 'weekly' | 'overview') => void;
  toggleSelectMode: () => void;
  addSelectedHabit: (id: string) => void;
  removeSelectedHabit: (id: string) => void;
  clearSelectedHabits: () => void;
  selectAllHabits: () => void;
  
  // Modal actions
  setHabitToDelete: (id: string | 'bulk' | null) => void;
  setHabitToColor: (id: string | 'bulk' | null) => void;
  setNoteModalHabitId: (id: string | null) => void;
  
  // Notes actions
  addNote: (habitId: string, note: string) => void;
  getNote: (habitId: string) => string | undefined;
  hasNote: (habitId: string) => boolean;
}
```

### Color Sets
```typescript
const COLOR_SETS: Record<string, { completed: string }> = {
  green: { completed: '#4ade80' },
  blue: { completed: '#3b82f6' },
  purple: { completed: '#a855f7' },
  pink: { completed: '#ec4899' },
  orange: { completed: '#f97316' },
  yellow: { completed: '#facc15' },
  teal: { completed: '#14b8a6' },
  red: { completed: '#ef4444' },
  indigo: { completed: '#6366f1' },
  gray: { completed: '#9ca3af' },
};
```

---

## Component Structure

### Layout Components
- **`app/layout.tsx`**: Root layout with font configuration
- **`app/page.tsx`**: Main page with header and habit container

### UI Components (`components/ui/`)
- **`Button.tsx`**: Reusable button with variants (primary, secondary, danger, ghost, icon)
- **`Modal.tsx`**: Reusable modal overlay with content container
- **`Toggle.tsx`**: Animated toggle switch component
- **`ContextMenu.tsx`**: Right-click context menu
- **`ColorPicker.tsx`**: Color swatch grid for color selection

### Main Components (`components/`)
- **`Header.tsx`**: Logo, download/upload buttons, view toggle
- **`BulkActionsBar.tsx`**: Appears in select mode with 5 action buttons
- **`HabitCard.tsx`**: Individual habit card with header, dates, drag handle, notes display
- **`HabitCardHeader.tsx`**: Card title, options button, edit input
- **`DateCircle.tsx`**: Clickable circle for weekly view dates
- **`DateGrid.tsx`**: Grid of squares for overview view
- **`NoteModal.tsx`**: Modal for creating/editing notes
- **`NoteDisplay.tsx`**: Shows note preview below habit card
- **`ConfirmModal.tsx`**: Confirmation dialog for delete actions
- **`AddActivityButton.tsx`**: Button to create new habit

### Hooks (`hooks/`)
- **`useHabits.ts`**: Zustand store hook
- **`useLocalStorage.ts`**: Sync habits to localStorage
- **`useDownload.ts`**: Export habits as JSON
- **`useUpload.ts`**: Import habits from JSON file

### Utilities (`lib/`)
- **`utils.ts`**: Helper functions (formatDate, getWeekDays, getOverviewDays, cn, escapeHTML)
- **`constants.ts`**: COLOR_SETS definition

---

## File Organization

```
rutin-in/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   └── globals.css          # Tailwind base styles
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Toggle.tsx
│   │   ├── ContextMenu.tsx
│   │   └── ColorPicker.tsx
│   ├── Header.tsx
│   ├── BulkActionsBar.tsx
│   ├── HabitCard.tsx
│   ├── HabitCardHeader.tsx
│   ├── DateCircle.tsx
│   ├── DateGrid.tsx
│   ├── NoteModal.tsx
│   ├── NoteDisplay.tsx
│   ├── ConfirmModal.tsx
│   └── AddActivityButton.tsx
├── hooks/
│   ├── useHabits.ts         # Zustand store
│   ├── useLocalStorage.ts
│   ├── useDownload.ts
│   └── useUpload.ts
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── public/
│   └── favicon.svg
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## Styling Guidelines

### Design Principles
- **Dark theme**: Background `#121212`, cards `rgba(38, 38, 38, 0.7)`
- **Glassmorphism**: Cards use `backdrop-filter: blur(15px)`
- **Inter font family**: All text uses Inter from Google Fonts
- **Rounded corners**: Cards `rounded-2xl`, buttons `rounded-lg`
- **Subtle borders**: `rgba(255, 255, 255, 0.1)` for card borders
- **Smooth transitions**: 200-300ms ease for all interactions

### Color Palette
- **Background**: `#121212` (zinc-900)
- **Card Background**: `#262626` with 70% opacity (zinc-800)
- **Text Primary**: `#e0e0e0` (zinc-200)
- **Text Secondary**: `#a1a1aa` (zinc-400)
- **Text Muted**: `#71717a` (zinc-500)
- **Border**: `rgba(255, 255, 255, 0.1)`
- **Hover Background**: `#3f3f46` (zinc-700)
- **Delete Red**: `#ef4444` (red-500)
- **Select Blue**: `#3b82f6` (blue-500)
- **Success Green**: `#16a34a` (green-600)

### Component-Specific Styles

#### Task Card
- Base: `rounded-2xl p-4 shadow-lg`
- Background: `rgba(38, 38, 38, 0.7)` with backdrop blur
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Hover: Subtle scale transform `scale(1.02)` when dragging
- Select Mode: Blue border (`#3b82f6`) when selected, reduced opacity (0.4) for inner elements

#### Date Circle (Weekly View)
- Size: `w-8 h-8`
- Border: `2px solid #52525b` (zinc-600)
- Completed: Fill with theme color, text becomes dark `#121212`
- Hover: Pointer cursor, slight scale
- Layout: Center text (date number), small label above (day name)

#### Date Square (Grid View)
- Size: `w-3.5 h-3.5` (14px)
- Background: `#2d2d2d` default
- Completed: Fill with theme color
- No interaction: Pointer events disabled
- Gap: `gap-1` between squares

#### Buttons
- **Primary**: Dark background `#3f3f46`, white text
- **Secondary**: Transparent with border `#52525b`
- **Danger**: Red background `#dc2626`
- **Ghost**: Transparent, gray text
- **Icon**: Square with hover background
- Padding: `0.5rem 1.5rem` for regular, `0.5rem` for icon
- Focus: 2px outline with offset

#### Modal
- Overlay: Black 75% opacity with backdrop blur
- Content: `#27272a` background, rounded `0.75rem`
- Max width: `20rem` for standard, `28rem` for large
- Animation: Slide in from top with scale
- Shadow: Large drop shadow `0 20px 25px -5px rgba(0, 0, 0, 0.5)`

#### Bulk Actions Bar
- Background: `#27272a` (zinc-800)
- Rounded: `1rem` with padding `0.25rem`
- Buttons: Flex layout with equal spacing
- Colors: Blue (color), Red (delete), Green (select all), Yellow (unselect), Gray (exit)

#### Context Menu
- Background: `#27272a` with border
- Rounded: `0.5rem` with `0.25rem` padding
- Min width: `9rem`
- Items: Hover background `#3f3f46`
- Delete item: Red text `#ef4444`
- Animation: Slide in from top `8px` with fade

#### Toggle Switch
- Width: `2.75rem`, Height: `1.5rem`
- Background: `#3f3f46` off, `#16a34a` on
- Slider: White circle, 1.25rem diameter
- Transition: 200ms ease for all properties

#### Note Display
- Appears below habit card when note exists
- Background: Slightly darker than card
- Rounded corners with subtle border
- Truncated text with "Read more" link
- Max height with overflow handling

---

## User Interactions

### Habit Name Editing
1. Click on habit name to enter edit mode
2. Input appears with current value selected
3. Press Enter or blur to save
4. If empty, defaults to "Untitled"

### Date Completion Toggle
1. **Weekly View**: Click date circle to toggle
2. **Grid View**: No interaction (display only)
3. Visual feedback: Fill with theme color when completed
4. Date format: `YYYY-MM-DD` added/removed from Set

### Drag and Drop
1. Grab habit card (not in select mode)
2. Drag to new position
3. Other cards shift to make space
4. Drop to reorder, saves to localStorage
5. Visual: Opacity 0.5 and scale 1.02 while dragging

### Color Picker
1. Open via context menu or bulk actions
2. Modal shows 10 color swatches
3. Click swatch to apply color
4. Updates habit card theme immediately
5. Bulk mode applies to all selected habits

### Select Mode
1. Enter via context menu or long press
2. Click cards to toggle selection (blue border)
3. Bulk actions bar appears at top
4. Perform bulk operations
5. Exit clears selection and hides bar

### Context Menu
1. Right-click or click three-dot button on card
2. Menu appears near cursor/button
3. Click option to perform action
4. Menu closes automatically
5. Click outside to dismiss

### Notes
1. Open note modal via context menu or note button
2. Modal title changes: "Add Note" or "Edit Note"
3. Type in textarea
4. Save with button or Ctrl/Cmd+Enter
5. Cancel with button or Escape key
6. Note preview appears below card when exists
7. Click preview to re-open modal for editing

### Download/Upload
1. **Download**: Click download icon, saves JSON with timestamp
2. **Upload**: Click upload icon, select JSON file
3. Validation: Check data structure before import
4. Success: Replace all habits with imported data
5. Error: Show alert with error message

---

## Behavior Specifications

### Default State
- Load habits from localStorage on mount
- If no data, create one default habit: "Membaca Buku" (green) with 2 completed dates
- View mode defaults to "weekly"
- Select mode off by default
- No modals open

### LocalStorage Sync
- Save habits after every change (add, edit, delete, reorder, toggle date, add note)
- Serialize Set to Array for storage
- Deserialize Array to Set on load
- Key: `'habits'`
- Format: JSON string of habits array

### View Mode Toggle
- Animate switch slider
- Update label colors (active = white, inactive = gray)
- Re-render habit cards with appropriate view
- Weekly: Show last 7 days with date circles
- Grid: Show last 126 days as small squares

### Select Mode
- Disable drag-and-drop when active
- Change cursor to pointer on cards
- Show blue border on selected cards
- Reduce opacity of card content (0.4)
- Show bulk actions bar
- Allow single-click selection toggle

### Bulk Operations
- **Change Color**: Show color modal, apply to all selected
- **Delete**: Show confirmation modal with count
- **Select All**: Add all habit IDs to selection Set
- **Unselect All**: Clear selection Set
- **Exit**: Toggle select mode off, clear selection

### Modal Behavior
- **Backdrop click**: Close modal (optional)
- **Escape key**: Close modal
- **Animation**: Fade in with slide up
- **Focus trap**: Tab cycles through modal elements
- **Confirmation modals**: Show specific message based on context (single delete, bulk delete)
- **Note modal**: Auto-focus textarea, show save/cancel buttons

### Error Handling
- **Empty habit name**: Default to "Untitled"
- **Invalid JSON upload**: Show alert with error
- **No habits to download**: Show alert
- **Failed localStorage**: Fallback to in-memory state

### Keyboard Shortcuts
- **Enter**: Save habit name edit
- **Escape**: Close modals, cancel edit
- **Ctrl/Cmd+Enter**: Save note in note modal

---

## Technical Implementation Notes

### Next.js App Router
- Use Server Components by default
- Client Components for interactive elements (mark with `'use client'`)
- Organize components by feature and UI primitives

### TypeScript
- Define strict types for all props
- Use interfaces for data structures
- Type all Zustand actions and state
- Enable strict mode in tsconfig

### Tailwind CSS v4
- Use arbitrary values for custom colors
- Leverage opacity modifiers (`bg-black/75`)
- Use `cn()` utility from `clsx` for conditional classes
- Configure custom colors in theme if needed

### Zustand Store
- Single store for all app state
- Persist habits to localStorage with middleware
- Separate actions for clarity
- Use selectors to prevent unnecessary re-renders

### @dnd-kit
- Use `DndContext` at app level
- `SortableContext` for habit list
- `useSortable` hook in HabitCard
- Handle drag events with Zustand actions

### LocalStorage
- Sync on every state change
- Serialize Sets as Arrays
- Handle errors gracefully
- Use `useEffect` hook for sync

### Date Handling
- All dates in `YYYY-MM-DD` format
- Use native Date object for calculations
- Format consistently across views
- getWeekDays: Last 7 days, reversed
- getOverviewDays: Last 126 days (18 weeks), reversed

---

## Visual Design Details

### Card Layout
```
┌─────────────────────────────────────┐
│  [Icon] Habit Name           [···]  │ ← Header
│                                      │
│  Mon  Tue  Wed  Thu  Fri  Sat  Sun  │ ← Weekly View
│   10   11   12   13   14   15   16  │
│   ○    ●    ○    ●    ○    ○    ○   │
│                                      │
│  [Note Preview if exists]           │ ← Note Display
└─────────────────────────────────────┘
```

### Grid View Layout
```
┌─────────────────────────────────────┐
│  [Icon] Habit Name           [···]  │
│                                      │
│  ■ ■ ■ ■ ■ ■ ■  (18 columns)        │
│  ■ □ ■ ■ □ ■ ■                      │
│  ■ ■ ■ □ ■ ■ ■  (7 rows)            │
│  ... (126 squares total)             │
└─────────────────────────────────────┘
```

### Bulk Actions Bar
```
┌─────────────────────────────────────┐
│  [🎨]  [🗑️]  [☑]  [☐]  [✕]        │
│ Color Delete Sel Unsel Exit         │
└─────────────────────────────────────┘
```

---

## Accessibility

- **Keyboard navigation**: Tab through all interactive elements
- **Focus indicators**: Visible outlines on focus
- **ARIA labels**: Add to icon buttons
- **Screen reader text**: Describe actions
- **Color contrast**: WCAG AA compliant
- **Touch targets**: Minimum 44x44px
- **Error messages**: Clear and descriptive

---

## Performance Considerations

- **Memoize components**: Use React.memo for habit cards
- **Virtual scrolling**: If habit list grows large
- **Debounce localStorage**: Batch writes with debounce
- **Optimize re-renders**: Use Zustand selectors
- **Lazy load modals**: Code split if needed
- **Image optimization**: Use Next.js Image component if adding images

---

## Future Enhancements (Optional)

- **Habit statistics**: Show streak, completion rate
- **Categories/tags**: Group habits by category
- **Reminders**: Notification system
- **Dark/light theme**: Theme toggle
- **Mobile app**: React Native version
- **Cloud sync**: Backend with authentication
- **Habit templates**: Pre-made habit suggestions
- **Export to CSV**: Additional export format
- **Undo/redo**: Action history
- **Habit archiving**: Hide completed habits

---

## Development Workflow

### Setup Steps
1. Initialize Next.js project with TypeScript and Tailwind
2. Install dependencies: zustand, @dnd-kit, lucide-react, clsx
3. Configure Tailwind CSS v4 with custom theme
4. Set up folder structure as specified
5. Create Zustand store with all state and actions
6. Build UI components library (Button, Modal, Toggle, etc.)
7. Implement main components (Header, HabitCard, etc.)
8. Add drag-and-drop functionality
9. Implement localStorage persistence
10. Add download/upload features
11. Implement notes system
12. Test all interactions and edge cases
13. Optimize performance and accessibility

### Testing Checklist
- [ ] Create new habit
- [ ] Edit habit name
- [ ] Delete single habit with confirmation
- [ ] Toggle date completion in weekly view
- [ ] Switch between weekly and grid view
- [ ] Drag and drop to reorder habits
- [ ] Change single habit color
- [ ] Enter select mode
- [ ] Select/unselect individual habits
- [ ] Select all habits
- [ ] Unselect all habits
- [ ] Bulk change color
- [ ] Bulk delete with confirmation
- [ ] Exit select mode
- [ ] Add note to habit
- [ ] Edit existing note
- [ ] View note preview
- [ ] Download habits as JSON
- [ ] Upload habits from JSON
- [ ] LocalStorage persistence
- [ ] Default habit creation on first load
- [ ] Keyboard shortcuts (Enter, Escape, Ctrl+Enter)
- [ ] Context menu interactions
- [ ] Modal animations
- [ ] Responsive design
- [ ] Accessibility features

---

## Example Usage Scenarios

### Scenario 1: First-Time User
1. User opens app for the first time
2. App creates default habit "Membaca Buku" with 2 completed dates
3. User sees weekly view with last 7 days
4. User clicks "Add Activity" to create new habit
5. User edits habit name by clicking on it
6. User clicks date circles to mark completions
7. User changes habit color via context menu

### Scenario 2: Power User
1. User has 10+ habits
2. User enters select mode via context menu
3. User selects 5 habits by clicking on them
4. User changes all selected habits to blue
5. User unselects all and selects different habits
6. User bulk deletes 3 habits with confirmation
7. User exits select mode

### Scenario 3: Data Management
1. User wants to backup data
2. User clicks download icon
3. JSON file downloads with timestamp
4. User moves to new device
5. User clicks upload icon
6. User selects JSON file
7. All habits restored with history

### Scenario 4: Notes Management
1. User wants to add context to a habit
2. User opens context menu on habit card
3. User clicks "Add Note"
4. Modal opens with textarea
5. User types note content
6. User presses Ctrl+Enter to save
7. Note preview appears below habit card
8. User clicks preview to edit note later

---

## Code Style Guidelines

### TypeScript
- Use explicit types, avoid `any`
- Prefer interfaces over types for objects
- Use enums for fixed sets of values
- Destructure props in function signature

### React
- Functional components with hooks
- Props interfaces above component
- Destructure props for clarity
- Use early returns for guards
- Keep components small and focused

### Naming Conventions
- Components: PascalCase (HabitCard)
- Hooks: camelCase with "use" prefix (useHabits)
- Utils: camelCase (formatDate)
- Constants: UPPER_SNAKE_CASE (COLOR_SETS)
- Files: Match component name (HabitCard.tsx)

### File Organization
- One component per file
- Index files for barrel exports
- Co-locate tests with components
- Group related utilities

---

## API Reference (Zustand Store)

### State Selectors
```typescript
const habits = useHabits(state => state.habits);
const viewMode = useHabits(state => state.viewMode);
const selectMode = useHabits(state => state.selectMode);
const selectedHabits = useHabits(state => state.selectedHabits);
```

### Actions
```typescript
// Habit CRUD
useHabits.getState().addHabit(newHabit);
useHabits.getState().updateHabit(id, { name: 'New Name' });
useHabits.getState().deleteHabit(id);

// Date toggling
useHabits.getState().toggleDate(habitId, '2025-01-10');

// View mode
useHabits.getState().setViewMode('overview');

// Select mode
useHabits.getState().toggleSelectMode();
useHabits.getState().addSelectedHabit(id);
useHabits.getState().selectAllHabits();

// Notes
useHabits.getState().addNote(habitId, 'Note content');
const note = useHabits.getState().getNote(habitId);
const hasNote = useHabits.getState().hasNote(habitId);
```

---

## Utility Functions

### formatDate
```typescript
// Converts Date object to "YYYY-MM-DD" string
formatDate(new Date()) // "2025-01-10"
```

### getWeekDays
```typescript
// Returns array of last 7 days (Date objects), reversed
getWeekDays() // [7 days ago, 6 days ago, ..., today]
```

### getOverviewDays
```typescript
// Returns array of last 126 days (Date objects), reversed
getOverviewDays() // [126 days ago, ..., today]
```

### cn (classnames utility)
```typescript
// Combines classnames conditionally
cn('base-class', condition && 'conditional-class', { 'object-class': true })
```

### escapeHTML
```typescript
// Escapes HTML special characters in strings for safe rendering
escapeHTML('<script>alert("xss")</script>') // "&lt;script&gt;..."
```

---

## Color Theme Configuration

Each habit can use one of 10 color themes. The `completed` color is applied to:
- Filled date circles in weekly view
- Filled squares in grid view
- Habit name text
- Border accent (subtle)

**Available Colors:**
- **Green**: `#4ade80` - Fresh, natural
- **Blue**: `#3b82f6` - Calm, focus
- **Purple**: `#a855f7` - Creative, unique
- **Pink**: `#ec4899` - Energetic, fun
- **Orange**: `#f97316` - Warm, active
- **Yellow**: `#facc15` - Bright, optimistic
- **Teal**: `#14b8a6` - Balanced, modern
- **Red**: `#ef4444` - Passionate, urgent
- **Indigo**: `#6366f1` - Deep, thoughtful
- **Gray**: `#9ca3af` - Neutral, subtle

---

## Summary

This specification provides a complete blueprint for rebuilding the rutin.in habit tracker app using modern web technologies. The app focuses on simplicity, visual appeal, and smooth interactions while providing powerful features like bulk operations, notes, and data portability. Follow the component structure, styling guidelines, and behavior specifications to create a polished, production-ready application.

**Key Principles:**
- **Minimalist design**: Clean, dark theme with subtle accents
- **Smooth interactions**: Transitions and animations for all actions
- **Flexible organization**: Drag-drop reordering, color coding, notes
- **Data ownership**: Export/import functionality for user control
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized re-renders and efficient state management

Build each feature incrementally, test thoroughly, and iterate based on user feedback. The goal is a delightful, functional habit tracking experience that users will love to use daily.
