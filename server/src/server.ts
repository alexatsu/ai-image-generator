import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./database/connect";
import post from "./routes/post";
import dalle from "./routes/dalle";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use('/api/v1/post', post);
app.use('/api/v1/dalle', dalle);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    connectDb(process.env.MONGO_URL as string);
    const listening = () => console.log(`Server listening on port ${process.env.PORT}`);
    app.listen(process.env.PORT, listening);
  } catch (error) {
    console.log(error);
  }
};
startServer();
