const { ipcRenderer } = require("electron");
let resultText = document.querySelector(".result-text");
let math = require("mathjs");
resultText.style.color = localStorage.getItem("sysColor");

ipcRenderer.on("setColor_to_render", function (e, color) {
  resultText.style.color = color;
  localStorage.setItem("sysColor", color);
});

ipcRenderer.on("add", () => {
  let fontsize = window.getComputedStyle(resultText, null).fontSize;
  let newfontsize = fontsize.replace("px", "") - 0 + 3;
  if (newfontsize >= 80) return;
  resultText.style.fontSize = newfontsize + "px";
  localStorage.setItem("sysFontSize", newfontsize);
});
ipcRenderer.on("sub", () => {
  let fontsize = window.getComputedStyle(resultText, null).fontSize;
  let newfontsize = fontsize.replace("px", "") - 0 - 3;
  if (newfontsize <= 20) return;
  resultText.style.fontSize = newfontsize + "px";
  localStorage.setItem("sysFontSize", newfontsize);
});
ipcRenderer.on("default", () => {
  resultText.style.fontSize = "50px";
  localStorage.setItem("sysFontSize", 50);
});
let result = "";
let main = {
  isEqual: false,
  isOpt: false,
  clickNum(num) {
    if (this.isEqual && !this.isOpt) {
      result = "";
      resultText.innerHTML = result;
      this.isEqual = false;
    }
    let isPoint = num === ".";
    if (result.indexOf(".") > 0 && isPoint) return;
    result = result.toString();
    result = result + num;
    resultText.innerHTML = result;
  },
  clickOpt(opt) {
    this.isOpt = true;
    switch (opt) {
      case "+/-":
        result = math.eval(result + "*-1");
        resultText.innerHTML = result;
        break;
      case "%":
        result = math.format(math.eval(result + "/100"), 4);
        resultText.innerHTML = result;
        break;
      default:
        result = result + opt;
        resultText.innerHTML = result;
        break;
    }
  },
  reset(){
      resultText.innerHTML = '0'
      result = ''
  },
  calc(){
      result = math.eval(result).toString()
      resultText.innerHTML = result
      this.isEqual = true
      this.isOpt = false
  }
};

document.oncontextmenu = () => {
    ipcRenderer.send('showContextMenu')
}