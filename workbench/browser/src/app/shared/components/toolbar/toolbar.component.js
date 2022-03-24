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
exports.ToolbarComponent = void 0;
var core_1 = require("@angular/core");
var sidebar_service_1 = require("../sidebar/sidebar.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(sidebar) {
        var _this = this;
        this.sidebar = sidebar;
        this.showThemeDrawer = false;
        this.destroy$ = new rxjs_1.Subject();
        this.sideBarCollapsed = this.sidebar.getCollapsed();
        this.sidebar
            .onCollapsedChange()
            .pipe((0, operators_1.takeUntil)(this.destroy$))
            .subscribe(function (isCollapsed) {
            _this.sideBarCollapsed = isCollapsed;
        });
    }
    ToolbarComponent.prototype.toggleCollapsed = function () {
        this.sidebar.toggleCollapsed();
    };
    ToolbarComponent.prototype.changeTheme = function () {
        this.showThemeDrawer = true;
    };
    ToolbarComponent.prototype.ngOnInit = function () { };
    ToolbarComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    ToolbarComponent = __decorate([
        (0, core_1.Component)({
            selector: 'eo-toolbar',
            templateUrl: './toolbar.component.html',
            styleUrls: ['./toolbar.component.scss'],
        }),
        __metadata("design:paramtypes", [sidebar_service_1.SidebarService])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
//# sourceMappingURL=toolbar.component.js.map