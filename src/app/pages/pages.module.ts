import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ExtensionComponent } from './extension/extension.component';

@NgModule({
  declarations: [PagesComponent, ExtensionComponent],
  imports: [PagesRoutingModule, FormsModule, SharedModule],
  exports: []
})
export class PagesModule {}
