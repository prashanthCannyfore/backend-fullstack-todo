// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import todoRoutes from "./routes/todoRoutes.js";

// dotenv.config();
// const app = express();

// app.listen(5000,()=>{
//     console.log("sereving is running")
 
// })


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// import express from "express";
// import cors from "cors"
// import dotenv from "dotenv";
// import connectDB from "./config/db.js"
// import todoRoutes from "./routes/todoRoutes.js"
// dotenv.config();
// const app = express();


// connectDB();
// app.use(cors())
// app.use(express.json());
// app.use("/api/todos", todoRoutes);

// app.listen(5000, () => console.log("server is running on port 5000") )