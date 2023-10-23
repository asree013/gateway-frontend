import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Stocks } from 'src/app/models/class/stock.model';
import { Orders, Products } from 'src/app/models/interface/woocommerce.model';
import { AccoutsService } from 'src/app/services/accouts.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-minitor',
  templateUrl: './minitor.component.html',
  styleUrls: ['./minitor.component.css']
})
export class MinitorComponent implements OnInit {
  branch:string = localStorage.getItem('branch_title')? localStorage.getItem('branch_title').toString(): ''
  product: Products[] = []
  stocks: Stocks[] = []
  totalBalance: number
  orders: Orders[] = []
  constructor(
    private readonly us: UsersService,
    private readonly ps: ProductService,
    private readonly ss: StockService,
    private readonly os: OrderService,
    private readonly as: AccoutsService
  ) { }

  ngOnInit(): void {
    this.feedLengthItem()
  }
  feedLengthItem() {
    this.getProduct()
    this.getStocker()
    this.getAccout()
    this.getOrder()
  }
  async getProduct(){
    let result = await firstValueFrom(this.ps.getProductAll())
    this.product = result.filter(r => {
      return r.name.includes(`(${this.branch})`)
    })
  }
  async getStocker() {
    let result = await firstValueFrom(this.ss.getStockAll())
    this.stocks = result.filter( r => {
      return r.name_product.includes(`(${this.branch})`)
    })
  }
  async getAccout() {
    let result = await firstValueFrom(this.as.getAccoutByBranchIdAll(Number(localStorage.getItem('branch_id'))))
    const incom = result.filter(r => {
      return r.type_accout.includes('รับเงิน')
    }).reduce((i, c) => {
      return i + c.total
    }, 0)
    
    const payment = result.filter(r => r.type_accout.includes('จ่ายเงิน'))
    .reduce((i, c) => {
      return i + c.total
    }, 0)
    
    this.totalBalance = incom - payment
    
    
  }
  async getOrder() {
    let result = await firstValueFrom(this.os.getOrderAll())
    this.orders = result.filter(r => {
      return r.line_items.filter(r=> r.name.includes(`(${this.branch})`))
    })
    console.log(this.orders);
    
  }

}
