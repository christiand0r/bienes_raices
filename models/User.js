import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { generateID } from "../helpers/tokens.js";
import db from "../config/db.js";

const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.UUID,
      defaultValue: () => generateID(),
    },
    confirm: DataTypes.BOOLEAN,
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
    scopes: {
      notSensitivity: {
        attributes: {
          exclude: ["confirm", "createdAt", "password", "token", "updatedAt"],
        },
      },
    },
  }
);

User.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
