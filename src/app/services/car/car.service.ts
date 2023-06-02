import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Car } from 'src/app/models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private _cars = new BehaviorSubject<Car[]>([
    { id: 1, carId: 'HJKFSHJK46545', inStock: true, hp: '100', price: 53600, color: 'Red' },
    { id: 2, carId: 'HJKFSHJK51565', inStock: true, hp: '150', price: 20000, color: 'Yellow' },
    { id: 3, carId: 'HJKFSHJK69575', inStock: true, hp: '510', price: 28000, color: 'Blue' },
    { id: 4, carId: 'HJKFSHJK78565', inStock: false, hp: '370', price: 98000, color: 'White' },
    { id: 5, carId: 'HJKFSHJK87553', inStock: false, hp: '450', price: 50000, color: 'Green' },
    { id: 6, carId: 'HJKFSHJK97525', inStock: true, hp: '400', price: 43000, color: 'Red' },
    { id: 7, carId: 'HJKFSHJK16555', inStock: false, hp: '333', price: 35000, color: 'White' },
    { id: 8, carId: 'HJKFSHJK25595', inStock: true, hp: '497', price: 59000, color: 'Red' },
    { id: 9, carId: 'HJKFSHJK34521', inStock: true, hp: '550', price: 27000, color: 'Black' },
    { id: 10, carId: 'HJKFSHJK42533', inStock: false, hp: '120', price: 41000, color: 'Black' }
  ])
  public cars$!: Observable<Car[]>;

  constructor() {
    this.cars$ = this._cars.asObservable();
  }

  getCars(): Observable<boolean> {
    this._cars.next(this._cars.value);
    return of(true)
  }

  getCarByCarId(carId: string) {
    return of(this._cars.value.find(car => {
      return car.carId == carId;
    }))
  }

  saveCar(item: Car): Observable<boolean> {
    let foundIndex = this._cars.value.findIndex(x => x.carId == item.carId);

    if (foundIndex != -1) {
      this._cars.value[foundIndex] = item;
      return of(true)
    }
    else {
      return of(false)
    }
  }
}
