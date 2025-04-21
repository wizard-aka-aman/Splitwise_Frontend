import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],search:string): any {
    if(search == null || search.length == 0 || search == undefined){
      return value;
     }
     search = search.toLocaleLowerCase();
     return value.filter(item => {
      return item.paidBy.toLocaleLowerCase().includes(search);

     })
  }

}
