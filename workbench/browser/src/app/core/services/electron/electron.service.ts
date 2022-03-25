import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, app } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { StorageHandleStatus, StorageListenArgs, StorageProcessType } from '../../../../../../../shared/browser/IndexedDB';
import { storage } from '../../../../../../../shared/browser/IndexedDB/lib';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  childProcess: typeof childProcess;
  fs: typeof fs;
  path: typeof path;
  app: typeof app;

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.path= window.require('path');
      this.app = window.require('electron').app;
      // Notes :
      // * A NodeJS's dependency imported with 'window.require' MUST BE present in `dependencies` of both `app/package.json`
      // and `package.json (root folder)` in order to make it work here in Electron's Renderer process (src folder)
      // because it will loaded at runtime by Electron.
      // * A NodeJS's dependency imported with TS module import (ex: import { Dropbox } from 'dropbox') CAN only be present
      // in `dependencies` of `package.json (root folder)` because it is loaded during build phase and does not need to be
      // in the final bundle. Reminder : only if not used in Electron's Main process (app folder)

      // If you want to use a NodeJS 3rd party deps in Renderer process,
      // ipcRenderer.invoke can serve many common use cases.
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
      this.storageListen();
    } 
  }

  /**
   * 存储监听处理
   * @param args 
   */
  private storageListenHandle(args: StorageListenArgs): void {
    const action: string = args.action || undefined;
    const result = {
      status: StorageHandleStatus.invalid,
      data: undefined 
    };
    if (storage && storage[action] && typeof storage[action] === 'function') {
      storage[action].apply(args.params).subscribe((result: any) => {
        if (result) {
          result.status = StorageHandleStatus.success;
          result.data = result;
        } else {
          result.status = StorageHandleStatus.empty;
        }
        this.storageListenHandleNotify(args.type, result);
      }, (error: any) => {
        console.log(error);
        result.status = StorageHandleStatus.error;
        this.storageListenHandleNotify(args.type, result);
      });
    } else {
      this.storageListenHandleNotify(args.type, result);
    }
  }

  /**
   * 数据存储监听通知返回 
   * @param type 
   * @param result 
   */
  private storageListenHandleNotify(type: string, result: object): void {
    try {
      if (StorageProcessType.default === type) {
        this.ipcRenderer.send('eo-storage', {type: 'result', result: result});
      } else if (StorageProcessType.sync === type) {
        const storageTemp = this.path.join(this.app.getPath('home'), '.eo', 'tmp.storage');
        this.fs.writeFileSync(storageTemp, JSON.stringify(result));
      } else if (StorageProcessType.remote === type) {
        window.require('@electron/remote').getGlobal('shareObject').storageResult = result;
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  /**
   * 开启数据存储监听
   * @returns 
   */
  private storageListen(): void {
    this.ipcRenderer.on('eo-storage', (event, args: StorageListenArgs) => this.storageListenHandle(args));
  }       

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
}
