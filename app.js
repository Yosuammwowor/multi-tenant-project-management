import express from "express";
import { router as userRouter } from "./routes/userRoute.js";

const app = express();

app.use(express.json());

// Endpoint
app.use("/users", userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
