import app from "./app.js";
import connection from "./database/mysql/connection.js";
import { config } from "dotenv";
config();

const PORT = process.env.PORT ?? 3001;

connection
  .getConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection with database failed:\r\n");
    console.log(err);
    console.log("\r\nServer initialization failed");
    process.exit(0);
  });
