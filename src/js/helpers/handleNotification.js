import notie from "notie";

const handleNotification = (element = "", callback = Function) =>
  callback(document.querySelector(element), notie);

export default handleNotification;
