"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var services_1 = require("../../../core/services");
var eo_service_1 = require("../../services/eo/eo.service");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(electron, eo) {
        this.electron = electron;
        this.eo = eo;
        this.isMaximized = false;
        this.isElectron = true;
        this.OS_TYPE = navigator.platform.toLowerCase();
        this.isElectron = this.electron.isElectron;
    }
    NavbarComponent.prototype.changeHelpVisible = function (visible) {
        this.eo.toogleViewZIndex(visible);
    };
    NavbarComponent.prototype.minimize = function () {
        this.electron.ipcRenderer.send('message', {
            action: 'minimize',
        });
    };
    NavbarComponent.prototype.toggleMaximize = function () {
        this.electron.ipcRenderer.send('message', {
            action: this.isMaximized ? 'restore' : 'maximize',
        });
        this.isMaximized = !this.isMaximized;
    };
    NavbarComponent.prototype.close = function () {
        this.electron.ipcRenderer.send('message', {
            action: 'close',
        });
    };
    NavbarComponent.prototype.ngOnInit = function () {
        if (this.isElectron) {
            console.log(window.eo['getModules']());
            this.modules = this.electron.ipcRenderer.sendSync('eo-sync', { type: 'getModules' });
            console.log(this.modules);
        }
        else {
            this.modules = new Map();
        }
    };
    NavbarComponent.prototype.getModules = function () {
        return Array.from(this.modules.values());
    };
    NavbarComponent.prototype.openApp = function (moduleID) {
        this.electron.ipcRenderer.sendSync('eo-sync', { type: 'openApp', moduleID: moduleID });
    };
    NavbarComponent = __decorate([
        (0, core_1.Component)({
            selector: 'eo-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss'],
        }),
        __metadata("design:paramtypes", [services_1.ElectronService, eo_service_1.EoService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map