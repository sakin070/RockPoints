import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Card} from './model/Card';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import { ToastrService} from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  cardRef: AngularFirestoreCollection<Card> = this.db.collection('cards');
  points: number ;
  response: string;
  constructor(private db: AngularFirestore, private router: Router, private toastr: ToastrService) {
  }

  public addPoints(cardNumber: number, totalCost: number) {
    const pointsEarned = this.costToPoint(totalCost);
    console.log(pointsEarned);
    const sub = this.getCardByNumber(cardNumber).subscribe( x => {
      const doc = x[0];
      this.cardRef.doc(doc.id).update(
        {cardNumber: doc.data.cardNumber, pointsCollected: doc.data.pointsCollected + pointsEarned }).then(ref => {
          this.handleMessage('Points Earned');
        this.router.navigate(['/home']);
      });
      sub.unsubscribe();
    });

  }


  private getCardByNumber(cardNumber: number): Observable<{id: string; data: Card}[]> {
    return this.db.collection('cards', ref => ref.where('cardNumber', '==', cardNumber ))
      .snapshotChanges().pipe(map(actions => { return actions.map( a => {
        const data = a.payload.doc.data() as Card;
        const id = a.payload.doc.id;
        return {id, data};
      }); }));
  }
  // public totalPoints(cardNumber: number): number {
  //   let totalPoints = -1;
  //   const sub = this.getCardByNumber(cardNumber).subscribe(cardData => {
  //     totalPoints = cardData.pop().data.pointsCollected;
  //     sub.unsubscribe();
  //     return totalPoints;
  //   });
  //   return totalPoints;
  // }


  // add methods for logging data transactions
  public spendPoints(cardNumber: number, totalCost: number) {
    const pointsEarned = this.costToPoint(totalCost);
    const sub = this.getCardByNumber(cardNumber).subscribe(x => {
      const doc = x[0];
      if (pointsEarned > doc.data.pointsCollected ) {
        this.handleMessage('Not Enough Points');
        this.router.navigate(['/home']);
      } else {
        this.cardRef.doc(doc.id).update(
          {cardNumber: doc.data.cardNumber, pointsCollected: doc.data.pointsCollected - pointsEarned }).then(ref => {
          this.handleMessage('Points Spent');
          this.router.navigate(['/home']);
        });
      }
      sub.unsubscribe();
    });
  }

  public activateCard(cardNumber: number) {
    try {
      if (this.cardValid(cardNumber)) {
        const sub = this.getCardByNumber(cardNumber).subscribe(x => {
          if (x.length === 0) {
              this.cardRef.add({cardNumber: cardNumber, pointsCollected: 0 }).then(ref => {
              this.handleMessage('Card Activated');
              this.router.navigate(['/home']);
            });
          } else {
              this.handleMessage('Invalid Card');
          }
          sub.unsubscribe();
        });

      } else {
          this.handleMessage('Invalid Card');
      }
    } catch (e) {
      console.log(e);
    }
  }

  public getPoints(cardNumber: number) {
    try {
      this.response = '';
      return this.db.collection('cards', ref => ref.where('cardNumber', '==', cardNumber )).valueChanges()
        .subscribe(ref => {
          const  bla = ref[0] as Card;
          this.points = bla.pointsCollected;
          this.response = 'The Card: ' + cardNumber + ' has earned ' +  this.points + ' points so far.';
        });
    } catch (e) {
    }
  }


  private costToPoint(cost: number): number {
    return Math.round(cost / 1000);
  }

  handleMessage(errorCode: string) {
    switch (errorCode) {
      case 'Not Enough Points': {
        this.toastr.error('Please chose another payment method', 'Not Enough Points', { positionClass: 'toast-top-full-width'});
        break;
      }
      case 'Invalid Card': {
        this.toastr.error('This card is not valid', 'Invalid Card', { positionClass: 'toast-top-full-width'});
        break;
      }
      case 'Points Earned': {
        this.toastr.success('Points Earned', 'Success', { positionClass: 'toast-top-full-width'});
        break;
      }
      case 'Points Spent': {
        this.toastr.success('Points Spent', 'Success', { positionClass: 'toast-top-full-width'});
        break;
      }
      case 'Card Activated': {
        this.toastr.success('Card Activated', 'Success', { positionClass: 'toast-top-full-width'});
        break;
      }
      default: {
        break;
      }
    }
  }

  public cardValid(cardNumber: number): boolean {
    if (cardNumber == null) {
      return false;
    }
    return true;
  }

}
