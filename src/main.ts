import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import NexusbaseQl from './modules/nexusbaseql/nexusbaseql';
import nexusbaseqlConfig from './config/nexusbaseql';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

let mainWindow: Electron.BrowserWindow;
const nexusbaseQl = new NexusbaseQl(nexusbaseqlConfig);

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
    mainWindow = null;
  });

  // Install React Dev Tools
  const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

  installExtension(REACT_DEVELOPER_TOOLS).then((name:string) => {
    console.log(`Added Extension:  ${name}`);
  })
  .catch((err:any) => {
    console.log('An error occurred: ', err);
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

ipcMain.on('nbql', (event: any, arg: any) => {
  event.returnValue = nexusbaseQl.resolve({ workspace: arg[0], queries: arg[1]});
})
