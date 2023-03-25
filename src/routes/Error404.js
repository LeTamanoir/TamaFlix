import Layout from "../components/Layout";

export default function Error404() {
  return (
    <Layout>
      <div className="alert alert-dark">
        Error 404 : Content requested not found
      </div>
    </Layout>
  );
}
