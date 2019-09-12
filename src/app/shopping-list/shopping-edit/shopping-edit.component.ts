import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingridient } from 'src/app/shared/ingridient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  @Output() ingridientAdded = new EventEmitter<Ingridient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem(){
    const newIngridient = new Ingridient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this.ingridientAdded.emit(newIngridient);
  }

}
