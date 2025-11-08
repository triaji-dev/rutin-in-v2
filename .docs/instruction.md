# Instruction - Rutin.in Development Checklist

Checklist kronologis untuk membangun aplikasi Rutin.in sesuai spesifikasi di `prompt.md`.

---

## Phase 1: Project Setup & Configuration

- [x] **1.1** Initialize Next.js 14+ project dengan TypeScript dan Tailwind CSS
- [x] **1.2** Install dependencies:
  - `zustand` (state management)
  - `@dnd-kit/core` (drag & drop core)
  - `@dnd-kit/sortable` (sortable items)
  - `lucide-react` (icons)
  - `clsx` (conditional classnames)
- [x] **1.3** Configure Tailwind CSS v4 dengan custom theme:
  - Dark theme colors
  - Custom color palette (zinc, custom colors)
  - Inter font from Google Fonts
- [x] **1.4** Setup folder structure:
  - `app/` (layout, page, globals.css)
  - `components/` (main components)
  - `components/ui/` (reusable UI primitives)
  - `hooks/` (custom hooks)
  - `lib/` (utilities dan constants)
  - `public/` (static assets)
- [x] **1.5** Configure `tsconfig.json` dengan strict mode enabled
- [x] **1.6** Setup `globals.css` dengan Tailwind base styles dan custom styles

---

## Phase 2: Core Data Structures & State Management

- [x] **2.1** Create `lib/types.ts`:
  - Define `Habit` interface
  - Define `AppState` interface
  - Export all types
- [x] **2.2** Create `lib/constants.ts`:
  - Define `COLOR_SETS` dengan 10 color themes
  - Export constants
- [x] **2.3** Create `lib/utils.ts`:
  - Implement `formatDate()` function
  - Implement `getWeekDays()` function
  - Implement `getOverviewDays()` function
  - Implement `cn()` classnames utility
  - Implement `escapeHTML()` function
- [x] **2.4** Create `hooks/useHabits.ts` (Zustand store):
  - Define initial state
  - Implement habit CRUD actions (add, update, delete, reorder)
  - Implement date toggle action
  - Implement view mode actions
  - Implement select mode actions
  - Implement modal state actions
  - Implement notes actions
  - Handle Set serialization/deserialization

---

## Phase 3: UI Components Library

- [x] **3.1** Create `components/ui/Button.tsx`:
  - Implement variants: primary, secondary, danger, ghost, icon
  - Add proper TypeScript props interface
  - Style dengan Tailwind CSS
- [x] **3.2** Create `components/ui/Modal.tsx`:
  - Implement backdrop overlay
  - Implement content container
  - Handle backdrop click to close
  - Handle Escape key to close
  - Add animations (fade in, slide up)
- [x] **3.3** Create `components/ui/Toggle.tsx`:
  - Implement animated switch component
  - Handle active/inactive states
  - Add transition animations
- [x] **3.4** Create `components/ui/ContextMenu.tsx`:
  - Implement right-click menu
  - Position near cursor/button
  - Handle menu items with callbacks
  - Auto-close on selection
  - Click outside to dismiss
- [x] **3.5** Create `components/ui/ColorPicker.tsx`:
  - Display 10 color swatches dalam grid
  - Handle color selection
  - Visual feedback on hover
  - Pass selected color ke parent

---

## Phase 4: Main Components - Part 1 (Layout & Header)

- [x] **4.1** Create `app/layout.tsx`:
  - Setup root layout dengan Inter font
  - Configure metadata
  - Apply dark theme background
- [x] **4.2** Create `components/Header.tsx`:
  - Add logo/title
  - Add download button (icon)
  - Add upload button (icon)
  - Add view toggle component
  - Style dengan glassmorphism effect
- [x] **4.3** Create `app/page.tsx`:
  - Import Header component
  - Setup main container untuk habit cards
  - Wrap dengan DndContext dari @dnd-kit
  - Style dengan dark theme

---

## Phase 5: Main Components - Part 2 (Habit Cards)

