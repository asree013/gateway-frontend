import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Line_Items,
  Orders,
  Products,
} from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent implements OnInit {
  product: Products[] = [];
  listCart: Array<Partial<Line_Items>> = [];
  displayStlye: string = 'none';
  constructor(
    private readonly service: ProductService,
    private readonly orderService: OrderService,
    private readonly router: Router,
    private readonly swal: AlertService
  ) {}

  ngOnInit(): void {
    this.feedProducts();
  }
  feedProducts() {
    this.service.getProductAll().subscribe(
      (result) => {
        if (!result) {
          this.swal.alert('warning', 'is no Product in Database', 2500);
        }
        this.product = result;
      },
      (err) => {
        this.swal.alert('error', `error Message:${err.message}`, 40000);
      }
    );
  }
  addProduct(item: Products) {
    const isProduct = this.listCart.find((f) => f.product_id === item.id);
    if (!isProduct) {
      this.listCart.push({
        product_id: item.id,
        quantity: 1,
        price: Number(item.price),
        name: item.name,
        images: item.images,
      });
    } else {
      isProduct.quantity += 1;
    }
  }
  clearItem() {
    this.listCart = [];
  }
  async createOrders(order: Orders) {
    this.orderService.addOrder(order).subscribe(
      (result) => {
          this.router.navigate([`/order/detail/${result.id}`]);
      },
      (err) => {
        this.swal.alert('error', `Order Error message:${err}`);
      }
    );
  }
  buyProducts() {
    if (this.listCart.length === 0) {
      this.swal.alert('warning', 'คุณยังไม่ได้เลือกสินค้า', 3000);
    } else {
      let order = {} as Orders;
      order.billing = {
        first_name: 'บุคคลทั่วไป',
        last_name: '',
        address_1: '969 Market',
        address_2: '',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US',
        email: 'john.doe@example.com',
        phone: '(555) 555-5555',
      };
      order.shipping = {
        first_name: 'John',
        last_name: 'Doe',
        address_1: '969 Market',
        address_2: '',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US',
        company: 'asdfasdf',
      };
      order.shipping_lines = [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: `${this.sumProduct()}`,
        },
      ];
      order.line_items = this.listCart;
      Swal.fire({
        title: 'ชำระเลย?',
        text: `ยอดที่ชำระทั้งสิ้น ${this.sumProduct()}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ชำระ',
        cancelButtonText: 'ยกเลิก',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.createOrders(order);
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        }
      });
    }
  }
  sumProduct() {
    let data = this.listCart.reduce((cerrent, prev) => {
      return cerrent + prev.price * prev.quantity;
    }, 0);
    return Number(data);
  }
}