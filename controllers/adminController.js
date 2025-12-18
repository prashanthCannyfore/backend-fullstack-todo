import User from "../models/User.js";
import Todo from "../models/Todo.js";


export const getAllUsers = async(req,res) => {
    const user = await User.find().select("-password");
    res.json(user);
};

export const getAllTodos = async(req,res) => {
    const todos = await Todo.find().populate("user","email");
    res.json(todos);
};