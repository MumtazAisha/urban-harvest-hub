export default function NotificationButton() {
  async function handleNotification() {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      new Notification("Urban Harvest Hub 🌱", {
        body: "Notifications are enabled for eco events and product updates.",
        icon: "/icons/icon-192.png",
      });
    } else {
      alert("Notification permission was not granted.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleNotification}
      aria-label="Enable update notifications"
      className="rounded-full border border-leaf px-4 py-2 text-sm font-medium text-leaf transition hover:bg-leaf hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-950"
    >
      Enable Updates
    </button>
  );
}