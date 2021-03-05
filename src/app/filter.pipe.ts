import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, input: any): any {
    if (input) {
      return value.filter(val => val.title?.indexOf(input) >= 0 || val.description?.indexOf(input) >= 0 || val.tags?.indexOf(input) >= 0);
    } else {
      return value;
    }
  }

}
