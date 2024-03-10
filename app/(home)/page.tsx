import { onSearchLocation } from "@/action/search"

import Content from "@/components/section/content"
import WeatherSection from "@/components/section/weather"

import SearchForm from "../../components/section/search-form"

export default function IndexPage() {
  return (
    <section className="container px-4 pb-8 pt-6 md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-[700px]">
        <SearchForm onSearch={onSearchLocation}>
          <WeatherSection />
        </SearchForm>
      </div>
    </section>
  )
}
