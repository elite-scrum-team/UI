import API from "../api";

// and all the methods will return a promise
export default class InterestGroupService {

    static subscribe = (warningId ,callback) => {
        const response = API.subscribeToAWarning(warningId).response();
        return response.then(async data => {
            !callback || callback(response.isError, data);
            return data;
        });
    };

    static unsubscribe = (warningId ,callback) => {
        const response = API.unSubscribeToAWarning(warningId).response();
        return response.then(async data => {
            !callback || callback(response.isError, data);
            return data;
        });
    };

}
