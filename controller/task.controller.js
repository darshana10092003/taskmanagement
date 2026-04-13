const taskService = require('../services/task.service');

exports.createTask = async (req, res) => {
    try {
        const { title, completed, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const task = await taskService.createTask(
            { title, completed },
            userId
        );

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTasks=async(req,res)=>{
    const tasks=await taskService.getTasks(req.user.id);
    res.json(tasks);
};

// exports.updateTask=async(req,res)=>{
//     await taskService.updateTask(req.params.id, req.body, req.user.id);
//     res.json({message:"Task updated"});
// };


exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const updated = await taskService.updateTask(
            taskId,
            req.body,
            req.body.userId // (temporary if you're using it)
        );

        res.json(updated);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask=async(req,res)=>{
    await taskService.deleteTask(req.params.id, req.user.id);
    res.json({message:"Task deleted"});
};