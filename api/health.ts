const KEYCHAIN_KEY = 'daily-goals-widget-config';

function getConfig() {
  const stored = Keychain.get(KEYCHAIN_KEY);
  if (stored) return JSON.parse(stored);
  return null;
}

function saveConfig(config) {
  Keychain.set(KEYCHAIN_KEY, JSON.stringify(config));
}

async function promptForSetup() {
  const appUrl = await QuickLook.present('Enter the Daily Goals app URL', 'input');
  const token = await QuickLook.present('Enter the API token', 'input');
  const config = { appUrl: appUrl.trim(), token: token.trim() };
  saveConfig(config);
  return config;
}

async function loadConfig() {
  let config = getConfig();
  if (!config) {
    config = await promptForSetup();
  }
  return config;
}

async function fetchToday(config) {
  const url = `${config.appUrl.replace(/\/$/, '')}/api/v1/today`;
  const req = new Request(url);
  req.method = 'GET';
  req.headers = {
    Authorization: `Bearer ${config.token}`,
    'Content-Type': 'application/json',
  };

  const response = await req.loadJSON();
  return response;
}

async function renderWidget() {
  const config = await loadConfig();
  let payload = null;
  try {
    payload = await fetchToday(config);
  } catch (error) {
    const cached = FileManager.local().readString('daily-goals-cache.json');
    if (cached) {
      payload = JSON.parse(cached);
    }
  }

  if (!payload) {
    return;
  }

  const widget = new ListWidget();
  widget.backgroundColor = new Color('#0f172a');

  const dateText = widget.addText(payload.dateLabel || payload.date || 'Today');
  dateText.textColor = new Color('#cbd5e1');
  dateText.font = Font.mediumSystemFont(12);

  const percentText = widget.addText(`${payload.percent ?? 0}%`);
  percentText.textColor = new Color('#8ef0c1');
  percentText.font = Font.boldSystemFont(26);

  const summaryText = widget.addText(`${payload.completed ?? 0} / ${payload.total ?? 0} goals`);
  summaryText.textColor = new Color('#e2e8f0');
  summaryText.font = Font.systemFont(12);

  if (payload.goals && payload.goals.length) {
    const goals = payload.goals.slice(0, 4);
    for (const goal of goals) {
      const line = widget.addText(`${goal.completed ? '✓' : '○'} ${goal.title}`);
      line.textColor = goal.completed ? new Color('#8ef0c1') : new Color('#e2e8f0');
      line.font = Font.systemFont(11);
    }
  }

  widget.url = config.appUrl;
  Script.setWidget(widget);
  Script.complete();

  FileManager.local().writeString('daily-goals-cache.json', JSON.stringify(payload));
}

if (config.runsInWidget) {
  renderWidget();
} else {
  renderWidget();
}
