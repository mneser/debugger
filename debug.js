const { app, BrowserWindow, Menu } = require('electron')
const preload = require('path').join(__dirname, 'preload.js')
const fs = require('fs')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('ready', () => {
    fs.writeFileSync(preload, `window.require = mod => (mod == 'node-fetch') ? window.fetch : require(mod)`)
    fs.writeFileSync('index.html', `<script src='${process.argv[2]}'></script>`)

    const win = new BrowserWindow({
        title: ` JS debug : ${process.argv[2]}`,
        webPreferences: { contextIsolation: false, preload }
    })

    win.loadFile('index.html')
    win.webContents.openDevTools()

    Menu.setApplicationMenu(Menu.buildFromTemplate([
        { role: 'reload' },
        { role: 'toggleDevTools', label: 'Tools' },
        { role: 'quit' }
    ]))
})