import { revalidateTag } from "next/cache"

import supabase from "@/lib/supabase"

export const onDelete = async (id: number) => {
  "use server"

  const { error } = await supabase.from("History").delete().eq("id", id)

  revalidateTag("history")

  return true
}
