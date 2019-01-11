import Fetch from "./helpers/http";
import {METHODS} from "./helpers/config";

export default {
    // Here will all the API methods be

    getWarnings: ()=>{
        return new Fetch(METHODS.get, '/warnings')
    },

    getWarning: (id) =>{
        return new Fetch(METHODS.get, '/warnings/'+id)
    },

    createWarning: (data) =>{
        return new Fetch(METHODS.post, '/warning', data)
    },

    commentOnWarning : (warningId, image , comment) =>{
        return new Fetch(METHODS.post, '/comment', {warningId: warningId, image: image, comment: comment},null, true )
    },

    createContract : (warningId, groupId, description) =>{
        return new Fetch(METHODS.post, '/contract', {WarningId: warningId, GroupId: groupId, description: description}, null , true)
    },

    getContracts : () =>{
        return new Fetch(METHODS.get, '/contract')
    }

}
