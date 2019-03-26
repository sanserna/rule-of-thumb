import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  feedbackColor: string;
  modalIcon: string;
  textColor = 'white';

  @Input() body: string;
  @Input() type: string;
  @Input() title: string;
  @Input() hideIcon: boolean;
  @Input() showCancelAction: boolean;
  @Input() cancelLabel: string;
  @Input() acceptLabel: string;

  constructor(public activeModal: NgbActiveModal) {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {
    let customTitle = '';

    switch (this.type) {
      case 'error':
        this.feedbackColor = 'danger';
        this.modalIcon = 'fa-ban';
        customTitle = 'Error';
        break;

      case 'warning':
        this.feedbackColor = 'warning';
        this.modalIcon = 'fa-exclamation-triangle';
        this.textColor = 'dark';
        customTitle = 'Alerta';
        break;

      case 'success':
        this.feedbackColor = 'success';
        this.modalIcon = 'fa-check';
        customTitle = 'Exito';
        break;

      case 'confirm':
        this.feedbackColor = 'info';
        this.modalIcon = 'fa-info';
        customTitle = 'Confirmación';
        break;

      case 'info':
        this.feedbackColor = 'info';
        this.modalIcon = 'fa-info';
        customTitle = 'Información';
        break;

      default:
        this.feedbackColor = 'light';
        this.textColor = 'black';
        break;
    }

    this.title = this.title || customTitle;
  }

  // COMPONENT METHODS ---------------------------------------------------------

  onAccept(): void {
    this.activeModal.close(true);
  }

  onCancel(): void {
    this.activeModal.dismiss();
  }

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
