import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appBgImg]'
})
export class BgImageDirective implements AfterViewInit {
  private _el: HTMLElement;

  @Input('appBgImg') backgroundImage: string;

  constructor(element: ElementRef) {
    this._el = element.nativeElement;
  }

  ngAfterViewInit() {
    this._el.style.backgroundImage = `url(${this.backgroundImage})`;
  }
}
