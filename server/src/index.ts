import express from "express";
import cors from "cors";
import databaseRouter from "./routes/databaseRoutes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./build"));

// const PORT = 3001;
const PORT = process.env.PORT || 3001;

// get data from database
app.use("/api/database", databaseRouter);

app.listen(PORT, () => {
  console.log(`Server running on: port ${PORT}`);
});
