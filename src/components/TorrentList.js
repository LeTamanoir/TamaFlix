import { useEffect, useRef, useState } from "react";
import TorrentCard from "./TorrentCard";
import useFilter from "../hooks/useFilter";

export default function TorrentList() {
  const [loading, setLoading] = useState(true);
  const [torrents, setTorrents] = useState([]);
  const [filteredTorrents, filterInput] = useFilter(torrents);

  const fetchTorrents = async () => {
    const res = await fetch("/api/torrent");
    const data = await res.json();

    if (data.ok) {
      setLoading(false);
      setTorrents(data.torrents);
    }
  };

  const manageTorrent = (torrent) => {
    fetch("/api/torrent/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        state: torrent.state === "paused" ? "play" : "pause",
        id: torrent.id,
      }),
    });
  };

  const deleteTorrent = (hash) => {
    if (window.confirm("Are you sure ? ")) {
      fetch("/api/torrent", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash }),
      });
    }
  };

  const TabbedTorrents = ({ paused }) => {
    let active = filteredTorrents.filter((to) =>
      paused ? to.state === "paused" : to.state !== "paused"
    );

    if (active.length > 0) {
      return active.map((torrent, i) => (
        <TorrentCard
          torrent={torrent}
          onDelete={deleteTorrent}
          manageTorrent={manageTorrent}
          key={i}
        />
      ));
    }

    if (!loading) {
      return (
        <div className="mt-4 text-center">
          <div className="d-inline-block alert alert-dark m-0 py-2">
            No {paused ? "Paused" : "Active"} torrents
          </div>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    let interval = window.setInterval(fetchTorrents, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="container bg-white p-3 rounded-3 mt-4">
      <div className="row mb-4 mt-1 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4 col-xl-3">
          <input
            type="search"
            placeholder="Filter ..."
            className="form-control border-2"
            onChange={(e) => filterInput(e.target.value)}
          />

          <ul className="nav nav-pills d-flex justify-content-center mt-3">
            <li className="nav-item mx-1">
              <button
                className="nav-link active px-2 py-1"
                data-bs-toggle="pill"
                data-bs-target="#torrent-active"
              >
                Active
              </button>
            </li>
            <li className="nav-item mx-1">
              <button
                className="nav-link px-2 py-1"
                data-bs-toggle="pill"
                data-bs-target="#torrent-paused"
              >
                Paused
              </button>
            </li>
          </ul>
        </div>
      </div>

      {filteredTorrents && (
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="torrent-active"
            role="tabpanel"
          >
            <div className="row g-4">
              <TabbedTorrents paused={false} />
            </div>
          </div>
          <div className="tab-pane fade" id="torrent-paused" role="tabpanel">
            <div className="row g-4">
              <TabbedTorrents paused={true} />
            </div>
          </div>
        </div>
      )}

      {filteredTorrents?.length === 0 && torrents.length > 0 && (
        <div className="mt-4 text-center">
          <div className="d-inline-block alert alert-dark m-0 py-2">
            No results
          </div>
        </div>
      )}

      {(loading || torrents.length === 0) && (
        <div className="mt-4 d-flex py-3">
          <div className="mx-auto">
            {loading && (
              <div className="spinner-border text-primary">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {torrents.length === 0 && !loading && (
              <p className="m-0">No torrents yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
