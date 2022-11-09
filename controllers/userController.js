import { body } from "express-validator";
import User from "../models/User.js";
import { validateChecks } from "../middlewares/validateChecks.js";
import {
  sendConfirmationToEmail,
  sendResetPasswordToEmail,
} from "../helpers/emails.js";
import { generateID, generateJWT } from "../helpers/tokens.js";
import { arrayErrorsToObject, hashPassword } from "../helpers/transforms.js";

// @Render views
export const formLogin = (req = Request, res = Response) => {
  res.render("auth/login", {
    page: "Iniciar Sesión",
    csrfToken: req.csrfToken(),
  });
};

export const formRegister = (req = Request, res = Response) => {
  res.render("auth/register", {
    page: "Crear cuenta",
    csrfToken: req.csrfToken(),
  });
};

export const formResetPassword = (req = Request, res = Response) => {
  res.render("auth/forgot-password", {
    page: "Recupera tu acceso",
    csrfToken: req.csrfToken(),
  });
};

export const formNewPassword = async (req = Request, res = Response) => {
  const { token } = req.params;

  const user = await User.findOne({ where: { token } });

  if (!user) {
    return res.render("auth/confirmation", {
      page: "Código de restablecimiento inválido",
      title: "El código ya no es válido o no existe",
      text: "No hemos podido validar tu información, verifica e intentalo de nuevo",
      success: false,
    });
  }

  res.render("auth/reset-password", {
    page: "Restablece tu contraseña",
    csrfToken: req.csrfToken(),
  });
};

// @Actions
export const loginUser = async (req = Request, res = Response) => {
  const { email, password } = req.body;

  // Validations
  await Promise.all([
    body("email", "El correo no es válido").isEmail().run(req),
    body("password", "La contraseña es requerida").notEmpty().run(req),
  ]);

  const { errors, ok } = validateChecks(req);
  const errorsObject = arrayErrorsToObject(errors);

  if (!ok)
    return res.status(401).render("auth/login", {
      page: "Iniciar Sesión",
      user: { email },
      csrfToken: req.csrfToken(),
      errors: errorsObject,
    });

  // Verify is user exist
  const user = await User.findOne({ where: { email } });

  if (!user || !user.confirm) {
    const msg = !user
      ? "El correo ingresado no está registrado"
      : "Tu cuenta aún no ha sido confirmada";

    return res.status(401).render("auth/login", {
      page: "Iniciar Sesión",
      user: { email },
      csrfToken: req.csrfToken(),
      errors: {
        email: {
          msg,
          name: "email",
        },
      },
    });
  }

  if (!user.verifyPassword(password))
    return res.status(401).render("auth/login", {
      page: "Iniciar Sesión",
      user: { email },
      csrfToken: req.csrfToken(),
      errors: {
        password: {
          name: "password",
          msg: "La contraseña es incorrecta",
        },
      },
    });

  // Generate token and then store in cookies
  const jwtToken = generateJWT({ id: user.id, name: user.name });

  res.cookie("_token", jwtToken, {
    httpOnly: true,
    //secure: true
  });

  res.redirect("/my-properties");
};

export const logoutUser = async (req = Request, res = Response) => {
  res.clearCookie("_token");
  return res.status(200).redirect("/auth/login");
};

