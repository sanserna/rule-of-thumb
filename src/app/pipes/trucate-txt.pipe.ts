import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trucateTxt'
})
export class TrucateTxtPipe implements PipeTransform {
  transform(
    value: string,
    limit = 25,
    completeWords = false,
    ellipsis = '...'
  ) {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}
