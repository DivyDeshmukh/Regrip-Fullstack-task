import dotenv from "dotenv";

dotenv.config({
   path: "./.env"
});

import sequelize from "./db/index.js";
import app from "./app.js";

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
   app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
   });

   app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 8000}`);
   });
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
