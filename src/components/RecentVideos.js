import { useContext } from "react";
import useViews from "../hooks/useViews";
import ViewCard from "../components/ViewCard";
import { BsArrowClockwise } from "react-icons/bs";
import NotificationContext from "../context/notifications";

export default function RecentVideos() {
  const [views, reloadViews] = useViews();
  const { addNotification } = useContext(NotificationContext);

  const deleteView = async (file) => {
    const res = await fetch("/api/tracker", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file }),
    });
    if (res.ok) reloadViews();
  };

  const onRefresh = () => {
    localStorage.getItem("views") && localStorage.removeItem("views");
    reloadViews();

    addNotification({
      title: "Recent Videos",
      color: "green",
      content: "Recent Videos updated successfully",
    });
  };

  return (
    <div className="container">
      <div className="row g-4">
        <div className="d-flex">
          <a
            type="button"
            className="text-dark d-flex align-items-center justify-content-center me-3"
            onClick={onRefresh}
          >
            <BsArrowClockwise size={28} />
          </a>
          <p className="mb-0">Resume watching ...</p>
        </div>

        {views.length > 0 ? (
          views.map((view, i) => (
            <ViewCard view={view} key={i} onDelete={deleteView} />
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="alert alert-dark d-inline-block">
              Nothing to resume watching ...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
