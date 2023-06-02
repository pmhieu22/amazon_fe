import { notification } from "antd";

export const showNotification = (type, message, description, duration) => {
  notification[type]({
    message: message,
    description: description,
    duration: duration ? duration : 2.5,
  });
};
