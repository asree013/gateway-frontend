import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AccoutAll } from 'src/app/models/class/accout.model';
import { AccoutsService } from 'src/app/services/accouts.service';


@Component({
  selector: 'app-accout-history',
  templateUrl: './accout-history.component.html',
  styleUrls: ['./accout-history.component.css'],
})
export class AccoutHistoryComponent implements OnInit {
  accoutAll: AccoutAll[] = []
  incomAll: number = 0
  paymentAll: number = 0
  constructor(
    private readonly accoutService: AccoutsService
  ) {}

  ngOnInit(): void {
    this.getAccoutAll()
  }

  getAccoutAll() {
    let barnch_id = localStorage.getItem('branch_id')
    if(barnch_id){
      const sub = this.accoutService.getAccoutByBranchIdAll(Number(barnch_id)).subscribe(
        (result: AccoutAll[]) => {
          const test = result.map(r => {
            return this.accoutAll.push({
              br_title: r.br_title,
              user_nicename: r.user_nicename,
              id: r.id,
              type_accout: r.type_accout,
              title: r.title,
              detail: r.detail,
              total: r.total,
              user_id: r.user_id,
              branch_id: r.branch_id,
              create_at: r.create_at,
              update_at: r.update_at
            })
          })
          console.log('test ', this.accoutAll);
          this.incomChart();

        },
        err => {
          console.log(err);

        },
        () => {
          sub.unsubscribe()
        }
      )
    }
  }
  incomChart() {
    let allOperate = []
    allOperate = this.accoutAll

    let incomArr = []
    incomArr = this.accoutAll
    let incom =  incomArr.filter(r => r.type_accout === "รับเงิน")

    let paymentArr = []
    paymentArr = this.accoutAll
    let filterPayment = paymentArr.filter(p => p.type_accout === "จ่ายเงิน")

    this.incomAll = incom.reduce((current, col) => {
      return current + col.total
    }, 0)
    this.paymentAll = filterPayment.reduce((current, col) => {
      return current + col.total
    }, 0)



    const payment = document.getElementById('paymentChart') as HTMLCanvasElement
    const ctx = document.getElementById('incomChart') as HTMLCanvasElement;
    const totalOperate = document.getElementById('totalOpetate') as HTMLCanvasElement

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.accoutAll.map((r) => new Date(r.create_at).toISOString()),
        datasets: [{
          label: '# of Votes',
          data: incom.map(p => p.total),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(payment, {
      type: 'bar',
      data: {
        labels: this.accoutAll.map((r) => r.create_at),
        datasets: [{
          label: '# of Votes',
          data: filterPayment.map(p => p.total),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })

    new Chart(totalOperate, {
      type: 'line',
      data: {
        labels: this.accoutAll.map((r) => r.create_at),
        datasets: [{
          label: '# of Votes',
          data: 12 ,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })

  }
}
