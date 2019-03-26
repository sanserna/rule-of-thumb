import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { isNull } from 'lodash';

@Directive({
  selector: 'button[appExternalUrl]'
})
export class ExternalUrlDirective {
  @Input('appExternalUrl') url: string;

  constructor(private _el: ElementRef) {}

  @HostListener('click', ['$event'])
  clicked(event: Event) {
    if (isNull(this.url)) {
      return;
    }

    event.preventDefault();

    window.open(this.url, '_blank');
  }
}
