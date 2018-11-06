import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-add-point',
  templateUrl: './add-point.component.html',
  styleUrls: ['./add-point.component.scss']
})
export class AddPointComponent implements OnInit {
  data = {
    cardNumber: null,
    totalCost: null
  };
  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  addPoint() {
    // this.ds.activateCard(this.data.cardNumber);
    this.ds.addPoints(this.data.cardNumber, this.data.totalCost);
  }
}
