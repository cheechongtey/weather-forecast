"use client"

import { createContext, useState } from "react"

type Weather = {
  humidity: number
  temp: number
  temp_max: number
  temp_min: number
  name: string
  dt: number
}

type Provider = {
  weather: Weather | null
  onUpdateWeather: (info: Weather) => void
}

export const WeatherContext = createContext<Provider>({} as Provider)

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [weather, setWeather] = useState<Weather | null>(null)

  const onUpdateWeather = (info: Weather) => {
    console.log(info)
    setWeather(info)
  }

  return (
    <WeatherContext.Provider value={{ onUpdateWeather, weather }}>
      {children}
    </WeatherContext.Provider>
  )
}
