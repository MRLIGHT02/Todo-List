let taskList;

try {
    // Attempt to load tasks from localStorage
    taskList = JSON.parse(localStorage.getItem("task")) || [];
} catch (e) {
    taskList = [];
    console.error("Error parsing tasks from localStorage:", e);
}

document.addEventListener('DOMContentLoaded', () => {
    let addButton = document.getElementById('add-btn');
    let ulList = document.querySelector('ul');
    let searchBar = document.getElementById('search-input');
    let divcontainer = document.getElementsByClassName('searchdiv');
    let clearButton = document.getElementById('clear-btn'); // Reference the clear button

    // Add task functionality
    addButton.addEventListener('click', function () {
        let content = document.getElementById('add-content').value.trim();

        if (content === '') {
            alert('Please enter a task');
            return;  // Don't proceed if the input is empty
        }

        // Check if the task already exists
        if (taskList.some(task => task.content === content)) {
            alert('Task already exists');
            return;
        }

        let li = document.createElement('li');
        let button = li.appendChild(document.createElement('button'));
        button.textContent = 'Delete';

        // display the search bar
        function displayFun() {
            if (ulList.children.length > 0) {
                searchBar.style.display = 'flex'; // Show the search bar
            } else {
                searchBar.style.display = 'none'; // Hide the search bar
            }
        }

        const task = {
            id: Date.now(),
            content: content,
            completed: false
        };

        taskList.push(task);
        saveTask(); // Save the new task to localStorage

        // Add content to the list item
        li.appendChild(document.createTextNode(task.content));
        ulList.appendChild(li);

        // Delete button functionality
        button.addEventListener('click', function () {
            let confirmValue = confirm('Are you sure you want to delete this task?');
            if (confirmValue) {
                // Remove the task from the DOM
                ulList.removeChild(li);
                // Remove task from the taskList array
                taskList = taskList.filter(t => t.id !== task.id);

                // Save updated taskList to localStorage
                saveTask(); 

                displayFun(); // Update display (search bar visibility)
            }
        });

        displayFun();
    });

    // Search bar functionality
    searchBar.addEventListener('keyup', function () {
        let searchValue = searchBar.value.toLowerCase();
        let listItems = ulList.getElementsByTagName('li');

        for (let i = 0; i < listItems.length; i++) {
            let itemContent = listItems[i].textContent.toLowerCase();

            if (itemContent.indexOf(searchValue) > -1) {
                listItems[i].style.display = '';  // Show item
            } else {
                listItems[i].style.display = 'none';  // Hide item
            }
        }
    });

    // Render tasks from localStorage on page load
    function loadTask(taskList) {
        taskList.forEach(task => {
            let li = document.createElement('li');
            let button = li.appendChild(document.createElement('button'));
            button.textContent = 'Delete';
            li.appendChild(document.createTextNode(task.content));
            ulList.appendChild(li);

            button.addEventListener('click', function () {
                let confirmValue = confirm('Are you sure you want to delete this task?');
                if (confirmValue) {
                    // Remove the task from the DOM
                    ulList.removeChild(li);

                    // Remove task from taskList
                    taskList = taskList.filter(t => t.id !== task.id);
                    saveTask(); 
                    localStorage.removeItem('task'); // Remove task from localStorage
                    // Save updated taskList to localStorage

                    displayFun(); // Update display
                }
            });
        });
    }

    function saveTask() {
        // Save the updated taskList to localStorage
        localStorage.setItem('task', JSON.stringify(taskList));
    }

    // Display search bar visibility
    function displayFun() {
        if (ulList.children.length > 0) {
            searchBar.style.display = 'flex'; // Show the search bar
        } else {
            searchBar.style.display = 'none'; // Hide the search bar
        }
    }

    // Load tasks from localStorage on page load
    loadTask(taskList);
    displayFun();


});
