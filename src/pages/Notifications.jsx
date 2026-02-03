
export default function Notifications() {

  const notifications = [
    {
      id: 1,
      text: "New DM from Roni on Instagram: “Hey I need help...”",
      time: "Just Now",
    },
    {
      id: 2,
      text: "AI detected Mindset Issue for user Rafi (Instagram)",
      time: "5 min ago",
    },
    {
      id: 3,
      text: "New Discovery Call booked by James for Monday 4 PM",
      time: "10 min ago",
    },
    {
      id: 4,
      text: "Facebook API token expired — reconnect required.",
      time: "15 min ago",
    },
    {
      id: 5,
      text: "New Discovery Call booked by James for Monday 4 PM",
      time: "10 min ago",
    },
    {
      id: 6,
      text: "Facebook API token expired — reconnect required.",
      time: "15 min ago",
    },
  ];

  return (
    <div className="space-y-10">
      {/* NOTIFICATION CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-8 relative">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-main">
              Notification
            </h3>
            <p className="text-sm text-text-muted">
              Total {notifications.length} Notifications
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* <Icon
              icon="material-symbols:notifications-outline-rounded"
              className="text-primary"
              width="26"
            /> */}

          </div>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4
              bg-primary-light/30 px-5 py-3 rounded-lg"
            >
              <p className="text-sm text-text-main truncate">
                {item.text}
              </p>
              <span className="text-xs text-text-muted whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
