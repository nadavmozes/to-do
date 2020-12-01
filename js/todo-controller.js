function renderTodos() {
    var todos = getTodosForDisplay();
    var strHTMLs = todos.map(function(todo) {
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
                        ${todo.txt}
                        <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
                        </li>`
    })

    console.log(strHTMLs)
    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');
    document.querySelector('.todo-total').innerText = getTotalCount()
    document.querySelector('.todo-active').innerText = getActiveCount()
    document.querySelector('.importance').value = '1';
}


function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
    var elConfirm = confirm('For sure?')
    if (!elConfirm) {}
    removeTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var elTodoTxt = document.querySelector('input[name=todoTxt]');
    var elImportant = document.querySelector('.importance')
        // console.log(elTodoTxt)
        // console.log(elImportant)
    if (!elTodoTxt.value) {
        return alert('Task Cannot be empty, please enter task');
    }
    addTodo(elTodoTxt.value, elImportant.value);
    renderTodos();
    elTodoTxt.value = '';

}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    renderTodos();
}

function setSort(sortBy) {
    gSortBy = sortBy;
}