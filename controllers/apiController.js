import { Op } from "sequelize";
import { Property, Category } from "../models/index.js";

export const registeredProperties = async (req = Request, res = Response) => {
  const { query } = req;

  let where = {};
  const regexPrice = /^[0-9]*$/;

  regexPrice.test(query.price) ? parseInt(query.price) : delete query.price;

  const { category, price } = query;

  // TODO: Refactor improve
  if (price && !category) {
    where = { price: price };
  }

  if (!price && category) {
    where = { categoryId: category };
  }

  if (price && category) where = { categoryId: category, price };

  console.log("VALOR", { where });

  const properties = await Property.findAll({
    where,
    include: [{ model: Category, as: "category" }],
  });

  res.json({
    ok: true,
    properties,
  });
};
