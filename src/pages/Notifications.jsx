import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; 

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        "/treatments/admin/system-notifications/"
      );
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Notification fetch error:", err);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-10">
      <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-text-main">
              Notification
            </h3>
            <p className="text-sm text-text-muted">
              Total {notifications.length} Notifications
            </p>
          </div>
        </div>

        {loading && (
          <p className="text-sm text-text-muted">Loading notifications...</p>
        )}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <div className="space-y-3 max-h-125 overflow-y-auto pr-1">
            {notifications.length === 0 && (
              <p className="text-sm text-text-muted">
                No notifications found.
              </p>
            )}

            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2
                bg-primary-light/30 hover:bg-primary-light/50
                px-4 md:px-5 py-3 rounded-lg transition-all"
              >
                <div>
                  <p className="text-sm font-medium text-text-main">
                    {item.title}
                  </p>
                  <p className="text-sm text-text-main">
                    {item.message}
                  </p>
                </div>

                <span className="text-xs text-text-muted whitespace-nowrap">
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}