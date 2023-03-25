import { NavLink } from "react-router-dom";
import {
  BsBoxArrowLeft,
  BsBoxArrowRight,
  BsCollectionPlay,
  BsCollectionPlayFill,
  BsGear,
  BsGearFill,
  BsHouseDoor,
  BsHouseDoorFill,
  BsPlayBtnFill,
  BsPlayBtn,
} from "react-icons/bs";
import { useContext } from "react";
import SessionContext from "../context/session";

export default function BottomNavbar() {
  const { session, setSession } = useContext(SessionContext);

  let linkClass =
    "text-light text-decoration-none d-flex flex-column align-items-center";

  const logout = async () => {
    if (window.confirm("Are you sure ?")) {
      const res = await fetch("/api/logout");
      const data = await res.json();
      setSession(data);
    }
  };

  return (
    <nav className="d-md-none d-flex justify-content-evenly bg-dark pt-2 pb-1">
      {session.connected ? (
        <>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "" : "") + linkClass}
            children={({ isActive }) => (
              <>
                {isActive ? (
                  <BsHouseDoorFill size={24} />
                ) : (
                  <BsHouseDoor size={24} />
                )}
                Home
              </>
            )}
          />
          <NavLink
            to="/videos"
            className={({ isActive }) => (isActive ? "" : "") + linkClass}
            children={({ isActive }) => (
              <>
                {isActive ? (
                  <BsPlayBtnFill size={24} />
                ) : (
                  <BsPlayBtn size={24} />
                )}
                Videos
              </>
            )}
          />
          <NavLink
            to="/library"
            className={({ isActive }) => (isActive ? "" : "") + linkClass}
            children={({ isActive }) => (
              <>
                {isActive ? (
                  <BsCollectionPlayFill size={24} />
                ) : (
                  <BsCollectionPlay size={24} />
                )}
                Library
              </>
            )}
          />
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "" : "") + linkClass}
            children={({ isActive }) => (
              <>
                {isActive ? <BsGearFill size={24} /> : <BsGear size={24} />}
                Settings
              </>
            )}
          />

          <a
            type="button"
            onClick={logout}
            className="text-danger text-decoration-none d-flex flex-column align-items-center"
          >
            <BsBoxArrowLeft size={26} />
            Logout
          </a>
        </>
      ) : (
        <NavLink
          to="/login"
          className="text-primary text-decoration-none d-flex flex-column align-items-center"
        >
          <BsBoxArrowRight size={26} />
          Login
        </NavLink>
      )}
    </nav>
  );
}
