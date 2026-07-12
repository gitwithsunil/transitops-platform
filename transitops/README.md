# TransitOps Core — Smart Logistics Lifecycle Control Platform

TransitOps is a modern, responsive Full-Stack/Client-side web application designed for end-to-end fleet registry administration, operator compliance auditing, manifest dispatching, and workshop system logging. Built with **React** and styled dynamically with **Tailwind CSS**, the platform incorporates Role-Based Access Control (RBAC) and an adaptive visual presentation engine supporting instant Light and Dark mode variations.

---

## 🚀 Features

### 🌓 Adaptive Neural Expressive UI
* **Dynamic Theme Toggle:** Instant transitions between Day View (Light Mode) and Night View (Dark Mode) across all components using an intuitive Sun/Moon selector interface.
* **Scannable Telemetry Grids:** Visual card matrices reporting real-time Asset Utilization metrics, Active Trips, and Workshop diagnostics at a single glance.

### 🔐 Role-Based Access Control (RBAC)
The interface filters telemetry access, operational sidebars, and data submission access points depending on the logged-in user profile:
* **Fleet Manager:** Unrestricted platform orchestration (Registry, Rosters, Dispatch, Workshop, and Expenses).
* **Driver:** Specialized view focused on the Dispatch Center and Route Management.
* **Safety Officer:** Read-only compliance auditing of the Operator Compliance Roster.
* **Financial Analyst:** Targeted access to Performance KPIs, ROI Trackers, Fuel Intake, and Auxiliary Expenses.

### 📊 System Orchestration Modules
* **Operational Diagnostics Console:** Tracks fleet wide metrics using simulated telemetry parameters.
* **Fleet Registry:** Enables registration and removal of unique vehicle assets alongside load limit parameters.
* **Operator Compliance Roster:** Safety rating monitoring, CDL compliance trackers, and expiration warnings.
* **Manifest Dispatch Center:** Controls route validation checks (e.g., payloads violating maximum vehicle capacities) and calculates dynamic route metrics.
* **Workshop System & Expense Tracking:** Dedicated modules for routing damaged units to repair bays, logging budgets, and detailing auxiliary expenditure variables.

---

## 🛠️ Tech Stack

* **Core Framework:** React (Functional Components & Hooks)
* **Styling Engine:** Tailwind CSS (Utility-first styling with custom animation extensions)
* **Iconography:** Lucide React (High-density vector asset mapping)
* **Design Pattern:** Component-Driven Layering (Modular Dashboard Architecture)

---

## 📦 Getting Started

### Prerequisites
Ensure you have the following installed on your local environment:
* [Node.js](https://nodejs.org/) (v16.x or higher recommended)
* npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/transitops-core.git](https://github.com/your-username/transitops-core.git)
   cd transitops-core
