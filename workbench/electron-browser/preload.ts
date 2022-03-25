import { ipcRenderer } from 'electron';
//import { StorageListenArgs, StorageProcessType } from '../../shared/browser/IndexedDB/types';

ipcRenderer.on('connect-main',(event,msg)=>{
  console.log(event,msg)
})

let storageCallback = null; 
ipcRenderer.on('storageCallback', (event, result) => {
  console.log('storageCallback');
  if (storageCallback && typeof storageCallback === 'function') {
    storageCallback(result);
  }
});

window['eo'] = {
  toogleViewZIndex(visible) {
    ipcRenderer.send('message', {
      action: 'connect-dropdown',
      data: {
        action: visible ? 'show' : 'hide',
      },
    });
  },
  getModules() {
    return ipcRenderer.sendSync('eo-sync', { action: 'getModules' });
  },
  openApp(inputArg){
    return ipcRenderer.sendSync('eo-sync', { action: 'openApp',data:inputArg });
  },
  storage(args, callback: any) {
    console.log('run preload storage');
    storageCallback = callback;
    args.type = 'default'; 
    return ipcRenderer.sendSync('eo-storage', args);
  },
  storageSync(args) {
    console.log('run preload storageSync');
    args.type = 'sync'; 
    return ipcRenderer.sendSync('eo-storage', args);
  },
  storageRemote(args) {
    console.log('run preload storageRemote');
    args.type = 'remote'; 
    let output = ipcRenderer.sendSync('eo-storage', args);
    while (!output) {
      try {
        output = window.require('@electron/remote').getGlobal('shareObject').storageResult;
      } catch (e) {
        console.log(e);
        break;
      }
    }
    try {
      window.require('@electron/remote').getGlobal('shareObject').storageResult = null;    
    } catch (e) {
      console.log(e);
    }
    return output;
  },
};
