import * as axios from 'react-native-axios';


export default class Controller {
    static instance = Controller.instance || new Controller()

    getBuses() {
        return axios.get('http://transfer.ttc.com.ge:8080/otp/routers/ttc/routes?type=3')
    };

    getBusDirectionsByBusId(numberOfTheBus) {
         return axios.get(`http://transfer.ttc.com.ge:8080/otp/routers/ttc/routeInfo?routeNumber=${numberOfTheBus}&type=bus`)
    };

    getBusArrivalTimes(stopId) {
        return axios.get(`http://transfer.ttc.com.ge:8080/otp/routers/ttc/stopArrivalTimes?stopId=${stopId}`);
    };

    getRouteStops(fowardId, busId) {
        return axios.get(`http://transfer.ttc.com.ge:8080/otp/routers/ttc/routeStops?routeNumber=${busId}&forward=${fowardId}`);
    };
    
};