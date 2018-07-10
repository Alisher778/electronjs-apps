const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const ffmpeg = require('fluent-ffmpeg');

let mainWindow;
app.on("ready", () => {
  mainWindow  = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`)
});

ipcMain.on('videoSubmited', (event, path)  => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log(metadata.format.duration)
    mainWindow.webContents.send('videoMetadata', metadata.format.duration)
  });
});
