/* MST QMS 데스크톱 앱 (Windows · macOS) — Electron 메인 프로세스
   데이터: JSON 파일 1개 (기본: 사용자 데이터 폴더, 설정에서 공유폴더/NAS로 변경 가능)
   자동 백업: 실행 시 하루 1회, 데이터 파일 옆 backups 폴더에 최근 30개 보관 */
const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const CONFIG = () => path.join(app.getPath('userData'), 'config.json');
function readConfig() { try { return JSON.parse(fs.readFileSync(CONFIG(), 'utf8')); } catch (e) { return {}; } }
function writeConfig(c) { fs.mkdirSync(path.dirname(CONFIG()), { recursive: true }); fs.writeFileSync(CONFIG(), JSON.stringify(c, null, 1)); }
function dataPath() { return readConfig().dataPath || path.join(app.getPath('documents'), 'MST_QMS', 'mst-qms-data.json'); }

function dailyBackup() {
  const p = dataPath();
  if (!fs.existsSync(p)) return;
  const dir = path.join(path.dirname(p), 'backups');
  fs.mkdirSync(dir, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const target = path.join(dir, 'mst-qms-' + today + '.json');
  if (!fs.existsSync(target)) fs.copyFileSync(p, target);
  const files = fs.readdirSync(dir).filter(f => /^mst-qms-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
  files.slice(0, Math.max(0, files.length - 30)).forEach(f => fs.unlinkSync(path.join(dir, f)));
}

ipcMain.on('qms:read', (e) => {
  try { e.returnValue = fs.existsSync(dataPath()) ? fs.readFileSync(dataPath(), 'utf8') : null; }
  catch (err) { e.returnValue = null; }
});
ipcMain.on('qms:write', (e, txt) => {
  try {
    const p = dataPath();
    fs.mkdirSync(path.dirname(p), { recursive: true });
    const tmp = p + '.tmp';
    fs.writeFileSync(tmp, txt, 'utf8');
    fs.renameSync(tmp, p);           /* 원자적 저장 — 저장 중 꺼져도 파일이 깨지지 않음 */
    e.returnValue = true;
  } catch (err) { e.returnValue = String(err); }
});
ipcMain.on('qms:path', (e) => { e.returnValue = dataPath(); });
ipcMain.handle('qms:choose', async () => {
  const r = await dialog.showSaveDialog({
    title: '데이터 파일 위치 (공유폴더·NAS 가능)',
    defaultPath: dataPath(),
    buttonLabel: '이 위치 사용',
    filters: [{ name: 'MST QMS 데이터', extensions: ['json'] }]
  });
  if (r.canceled || !r.filePath) return null;
  const old = dataPath();
  if (!fs.existsSync(r.filePath) && fs.existsSync(old)) fs.copyFileSync(old, r.filePath); /* 새 위치에 파일이 없으면 현재 데이터를 복사 */
  writeConfig(Object.assign(readConfig(), { dataPath: r.filePath }));
  return r.filePath;
});
ipcMain.on('qms:openDir', () => { shell.showItemInFolder(dataPath()); });

function createWindow() {
  const win = new BrowserWindow({
    width: 1400, height: 900, minWidth: 900, minHeight: 600,
    title: 'MST QMS',
    backgroundColor: '#F4F5F7',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: false }
  });
  win.loadFile(path.join(__dirname, '..', 'app', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) { shell.openExternal(url); return { action: 'deny' }; }
    return { action: 'allow' };
  });
}

const menu = [
  ...(process.platform === 'darwin' ? [{ role: 'appMenu' }] : []),
  { label: '파일', submenu: [{ label: '인쇄', accelerator: 'CmdOrCtrl+P', click: (_, w) => w && w.webContents.print() }, { type: 'separator' }, process.platform === 'darwin' ? { role: 'close', label: '닫기' } : { role: 'quit', label: '종료' }] },
  { label: '편집', submenu: [{ role: 'undo', label: '실행 취소' }, { role: 'redo', label: '다시 실행' }, { type: 'separator' }, { role: 'cut', label: '잘라내기' }, { role: 'copy', label: '복사' }, { role: 'paste', label: '붙여넣기' }, { role: 'selectAll', label: '모두 선택' }] },
  { label: '보기', submenu: [{ role: 'reload', label: '새로고침' }, { role: 'resetZoom', label: '기본 크기' }, { role: 'zoomIn', label: '확대' }, { role: 'zoomOut', label: '축소' }, { type: 'separator' }, { role: 'togglefullscreen', label: '전체 화면' }, { role: 'toggleDevTools', label: '개발자 도구' }] }
];

app.whenReady().then(() => {
  try { dailyBackup(); } catch (e) { console.error(e); }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
