import { app, BrowserWindow, ipcMain } from 'electron';
import { format } from 'url';
import path from 'path';
import osrs from 'osrs-wrapper';
import isDev from 'electron-is-dev';
import getItemService from './services/item-price';
let mainWindow;

let updateInterval;
// 10 minutes
const updateIntervalTime = 600000;

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
    const runes = ['blood', 'body', 'nature', 'soul'].map(rune => `${rune} rune`);

    const runePrices = await getItemService().getItemPrices(runes);

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

    updateInterval = setInterval(getItemService().updateItemPrices, updateIntervalTime);

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
    updateInterval && clearInterval(updateInterval);
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
