import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Orders } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/order.service';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';
interface productid_arr   {
  id_product: number
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private readonly os: OrderService,
    private readonly swal: AlertService,
    private readonly ss: StockService
  ) {}
  orderDetail = {} as Orders;
  isLoadding: boolean;
  data = {
    idOrder: 0,
    openPuching: false
  }
  product_id_arr: number[] = []
  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      this.data.idOrder = param['id'];
      this.getOrderById(this.data.idOrder);
    });
  }
  getOrderById(id: number) {
    this.isLoadding = true;
    this.os.getOneOrder(id).subscribe(
      (result) => {
        this.orderDetail = result;
        console.log(this.orderDetail);
        this.isLoadding = false;
      },
      (err) => {
        this.swal.alert('error', `Error Message: ${err.message}`, 30000);
        this.isLoadding = false;
      }
    );
  }
  prushing() {
    Swal.fire({
      title: 'โปรดตรวจสอบให้แน่ใจว่ามีการขำระหรือยัง?',
      text: 'หากคุณคลิกยืนยัน ระบบจะทำการตัดสต็อกสต็อก หากมีข้อผิดพลาดจะไม่สามารถแก้ไขได้!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.data.openPuching = true
        this.product_id_arr = this.orderDetail.line_items.map((r) => {
          return r.product_id;
        });
        console.log(this.product_id_arr);

        // if (stock) {
        //   console.log('stock ', stock);

        //   const { value: url } = await Swal.fire({
        //     input: 'url',
        //     inputLabel: 'URL address',
        //     inputPlaceholder: 'Enter the URL' + JSON.stringify(stock),
        //   });
        //   if (url) {
        //     Swal.fire(`Entered URL: ${JSON.stringify(stock)}`);
        //   }
        // }
      }
    });
  }
  cancelOrder(id: number) {
    Swal.fire({
      title: 'คุณต้องการยกเลอกคำสั่งซื้อ หรือ ไหม?',
      text: 'หากคุณคลิกยืนยัน ระบบจะทำการตัดสต็อกสต็อก หากมีข้อผิดพลาดจะไม่สามารถแก้ไขได้!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
  deleteOrder(id: number) {
    this.isLoadding = true;

    const sub = this.os.deleteOrder(id).subscribe(
      (result) => {
        if (result) {
          this.isLoadding = false;
          this.router.navigate(['order/admin']);
        }
      },
      (err) => {
        this.isLoadding = false;
      },
      () => {
        sub.unsubscribe();
      }
    );
  }
}
