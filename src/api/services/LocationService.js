import API from "../api";
import * as LocationAction from '../../store/actions/LocationAction';
import store from '../../store/store'

// and all the methods will return a promise
export default class LocationService {
    // --- CATEGORIES ---

    static getMunicipalities = (callback) => {
        // Check if municipalities exists
        let data = LocationAction.getAllMunicipalites(store.getState());

        // If exists, return
        if(data && data.length > 0) {
            !callback || callback(false, data);
            return Promise.resolve(data);
        }

        // If not, get from database
        const response = API.getMunicipalities().response();
        return response.then(async (data) => {
            if(response.isError === false) {
                await LocationAction.setAllMunicipalities(data)(store.dispatch);
                data = LocationAction.getAllMunicipalites(store.getState());
            }

            !callback || callback(response.isError, data);
            return data;
        });
    }
}
