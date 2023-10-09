import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleWarehouse'
})
export class RoleWarehousePipe implements PipeTransform {

  transform(value: number ): any {
    switch(value) {
      case 0:
        return 'รอตอบรับ'
      case 1:
        return 'ผู้จัดการ';
      case 2:
        return 'หัวหน้า';
      case 3:
        return 'พลักงาน'
      case 4:
        return ''
    }
  }

}
