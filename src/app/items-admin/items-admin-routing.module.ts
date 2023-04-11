import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemsAdminComponent } from './items-admin.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component: ItemsAdminComponent}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ItemsAdminRoutingModule { }
