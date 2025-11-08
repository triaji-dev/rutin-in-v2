# Phase 17: Manual Testing Checklist

## Setup Instructions

1. Open http://localhost:3000 in your browser
2. Open Browser DevTools (F12) to check for console errors
3. Clear localStorage before starting: `localStorage.clear()` in console
4. Refresh page to start with default habit

---

## 17.1 Test Habit CRUD Operations

### ✅ Create New Habit

**Steps:**

1. Click the "+" (Add Activity) button at the bottom of the page
2. Verify a new habit card appears with name "New Habit"
3. Verify the input field is automatically focused and selected
4. Type a new name (e.g., "Morning Exercise")
5. Press Enter or click outside to save

**Expected Result:**

- New habit appears immediately
- Input field is focused with text selected
- Name saves on Enter or blur
- Habit persists after page reload

---

### ✅ Edit Habit Name

**Steps:**

1. Click on any habit name text
2. Input field should appear and be focused
3. Type new text (e.g., change "New Habit" to "Read Daily")
4. Press Enter to save

**Expected Result:**

- Input appears on click
- Text is editable
- Enter saves the name
- Empty name defaults to "Untitled"
- Name persists after reload

---

### ✅ Change Habit Color (Single)

**Steps:**

1. Right-click on a habit card
2. Select "Change Color" from context menu
3. Color picker modal appears
4. Click on a different color (e.g., Blue)

**Expected Result:**

- Context menu opens
- Color picker modal shows 10 color options
- Selected color applies to habit card immediately
- Modal closes after selection
- Color persists after reload

---

### ✅ Delete Single Habit

**Steps:**

1. Right-click on a habit card
2. Select "Delete" from context menu
3. Confirmation modal appears
4. Click "Delete" to confirm

**Expected Result:**

- Confirmation modal shows message: "Are you sure you want to delete this habit?"
- Cancel button dismisses modal without deleting
- Delete button removes habit from list
- Habit is gone after page reload

---

### ✅ Drag and Drop to Reorder

**Steps:**

1. Create at least 3 habits
2. Click and hold the drag handle (⋮⋮ icon) on left side of a habit
3. Drag the habit up or down
4. Release to drop in new position
5. Refresh page to verify order persists

**Expected Result:**

- Cursor changes to grabbing
- Habit becomes semi-transparent while dragging
- Other habits shift to make space
- New order persists after reload
- Smooth animations during drag

---

## 17.2 Test Date Tracking

### ✅ Toggle Date Completion (Weekly View)

**Steps:**

1. Ensure view mode is set to "Weekly" (toggle in header)
2. Click on any date circle below a habit
3. Click again to uncheck
4. Click multiple dates

**Expected Result:**

- Date circle fills with habit color when clicked
- Second click removes the color
- Multiple dates can be selected
- Visual feedback on hover
- Changes persist after reload

---

### ✅ Verify Grid View History

**Steps:**

1. In Weekly view, mark several dates as complete (different days)
2. Switch to Grid/Overview mode using header toggle
3. Verify completed dates show as colored squares

**Expected Result:**

- Grid shows 126 squares (18 weeks × 7 days)
- Previously completed dates are colored
- Colors match habit theme color
- Grid is read-only (no click interaction)

---

### ✅ Check Date Format Consistency

**Steps:**

1. In Weekly view, hover over date circles
2. Check date labels (e.g., "Mon 4")
3. Open browser console and run: `JSON.parse(localStorage.getItem('habits'))`
4. Check completedDates format

**Expected Result:**

- Date circles show: Day abbreviation + date number
- localStorage stores dates as YYYY-MM-DD strings
- Today's date is highlighted or distinguishable

---

### ✅ Verify completedDates Set Updates

**Steps:**

1. Open browser DevTools console
2. Run: `JSON.parse(localStorage.getItem('habits'))`
3. Note the completedDates array for a habit
4. Toggle a date in the UI
5. Check localStorage again

**Expected Result:**

- completedDates is stored as an array in JSON
- Adding a date adds a string to array
- Removing a date removes the string
- Format is consistent: YYYY-MM-DD

---

## 17.3 Test Select Mode

### ✅ Enter Select Mode

**Steps:**

