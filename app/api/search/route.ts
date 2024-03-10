import { NextResponse } from "next/server"

import { OpenWeatherMapApiData } from "@/types/search.api"
import supabase from "@/lib/supabase"

export async function GET(request: Request) {
  const { data, error } = await supabase.from("History").select()

  return NextResponse.json(data)
}
