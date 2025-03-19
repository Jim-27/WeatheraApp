# Weather App

## Description
A simple weather application that fetches real-time weather data from the OpenWeatherMap API. Users can search for a city to view its temperature, humidity, and wind speed. The app features animated cloud movement and defaults to showing Manila's weather.

## Features
- Search weather by city
- Displays temperature (°C & °F), humidity, and wind speed
- Animated cloud movement
- Default city: Manila
- Responsive design

## API Source
- **OpenWeatherMap API**: Provides real-time weather data.
- Endpoint: `https://api.openweathermap.org/data/2.5/weather`

## React Hooks Used
### `useState`
- Manages city input, weather data, and cloud animation position.
```js
const [city, setCity] = useState("Manila");
const [weather, setWeather] = useState(null);
```

### `useEffect`
- Fetches weather data whenever the `city` state updates.
```js
useEffect(() => {
  fetchWeather(city);
}, [city]);
```


## Live Demo
[Weather App Live](https://yourgithub.github.io/weather-app)

