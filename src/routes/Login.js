import { useContext, useState } from "react";
import Layout from "../components/Layout";
import SessionContext from "../context/session";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setSession } = useContext(SessionContext);

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();

    if (data.connected) setSession(data);
    else setError(data.error);
  };

  return (
    <Layout>
      <form
        style={{ maxWidth: "30rem" }}
        className="p-3 mx-auto text-center bg-white border rounded"
        onSubmit={submit}
      >
        <h2 className="h3 mb-4 fw-normal">Login</h2>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-primary" type="submit">
          login
        </button>
      </form>
    </Layout>
  );
}