- [x] **5.1** Create `components/HabitCardHeader.tsx`:
  - Display habit name dengan inline editing
  - Add three-dot options button
  - Handle click to edit
  - Handle Enter/blur to save
  - Default to "Untitled" jika kosong
- [x] **5.2** Create `components/DateCircle.tsx`:
  - Display circular date element
  - Show day name dan date number
  - Handle click to toggle completion
  - Apply theme color saat completed
  - Style: w-8 h-8, border zinc-600
- [x] **5.3** Create `components/DateGrid.tsx`:
  - Display grid of 126 squares (18 weeks x 7 days)
  - Apply theme color untuk completed dates
  - No interaction (display only)
  - Style: w-3.5 h-3.5, gap-1
- [x] **5.4** Create `components/NoteDisplay.tsx`:
  - Display note preview below habit card
  - Truncate long text
  - Add "Read more" link
  - Click to open note modal
  - Only show when note exists
- [x] **5.5** Create `components/HabitCard.tsx`:
  - Integrate HabitCardHeader
  - Integrate DateCircle untuk weekly view
  - Integrate DateGrid untuk grid view
  - Add drag handle
  - Integrate NoteDisplay
  - Implement useSortable hook dari @dnd-kit
  - Handle select mode (blue border, opacity)
  - Style dengan glassmorphism

---

## Phase 6: Drag & Drop Functionality

- [x] **6.1** Setup DndContext di `app/page.tsx`:
  - Wrap habit list dengan DndContext
  - Add SortableContext dengan habit IDs
  - Handle onDragEnd event
- [x] **6.2** Implement drag visual feedback:
  - Opacity 0.5 saat dragging
  - Scale 1.02 transform
  - Cursor grab/grabbing
- [x] **6.3** Update Zustand store:
  - Implement `reorderHabits()` action
  - Save new order ke localStorage
- [x] **6.4** Test drag & drop:
  - Reorder multiple habits
  - Verify persistence setelah reload

---

## Phase 7: Modal Components

- [x] **7.1** Create `components/ConfirmModal.tsx`:
  - Display confirmation message
  - Show different messages untuk single/bulk delete
  - Add confirm/cancel buttons
  - Handle keyboard shortcuts (Enter, Escape)
  - Style dengan dark theme
- [x] **7.2** Create `components/NoteModal.tsx`:
  - Display title: "Add Note" atau "Edit Note"
  - Add textarea untuk note content
  - Add save/cancel buttons
  - Handle Ctrl/Cmd+Enter to save
  - Handle Escape to cancel
  - Auto-focus textarea on open
  - Integrate dengan Zustand store
- [x] **7.3** Integrate ColorPicker Modal:
  - Show modal saat change color action
  - Handle single habit color change
  - Handle bulk color change
  - Update habits dengan new color
  - Close modal after selection

---

## Phase 8: Select Mode & Bulk Operations

- [x] **8.1** Create `components/BulkActionsBar.tsx`:
  - Display 5 action buttons:
    1. Change Color (blue icon)
    2. Delete (red icon)
    3. Select All (green icon)
    4. Unselect All (yellow icon)
    5. Exit Select Mode (gray icon)
  - Position at top of screen
  - Style: zinc-800 background, rounded
- [x] **8.2** Implement select mode toggle:
  - Update Zustand store actions
  - Disable drag-drop saat select mode active
  - Change cursor to pointer on cards
  - Show bulk actions bar
- [x] **8.3** Implement selection logic:
  - Click card to toggle selection
  - Add blue border untuk selected cards
  - Reduce opacity (0.4) untuk card content
  - Track selected IDs dalam Set
- [x] **8.4** Implement bulk actions:
  - Select All: add semua habit IDs
  - Unselect All: clear selection Set
  - Bulk Change Color: apply ke semua selected
  - Bulk Delete: show confirmation dengan count
  - Exit: clear selection, hide bar

---

## Phase 9: Context Menu Integration

