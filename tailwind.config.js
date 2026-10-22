@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  background: #020817;
  color: #e2e8f0;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(124, 156, 255, 0.18), transparent 35%),
    #020817;
  color: #e2e8f0;
}

button,
input,
select {
  font: inherit;
}

#root {
  min-height: 100vh;
}

.card {
  @apply rounded-2xl border border-slate-700/80 bg-slate-900/70 backdrop-blur-sm shadow-soft;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring circle {
  transition: stroke-dashoffset 0.5s ease;
}
