import ModuleManager from '../../shared/node/extension-manager/manager';
import { ModuleInfo, ModuleManagerInterface, ModuleType } from '../../shared/node/extension-manager/types';
import { getViewBounds, SlidePosition, ViewBounds, ViewZone } from '../../shared/common/bounds';
import { BrowserView, BrowserWindow } from 'electron';
import * as path from 'path';
import { BrowserViewInstance } from '../../platform/electron-main/browserView/browserView';
import { processEnv } from '../../platform/node/constant';
const browserViews: Map<ViewZone, BrowserView> = new Map();
const moduleManager: ModuleManagerInterface = ModuleManager();
export class AppViews {
  moduleID: string;
  slidePosition: SlidePosition = SlidePosition.left;
  constructor(private win: BrowserWindow) {}
  /**
   * 根据模块ID启动app模块的加载
   * @param moduleID
   * @param load
   */
  create(moduleID: string) {
    this.moduleID = moduleID;
    const module: ModuleInfo = moduleManager.getModule(moduleID, true);
    if (module && module.type === ModuleType.app) {
      let refresh: boolean = false;
      if (module.isApp && this.moduleID !== module.moduleID) {
        this.moduleID = module.moduleID;
        this.slidePosition = module.slidePosition;
        refresh = true;
      }
      return this.createAppView(module, refresh);
    }
  }
  /**
   * 删除视图
   * @param view
   * @param window
   */
  remove(view: BrowserView) {
    if (view) {
      this.win.removeBrowserView(view);
      // window.webContents.executeJavaScript(`window.init()`);
      view = undefined;
    }
  }
  /**
   * 创建主视图，主要从模块载入文件
   * @param module
   * @param window
   */
  private createAppView(module: ModuleInfo, refresh: boolean): BrowserView {
    const windBounds = this.win.getContentBounds();
    const _bounds: ViewBounds = getViewBounds(ViewZone.main, windBounds.width, windBounds.height, this.slidePosition);
    let _view: BrowserView = new BrowserViewInstance({
      bounds: _bounds,
      partition: `<${module.moduleID}>`,
      preloadPath: path.join(process.cwd(),'platform','electron-browser','preload.js'),
      preload: module.preload,
      viewPath: processEnv === 'development' ? 'http://localhost:4200' : `file://${module.main}`,
    }).init(this.win);
    _view.webContents.once('did-finish-load', () => {
      _view.setBackgroundColor('#FFF');
    });
    _view.webContents.once('dom-ready', () => {
      _view.setBounds(_bounds);
      if (browserViews.has(ViewZone.main)) {
        this.remove(browserViews.get(ViewZone.main));
        browserViews.delete(ViewZone.main);
      }
      browserViews.set(ViewZone.main, _view);
      _view.webContents.openDevTools();
      //view.setAutoResize({ width: true });
      //this.win.webContents.executeJavaScript(`window.getModules1()`);
    });
    return _view;
  }
}
