import { Router } from "express";
import {protect} from "../middleware/authmiddleware.js"

import {createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todoController.js"

const  router = Router();

router.use(protect);

router.get("/",getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);


export default router;