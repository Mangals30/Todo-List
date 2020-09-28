const getTodos = function() {
try {
  const todosJSON = localStorage.getItem('todos')
  const todos = todosJSON!=null ? JSON.parse(todosJSON) : []
  return todos
} catch (error) {
  return []
}  
}
const saveTodos = function(todos) {
  localStorage.setItem('todos',JSON.stringify(todos))
}

const removeTodos = function(filteredTodos,todo) {
  const remainingTodos = filteredTodos.filter(function(element){
    return element.id!=todo.id
  })
  saveTodos(remainingTodos)
  renderTodos(remainingTodos,filters)
}

const generateTodoDOM = function(filteredTodos) {
  const todoEl = document.querySelector('#todos')
  todoEl.innerHTML = ''
  filteredTodos.forEach(function(todo) {
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('class','todoDiv')
    const checkDiv = document.createElement('div')
    checkDiv.setAttribute('class','check-text')
    const check =`<label class="checkbox">${todo.text}
    <input type="checkbox" name="hideCompleted" class="checkEl" value = ${todo.id}>
    <span class="checkmark"></span>
  </label>`
    const buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class','buttonDiv')
    const buttonEl = document.createElement('button')
    buttonDiv.appendChild(buttonEl)
    buttonEl.textContent = 'Del'
    checkDiv.insertAdjacentHTML('beforeend',check)
    todoDiv.appendChild(checkDiv)
    todoDiv.appendChild(buttonDiv)
    todoEl.appendChild(todoDiv)
    buttonEl.addEventListener('click',function(e) {
      e.preventDefault()
       removeTodos(filteredTodos,todo)
    })
    checkDiv.addEventListener('change',function(e) {
     if (e.target.checked) {
       todo.completed = true
     }
     else {
      todo.completed = false
     }
     saveTodos(filteredTodos)
    })
    if(todo.completed == true) {
      checkDiv.children[0].children[0].checked= true
    }
    generateSummaryDOM()
  })
}

const renderTodos = function(todos,filters) {
  let filteredTodos = todos.filter(function(todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  })
  generateSummaryDOM()
  generateTodoDOM(filteredTodos)
}

const generateSummaryDOM = function() {
  const todos = getTodos()
  const incompleted = todos.filter(function(todo) {
    return !todo.completed
  })
  let countText = document.querySelector('h2')
  countText.textContent = `You have ${incompleted.length} todos left.`
}

const generateErrorMsg = function () {
  document.querySelector('#error-msg').innerHTML=''
  const errorMsg = document.createElement('p')
  errorMsg.textContent = '*Please add a new task!'
  errorMsg.style.color = 'red'
  document.querySelector('#error-msg').appendChild(errorMsg)
}

