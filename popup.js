document.addEventListener("DOMContentLoaded", async () => {
  const { activeReminderId, reminders = [] } =
    await chrome.storage.local.get(["activeReminderId", "reminders"]);

  if (activeReminderId) {
    const reminder = reminders.find(r => r.id === activeReminderId);
    if (reminder) {
      document.getElementById("createNote").style.display = "none";
      document.getElementById("fullNote").style.display = "block";
      document.getElementById("noteText").textContent = reminder.message;
    }
  }
});

document.getElementById("saveBtn").addEventListener("click", async () => {
  const message = document.getElementById("message").value.trim();
  const triggerDate = document.getElementById("triggerDate").value;
  const status = document.getElementById("status");

  if (!message || !triggerDate) {
    status.textContent = "Please fill all fields.";
    return;
  }

  const triggerTime = new Date(triggerDate).getTime();

  if (triggerTime <= Date.now()) {
    status.textContent = "Date must be in the future.";
    return;
  }

  const reminder = {
    id: crypto.randomUUID(),
    message,
    createdAt: new Date().toISOString(),
    triggerAt: new Date(triggerTime).toISOString(),
    triggered: false
  };

  const data = await chrome.storage.local.get("reminders");
  const reminders = data.reminders || [];
  reminders.push(reminder);

  await chrome.storage.local.set({ reminders });

  chrome.alarms.create(reminder.id, {
    when: triggerTime
  });

  status.textContent = "Reminder saved";

  document.getElementById("message").value = "";
  document.getElementById("triggerDate").value = "";
});

document.getElementById("closeNote").addEventListener("click", async () => {
  await chrome.storage.local.remove("activeReminderId");
  window.close(); // closes popup explicitly
});
