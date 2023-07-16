import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Orders } from '../models/interface/woocommerce.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  alert(icon: any, title: any, timer?: number) {
    if(!timer){
       timer = 1500
    }
    if(timer == null) {
       timer = 1500
    }
    const swAlert = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    swAlert.fire({
      icon: icon,
      title: title,
    });
    return swAlert;
  }

  
}
