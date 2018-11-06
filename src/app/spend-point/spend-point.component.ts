import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-spend-point',
  templateUrl: './spend-point.component.html',
  styleUrls: ['./spend-point.component.scss']
})
export class SpendPointComponent implements OnInit {
  data = {
    cardNumber: null,
    totalCost: null
  };

  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  public spendPoints() {
    this.ds.spendPoints(this.data.cardNumber, this.data.totalCost);
  }
}
