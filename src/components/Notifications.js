export default function Notifications({ notifications, deleteNotification }) {
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 50 }}>
      {notifications.map((notif, i) => (
        <div role="alert" className="toast show bg-light mt-3" key={i}>
          <div className="toast-header">
            <svg
              className="bd-placeholder-img rounded me-2"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100%" height="100%" fill={notif.color}></rect>
            </svg>

            <strong className="me-auto">{notif.title}</strong>
            <small>{new Date(notif.date).toLocaleTimeString("fr")}</small>
            <button
              type="button"
              className="btn-close"
              onClick={() => deleteNotification(notif.id)}
            />
          </div>
          <div className="toast-body">{notif.content}</div>
        </div>
      ))}
    </div>
  );
}
