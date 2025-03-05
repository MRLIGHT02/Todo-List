let addButton = document.getElementById('add-btn');
let ulList = document.querySelector('ul');
let searchBar = document.getElementById('search-input');
let tastList = [];

addButton.addEventListener('click', function () {
    let content = document.getElementById('add-content').value.trim();
    
    if (content === '') {
        alert('Please enter a task');
        return;  // Don't proceed if the input is empty
    }
    
    // Check if the task already exists
    if (tastList.some(task => task.content === content)) {
        alert('Task already exists');
        return;
    }
    
    let li = document.createElement('li');
    let button = li.appendChild(document.createElement('button'));
    button.textContent = 'Delete';
    
    
    const task = {
        id: Date.now(),
        content: content,
        completed: false
    };
    
    tastList.push(task);
    
    // Add content to the list item
    li.appendChild(document.createTextNode(task.content));
    
    ulList.appendChild(li);
    
    
    // Clear the input field after adding the task
    document.getElementById('add-content').value = '';

    // Delete button functionality
    button.addEventListener('click', function () {
        let confirmValue = confirm('Are you sure you want to delete this task?');
        if (confirmValue) {
            ulList.removeChild(li);
            tastList = tastList.filter(t => t.id !== task.id); // Remove from tastList
        }
    });
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
