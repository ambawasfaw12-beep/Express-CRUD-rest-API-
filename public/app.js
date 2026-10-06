const taskForm = document.getElementById('taskForm')
const taskInput = document.getElementById('taskInput')
const taskList = document.getElementById('taskList')

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
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    </div>
        `
        taskList.appendChild(li)
    });
}

getTask()