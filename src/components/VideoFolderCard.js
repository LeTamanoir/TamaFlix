import { Link } from "react-router-dom";

export default function VideoFolderCard({ file }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3 text-break">{file.name}</h5>
          <Link
            to={`/videos${file.path}`}
            className="btn btn-sm btn-dark d-block"
          >
            Browse
          </Link>
        </div>
      </div>
    </div>
  );
}
