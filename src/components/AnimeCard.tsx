"use client"

import type { Anime } from "../types"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface AnimeCardProps {
  anime: Anime
  index: number
}

export default function AnimeCard({ anime, index }: AnimeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/anime/${anime.mal_id}`} className="block h-full">
        <div className="relative pb-[140%]">
          <img
            src={anime.images.jpg.image_url || "/placeholder.svg"}
            alt={anime.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-1">{anime.title}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
              {anime.type || "Unknown"}
            </span>
            {anime.score > 0 && (
              <span className="ml-2 flex items-center">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {anime.score.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
