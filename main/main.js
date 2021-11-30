const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const ejse = require("ejs-electron");

// Store
const storePath = path.normalize(path.join(__dirname, '../store/counter.js'))
const store = require(storePath)
///

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"),
    },
  });
}

app.on("ready", () => {
  let rendererPath = path.normalize(path.join(__dirname, '../renderer/index.ejs'));
  ejse.data({
    title: "Template electron-ejs-basic",
    counter: store.counter_get()
  });
  createWindow();
  mainWindow.loadURL(rendererPath);
  mainWindow.webContents.openDevTools();
});

ipcMain.on('counter:set', (event, arg) => {
  store.counter_set(arg)
})

ipcMain.on('counter:incr', (event) => {
  store.counter_incr()
  event.reply('counter:fetch', store.counter_get())
})

ipcMain.on('storage:setitem', (event, arg) => {
  mainWindow.webContents
    .executeJavaScript(`localStorage.setItem("${arg.name}", "${arg.value}");`, true)
    .then(() => {
      event.reply('storage:fetch', arg)
    });
})

