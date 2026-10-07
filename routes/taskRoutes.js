import express from "express"
import { backendTestTasks as tasks } from '../data.js'
import { validationTask } from "../middleware/validationTask.js"
import { query } from '../db.js'
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {

        const { rows } = await query('SELECT * from tasks ORDER BY id ASC')
        res.json(rows)
    } catch (err) {
        next(err)
    }
})

// POST a new task into database
router.post('/', async (req, res, next) => {
    try {
        const { task, description } = req.body;
        
        const sql = `
            INSERT INTO tasks (task, description) 
            VALUES ($1, $2) 
            RETURNING *
        `;
        const values = [task, description || ''];

        const { rows } = await query(sql, values);
        res.status(201).json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// GET a single task by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rows } = await query('SELECT * FROM tasks WHERE id = $1', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// DELETE a task by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rowCount } = await query('DELETE FROM tasks WHERE id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', id: Number(id) });
    } catch (err) {
        next(err);
    }
});

// UPDATE a task by ID
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { task, description, completed } = req.body;

        const sql = `
            UPDATE tasks 
            SET task = COALESCE($1, task),
                description = COALESCE($2, description),
                completed = COALESCE($3, completed)
            WHERE id = $4
            RETURNING *
        `;
        const values = [task, description, completed, id];

        const { rows } = await query(sql, values);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

export default router