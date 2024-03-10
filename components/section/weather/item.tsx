"use client"

import React from "react"
import { Search, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

const HistoryItem = ({ name, date }: { name: string; date: string }) => {
  const onDelete = () => {}

  const onSearch = () => {}

  return (
    <div className="flex-1 rounded-2xl bg-[#1A1A1A80] p-4">
      <div className="flex items-center md:gap-4">
        <div className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="mb-1 text-sm">{name}</div>
          <div className="text-xs text-slate-300 md:flex-[0_0_auto]">
            {date}
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" onClick={() => onSearch()}>
            <Search className="size-[1.5rem]" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete()}>
            <Trash className="size-[1.5rem]" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HistoryItem
