import Todo from "../models/Todo.js"

// export const getTodos = async (req, res) => {
//     const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(todos);
// };


// export const getTodos = async (req, res) => {
//   try {
//     const page = Math.max(parseInt(req.query.page) || 1, 1);
//     const limit = Math.min(parseInt(req.query.limit) || 10, 50);
//     const sort = req.query.sort === "oldest" ? 1 : -1;

//     const skip = (page - 1) * limit;

//     const filter = { user: req.user._id };

//     const totalTodos = await Todo.countDocuments(filter);

//     const todos = await Todo.find(filter)
//       .populate("user", "email")
//       .sort({ createdAt: sort })
//       .skip(skip)
//       .limit(limit);

//     res.json({
//       page,
//       limit,
//       totalPages: Math.ceil(totalTodos / limit),
//       totalTodos,
//       todos,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getTodos = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const sort = req.query.sort === "oldest" ? 1 : -1;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const filter = {
      user: req.user._id,
      text: { $regex: search, $options: "i" } // ✅ correct field
    };

    const totalTodos = await Todo.countDocuments(filter);

    const todos = await Todo.find(filter)
      .populate("user", "email")
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(totalTodos / limit),
      totalTodos,
      todos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
