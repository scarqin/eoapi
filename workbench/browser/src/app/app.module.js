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
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
//Other module
var core_module_1 = require("./core/core.module");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var modal_1 = require("ng-zorro-antd/modal");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, core_1.NgModule)({
            declarations: [app_component_1.AppComponent],
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                core_module_1.CoreModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                modal_1.NzModalModule
            ],
            providers: [
                {
                    provide: '$scope',
                    useFactory: function (i) { return i.get('$rootScope'); },
                    deps: ['$injector'],
                },
            ],
            bootstrap: [app_component_1.AppComponent],
        }),
        __metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map