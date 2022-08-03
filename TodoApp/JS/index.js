const container = document.getElementsByClassName("container")
const input = document.querySelector("#inputTodo")
const addButton = document.querySelector("#addTodoButton")
const todoForm = document.querySelector(".todo-form")
const list = document.querySelector("#lists")
const paragraph = document.querySelector("#message")
//adding onButtonClickListener

const getTodosFromLocalStorage = () => {
    const allTodo = localStorage.getItem("myTodos") ? JSON.parse(localStorage.getItem("myTodos")) : [];
    return allTodo
}

const addTodo = (event) => {
        event.preventDefault()
        console.log(input.value)
        const todoValue = input.value


        //add uniqueID
        const todoId = Date.now().toString()
        createTodo(todoId,todoValue)
        showNotification()

        //Store in Local Storage
        const todos = getTodosFromLocalStorage();
        todos.push({todoId,todoValue})
        console.log(todos.length)
        localStorage.setItem("myTodos",JSON.stringify(todos))
        input.value = ""
}

const showNotification = () =>{
    paragraph.textContent = "Todo Added"
    paragraph.classList.add("bg-success")
    setTimeout(()=>{
        paragraph.textContent = ""
        paragraph.classList.remove("bg-success")
    },1000)
}
const deleteTodo = (event) => {
    const seletedTodo = event.target.parentElement.parentElement
    list.removeChild(seletedTodo)
    console.log(seletedTodo.id)
    let todos = getTodosFromLocalStorage()
    const newTodos = todos.filter((todo)=> todo.todoId != seletedTodo.id)
    localStorage.setItem("myTodos",JSON.stringify(newTodos))
}

const createTodo = (id,value) =>{
    const todoList = document.createElement("li")
    todoList.id = id
    todoList.innerHTML = `<span>${value}</span>
    <span><button id = "deleteId">Delete</button></span>`
    list.appendChild(todoList)

    const deleteButton = todoList.querySelector("#deleteId")
    deleteButton.addEventListener("click",deleteTodo)
    
}


todoForm.addEventListener("submit",addTodo)