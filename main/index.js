const { app, BrowserWindow, ipcMain } = require('electron');

// import { app, BrowserWindow, ipcMain } from 'electron';
const { format } = require('url');
const path = require('path');
const osrs = require('osrs-wrapper');
const isDev = require('electron-is-dev');
const fs = require('fs');
let mainWindow;

ipcMain.on('get-user-stats', (event, username) => {
    osrs.hiscores
        .getPlayer(username)
        .then(({ Skills: { Prayer: prayer, Magic: magic } }) => {
            event.sender.send('user-stats', null, {
                prayer,
                magic,
            });
        })
        .catch(err => {
            event.sender.send('user-stats', err.message);
        });
});

ipcMain.on('get-rune-prices', async event => {
    const runes = ['Blood', 'Body', 'Nature', 'Soul'];
    const runePrices = {};

    for (let rune of runes) {
        const runeData = JSON.parse(await osrs.ge.getItem(`${rune} rune`));

        runePrices[rune.toLowerCase()] = runeData.item.current.price;
    }

    event.sender.send('rune-prices', runePrices);
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 1200,
        webPreferences: {
            webSecurity: false,
        },
    });

    const jsUrl = isDev
        ? 'http://localhost:3000'
        : format({
              pathname: path.join(__dirname, '/../build/index.html'),
              protocol: 'file:',
              slashes: true,
          });

    mainWindow.loadURL(jsUrl);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
