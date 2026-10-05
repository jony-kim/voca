/* 화면(app/)에서 쓰는 파일 저장 다리 — window.mstNative */
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('mstNative', {
  readData: () => ipcRenderer.sendSync('qms:read'),
  writeData: (txt) => { const r = ipcRenderer.sendSync('qms:write', txt); if (r !== true) throw new Error(r); },
  dataPath: () => ipcRenderer.sendSync('qms:path'),
  chooseDataFile: () => ipcRenderer.invoke('qms:choose'),
  openDataDir: () => ipcRenderer.send('qms:openDir')
});
