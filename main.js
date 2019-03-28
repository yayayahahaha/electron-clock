const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')

const path = require('path')
const url = require('url')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    // darwin = MacOS
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

function createWindow() {
    // create the browser window
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        maximizable: false
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // open devtools
    win.webContents.openDevTools()

    // when window close
    win.on('closed', () => {
        win = null
    })

    ipcMain.on('download', (event, arg) => {
        console.log(event);
        console.log(typeof event);

        console.log('=====================');

        console.log(arg);
        console.log(typeof arg);
    })

}