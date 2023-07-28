import { Component, OnInit } from '@angular/core';
import { Accout, AccoutAll, AccoutOnDate } from 'src/app/models/class/accout.model';
import { AccoutsService } from 'src/app/services/accouts.service';
import { AlertService } from 'src/app/services/alert.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-accout-home',
  templateUrl: './accout-home.component.html',
  styleUrls: ['./accout-home.component.css']
})
export class AccoutHomeComponent implements OnInit {
  accoutItem: AccoutAll[] = []
  imageAccout: any = []
  constructor(private readonly service: AccoutsService, private readonly swal: AlertService) { }

  ngOnInit(): void {
    this.fetchAccout()
  }
  fetchAccout() {
    var current_day = new Date()
    console.log(current_day.getDate());

    this.service.getAccoutsOnDate().subscribe(
      (result: any) => {
        console.log(result);
        this.accoutItem = result
      },
      err => {
        console.log(err);
        this.swal.alert('error', JSON.stringify(err.message), 40000)
      }
    )
  }

  deleteAccoutItem(accout_id: number) {
    console.log(accout_id);
    this.service.deleteAccout(accout_id).subscribe(
      result => {
        this.swal.alert('success', 'deleted!!!')
        this.accoutItem = this.accoutItem.filter(r => r.id !== accout_id)
      }
    ),
    (err: any) => {
      console.log(err);

    }
  }
  showAccout(accout_id: number){
    $(`#statement${accout_id}_slip`).slideToggle()
    this.service.getImageByAccoutId(accout_id).subscribe(
      result => {
        this.imageAccout = result
        console.log(result);
      },
      err => {
        alert(err)
        console.log(err);
      }
    )
  }

  async selectAccout(type: string){

    console.log(type);
    if(type === ''){
      $(`.tag`).removeClass('active')
      $('#all').addClass('active')
    }
    else if(type === 'income') {
      $('.tag').removeClass('active')
      $('#income').addClass('active')
    }
    else{
      this.service.getAccoutAll().subscribe(
        result=> {
          result.filter(r => r.type_accout === 'จ่ายเงิน')
          this.accoutItem = result
        }
      )
      $('.tag').removeClass('active')
      $('#payment').addClass('active')
    }

  }
}
