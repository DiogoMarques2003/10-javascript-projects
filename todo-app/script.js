const formEl = document.getElementById('form');
const inputEl = document.getElementById('input');
const todosEl = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach(todo => {
        addToDo(todo);
    });
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    
    addToDo();
});

function addToDo(todo) {
    let todoText = inputEl.value;

    if (todo) {
        todoText = todo.text;
    }

    if (!todoText) return;

    const todoEl = document.createElement('li');
    if (todo?.completed) todoEl.classList.add('completed');
    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
        todoEl.classList.toggle('completed');
        updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        todoEl.remove();
        updateLS();
    });

    todosEl.appendChild(todoEl)

    inputEl.value = '';

    updateLS();
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}
