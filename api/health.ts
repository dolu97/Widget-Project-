const KEYCHAIN_KEY = 'daily-goals-widget-config';

function getStoredConfig() {
  try {
    const value = Keychain.get(KEYCHAIN_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function saveConfig(config) {
  Keychain.set(KEYCHAIN_KEY, JSON.stringify(config));
}

async function ensureConfig() {
  const existing = getStoredConfig();
  if (existing) return existing;

  const appUrl = await QuickLook.present('App URL', 'input');
  const token = await QuickLook.present('API token', 'input');
  const config = { appUrl: appUrl.trim(), token: token.trim() };
  saveConfig(config);
  return config;
}

async function render() {
  const config = await ensureConfig();

  let today = null;
  try {
    const req = new Request(`${config.appUrl.replace(/\/$/, '')}/api/v1/today`, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });
    today = await req.loadJSON();
  } catch {
    // fallback: no network yet
  }

  const widget = new ListWidget();
  widget.backgroundColor = new Color('#0f172a');

  const dateText = widget.addText(today?.dateLabel || 'Today');
  dateText.textColor = new Color('#cbd5e1');
  dateText.font = Font.mediumSystemFont(12);

  const percentText = widget.addText(`${today?.percent ?? 0}%`);
  percentText.textColor = new Color('#8ef0c1');
  percentText.font = Font.boldSystemFont(24);

  if (today?.goals?.length) {
    for (const goal of today.goals.slice(0, 4)) {
      const row = widget.addText(`${goal.completed ? '✓' : '○'} ${goal.title}`);
      row.textColor = goal.completed ? new Color('#8ef0c1') : new Color('#e2e8f0');
      row.font = Font.systemFont(10);
    }
  }

  widget.url = config.appUrl;
  Script.setWidget(widget);
  Script.complete();
}

render();
