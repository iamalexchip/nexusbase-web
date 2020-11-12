import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
const isDev = require('electron-is-dev');
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import NexusbaseQl from './modules/nexusbaseql';
import { resolvers } from './modules/database';
import { storagePath } from './config/app';
import PluginService from './services/PluginService';

let mainWindow: Electron.BrowserWindow;

const nexusbaseQl = new NexusbaseQl({
  path: storagePath,
  hook: new PluginService,
  resolvers
});

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  
  if (isDev) {
    mainWindow.webContents.openDevTools();
    
    // Install React Dev Tools
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
    
    installExtension(REACT_DEVELOPER_TOOLS).then((name:string) => {
      console.log(`Added Extension:  ${name}`);
    })
    .catch((err:any) => {
      console.log('An error occurred: ', err);
    });
  }
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
  event.returnValue = nexusbaseQl.resolve(arg);
});

/*
console.log(nexusbaseQl.resolve({
  records: {
    action: 'getRecords',
    args: {
      collectionId: 'L0K-xPoZO',
      sorts: []
    }
  }
}));
*/
