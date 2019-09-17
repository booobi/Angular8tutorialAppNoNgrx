import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    )
  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingridients']
    // )
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let description = '';
    let recipeIngridients = new FormArray([]);
    
    if(this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe['ingridients']) {
        for(let ingridient of recipe.ingridients) {
          recipeIngridients.push(new FormGroup({
            'name': new FormControl(ingridient.name, Validators.required),
            'amount': new FormControl(ingridient.amount, [
              Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      } 
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingridients': recipeIngridients

    });
  }

  onAddIngridient(){
    (<FormArray>this.recipeForm.get('ingridients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
              Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngridient(index: number) {
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(["../",], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingridients')).controls;
  }
}
