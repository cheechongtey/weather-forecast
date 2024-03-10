import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

import { OpenWeatherMapApiData } from "@/types/search.api"
import supabase from "@/lib/supabase"

export async function GET(request: Request) {
  const { data, error } = await supabase.from("History").select()

  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const data = await request.json()

  const { error } = await supabase.from("History").delete().eq("id", data.id)

  revalidateTag("history")

  return NextResponse.json({})
}