1. Right-click on any habit card
2. Select "Select Mode" from context menu

**Expected Result:**

- BulkActionsBar appears at top
- Habit that was right-clicked is automatically selected (blue border)
- Drag handles disappear or are disabled
- Cursor changes to pointer on cards

---

### ✅ Select/Unselect Individual Habits

**Steps:**

1. While in select mode, click on different habit cards
2. Click on an already selected card

**Expected Result:**

- Clicking unselected card adds blue border
- Card content opacity reduces (0.4)
- Clicking selected card removes blue border
- Card content opacity returns to normal

---

### ✅ Select All Habits

**Steps:**

1. Enter select mode
2. Click "Select All" button (green icon) in BulkActionsBar

**Expected Result:**

- All habit cards get blue borders
- All cards show reduced opacity
- Button has visual feedback

---

### ✅ Unselect All Habits

**Steps:**

1. Select multiple habits
2. Click "Unselect All" button (yellow icon) in BulkActionsBar

**Expected Result:**

- All blue borders disappear
- All card opacity returns to normal
- Select mode remains active

---

### ✅ Bulk Change Color

**Steps:**

1. Select 2-3 habits
2. Click "Change Color" button (blue icon) in BulkActionsBar
3. Choose a color from modal

**Expected Result:**

- Color picker modal opens
- After selecting color, ALL selected habits change to that color
- Modal closes automatically
- Changes persist after reload

---

### ✅ Bulk Delete

**Steps:**

1. Select 2-3 habits
2. Click "Delete" button (red icon) in BulkActionsBar
3. Confirmation modal appears showing count
4. Click "Delete" to confirm

**Expected Result:**

- Modal shows: "Are you sure you want to delete 3 habits?"
- Cancel preserves habits
- Delete removes all selected habits
- Deletion persists after reload

---

### ✅ Exit Select Mode

**Steps:**

1. While in select mode, click "Exit" button (gray X icon) in BulkActionsBar

**Expected Result:**

- BulkActionsBar disappears
- All blue borders removed
- Selection cleared
- Drag handles reappear
- Can drag and drop again

---

## 17.4 Test Notes System

### ✅ Add Note to Habit

**Steps:**

1. Right-click on a habit without a note
2. Select "Add Note" from context menu
3. Note modal opens with title "Add Note"
4. Type some text (e.g., "This is my first note")
5. Click "Save" button

**Expected Result:**

- Modal opens with empty textarea
- Textarea is auto-focused
- Save button adds note
- Note preview appears below habit card
- Modal closes after save

---

### ✅ Edit Existing Note

**Steps:**

1. Right-click on a habit that has a note
2. Select "Edit Note" from context menu
3. Modal opens with title "Edit Note"
4. Existing note text is pre-filled
5. Modify text and save

**Expected Result:**

- Modal shows existing note content
- Text is editable
- Save updates the note
- Updated preview appears below habit
- Original note is replaced

---

### ✅ View Note Preview

**Steps:**

1. Add a long note (100+ characters)
2. Check the note preview below habit card
3. Click "Read more" link

**Expected Result:**

- Preview truncates long text with "..."
- "Read more" link appears
- Clicking link opens note modal in read/edit mode
- Full note is visible in modal

---

### ✅ Note Persists After Reload

**Steps:**

1. Add notes to 2-3 habits
2. Refresh the page (F5)
3. Check if notes are still visible

**Expected Result:**

- All notes appear after reload
- Note content is unchanged
- Note previews display correctly

---

### ✅ Note Included in Export

**Steps:**

1. Add notes to a few habits
2. Click download button in header
3. Open downloaded JSON file in text editor
4. Search for "notes" field

**Expected Result:**

- JSON file contains notes field for each habit
- Note content is properly escaped
- Empty notes are included as empty strings

---

## 17.5 Test Data Management

### ✅ Download Habits as JSON

**Steps:**

1. Create 2-3 habits with various data (names, colors, dates, notes)
2. Click download button in header
3. Check browser downloads folder

**Expected Result:**

- File downloads with name: `rutin-in-backup-YYYY-MM-DD.json`
- File opens in text editor
- Contains version field
- Contains timestamp field
- Contains habits array with all data
- completedDates stored as arrays

