import { Link } from "react-router-dom";
import VideoProgress from "./VideoProgress";

export default function VideoCard({ file, view, reloadViews }) {
  const onReset = async () => {
    await fetch("/api/tracker", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: file.path }),
    });
    reloadViews();
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3 text-break">{file.name}</h5>
          {view ? (
            <>
              <VideoProgress view={view} />
              <div className="btn-group d-flex">
                <Link
                  to={`/videos${file.path}`}
                  className="btn btn-sm btn-primary w-100"
                >
                  Resume
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={onReset}
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <Link
              to={`/videos${file.path}`}
              className="btn btn-sm btn-primary d-block"
            >
              Watch
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
