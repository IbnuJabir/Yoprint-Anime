"use client"

import { type ChangeEvent, useEffect, useState } from "react"
import { useDebounce } from "../hooks/useDebounce"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
  initialQuery?: string
}

export default function SearchBar({ onSearch, initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(query, 250) // 250ms debounce

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  // Trigger search when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery)
  }, [debouncedQuery, onSearch])

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 focus:shadow-lg"
          placeholder="Search for anime..."
          value={query}
          onChange={handleChange}
          aria-label="Search for anime"
        />
      </div>
    </div>
  )
}
