"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded-md"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 flex items-center text-sm font-medium text-red-700 hover:text-red-600"
            >
              <RefreshCw className="mr-1 h-4 w-4" />
              Try again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
