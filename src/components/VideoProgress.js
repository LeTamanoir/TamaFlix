export default function VideoProgress({ view }) {
  return (
    <div className="progress mb-3" style={{ height: "0.6rem" }}>
      <div
        className="progress-bar progress-bar-striped bg-danger"
        style={{
          width: `calc(${view.played} * 100%)`,
        }}
      ></div>
    </div>
  );
}
