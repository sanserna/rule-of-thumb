import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appBgImg]'
})
export class BgImageDirective implements AfterViewInit, OnChanges {
  @Input('appBgImg') backgroundImage: string;

  constructor(private _el: ElementRef) {}

  ngAfterViewInit() {
    this._el.nativeElement.style.backgroundPosition = '50% 50%';
    this._el.nativeElement.style.backgroundRepeat = 'no-repeat';
    this._el.nativeElement.style.backgroundSize = 'cover';

    this._setupElementBgImage(this.backgroundImage);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.backgroundImage.isFirstChange()) {
      this._setupElementBgImage(changes.backgroundImage.currentValue);
    }
  }

  private _setupElementBgImage(backgroundImage: string): void {
    this._el.nativeElement.style.backgroundImage = `url(${backgroundImage})`;
  }
}
