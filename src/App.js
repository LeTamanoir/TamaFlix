import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SessionContext from "./context/session";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Index from "./routes/Index";
import Settings from "./routes/Settings";
import Videos from "./routes/Videos";
import Error404 from "./routes/Error404";
import Library from "./routes/Library";
import RequireAuth from "./components/RequireAuth";
import NotificationWrapper from "./components/NotificationWrapper";

export default function App() {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const res = await fetch("/api/session");
    const data = await res.json();
    setSession(data);
  };

  useEffect(() => fetchSession(), []);

  return session ? (
    <SessionContext.Provider value={{ session, setSession }}>
      <Routes>
        <Route element={<NotificationWrapper />}>
          <Route path="/" element={<Index />} />

          <Route
            path="login"
            element={!session.connected ? <Login /> : <Navigate to="/home" />}
          />

          <Route element={<RequireAuth session={session} />}>
            <Route path="home" element={<Home />} />
            <Route path="videos/*" element={<Videos />} />

            <Route path="settings" element={<Settings />} />
            <Route path="library" element={<Library />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </SessionContext.Provider>
  ) : (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="spinner-border text-primary">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
