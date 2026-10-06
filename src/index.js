import dotenv from "dotenv";
import connectDB from "./db/index.js";
import dns from "node:dns";
import { app } from "./app.js";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB CONNECTION FAILED", err);
  });
