import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Ingridient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.ingridientsChanged.subscribe((ingridients)=>this.ingridients = ingridients);
    this.ingridients = this.slService.getIngridients();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index) {
    this.slService.startedEditing.next(index);
  }
}
