const STORAGE_KEY = 'todosDB';

var gTodos;
var gFilterBy = 'all';
var gSortBy = 'created';

_createTodos();

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos;
    var todos = gTodos.filter(function(todo) {
        return (todo.isDone && gFilterBy === 'done' ||
            !todo.isDone && gFilterBy === 'active')

    })
    return todos;
}

function sortTodosForDisplay(todos) {
    var todos1 = todos.sort(function(todo1, todo2) {
        if (gSortBy === 'created') return todo1.createdAt - todo2.createdAt;
        else if (gSortBy === 'txt') {
            if (todo1.txt > todo2.txt) return 1
            if (todo1.txt < todo2.txt) return -1
            return 0;
        } else return todo1.importance - todo2.importance;
    })
    return todos1;
}


function removeTodo(id) {
    var idx = gTodos.findIndex(function(todo) {
        return todo.id === id
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(id) {
    var todo = gTodos.find(function(todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, importance) {
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance,
    }
    gTodos.unshift(todo)
    _saveTodosToStorage();
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function onSetSort(sortBy) {
    console.log('Sort by', sortBy);
    setSort(sortBy);
    renderTodos();
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    var count = 0;
    gTodos.forEach(function(todo) {
        if (!todo.isDone) count++;
    })
    return count;
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)

    if (!todos || todos.length === 0) {
        todos = [{
                id: 't101',
                txt: 'Do this please',
                isDone: false
            },
            {
                id: 't102',
                txt: 'Do That now',
                isDone: true
            },
            {
                id: 't103',
                txt: 'Clean it up',
                isDone: true
            },
        ];

    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}