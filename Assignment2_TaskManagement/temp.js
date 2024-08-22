document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search-input');
    const filterCategory = document.getElementById('filter-category');

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToList(task.title, task.description, task.category));
    }

    // Function to save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to get tasks from localStorage
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Function to add a task to the list and to localStorage
    function addTask(title, description, category) {
        // Add task to the DOM
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.setAttribute('data-category', category);
        li.innerHTML = `
            <div>
                <strong>${title}</strong>: ${description} <span class="badge bg-secondary">${category}</span>
            </div>
            <div>
                <button class="btn btn-sm btn-primary edit-btn me-2">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </div>`;
        taskList.appendChild(li);

        // Add task to localStorage
        const tasks = getTasks();
        tasks.push({ title, description, category });
        saveTasks(tasks);

        // Add delete functionality
        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
            deleteTask(title, description, category);
        });

        // Add edit functionality
        li.querySelector('.edit-btn').addEventListener('click', function() {
            document.getElementById('task-title').value = title;
            document.getElementById('task-desc').value = description;
            document.getElementById('task-category').value = category;
            deleteTask(title, description, category); // Remove the old task before editing
            li.remove(); // Remove the task from the list
        });
    }

    // Function to delete a task from localStorage
    function deleteTask(title, description, category) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.title !== title || task.description !== description || task.category !== category);
        saveTasks(tasks);
    }

    // Handle form submission
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from reloading the page

        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;
        const category = document.getElementById('task-category').value;

        addTask(title, description, category); // Add the new task

        taskForm.reset(); // Clear the form fields
    });

    // Handle search input
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const tasks = document.querySelectorAll('#task-list li');
        tasks.forEach(task => {
            const taskText = task.textContent.toLowerCase();
            task.style.display = taskText.includes(searchTerm) ? '' : 'none';
        });
    });

    // Handle category filter
    filterCategory.addEventListener('change', function() {
        const selectedCategory = filterCategory.value;
        const tasks = document.querySelectorAll('#task-list li');
        tasks.forEach(task => {
            const taskCategory = task.getAttribute('data-category');
            task.style.display = (selectedCategory === 'All' || taskCategory === selectedCategory) ? '' : 'none';
        });
    });
});
