import Fetch from "./helpers/http";
import {METHODS} from "./helpers/config";

export default {
    // Here will all the API methods be

    getWarnings: ()=>{
        Fetch(METHODS.get, '/warnings')
    },

    getWarning: (id) =>{
        Fetch(METHODS.get, '/warnings/'+id)
    },

    createWarning: (data) =>{
        Fetch(METHODS.post, '/warning', data)
    },


}
