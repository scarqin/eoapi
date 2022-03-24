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
  view: BrowserView;
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
   */
  remove() {
    if(!this.view) return;
    this.view.webContents.closeDevTools();
    this.win.removeBrowserView(this.view);
    // window.webContents.executeJavaScript(`window.init()`);
    this.view = undefined;
  }
  /**
   * 创建主视图，主要从模块载入文件
   * @param module
   * @param window
   */
  private createAppView(module: ModuleInfo, refresh: boolean): BrowserView {
    const windBounds = this.win.getContentBounds();
    const _bounds: ViewBounds = getViewBounds(ViewZone.main, windBounds.width, windBounds.height, this.slidePosition);
    let _view = new BrowserViewInstance({
      bounds: _bounds,
      partition: `<${module.moduleID}>`,
      preloadPath: path.join(process.cwd(), 'platform', 'electron-browser', 'preload.js'),
      preload: module.preload,
      viewPath: processEnv === 'development' ? 'http://localhost:4200' : `file://${module.main}`,
    }).init(this.win);
    this.view=_view;
    this.view.webContents.once('did-finish-load', () => {
      _view.setBackgroundColor('#FFF');
    });
    this.view.webContents.once('dom-ready', () => {
      _view.setBounds(_bounds);
       _view.webContents.openDevTools();
      //_view.setAutoResize({ width: true });
      //this.win.webContents.executeJavaScript(`window.getModules1()`);
    });
    return this.view;
  }
}
