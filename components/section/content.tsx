"use client"

import React, { useState } from "react"

import { OpenWeatherMapApiData } from "@/types/search.api"

import SearchForm from "./search-form"
import WeatherSection from "./weather"

const Content = ({
  onSearch,
}: {
  onSearch: (
    lat: number,
    lon: number,
    name: string
  ) => Promise<OpenWeatherMapApiData | null>
}) => {
  const [currentInfo, setCurrentInfo] = useState<any>()

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      <WeatherSection />
    </div>
  )
}

export default Content
