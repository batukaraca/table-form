import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Color } from 'src/app/models/color.model';

import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';


@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableEditComponent implements OnInit {
  public carEditForm!: FormGroup;
  public colors!: Color[];

  get price() {
    return this.carEditForm.get('price');
  }
  get inStock() {
    return this.carEditForm.get('inStock');
  }
  get color() {
    return this.carEditForm.get('color');
  }
  get hp() {
    return this.carEditForm.get('hp');
  }

  constructor(
    private currencyPipe: CurrencyPipe,
    private colorService: ColorService,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {
    this.initForm()
  }

  ngOnInit(): void {
    this.colorService.getColors().subscribe(data => {
      this.colors = data;
    })
    this.carService.getCarByCarId(this.route.snapshot.params['id']).subscribe(car => {
      if (car) {
        this.carEditForm.patchValue({
          id: car?.id, carId: car?.carId, inStock: car?.inStock,
          hp: car?.hp, price: car?.price, color: car?.color
        })
        document.getElementById('price')?.focus();
        setTimeout(() => {
          document.getElementById('price')?.blur();
        }, 100)
      } else {
        this.router.navigate([''])
      }
    })
  }

  initForm(): void {
    this.carEditForm = new FormGroup({
      id: new FormControl<number | null>(1),
      carId: new FormControl<string>(''),
      inStock: new FormControl<boolean>(false),
      hp: new FormControl<number | null>(null),
      price: new FormControl<string | null>(null,
        [Validators.required,
        Validators.pattern("^[0-9]*$")]),
      color: new FormControl<string>('')
    });
  }

  submitForm(): void {
    this.carService.saveCar(this.carEditForm.value).subscribe(res => {
      if (res) {
        console.log("Edited");
        this.router.navigate(['']);
      }
    })
  }

  transformAmount(element: Event) {
    let text = this.currencyPipe.transform(this.price?.value, '€ ');
    (element.target as HTMLInputElement).value = text ? text : ''
  }

  transformDecimal(element: Event) {
    (element.target as HTMLInputElement).value = this.price?.value
  }

  validateNo(e: KeyboardEvent): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  changeInStock(element: Event) {
    this.inStock?.patchValue((element.target as HTMLInputElement).checked)
    this.carEditForm.markAsDirty();
  }
}
