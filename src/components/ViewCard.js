import { Link } from "react-router-dom";

export default function ViewCard({ view, onDelete }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{view.file.split("/").pop()}</h5>
          <p className="card-text text-muted">
            {view.file.split("/").slice(1, -1).join("/")}
          </p>

          <div className="progress mb-3" style={{ height: "0.6rem" }}>
            <div
              className="progress-bar progress-bar-striped bg-danger"
              style={{
                width: `calc(${view.played} * 100%)`,
              }}
            ></div>
          </div>

          <div className="btn-group d-flex">
            <Link
              to={`/videos${view.file}`}
              className="btn btn-sm btn-primary w-100"
            >
              Resume
            </Link>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(view.file)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
