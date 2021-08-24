var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");
var tasksInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");
var tasks = [];

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoE1.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressE1.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedE1.appendChild(taskSelected);
    }

    // update task's in task array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }

    saveTasks();
};

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task Updated!");
    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (task[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    saveTasks();
};

var taskFormHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    var isEdit = formE1.hasAttribute("data-task-id");

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    }

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formE1.reset();

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to create taskE1 function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

        createTaskE1(taskDataObj);
    }
};

var createTaskE1 = function(taskDataObj) {
    // create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    // add task id as custom attribute
    listItemE1.setAttribute("Data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    taskInfoE1.className = "task-info";
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemE1.appendChild(taskInfoE1);

    // add entire item to list
    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskActionsE1);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks();

    tasksToDoE1.appendChild(listItemE1);

    // increase task counter for next unique ID
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    //create div
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";

    //create edit button
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(editButtonE1);

    //create delete button
    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonE1);

    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"]

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionE1 = document.createElement("option");
        statusOptionE1.textContent = statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectE1.appendChild(statusOptionE1);
    }

    actionContainerE1.appendChild(statusSelectE1);

    return actionContainerE1;
};

formE1.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    //get target element from event
    var targetE1 = event.target;

    //edit button was clicked
    if (targetE1.matches(".edit-btn")) {
        var taskId = targetE1.getAttribute("data-task-id");
        editTask(taskId);
    }

    //delete button was clicked
    if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }    
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    tasks = updatedTaskArr;
    saveTasks();
};

var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formE1.setAttribute("data-task-id", taskId);
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};


var loadTasks = function() {
    tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);

    for (i = 0; i < tasks.length; i++) {
        taskIdCounter = tasks[i].id;
        var listItemE1 = document.createElement("li");
        listItemE1.className = "task-item";
        listItemE1.setAttribute("data-task-id",tasks[i].id);

        var taskInfoE1 = document.createElement("div");
        taskInfoE1.className = "task-info";
        taskInfoE1.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
        listItemE1.appendChild(taskInfoE1);

        var taskActionsE1 = createTaskActions(tasks[i].id);
        listItemE1.appendChild(taskActionsE1);

        if (tasks[i].status === "to do") {
            listItemE1.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoE1.appendChild(listItemE1);
        }

        else if (tasks[i].status === "in progress") {
            listItemE1.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressE1.appendChild(listItemE1);
        }

        else if (tasks[i].status === "completed") {
            listItemE1.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedE1.appendChild(listItemE1);
        }
     };
     i++;
};

loadTasks();

pageContentE1.addEventListener("click", taskButtonHandler);
pageContentE1.addEventListener("change", taskStatusChangeHandler);
