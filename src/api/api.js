import Fetch from "./helpers/http";
import {METHODS} from "./helpers/config";

export default {
    // Here will all the API methods be

    // --- WARNINGS ---
    getWarnings: ()=>{
        return new Fetch(METHODS.get, '/warning')
    },

    getWarning: (id) =>{
        return new Fetch(METHODS.get, '/warning/'.concat(id))
    },

    createWarning: (data) =>{
        return new Fetch(METHODS.post, '/warning', data)
    },

    commentOnWarning : (warningId, image , comment) =>{
        return new Fetch(METHODS.post, '/comment', {warningId: warningId, image: image, comment: comment})
    },

    // --- CATEGORIES ---

    getCategories : () => {
        return new Fetch(METHODS.get, '/warning/category');
    },

    // --- CONTRACTS ---
    createContract : (warningId, groupId, description) =>{
        return new Fetch(METHODS.post, '/warning/contract', {warningId: warningId, groupId: groupId, description: description})
    },

    getContracts : () =>{
        return new Fetch(METHODS.get, '/warning/contract')
    }

}
