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

    commentOnWarning : (warningId, image , comment) =>{
        Fetch(METHODS.post, '/comment', {warningId: warningId, image: image, comment: comment},null, true )
    },

    createContract : (warningId, groupId, description) =>{
        Fetch(METHODS.post, '/contract', {WarningId: warningId, GroupId: groupId, description: description}, null , true)
    },

    getContracts : () =>{
        Fetch(METHODS.get, '/contract')
    }

}
