chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log("Alarm fired:", alarm.name);

  try {
    const { reminders = [] } = await chrome.storage.local.get("reminders");

    const reminder = reminders.find(r => r.id === alarm.name);
    if (!reminder) {
      console.log("No reminder found for alarm:", alarm.name);
      return;
    }

    if (reminder.triggered) {
      console.log("Reminder already triggered:", alarm.name);
      return;
    }

    await chrome.notifications.create(reminder.id, {
        type: "basic",
        iconUrl: chrome.runtime.getURL("icon.png"),
        title: "Message from your past self",
        message: reminder.message,
        requireInteraction: true
        });


    reminder.triggered = true;
    await chrome.storage.local.set({ reminders });
    
    
    console.log("Notification shown for:", alarm.name);
  } catch (err) {
    console.error("Error handling alarm:", err);
  }
});


chrome.notifications.onClicked.addListener(async (notificationId) => {
  await chrome.storage.local.set({ activeReminderId: notificationId });

  chrome.tabs.create({
    url: chrome.runtime.getURL("note.html")
  });
});
