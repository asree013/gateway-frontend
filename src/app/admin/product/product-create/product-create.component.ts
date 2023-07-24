import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private service: ProductService,
    private swal: AlertService,
    private router: Router
  ) {}
  cannotClick: boolean
  cartFont: any[] = [];
  imagePrevetn:string = ''
  upload: boolean
  createItem:boolean
  ngOnInit(){}

  uploadImage(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files as FileList
    const local = localStorage.getItem('session')
    const session = JSON.parse(local)
    const baerer = session.jwt

    this.upload = true
    this.cannotClick = true
    if(files){
      const formData = new FormData()
      formData.append('file', files[0])
      this.service.addImageInWrodpress(formData, String(baerer)).subscribe(
        (response: any) => {
          this.cannotClick = false
          this.upload = false
          let image = response.guid.raw
          console.log(image);
          this.imagePrevetn = String(image)
        },
        err=> {
          this.cannotClick = false
          this.upload = false
          console.log(err);
        }
      )
    }


  }
  addCartFornt(item: Products) {
    console.log(item.stock_quantity)
    let findNameProduct = this.cartFont.find((name) => name.name === item.name);

    if (!findNameProduct) {
      this.cartFont.push({
        name: item.name,
        regular_price: item.regular_price,
        stock_quantity: Number(item.stock_quantity),
        sku: item.sku,
        images: [
          {
            src: this.imagePrevetn,
          },
        ],
      })
      this.swal.alert('success', 'Add Products in Cart')
    } else {
      findNameProduct.stock_quantity += 1;
      this.swal.alert('success', 'Add Products in Cart')
    }
  }
  async onCreateProduct() {
    if(this.cartFont.length <= 0){
      this.swal.alert('warning', 'Cart is null')
    }
    else{
      this.createItem = true
      this.cannotClick = true
    this.service.addProducts(this.cartFont).subscribe(
      (result) => {
        this.createItem = false
        this.cannotClick = true
        this.swal.alert('success', `เพิ่มในฐานข้อมูลเรียบร้อย!!!`);
        this.router.navigate(['product/admin']);
      },
      (err) => {
        this.createItem = true
        this.cannotClick = true
        this.swal.alert(
          'warning',
          JSON.stringify(
            `เกิดข้อผิดผล้าดในการเพิ่มข้อมูล!!!! errorMessage: ${err.message}`
          ),
          3000
        );
      }
    );
    }
  }
}
