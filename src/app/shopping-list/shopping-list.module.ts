import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@NgModule({
    declarations: [ShoppingEditComponent, ShoppingListComponent],
    imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule.forChild([
        { path: 'shopping-list', component: ShoppingListComponent }
    ])]
})
export class ShoppingListModule {

}