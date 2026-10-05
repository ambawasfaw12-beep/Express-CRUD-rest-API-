export const validationTask = (req, res, next) => {

    // Logic: If there is NO req.body.task OR if trimming spaces leaves it empty ""
    if (!req.body || !req.body.task || req.body.task.trim() === '') {
        const error = new Error("Task title is required")
        error.status = 400
        return next(error)
    }
    next()
}