import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterById'
})
export class FilterByIdPipe implements PipeTransform {
  transform(items:Array<any>, id?: string | number) {  /// TODO : id: string.
    return items.find(item => item.id == id);
  }
}
