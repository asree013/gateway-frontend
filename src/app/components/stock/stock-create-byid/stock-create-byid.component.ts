import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from 'src/app/models/class/branch.model';
import { StockCreate, Stocks } from 'src/app/models/class/stock.model';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { BranchService } from 'src/app/services/branch.service';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

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
        let result = await this.productService.getProductOne(this.idProduct).toPromise()
        if(result){
          this.productDetail = result
        }
      }
    )
  }
  checkStockByIdProdcut() {
    this.stockSrevice.getStockByIdProduct(this.idProduct).subscribe(
      result => {
        if(result){
          this.valueStockInIdProduct = result
        }
      },
      err => {
        console.log(err);
      }
    )
  }
  createStock(value: StockCreate) {
    this.isLodding = true
    let branch_id = localStorage.getItem('branch_id')
    if(branch_id){
      console.log(branch_id);
      const item = new StockCreate()
      item.sku = this.productDetail.sku
      item.picture = this.productDetail.images[0]? this.productDetail.images[0].src : this.noImage
      item.name_product = this.productDetail.name
      item.stock_external = value.stock_external
      item.stock_internal = value.stock_internal
      item.price = value.price
      item.p1 = value.p1
      item.p2 = value.p2
      item.p3 = value.p3
      item.p4 = value.p4
      item.product_id = Number(this.idProduct)
      item.branch_id = Number(branch_id)
      console.log(item);
      const sub = this.stockSrevice.create(item).subscribe(
        result => {
          console.log(result);
          this.isLodding = false
          this.swal.alert('success', 'เพิ่มสต๊อกสำเร็จ')
          this.locatoin.back()
        },
        err => {
          console.log(err);
          this.isLodding = false
        },
        () => {
          sub.unsubscribe()
        }
      )
    }
    else{
      this.swal.alert('error', 'กรุณาเลือก Warehouse ก่อน!!!')
    }

  }

}
