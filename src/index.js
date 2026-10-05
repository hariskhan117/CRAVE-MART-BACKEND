import dotenv from "dotenv";
import connectDB from "./db/index.js";
import dns from "node:dns";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB();
