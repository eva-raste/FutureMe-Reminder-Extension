# FutureMe – Send Notes to Your Future Self

FutureMe is a Chrome extension that lets you write a message today and receive it in the future — even years later.  
It works completely offline, requires no backend, and uses Chrome’s built-in alarms and notifications.

This project demonstrates correct **Chrome Extension (Manifest V3)** architecture, long-term persistence, and clean UX design.

---

## ✨ Features

- 📅 Schedule reminders for months or years in the future
- 🔔 Persistent notifications (stay until you dismiss them)
- 📖 Read the full note in a dedicated page
- 💾 No backend or database required
- 🔐 Data stored locally using Chrome Storage
- ⚡ Lightweight and fast

---

## 🛠️ Tech Stack

- Chrome Extension (Manifest V3)
- JavaScript
- Chrome Alarms API
- Chrome Notifications API
- Chrome Storage API

---

## 📂 Project Structure

future-me/
├── manifest.json
├── background.js
├── popup.html
├── popup.js
├── popup.css
├── note.html
├── note.js
└── icon.png

---

## 🚀 Installation (Local)

1. Open **Chrome**
2. Go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder

The extension will appear in your toolbar.
