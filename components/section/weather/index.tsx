"use client"

import React, { Suspense, useContext } from "react"
import dayjs from "dayjs"

import { WeatherContext } from "../provider"
import HistoryList from "./list"

const WeatherSection = () => {
  const { weather } = useContext(WeatherContext)

  return (
    <div className="rounded-2xl bg-[#533895] p-4 text-secondary md:p-10">
      <div className="mb-5 flex items-end space-x-4">
        <div className="w-1/3 md:w-full">
          <p className="mb-2 text-sm">{`Today's Weather`}</p>
          <div className="mb-1 text-6xl font-bold">
            {weather?.temp ?? 0}&deg;
          </div>
          <div className="mb-1 text-sm">
            H: {weather?.temp_max ?? 0}&deg; L: {weather?.temp_min ?? 0}&deg;
          </div>
          <div className="text-sm font-semibold md:hidden">
            {weather?.name ?? ""}
          </div>
        </div>
        <div className="w-2/3 text-right md:w-full">
          <div className="mb-1 text-sm">Clouds</div>
          <div className="mb-1 text-sm">Humidity: {weather?.humidity}%</div>
          <div className="text-sm font-semibold">
            {weather?.dt
              ? dayjs.unix(weather.dt).format("DD-MM-YYYY hh:mm:ssa")
              : dayjs().format("DD-MM-YYYY hh:mm:ssa")}
          </div>
        </div>
      </div>
      <Suspense fallback={<>Loading</>}>
        <HistoryList />
      </Suspense>
    </div>
  )
}

export default WeatherSection
