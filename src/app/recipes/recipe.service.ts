import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipes: Recipe[] = [
        new Recipe("Schznitzel with fries", 
        "Best schnitzel EU", 
        "https://cdn.pixabay.com/photo/2016/11/19/02/22/schnipo-1837703_960_720.jpg",
        [new Ingridient("Meat", 1),new Ingridient("French Fries", 20)]),
        
        new Recipe("Burger", 
        "This is the tastiest burger", 
        "https://live.staticflickr.com/1939/30724632707_aa69612b75_b.jpg",
        [new Ingridient("Buns", 2), new Ingridient("Meat", 1)])
      ];

    constructor(private slService: ShoppingListService){}

    recipeSelected = new EventEmitter<Recipe>();
    
    getRecipe(id: number) {
        return this.recipes[id];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngridientsToShoppingList(ingridients: Ingridient[]) {
        this.slService.addIngridients(ingridients);
    }
}