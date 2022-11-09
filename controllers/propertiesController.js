import { unlink } from "node:fs/promises";
import { validateChecks } from "../middlewares/validateChecks.js";
import { identifyOwner } from "../helpers/rols.js";
import { arrayErrorsToObject, parseDate } from "../helpers/transforms.js";
import { Category, Message, Property, User } from "../models/index.js";

export const dashboardProperties = async (req = Request, res = Response) => {
  const { user, query } = req;
  const { page: currentPage } = query;

  const limit = 10;
  const offset = currentPage * limit - limit;
  const regExp = /^[1-9]*$/;

  if (!regExp.test(currentPage)) return res.redirect("/my-properties?page=1");

  try {
    const [properties, totalProperties] = await Promise.all([
      Property.findAll({
        limit,
        offset,
        where: { userId: user.id },
        include: [
          { model: Category, as: "category" },
          { model: Message, as: "messages" },
        ],
      }),
      Property.count({ where: { userId: user.id } }),
    ]);

    const pages = Math.ceil(totalProperties / limit);

    res.render("properties/dashboard", {
      page: "Tablero",
      csrfToken: req.csrfToken(),
      currentPage,
      limit,
      offset,
      pages,
      properties,
      totalProperties,
      user,
    });
  } catch (error) {}
};

export const formProperty = async (req = Request, res = Response) => {
  // Consult categories table
  const [categories] = await Promise.all([Category.findAll()]);

  res.render("properties/form-property", {
    page: "Publicar propiedad",
    categories,
    csrfToken: req.csrfToken(),
  });
};
export const saveProperty = async (req = Request, res = Response) => {
  const { body, user } = req;

  const { errors, ok } = validateChecks(req);
  const errorsObject = arrayErrorsToObject(errors);

  if (!ok) {
    // Consult categories table
    const [categories] = await Promise.all([Category.findAll()]);

    return res.status(401).render("properties/form-property", {
      page: "Publicar propiedad",
      categories,
      errors: errorsObject,
      csrfToken: req.csrfToken(),
      post: body,
    });
  }

  const { id: userId } = user;
  const { category: categoryId, ...dataProperty } = body;

  try {
    const property = await Property.create({
      image: "",
      ...dataProperty,
      categoryId,
      userId,
    });

    res.redirect(`/properties/add-images/${property.id}`);
  } catch (error) {
    console.log(error);
  }
};

export const formPropertyImage = async (req = Request, res = Response) => {
  const { id } = req.params;

  const property = await Property.findByPk(id);

  if (!property || property.published) return res.redirect("/my-properties");

  // Destructure for obtain the ids needed and validate
  const { id: userId } = req.user;
  const { userId: propertyUserId } = property;

  if (userId.toString() !== propertyUserId.toString())
    return res.redirect("/my-properties");

  res.render("properties/form-property-image", {
    page: "Agregar imagen",
    paragraph: "Estás a un paso de publicar tu propiedad",
    csrfToken: req.csrfToken(),
    property,
  });
};
export const saveImagesProperty = async (
  req = Request,
  res = Response,
  next
) => {
  const { id } = req.params;

  const property = await Property.findByPk(id);

  if (!property || property.published) return res.redirect("/my-properties");

  // Destructure for obtain the ids needed and validate
  const { id: userId } = req.user;
  const { userId: propertyUserId } = property;

  if (userId.toString() !== propertyUserId.toString())
    return res.redirect("/my-properties");

  try {
    const { file } = req;
    const { filename } = file;

    await property.update({ published: 1, image: filename });

    // @Alternative
    // property.published = 1;
    // property.image = filename;
    // await property.save()

    next();
  } catch (error) {
    console.log(error);
  }
};

