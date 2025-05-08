"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { searchAnime } from "../api/animeApi"
import type { Anime, AnimeResponse } from "../types"
import SearchBar from "../components/SearchBar"
import AnimeCard from "../components/AnimeCard"
import AnimeCardSkeleton from "../components/AnimeCardSkeleton"
import Pagination from "../components/Pagination"
import ErrorMessage from "../components/ErrorMessage"
import EmptyState from "../components/EmptyState"
import { motion } from "framer-motion"

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const page = Number.parseInt(searchParams.get("page") || "1")

  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [pagination, setPagination] = useState<AnimeResponse["pagination"] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle search query changes
  const handleSearch = (newQuery: string) => {
    if (newQuery !== query) {
      setSearchParams({ q: newQuery, page: "1" })
    }
  }

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setSearchParams({ q: query, page: newPage.toString() })
  }

  // Fetch anime data
  useEffect(() => {
    const fetchAnime = async () => {
      // Don't search if query is empty
      if (!query.trim()) {
        setAnimeList([])
        setPagination(null)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await searchAnime(query, page)
        setAnimeList(response.data)
        setPagination(response.pagination)
      } catch (err) {
        setError("Failed to fetch anime. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [query, page])

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array.from({ length: 10 }).map((_, index) => <AnimeCardSkeleton key={index} index={index} />)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Anime Search
      </motion.h1>

      <SearchBar onSearch={handleSearch} initialQuery={query} />

      {error && <ErrorMessage message={error} onRetry={() => handlePageChange(page)} />}

      {!error && (
        <>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">{renderSkeletons()}</div>
          ) : (
            <>
              {animeList.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {animeList.map((anime, index) => (
                      <AnimeCard key={anime.mal_id} anime={anime} index={index} />
                    ))}
                  </div>

                  {pagination && (
                    <Pagination
                      currentPage={pagination.current_page}
                      totalPages={pagination.last_visible_page}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              ) : (
                query && <EmptyState message="Try adjusting your search or filter to find what you're looking for." />
              )}

              {!query && (
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium text-gray-700 mb-2">Start searching for anime</h2>
                  <p className="text-gray-500">Type in the search bar to find your favorite anime</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
