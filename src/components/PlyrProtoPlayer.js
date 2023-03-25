import { useEffect } from "react";
import "plyr-react/dist/plyr.css";
import Plyr from "plyr";

export default function VideoPlayer({ video, views }) {
  const viewFetcher = (method, data) => {
    fetch("/api/tracker", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    const player = new Plyr("#player", {
      captions: { active: true },
      storage: { enabled: true, key: "plyr" },
    });

    let seekTime = () => {
      let view = views.find((v) => v.file === video.path);
      if (view) player.currentTime = view.time;

      player.play();
      player.toggleCaptions(false);
      player.off("canplay", seekTime);
    };

    let updateTime = () => {
      let played = player.currentTime / player.duration;

      if (player.duration - player.currentTime < 300) {
        viewFetcher("DELETE", {
          file: video.path,
        });
      } else {
        viewFetcher("POST", {
          file: video.path,
          time: player.currentTime,
          played: played,
        });
      }
    };

    player.on("canplay", seekTime);

    let updateInterval = window.setInterval(updateTime, 2500);

    return () => {
      player.off("canplay", seekTime);
      window.clearInterval(updateInterval);
    };
  }, []);

  return (
    <div className="col-xl-10 mx-auto pt-2">
      <video id="player" playsInline controls>
        <source src={`/api/videos/video/${video.hash}`} type="video/mp4" />

        {video.tracks?.map((track, i) => (
          <track
            kind="captions"
            label={track.name}
            src={`/api/videos/track/${track.hash}`}
            srcLang={track.lang}
            default={i === 0}
          />
        ))}
      </video>

      <p className="mt-2 mb-0 fs-4 rounded-2 py-1 px-2 bg-white text-break">
        {video.name}
      </p>

      <button
        className="btn btn-sm btn-dark my-2"
        onClick={() => {
          console.log("lol");
        }}
      >
        select subtitle
      </button>
    </div>
  );
}
