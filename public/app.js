const taskForm = document.getElementById('taskForm')
const taskInput = document.getElementById('taskInput')
const taskList = document.getElementById('taskList')
const taskDesc = document.getElementById('taskDesc')
const addbtn = document.getElementById('add-btn')
let currentlyEditedId = null

taskList.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.dataset.id
        deleteTask(id)
    } else if (event.target.classList.contains('edit-btn')) {
        const id = event.target.dataset.id
        const task = event.target.dataset.task
        const desc = event.target.dataset.description
        editTask(id, task, desc)
    }
})

const getTask = async () => {
    const response = await fetch('/api/tasks')
    const datas = await response.json()

    taskList.innerHTML = ''
    datas.forEach(data => {
        const li = document.createElement('li')

        li.innerHTML = `
    <input type="checkbox" class="task-checkbox" ${data.completed ? 'checked' : ''}>
    
    <div class="task-text">
        <h3 class="${data.completed ? 'completed' : ''}">${data.task}</h3>
        <p>${data.description || ''}</p>
    </div>

    <div class="task-actions">
        <button class="edit-btn" data-id="${data.id}" data-task="${data.task}" data-description="${data.description}">Edit</button>
        <button class="delete-btn" data-id="${data.id}">Delete</button>
    </div>
        `
        taskList.appendChild(li)
    });
}

getTask()

taskForm.addEventListener('submit', async event => {
    event.preventDefault()


    const title = taskInput.value.trim()
    const desc = taskDesc.value.trim()

    if (currentlyEditedId === null) {

        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task: title,
                description: desc
            })
        })

        if (response.ok) {
            taskForm.reset()
            getTask()
        } else {
            console.log(response.status)
        }
    }

    else {

        const response = await fetch(`/api/tasks/${currentlyEditedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: title,
                description: desc
            })
        })
        if (response.ok) {
            currentlyEditedId = null
            addbtn.textContent = "Add Task"
            taskInput.value = ''
            taskDesc.value = ''
            getTask()
        }else{
            console.log(response.status)
        }
    }
})

const deleteTask = async id => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        getTask()
    } else {
        console.log(response.status)
    }
}

const editTask = (id, task, desc) => {
    addbtn.textContent = 'Update Task'
    taskInput.value = task
    taskDesc.value = desc
    currentlyEditedId = id
}