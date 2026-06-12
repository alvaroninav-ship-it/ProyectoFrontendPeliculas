import { useEffect, useState } from 'react'

import MovieCard from '../components/MovieCard'
import { getMoviesRequest } from '../Api/MovieApi'

import { Helmet } from 'react-helmet-async'

type Movie = {
  id: number
  title: string
  imageUrl: string
  rating?: number
  reviewCount?: number
}

const HomePage = () => {

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search] = useState('')

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await getMoviesRequest()

      // 🔥 FIX: soporta varios formatos de API
      const data = response.data?.data ?? response.data ?? []

      setMovies(data)

    } catch (error) {
      console.error(error)
      setError('Error cargando películas')
    } finally {
      setLoading(false)
    }
  }

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
    <Helmet>

        <title>
          Inicio de interfaz de peliculas
        </title>

        <meta
          name="description"
          content="Agrupacion de peliculas del cine moderno"
        />

        <meta
          name="keywords"
          content="Peliculas, Actores, Redes Sociales"
        />

        <meta
          name="author"
          content="Alvaro Nina"
        />

        {/* Open Graph */}

        <meta
          property="og:title"
          content="Pagina de peliculas y reviews"
        />

        <meta
          property="og:description"
          content="Centro social acerca de peliculas"
        />

        <meta
          property="og:type"
          content="website"
        />

      </Helmet>
      <main className="movies-grid">

        {loading && <h2>Cargando películas...</h2>}

        {error && <h2 style={{ color: 'red' }}>{error}</h2>}

        {!loading && !error &&
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={movie.imageUrl}
              rating={movie.rating}
              numberOfReviews={movie.reviewCount}
            />
          ))
        }

      </main>
    </>
  )
}

export default HomePage