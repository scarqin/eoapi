"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiParamsNumPipe = void 0;
var core_1 = require("@angular/core");
var ApiParamsNumPipe = /** @class */ (function () {
    function ApiParamsNumPipe() {
    }
    ApiParamsNumPipe.prototype.transform = function (params) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof params !== 'object') {
            return 0;
        }
        return params.filter(function (val) { return val.name; }).length;
    };
    ApiParamsNumPipe = __decorate([
        (0, core_1.Pipe)({
            name: 'apiParamsNum',
            pure: false,
        })
    ], ApiParamsNumPipe);
    return ApiParamsNumPipe;
}());
exports.ApiParamsNumPipe = ApiParamsNumPipe;
//# sourceMappingURL=api-param-num.pipe.js.map