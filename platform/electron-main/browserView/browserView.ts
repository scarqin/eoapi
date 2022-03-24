import { BrowserWindow, BrowserView, session, BrowserViewConstructorOptions } from 'electron';
import { ViewBounds } from '../../../shared/common/bounds';
import { proxyOpenExternel } from '../../../shared/common/browserView';
import { BrowserViewOpts } from './browserView.type';
export class BrowserViewInstance {
  bounds: ViewBounds;
  constructor(private opts: BrowserViewOpts) {
    this.bounds = this.opts.bounds;
  }
  init(win: BrowserWindow) {
    const ses = session.fromPartition(this.opts.partition);
    ses.setPreloads([this.opts.preloadPath]);
    let viewOps: BrowserViewConstructorOptions = {
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        webviewTag: true,
        session: ses,
      },
    };
    if (this.opts.preload) {
      viewOps.webPreferences.preload = this.opts.preload;
    }
    let view = new BrowserView(viewOps);
    view.webContents.loadURL(this.opts.viewPath).finally();
    view.webContents.openDevTools();
    win.addBrowserView(view);
    view.setBounds(this.bounds);
    proxyOpenExternel(view);
    return view;
  }
}
