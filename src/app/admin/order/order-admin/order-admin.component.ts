import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css'],
})
export class OrderAdminComponent implements OnInit {
  orders: Orders[] = [];
  ordersFilter: Orders[] = []
  isLoadding: boolean
  constructor(
    private service: OrderService,
    private route: Router,
    private swal: AlertService
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }
  getOrder() {
    
    this.isLoadding = true
    return this.service.getOrderAll().subscribe(
      (result) => {
        if (result.length == 0) {
          this.isLoadding = false
          this.swal.alert('warning', 'is no Product in Database', 2500);
        }
        console.log(result)
        const find = result.filter(r => {
          return r.line_items.filter(r=> r.name.includes(`(${localStorage.getItem('branch_title')})`))
        })
        this.orders = find;
        this.ordersFilter = this.orders
        this.isLoadding = false
      },
      (err) => {
        this.isLoadding = false
        this.swal.alert(
          'warning',
          JSON.stringify(`Server Carshed!!!  Error Message: ${err.message}`),
          50000
        );
      }
    );
  }
  onDelete(item: Orders) {
    let id = item.id;
    Swal.fire({
      title: `ต้องการลบ ${item.billing}`,
      text: 'หากคุณลบข้อมูลจะหายออกจากฐานข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ลบมัน!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.service.deleteOrder(id).subscribe((result) => {
          this.getOrder()
        });
      }
    });
  }
  detailOrder(id: number) {
    this.route.navigate([`/order/detail/${id}`])
  }
  onCreateProduct() {
    this.route.navigate(['/products'])
  }
  filterOrders(value: string){
    console.log('search');
    console.log(this.orders);
    
    this.ordersFilter = this.orders.filter(r=> {
      return r.date_created === new Date(value)
    })
  }
}
