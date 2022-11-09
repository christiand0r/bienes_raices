import express from "express";
import { body } from "express-validator";
import uploadFile from "../middlewares/uploadFiles.js";
import verifyToken from "../middlewares/verifyToken.js";
import {
  changePropertyStatus,
  dashboardProperties,
  deleteProperty,
  formProperty,
  formPropertyEdit,
  formPropertyImage,
  readMessages,
  saveImagesProperty,
  saveProperty,
  savePropertyChange,
  sendMessage,
  showProperty,
} from "../controllers/propertiesController.js";
import verifyAuth from "../middlewares/verifyAuth.js";

const router = express.Router();

router.get("/my-properties", [verifyToken], dashboardProperties);

router.get("/properties/post", formProperty);
router.post(
  "/properties/post",
  [
    body("title").notEmpty().withMessage("El titulo no puede ir vacío"),
    body("description")
      .notEmpty()
      .withMessage("La descripción no puede ir vacío")
      .isLength({ max: 560 })
      .withMessage("La descripción es muy larga"),
    body("address")
      .notEmpty()
      .withMessage("Debe seleccionar una ubicación en el mapa"),
    body("category").isNumeric().withMessage("Debe seleccionar una categoría"),
    body("price")
      .isNumeric()
      .withMessage("El precio debe ser igual o mayor a cero"),
    body(["rooms", "bathrooms", "parkings"])
      .notEmpty()
      .withMessage("El campo no puede ir vacío"),
    verifyToken,
  ],
  saveProperty
);

router.get("/properties/add-images/:id", [verifyToken], formPropertyImage);
router.post(
  "/properties/add-images/:id",
  [verifyToken, uploadFile.single("images")],
  saveImagesProperty
);

router.get("/properties/edit/:id", [verifyToken], formPropertyEdit);
router.post(
  "/properties/edit/:id",
  [
    body("title").notEmpty().withMessage("El titulo no puede ir vacío"),
    body("description")
      .notEmpty()
      .withMessage("La descripción no puede ir vacío")
      .isLength({ max: 560 })
      .withMessage("La descripción es muy larga"),
    body("address")
      .notEmpty()
      .withMessage("Debe seleccionar una ubicación en el mapa"),
    body("category").isNumeric().withMessage("Debe seleccionar una categoría"),
    body("price")
      .isNumeric()
      .withMessage("El precio debe ser igual o mayor a cero"),
    body(["rooms", "bathrooms", "parkings"])
      .notEmpty()
      .withMessage("El campo no puede ir vacío"),
    verifyToken,
  ],
  savePropertyChange
);

// In this case use a form tag, the method attribute only support GET or POST
router.post("/properties/delete/:id", [verifyToken], deleteProperty);

router.put("/properties/:id", [verifyToken], changePropertyStatus);

router.get("/properties/messages/:id", [verifyToken], readMessages);

// @Public Area
router.get("/properties/:id", [verifyAuth], showProperty);

router.post(
  "/properties/:id",
  [
    body("message")
      .isLength({ min: 10 })
      .withMessage("El mensaje no puede ir vacío o es muy corto"),
    verifyAuth,
  ],
  sendMessage
);

export default router;
