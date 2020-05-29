import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { resolveQueries } from './modules/nexusbase_ql/index';

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.loadURL(
    true
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;///
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('db', (event:any, arg:any) => {
  const queries = {
    workspaces: {
      action: 'getWorkspaces'
    }
  }
  
  event.returnValue = resolveQueries(queries);
})
