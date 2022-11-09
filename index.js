import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import db from "./config/db.js";
import {
  apiRoutes,
  appRoutes,
  propertiesRoutes,
  userRoutes,
} from "./routes/index.js";

const app = express();

// Connection to DB
try {
  await db.authenticate();

  db.sync();

  console.log("Connection DB sucessfull");
} catch (error) {
  console.log(error);
}

// Allow global middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Allow Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Routing
app.use("/", appRoutes);
app.use("/api", apiRoutes);
app.use("/auth", userRoutes);
app.use("/", propertiesRoutes);

// Handle not found page
app.use((req, res) => {
  res.status(404).send("Ups... está página no existe");
});

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Server start listen on localhost:${port}`);
});
