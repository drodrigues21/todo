const addTodoForm = document.querySelector('.add-todo-form');
const todoList = document.querySelector('.todo-list');

// Create li template and add to ul
const addTodo = (todo) => {
    const todoTemplate = `
        <li class="todo-item">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    const keyValue = todo;

    localStorage.setItem(keyValue, todoTemplate);

    let html = localStorage.getItem(keyValue);

    todoList.innerHTML += html;
    
}

document.addEventListener('DOMContentLoaded', () => {

    for(let i = 0; i < localStorage.length; i++) {
        let localKey = localStorage.key(i);

        todoList.innerHTML += localStorage.getItem(localKey);
        
        // Delete todo item
        const deleteTodo = document.querySelectorAll('.delete');

        deleteTodo.forEach((item) => {
       
            item.addEventListener('click', e => {
                item.parentElement.remove();
                localStorage.removeItem(e.target.previousElementSibling.textContent); 
            });
        });
        
    }
    

});


// Event listener on submit add todo form
addTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = addTodoForm.add.value.trim();

    if(todo.length > 2) {
        addTodo(todo);
        addTodoForm.reset();
    }

});


