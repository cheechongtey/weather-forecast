import React from "react"
import dayjs from "dayjs"

import HistoryList from "./list"

const WeatherSection = () => {
  return (
    <div className="rounded-2xl bg-[#533895] p-4 text-secondary md:p-10">
      <div className="mb-5 flex items-end space-x-4">
        <div className="w-1/3 md:w-full">
          <p className="mb-2 text-sm">{`Today's Weather`}</p>
          <div className="mb-1 text-6xl font-bold">26&deg;</div>
          <div className="mb-1 text-sm">H: 29&deg; L: 28&deg;</div>
          <div className="text-sm font-semibold md:hidden">Johor, MY</div>
        </div>
        <div className="w-2/3 text-right md:w-full">
          <div className="mb-1 text-sm">Clouds</div>
          <div className="mb-1 text-sm">Humidity: 58%</div>
          <div className="text-sm font-semibold">
            {dayjs().format("DD-MM-YYYY hh:mm:ssa")}
          </div>
        </div>
      </div>
      <HistoryList />
    </div>
  )
}

export default WeatherSection