---

### ✅ Upload/Import JSON File

**Steps:**

1. Download current habits as backup
2. Delete all habits or create different ones
3. Click upload button in header
4. Select the backup JSON file

**Expected Result:**

- File picker opens
- After selecting file, habits are restored
- All habit data restored (names, colors, dates, notes)
- Page updates immediately
- localStorage is updated

---

### ✅ Verify All Data Restored

**Steps:**

1. Create habits with:
   - Custom names
   - Different colors
   - Completed dates
   - Notes
2. Download backup
3. Clear localStorage: `localStorage.clear()`
4. Refresh page
5. Upload the backup

**Expected Result:**

- All habit names restored
- All colors correct
- All completed dates restored
- All notes restored
- Habit order preserved

---

### ✅ Handle Invalid JSON Files

**Steps:**

1. Create a text file with random content
2. Try to upload it
3. Create a JSON file with wrong structure
4. Try to upload it

**Expected Result:**

- Alert shows error message
- No data is corrupted
- App continues working normally
- Existing habits unchanged

---

### ✅ LocalStorage Persistence Works

**Steps:**

1. Open DevTools console
2. Run: `localStorage.getItem('habits')`
3. Create a new habit
4. Run command again to see changes
5. Refresh page
6. Verify habit is still there

**Expected Result:**

- localStorage contains 'habits' key
- Data is JSON string
- Changes update localStorage immediately
- Data loads on page reload

---

## 17.6 Test View Modes

### ✅ Switch Between Weekly and Grid

**Steps:**

1. Start in Weekly view
2. Click the toggle in header to switch to Grid/Overview
3. Verify view changes
4. Toggle back to Weekly

**Expected Result:**

- Toggle shows current view with white text
- Inactive view has gray text
- Weekly view shows 7 date circles per habit
- Grid view shows 126 squares per habit
- Transition is smooth

---

### ✅ Verify Correct Days Displayed

**Steps:**

1. In Weekly view, note today's date
2. Check that 7 days are shown (today + 6 previous days)
3. Switch to Grid view
4. Count squares (should be 126)

**Expected Result:**

- Weekly shows exactly 7 days
- Days start from 6 days ago to today
- Grid shows 18 weeks × 7 days = 126 squares
- Dates are chronologically ordered

---

### ✅ View Preference Persists

**Steps:**

1. Switch to Grid view
2. Refresh page (F5)
3. Check which view is active

**Expected Result:**

- View mode persists after reload
- Toggle reflects correct state
- Habit cards show correct date display

---

## 17.7 Test Keyboard Shortcuts

### ✅ Enter Saves Habit Name

**Steps:**

1. Click on a habit name to edit
2. Type new text
3. Press Enter key

**Expected Result:**

- Name saves immediately
- Input field blurs
- No page reload
- Name persists after refresh

---

### ✅ Escape Closes Modals

**Steps:**

1. Open confirmation modal (try to delete)
2. Press Escape key
3. Open color picker modal
4. Press Escape
5. Open note modal
6. Press Escape

**Expected Result:**

- All modals close on Escape
- No changes are saved
- Focus returns to page
- Modal backdrop disappears

---

### ✅ Ctrl/Cmd+Enter Saves Notes

**Steps:**

1. Open note modal (Add Note)
2. Type some text
3. Press Ctrl+Enter (Windows) or Cmd+Enter (Mac)

**Expected Result:**

- Note saves immediately
- Modal closes
- Note preview appears
- Works same as clicking Save button

---

### ✅ Tab Navigation Works

**Steps:**

1. Press Tab key repeatedly
2. Observe focus moving through interactive elements

**Expected Result:**

- Focus visible with blue outline
- Tab order is logical (header buttons → habits → add button)
- All interactive elements are reachable
- Shift+Tab goes backward
- Focus indicators are clear

---

## 17.8 Test Context Menu

### ✅ Right-Click Opens Menu

**Steps:**

1. Right-click on any habit card
2. Verify menu appears near cursor

**Expected Result:**

- Menu appears immediately
- Positioned near cursor
- Shows 5 options: Edit, Change Color, Add/Edit Note, Select Mode, Delete
- Menu is styled correctly

