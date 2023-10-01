import { Component, Input, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css'],
})
export class InputModalComponent implements OnInit {
  @Input('data') modifiedName: {
    idOrder: number;
    openPuching: boolean;
  };
  @Input('product_id_arr') idProductArr: number[] = [];
  noImage: string = environment.noImgae;
  stockItem: any[] = [];
  constructor(private readonly ss: StockService) {}

  ngOnInit(): void {
    this.getStock();
  }

  async getStock() {
    const value = this.idProductArr.map(async r => {
      const data = await this.ss.getStockByIdProduct(r).toPromise();
      console.log('data', data);
      return data
    })
    this.stockItem = value
  }
  close() {
    this.modifiedName.openPuching = false;
  }
}