- [x] **9.1** Add context menu trigger ke HabitCard:
  - Right-click event handler
  - Three-dot button click handler
  - Position menu near cursor/button
- [x] **9.2** Implement context menu options:
  - Edit: focus pada habit name input
  - Change Color: open color picker modal
  - Add/Edit Note: open note modal
  - Select Mode: enter select mode dengan card selected
  - Delete: show confirmation modal
- [x] **9.3** Style context menu items:
  - Hover background zinc-700
  - Delete item: red text
  - Proper spacing dan padding
  - Icons dari lucide-react

---

## Phase 10: Notes System

- [x] **10.1** Implement note actions di Zustand:
  - `addNote(habitId, note)`: save note to habit
  - `getNote(habitId)`: retrieve note
  - `hasNote(habitId)`: check if note exists
- [x] **10.2** Add note button/indicator ke HabitCard:
  - Change color/style when note exists
  - Click to open note modal
- [x] **10.3** Integrate NoteModal:
  - Open saat add/edit note action
  - Load existing note jika ada
  - Save note on submit
  - Update note display after save
- [x] **10.4** Add note to export/import:
  - Include notes dalam JSON export
  - Restore notes saat import
  - Handle notes dalam localStorage

---

## Phase 11: LocalStorage Persistence

- [x] **11.1** Create `hooks/useLocalStorage.ts`:
  - Implement localStorage sync hook
  - Handle Set serialization (Set → Array)
  - Handle Set deserialization (Array → Set)
  - Save after every state change
  - Load on mount
- [x] **11.2** Integrate dengan Zustand store:
  - Add useEffect untuk sync
  - Save habits setelah setiap action
  - Handle errors gracefully
  - Use key: `'habits'`
- [x] **11.3** Implement default habit creation:
  - Check if localStorage kosong
  - Create "Membaca Buku" habit (green)
  - Add 2 completed dates
  - Save to localStorage
- [x] **11.4** Test persistence:
  - Create/edit/delete habits
  - Reload page
  - Verify data persists

---

## Phase 12: Data Export/Import

- [x] **12.1** Create `hooks/useDownload.ts`:
  - Implement download functionality
  - Format JSON dengan version dan timestamp
  - Include all habits dengan completedDates dan notes
  - Generate filename: `rutin-in-backup-YYYY-MM-DD.json`
  - Trigger file download
- [x] **12.2** Create `hooks/useUpload.ts`:
  - Implement file upload handler
  - Validate JSON structure
  - Check version compatibility
  - Deserialize completedDates Arrays to Sets
  - Replace habits di store
  - Show error alert jika invalid
- [x] **12.3** Integrate dengan Header:
  - Wire download button to useDownload hook
  - Wire upload button to useUpload hook
  - Show feedback on success/error
- [x] **12.4** Test export/import:
  - Download habits
  - Clear localStorage
  - Upload file
  - Verify all data restored (including notes)

---

## Phase 13: View Mode Toggle

- [x] **13.1** Implement toggle component di Header:
  - Use Toggle UI component
  - Show "Weekly" dan "Grid/Overview" labels
  - Highlight active view (white text)
  - Gray out inactive view
  - Smooth transition animations
- [x] **13.2** Update HabitCard rendering:
  - Conditional render: DateCircle vs DateGrid
  - Pass correct days array to components
  - Handle view mode dari Zustand state
- [x] **13.3** Implement view mode persistence:
  - Save view preference to Zustand
  - Optionally save to localStorage
  - Restore on page reload
- [x] **13.4** Test view switching:
  - Toggle between weekly and grid
  - Verify correct days displayed
  - Check animations smooth

---

## Phase 14: Add Activity Button

- [x] **14.1** Create `components/AddActivityButton.tsx`:
  - Display floating button or fixed button
  - Use "+" icon dari lucide-react
  - Style: primary button style
  - Position: bottom atau dalam list
- [x] **14.2** Implement add habit logic:
  - Generate ID: `habit-${timestamp}`
  - Default name: "New Habit"
  - Default color: "green"
  - Empty completedDates Set
  - Add createdAt timestamp
