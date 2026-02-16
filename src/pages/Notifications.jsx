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
    <div className="p-4 md:p-6 space-y-6 md:space-y-10">
      {/* NOTIFICATION CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 relative">
        
        {/* HEADER */}
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

        {/* LIST */}
        <div className="space-y-3 max-h-125 overflow-y-auto pr-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2
              bg-primary-light/30 hover:bg-primary-light/50
              px-4 md:px-5 py-3 rounded-lg transition-all"
            >
              <p className="text-sm text-text-main break-words-word">
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
