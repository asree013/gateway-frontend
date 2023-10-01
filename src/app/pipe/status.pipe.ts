import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string | null): any {
    switch(value){
      case 'on-hold':
        return 'ฉบับร่าง'
      case 'processing':
        return 'กำลังดำเนินการ'
      case 'completed':
        return 'จัดส่งสำเร็จ'
      case 'cancelled':
        return 'ยกเลิก'
      case 'pending':
        return 'รอดำเนินการ'
    }
  }

}
