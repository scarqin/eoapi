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
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var sidebar_service_1 = require("./sidebar.service");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(sidebar) {
        var _this = this;
        this.sidebar = sidebar;
        this.destroy = false;
        this.isCollapsed = this.sidebar.getCollapsed();
        this.sidebar
            .onCollapsedChange()
            .pipe((0, operators_1.takeWhile)(function () { return !_this.destroy; }))
            .subscribe(function (isCollapsed) {
            _this.isCollapsed = isCollapsed;
        });
    }
    SidebarComponent.prototype.toggleCollapsed = function () {
        this.sidebar.toggleCollapsed();
    };
    SidebarComponent.prototype.ngOnInit = function () { };
    SidebarComponent.prototype.ngOnDestroy = function () {
        this.destroy = true;
    };
    SidebarComponent = __decorate([
        (0, core_1.Component)({
            selector: 'eo-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss'],
        }),
        __metadata("design:paramtypes", [sidebar_service_1.SidebarService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map