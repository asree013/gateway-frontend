import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleWarehouse'
})
export class RoleWarehousePipe implements PipeTransform {

  transform(value: number ): any {
    switch(value) {
      case 0:
        return 'waiting for status confirmation'
      case 1:
        return 'Admin';
      case 2:
        return 'editer';
      case 3:
        return 'reader'
      case 4:
        return ''
    }
  }

}
