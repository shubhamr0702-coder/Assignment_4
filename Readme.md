# Cipher MVP — Tasks, Goals, Focus & Mood Board

Cipher MVP is a high-fidelity, premium dark-themed personal workspace and productivity console built using React and Vite. Designed to serve as a daily dashboard, it aggregates your tasks, milestones, focus countdown loops, and design inspirations into a fully unified interface. 

The system utilizes an optimized client-side persistence layer with custom hooks, completely eliminating external state management overhead or external library runtimes.

---

## 🚀 Key Features Breakdown

### P0: Robust Client-Side Persistence Layer
* **`useLocalStorage` Hook:** A fully generic state manager hook (`[value, setValue] = useLocalStorage(key, defaultValue)`) that transparently synchronizes reactive state updates with the browser's `localStorage` engine. 
* **Standalone Resilience:** Verified to preserve navigational selections, goal updates, and completed data matrices through deep tab refreshes.

### P1: Advanced Task Board (`TaskBoard`)
* **Quick Add Interface:** Single-input element executing task captures via `Enter` keystroke interceptors.
* **Derived State Grouping:** Computes context groups runtime-efficiently directly at render time.
* **Micro-Interactions:** A custom CSS transition coordinator that strikes through text and triggers a smooth **~400ms fade translation** before migrating records to the collapsed Completed array.
* **Cascading Deletes:** Deleting a root node automatically traverses dependencies and executes deep cascading garbage collection of all relational subtask models.

### P2: Macro Goal Tracker (`GoalTracker`)
* **Progress Visualization:** Visual progress tracking modules featuring responsive progress fills mapped to explicit target parameters.
* **Clamping Bounds Protection:** Manual increments or decrements (e.g., `+/- 10%`) utilize automated clamping bounds (`Math.min(100, Math.max(0, ...))`) to ensure layout math never violates the `[0-100]` spectrum.

### P3: Atomic Focus Mode Countdown (`FocusTimer`)
* **`useTimer` Architecture:** An isolated custom lifecycle hook containing clean countdown loops built using native `setInterval` and active memory unmount cleanups.
* **Race-Condition Guards:** Thread-safe state protections that structurally block duplicate intervals or rapid clicking from corrupting clock cycles.
* **Cross-Component Task Linking:** Integrates directly with your incomplete tasks database. Selecting a task displays an active contextual notification.

### P4: Freeform Mood Board (`MoodBoard`)
* **CSS Grid Canvas:** Utilizes a highly flexible, auto-filling responsive CSS Grid system to frame creative reference cards.
* **Smart Input Processing:** Analyzes inputs automatically; strings containing hexadecimal color signatures (e.g., `#a855f7`) render rich block swatches, while external web paths load clean cover graphics.
* **Destructive Extraction:** Interactive click handlers mapped across assets permit immediate item removals from the state model.

### P5: Unified Analytics Dashboard (`Dashboard`)
* **Aggregated Metrics Summary:** The application default entry point. Reads active global state structures from local storage to calculate cross-component workspace data.
* **Shared Composition Frame:** Wrapped inside an expansive, unified workspace shell linking an interactive sidebar navigation system with smooth tab-state switching.

---

## 📂 Structural Directory Architecture

```text
Assignment/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Metrics overview and aggregate insights panel
│   │   ├── FocusTimer.jsx     # Countdown interface with linked task trackers
│   │   ├── GoalTracker.jsx    # Goal metrics manager and clamped progress grids
│   │   ├── MoodBoard.jsx      # Hex-swatch and resource preview canvas
│   │   ├── TaskBoard.css      # Core 400ms transition fade animations
│   │   └── TaskBoard.jsx      # Grouped tracking board with relational dependencies
│   ├── hooks/
│   │   ├── useLocalStorage.js # Global state synchronization engine
│   │   └── useTimer.js        # Race-guarded clock loop hook logic
│   ├── App.css                # Global theme variables, UI baselines, and layout rules
│   ├── App.jsx                # Layout shell configuration and navigation loops
│   └── main.jsx               # React DOM ecosystem execution mount
├── index.html                 # Entry DOM frame targeting Vite bundler paths
├── package.json               # System package manifest, script loops, and dependencies
└── vite.config.js             # Local environment configurations for compilation optimization