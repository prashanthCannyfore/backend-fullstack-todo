import User from "../models/User.js";
import Todo from "../models/Todo.js";
import { todo } from "node:test";


export const getAllUsers = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1 ,1);
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;
  const search = req.quary.search || "";

  const query = {
    email: { $regex: search, $options: "i" } // case-insensitive
  };

  const totalUsers = await User.countDocuments();
  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limit);

  res.json({
    page,
    totalPages: Math.ceil(totalUsers / limit),
    totalUsers,
    users,
  });
};


export const getAllTodos = async(req,res) => {
    const page = Math.max(Number(req.quary.page) || 1, 1);
    const limit = Math.min(Number(req.quary.limit) || 10, 50);
    const sort = req.query.sort === "oldest" ? 1 : -1;
    const totalTodos = await Todo.countDocuments();

    const skip = (page - 1) * limit;
    const todos = await Todo.find()
    .populate("user","email")
    .sort({createdAt: sort})
    .skip(skip)
    .limit(limit);

    res.json({
        page,
        totalPages:Math.ceil(totalTodos / limit),
        totalTodos,
        todos,
    });
};