import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NotificationContext from "../context/notifications";
import Notifications from "./Notifications";

export default function NotificationWrapper() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notif) => {
    let id = notifications?.length + 1 || 0;
    let date = new Date().getTime();

    setNotifications((notifications) => [
      ...notifications,
      { ...notif, date, id },
    ]);

    window.setTimeout(() => deleteNotification(id), 3000);
  };

  const deleteNotification = (id) => {
    setNotifications((notifications) =>
      notifications.filter((e) => e.id !== id)
    );
  };

  return (
    <>
      <NotificationContext.Provider
        value={{ notifications, setNotifications, addNotification }}
      >
        <Outlet />
      </NotificationContext.Provider>

      <Notifications
        notifications={notifications}
        deleteNotification={deleteNotification}
      />
    </>
  );
}
