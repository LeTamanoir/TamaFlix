import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import BreadCrumb from "../components/BreadCrumb";
import VideoPlayer from "../components/VideoPlayer";
import VideoFolderCard from "../components/VideoFolderCard";
import VideoCard from "../components/VideoCard";
import useViews from "../hooks/useViews";
import useVideos from "../hooks/useVideos";
import useFilter from "../hooks/useFilter";
import { BsArrowClockwise } from "react-icons/bs";
import NotificationContext from "../context/notifications";

export default function Videos() {
  const [views, reloadViews] = useViews();
  const [videos, video, reloadVideos, reloadVideoCache] = useVideos();
  const [filteredVideos, filterInput] = useFilter(videos);
  const { addNotification } = useContext(NotificationContext);

  const params = useParams();
  const [path, setPath] = useState([]);

  useEffect(() => {
    let _path = params["*"].split("/");

    setPath(_path);
    reloadViews();
    reloadVideos(_path);
  }, [params["*"]]);

  const onRefresh = async () => {
    const res = await fetch("/api/videos/index");
    if (res.ok) {
      localStorage.getItem("views") && localStorage.removeItem("views");
      localStorage.getItem("videos") && localStorage.removeItem("videos");

      reloadViews();
      reloadVideos(path);
      reloadVideoCache();

      addNotification({
        title: "Videos",
        color: "#198754",
        content: "Videos and Cache updated successfully",
      });
    }
  };

  return (
    <Layout>
      <div className="container">
        <BreadCrumb path={path} />

        {videos?.length > 0 && (
          <div className="row mb-4 justify-content-center">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex">
              <a
                type="button"
                className="text-dark d-flex align-items-center justify-content-center me-3"
                onClick={onRefresh}
              >
                <BsArrowClockwise size={28} />
              </a>

              <input
                type="search"
                placeholder="Filter ..."
                className="form-control border-2"
                onChange={(e) => filterInput(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="row g-4">
          {filteredVideos &&
            filteredVideos.map((file, i) =>
              file.type === "folder" ? (
                <VideoFolderCard file={file} key={i} />
              ) : (
                <VideoCard
                  view={views.find((v) => v.file === file.path)}
                  file={file}
                  reloadViews={reloadViews}
                  key={i}
                />
              )
            )}

          {video && <VideoPlayer video={video} views={views} />}
        </div>

        {videos && filteredVideos?.length === 0 && videos.length > 0 && (
          <div className="mt-4 text-center">
            <div className="d-inline-block alert alert-dark m-0 py-2">
              No results
            </div>
          </div>
        )}

        {!video && videos?.length === 0 && (
          <div className="col py-4 text-center">
            <div className="alert alert-dark d-inline-block m-0 py-2">
              No videos here
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
