import bcrypt from "bcrypt";

const users = [
  {
    confirm: 1,
    email: "christian@test.com",
    name: "Christian",
    password: bcrypt.hashSync("password123", 10),
    token: null,
  },
];

export default users;
