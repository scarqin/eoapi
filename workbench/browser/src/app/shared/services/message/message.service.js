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
exports.MessageService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * @description
 * A message queue global send and get message
 */
var MessageService = /** @class */ (function () {
    function MessageService() {
        this.subject = new rxjs_1.Subject();
    }
    /**
     * send message
     *
     * @param message
     */
    MessageService.prototype.send = function (message) {
        this.subject.next(message);
    };
    /**
     * get message
     *
     * @returns message mutation observer
     */
    MessageService.prototype.get = function () {
        return this.subject.asObservable();
    };
    MessageService = __decorate([
        (0, core_1.Injectable)(),
        __metadata("design:paramtypes", [])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map