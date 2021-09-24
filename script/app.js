// Get the ul element to append the li's
const todosList = document.querySelector('.todo-list');
// Get the form input to get the todo from user
const todoInput = document.querySelector('.todo-form input');
// Get the form to listen to submit event
const submitForm = document.querySelector('.todo-form');


// Create an li with a class and icon (delete icon) and add user input as the li text content
const createTodo = (todo) => {
    
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-trash-alt', 'delete');

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo');
    todoItem.textContent = todo;
    
    todoItem.appendChild(deleteIcon);
    todosList.appendChild(todoItem)

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
    
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo');
        todoItem.textContent = todo;
        
        todoItem.appendChild(deleteIcon);
        todosList.appendChild(todoItem)
    });
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

// Event lister on submit to append the todos to the parent element
submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const todo = todoInput.value.trim();
    console.log(todo);
    if(todo.length > 1) {
       createTodo(todo);
       submitForm.reset();
    }
    
});

// Event lister when add icon is clicked
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

// Event lister (on the ul container) when clicked on delete icon to remove from the UI and from local storage
todosList.addEventListener('click', (e) => {

    if(e.target.classList.contains('delete')) {
       e.target.parentElement.remove();
       deleteLocalTodo(e.target.parentElement);
    }

});

// Event lister on page reload to render the todo list saved on local storage
document.addEventListener('DOMContentLoaded', getLocalTodos());