// Types for the Jikan API responses
export interface AnimeResponse {
    pagination: Pagination
    data: Anime[]
  }
  
  export interface Pagination {
    last_visible_page: number
    has_next_page: boolean
    current_page: number
    items: {
      count: number
      total: number
      per_page: number
    }
  }
  
  export interface Anime {
    mal_id: number
    url: string
    images: {
      jpg: {
        image_url: string
        small_image_url: string
        large_image_url: string
      }
      webp: {
        image_url: string
        small_image_url: string
        large_image_url: string
      }
    }
    trailer: {
      youtube_id: string
      url: string
      embed_url: string
    }
    approved: boolean
    titles: {
      type: string
      title: string
    }[]
    title: string
    title_english: string
    title_japanese: string
    title_synonyms: string[]
    type: string
    source: string
    episodes: number
    status: string
    airing: boolean
    aired: {
      from: string
      to: string
      prop: {
        from: {
          day: number
          month: number
          year: number
        }
        to: {
          day: number
          month: number
          year: number
        }
      }
      string: string
    }
    duration: string
    rating: string
    score: number
    scored_by: number
    rank: number
    popularity: number
    members: number
    favorites: number
    synopsis: string
    background: string
    season: string
    year: number
    studios: {
      mal_id: number
      type: string
      name: string
      url: string
    }[]
    genres: {
      mal_id: number
      type: string
      name: string
      url: string
    }[]
  }
  
  export interface AnimeDetailResponse {
    data: Anime
  }
  