let todos = getTodos()

const filters = {
  searchText : ''
}


document.querySelector('#search-todo').addEventListener('change',function(e) {
  console.log(e.target.value)
})
document.querySelector('#search-todo').addEventListener('input',function(e) {
  filters.searchText = e.target.value
  renderTodos(todos,filters)
})
document.querySelector('#todo-form').addEventListener('submit',function(e) {
  e.preventDefault()
  let notesAdded = e.target.elements.addTodo.value
  if(notesAdded.trim().length!=0) {
    document.querySelector('#error-msg').innerHTML=''
    todos.push({id:uuidv4(), text : notesAdded, completed : false})
    saveTodos(todos)
    renderTodos(todos,filters)
    e.target.elements.addTodo.value = ''
  }
  else {
    generateErrorMsg()
  }
})
document.querySelector('#hide-completed').addEventListener('change',function(e){
  if(e.target.checked) {
    const completedTasks = todos.filter(function(todo) {
      return !todo.completed
    })
    renderTodos(completedTasks,filters)
  }
  else {
    renderTodos(todos,filters)
  }
})

renderTodos(todos,filters)