import { exit } from "node:process";
import db from "../config/db.js";
import { Category, User } from "../models/index.js";
import categories from "./categories.js";
import users from "./users.js";

const importData = async () => {
  try {
    await db.authenticate();

    await db.sync();

    // Use Promise.all for extends with needed added more data
    await Promise.all([
      User.bulkCreate(users),
      Category.bulkCreate(categories),
    ]);

    console.log("Data imported successfully");

    exit();
  } catch (error) {
    console.log("Error importing data", error);
    exit(1);
  }
};

const removeData = async () => {
  try {
    await db.sync({ force: true });
    console.log("Data remove successfully");

    exit();
  } catch (error) {
    console.log("Error removing data", error);

    exit(1);
  }
};

if (process.argv[2] === "-i") importData();
if (process.argv[2] === "-r") removeData();
