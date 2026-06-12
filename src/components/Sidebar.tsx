import { useEffect, useState } from "react"
import API from "../Api/authApi"
import { Link } from "react-router-dom"

type Movie = {
  id: number
  title: string
  imageUrl: string
  averageGrade: number
  genre: string
}

type SidebarProps = {
  genre: string
  currentMovieId?: number
}

export default function Sidebar({ genre, currentMovieId }: SidebarProps) {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    if (!genre) return
    loadSimilar()
  }, [genre])

  const loadSimilar = async () => {
    try {
      const res = await API.get("/Movie/dto/mapper", {
        params: { genre }
      })

      const data = res.data?.data ?? res.data?.pagination ?? []
      const safe = Array.isArray(data) ? data : []

      // quitar la película actual
      const filtered = safe.filter(m => m.id !== currentMovieId)

      setMovies(filtered)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <aside className="sidebar">
      <h3>Películas similares</h3>

      {movies.length === 0 && <p>No hay recomendaciones</p>}

      {movies.map(movie => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="suggestion"
        >
          <img src={movie.imageUrl} />

          <div>
            <h4>{movie.title}</h4>
            <p>⭐ {movie.averageGrade?.toFixed(1) ?? "0.0"}</p>
          </div>
        </Link>
      ))}
    </aside>
  )
}