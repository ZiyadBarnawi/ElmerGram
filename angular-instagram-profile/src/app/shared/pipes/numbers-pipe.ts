import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbers',
})
export class NumbersPipe implements PipeTransform {
  transform(value: number | string, ...args: unknown[]): unknown {
    const valueLength = (value + '').length;
    if (valueLength < 3) return value;
    else if (valueLength > 3 && valueLength < 7) {
      return Math.trunc((value as number) / 1000) + 'K';
    } else if (valueLength >= 7 && valueLength < 9) {
      return Math.trunc((value as number) / 1000000) + 'M';
    } else if (valueLength >= 9) return '💥';
    return value;
  }
}
