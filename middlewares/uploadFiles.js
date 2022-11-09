import path from "path";
import multer from "multer";
import { generateID } from "../helpers/tokens.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads/"),
  filename: (req, file, cb) =>
    cb(null, generateID() + path.extname(file.originalname)),
});

const uploadFile = multer({ storage });

export default uploadFile;
