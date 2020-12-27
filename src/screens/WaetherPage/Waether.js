import React from 'react';


// view and model for Counter scene
import Counter from './WeatherView';
import store from './WeatherModel';


class Weather extends Component {
    render() {
        return (
            <Counter store={store}></Counter>
        );
    }
}

export default Weather;