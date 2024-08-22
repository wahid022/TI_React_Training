document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form");
    const taskListDisplay = document.getElementById("task-list");

    // Adding the Task to ToDo List .....
    function addTask(title) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center mt-2";

        li.innerHTML = `
            <div>
                <input type="checkbox" class="form-check-input me-2 mark-completed">
                <strong>${title}</strong>
            </div>
            <div>
                <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </div>`;

        taskListDisplay.appendChild(li);

        // Deleting the ToDO List here ...
        li.querySelector(".delete-btn").addEventListener("click", function () {
            //Removing the list item...
            li.remove();
        });

        // Marking the lin-through functionality here ,,....
        //Here change is occured as same as onchange we write in HTml...
        li.querySelector(".mark-completed").addEventListener("change", function () {

            li.querySelector("strong").classList.toggle("text-decoration-line-through");
        });
    }

    // Adding a new Task ...
    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const taskTitle = document.getElementById("task-title").value;
        //Calling assTask() method will add the data one by one only ...
        addTask(taskTitle);
        taskForm.reset();
    });
});
