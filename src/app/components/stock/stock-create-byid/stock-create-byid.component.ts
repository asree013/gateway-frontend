import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/models/class/branch.model';
import { StockCreate, Stocks } from 'src/app/models/class/stock.model';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { BranchService } from 'src/app/services/branch.service';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stock-create-byid',
  templateUrl: './stock-create-byid.component.html',
  styleUrls: ['./stock-create-byid.component.css']
})
export class StockCreateByidComponent implements OnInit {
  nImg = environment.noImgae
  productDetail = {} as Products;
  barnchAll: any = []
  idProduct: number
  valueStockInIdProduct: Stocks[] = []
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly branchService: BranchService,
    private readonly stockSrevice: StockService,
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
          this.branchService.getBranch().subscribe(
            result=> {
              this.barnchAll = result
            }
          )
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
    const item = new StockCreate()
    item.stock_external = value.stock_external
    item.stock_internal = value.stock_internal
    item.total = null
    item.price = value.price
    item.p1 = value.p1
    item.p2 = value.p2
    item.p3 = value.p3
    item.p4 = value.p4
    item.product_id = Number(this.idProduct)
    item.branch_id = Number(value.branch_id)
    console.log(item);
    this.stockSrevice.create(item).subscribe(
      result => {
        console.log(result);

      },
      err => {
        console.log(err);
      }
    )

  }

}
