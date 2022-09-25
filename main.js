//electron 入口文件

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
//启动main.js文件自动触发app的ready事件
app.on("ready", function () {
  //这个事件一般进行当前应用窗口的创建
  creactWindow();
});

function creactWindow() {
  let win = new BrowserWindow({
    width: 300,
    height: 490,
    title: "计算器",
  });
  win.loadURL(path.join(__dirname, "views/index.html"));

  // win.webContents.openDevTools();
  win.on("ready-to-show", function () {
    win.show();
    win.focus();
  });
  win.on("close", function (e) {
    win = null;
    app.quit();
  });

  ipcMain.on("color_to_main", function (event, color) {
    win.webContents.send("setColor_to_render", color);
  });
  require("./mainProgress/menu");
  const createTray = require("./mainProgress/tray");
  createTray(win);
}
