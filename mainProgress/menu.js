const { app, BrowserWindow, dialog, Menu, ipcMain } = require("electron");
const path = require("path");
let template = [
  {
    label: "zp计算器",
    submenu: [
      {
        label: "关于",
        click: function () {
          aboutWindow();
        },
      },
      {
        label: "退出",
        // role: "quit",
        click: function (item, win, event) {
          dialog.showMessageBox(
            {
              type: "info",
              title: "退出提示",
              message: "请问是否真的退出",
              buttons: ["确定", "取消"],
            },
            (index) => {
              if (index == 0) win.destroy();
            }
          );
        },
      },
    ],
  },
  {
    label: "格式",
    submenu: [
      {
        label: "颜色",
        accelerator: (function () {
          if (process.platform == "darwin") return "command+shift+c";
          else return "control+shift+c";
        })(),
        click: function () {  
            setColor()
        }
      },
      {
          label: '字体增大',
          accelerator: 'F11',
          click: function (menuItem, win, event) {  
              win.webContents.send('add')
          }
      },{
          label:'字体减小',
          accelerator: 'F12',
          click: function (menuItem, win, event) { 
              win.webContents.send('sub')
           }
      },{
          label:'默认字体',
          accelerator: 'F10',
          click: function (menuItem, win, event) {  
              win.webContents.send('default')
          }
      }
    ],
  },
];
let menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
function aboutWindow() {
  let win = new BrowserWindow({
    width: 260,
    height: 260,
    title: "关于zp计算器",
  });
  win.loadURL(path.join(__dirname, "../views/about.html"));
  win.setMenu(null);
}

function setColor() {
    let win = new BrowserWindow({
        width: 250,
        height: 100,
        title: '选择颜色'
    })
    win.loadURL(path.join(__dirname, '../views/color.html'))
    win.setMenu(null)
}
ipcMain.on('showContextMenu', e => {
    let win = BrowserWindow.fromWebContents(e.sender)
    menu.popup(win)
})