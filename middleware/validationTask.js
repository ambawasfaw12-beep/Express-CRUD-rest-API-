export const validationTask = (req, res, next) => {
    if (req.method === "POST") {
        // Creation requires a non-empty task title
        if (!req.body || !req.body.task || req.body.task.trim() === '') {
            const error = new Error("Task title is required");
            error.status = 400;
            return next(error);
        }
    } else if (req.method === "PUT") {
        // Only validate task title IF it was explicitly passed in req.body
        if (req.body.task !== undefined && req.body.task.trim() === '') {
            const error = new Error("Task title cannot be empty");
            error.status = 400;
            return next(error);
        }
    }
    next();
};