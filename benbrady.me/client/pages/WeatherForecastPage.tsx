import { List, ListItem, Spinner, UnorderedList } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  BLANK_WEATHER_FORECAST_DATA,
  WeatherForecastData,
  WeatherForecast,
} from "../api/WeatherForecast";

export default function WeatherForecastPage(): JSX.Element {
  useEffect(() => {
    WeatherForecast().then((data) => {
      setForecastData(data);
    });
  }, []);

  const [forecastData, setForecastData] = useState<WeatherForecastData>(
    BLANK_WEATHER_FORECAST_DATA
  );
  const forecastDataLoaded = useMemo(() => {
    return forecastData != BLANK_WEATHER_FORECAST_DATA;
  }, [forecastData]);

  return (
    <>
      <UnorderedList>
        {forecastDataLoaded ? (
          forecastData?.forecasts?.map((forecast) => (
            <ListItem>{forecast}</ListItem>
          ))
        ) : (
          <Spinner />
        )}
      </UnorderedList>
    </>
  );
}
