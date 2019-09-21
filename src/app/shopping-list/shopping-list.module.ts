import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ShoppingEditComponent, ShoppingListComponent],
    imports: [ReactiveFormsModule, FormsModule, SharedModule, RouterModule.forChild([
        { path: 'shopping-list', component: ShoppingListComponent }
    ])]
})
export class ShoppingListModule {

}