import { revalidatePath, revalidateTag } from "next/cache"

import { OpenWeatherMapApiData } from "@/types/search.api"
import supabase from "@/lib/supabase"

export const onSearchLocation = async (
  lat: number,
  lon: number,
  name: string
): Promise<OpenWeatherMapApiData | null> => {
  "use server"

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_API_KEY}&units=metric`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    return null
  }

  const weatherData: OpenWeatherMapApiData = await res.json()
  const { error, status } = await supabase
    .from("History")
    .insert({ location_name: name, lat, lon })

  revalidateTag("history")

  return weatherData
}