- [x] **14.3** Wire button to Zustand action:
  - Call `addHabit()` on click
  - Add new habit to list
  - Save to localStorage
  - Auto-focus pada new habit name untuk edit
- [x] **14.4** Test habit creation:
  - Click add button multiple times
  - Verify unique IDs generated
  - Verify habits appear dalam list

---

## Phase 15: Keyboard Shortcuts & Accessibility

- [x] **15.1** Implement keyboard navigation:
  - Tab through interactive elements
  - Enter to save edits
  - Escape to close modals
  - Ctrl/Cmd+Enter to save notes
- [x] **15.2** Add focus indicators:
  - Visible outlines on all focusable elements
  - Style: 2px outline dengan offset
  - Use accessible colors
- [x] **15.3** Add ARIA labels:
  - Icon buttons: aria-label
  - Modal: aria-modal, role="dialog"
  - Context menu: role="menu", role="menuitem"
  - Date circles: aria-label dengan date info
- [x] **15.4** Add screen reader text:
  - Visually hidden text untuk icons
  - Descriptive labels untuk actions
  - Status announcements untuk state changes
- [x] **15.5** Verify color contrast:
  - Check all text colors against backgrounds
  - Ensure WCAG AA compliance
  - Test dengan contrast checker tools
- [x] **15.6** Ensure touch targets:
  - Minimum 44x44px untuk buttons
  - Adequate spacing between elements
  - Test pada mobile devices

---

## Phase 16: Styling & Polish

- [x] **16.1** Apply glassmorphism effects:
  - Card backgrounds: rgba(38, 38, 38, 0.7)
  - Backdrop blur: 15px
  - Subtle borders: rgba(255, 255, 255, 0.1)
- [x] **16.2** Add transitions & animations:
  - 200-300ms ease untuk all interactions
  - Smooth modal animations (fade + slide)
  - Hover effects pada buttons dan cards
  - Scale transform saat dragging
- [x] **16.3** Refine color palette:
  - Verify all COLOR_SETS implemented
  - Test each theme color pada cards
  - Ensure visibility on dark background
- [x] **16.4** Polish responsive design:
  - Test pada different screen sizes
  - Adjust layout untuk mobile
  - Ensure cards stack properly
  - Mobile-friendly touch interactions
- [x] **16.5** Add loading states:
  - Skeleton screens jika needed
  - Loading indicators untuk async actions
  - Disable buttons saat processing

---

## Phase 17: Testing & Bug Fixes

- [x] **17.1** Test habit CRUD operations:
  - [x] Create new habit
  - [x] Edit habit name
  - [x] Change habit color (single)
  - [x] Delete single habit dengan confirmation
  - [x] Drag and drop to reorder
- [x] **17.2** Test date tracking:
  - [x] Toggle date completion dalam weekly view
  - [x] Verify grid view shows correct history
  - [x] Check date format consistency
  - [x] Verify completedDates Set updates
- [x] **17.3** Test select mode:
  - [x] Enter select mode via context menu
  - [x] Select/unselect individual habits
  - [x] Select all habits
  - [x] Unselect all habits
  - [x] Bulk change color
  - [x] Bulk delete dengan confirmation
  - [x] Exit select mode
- [x] **17.4** Test notes system:
  - [x] Add note to habit
  - [x] Edit existing note
  - [x] View note preview
  - [x] Note persists setelah reload
  - [x] Note included dalam export
- [x] **17.5** Test data management:
  - [x] Download habits as JSON
  - [x] Upload/import JSON file
  - [x] Verify all data restored
  - [x] Handle invalid JSON files
  - [x] LocalStorage persistence works
- [x] **17.6** Test view modes:
  - [x] Switch between weekly and grid
  - [x] Verify correct days displayed
  - [x] View preference persists
- [x] **17.7** Test keyboard shortcuts:
  - [x] Enter saves habit name
  - [x] Escape closes modals
  - [x] Ctrl/Cmd+Enter saves notes
  - [x] Tab navigation works
