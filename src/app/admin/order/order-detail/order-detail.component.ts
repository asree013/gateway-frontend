import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Orders } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private readonly service: OrderService,
    private readonly swal: AlertService,
  ) {}
  orderDetail = {} as Orders;
  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      let id = param['id'];
      this.getOrderById(id);
    });
  }
  getOrderById(id: number) {
    this.service.getOneOrder(id).subscribe((result) => {
      console.log(result);
      this.orderDetail = result;
    },
    err => {
      this.swal.alert('error', `Error Message: ${err.message}`, 30000)
    });
  }
}