export const registerUser = async (req = Request, res = Response) => {
  const { name, email, password } = req.body;

  // Validations
  await Promise.all([
    body("name", "El campo nombre no puede ir vacío").notEmpty().run(req),
    body("email", "El correo no es válido").isEmail().run(req),
    body("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener mínimo 8 caracteres")
      .matches(/(?=\w*\d)(?=\w*[A-Z])\S/)
      .withMessage(
        "La contraseña debe tener al menos una mayúscula y un número"
      )
      .run(req),
    body("confirmPassword", "La contraseña no coincide")
      .equals(password)
      .run(req),
  ]);

  const { errors, ok } = validateChecks(req);
  const errorsObject = arrayErrorsToObject(errors);

  if (!ok)
    return res.status(401).render("auth/register", {
      page: "Crear cuenta",
      user: { name, email },
      csrfToken: req.csrfToken(),
      errors: errorsObject,
    });

  // Verify if user exist
  const user = await User.findOne({ where: { email } });

  if (user)
    return res.status(401).render("auth/register", {
      page: "Crear cuenta",
      user: { name, email },
      csrfToken: req.csrfToken(),
      errors: {
        email: {
          name: "email",
          msg: "Este correo ya está registrado",
        },
      },
    });

  try {
    // Save User and send confirmation account email
    await User.create({ name, email, password, confirm: false }).then((user) =>
      sendConfirmationToEmail(user.dataValues)
    );

    res.status(201).render("templates/email-sent", {
      page: "Registro Existoso",
      title: `Gracias por registrarte, <span class="font-medium">${name}</span> `,
      content: `Hemos enviado un correo a <span class="font-medium">${email}</span>, ahí encontraras un enlace para confirmar tu cuenta
      `,
    });
  } catch (error) {}
};

export const activeAccount = async (req = Request, res = Response) => {
  const { token } = req.params;

  const user = await User.findOne({ where: { token } });

  if (!user) {
    return res.render("auth/confirmation", {
      page: "Código Inválido",
      title: "El código ya no es válido o no existe",
      text: "No hemos podido confirmar tu cuenta, verifica e intentalo de nuevo",
      success: false,
    });
  }

  // It is not necessary to use were because it is pointing to an existing user
  await user.update({ confirm: true, token: null });

  res.render("auth/confirmation", {
    page: "¡Confirmación exitosa!",
    title: "Tu cuenta ha sido confirmada",
    text: `Ahora tienes total acceso a la plataforma, gracias por confiar en nosotros <span class="font-medium"> ${user.name}</span>.`,
    success: true,
  });
};

export const resetPassword = async (req = Request, res = Response) => {
  const { email } = req.body;

  // Validate data in the body
  await body("email", "El correo no es válido").isEmail().run(req);

  const { errors, ok } = validateChecks(req);
  const errorsObject = arrayErrorsToObject(errors);

  if (!ok)
    return res.status(401).render("auth/forgot-password", {
      page: "Recupera tu acceso",
      csrfToken: req.csrfToken(),
      errors: errorsObject,
    });

  const user = await User.findOne({ where: { email } });

  if (!user)
    return res.status(401).render("auth/forgot-password", {
      page: "Recupera tu acceso",
      csrfToken: req.csrfToken(),
      errors: {
        email: {
          name: "email",
          msg: "El correo ingresado no está registrado",
        },
      },
    });

  const token = generateID();

  // Update token and then send email for reset password
  await user
    .update({ token })
    .then((user) => sendResetPasswordToEmail(user.dataValues));

  res.render("templates/email-sent", {
    page: "Restablecer contraseña",
    title: `Recupera tu acceso, <span class="font-medium">${user.name}</span> `,
    content: `Hemos enviado un correo a <span class="font-medium">${email}</span>, ahí encontraras las instrucciones para restablecer la contraseña de tu cuenta
      `,
  });
};

export const createNewPassword = async (req = Request, res = Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  // Validate new password
  await body("newPassword")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 8 caracteres")
    .matches(/(?=\w*\d)(?=\w*[A-Z])\S/)
    .withMessage("La contraseña debe tener al menos una mayúscula y un número")
    .run(req);

  const { errors, ok } = validateChecks(req);
  const errorsObject = arrayErrorsToObject(errors);

  if (!ok)
    return res.status(401).render("auth/reset-password", {
      page: "Restablece tu contraseña",
      csrfToken: req.csrfToken(),
      errors: errorsObject,
    });

  const user = await User.findOne({ where: { token } });
  const hashedPassword = await hashPassword(newPassword);

  await user.update({ password: hashedPassword, token: null });

  res.render("auth/confirmation", {
    page: "¡Cambio exitoso!",
    title: "Tu contraseña ha sido cambiada",
    text: `Ahora ya puedes usar tu nueva contraseña para acceder a la plataforma.`,
    success: true,
  });
};
