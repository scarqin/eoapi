import { Component, OnInit } from '@angular/core';
import { resolve } from 'path';

@Component({
  selector: 'eo-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.scss'],
})
export class ExtensionComponent implements OnInit {
  constructor() {
    window['eo'] = {
      promiseFun() {
        console.log(window['eo'].promiseFun.caller)
        return new Promise((resolve) => {
          resolve(1);
        });
      },
    };
    window.addEventListener('message', function (e) {
      console.log('main recieve iframe data: ', e.data);
    });
  }

  ngOnInit(): void {
    let iframe = document.getElementById('iframe') as HTMLIFrameElement;
    iframe.contentWindow.postMessage({ test: 1 });
    var bHeight = iframe.contentWindow.document.body.scrollHeight;
    var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
    var height = Math.max(bHeight, dHeight);
    iframe.height = `${height}px`;
  }
}
