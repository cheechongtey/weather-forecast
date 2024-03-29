export type OpenWeatherMapApiData = {
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  dt: number
  weather: WeatherData[]
  name: string
}

export type WeatherData = {
  main: string
}
