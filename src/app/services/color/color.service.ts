import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Color } from 'src/app/models/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private colors = [
    { id: 0, name: 'Blue' },
    { id: 1, name: 'Red' },
    { id: 2, name: 'Green' },
    { id: 3, name: 'Yellow' },
    { id: 4, name: 'White' },
    { id: 5, name: 'Black' }
  ]

  constructor() { }

  getColors(): Observable<Color[]> {
    return of(this.colors)
  }
}
