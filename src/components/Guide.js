export default function Guide() {
  return (
    <div className="bg-white p-3 rounded-3 mt-4">
      <h2 className="fs-3 text-danger mb-2">Guide</h2>

      <button
        className="btn btn-sm btn-secondary mb-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseGuide"
      >
        show
      </button>

      <div className="collapse pt-2" id="collapseGuide">
        <p>
          <b>Firefox</b> is the browser of choice for the best video player
        </p>
        <p>
          All the indexed files have to be placed in <code>/videos/</code>
        </p>
        <p>
          <span className="fw-bold">Important : </span>
          All Videos must in mp4, encoded in h264 (you can use{" "}
          <a href="https://trac.ffmpeg.org/wiki/Encode/H.264">ffmpeg</a>)
        </p>

        <p className="mb-2">File structure example :</p>

        <pre className="p-3 bg-light border rounded-3 m-0">
          {`path/to/videos/
  │
  ├─ Movie_Folder_Name
  │   │
  │   └─ Movie_Title.mp4
  │
  │
  └─ Series_Folder_Name
      │
      └─ Season_1
          │
          ├─ Episode_1.mp4
          │
          ├─ Episode_2.mp4
          │
          └─ Episode_3.mp4`}
        </pre>

        <p className="mt-4 mb-2 fs-5">FFmpeg cheat-sheet :</p>

        <pre className="p-3 bg-light border rounded-3 m-0">
          {`ffmpeg -i <INPUT> -c:v libx264 -preset:v fast -tune film -level 4.0 -c:a aac <OUTPUT>.mp4

check out these gold mine :
 - https://gist.github.com/pinge/b9f9ce1e4d399503f7c80df4c5d09f22
 - https://trac.ffmpeg.org/wiki/HowToBurnSubtitlesIntoVideo
 - https://trac.ffmpeg.org/wiki/Encode/H.264

# -c:v libx264  ->  important because web-browser support only h264

# -preset:v <PRESET>  ->  choose from these :
  - ultrafast
  - superfast
  - veryfast
  - faster
  - fast
  - medium (default)
  - slow
  - slower
  - veryslow

# -tune <TUNE>  ->  choose from these :
  - film	
  - animation
  - grain
  - stillimage
  - fastdecode
  - zerolatency

# -level 4.0  ->  for compatibility

# -c:a aac  ->  for the audio

# -pix_fmt yuv420p  ->  for some weird shit 

# -vf subtitles=<SUBTITLE>.srt  ->  add subtitles

recommended :

ffmpeg -i <INPUT> -c:v libx264 -preset:v fast -level 4.0 -tune film -pix_fmt yuv420p -c:a aac <OUTPUT>.mp4`}
        </pre>
      </div>
    </div>
  );
}