- [x] **17.8** Test context menu:
  - [x] Right-click opens menu
  - [x] Three-dot button opens menu
  - [x] All menu options work
  - [x] Click outside closes menu
- [x] **17.9** Test modals:
  - [x] Modals animate properly
  - [x] Backdrop click closes (jika enabled)
  - [x] Escape closes modal
  - [x] Focus trap works
- [x] **17.10** Test edge cases:
  - [x] Empty habit name defaults to "Untitled"
  - [x] No habits to download shows alert
  - [x] First load creates default habit
  - [x] Very long habit names handled
  - [x] Many habits (performance)

---

## Phase 18: Optimization

- [ ] **18.1** Optimize re-renders:
  - Use React.memo untuk HabitCard
  - Use Zustand selectors properly
  - Avoid unnecessary state updates
- [ ] **18.2** Debounce localStorage writes:
  - Implement debounce untuk save operations
  - Batch multiple changes jika possible
- [ ] **18.3** Code splitting:
  - Lazy load modals jika needed
  - Split large components
  - Analyze bundle size
- [ ] **18.4** Performance audit:
  - Run Lighthouse audit
  - Check Time to Interactive
  - Optimize largest contentful paint
  - Fix any performance warnings

---

## Phase 19: Documentation & Code Quality

- [ ] **19.1** Add code comments:
  - Document complex logic
  - Add JSDoc comments untuk utilities
  - Explain non-obvious patterns
- [ ] **19.2** Cleanup code:
  - Remove console.logs
  - Remove unused imports
  - Format dengan Prettier
  - Lint dengan ESLint
- [ ] **19.3** Update README.md:
  - Project description
  - Installation instructions
  - Usage guide
  - Feature list
  - Tech stack
- [ ] **19.4** Add inline documentation:
  - Component prop types documented
  - Hook usage examples
  - Utility function descriptions

---

## Phase 20: Final Review & Deployment

- [ ] **20.1** Final testing:
  - Test all features end-to-end
  - Test pada multiple browsers
  - Test pada mobile devices
  - Fix any remaining bugs
- [ ] **20.2** Accessibility audit:
  - Run automated accessibility tests
  - Manual keyboard navigation test
  - Screen reader test
  - Color contrast verification
- [ ] **20.3** Performance check:
  - Verify smooth animations
  - Check bundle size
  - Test dengan slow network
  - Optimize jika needed
- [ ] **20.4** Production build:
  - Run `npm run build`
  - Test production build locally
  - Verify no build errors
  - Check for any warnings
- [ ] **20.5** Deploy application:
  - Deploy ke Vercel/Netlify/hosting pilihan
  - Configure domain jika ada
  - Test deployed version
  - Monitor untuk errors

---

## Checklist Summary

**Total Tasks:** ~150+ individual checklist items

**Estimated Timeline:**

- Phase 1-2 (Setup & Data): 2-4 hours
- Phase 3-5 (UI Components): 6-8 hours
- Phase 6-9 (Core Features): 8-10 hours
- Phase 10-13 (Advanced Features): 6-8 hours
- Phase 14-16 (Polish): 4-6 hours
- Phase 17 (Testing): 4-6 hours
- Phase 18-20 (Optimization & Deploy): 3-4 hours

**Total Estimated Time:** 33-46 hours untuk complete implementation

---

## Notes

- Kerjakan secara **linear** mengikuti phase numbers
- **Jangan skip phase** - setiap phase membangun dari yang sebelumnya
- Test setiap feature **segera setelah implementasi**
- Commit code secara **regular** setelah setiap phase selesai
- Jika menemukan bug, **fix immediately** sebelum lanjut ke phase berikutnya
- Keep components **small and focused** - refactor jika terlalu besar
- Follow **coding style guidelines** dari prompt.md
- Prioritaskan **functionality** dulu, baru **polish** styling

Selamat membangun aplikasi Rutin.in! 🚀
