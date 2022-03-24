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
exports.SelectThemeComponent = void 0;
var core_1 = require("@angular/core");
var services_1 = require("../../../../core/services");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var SelectThemeComponent = /** @class */ (function () {
    function SelectThemeComponent(theme) {
        var _this = this;
        this.theme = theme;
        this.visibleChange = new core_1.EventEmitter();
        this.destroy$ = new rxjs_1.Subject();
        this.currentTheme = this.theme.currentTheme;
        this.getThemes();
        this.theme
            .onThemeChange()
            .pipe((0, operators_1.map)(function (_a) {
            var name = _a.name;
            return name;
        }), (0, operators_1.takeUntil)(this.destroy$))
            .subscribe(function (name) {
            _this.currentTheme = name;
        });
    }
    SelectThemeComponent.prototype.getThemes = function () {
        this.THEMES = this.theme.getThemes();
    };
    SelectThemeComponent.prototype.changeTheme = function (name) {
        this.theme.changeTheme(name);
    };
    SelectThemeComponent.prototype.close = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    SelectThemeComponent.prototype.ngOnInit = function () { };
    SelectThemeComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    __decorate([
        (0, core_1.Input)(),
        __metadata("design:type", Boolean)
    ], SelectThemeComponent.prototype, "visible", void 0);
    __decorate([
        (0, core_1.Output)(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectThemeComponent.prototype, "visibleChange", void 0);
    SelectThemeComponent = __decorate([
        (0, core_1.Component)({
            selector: 'eo-select-theme',
            templateUrl: './select-theme.component.html',
            styleUrls: ['./select-theme.component.scss'],
        }),
        __metadata("design:paramtypes", [services_1.ThemeService])
    ], SelectThemeComponent);
    return SelectThemeComponent;
}());
exports.SelectThemeComponent = SelectThemeComponent;
//# sourceMappingURL=select-theme.component.js.map