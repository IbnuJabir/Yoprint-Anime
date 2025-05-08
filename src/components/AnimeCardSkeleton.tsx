"use client"

import { motion } from "framer-motion"

interface AnimeCardSkeletonProps {
  index: number
}

export default function AnimeCardSkeleton({ index }: AnimeCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-lg overflow-hidden shadow-md"
    >
      <div className="relative pb-[140%]">
        <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse" />
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
      </div>
    </motion.div>
  )
}
