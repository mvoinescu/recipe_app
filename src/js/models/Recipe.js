import axios from 'axios';
import {key} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error){
            console.log(error);
            alert(`I'm not sure how we got here. Please try again!`)
        }
    }

    calcTime(){
        // Assuming that we need 15 minutes for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitLong = ['tableshpoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspons', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el =>{
            // 1. uniform units
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i])
            });
            // 2. remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');
            // 3. Parse ingredients into count, unit and ingredient
        });
        this.ingredients = newIngredients;
    }

}