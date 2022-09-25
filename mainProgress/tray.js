const { Tray, Menu, dialog } = require("electron");
const path = require("path");

function createTray(win) {
  const tray = new Tray(path.join(__dirname, "../images/icon.ico"));
  const menu = Menu.buildFromTemplate([
    {
      label: "退出",
      click: function () {
        dialog.showMessageBox(
          {
            type: "info",
            title: "请问是否真的退出？",
            buttons: ["确定", "取消"],
          },
          (index) => {
            if (index == 0) {
              win.destroy();
              tray.destroy();
            }
          }
        );
      },
    },
  ]);
  tray.setToolTip("zp计算器");
  tray.setContextMenu(menu);

  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
    win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
  });
}
module.exports = createTray;
