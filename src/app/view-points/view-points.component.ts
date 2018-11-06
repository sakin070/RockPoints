import { Component, OnInit } from '@angular/core';
import {Card} from '../model/Card';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-view-points',
  templateUrl: './view-points.component.html',
  styleUrls: ['./view-points.component.scss']
})
export class ViewPointsComponent implements OnInit {
  data = {
    cardNumber: null
  };
  points: number;
  response: string;
  constructor(private db: AngularFirestore, private router: Router, private ds: DataService) { }

  ngOnInit() {
  }

  public getPoints() {
    if (this.ds.cardValid(this.data.cardNumber)) {
      try {
        this.response = '';
        return this.db.collection('cards', ref => ref.where('cardNumber', '==', this.data.cardNumber )).valueChanges()
          .subscribe(ref => {
            const  bla = ref[0] as Card;
            this.points = bla.pointsCollected;
            this.response = 'The Card: ' + this.data.cardNumber + ' has earned ' +  this.points + ' points so far.';
          });
      } catch (e) {
      }
    } else {
      this.response = '';
    }
  }

}
