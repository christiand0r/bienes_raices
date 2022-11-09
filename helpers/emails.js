import dotenv from "dotenv";
import nodemailer from "nodemailer";
import pug from "pug";

dotenv.config();

const generate = {
  transporter() {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    return transporter;
  },

  url() {
    const { SERVER_URL, SERVER_PORT } = process.env;

    const url = `${SERVER_URL}:${SERVER_PORT || 5000}`;

    return url;
  },
};

export const sendConfirmationToEmail = async (data) => {
  const { email, name, token } = data;

  const url = generate.url();
  const transporter = generate.transporter();

  const html = pug.renderFile("./templates/emails/confirm-account.pug", {
    name,
    link: `${url}/auth/confirm/${token}`,
  });

  await transporter.sendMail({
    from: '"BienesRaíces 🏠" <support@bienesraices.com>',
    to: email,
    subject: "Confirma tu cuenta en BienesRaíces",
    html,
  });
};

export const sendResetPasswordToEmail = async (data) => {
  const { email, name, token } = data;

  const url = generate.url();
  const transporter = generate.transporter();

  const html = pug.renderFile("./templates/emails/reset-password.pug", {
    name,
    link: `${url}/auth/forgot-password/${token}`,
  });

  await transporter.sendMail({
    from: '"BienesRaíces 🏠" <support@bienesraices.com>',
    to: email,
    subject: "Restablece tu contraseña para acceder a BienesRaices",
    html,
  });
};
