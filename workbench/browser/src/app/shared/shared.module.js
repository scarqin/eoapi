"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var components_1 = require("./components");
var directives_1 = require("./directives");
var forms_1 = require("@angular/forms");
var drawer_1 = require("ng-zorro-antd/drawer");
var radio_1 = require("ng-zorro-antd/radio");
var button_1 = require("ng-zorro-antd/button");
var icon_1 = require("ng-zorro-antd/icon");
var tooltip_1 = require("ng-zorro-antd/tooltip");
var result_1 = require("ng-zorro-antd/result");
var dropdown_1 = require("ng-zorro-antd/dropdown");
var api_param_num_pipe_1 = require("./pipes/api-param-num.pipe");
var modal_service_1 = require("./services/modal.service");
var eo_service_1 = require("./services/eo/eo.service");
var COMPONENTS = [components_1.ToolbarComponent, components_1.SelectThemeComponent, components_1.SidebarComponent, components_1.NavbarComponent];
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        (0, core_1.NgModule)({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                drawer_1.NzDrawerModule,
                radio_1.NzRadioModule,
                button_1.NzButtonModule,
                icon_1.NzIconModule,
                tooltip_1.NzToolTipModule,
                result_1.NzResultModule,
                dropdown_1.NzDropDownModule,
            ],
            declarations: __spreadArray(__spreadArray([directives_1.WebviewDirective], COMPONENTS, true), [api_param_num_pipe_1.ApiParamsNumPipe], false),
            providers: [modal_service_1.ModalService, eo_service_1.EoService],
            exports: __spreadArray(__spreadArray([directives_1.WebviewDirective], COMPONENTS, true), [api_param_num_pipe_1.ApiParamsNumPipe], false),
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map