export const formPropertyEdit = async (req = Request, res = Response) => {
  const { id } = req.params;

  const property = await Property.findByPk(id);

  if (!property) return res.redirect("/my-properties");

  // Verify if user is owner of property to edit
  if (property.userId.toString() !== req.user.id.toString())
    return res.redirect("/my-properties");

  const [categories] = await Promise.all([Category.findAll()]);

  return res.render("properties/form-property-edit", {
    page: "Editar propiedad",
    categories,
    csrfToken: req.csrfToken(),
    post: property,
  });
};
export const savePropertyChange = async (req = Request, res = Response) => {
  const { body, user, params } = req;

  const { errors, ok } = validateChecks(req);
  const errorsObject = arrayErrorsToObject(errors);

  if (!ok) {
    // Consult categories table
    const [categories] = await Promise.all([Category.findAll()]);

    return res.status(401).render("properties/form-property-edit", {
      page: "Editar propiedad",
      categories,
      errors: errorsObject,
      csrfToken: req.csrfToken(),
      post: body,
    });
  }

  const property = await Property.findByPk(params.id);

  if (!property) return res.redirect("/my-properties");

  // Verify if user is owner of property to edit
  if (property.userId.toString() !== user.id.toString())
    return res.redirect("/my-properties");

  try {
    const { category: categoryId, ...dataProperty } = body;

    property.set({ ...dataProperty, categoryId });
    await property.save();

    res.redirect("/my-properties");
  } catch (error) {
    console.log(error);
  }
};

export const deleteProperty = async (req = Request, res = Response) => {
  const { id } = req.params;

  const property = await Property.findByPk(id);

  if (!property) return res.redirect("/my-properties");

  // Verify if user is owner of property to edit
  if (property.userId.toString() !== req.user.id.toString())
    return res.redirect("/my-properties");

  await Promise.all([
    unlink(`public/uploads/${property.image}`),
    property.destroy(),
  ]).then(() => res.redirect("/my-properties"));
};
export const changePropertyStatus = async (req = Request, res = Response) => {
  const { id } = req.params;

  const property = await Property.findByPk(id);

  if (!property) return res.redirect("/my-properties");

  // Verify if user is owner of property to edit
  if (property.userId.toString() !== req.user.id.toString())
    return res.redirect("/my-properties");

  try {
    await property.update({ published: !Boolean(property.published) });

    const prevStatus = property.published ? "Publicado" : "No publicado";

    res.json({
      success: true,
      msg: "El estado de publicación de la propiedad ha sido cambiado exitosamente",
      prevStatus,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: "Ocurrio un error al intentar cambiar el estado de publicación",
      log: error,
    });
  }
};

export const showProperty = async (req = Request, res = Response) => {
  const { id } = req.params;

  const property = await Property.findByPk(id, {
    include: [{ model: Category, as: "category" }],
  });

  if (!property) return res.redirect("/404");

  const owner = identifyOwner(req.user?.id, property.userId);

  // Prevent other users who are not the owner from seeing the property.
  if (!property.published && !owner) return res.redirect("/404");

  res.render("properties/property", {
    page: property.title,
    csrfToken: req.csrfToken(),
    property,
    auth: req.user,
    owner,
  });
};

export const sendMessage = async (req = Request, res = Response) => {
  const { params, body, user } = req;

  const property = await Property.findByPk(params.id, {
    include: [{ model: Category, as: "category" }],
  });

  if (!property) return res.redirect("/404");

  const owner = identifyOwner(req.user?.id, property.userId);

  const { errors, ok } = validateChecks(req);
  const errorsObject = arrayErrorsToObject(errors);

  if (!ok) {
    return res.status(401).render("properties/property", {
      page: property.title,
      errors: errorsObject,
      csrfToken: req.csrfToken(),
      property,
      auth: req.user,
      owner,
    });
  }

  const { id: propertyId } = params;
  const { message } = body;
  const { id: userId } = user;

  await Message.create({
    message,
    propertyId,
    userId,
  });

  res.redirect(`/properties/${property.id}`);
};

export const readMessages = async (req = Request, res = Response) => {
  const { id } = req.params;

  const property = await Property.findByPk(id, {
    include: {
      model: Message,
      as: "messages",
      include: { model: User.scope("notSensitivity"), as: "user" },
    },
  });

  if (!property) return res.redirect("/my-properties");

  // Destructure for obtain the ids needed and validate
  const { id: userId } = req.user;
  const { userId: propertyUserId } = property;

  if (userId.toString() !== propertyUserId.toString())
    return res.redirect("/my-properties");

  res.render("properties/property-messages", {
    page: "Mensajes",
    messages: property.messages,
    parseDate,
  });
};
