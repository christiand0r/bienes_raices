import bcrypt from "bcrypt";

export const arrayErrorsToObject = (errors = Array()) => {
  const errorsObject = Object();

  errors.forEach(
    ({ param: name, msg }) => (errorsObject[name] = { name, msg })
  );

  return errorsObject;
};

export const hashPassword = async (password) =>
  await bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt));

export const parseDate = (date) =>
  new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
