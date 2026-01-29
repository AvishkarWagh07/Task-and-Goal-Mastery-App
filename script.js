let tasks = [];
let goals = [];
let habits = [];

function loadStuff() {
    const data = localStorage.getItem('myAppData');
    if (data) {
        const parsed = JSON.parse(data);
        tasks = parsed.taskList || [];
        goals = parsed.goalList || [];
        habits = parsed.habitList || [];
    }
}

function saveStuff() {
    localStorage.setItem('myAppData', JSON.stringify({
        taskList: tasks,
        goalList: goals,
        habitList: habits
    }));
}

function addTask(title, desc, priority, dueDate) {
    const newTask = {
        id: Date.now(),
        title: title,
        description: desc,
        priority: priority,
        dueDate: dueDate,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveStuff();
    displayTasks();
}

function deleteTask(taskId) {
    if (confirm('Are you sure?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveStuff();
        displayTasks();
    }
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveStuff();
        displayTasks();
    }
}

function displayTasks() {
    const allTasksDiv = document.getElementById('allTasksList');
    const pendingDiv = document.getElementById('pendingTasksList');
    const completedDiv = document.getElementById('completedTasksList');
    
    if (tasks.length === 0) {
        allTasksDiv.innerHTML = `
            <div class="noitems">
                <div class="icon">📋</div>
                <div class="msg">No tasks yet. Add one to get started!</div>
            </div>
        `;
    } else {
        let taskHTML = '';
        for (let i = 0; i < tasks.length; i++) {
            taskHTML += makeTaskHTML(tasks[i]);
        }
        allTasksDiv.innerHTML = taskHTML;
    }
    
    const pendingTasks = tasks.filter(t => !t.completed);
    if (pendingTasks.length == 0) {
        pendingDiv.innerHTML = `
            <div class="noitems">
                <div class="icon">✔</div>
                <div class="msg">All caught up!</div>
            </div>
        `;
    } else {
        let html = '';
        for (let i = 0; i < pendingTasks.length; i++) {
            html += makeTaskHTML(pendingTasks[i]);
        }
        pendingDiv.innerHTML = html;
    }
    
    const doneTasks = tasks.filter(t => t.completed);
    if (doneTasks.length === 0) {
        completedDiv.innerHTML = `
            <div class="noitems">
                <div class="icon">🎯</div>
                <div class="msg">No completed tasks yet.</div>
            </div>
        `;
    } else {
        completedDiv.innerHTML = doneTasks.map(t => makeTaskHTML(t)).join('');
    }
    
    updateStats();
}

function makeTaskHTML(task) {
    const isChecked = task.completed ? 'checked' : '';
    const isDone = task.completed ? 'done' : '';
    
    let dateHTML = '';
    if (task.dueDate) {
        const d = new Date(task.dueDate);
        dateHTML = `<span>Due: ${d.toLocaleDateString()}</span>`;
    }
    
    let noteHTML = '';
    if (task.description) {
        noteHTML = `<span title="${task.description}">Has notes</span>`;
    }
    
    return `
        <div class="task ${isDone}">
            <div class="checkbox ${isChecked}" onclick="toggleTask(${task.id})"></div>
            <div class="taskdetails">
                <div class="taskinfo">${task.title}</div>
                <div class="taskextra">
                    <span class="prioritybadge priority${task.priority}">${task.priority.toUpperCase()}</span>
                    ${dateHTML}
                    ${noteHTML}
                </div>
            </div>
            <div class="taskbtns">
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `;
}

function updateStats() {
    const totalCount = tasks.length;
    const doneCount = tasks.filter(t => t.completed).length;
    let pct = 0;
    if (totalCount > 0) {
        pct = Math.round((doneCount / totalCount) * 100);
    }
    
    document.getElementById('totalTasks').textContent = totalCount;
    document.getElementById('completedTasks').textContent = doneCount;
    document.getElementById('completionRate').textContent = pct + '%';
}

function addNewGoal(title, deadline, desc) {
    const newGoal = {
        id: Date.now(),
        title: title,
        deadline: deadline,
        description: desc,
        createdAt: new Date().toISOString()
    };
    goals.push(newGoal);
    saveStuff();
    showGoals();
}

function removeGoal(id) {
    if (confirm('Delete this goal?')) {
        goals = goals.filter(g => g.id !== id);
        saveStuff();
        showGoals();
    }
}

function showGoals() {
    const container = document.getElementById('goalsList');
    
    if (goals.length === 0) {
        container.innerHTML = `
            <div class="noitems">
                <div class="icon">🎯</div>
                <div class="msg">Set your first goal!</div>
            </div>
        `;
        return;
    }
    
    let output = '';
    goals.forEach(function(goal) {
        const deadlineDate = new Date(goal.deadline);
        const formattedDate = deadlineDate.toLocaleDateString();
        
        output += `
            <div class="goal">
                <div class="goalname">${goal.title}</div>
                <div class="goaldate">Target: ${formattedDate}</div>`;
        
        if (goal.description) {
            output += `<div style="font-size: 12px; color: #999; margin-bottom: 10px;">${goal.description}</div>`;
        }
        
        output += `
                <div class="goalbtns">
                    <button class="button small secondary" onclick="removeGoal(${goal.id})">Remove</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = output;
}

function createHabit(name, days) {
    habits.push({
        id: Date.now(),
        name: name,
        targetDays: days,
        startDate: new Date().toISOString(),
        completedDays: 0
    });
    saveStuff();
    renderHabits();
}

function removeHabit(habitId) {
    if (confirm('Delete this habit?')) {
        habits = habits.filter(h => h.id != habitId);
        saveStuff();
        renderHabits();
    }
}

function renderHabits() {
    const list = document.getElementById('habitsList');
    
    if (habits.length === 0) {
        list.innerHTML = `
            <div class="noitems">
                <div class="icon">✨</div>
                <div class="msg">Build a habit!</div>
            </div>
        `;
        return;
    }
    
    let habitHTML = '';
    
    for (let idx = 0; idx < habits.length; idx++) {
        const habit = habits[idx];
        const startDate = new Date(habit.startDate);
        const now = new Date();
        
        const timeDiff = now - startDate;
        const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        let currentProgress = daysPassed;
        if (currentProgress > habit.targetDays) {
            currentProgress = habit.targetDays;
        }
        
        const progressPercent = (currentProgress / habit.targetDays) * 100;
        
        habitHTML += `
            <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <div style="font-weight: 600;">${habit.name}</div>
                    <button class="button small delete" onclick="removeHabit(${habit.id})">Remove</button>
                </div>
                <div class="progress">
                    <div class="progressbar" style="width: ${progressPercent}%"></div>
                </div>
                <div class="progressinfo">
                    <span>${currentProgress} / ${habit.targetDays} days</span>
                    <span>${Math.round(progressPercent)}%</span>
                </div>
            </div>
        `;
    }
    
    list.innerHTML = habitHTML;
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

const tabButtons = document.querySelectorAll('.tabbtn');
for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', function() {
        const allTabs = document.querySelectorAll('.tabbtn');
        for (let j = 0; j < allTabs.length; j++) {
            allTabs[j].classList.remove('active');
        }
        
        const allPanels = document.querySelectorAll('.tabpanel');
        for (let k = 0; k < allPanels.length; k++) {
            allPanels[k].classList.remove('active');
        }
        
        this.classList.add('active');
        const panelId = this.getAttribute('data-tab');
        document.getElementById(panelId).classList.add('active');
    });
}

document.getElementById('addTaskBtn').onclick = function() {
    openModal('addTaskModal');
};

document.getElementById('cancelTaskBtn').onclick = function() {
    closeModal('addTaskModal');
};

document.getElementById('saveTaskBtn').onclick = function() {
    const titleVal = document.getElementById('taskTitle').value.trim();
    
    if (titleVal == '') {
        alert('Please enter a task title');
        return;
    }
    
    const descVal = document.getElementById('taskDesc').value.trim();
    const priorityVal = document.getElementById('taskPriority').value;
    const dateVal = document.getElementById('taskDueDate').value;
    
    addTask(titleVal, descVal, priorityVal, dateVal);
    
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('taskPriority').value = 'medium';
    document.getElementById('taskDueDate').value = '';
    
    closeModal('addTaskModal');
};

document.getElementById('addGoalBtn').onclick = function() {
    openModal('addGoalModal');
};

document.getElementById('cancelGoalBtn').onclick = function() {
    closeModal('addGoalModal');
};

document.getElementById('saveGoalBtn').onclick = function() {
    const goalTitle = document.getElementById('goalTitle').value.trim();
    
    if (!goalTitle) {
        alert('Please enter a goal title');
        return;
    }
    
    const goalDeadline = document.getElementById('goalDeadline').value;
    const goalDesc = document.getElementById('goalDesc').value.trim();
    
    addNewGoal(goalTitle, goalDeadline, goalDesc);
    
    document.getElementById('goalTitle').value = '';
    document.getElementById('goalDeadline').value = '';
    document.getElementById('goalDesc').value = '';
    
    closeModal('addGoalModal');
};

document.getElementById('addHabitBtn').addEventListener('click', () => {
    openModal('addHabitModal');
});

document.getElementById('cancelHabitBtn').addEventListener('click', () => {
    closeModal('addHabitModal');
});

document.getElementById('saveHabitBtn').addEventListener('click', () => {
    const habitName = document.getElementById('habitName').value.trim();
    
    if (habitName === '') {
        alert('Please enter a habit name');
        return;
    }
    
    const targetDays = parseInt(document.getElementById('habitDays').value);
    
    createHabit(habitName, targetDays || 30);
    
    document.getElementById('habitName').value = '';
    document.getElementById('habitDays').value = '30';
    
    closeModal('addHabitModal');
});

const overlays = document.querySelectorAll('.overlay');
overlays.forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
        if (e.target == overlay) {
            overlay.classList.remove('active');
        }
    });
});

window.onload = function() {
    loadStuff();
    displayTasks();
    showGoals();
    renderHabits();
};