import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/interface/woocommerce.model';
import { AlertService } from 'src/app/services/alert.service';
import { debounceTime } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
})
export class ProductAdminComponent implements OnInit {
  @Output() inSearch = new EventEmitter<string>();
  product: any[] = [];
  noImage: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF0JkN3XIguQOKFCv_nwx0D_3jLUUja45nYaJaQbY&s';
  constructor(
    private route: Router,
    private swal: AlertService,
    private service: ProductService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }
  clickSearch(event: string) {
      this.product = this.product.filter((result) => {
      const productName = result.name.toLowerCase();
      const searchName = event.toLowerCase();
      return productName.indexOf(searchName) !== -1;
    });
  }

  onCreateProduct() {
    this.route.navigate(['/product/create']);
  }
  getProduct() {
    return this.service.getProductAll().subscribe(
      (result) => {
        if (result.length == 0) {
          this.swal.alert('warning', 'is no Product in Database', 2500);
        }
        this.product = result;
      },
      (err) => {
        this.swal.alert(
          'warning',
          JSON.stringify(`Server Carshed!!!  Error Message: ${err.message}`),
          50000
        );
      }
    );
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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.service.deleteProduct(id).subscribe((result) => {
          this.product = this.product.filter((f) => f.id !== id);
        });
      }
    });
  }
  showItemProduct(item: Products) {
    let id = item.id

    this.route.navigate([`product/admin/detail/${id}`])
  }
}
