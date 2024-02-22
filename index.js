// get the object with class "todoList"
let todoList = document.querySelector('.todoList');

// get the object with class "Completed"
let completedList = document.querySelector('.Completed');

// get all checkboxes from the <ol> with class "List_TD"
let checkboxes = document.querySelectorAll('.TD input[type="checkbox"]');

// link to restore button
let restore_button = document.querySelector('#Restore');

// link to delete button
let delete_button = document.querySelector('#Delete');

// Restore Button Functionality
restore_button.addEventListener('click', function() {
    for (var element of checkboxes){
        if (element.checked == true) {
        element.parentElement.remove();
        element.parentElement.style.textDecoration = 'None';
        todoList.appendChild(element.parentElement);
        // change class
        element.parentElement.classList.remove("Completed");
        element.parentElement.classList.add("TD");
        element.checked = false;
        }
    };
    saveTasks();
});

// Delete Button Functionality
delete_button.addEventListener('click', function() {
    for (var element of checkboxes){
        if (element.checked == true) {
            element.parentElement.remove();
        }
    };
    saveTasks();
});

// the callback function for moving task item from TD to Completed
function ifCheckboxChecked(checkbox) {
    if (checkbox.checked) {
        // get the parent <li> element of the checkbox
        let taskItem = checkbox.parentElement;
        // strikethrough the text
        taskItem.style.textDecoration = 'line-through';
        if (checkbox.parentElement.classList.contains("TD")){
        // remove the <li> from the to-do list
        taskItem.remove();
        // add the <li> to the completed list
        completedList.appendChild(taskItem);
        // change class
        checkbox.parentElement.classList.remove("TD");
        checkbox.parentElement.classList.add("Completed");
        checkbox.checked = false;
        }
    }
    saveTasks();
}

// add an event listeners to each checkbox
checkboxes.forEach((checkbox) => {
  // add an event listener
  checkbox.addEventListener('change', () => ifCheckboxChecked(checkbox))
});

// get the text input element
let userTextInput = document.querySelector('.Submit_Task');
// add the event listener for user pressing the enter key
userTextInput.addEventListener('keypress', function(event) {
    // get the user input string
    let userEnteredText = userTextInput.value;
    // if the user pressed the 'Enter' key and the input is not empty
    if (event.keyCode === 13 && userEnteredText.trim() !== '') {
        event.preventDefault();
        let new_li = document.createElement('li');
        new_li.innerHTML = `${userEnteredText} <input type="checkbox" name="${userEnteredText}">`;
        new_li.classList.add('TD');
        // add an event listener to the new checkbox
        let checkbox = new_li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => ifCheckboxChecked(checkbox));
        todoList.appendChild(new_li);
        userTextInput.value = ''; // clear the input
    }
    saveTasks();
});

// Save tasks to localStorage
function saveTasks() {
    let tasks = Array.from(todoList.children).map(li => li.textContent.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        let new_li = document.createElement('li');
        new_li.innerHTML = `${task} <input type="checkbox" name="${task}">`;
        new_li.classList.add('TD');
        // add an event listener to the new checkbox
        let checkbox = new_li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => ifCheckboxChecked(checkbox));
        todoList.appendChild(new_li);
    });
}

// Load tasks when the page loads
window.addEventListener('DOMContentLoaded', loadTasks);
