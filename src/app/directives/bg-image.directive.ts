import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appBgImg]'
})
export class BgImageDirective implements AfterViewInit {
  @Input('appBgImg') backgroundImage: string;

  constructor(private _el: ElementRef) {}

  ngAfterViewInit() {
    this._el.nativeElement.style.backgroundPosition = '50% 50%';
    this._el.nativeElement.style.backgroundRepeat = 'no-repeat';
    this._el.nativeElement.style.backgroundSize = 'cover';
    this._el.nativeElement.style.backgroundImage = `url(${
      this.backgroundImage
    })`;
  }
}
