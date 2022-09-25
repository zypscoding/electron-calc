const { ipcRenderer } = require("electron");

let spans = document.getElementById('box').querySelectorAll('span')
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function () {  
        let currentColor = this.dataset['color']
        ipcRenderer.send('color_to_main', currentColor)
    }
}