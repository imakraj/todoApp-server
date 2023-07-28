const Task = require("../models/taskModel")

const getTasks = async (req, res) => {
    const user = req.user.id;

    try {
        const tasks = await Task.find({user});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const newTask = async (req, res) => {
    const { task } = req.body;
    const user = req.user.id;

    try {
        const newTask = new Task({ task, user});
        await newTask.save();
        res.status(200).json(newTask);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(deletedTask);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const updatedTaskData = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData);

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    getTasks,
    newTask,
    updateTask,
    deleteTask
}