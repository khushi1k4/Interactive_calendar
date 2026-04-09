# 🗓️ Proactive Calendar

**Live Demo:** [https://proactive-calendar.vercel.app/](https://proactive-calendar.vercel.app/)

**Video:** [Demostration video](https://drive.google.com/file/d/1TmWc9jst4dW7Qjwmmp_9KRZJ8XznNahb/view?usp=sharing)

A high-performance, aesthetically pleasing React calendar application that harmonizes seasonal beauty with personal productivity. Unlike static calendars, **Proactive Calendar** adapts to the passage of time through dynamic theming and provides a private, localized space for daily reflections.

---

## 🎯 Problem Statement
Digital organization often feels fragmented. Users are forced to switch between calendar apps for dates, notepad apps for memos, and search engines for holiday information. Furthermore, most calendars lack a visual connection to the changing seasons, resulting in a cold, purely functional user experience.

## ✨ About the Project
**Proactive Calendar** is a "Zen-inspired" planning tool. It solves fragmentation by integrating a private memo system directly into a seasonally-aware interface. It is built to be "Proactive"—offering daily inspiration and clear holiday visibility so you can plan your life with intention and style.

---

## 🚀 Key Features & Creativities

* **Dynamic Seasonal Engine:** The UI automatically detects the current month and transitions between 12 unique seasonal themes (Winter, Spring, Summer, Autumn) with custom imagery and accent colors.
* **Privacy-First Daily Memos:** Features a built-in notepad for every single day. Using `localStorage`, your data stays on your device—no database, no tracking, total privacy.
* **Adaptive Theme Toggler:** A sophisticated Dark/Light mode toggle designed with a "Stone" color palette to reduce eye strain during night-time planning.
* **Holiday & Observance Markers:**
    * **Green Rings:** National Holidays (India).
    * **Pink Dots:** Cultural and global observances.
* **Deterministic Daily Quotes:** A logic-based quote system that provides a fresh spark of motivation every 24 hours.
* **Ultra-Compact Responsive UI:** Engineered to be "App-like," fitting perfectly on mobile screens and maintaining a tight, professional look on desktops.

---

## 🏗️ Workflow & Architecture
The project utilizes a **Component-Based Architecture** focused on speed and modularity.


![Image](https://github.com/user-attachments/assets/cbf65e83-b077-4698-a586-94f092554d49)


1.  **The Brain (`useCalendar` Hook):** Handles all date arithmetic and state logic.
2.  **The Face (`CalendarGrid`):** A reactive grid that highlights selections, ranges, and holidays.
3.  **The Heart (`NotesSection`):** Manages I/O operations for local storage and triggers the daily quote engine.
4.  **The Look (`App` Component):** Acts as the central controller for the seasonal and dark-mode themes.

---

## 🛠️ Tech Stack
* **Frontend Library:** React.js (Vite)
* **Styling Engine:** Tailwind CSS
* **Date Utility:** `date-fns`
* **Iconography:** Lucide React
* **Deployment:** Vercel

---

## 📥 Installation
To get a local copy up and running, follow these steps:

```bash
# Clone the repository
git clone [https://github.com/khushi1k4/Interactive_calendar.git](https://github.com/khushi1k4/Interactive_calendar.git)

# Enter the directory
cd Interactive_calendar

# Install dependencies
npm install

# Start the development server
npm run dev
