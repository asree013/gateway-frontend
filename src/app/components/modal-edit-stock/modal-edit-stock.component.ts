import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { StockQuantity, Stocks } from 'src/app/models/class/stock.model';
import { AlertService } from 'src/app/services/alert.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-modal-edit-stock',
  templateUrl: './modal-edit-stock.component.html',
  styleUrls: ['./modal-edit-stock.component.css']
})
export class ModalEditStockComponent implements OnInit {
  @Input("el_back_stock") el_back_stock: any
  @Output() exportUpdate = new EventEmitter<StockQuantity>()

  update: StockQuantity = {} as StockQuantity
  constructor(
    private readonly swal: AlertService,
    private readonly ss: StockService,
    ) { }

  ngOnInit(): void {
    console.log(this.el_back_stock);

  }
  async withdrawStock(){
    let quantity = document.getElementById('quantity') as HTMLInputElement
    quantity.classList.remove('is_valid', 'is_invalid')
    if(Number(quantity.value) > this.el_back_stock.element.stock_internal){
      this.swal.alert('error', 'จำวนวที่คุรใส่มีมากกว่าจำนวนสินค้าหลังร้า', 5000)
      quantity.classList.add('is_invalid')
    }
    else{
      try {
        quantity.classList.add('is_valid')
        const data = {} as StockQuantity
        data.all_front_quantity = (Number(this.el_back_stock.element.stock_external) + Number(quantity.value))
        data.all_back_quantity = (Number(this.el_back_stock.element.stock_internal) - Number(quantity.value))
        const updateStockQuantity = await this.ss.editStockQuantity(this.el_back_stock.element.idStockQunatity, data).toPromise()
        console.log(updateStockQuantity);
        const stocks = {} as Stocks
        this.update.id = this.el_back_stock.element.id,
        this.update.all_back_quantity = updateStockQuantity.all_back_quantity
        this.update.all_front_quantity = updateStockQuantity.all_front_quantity
        this.exportUpdate.emit(this.update)
        this.el_back_stock.modalStock = false
      } catch (error) {
        this.swal.alert("success", JSON.stringify(error), 50000)
      }

      // this.el_back_stock.modalStock = false
    }

  }

}
