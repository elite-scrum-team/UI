import API from "../api";
import * as CategoryAction from '../../store/actions/CategoryAction';
import store from '../../store/store'

// and all the methods will return a promise
export default class CategoryService {
    // --- CATEGORIES ---

    static getCategories = (callback) => {
        // Check if categories exists
        const categories = CategoryAction.getAllCategories(store.getState());

        // If categories is already stored
        if(categories && categories.length > 0) {
            !callback || callback(false, categories);
            return Promise.resolve(categories);
        }

        // If not, fetch from API
        const response = API.getCategories().response();

        return response.then((data) => {
            CategoryAction.setAllCategories(data)(store.dispatch);
            data = CategoryAction.getAllCategories(store.getState());
            !callback || callback(response.isError, data);
            return data;
        });
    }

    static getCategory = (id, callback) => {
        const category = CategoryAction.getCategoryById(id)(store.getState());

        if(category) {
            !callback || callback(false, category);
            return Promise.resolve(category);
        }

        // Fetch from server
        const response = API.getCategoryById(id).response();
        return response.then((data) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }
}
