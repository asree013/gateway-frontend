import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from 'src/app/models/class/branch.model';
import { StockCreate, StockQuantity, Stocks } from 'src/app/models/class/stock.model';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { BranchService } from 'src/app/services/branch.service';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-stock-create-byid',
  templateUrl: './stock-create-byid.component.html',
  styleUrls: ['./stock-create-byid.component.css']
})
export class StockCreateByidComponent implements OnInit {
  nImg = environment.noImgae
  productDetail = {} as Products;
  idProduct: number
  valueStockInIdProduct: Stocks[] = []
  noImage = environment.noImgae
  isLodding: boolean
  item:Stocks = {} as Stocks
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly stockSrevice: StockService,
    private readonly swal: AlertService,
    private locatoin: Location,
  ) { }

  ngOnInit(): void {
    this.feedForLoading()
    this.checkStockByIdProdcut()
  }
  feedForLoading() {
    this.activeRoute.params.subscribe(
      async param => {
        this.idProduct = param['id']
        this.isLodding = true
        let result = await this.productService.getProductOne(this.idProduct).toPromise()
        if(result){
          this.isLodding = false
          this.productDetail = result
        }
      }
    )
  }
  checkStockByIdProdcut() {
    this.stockSrevice.getStockByIdProduct(this.idProduct).subscribe(
      result => {
        if(result.length > 0){
          this.valueStockInIdProduct = result
          this.item.price = this.valueStockInIdProduct[0].price
          this.item.p1 = this.valueStockInIdProduct[0].p1
          this.item.p2 = this.valueStockInIdProduct[0].p2
          this.item.p3 = this.valueStockInIdProduct[0].p3
          this.item.p4 = this.valueStockInIdProduct[0].p4
          // this.item = this.valueStockInIdProduct[0]
        }
        else{
          return
        }
      },
      err => {
        console.log(err);
      }
    )
  }
  async createStock() {
    this.isLodding = true
    let branch_id = localStorage.getItem('branch_id')
    if(branch_id){
      try {
        const create = new StockCreate()
        create.sku = this.productDetail.sku
        create.picture = this.productDetail.images[0]? this.productDetail.images[0].src : this.noImage
        create.name_product = this.productDetail.name
        create.stock_external = this.item.stock_external
        create.stock_internal = this.item.stock_internal
        create.price = this.item.price
        create.p1 = this.item.p1
        create.p2 = this.item.p2
        create.p3 = this.item.p3
        create.p4 = this.item.p4
        create.product_id = Number(this.idProduct)
        create.branch_id = Number(branch_id)
        const createStock = await firstValueFrom(this.stockSrevice.create(create))
        console.log('created Stock');
        const findStockQuntity = await firstValueFrom(this.stockSrevice.getStockQuantityBySku(this.productDetail.sku))
        if(findStockQuntity){
          const update = {} as StockQuantity
          update.all_back_quantity = Number(findStockQuntity.all_back_quantity + createStock.stock_external)
          update.all_front_quantity = Number(findStockQuntity.all_front_quantity + createStock.stock_internal)
          const updateStockQuantity = await firstValueFrom(this.stockSrevice.editStockQuantity(Number(findStockQuntity.id), update))
          console.log('updateStock', updateStockQuantity);

          const product = {} as Products
          product.stock_quantity = (update.all_back_quantity + update.all_front_quantity)
          const updateProduct = await firstValueFrom(this.productService.editProduct(Number(this.idProduct), product))
          if(updateProduct){
            console.log('product', product);

            this.isLodding = false
            this.swal.alert('success', 'เพิ่มสต๊อกสำเร็จ')
            this.locatoin.back()
          }
        }
        else{
          const createQuantity = {} as StockQuantity
          createQuantity.name = create.name_product
          createQuantity.picture = create.picture
          createQuantity.sku = create.sku
          createQuantity.all_back_quantity = create.stock_internal
          createQuantity.all_front_quantity = create.stock_external
          const resultQuantity = await firstValueFrom(this.stockSrevice.addStockQuantity(createQuantity))
          const product = {} as Products
          product.regular_price = String(create.price)
          product.stock_quantity = (resultQuantity.all_back_quantity + resultQuantity.all_front_quantity)
          const updateProduct = await firstValueFrom(this.productService.editProduct(Number(this.idProduct), product))
          if(updateProduct){
            this.isLodding = false
            this.swal.alert('success', 'เพิ่มสต๊อกสำเร็จ')
            this.locatoin.back()
          }
        }
        
      } catch (error) {
        console.log(error);

      }
    }
    else{
      this.swal.alert('error', 'กรุณาเลือก Warehouse ก่อน!!!')
    }

  }

}
