import express from "express";
import { router as userRouter } from "./routes/userRoute.js";
import { router as projectRouter } from "./routes/projectRoute.js";

const app = express();

app.use(express.json());

// Endpoint
app.use("/users", userRouter);
app.use("/projects", projectRouter);

app.use((req, res) => {
  res.status(404).json({ status: "fail", message: "Not Found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
