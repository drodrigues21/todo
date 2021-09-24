// Get the ul element to append the li's
const todosList = document.querySelector('.todo-list');
// Get the form input to get the todo from user
const todoInput = document.querySelector('.todo-form input');
// Get the form to listen to submit event
const submitForm = document.querySelector('.todo-form');
// Get the search input to filter the todo list
const search = document.querySelector('.search-form input');

// Create an li with a class and icon (delete icon) and add user input as the li text content
const createTodo = (todo) => {
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-trash-alt', 'delete');

    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fas', 'fa-check-square', 'check');

    const iconsContainer = document.createElement('div');
    iconsContainer.appendChild(checkIcon);
    iconsContainer.appendChild(deleteIcon);

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo');
    todoItem.textContent = todo;
    
    todoItem.appendChild(iconsContainer);
    todosList.appendChild(todoItem);

    saveLocalTodos(todo);
}

// Save the user input to local storage 
const saveLocalTodos = (todo) => {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get the data from local storage and render on page reload
const getLocalTodos = () => {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach( (todo) => {
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('far', 'fa-trash-alt', 'delete');

        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fas', 'fa-check-square', 'check');

        const iconsContainer = document.createElement('div');
        iconsContainer.appendChild(checkIcon);
        iconsContainer.appendChild(deleteIcon);
        
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo');
        todoItem.textContent = todo;
        
        todoItem.appendChild(iconsContainer);
        todosList.appendChild(todoItem)
    });
}

// Filter the todos
const filterTodos = (term) => {
    Array.from(todosList.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));   
    
    Array.from(todosList.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
}

// Remove todo from local storage
const deleteLocalTodo = (todo) => {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.textContent;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event listener on submit to append the todos to the parent element
submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todo = todoInput.value.trim();
    
    if(todo.length > 1) {
       createTodo(todo);
       submitForm.reset();
    }  
});

// Event listener when add icon is clicked
submitForm.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-todo')) {
        const todo = todoInput.value.trim();
        
        if(todo.length > 1) {
            createTodo(todo);
            submitForm.reset();
            todoInput.focus();
        }
    }
});

// Check completed todos and delete todos
const checkDelete = (e) => {
    const item = e.target;
    
    if(item.classList.contains('delete')) {
        const todo = item.parentElement.parentElement;
        todo.classList.add('remove');
        
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });

        deleteLocalTodo(todo);
    }

    if(item.classList.contains('check')) {
        const completed = item.parentElement.parentElement;
        completed.classList.toggle('completed');
        console.log(completed);
    }
    
}

// Event listener (on the ul container) when clicked on delete icon to remove from the UI and from local storage
todosList.addEventListener('click', checkDelete);

// Event listener on page reload to render the todo list saved on local storage
document.addEventListener('DOMContentLoaded', getLocalTodos());

// Event listener keyup on search filter
search.addEventListener('keyup', () =>{
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});