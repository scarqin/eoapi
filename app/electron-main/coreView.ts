import { BrowserView, screen, BrowserWindow, session, ipcMain } from 'electron';
import { BrowserViewInstance } from '../../platform/electron-main/browserView/browserView';
import * as path from 'path';
import { subView } from './main';
import { processEnv } from '../../platform/node/constant';
export class CoreViews {
  moduleID: string;
  view: BrowserView;
  constructor(private win: BrowserWindow) {
    this.triggleEvent = this.triggleEvent.bind(this);
  }
  /**
   * create core module browserview with sidebar/navbar/toolbar
   */
  create() {
    const size = screen.getPrimaryDisplay().workAreaSize;
    this.view = new BrowserViewInstance({
      bounds: {
        x: 0,
        y: 0,
        width: size.width * 0.8,
        height: size.height * 0.8,
      },
      partition: '<core-module>',
      //preloadPath: path.join(process.cwd(), 'workbench', 'electron-browser', 'preload.js'),
      preloadPath: path.join(__dirname, '../../', 'workbench', 'electron-browser', 'preload.js'),
      viewPath:
        processEnv === 'development'
          ? 'http://localhost:4201'
          : `file://${path.join(process.cwd(), 'workbench', 'browser', 'dist', 'index.html')}`,
    }).init(this.win);
    this.watch();
  }
  watch() {
    ipcMain.on('message', this.triggleEvent);
  }
  triggleEvent(event, arg) {
    console.log(`core view ${event.frameId}: recieve render msg=>`, arg, arg.action);
    if (event.frameId !== 1) return;
    switch (arg.action) {
      case 'connect-dropdown': {
        this.win.setTopBrowserView((arg.data.action === 'show' ? subView.mainView : subView.appView).view);
        break;
      }
      case 'setBounds': {
        //sidebar shrink or expand
        break;
      }
    }
  }
  /**
   * 删除视图
   * @param view
   * @param window
   */
  remove() {
    if(!this.view) return;
    this.win.removeBrowserView(this.view);
    this.view.webContents.closeDevTools();
    ipcMain.removeListener('message', this.triggleEvent);
    this.view = undefined;
  }
}
