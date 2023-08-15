import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from 'src/app/models/class/searh.model';
import { Stocks } from 'src/app/models/class/stock.model';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-admin',
  templateUrl: './stock-admin.component.html',
  styleUrls: ['./stock-admin.component.css']
})
export class StockAdminComponent implements OnInit {
  @Output() openModal = new EventEmitter<string>();
  datasearch = new Search<Partial<any> >()
  stocks: Stocks[] = [];
  searchProduct: any = [];
  noImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0JkN3XIguQOKFCv_nwx0D_3jLUUja45nYaJaQbY&s';
  displayStyle = 'none';
  returnZeroSearch: string = ''
  isLoadding: boolean
  constructor(
    private route: Router,
    private swal: AlertService,
    private service: StockService
  ) {}

  ngOnInit(): void {
    this.getStocks();
  }
  // clickSearch(event: string) {
  //   this.product = this.product.filter((result) => {
  //     const productName = result.name.toLowerCase();
  //     const searchName = event.toLowerCase();
  //     return productName.indexOf(searchName) !== -1;
  //   });
  // }
  onCreateProduct() {
    this.route.navigate(['/product/create']);
  }
  getStocks() {
    this.isLoadding = true
    return this.service.getStockAll().subscribe(
      (result) => {
        if (result.length == 0) {
          this.isLoadding = false
          this.swal.alert('warning', 'is no Product in Database', 2500);
        }
        console.log(result);

        this.isLoadding = false
        this.stocks = result;
      },
      (err) => {
        this.isLoadding = false
        this.swal.alert(
          'warning',
          JSON.stringify(`Server Carshed!!!  Error Message: ${err.message}`),
          50000
        );
      }
    );
  }
  createStockById(id: number) {
    console.log(id);
    this.route.navigate([`stock/create/${id}`])

  }
  onDelete(item: Stocks) {
    let id = item.id;
    Swal.fire({
      title: `ต้องการลบ `,
      text: 'หากคุณลบข้อมูลจะหายออกจากฐานข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ลบมัน!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.isLoadding = true
        this.service.deleteStock(id).subscribe((result) => {
          this.isLoadding = false
          this.stocks = this.stocks.filter((f) => f.id !== id);
        });
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
  // searchAction(){
  //   this.service.search(this.datasearch).subscribe((result)=>{
  //     this.stocks = result
  //     this.displayStyle = 'none';
  //   })
  // }
}
