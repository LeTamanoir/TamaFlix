import { useState } from "react";

export default function UploadMagnet() {
  const [magnet, setMagnet] = useState("");
  const [status, setStatus] = useState({});
  const [name, setName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/torrent/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ magnet, name }),
    });
    const data = await res.json();
    setStatus(data);

    if (data.ok) {
      setName("");
      setMagnet("");
    }

    setTimeout(() => setStatus({}), 2000);
  };

  const handleName = (name) => {
    if (/[^a-zA-Z0-9\_\-\.]|\s/g.test(name)) {
      setStatus({
        ok: false,
        message: "Name must match this pattern [a-zA-Z0-9_-.]",
      });
    } else {
      setStatus({});
    }
    setName(name);
  };

  return (
    <div className="container bg-white p-3 rounded-3">
      <form onSubmit={onSubmit}>
        <label className="form-label">Upload torrent</label>

        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            value={name}
            placeholder="Torrent name ..."
            onChange={(e) => handleName(e.target.value)}
          />
          <textarea
            cols="30"
            className="form-control"
            value={magnet}
            onChange={(e) => setMagnet(e.target.value)}
            placeholder="Paste torrent Torrent Magnet here ..."
          ></textarea>

          <div className="collapse" id="helpCollapse">
            <p className="mt-2 mb-0">Torrent websites :</p>
            <ul>
              <li>
                <a
                  href="https://www.proxyrarbg.org/torrents.php?category=44&search=&order=seeders&by=DESC"
                  target="_blank"
                >
                  rarbg
                </a>
              </li>
              <li>
                <a href="https://www.1337xxx.to/popular-movies" target="_blank">
                  1337.to
                </a>
              </li>
              <li>
                <a href="https://nyaa.si" target="_blank">
                  nyaa.si
                </a>
              </li>
            </ul>

            <p className="mb-2 text-danger">
              Be sure to look for torrents with "h264" or "mp4" in their title,
              otherwise it's likely their content won't be playable. <br />
              In other words the movies must end with ".mp4".
            </p>
          </div>
        </div>

        {status.message && (
          <div
            className={`alert ${status.ok ? "alert-success" : "alert-danger"}`}
          >
            {status.message}
          </div>
        )}

        <div className="d-flex">
          <button type="submit" className="btn btn-sm btn-primary">
            Submit
          </button>
          <a
            className="btn btn-secondary ms-2 btn-sm"
            data-bs-toggle="collapse"
            href="#helpCollapse"
            role="button"
          >
            Help
          </a>
        </div>
      </form>
    </div>
  );
}
