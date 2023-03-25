import humanFileSize from "../utils/humanFileSize";

export default function TorrentCard({ torrent, onDelete, manageTorrent }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{torrent.name}</h5>
          <h6 className="card-subtitle mb-3 text-muted"></h6>

          <div className="my-2 progress">
            <div
              className={`progress-bar ${
                torrent.isCompleted ? "bg-success" : ""
              }`}
              role="progressbar"
              style={{ width: `${torrent.progress * 100}%` }}
            >
              {!torrent.isCompleted
                ? parseInt(
                    (torrent.totalDownloaded / torrent.totalSize) * 100
                  ) + "%"
                : "Finished"}
            </div>
          </div>

          {torrent.state !== "paused" && (
            <div className="card-text mb-2">
              <p className="mb-1 text-success">{torrent.totalSeeds} seeders</p>

              <p className="mb-1 text-primary">
                Down speed :{" "}
                {torrent.downloadSpeed != 0
                  ? humanFileSize(torrent.downloadSpeed)
                  : "0 kB/s"}
              </p>

              <p className="mb-1 text-dark">
                Up speed :{" "}
                {torrent.uploadSpeed != 0
                  ? humanFileSize(torrent.uploadSpeed)
                  : "0 kB/s"}
              </p>
            </div>
          )}

          <small className="text-muted">
            Added on :{" " + new Date(torrent.dateAdded).toLocaleString("Fr")}
          </small>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-sm mt-2 btn-danger"
              onClick={() => onDelete(torrent.id)}
            >
              Remove
            </button>
            <button
              className={`btn btn-sm mt-2 ${
                torrent.state === "paused" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={(e) => {
                e.target.innerText = "Loading";
                manageTorrent(torrent);
              }}
            >
              {torrent.state === "paused" ? "start" : "pause"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