---

### ✅ Three-Dot Button Opens Menu

**Steps:**

1. Click the three-dot button (⋮) in top-right of habit card
2. Verify menu appears near button

**Expected Result:**

- Menu appears on click
- Positioned near the button
- Same options as right-click menu
- Button shows active state

---

### ✅ All Menu Options Work

**Steps:**

1. Open context menu
2. Click "Edit" → verify name input focuses
3. Open menu again, click "Change Color" → verify modal opens
4. Open menu again, click "Add Note" → verify modal opens
5. Open menu again, click "Select Mode" → verify mode activates
6. Open menu again, click "Delete" → verify confirmation shows

**Expected Result:**

- All 5 options trigger correct actions
- Menu closes after selection
- Actions execute properly

---

### ✅ Click Outside Closes Menu

**Steps:**

1. Open context menu (right-click)
2. Click anywhere else on the page

**Expected Result:**

- Menu closes immediately
- No option is triggered
- Can open menu again

---

## 17.9 Test Modals

### ✅ Modals Animate Properly

**Steps:**

1. Open confirmation modal (delete action)
2. Observe entry animation
3. Close modal
4. Open color picker
5. Observe animations

**Expected Result:**

- Backdrop fades in smoothly
- Modal content slides up and fades in
- Close animation reverses (slide down, fade out)
- Transitions are 200-300ms
- No janky movements

---

### ✅ Backdrop Click Closes

**Steps:**

1. Open note modal
2. Click on the dark backdrop (not the modal content)

**Expected Result:**

- Modal closes
- No changes are saved
- Same behavior for all modals

---

### ✅ Escape Closes Modal

**Steps:**

- Already tested in 17.7
- Verify consistent across all modals

---

### ✅ Focus Trap Works

**Steps:**

1. Open note modal
2. Press Tab repeatedly
3. Verify focus stays within modal

**Expected Result:**

- Tab cycles through modal elements
- Focus doesn't escape to page behind modal
- Shift+Tab works in reverse
- First element gets focus when modal opens

---

## 17.10 Test Edge Cases

### ✅ Empty Habit Name Defaults to "Untitled"

**Steps:**

1. Click on habit name to edit
2. Clear all text (backspace/delete all)
3. Press Enter or click outside

**Expected Result:**

- Name changes to "Untitled"
- No error occurs
- Untitled persists after reload

---

### ✅ No Habits to Download Shows Alert

**Steps:**

1. Delete all habits
2. Try to click download button

**Expected Result:**

- Browser alert: "No habits to download"
- No file is downloaded
- App continues working

---

### ✅ First Load Creates Default Habit

**Steps:**

1. Open DevTools console
2. Run: `localStorage.clear()`
3. Refresh page

**Expected Result:**

- One default habit appears: "Membaca Buku"
- Color is green
- Has 2 completed dates (yesterday and today)
- Persists in localStorage

---

### ✅ Very Long Habit Names Handled

**Steps:**

1. Create habit
2. Edit name to very long text (200+ characters)
3. Save and verify display

**Expected Result:**

- Long text is visible or truncated gracefully
- No layout breaking
- Input field scrolls or wraps
- Name persists correctly

---

### ✅ Many Habits (Performance)

**Steps:**

1. Create 20-30 habits (use add button repeatedly)
2. Add dates to many of them
3. Test drag and drop
4. Switch view modes
5. Check console for errors

**Expected Result:**

- Page remains responsive
- Drag and drop works smoothly
- View switching is fast
- No console errors
- Scrolling is smooth

---

## After Testing

### Next Steps:

1. Check all boxes in this document as you complete tests
2. Note any bugs found in a separate BUGS.md file
3. Update `.docs/instruction.md` Phase 17 checklist
4. If all tests pass, proceed to Phase 18 (Optimization)

### Recording Test Results:

- ✅ = Pass
- ❌ = Fail (document issue)
- ⚠️ = Partial (note details)

### Common Issues to Watch For:

- Console errors (red text in DevTools)
- TypeScript errors in terminal
- Layout shifts or broken styling
- Data not persisting after reload
- Animations stuttering or not working
- Keyboard shortcuts not working
- Accessibility issues (focus not visible)
