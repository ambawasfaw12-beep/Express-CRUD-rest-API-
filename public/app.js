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
    <span class="task-text">${data.task}</span>
    <div class="task-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    </div>
        `
        taskList.appendChild(li)
    });
}

getTask()