"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimeDetails } from "../api/animeApi";
import type { Anime } from "../types";
import { ArrowLeft, Calendar, Clock, Star, Users, Video } from "lucide-react";
import ErrorMessage from "../components/ErrorMessage";
import { motion } from "framer-motion";

export default function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getAnimeDetails(Number.parseInt(id));
        setAnime(response.data);
      } catch (err) {
        setError("Failed to fetch anime details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  // Render skeleton loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="cursor-pointer flex items-center text-gray-600 hover:text-gray-900"
            style={{ cursor: "pointer" }}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-gray-200 rounded-lg aspect-[2/3] w-full"></div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/5"></div>
              <div className="space-y-2 mt-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>
        <ErrorMessage message={error} onRetry={() => navigate(0)} />
      </div>
    );
  }

  if (!anime) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        {anime.title}
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1"
        >
          <img
            src={anime.images.jpg.large_image_url || "/placeholder.svg"}
            alt={anime.title}
            className="w-full rounded-lg shadow-lg"
          />

          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold text-lg mb-2">Information</h3>
              <ul className="space-y-2">
                {anime.type && (
                  <li className="flex items-center text-sm">
                    <Video className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2">{anime.type}</span>
                  </li>
                )}
                {anime.episodes && (
                  <li className="flex items-center text-sm">
                    <Video className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-gray-600">Episodes:</span>
                    <span className="ml-2">{anime.episodes}</span>
                  </li>
                )}
                {anime.duration && (
                  <li className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2">{anime.duration}</span>
                  </li>
                )}
                {anime.aired?.string && (
                  <li className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-gray-600">Aired:</span>
                    <span className="ml-2">{anime.aired.string}</span>
                  </li>
                )}
                {anime.score > 0 && (
                  <li className="flex items-center text-sm">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="text-gray-600">Score:</span>
                    <span className="ml-2">
                      {anime.score} ({anime.scored_by.toLocaleString()} users)
                    </span>
                  </li>
                )}
                {anime.popularity > 0 && (
                  <li className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-gray-600">Popularity:</span>
                    <span className="ml-2">#{anime.popularity}</span>
                  </li>
                )}
              </ul>
            </div>

            {anime.studios && anime.studios.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-semibold text-lg mb-2">Studios</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.studios.map((studio) => (
                    <span
                      key={studio.mal_id}
                      className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {studio.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {anime.genres && anime.genres.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-semibold text-lg mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          {anime.trailer && anime.trailer.embed_url && (
            <div className="mb-8">
              <h3 className="font-semibold text-xl mb-4">Trailer</h3>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                <iframe
                  src={anime.trailer.embed_url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  title={`${anime.title} trailer`}
                ></iframe>
              </div>
            </div>
          )}

          {anime.synopsis && (
            <div className="mb-8">
              <h3 className="font-semibold text-xl mb-4">Synopsis</h3>
              <p className="text-gray-700 leading-relaxed">{anime.synopsis}</p>
            </div>
          )}

          {anime.background && (
            <div className="mb-8">
              <h3 className="font-semibold text-xl mb-4">Background</h3>
              <p className="text-gray-700 leading-relaxed">
                {anime.background}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
