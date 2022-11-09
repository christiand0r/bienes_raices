import { Op } from "sequelize";
import { Category, Property } from "../models/index.js";

export const home = async (req = Request, res = Response) => {
  const { user } = req;
  const [categories, houses, apartments] = await Promise.all([
    Category.findAll({ raw: true }),
    Property.findAll({
      where: { categoryId: 1 },
      include: { model: Category, as: "category" },
      limit: 4,
      order: [["createdAt", "DESC"]],
    }),
    Property.findAll({
      where: { categoryId: 2 },
      include: { model: Category, as: "category" },
      limit: 4,
      order: [["createdAt", "DESC"]],
    }),
  ]);

  res.render("home", {
    page: "Inicio",
    csrfToken: req.csrfToken(),
    apartments,
    categories,
    houses,
    user,
  });
};

export const categories = async (req = Request, res = Response) => {
  const { user, params } = req;
  const { id } = params;

  const category = await Category.findByPk(id);

  if (!category) return res.redirect("/404");

  const properties = await Property.findAll({
    where: { categoryId: id },
  });

  res.render("category", {
    page: `${category.name}s en venta`,
    csrfToken: req.csrfToken(),
    properties,
    user,
  });
};

export const notFound = async (req = Request, res = Response) => {
  const { user } = req;

  return res.render("404", {
    page: "Página no encontrada",
    csrfToken: req.csrfToken(),
    user,
  });
};

export const searcher = async (req = Request, res = Response) => {
  const { user, body } = req;
  const { term } = body;

  if (!term.trim()) return res.redirect("back");

  const properties = await Property.findAll({
    where: {
      title: {
        [Op.like]: `%${term}%`,
      },
    },
  });

  return res.render("search", {
    page: "Resultados de la búsqueda",
    csrfToken: req.csrfToken(),
    properties,
    term,
    user,
  });
};
