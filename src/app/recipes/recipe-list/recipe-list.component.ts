import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()

    this.subscription = this.recipeService.recipesChanged.subscribe((recipes)=>{
      this.recipes = recipes;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRecipeAdd() {
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
