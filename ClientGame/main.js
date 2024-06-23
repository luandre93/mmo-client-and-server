const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: __dirname + "/src/icon/application.ico",
    height: 800,
    width: 1032,
    center: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      sandbox: false,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
    },
    resizable: false,
  });
  win.setMenu(null);
  win.webContents.openDevTools();

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
