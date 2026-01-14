(async () => {
  const { activeReminderId, reminders = [] } =
    await chrome.storage.local.get(["activeReminderId", "reminders"]);

  const reminder = reminders.find(r => r.id === activeReminderId);

  if (reminder) {
    document.getElementById("note").textContent = reminder.message;
  }
})();
