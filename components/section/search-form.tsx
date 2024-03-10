"use client"

import React, { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import debounce from "lodash/debounce"
import get from "lodash/get"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { OpenWeatherMapApiData } from "@/types/search.api"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  input: z.string().min(3, {
    message: "Please start search with minimum 3 characters",
  }),
})

type AutocompleteApiData = {
  features: AutocompleteApiFeaturesData[]
}

type AutocompleteApiFeaturesData = {
  properties: {
    lat: number
    lon: number
    name: string
    formatted: string
  }
}

const SearchForm = ({
  onSearch,
  children,
}: {
  onSearch: (
    lat: number,
    lon: number,
    name: string
  ) => Promise<OpenWeatherMapApiData | null>
  children: React.ReactNode
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  })
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [results, setResults] = React.useState<AutocompleteApiFeaturesData[]>(
    []
  )

  const onSubmit = async (values: z.infer<typeof formSchema>) => {}

  const handleOnInputChange = async (value: string) => {
    const searchParams = new URLSearchParams({
      apiKey: "5c6babfb6afe4b23a5ce8ca4837d2aff",
      text: value,
    })

    if (value.length === 0) {
      setOpen(false)
    }

    if (value.length < 3) {
      return
    }
    setIsLoading(true)
    setOpen(true)
    const resp = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?${searchParams}`
    )

    const response: AutocompleteApiData = await resp.json()

    const arr = get(response, "features")
    setIsLoading(false)
    setResults(arr)
  }

  const handler = useCallback(debounce(handleOnInputChange, 500), [])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    handler(event.target.value)
  }

  const onClickLocation = async (lat: number, lon: number, name: string) => {
    setOpen(false)
    setResults([])
    const resp = await onSearch(lat, lon, name)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-20 flex items-end gap-4"
        >
          <div className="relative flex-1">
            <Input
              placeholder="Start search with enter at least 3 characters"
              onChange={onChange}
              // onClick={() => setOpen(true)}
              value={value}
            />
            {open && (
              <div className="absolute inset-x-0 top-[51px] rounded-b-md bg-white shadow-md">
                {isLoading ? (
                  <div className="flex justify-center p-4">
                    <Loader2 className="size-4 animate-spin" />
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {results.map((x, key) => (
                      <div
                        key={key}
                        className="cursor-pointer border-b p-4 text-xs font-semibold text-gray-800"
                        onClick={() =>
                          onClickLocation(
                            x.properties.lat,
                            x.properties.lon,
                            x.properties.formatted
                          )
                        }
                      >
                        {x.properties.formatted}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </form>
      </Form>
      {children}
    </>
  )
}

export default SearchForm
