import { createContext } from "react";

const NotificationContext = createContext({
  notifications: [],
  setNotifications: () => {},
});

export default NotificationContext;
