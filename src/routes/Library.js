import Layout from "../components/Layout";
import TorrentList from "../components/TorrentList";
import UploadMagnet from "../components/UploadMagnet";

export default function Library() {
  return (
    <Layout>
      <UploadMagnet />
      <TorrentList />
    </Layout>
  );
}
