# Task & Goal Mastery

A clean, intuitive task management application that helps you organize your tasks, track goals, and build daily habits. Built with vanilla JavaScript, HTML, and CSS.

## Features

### 📋 Task Management
- Create tasks with titles, descriptions, priorities, and due dates
- Mark tasks as complete/incomplete
- Filter tasks by status (All, Pending, Completed)
- Three priority levels: Low, Medium, High
- Visual priority indicators with color coding
- Delete tasks with confirmation

### 🎯 Goal Tracking
- Set long-term goals with target dates
- Add detailed descriptions to your goals
- Track multiple goals simultaneously
- Easy goal management and removal

### ✨ Daily Habits
- Create habit trackers with custom target days
- Automatic progress calculation based on days passed
- Visual progress bars showing completion percentage
- Track multiple habits at once

### 📊 Dashboard Statistics
- Total tasks counter
- Completed tasks counter
- Completion rate percentage
- Real-time updates as you work

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Installation

1. Download all three files to a folder on your computer:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Open `index.html` in your web browser

That's it! The app runs entirely in your browser.

## Usage

### Adding a Task
1. Click the **"+ Add Task"** button
2. Fill in the task details:
   - Task Title (required)
   - Description (optional)
   - Priority (Low/Medium/High)
   - Due Date (optional)
3. Click **"Add Task"** to save

### Managing Tasks
- **Complete a task**: Click the checkbox next to the task
- **View task filters**: Use the All/Pending/Completed tabs
- **Delete a task**: Click the "Delete" button on any task

### Setting Goals
1. Click the **"+ Goal"** button in the Goals section
2. Enter:
   - Goal title (required)
   - Target date
   - Description (optional)
3. Click **"Add Goal"** to save

### Creating Habits
1. Click the **"+ Habit"** button in the Daily Habits section
2. Enter:
   - Habit name (required)
   - Target days (default: 30)
3. Click **"Create Habit"** to save
4. Progress automatically tracks from the day you create the habit

## Data Storage

All your data is stored locally in your browser using `localStorage`. This means:
- ✅ Your data persists between sessions
- ✅ No account or internet connection required
- ✅ Complete privacy - data never leaves your device
- ⚠️ Clearing browser data will delete your tasks, goals, and habits
- ⚠️ Data is specific to the browser and device you're using

## Browser Compatibility

Works on all modern browsers:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge
- Opera

## File Structure

```
task-manager/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and layout
├── script.js           # Application logic and data management
└── README.md           # This file
```

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --blue: #0a66c2;
    --darkblue: #084ca3;
    --teal: #00a699;
    --green: #1f5937;
    --orange: #d97707;
    --red: #dc2626;
}
```

### Modifying Priority Levels
Update the priority options in `index.html` (line ~119):
```html
<select id="taskPriority">
    <option value="low">Low</option>
    <option value="medium" selected>Medium</option>
    <option value="high">High</option>
</select>
```

## Tips for Best Results

1. **Regular Reviews**: Check your Pending tasks tab daily
2. **Set Realistic Goals**: Break large goals into smaller tasks
3. **Prioritize Wisely**: Use High priority sparingly for truly urgent items
4. **Track Progress**: Watch your completion rate improve over time
5. **Build Habits Gradually**: Start with 30-day habit trackers

## Known Limitations

- Data is stored locally (not synced across devices)
- No user authentication or multi-user support
- No export/import functionality
- Habit tracking is automatic based on days passed (no manual check-in)

## Future Enhancement Ideas

- Data export/import (JSON or CSV)
- Task categories or tags
- Reminders and notifications
- Dark mode toggle
- Mobile app version
- Cloud sync capability
- Recurring tasks
- Subtasks or task dependencies

## Troubleshooting

**Tasks not saving?**
- Check if your browser allows localStorage
- Make sure you're not in private/incognito mode

**Layout looks broken?**
- Ensure all three files are in the same folder
- Check that the file paths in `index.html` are correct

**Data disappeared?**
- Check if browser data was cleared
- Try a different browser to confirm data is browser-specific

## License

This project is open source and free to use, modify, and distribute.

## Contributing

Feel free to fork this project and make improvements! Some ideas:
- Add new features
- Improve the UI/UX
- Fix bugs
- Enhance mobile responsiveness

---

**Made with ❤️ for productivity enthusiasts**
