"use client"

import { Search } from "lucide-react"
import { motion } from "framer-motion"

interface EmptyStateProps {
  message: string
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-1">No results found</h3>
      <p className="text-gray-500 text-center max-w-md">{message}</p>
    </motion.div>
  )
}
