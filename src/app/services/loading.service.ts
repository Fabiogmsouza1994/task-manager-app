import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _spinnerCounter: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
    
  spinnerCounter$: Observable<number> = this._spinnerCounter.asObservable();

  show(): void {
    setTimeout(() => {
      this._spinnerCounter.next(this._spinnerCounter.value + 1);
    });
  }

  hide(): void {
    setTimeout(() => {
      this._spinnerCounter.next(this._spinnerCounter.value - 1);
    });
  }
}
