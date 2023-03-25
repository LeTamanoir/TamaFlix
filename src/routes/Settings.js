import { useContext } from "react";
import Guide from "../components/Guide";
import Layout from "../components/Layout";
import Users from "../components/Users";
import SessionContext from "../context/session";
import NotificationContext from "../context/notifications";

export default function Settings() {
  const { session } = useContext(SessionContext);
  const { addNotification } = useContext(NotificationContext);

  const updateVideos = async () => {
    const res = await fetch("/api/videos/index");
    if (res.ok) {
      addNotification({
        title: "Videos",
        color: "#198754",
        content: "Videos updated",
      });
    }

    clearCache();
  };

  const clearCache = () => {
    localStorage.getItem("views") && localStorage.removeItem("views");
    localStorage.getItem("videos") && localStorage.removeItem("videos");

    addNotification({
      title: "Cache",
      color: "#198754",
      content: "Cache cleared",
    });
  };

  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-wrap bg-white p-3 rounded-3">
          <button
            className="btn btn-sm btn-dark m-1 me-3"
            onClick={updateVideos}
          >
            Update videos
          </button>

          <button className="btn btn-sm btn-secondary m-1" onClick={clearCache}>
            clear cache
          </button>
        </div>

        {session.user.role === "admin" && <Users />}

        <Guide />
      </div>
    </Layout>
  );
}
