import { fetchFromApi } from "./ApiFetch";

export interface WeatherForecastData {
  forecasts: string[];
}

export const BLANK_WEATHER_FORECAST_DATA: WeatherForecastData = {
  forecasts: []
};

export function WeatherForecast(): Promise<WeatherForecastData> {
  return fetchFromApi("/WeatherForecast")
    .then(response => response.json());
}