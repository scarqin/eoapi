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
exports.ModalService = void 0;
var core_1 = require("@angular/core");
var modal_1 = require("ng-zorro-antd/modal");
var ModalService = /** @class */ (function () {
    function ModalService(modalService) {
        this.modalService = modalService;
    }
    ModalService.prototype.create = function (inOpts) {
        var modalOpts = {
            nzTitle: 'modal title',
            nzContent: inOpts.nzContent,
            nzClosable: 'nzClosable' in inOpts ? inOpts.nzClosable : true,
            nzComponentParams: {
                title: 'title in component',
                subtitle: 'component sub title，will be changed after 2 sec',
            },
            nzFooter: [
                {
                    label: '确认',
                    type: 'primary',
                    onClick: function () {
                        if (inOpts.nzOnOk) {
                            inOpts.nzOnOk();
                        }
                        else {
                            modal.destroy();
                        }
                    },
                },
                {
                    label: '取消',
                    onClick: function () { return modal.destroy(); },
                },
            ],
        };
        Object.assign(modalOpts, inOpts);
        var modal = this.modalService.create(modalOpts);
        return modal;
    };
    ModalService = __decorate([
        (0, core_1.Injectable)(),
        __metadata("design:paramtypes", [modal_1.NzModalService])
    ], ModalService);
    return ModalService;
}());
exports.ModalService = ModalService;
//# sourceMappingURL=modal.service.js.map