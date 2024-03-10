import React from "react"
import dayjs from "dayjs"

import { HistoryApiData } from "@/types/history.api"

import HistoryItem from "./item"

const HistoryList = async () => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_ORIGIN}/api/search`, {
    method: "GET",
    cache: "no-store",
    next: {
      revalidate: 1500,
      tags: ["history"],
    },
  })
  const historyData: HistoryApiData[] = await resp.json()

  return (
    <div className="rounded-2xl bg-primary p-6">
      <p className="mb-6">Search History</p>
      <div className="flex flex-col gap-4">
        {historyData.map((x, key) => (
          <HistoryItem
            key={key}
            name={x.location_name}
            date={dayjs(x.created_at).format("DD-MM-YYYY hh:mma")}
          />
        ))}
      </div>
    </div>
  )
}

export default HistoryList
