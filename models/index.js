import User from "./User.js";
import Property from "./Property.js";
import Category from "./Category.js";
import Message from "./Message.js";

// @Relations
Property.belongsTo(User);
Property.belongsTo(Category);
Property.hasMany(Message);

Message.belongsTo(Property);
Message.belongsTo(User);

export { User, Property, Category, Message };
