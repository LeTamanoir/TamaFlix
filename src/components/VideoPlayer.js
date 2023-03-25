import ReactPlayer from "react-player";

export default function VideoPlayer({ video, views }) {
  let seekTime = (player, path) => {
    let view = views.find((v) => v.file === path);
    if (view) player.seekTo(view.time, "seconds");

    seekTime = false; // self-destruct to prevent loop
  };

  const viewFetcher = (method, data) => {
    fetch("/api/tracker", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="col-xl-10 mx-auto pt-2">
      <ReactPlayer
        controls
        onReady={(player) => seekTime && seekTime(player, video.path)}
        progressInterval={3000}
        onProgress={({ playedSeconds, played }) => {
          if (played > 0.9) {
            viewFetcher("DELETE", {
              file: video.path,
            });
          } else {
            viewFetcher("POST", {
              file: video.path,
              time: playedSeconds,
              played: played,
            });
          }
        }}
        url={[
          {
            src: `/api/videos/video/${video.hash}`,
            type: "video/mp4",
          },
        ]}
        width="100%"
        height="100%"
        style={{ backgroundColor: "#000000" }}
      />
      <p className="mt-2 mb-0 fs-4 rounded-2 py-1 px-2 bg-white text-break">
        {video.name}
      </p>
    </div>
  );
}
