import mongoose from "mongoose";

const connectDb = (url: string) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};
export default connectDb;