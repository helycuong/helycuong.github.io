function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
let todos = []
// let todos = [
//     {
//         id: create_UUID(),
//         title: 'Hôm nay chơi game',
//         status: true
//     },
//     {
//         id: create_UUID(),
//         title: 'Học lập trìnnh Javascript',
//         status: false
//     }
// ]

const todo_list = document.querySelector('.todo-list')

function renderUI(todos) {
    let job = ''

    let option_selected = get_todo_option_item()
    let newTodos

    switch (option_selected) {
        case 1: //All
            newTodos = [...todos]
            break
        case 2: //Chưa hoàn thành
            newTodos = todos.filter(value => value.status == false)
            break
        case 3: //Hoàn thành
            newTodos = todos.filter(value => value.status == true)
            break
        default: //Mặc định
            newTodos = [...todos]
            break
    }

    if (newTodos.length == 0) {
        job += `<p>Không có công việc nào</p>`
    }
    for (let i = 0; i < newTodos.length; i++) {
        job += `<div class="todo-item ${newTodos[i].status ? 'active-todo' : ''}">
    <div class="todo-item-title">
        ${newTodos[i].status
                ? `<input type="checkbox" checked onclick="toggle_status('${newTodos[i].id}')">`
                : `<input type="checkbox" onclick="toggle_status('${newTodos[i].id}')">`
            }
        <p>${newTodos[i].title}</p>
    </div>
    <div class="option">
        <button class="btn btn-update" onclick="updateTodo('${newTodos[i].id}')">
            <img src="./img/pencil.svg" alt="icon">
        </button>
        <button class="btn btn-delete" onclick="deleteTodo('${newTodos[i].id}')">
            <img src="./img/remove.svg" alt="icon">
        </button>
    </div>
    </div>`
    }
    todo_list.innerHTML = ''
    todo_list.insertAdjacentHTML('afterbegin', job)
}

//Nút xoá
function deleteTodo(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1)
        }
    }
    //renderUI(todos)
    setTodosFromLocalStorage(todos)
}

//Nút update

function updateTodo(id) {

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            if (todos[i].key == true) {
                todos[i].title = `<input type="text" id="input" value="${todos[i].title}">`
                todos[i].key = !todos[i].key
            } else {
                todos[i].title = input.value
                todos[i].key = !todos[i].key
            }
        }
    }
    setTodosFromLocalStorage(todos)
}

// function complete_updateTodo(id) {
//     let btn_update = document.querySelectorAll('.btn-update')
//     let array_btn_update = Array.from(btn_update)

//     for (let i = 0; i < todos.length; i++) {
//         if (todos[i].id == id) {
//             todos[i].title = input.value
//             btn_update[i].outerHTML = `<button class="btn btn-update" onclick="updateTodo('${todos[i].id}')">
//             <img src="./img/pencil.svg" alt="icon">
//             </button>`
//         }
//     }
//     setTodosFromLocalStorage(todos)
// }

//Nút thêm
const todo_input = document.querySelector('#todo-input')
const btn_add = document.querySelector('#btn-add')

btn_add.onclick = function () {
    if (todo_input.value == '') {
        alert('Công việc không được để trống')
    } else {
        let new_job = {
            id: create_UUID(),
            title: todo_input.value,
            status: false,
            key: true
        }
        todos.unshift(new_job)
        //renderUI(todos)
        setTodosFromLocalStorage(todos)
        todo_input.value = ''
    }
}

//Tích vào công việc
function toggle_status(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos[i].status = !todos[i].status
        }
    }
    //renderUI(todos)
    setTodosFromLocalStorage(todos)
}

//Lấy giá trị trong ô input radio
let todo_option_item = document.querySelectorAll('.todo-option-item input')

function get_todo_option_item() {
    for (let i = 0; i < todo_option_item.length; i++) {
        if (todo_option_item[i].checked) {
            return parseInt(todo_option_item[i].value)
        }
    }
}

//Sự kiện click nút radio
for (let i = 0; i < todo_option_item.length; i++) {
    todo_option_item[i].onclick = function () {
        //renderUI(todos)
        setTodosFromLocalStorage(todos)
    }
}

//Lưu trữ web HTML
function setTodosFromLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
    renderUI(todos)
}

function getTodosFromLocalStorage() {
    const todoLocalStorage = localStorage.getItem("todos")
    if (todoLocalStorage) {
        todos = JSON.parse(todoLocalStorage)
        renderUI(todos)
    }
}


function init() {
    //renderUI(todos)
    getTodosFromLocalStorage()
}

window.onload = init()

