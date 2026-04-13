const {Task,User} = require('../models');

//create task
exports.createTask = async (data, userId) => {

    // 🔥 check if user exists
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return await Task.create({
        title: data.title,
        completed: data.completed || false,
        userId: userId
    });
};

//get all task of user
exports.getTasks = async(userId)=>{
    const tasks=await Task.findAll({
        where:{userId}
    });
    return tasks;
};


//update task
exports.updateTask = async (id, data, userId) => {

    const task = await Task.findOne({
        where: { id, userId }
    });

    if (!task) {
    console.log("Task not found for this user");
    return;
}

    return await task.update({
        title: data.title,
        completed: data.completed
    });
};

//delete task
exports.deleteTask=async(id,userId)=>{
    const result=await Task.destroy({
            where: { id, userId }
    });
    return result;
}