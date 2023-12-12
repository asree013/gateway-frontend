import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from 'src/app/models/class/searh.model';
import { StockQuantityRelate, Stocks } from 'src/app/models/class/stock.model';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery'
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-stock-admin',
  templateUrl: './stock-admin.component.html',
  styleUrls: ['./stock-admin.component.css']
})
export class StockAdminComponent implements OnInit {
  @Output() openModal = new EventEmitter<string>();
  datasearch = new Search<Partial<any> >()
  stocks: StockQuantityRelate[] = [];
  searchProduct: any = [];
  noImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0JkN3XIguQOKFCv_nwx0D_3jLUUja45nYaJaQbY&s';
  displayStyle = 'none';
  returnZeroSearch: string = ''
  isLoadding: boolean
  totalStock: number
  pageSize: number = 10
  page: number = 1
  constructor(
    private route: Router,
    private swal: AlertService,
    private ss: StockService
  ) {}

  ngOnInit(): void {
    this.getStocks();
    $("#page1").addClass("active")
  }

  onCreateProduct() {
    this.route.navigate(['/product/create']);
  }
  async getStocks() {
    // this.isLoadding = true
    const stockLength = await this.ss.getStockQuantityAll().toPromise()
    if(stockLength){
      // this.totalStock = Math.ceil(stockLength.length / this.pageSize)
      // const result = await this.service.getStockPagination(this.page, this.pageSize).toPromise()
      // result.filter(r => r.br_name === String(localStorage.getItem('branch_title')))

      console.log('stockLength: ', stockLength);
      this.stocks = stockLength
      let branch_title = localStorage.getItem('branch_title')
      const data = stockLength.filter(r => r.stocks[0].name_product.includes(String(branch_title)))
      this.stocks = data
    }
    // return this.service.getStockAll().subscribe(
    //   (result) => {
    //     if (result.length == 0) {
    //       this.isLoadding = false
    //       this.swal.alert('warning', 'is no Product in Database', 2500);
    //     }
    //     console.log(result);

    //     this.isLoadding = false
    //     this.stocks = result;
    //   },
    //   (err) => {
    //     this.isLoadding = false
    //     this.swal.alert(
    //       'warning',
    //       JSON.stringify(`Server Carshed!!!  Error Message: ${err.message}`),
    //       50000
    //     );
    //   }
    // );
  }
  generateForloop(length: number) {
    const item: number[] = []
    for (let i = 0; i <= length; i++) {
      item.push(i)
    }
    return item
  }
  createStockById(id: number) {
    console.log(id);
    this.route.navigate([`stock/create/${id}`])

  }
  onDelete(sku: string) {
    Swal.fire({
      title: `ต้องการลบ `,
      text: 'หากคุณลบข้อมูลจะหายออกจากฐานข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ลบมัน!',
    }).then(async (result) => {
      if (result.isConfirmed) {
      this.isLoadding = true
       try {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        const deleteQuantity = await firstValueFrom(this.ss.deleteQuantityBySku(sku))
        if(deleteQuantity){
          const findStocks = await firstValueFrom(this.ss.getStokcBySKU(sku))
          const deleteStock = findStocks.map(async(r) => {
            const results = await firstValueFrom(this.ss.deleteStock(r.id))
            return results
          })
          if(deleteStock){
            this.isLoadding = false
            this.swal.alert('deleted successed', 'success')
            this.getStocks()
          }
        }
        
       } catch (error: any) {
          console.log(error);
          this.isLoadding = false
          this.swal.alert(JSON.stringify(error.message), 'error', 10000)
       }
      }
    });
  }
  showItemProduct(item: Products) {
    let id = item.id;

    this.route.navigate([`product/admin/detail/${id}`]);
  }
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  searchData(event: Event) {
    const element = (event.target as HTMLInputElement)
    this.datasearch.data[element.id] = element.value
  }
  selectPageSize(event: Event) {
    if(event){
      const size = (event.target as HTMLInputElement).value
      this.pageSize = Number(size)
      this.getStocks()
    }
  }
  nextPage() {
    if(this.page !== this.totalStock) {
      $('.number_pagination').removeClass('active')
      this.page ++
      console.log(this.page);

      this.getStocks()
    }
  }
}
