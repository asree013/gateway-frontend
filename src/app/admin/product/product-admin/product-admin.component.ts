import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';
import { Search } from 'src/app/models/class/searh.model';
import { BranchService } from 'src/app/services/branch.service';
import { Branch } from 'src/app/models/class/branch.model';
import * as $ from 'jquery'

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
})
export class ProductAdminComponent implements OnInit {
  @Output() openModal = new EventEmitter<string>();
  datasearch = new Search<Partial<any> >()
  product: Products[] = [];
  productGlobal: Products[] = [];
  searchProduct: any = [];
  noImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0JkN3XIguQOKFCv_nwx0D_3jLUUja45nYaJaQbY&s';
  displayStyle = 'none';
  returnZeroSearch: string = ''
  isLoadding: boolean
  isBranch: Branch[] = []
  constructor(
    private route: Router,
    private swal: AlertService,
    private service: ProductService,
    private readonly bs: BranchService,
  ) {}

  ngOnInit(): void {
    let uses_status = Number(localStorage.getItem('user_status'))
    if(uses_status === 1){
      this.getProductForAddmin()
      this.getBranch()
    }
    else{
      this.getProduct();
    }
  }
  onCreateProduct() {
    this.route.navigate(['/product/create']);
  }
  getProductForAddmin() {
    this.isLoadding = true
    this.service.getProductAll().subscribe(
      (result) => {
        if (result.length == 0) {
          this.isLoadding = false
          this.swal.alert('warning', 'is no Product in Database', 2500);
        }
        this.isLoadding = false
        this.productGlobal = result
        this.product = result

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
  getProduct() {
    this.isLoadding = true
    const page = 1
    this.service.getProductAll().subscribe(
      (result) => {
        if (result.length == 0) {
          this.isLoadding = false
          this.swal.alert('warning', 'is no Product in Database', 2500);
        }
        this.isLoadding = false
        let branch_title = localStorage.getItem('branch_title')
        const find = result.filter((b) => {
          return b.name.includes(String(branch_title))
        })
        this.product = find;

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
  onDelete(item: Products) {
    let id = item.id;
    Swal.fire({
      title: `ต้องการลบ ${item.name}`,
      text: 'หากคุณลบข้อมูลจะหายออกจากฐานข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ลบมัน!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'deleted '+ item.name,
          showConfirmButton: false,
          timer: 1500
        })
        this.isLoadding = true
        this.service.deleteProduct(id).subscribe((result) => {
          this.isLoadding = false
          this.product = this.product.filter((f) => f.id !== id);
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
  searchAction(){
    this.service.search(this.datasearch).subscribe((result)=>{
      this.product = result
      this.displayStyle = 'none';
    })
  }
  async getBranch() {
    const result = await this.bs.getBranch().toPromise()
    if(result){
      this.isBranch = result
    }
  }
  selectBracnh(value: string) {
    if(value === ''){
      this.product = this.productGlobal
    }
    else {
      let title = this.isBranch.find((r: any) => {
        if(r.title === value){
          return r.title
        }
      })
      this.product = this.productGlobal.filter(r => {
        return r.name.includes(String(title.title))
      })
    }
  }
}
