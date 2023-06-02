import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as components from './components';
import { HomeRoutingModule } from './home-routing.module';

import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

const COMPONENTS = [
  components.TableComponent,
  components.TableEditComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbRangeModule,
    MdbValidationModule,
  ],
  providers: [CurrencyPipe],
})
export class HomeModule { }
