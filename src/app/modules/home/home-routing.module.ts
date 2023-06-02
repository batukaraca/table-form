import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { PostService } from './../../services/post/post.service';
// import { PageService } from '../../services/page/page.service';
// import { CategoryService } from '../home/services/category/category.service';

import * as components from './components';

const routes: Routes = [
  {
    path: 'list',
    component: components.TableComponent,
  },
  {
    path: 'list/edit/:id',
    component: components.TableEditComponent,
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
