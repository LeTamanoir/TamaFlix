import Layout from "../components/Layout";

export default function Index() {
  return (
    <Layout>
      <div className="container">
        <div className="p-3 p-md-5 bg-white rounded-3">
          <div className="container-fluid py-3 py-md-4">
            <h1 className="display-5 fw-bold mb-4">TamaFlix</h1>
            <p className="col-md-8 fs-4">
              TamaFlix is a cloud-based media-player that makes it simple to
              enjoy your movies, anime and TV shows. <br />
              It uses a Server to index your media library and web media-player
              to playback the media.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
