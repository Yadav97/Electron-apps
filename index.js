//1.load the electron library
const electron = require('electron');

//2.take the some objects from the electron
const {app,BrowserWindow,Menu,ipcMain} = electron;
//here app is main object for create the electron process or mainwindow
//BrowserWindow is for create the window


//4.define the mainwindow variable by use of 'let' because of let ka scope function ke andar ho sakta hai but
//if we define let variable in function and access to outside function so they give error
let mainWindow;
let addWindow;


//3.whenever the event is ready the anonymous function is call
app.on('ready',()=>{

//5.making the BrowserWindow object and give the reference of object at mainwindow var
mainWindow = new BrowserWindow({});
//this object have settings of window like the height and the width

//6.now load the html documents
mainWindow.loadFile('main.html');
// mainwindow.loadFile(`file://${__dirname}/main.html`);
//here __dirname store the current directory but this technique is not working in linux


//closing whole app when 'closed' event is occurred ,when user click on 'x' so closed is occurred and function is call.
mainWindow.on('closed',()=>app.quit());

//8.buildFromTemplate are take the array of objects
const mainmenu = Menu.buildFromTemplate(menubar);
Menu.setApplicationMenu(mainmenu);
});

//13.open new window when user click on the 'add todo'
function addNewWindow()
{
addWindow = new BrowserWindow({height:200,width:300,title:'Add New Todo'});
addWindow.loadFile('add.html');
};
//16.now recieve the msg and execute the function
//import ipcMain
//here are todo mein 'value' var ki value store hogi
//here store the info about where the msf are come means the which window se message aa raha hai
ipcMain.on('todo is add',(event,todo)=>{

//here we send the text to the main.html file means mainwindow jiseme main.html load hai
mainWindow.webContents.send('add:todo',todo);


//addWindow.close(); is used for when the user click on 'add' so woh window apne aap close ho jaayegi 'add' par click karte hi
addWindow.close();
addWindow=null;
//we use garbage collector see paper6
})
// const menubar = [{label:'file'},{label:'edit'},{label:'Activities'}];
const menubar = [
               {
                 label:'file',
                 submenu:[
                          {label:'new todo',accelerator:process.platform === 'darwin'?'command+n' : 'ctrl+n',click(){addNewWindow();}},
                          {label:'clear todo',accelerator:process.platform === 'darwin' ? 'command+d': 'ctrl+d',click(){mainWindow.webContents.send('clear:todo')}},
                          {label:'quit',accelerator:process.platform === 'darwin' ? 'command+q' : 'ctrl+q',click(){app.quit();}}
                         ]
                },
               {label:'edit'},
               {label:'view'}
                ];
//7.create the array of objects
//and these objects are the menu bar elements like 'file','edit','view' at top of software
//label property is used to naming the menu that clicking on
//see top at atom there are 7 menus so in menubar there are 7 objevts defined by devloper

//9.create the submenu by simpl add the 'submenu' property with array of objects
//10.quit the whole app by add simply click(){} function
//whwn user clicks on quit submenu so the whole app is close

//11.now add the hotkeys means when user press ctrl+q,command+q so the whole app is close.
//we use property called 'accelerator' property

//12.add the new window for 'add todo', when user click on 'add todo' so new window open.but small then
//main window so we make a function because kitni baar bhi user todo add kar sakta hai

//13.//NOTE-->mac os par yeh menu bar alag dikh raha hai means jo 'file' menu hai woh electron
//menu ke peeche aa raha hai means 'file' is not appeared as expected so we done

if(process.platform === 'darwin')
	{
	menubar.unshift({});   //unshift add the element at begin of array;
	}

//14.open the develper tool if application is running on developemt environment
if(process.env.NODE_ENV !== 'production')
{
//if app run in production mode so not open the developer
//if app is not in production mode means so the app is in developemnt mode so open the developer tool
// also you used hotkeys with 'accelaretors'
  menubar.push({role:'reload'},{label:'develper tool', click(item,focusedWindow){focusedWindow.toggleDevTools();}});

}

// 15 recieve the text from 'add todo' window
//16.now clear the todo lists so we have crete the label 'clear todo' and make the click function whwenever the user
//click on 'clear todo' so the function is execiute and wer send the 'clear:todo' to main.html and in main.html we
//recieve the 'clear:todo' and execute the function  see main.html at last of ipcRenderer.on()
