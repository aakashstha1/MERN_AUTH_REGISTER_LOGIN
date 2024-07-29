import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_AUTH(Register&Login)",
    })
    .then(() => {
      console.log("Connected to Db");
    })
    .catch((error) => {
      console.log("Error connection to Db: ", error);
    });
};
