import { Ingridient } from '../shared/ingridient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingridientsChanged = new Subject<Ingridient[]>();
    startedEditing = new Subject<number>();
    private ingridients: Ingridient[] = [
        new Ingridient("Apples", 5),
        new Ingridient("Tomatoes", 10)
      ];
    


    getIngridient(index: number) {
        return this.ingridients[index];
    }

    getIngridients() {
        return this.ingridients.slice();
    }

    updateIngridient(index, newIngridient) {
        this.ingridients[index] = newIngridient;
        this.ingridientsChanged.next(this.ingridients.slice());
    }

    addIngridient(ingridient: Ingridient){
    this.ingridients.push(ingridient);
    this.ingridientsChanged.next(this.ingridients.slice());
    }

    deleteIngridient(index: number) {
        this.ingridients.splice(index, 1);
        this.ingridientsChanged.next(this.ingridients.slice());
    }

    addIngridients(ingridients: Ingridient[]) {
        this.ingridients.push(...ingridients);
        this.ingridientsChanged.next(this.ingridients.slice());
    }
}