import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-activate-card',
  templateUrl: './activate-card.component.html',
  styleUrls: ['./activate-card.component.scss']
})
export class ActivateCardComponent implements OnInit {
  data = {
    cardNumber: null
  };
  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  public activateCard() {
    this.ds.activateCard(this.data.cardNumber);
    this.data.cardNumber = null;
  }

}
