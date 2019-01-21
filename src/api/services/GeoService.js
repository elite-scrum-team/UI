
export default class GeoService {

    static getGeoLocation = (onSuccess, errorCallback) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    !onSuccess || onSuccess(position);
                }
            ,
            (error) => {
                !errorCallback || errorCallback(error);
            },
            {
                timeout: 5000,
            })
        } else {
            console.warn('Can not get Geo Location');
        }
    }
}