const { ipcRenderer } = require('electron');
console.log('eoapi public api load');
// 可以加上条件判断，根据不同模块id哪些允许放出
const apiAccessRules = ipcRenderer.sendSync('eo-sync', { action: 'getApiAccessRules' }) || [];

let storageCallback = null; 
ipcRenderer.on('storageCallback', (event, result) => {
  console.log('storageCallback');
  if (storageCallback && typeof storageCallback === 'function') {
    storageCallback(result);
  }
});
// 其他子应用可访问的api队列都集中到.eo上
window.eo = {
  name: 'Eoapi public api',
  version: '1.0.0',
};
// 边栏显示
window.eo.sidePosition = ipcRenderer.sendSync('eo-sync', { action: 'getSidePosition' }) || 'left';
// 获取模块列表
if (apiAccessRules.includes('getModules')) {
  window.eo.getModules = () => {
    return ipcRenderer.sendSync('eo-sync', { action: 'getModules' });
  };
}
// 获取App应用列表
if (apiAccessRules.includes('getAppModuleList')) {
  window.eo.getAppModuleList = () => {
    return ipcRenderer.sendSync('eo-sync', { action: 'getAppModuleList' });
  };
}
// 获取边栏应用列表
if (apiAccessRules.includes('getSlideModuleList')) {
  window.eo.getSlideModuleList = () => {
    return ipcRenderer.sendSync('eo-sync', { action: 'getSlideModuleList' });
  };
}
// Hook请求返回
if (apiAccessRules.includes('hook')) {
  window.eo.hook = (data) => {
    return ipcRenderer.sendSync('eo-sync', { action: 'hook', data: data });
  };
}
// 临时测试用
window.eo.tempApi = (params) => {
  return ipcRenderer.sendSync('eo-sync', params);
};
window.eo.openModal = () => {
  return ipcRenderer.sendSync('eo-sync', { action: 'openModal' });
};
window.eo.closeModal = () => {
  return ipcRenderer.sendSync('eo-sync', { action: 'closeModal' });
};
window.eo.toogleViewZIndex = (visible) => {
  ipcRenderer.send('message', {
    action: 'connect-dropdown',
    data: {
      action: visible ? 'show' : 'hide',
    },
  });
};
window.eo.getModules = () => {
  return ipcRenderer.sendSync('eo-sync', { action: 'getModules' });
};
window.eo.openApp = (inputArg) => {
  return ipcRenderer.sendSync('eo-sync', { action: 'openApp', data: inputArg });
};
window.eo.storage = (args, callback: any) => {
  console.log('run preload storage');
  storageCallback = callback;
  args.type = 'default'; 
  ipcRenderer.send('eo-storage', args);
};
window.eo.storageSync = (args) => {
  console.log('run preload storageSync');
  args.type = 'sync'; 
  return ipcRenderer.sendSync('eo-storage', args);
};
window.eo.storageRemote = (args) => {
  console.log('run preload storageRemote');
  args.type = 'remote'; 
  const shareObject = window.require('@electron/remote').getGlobal('shareObject');
  shareObject.storageResult = null; 
  ipcRenderer.send('eo-storage', args);
  let output: any = shareObject.storageResult;;
  let count: number = 0;
  while (output === null) {
    if (count > 1500) {
      output = {
        status: 'error',
        data: 'storage remote load error' 
      };
      break;
    }
    output = shareObject.storageResult;
    ++count;
  }
  shareObject.storageResult = null; 
  return output;
};