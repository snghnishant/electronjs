console.log("Main process working");

// import dependencies
const electron = require('electron');
const app = electron.app; // for handling events
const BrowserWindow = electron.BrowserWindow; // for ui
const path = require('path');
const url = require('url');


let win; // reference to window

// function to create a window
function createWindow(){
    win = new BrowserWindow(); // create a new browser window
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol:'file', // we are serving file from the filesystem
        slashes: true
    }));

    // to open with chromium dev tools
    win.webContents.openDevTools();

    // event handling for closing the application so it can be garbage collected
    win.on("closed",()=>{
        win = null;
    });
}



//create a window after app initialization
app.on('ready', createWindow);

//to explicitly close the application
app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

// code for handling on mac
app.on('activate', ()=>{
    if(win === null){
        createWindow();
    }
});
