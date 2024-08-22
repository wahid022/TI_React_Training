document.addEventListener("DOMContentLoaded", function () {
  // e.preventDefault();

  const taskForm = document.getElementById("form-container");
  const taskListDisplay = document.getElementById("task-list");

  //Here getDataAndDisplay() is have used to get all the data from the localStorage As soon as the DOM loads....
  getDataAndDisplay();

  function getDataAndDisplay() {
    const taskDataArray = getDataFromLocalStorage();

    if (taskDataArray != null) {
      console.log("task data ...", taskDataArray);
      taskDataArray.forEach((element) => {
        addTask(
          element.title,
          element.description,
          element.category,
          element.date
        );
      });
    } else {
      console.log("No data founf in local Storage ...");
    }
  }

  // Saving data to LocalStorage...
  function saveDataToLocalStorage(taskData) {
    localStorage.setItem("objJSON", JSON.stringify(taskData));
  }

  // Getting data from LocalStorage...
  function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("objJSON")) || [];
  }

  //This Function is Creating Element and Adding Task to list items ...
  function addTask(title, description, category, date) {
    console.log("....", title, description, category, date);
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center mt-2";
    li.setAttribute("data-category", category);

    li.innerHTML = `
              <div>
                  <strong>${title}</strong>: ${description} <span class="badge bg-secondary">${category}</span>
                  <div class="text-muted">${date}</div>
              </div>
              <div>
                  <button class="btn btn-sm btn-primary edit-btn me-2" data-toggle="modal" data-target="#exampleModal">Edit</button>
                  <button class="btn btn-sm btn-danger delete-btn">Delete</button>
              </div>`;
    taskListDisplay.appendChild(li);
    // Add taskData  to localStorage so that it is saved in the storage as well ..
    const taskDataArray = getDataFromLocalStorage();
    taskDataArray.push({ title, description, category, date });
    saveDataToLocalStorage(taskDataArray);
    // Add delete functionality
    li.querySelector(".delete-btn").addEventListener("click", function () {
      li.remove();
      // we need to delete it from the database as well ...so thats why i am calling deleteTask()..
      deleteTask(title, description, category, date);
    });

    //Editing the data and filling data into input field .....and then removing it also
    li.querySelector(".edit-btn").addEventListener("click", function () {
      document.getElementById("task-title").value = title;
      document.getElementById("task-desc").value = description;
      document.getElementById("task-category").value = category;
      document.getElementById("task-date").value = date;

      console.log(date);
      console.log("date input : ", document.getElementById("task-date").value);

      deleteTask(title, description, category, date); // Remove the old task before editing
      li.remove(); // Remove the task from the list
      // TODODOODODOODODODOO >>>>>>>>>>>>>>>>>>>>> modal ka use karna hai bootstrap se ...
    });
  } // End of addTask Function..

  //Deleting the li tag from the local Storage and also from the list ...
  function deleteTask(title, description, category, date) {
    let taskDataArray = getDataFromLocalStorage();
    //Matching from the database ,yaha pe wahi elements hongi jiski title , description and category match nahi ho rahi hai ... it means that matching elements is no more ...
    taskDataArray = taskDataArray.filter(
      (task) =>
        task.title !== title ||
        task.description !== description ||
        task.category !== category ||
        task.date !== date
    );
    saveDataToLocalStorage(taskDataArray);
  }

  // when the ADD task Button is clicked then i am defining the functionality ...
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-desc").value;
    const taskCategory = document.getElementById("task-category").value;
    const taskDate = document.getElementById("task-date").value;

    //addTask() function here will add the list and there i am also calling required function to update in local storage..
    addTask(taskTitle, taskDescription, taskCategory, taskDate);

    //taskForm.reset() will reset the input field ...
    taskForm.reset();
  });




  // Facing Some issue in Searching  Element ...TODO IT Later Its Resolved now ..... 
  // used task.style.visibility instead of task.style.display

  const searchInput = document.getElementById("search-task");
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    console.log("searching ...", searchTerm);
    const tasks = document.querySelectorAll("#task-list li");
    // console.log(tasks);
    tasks.forEach((task) => {
      const taskText =
        task.querySelector("strong").textContent.toLowerCase() +
        task.querySelector("div").textContent.toLowerCase(); // Combine title and description for search

      if (taskText.includes(searchTerm)) {
        console.log("inside include found.....");
        task.style.visibility = ""; // Show task if it matches search term
      } else {
        console.log("inside not found");
        task.style.visibility = "hidden"; // Hide task if it doesn't match search term
      }
    });
  });

  //yaha pe task.style.display ka alternative dhoodhna padenga ...TODO Later
  // used task.style.visibility instead of task.style.display

  const filterCategory = document.getElementById("category-filter");

  filterCategory.addEventListener("change", function () {
    const selectedCategory = filterCategory.value;
    const tasks = document.querySelectorAll("#task-list li");
    tasks.forEach((task) => {
      const taskCategory = task.getAttribute("data-category");
      console.log("taskCategory ...", taskCategory);
      console.log("selectedCategory ...", selectedCategory);
      task.style.visibility =
        selectedCategory === "All" || taskCategory === selectedCategory
          ? ""
          : "hidden";
    });
  });

});