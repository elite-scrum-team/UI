
export default class GeoService {

    static getGeoLocation = (onSuccess) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    !onSuccess || onSuccess(position);
                }
            )
        } else {
            console.log('Can not get Geo Location');
        }
    }
}