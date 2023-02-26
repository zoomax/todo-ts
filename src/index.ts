interface Todo {
  label: string
  completed: boolean
}

const form = document.getElementById('todo_form')! as HTMLFormElement
const input = document.getElementById('todo_input')! as HTMLInputElement
const list = document.getElementById('todo_list')! as HTMLUListElement
const todoes: Todo[] = getTodoes()
todoes.forEach(createTodo)

form.addEventListener('submit', handleSubmit)

function handleSubmit(e: SubmitEvent): void {
  e.preventDefault()
  const label = input.value
  const todo: Todo = {
    label,
    completed: false,
  }
  if (label) {
    todoes.push(todo)
    createTodo(todo)
    saveToStorage()
    input.value = ''
  }
}

function createTodo(todo: Todo): void {
  const listItem: HTMLLIElement = document.createElement('li')
  const checkBox: HTMLInputElement = document.createElement('input')
  checkBox.addEventListener('change', () => {
    todo.completed = !todo.completed
    saveToStorage()
  })
  checkBox.type = 'checkbox'
  checkBox.checked = todo.completed
  listItem.append(todo.label)
  listItem.append(checkBox)
  list.append(listItem)
}
function saveToStorage(): void {
  localStorage.setItem('todoes', JSON.stringify(todoes))
}
function getTodoes(): Todo[] {
  const value: null | string = localStorage.getItem('todoes')
  return value ? (JSON.parse(value) as Todo[]) : []
}
