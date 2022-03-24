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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var common_1 = require("@angular/common");
var theme_model_1 = require("./theme.model");
var ThemeService = /** @class */ (function () {
    function ThemeService(document) {
        this.document = document;
        this.currentTheme = 'classic_forest';
        this.themeChanges$ = new rxjs_1.ReplaySubject(1);
        this.onThemeChange = function () {
            return this.themeChanges$.pipe((0, operators_1.share)());
        };
    }
    ThemeService.prototype.changeTheme = function (name) {
        if (name) {
            this.themeChanges$.next({ name: name, previous: this.currentTheme });
            this.currentTheme = name;
        }
        this.insertCss("".concat(this.currentTheme, ".css"));
    };
    ThemeService.prototype.getThemes = function () {
        return theme_model_1.THEMES;
    };
    ThemeService.prototype.insertCss = function (address) {
        var head = this.document.getElementsByTagName('head')[0];
        var themeLink = this.document.getElementById('eoapi_theme');
        if (themeLink) {
            themeLink.href = address;
        }
        else {
            var style = this.document.createElement('link');
            style.id = 'eoapi_theme';
            style.rel = 'stylesheet';
            style.href = address;
            head.appendChild(style);
        }
    };
    ThemeService = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        }),
        __param(0, (0, core_1.Inject)(common_1.DOCUMENT)),
        __metadata("design:paramtypes", [Document])
    ], ThemeService);
    return ThemeService;
}());
exports.ThemeService = ThemeService;
//# sourceMappingURL=theme.service.js.map