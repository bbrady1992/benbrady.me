export interface WeatherForecastData {
  forecasts: string[];
}

export const BLANK_WEATHER_FORECAST_DATA: WeatherForecastData = {
  forecasts: []
};

export function WeatherForecast(): Promise<WeatherForecastData> {
  return fetch("https://localhost:5001/WeatherForecast")
    .then(response => response.json());
}