import { Link } from "react-router-dom";

export default function BreadCrumb({ path }) {
  return (
    <ol className="breadcrumb mb-3">
      {path[0] === "" ? (
        <li
          className="breadcrumb-item active text-truncate"
          style={{ maxWidth: "25%" }}
        >
          Root
        </li>
      ) : (
        <li
          className="breadcrumb-item text-truncate"
          style={{ maxWidth: "25%" }}
        >
          <Link to="/videos/" className="link-dark">
            Root
          </Link>
        </li>
      )}

      {path.map((p, i) =>
        i === path.length - 1 ? (
          <li
            className="breadcrumb-item active text-truncate"
            key={i}
            style={{ maxWidth: "25%" }}
          >
            {p.replace(/_/g, " ")}
          </li>
        ) : (
          <li
            className="breadcrumb-item text-truncate"
            key={i}
            style={{ maxWidth: "25%" }}
          >
            <Link
              to={`/videos/${path.join("/").split(p)[0] + p}`}
              className="link-dark"
            >
              {p.replace(/_/g, " ")}
            </Link>
          </li>
        )
      )}
    </ol>
  );
}
