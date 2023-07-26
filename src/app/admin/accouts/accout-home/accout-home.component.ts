import { Component, OnInit } from '@angular/core';
import { Accout, AccoutAll } from 'src/app/models/class/accout.model';
import { AccoutsService } from 'src/app/services/accouts.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-accout-home',
  templateUrl: './accout-home.component.html',
  styleUrls: ['./accout-home.component.css']
})
export class AccoutHomeComponent implements OnInit {
  accoutItem: AccoutAll[] = []
  constructor(private readonly service: AccoutsService, private readonly swal: AlertService) { }

  ngOnInit(): void {
    this.fetchAccout()
  }

  fetchAccout() {
    this.service.getAccoutAll().subscribe(
      result => {
        console.log(result);
        this.accoutItem = result
      },
      err => {
        console.log(err);
        this.swal.alert('error', JSON.stringify(err.message), 40000)
      }
    )
  }
}
