import Fetch from "./helpers/http";
import {METHODS} from "./helpers/config";

export default {
    // Here will all the API methods be

    // --- WARNINGS ---
    getWarnings: (filters)=>{
        console.log("FILTERS: ", filters);
        return new Fetch(METHODS.get, '/warning?' + (filters ?
            Object.keys(filters).map(key => {
                return filters[key] instanceof Array 
                    ? filters[key].flatMap(it => `${key}[]=${it}&`).join('')
                    : `${key}=${filters[key]}&`
             }) : ''))
    },

    getWarning: (id) =>{
        return new Fetch(METHODS.get, `/warning/${id}`)
    },

    getWarningContent: (id) => {
        return new Fetch(METHODS.get, '/warning/content/'.concat(id));
    },

    createWarning: (data) =>{
        return new Fetch(METHODS.post, '/warning', data)
    },

    commentOnWarning : (warningId, image , comment) =>{
        return new Fetch(METHODS.post, '/comment', {warningId: warningId, image: image, comment: comment})
    },

    addWarningImage: (id, image) => {
        return new Fetch(METHODS.post, '/warning/image', {warningId: id, image: image});
    },

    addStatus: (data) => {
        return new Fetch(METHODS.post, '/warning/status', {warningId: data.warningId, type: data.type, description: data.description});
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
    },

    // --- MUNICIPALITIES ---
    getMunicipalities: () => {
        return new Fetch(METHODS.get, '/location/municipality');
    }

}
