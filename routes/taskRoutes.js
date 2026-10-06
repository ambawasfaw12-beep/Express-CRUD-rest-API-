import express from "express"
import { backendTestTasks as tasks } from '../data.js'
import { validationTask } from "../middleware/validationTask.js"
const router = express.Router()

router.get('/', (req, res, next) => {
    try {

        if (req.query.completed !== undefined) {
            const isCompleted = req.query.completed === 'true'
            const task = tasks.filter(t => t.completed === isCompleted)
            return res.json(task)
        }

        res.send(tasks)
    } catch (err) {
        next(err)
    }
})

router.post('/', validationTask, (req, res, next) => {
    try {
        const newTask = {
            id: Date.now(),
            task: req.body.task,
            description: req.body.description,
            completed: req.body.completed || false
        }
        tasks.push(newTask)
        res.status(201).json(newTask)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', (req, res, next) => {
    try {
        const tasksId = Number(req.params.id)

        if (isNaN(tasksId)) {
            const error = new Error("Task ID must be a valid number");
            error.status = 400; // Bad Request
            return next(error); // 🔴 Sends 400 error to your global errorHandler!
        }

        const task = tasks.find(t => t.id === tasksId)

        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.json(task)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', (req, res, next) => {
    try {
        const taskId = Number(req.params.id)
        const taskIndex = tasks.findIndex(t => t.id === taskId)

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' })
        }

        tasks.splice(taskIndex, 1)
        res.json({ message: 'Task deleted successfully' })
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validationTask, (req, res, next) => {
    try {
        const taskId = Number(req.params.id)
        const taskIndex = tasks.findIndex(t => t.id === taskId)

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' })
        }

        // Merge old task data with updated fields from req.body
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body }

        res.json(tasks[taskIndex])
    } catch (err) {
        next(err)
    }
})

export default router