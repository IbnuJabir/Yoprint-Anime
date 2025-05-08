import type { AnimeDetailResponse, AnimeResponse } from "../types"

const BASE_URL = "https://api.jikan.moe/v4"

// Add delay to prevent rate limiting
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const searchAnime = async (query: string, page = 1): Promise<AnimeResponse> => {
  try {
    // Add a small delay to prevent rate limiting (Jikan API has rate limits)
    await delay(300)

    const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=10`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching anime:", error)
    throw error
  }
}

export const getAnimeDetails = async (id: number): Promise<AnimeDetailResponse> => {
  try {
    // Add a small delay to prevent rate limiting
    await delay(300)

    const response = await fetch(`${BASE_URL}/anime/${id}/full`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching anime details:", error)
    throw error
  }
}
