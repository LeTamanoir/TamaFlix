import { useEffect, useState } from "react";
import useStore from "./useStore";

export default function useVideos() {
  const [currentVideos, setCurrentVideos] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoPath, setVideoPath] = useState([]);
  const [isSet, videos, setVideos] = useStore("videos", []);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    const data = await res.json();

    setVideos(data.videos);
  };

  useEffect(() => {
    if (currentVideos === null) {
      setCurrentVideos(videos);
      reloadCurrentVideos(videoPath);
    }

    if (videoPath.join("") === "") {
      setCurrentVideos(videos);
    }
  }, [videos]);

  useEffect(() => {
    if (isSet !== null && !isSet) fetchVideos();
  }, [isSet]);

  const reloadCurrentVideos = (path) => {
    let _path = "";
    let pathStr = `/${path.join("/")}`;

    setVideoPath(path);
    setCurrentVideo(null);
    setCurrentVideos(null);

    if (path.join("") === "") {
      setCurrentVideos(videos);
      return;
    }

    let video = {};
    let videosCopy = [...videos];

    for (let p = 0; p < path.length; p++) {
      _path = `${_path}/${path[p]}`;

      for (let i = 0; i < videosCopy.length; i++) {
        video = videosCopy[i];

        if (video.path === pathStr) {
          if (video.type === "video") {
            setCurrentVideo(video);
            return;
          }
          if (video.type === "folder") {
            setCurrentVideos(video.children);
            return;
          }
        }

        if (video.path === _path) {
          if (video.type === "folder") {
            videosCopy = video.children;
            break;
          }
        }
      }
    }
  };

  return [currentVideos, currentVideo, reloadCurrentVideos, fetchVideos];
}
