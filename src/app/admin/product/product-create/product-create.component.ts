import { Component, OnInit } from '@angular/core';
import { Images, Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';
import { Branch } from 'src/app/models/class/branch.model';
import {
  ProductStockCreate,
  StockCreate,
  StockQuantity,
  Stocks,
} from 'src/app/models/class/stock.model';
import { StockService } from 'src/app/services/stock.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private ps: ProductService,
    private swal: AlertService,
    private router: Router,
    private readonly brachService: BranchService,
    private readonly ss: StockService
  ) {}
  cannotClick: boolean;
  formProduct = {} as ProductStockCreate;
  cartFont: any[] = [];
  imagePrevetn: string = '';
  url = environment.baseUrl;
  upload: boolean;
  createItem: boolean;
  isLoadding: boolean;
  txtSKU: string 
  ngOnInit() {}

  uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const local = localStorage.getItem('session')
    const session = JSON.parse(local)
    const baerer = session.jwt

    this.upload = true;
    this.cannotClick = true;
    if(files){
      const formData = new FormData()
      formData.append('file', files[0])
      const sub = this.ps.addImageInWrodpress(formData, String(baerer)).subscribe(
        (response: any) => {
          this.cannotClick = false
          this.upload = false
          let image = response.guid.raw
          console.log('this path image: ', image);
          this.imagePrevetn = String(image)
        },
        err=> {
          this.cannotClick = false
          this.upload = false
          console.log({
            message: 'is error upload image',
            err: err
          });

        },
        () => {
          sub.unsubscribe()
        }
      )
    }
    // if (files) {
    //   const formData = new FormData();
    //   formData.append('file', files[0]);
    //   const sub = this.ps.uploadImageProduct(formData).subscribe(
    //     (result: any) => {
    //       this.cannotClick = false;
    //       this.upload = false;
    //       this.imagePrevetn = result.filename;
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.cannotClick = false;
    //       this.upload = false;
    //     },
    //     () => {
    //       sub.unsubscribe();
    //     }
    //   );
    // }
  }
  async addProduct() {
    this.isLoadding = true
    let branch_id = localStorage.getItem('branch_id');
    if (branch_id) {
      const result: Branch = await this.brachService
        .getById(Number(branch_id))
        .toPromise();
      if (!result) {
        this.swal.alert('warning', 'is not branch in database');
        this.isLoadding = false
      }
      else{
        try {
          const image: Partial<Images>[] = [];
          const product = {} as Products;
          product.name = `${this.formProduct.name} (${result.title})`;
          product.sku = this.formProduct.sku;
          product.description = this.formProduct.description;
          product.manage_stock = true
          product.stock_quantity = 0
          if(this.imagePrevetn.length > 0){
            image.push({ src: this.imagePrevetn});
            product.images = [{ src: this.imagePrevetn }];
          }
          console.log('product', product);

          const createProduct = await this.ps.addProduct(product).toPromise()
          console.log(createProduct);

          const stock = {} as StockCreate;
          stock.name_product = product.name;
          stock.branch_id = Number(localStorage.getItem('branch_id'));
          stock.picture = this.imagePrevetn;
          stock.price = this.formProduct.price;
          stock.p1 = this.formProduct.p1;
          stock.p2 = this.formProduct.p2;
          stock.p3 = this.formProduct.p3;
          stock.p4 = this.formProduct.p4;
          stock.product_id = Number(localStorage.getItem('user_id'));
          stock.stock_external = this.formProduct.stock_external;
          stock.stock_internal = this.formProduct.stock_internal;
          stock.product_id = createProduct.id;
          stock.sku = this.formProduct.sku;

          const createStock = await this.ss.create(stock).toPromise()
          console.log(createStock);

          const stockQ = {} as StockQuantity
          stockQ.name = product.name
          stockQ.picture = this.imagePrevetn
          stockQ.sku = this.formProduct.sku
          stockQ.all_back_quantity = this.formProduct.stock_internal
          stockQ.all_front_quantity = this.formProduct.stock_external
          const createStockQuantity = await this.ss.addStockQuantity(stockQ).toPromise()
          if(createStockQuantity){
            console.log("stockQuantity: " ,createStockQuantity);
            const update = {} as Products
            update.regular_price = createStock.price.toString()
            update.stock_quantity = (createStock.stock_external + createStock.stock_internal)
            console.log('is stock: ', update);

            const updateProduct = await this.ps.editProduct(createProduct.id ,update).toPromise()
            if(updateProduct){
              this.router.navigate(['product/admin'])
              this.isLoadding = false
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      this.swal.alert('warning', 'You connot select Branch');
    }
  }

  async onCreateProduct() {
    if (this.cartFont.length <= 0) {
      this.swal.alert('warning', 'Cart is null');
    } else {
      this.createItem = true;
      this.cannotClick = true;
      const result = await this.ps.addProducts(this.cartFont).subscribe(
        (result) => {
          this.createItem = false;
          this.cannotClick = true;
          this.swal.alert('success', `เพิ่มในฐานข้อมูลเรียบร้อย!!!`);
          this.router.navigate(['product/admin']);
        },
        (err) => {
          this.createItem = true;
          this.cannotClick = true;
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
  piceP1(){
    let price = (document.getElementById("price") as HTMLInputElement).value
    this.formProduct.p1 = Number(price)
  }

  async checkSKU() {
    let sku = (document.getElementById("sku") as HTMLInputElement)
    sku.classList.remove('is-invalid')
    this.txtSKU = ''
    const findSku = await this.ss.getStockQuantityBySku(String(sku.value)).toPromise()
    if(findSku){
      sku.classList.add('is-invalid')
      this.txtSKU = '*ไม่สามารถใช้ SKU นี้ได้'
    }
  }
}
