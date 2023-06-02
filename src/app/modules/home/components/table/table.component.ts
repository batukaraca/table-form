
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from 'src/app/models/car.model';

import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  public cars!: Observable<Car[]>;

  constructor(private carService: CarService) {
    this.cars = this.carService.cars$;
  }

  ngOnInit(): void {
  }

}
