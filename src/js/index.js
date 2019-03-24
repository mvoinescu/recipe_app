// Api key 4b633adc230b693436824486bc988191 
// https://www.food2fork.com/api/search 

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};
const controlSearch = async () => {
    // 1. Get query from the view
    const query = searchView.getInput();
    console.log(query);

    if (query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on the UI
        console.log(state.search.result);
    }
}

elements.searchBox.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
