import SessionContext from "../context/session";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import NotificationContext from "../context/notifications";

export default function Navbar() {
  const { session, setSession } = useContext(SessionContext);
  const { addNotification } = useContext(NotificationContext);

  const logout = async () => {
    const res = await fetch("/api/logout");
    const data = await res.json();
    setSession(data);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/android-chrome-256x256.png"
            alt="Logo"
            width="24"
            height="24"
            className="d-inline-block me-2"
          />
          TamaFlix
        </NavLink>

        {session.connected && (
          <div
            className="d-md-none d-flex align-items-center bg-light rounded-3 py-1 px-2"
            onClick={() =>
              addNotification({
                title: "User",
                color: "#0d6efd",
                content: `connected as ${session.user.username}`,
              })
            }
          >
            <BsPersonCircle size={24} className="me-2" />
            {session.user.username}
          </div>
        )}

        <div className="collapse navbar-collapse">
          {session.connected && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    (isActive ? "active " : "") + "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/videos"
                  className={({ isActive }) =>
                    (isActive ? "active " : "") + "nav-link"
                  }
                >
                  Videos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/library"
                  className={({ isActive }) =>
                    (isActive ? "active " : "") + "nav-link"
                  }
                >
                  Library
                </NavLink>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto">
            {session.connected ? (
              <>
                <li className="nav-item d-flex align-items-center mx-2 mx-lg-4">
                  <div
                    className="d-flex align-items-center bg-light py-1 px-2 rounded-3"
                    onClick={() =>
                      addNotification({
                        title: "User",
                        color: "#0d6efd",
                        content: `connected as ${session.user.username}`,
                      })
                    }
                  >
                    <BsPersonCircle size={24} className="me-2" />
                    {session.user.username}
                  </div>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      (isActive ? "active " : "") + "nav-link"
                    }
                  >
                    settings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a
                    type="button"
                    className="nav-link text-danger"
                    onClick={logout}
                  >
                    logout
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    (isActive ? "active " : "") + "nav-link text-primary"
                  }
                >
                  login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
