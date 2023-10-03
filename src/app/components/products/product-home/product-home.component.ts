import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from 'src/app/models/class/searh.model';
import { StockList, StockQuantity, Stocks } from 'src/app/models/class/stock.model';
import {
  Billing,
  Line_Items,
  Orders,
  Shipping,
} from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/order.service';
import { StockService } from 'src/app/services/stock.service';
import * as $ from 'jquery';
import { UsersService } from 'src/app/services/users.service';
import { Districts, Provinces, Sectors, SubDistricts, province_id } from 'src/app/models/class/province.model';
import { AuthenService } from 'src/app/services/authen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent implements OnInit {
  focus: boolean;
  stockItem: Stocks[] = [];
  sku: string[] = [];
  cartsScan = {} as Stocks;
  listCart: any[] = [];
  displayStlye: string = 'none';
  dataSearch = new Search<Partial<any>>();
  barcode = '9551009843811';
  totalPrice: number = 0;
  p: boolean;
  selectedType: string = '';
  disableButton: boolean;
  itemShipping = {} as Shipping;
  isLoadding: boolean;
  billing = {} as Billing
  itemProvince = {} as province_id
  isSector: Sectors[] = []
  isProvince: Provinces[] = []
  isDistrict: Districts[] = []
  isCity: SubDistricts[] = []
  itemBilling = {
    city: '',
    state: '',
    postcode: '',
    country: 'TH',
    company: '',
    phone: ''
  }
  itemDeatil = {
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    email: '',
  }
  el_back_stock = {
    modalStock: false,
    element: {} as Stocks
  }
  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router,
    private readonly swal: AlertService,
    private readonly stockService: StockService,
    private readonly us: UsersService,
    private readonly as: AuthenService,
  ) {}

  ngOnInit(): void {
    this.loadBilling()
    this.getBranch()
    this.feedProvince()
  }
  feedProducts() {
    const sub = this.stockService.getStockAll().subscribe(
      (result: any) => {
        if (!result) {
          this.swal.alert('warning', 'is no Product in Database', 2500);
        }
        this.stockItem = result;
        this.sku = result;
      },
      (err) => {
        console.log(err);
        this.swal.alert('error', `error Message:${err.message}`, 40000);
      },
      () => {
        sub.unsubscribe();
      }
    );
    //   (result: any) => {
    //     if (!result) {
    //       this.swal.alert('warning', 'is no Product in Database', 2500);
    //     }
    //     this.product = result;
    //     this.sku = result
    //     console.log(result.sku);

    //     console.log('sku: ', this.sku);

    //   },
    //   (err) => {
    //
    //   }
    // );
  }
  clearItem() {
    this.listCart = [];
    this.totalPrice = 0;
  }
  buyProducts() {
    if (this.selectedType === '' || this.listCart.length === 0) {
      this.disableButton = true;
    } else {
      Swal.fire({
        title: 'ยืนยันการชำระ?',
        text: "เมื่อกดยืนยันระบบจะทำการตัดสต็อก โปรดเช็คให้แน่ใจว่าต้องการยืนยัน",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            this.disableButton = false;
            this.isLoadding = true
            let arr = this.listCart.map(r => {
              return {
                quantity: r.quantity,
                product_id: r.product_id,
                name: r.name_product,
                price: r.price,
                total: String(r.price * r.quantity)
              }
            })
            const order = {} as Orders
            const billing = {} as Billing
            order.set_paid = false
            if(this.selectedType === 'money'){
              order.payment_method = "cod"
              order.payment_method_title = 'Cash on delivery'
              billing.first_name = 'ซื่อหน้าร้าน'
              billing.last_name = 'ซื่อหน้าร้าน',
              billing.address_1 = this.itemDeatil.address_1
              billing.address_2 = this.itemDeatil.address_2
              billing.city = this.itemBilling.city
              billing.company = this.itemBilling.company
              billing.email = this.itemDeatil.email
              billing.country = this.itemBilling.country
              billing.phone = this.itemBilling.phone
              billing.postcode = this.itemBilling.postcode
              billing.state = this.itemBilling.state
              order.billing = billing
            }
            if(this.selectedType === 'scan') {
              order.payment_method = 'bacs'
              order.payment_method_title = 'Direct bank transfer'
              billing.first_name = 'ซื่อหน้าร้าน'
              billing.last_name = 'ซื่อหน้าร้าน',
              billing.address_1 = this.itemDeatil.address_1
              billing.address_2 = this.itemDeatil.address_2
              billing.city = this.itemBilling.city
              billing.company = this.itemBilling.company
              billing.email = this.itemDeatil.email
              billing.country = this.itemBilling.country
              billing.phone = this.itemBilling.phone
              billing.postcode = this.itemBilling.postcode
              billing.state = this.itemBilling.state
              order.billing = billing
            }
            if( this.selectedType === 'credit'){
              order.payment_method = 'cheque'
              order.payment_method_title = 'Check payments'
              order.billing = {
                first_name: this.itemDeatil.first_name,
                last_name: this.itemDeatil.last_name,
                address_1: this.itemDeatil.address_1,
                address_2: this.itemDeatil.address_2,
                city: this.itemBilling.city,
                company: this.itemBilling.company,
                country: this.itemBilling.country,
                email: this.itemDeatil.email,
                postcode: this.itemBilling.postcode,
                state: this.itemBilling.state
              }
            }
            order.shipping = this.itemShipping
            order.customer_id = Number(localStorage.getItem('user_id'))
            order.line_items = arr
            order.shipping_lines = [
              {
                method_id: "flat_rate",
                method_title: "Flat Rate",
              }
            ]
            const item = {} as StockQuantity
            const action = this.listCart.map(async r => {
              item.sku = r.sku,
              item.all_front_quantity = r.quantity
              const updateInventory = await this.stockService.inventoryUpdate(item.sku ,item).toPromise()
              return console.log(updateInventory);
            })
            if(action) {
              const createOrder = await this.orderService.addOrder(order).toPromise()
              this.router.navigate([`/order/detail/${createOrder.id}`]);
              this.isLoadding = false
            }
          } catch (err) {
            this.swal.alert('error', `Order Error message:${err}`);
            this.isLoadding = false
          }
        }
      })

    }

  }
  sumProduct() {
    let data = this.listCart.reduce((cerrent, prev) => {
      return cerrent + prev.price * prev.quantity;
    }, 0);
    return Number(data);
  }
  async searchData(event: Event) {
    const value = event.target as HTMLInputElement;
    this.dataSearch.data[value.id] = value.value;
    value.value = ''

    const result = await this.stockService.search(this.dataSearch).toPromise()
    if(result){
      this.cartsScan = result[0]
      const findStockQuantity = await this.stockService.searchStockQuantity(this.dataSearch).toPromise()

      if(result.length < 1){
        this.swal.alert('error', 'ไม่มี SKU นี้ในระบบ', 5500)
      }
      else {
        const findIdProduct = this.listCart.find(
          (r) => r.id === this.cartsScan.id
        );
        if (!findIdProduct) {
          this.listCart.push({
            br_name: this.cartsScan.br_name,
            price: Number(this.cartsScan.price),
            picture: this.cartsScan.picture,
            quantity: 1,
            id: this.cartsScan.id,
            name_product: this.cartsScan.name_product,
            idStockQunatity: findStockQuantity.map(r => r.id),
            stock_internal: findStockQuantity.map(r => r.all_back_quantity),
            stock_external:  findStockQuantity.map(r => r.all_front_quantity),
            sell_total: this.cartsScan.sell_total,
            p1: this.cartsScan.p1,
            p2: this.cartsScan.p2,
            p3: this.cartsScan.p3,
            p4: this.cartsScan.p4,
            branch_id: this.cartsScan.branch_id,
            sku: this.cartsScan.sku,
            product_id: this.cartsScan.product_id,
          });
          value.value = '';
          this.totalPrice = this.sumProduct();
          this.p = true;
          console.log('listCart', this.listCart);

        } else {
          findIdProduct.quantity += 1;
          value.value = '';
          this.totalPrice = this.sumProduct();
          this.p = true;
          console.log('listCart', this.listCart);

        }
      }
    }

  }
  selectPriceForBuy(idProduct: number, value?: { p: string }) {
    console.log(idProduct);
    const find = this.listCart.find((p) => {
      p.id === idProduct;
    });
    if (!find) {
      this.listCart = this.listCart.map((r) => {
        if (r.id === idProduct) {
          switch (value.p) {
            case 'p1':
              r.price = r.p1;
              this.totalPrice = this.sumProduct();
              break;
            case 'p2':
              r.price = r.p2;
              this.totalPrice = this.sumProduct();
              break;
            case 'p3':
              r.price = r.p3;
              this.totalPrice = this.sumProduct();
              break;
            case 'p4':
              r.price = r.p4;
              this.totalPrice = this.sumProduct();
              break;
          }
        }
        return r;
      });
    } else {
      alert('have some error');
    }

    // if (value.p === '') {
    //   console.log(value.p);
    //   this.totalPrice = this.sumProduct();
    //   this.p = true;
    //   this.p1 = false;
    //   this.p2 = false;
    //   this.p3 = false;
    //   this.p4 = false;
    // }
    // if (value.p === 'p1') {
    //   console.log(value.p);
    //   this.totalPrice = this.sumProductP1();
    //   this.p = false;
    //   this.p1 = true;
    //   this.p2 = false;
    //   this.p3 = false;
    //   this.p4 = false;
    // }
    // if (value.p === 'p2') {
    //   console.log(value.p);
    //   this.totalPrice = this.sumProductP2();
    //   this.p = false;
    //   this.p1 = false;
    //   this.p2 = true;
    //   this.p3 = false;
    //   this.p4 = false;
    // }
    // if (value.p === 'p3') {
    //   this.totalPrice = this.sumProductP3();
    //   this.p = false;
    //   this.p1 = false;
    //   this.p2 = false;
    //   this.p3 = true;
    //   this.p4 = false;
    // }
    // if (value.p === 'p4') {
    //   this.totalPrice = this.sumProductP4();
    //   this.p = false;
    //   this.p1 = false;
    //   this.p2 = false;
    //   this.p3 = false;
    //   this.p4 = true;
    // }
  }
  selectBuying(event: Event) {
    let toggleSp = $('#toggleSp');
    if (event) {
      const value = (event.target as HTMLInputElement).value;
      if (value === 'moneny') {
        this.selectedType = 'moneny'
        if (!toggleSp.hasClass('displayNone')) {
          toggleSp.slideToggle().addClass('displayNone');
        }
        else{
          return
        }
      }  else if (value === 'scan') {
        this.selectedType = 'scan';
        if (!toggleSp.hasClass('displayNone')) {
          toggleSp.slideToggle().addClass('displayNone');
        }
        else{
          return
        }

      } else {
        this.selectedType = 'credit';
        if (toggleSp.hasClass('displayNone')) {
          toggleSp.slideToggle().removeClass('displayNone');
        } else {
          toggleSp.slideToggle().addClass('displayNone');
        }
      }
    }
  }
  deleteListCart(id: number) {
    Swal.fire({
      title: 'คุณต้องการลบ?',
      text: "คุณต้องการลบสินค้าในตะกร้าสินค้าใช่ไหม?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบสินค้านี้!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.swal.alert('success', 'deleted item')
        this.listCart = this.listCart.filter((r) => {
          return r.id !== id;
        })
        this.totalPrice = this.sumProduct()
      }
    });

  }
  loadBilling() {
    this.isLoadding = true
    let user_id = localStorage.getItem('user_id')
    if(user_id){
      const sub = this.us.findBillingByUser_id(Number(user_id)).subscribe(
        result => {
          this.itemShipping = result.shipping
          this.isLoadding = false
        },
        () => {
          sub.unsubscribe()
        }
      )
    }
  }
  getBranch() {
    const sub = this.as.getSector().subscribe(
      result => {
        this.isSector = result
      },
      () => {
        sub.unsubscribe()
      }
    )
  }
  feedProvince() {
    let sector = document.getElementById('sector')
    let province = document.getElementById('province')
    let district = document.getElementById('district')
    let city = document.getElementById('city')
    sector.addEventListener('change', async (e) => {
      const value = (e.target as HTMLInputElement).value
      let province = await this.as.getProvince(Number(value)).toPromise()
      if(province){
        this.isProvince = province
      }
    })
    province.addEventListener('change', async (e) => {
      const value = (e.target as HTMLInputElement).value
      const district = await this.as.getDistrict(Number(value)).toPromise()
      const result: any = await this.as.getProvinceById(Number(value)).toPromise()
      if(district){
        this.isDistrict = district
        if(result){
          this.itemBilling.state = result.name_th
        }
      }
    })
    district.addEventListener('change', async (e) => {
      const value = (e.target as HTMLInputElement).value
      const city = await this.as.getSubDistrict(Number(value)).toPromise()
      if(city){
        this.isCity = city
      }
    })
    city.addEventListener('change', async (e) => {
      const value = (e.target as HTMLInputElement).value
      const result: any = await this.as.getSubDistrictById(Number(value)).toPromise()
      if(result){
        console.log(result);
        this.itemBilling.postcode = result.zip_code
        this.itemBilling.city = result.name_th
      }
    })

  }
  discount(value: any) {
    this.totalPrice = this.totalPrice - Number(value)
  }
  changQuantity(num: number, id: number, index: number) {
    let front = document.getElementById(`front${index}`)
    const check = this.listCart.find(r => r.id === id)
    front.classList.remove('alert')
    if(num > check.stock_external) {
      this.swal.alert('warning', 'จำนวนหน้าร้านมีไม่เพียงพอต่อการขาย กรุณาเบิกของหลังร้าน!!', 7500)
      front.classList.add('alert')
    }
    else{
      check.quantity = num
      this.totalPrice = this.sumProduct();
    }
  }
  async editStockQuantity(sku: string) {
    const element = this.listCart.find(r => r.sku === sku)
    this.el_back_stock.element = element
    this.el_back_stock.modalStock = true

  }
  returnItem(value: StockQuantity) {
    if(value) {
      const findListcCard = this.listCart.find(r => r.id)
      if(findListcCard){
        findListcCard.stock_internal = value.all_back_quantity
        findListcCard.stock_external = value.all_front_quantity
        console.log("findListCard: " ,findListcCard);

      }
    }
  }

}
