import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { firstValueFrom } from 'rxjs';
import { StockQuantity } from 'src/app/models/class/stock.model';
import { Orders } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/order.service';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';
import * as QRCode from "qrcode"

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
    private readonly ss: StockService,
  ) {}
  orderDetail = {} as Orders;
  isLoadding: boolean;
  data = {
    idOrder: 0,
    openPuching: false
  }
  product_id_arr: number[] = []
  promptpayQRCode: string = ''

  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      this.data.idOrder = param['id'];
      this.getOrderById(this.data.idOrder);
    });
    this.feedQrcode()
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
        this.isLoadding = true
        const update = this.orderDetail.line_items.map(async r =>{
          const findQuantity = await firstValueFrom(this.ss.getStockQuantityBySku(r.sku))
          const inventoryUpdate = {} as StockQuantity
          inventoryUpdate.all_back_quantity = (findQuantity.all_back_quantity - r.quantity)
          const result = await firstValueFrom(this.ss.inventoryUpdate(r.sku, inventoryUpdate))
          return result
        })
        if(update) {
          const updateOrders = {} as Orders
          updateOrders.status = "completed"
          updateOrders.id = this.orderDetail.id
          const changeStock = await firstValueFrom(this.os.updateOrder(updateOrders))
          if(changeStock){ 
            await this.getOrderById(this.data.idOrder)
            this.isLoadding = false
            this.swal.alert('success', 'inventory updated!!!', 3500)
          }
        }
        else{
          this.isLoadding = false
          this.swal.alert('error', "have a somting error for inventory updated")
        }


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
  feedQrcode() {
    const promptpayDetails = '0801478181';

    QRCode.toDataURL(promptpayDetails, (error, url) => {
      if (!error) {
        this.promptpayQRCode = url;
      } else {
        console.error('Error generating PromptPay QR code: ', error);
      }
    });
  }
}
