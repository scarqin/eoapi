import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiData, StorageHandleResult, StorageHandleStatus } from '../../../../../../../platform/browser/IndexedDB';
import { MessageService } from '../../shared/services/message';
import { StorageService } from '../../shared/services/storage';
@Injectable()
export class ApiService {
  constructor(
    private modalService: NzModalService,
    private messageService: MessageService,
    private storage: StorageService
  ) {}

  copy(apiData: ApiData): void {
    delete apiData.uuid;
    delete apiData.createdAt;
    apiData.name += ' Copy';
    window.sessionStorage.setItem('apiDataWillbeSave', JSON.stringify(apiData));
    this.messageService.send({ type: 'copyApi', data: apiData });
  }

  delete(apiData: ApiData): void {
    this.modalService.confirm({
      nzTitle: '删除确认?',
      nzContent: `确认要删除数据 <strong title="${apiData.name}">${
        apiData.name.length > 50 ? apiData.name.slice(0, 50) + '...' : apiData.name
      }</strong> 吗？删除后不可恢复！`,
      nzOnOk: () => {
        const result: StorageHandleResult = this.storage.run('apiDataRemove', [apiData.uuid]);
        if (result.status === StorageHandleStatus.success) {
          this.messageService.send({ type: 'deleteApi', data: { uuid: apiData.uuid } });
        }
      },
    });
  }
  bulkDelete(apis) {
    const result: StorageHandleResult = this.storage.run('apiDataBulkRemove', [apis]);
    if (result.status === StorageHandleStatus.success) {
      this.messageService.send({ type: 'bulkDeleteApi', data: { uuids: apis } });
    }
  }
  export(apiData: ApiData){
    console.log(apiData);
  }
  bulkExport(groups){

  }
}
