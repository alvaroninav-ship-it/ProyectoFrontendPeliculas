import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../Api/authApi"
import Sidebar from "../components/Sidebar"
type Movie = {
  id: number
  title: string
  description: string
  imageUrl: string
  averageGrade: number
  length: number
  releaseDate: string
  genre: string
}

type Actor = {
  id: number
  firstName: string
  lastName: string
  pictureUrl?: string
  movieId?: number
}

type Review = {
  id: number
  description: string
  grade: number
  userId: number
  date?: string
}

export default function MovieDetailPage() {
  const { id } = useParams()

  const [movie, setMovie] = useState<Movie | null>(null)
  const [actors, setActors] = useState<Actor[]>([])
  const [reviews, setReviews] = useState<Review[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [grade, setGrade] = useState(5)
  const [description, setDescription] = useState("")
  const [sending, setSending] = useState(false)

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")

      // 🎬 MOVIE
      const movieRes = await API.get(`/Movie/dto/mapper/${id}`)
      setMovie(movieRes.data?.data ?? null)

      // ⭐ REVIEWS (FIX robusto)
      const reviewRes = await API.get(`/Review/dto/mapper`, {
        params: { MovieId: id }
      })

      const reviewData =
        reviewRes.data?.data?.items ??
        reviewRes.data?.data ??
        reviewRes.data ??
        []

      setReviews(Array.isArray(reviewData) ? reviewData : [])

      // 🎭 ACTORS
      const actorRes = await API.get(`/Actor/dto/mapper`)

      const actorData =
        actorRes.data?.data ??
        actorRes.data?.pagination ??
        []

      const safeActors = Array.isArray(actorData) ? actorData : []

      setActors(
        safeActors.filter((a: any) => a.movieId === Number(id))
      )

    } catch (err) {
      console.error(err)
      setError("Error cargando datos")
    } finally {
      setLoading(false)
    }
  }

  const handleAddReview = async () => {
    try {
      setSending(true)
      setError("")

      await API.post("/Review/dto/mapper", {
        movieId: Number(id),
        userId: Number(localStorage.getItem("userId")) || 34,
        grade,
        description,
        date: new Date().toISOString()
      })

      setDescription("")
      setGrade(5)

      await loadData()

    } catch (err) {
      console.error(err)
      setError("Error creando review")
    } finally {
      setSending(false)
    }
  }

  if (loading) return <h2>Cargando...</h2>
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>
  if (!movie) return <h2>No encontrada</h2>

  return (
  <div className="movie-page">

    <main className="main-content">

      {/* HERO BANNER */}
      <div className="movie-banner">
        <img src="https://picsum.photos/1920/1080" alt={movie.title} />
      </div>

      {/* HEADER */}
      <section className="movie-header">

        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="poster"
        />

        <div className="movie-info">

          <h1>{movie.title}</h1>

          <div className="rating">
            ⭐ {movie.averageGrade?.toFixed(1) ?? "0.0"}
          </div>

          <p><b>Género:</b> {movie.genre}</p>
          <p><b>Duración:</b> {movie.length} min</p>
          <p><b>Fecha:</b> {movie.releaseDate}</p>

          <button onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}>
            Escribir reseña
          </button>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="description">
        <h2>Sinopsis</h2>
        <p>{movie.description}</p>
      </section>

      {/* ACTORS */}
      <section className="actors">
        <h2>Actores</h2>

        <div className="actor-list">
          {actors.map(a => (
            <div className="actor" key={a.id}>
              <img src={a.pictureUrl || "https://picsum.photos/120"} />
              <span>{a.firstName} {a.lastName}</span>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews">
        <h2>Reseñas ({reviews.length})</h2>

        {reviews.map(r => (
          <article className="review" key={r.id}>

            <div className="review-header">
              <div>
                <h3>Usuario {r.userId}</h3>
                <span>⭐ {r.grade}</span>
              </div>
            </div>

            <p>{r.description}</p>
          </article>
        ))}

        {/* FORM */}
        <div className="review-form">
          <h3>Agregar reseña</h3>

          <input
            type="number"
            min={1}
            max={10}
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escribe tu reseña..."
          />

          <button onClick={handleAddReview} disabled={sending}>
            {sending ? "Enviando..." : "Publicar"}
          </button>
        </div>
      </section>

    </main>

    {/* SIDEBAR */}
    <Sidebar genre={movie.genre} currentMovieId={movie.id}/>

  </div>
)
}