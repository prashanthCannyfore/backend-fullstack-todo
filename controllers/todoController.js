import Todo from "../models/Todo.js"

export const getTodos = async (req, res) => {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
};



export const updateTodo = async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
}



export const createTodo = async (req, res) => {
    const todo = await Todo.create({
        user: req.user._id,
        text: req.body.text,
        completed: false,
    });
    res.json(todo);
};



export const deleteTodo = async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};
