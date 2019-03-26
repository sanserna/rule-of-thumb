import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DialogComponent } from '@app-components/dialog/dialog.component';
import { DialogOptions } from '@app-models/dialog-options';

@Injectable({
  providedIn: 'root'
})
export class UserFeedbackControllerService {
  constructor(private _modalService: NgbModal) {}

  // DIALOG METHODS ------------------------------------------------------------

  openDialog(options: DialogOptions): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const modalRef = this._modalService.open(DialogComponent, {
        backdrop: 'static',
        centered: true
      });

      modalRef.componentInstance.body = options.body;
      modalRef.componentInstance.type = options.type;
      modalRef.componentInstance.title = options.title;
      modalRef.componentInstance.hideIcon = options.hideIcon;
      modalRef.componentInstance.cancelLabel = options.cancelLabel;
      modalRef.componentInstance.acceptLabel = options.acceptLabel;

      if (options.type === 'confirm') {
        modalRef.componentInstance.showCancelAction = true;
      } else {
        modalRef.componentInstance.showCancelAction = !!options.showCancelAction;
      }

      modalRef.result
        .then(res => {
          resolve(res);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  // HELPERS -------------------------------------------------------------------
}
