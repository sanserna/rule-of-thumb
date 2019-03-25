import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthModalComponent } from '@app-components/auth-modal/auth-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthViewControllerService {
  constructor(private _modalService: NgbModal) {}

  openAuthDialog(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const modalRef = this._modalService.open(AuthModalComponent, {
        size: 'sm',
        backdrop: 'static',
        centered: true
      });

      modalRef.result
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }
}
