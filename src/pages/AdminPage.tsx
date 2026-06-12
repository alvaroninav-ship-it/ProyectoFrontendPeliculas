import { useEffect, useState } from "react"
import API from "../Api/authApi"
import MovieCard from "../components/MovieCard"
import Button from "../components/Button"
type Movie = {
  id: number
  title: string
  description: string
  imageUrl: string
  genre: string
  length: string
  releaseDate: string
  averageGrade?: number
}

export default function AdminPage() {

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [form, setForm] = useState<Movie>({
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    genre: "",
    length: "",
    releaseDate: ""
  })

  const [editing, setEditing] = useState(false)

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    try {
      setLoading(true)
      setError("")

      const res = await API.get("/Movie/dto/mapper")

      const data = res.data?.data ?? res.data?.pagination ?? []
      setMovies(Array.isArray(data) ? data : [])

    } catch (err) {
      console.error(err)
      setError("Error cargando películas")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 🔥 CREATE / UPDATE FIXED
  const handleSubmit = async () => {
    try {
      setError("")

      const payload = {
        Id: form.id, 
        Title: form.title.trim(),
        ImageUrl: form.imageUrl.trim(),
        Description: form.description.trim(),
        ReleaseDate: form.releaseDate
          ? new Date(form.releaseDate).toISOString()
          : new Date().toISOString(),
        Length: form.length.trim(),
        Genre: form.genre.trim()
      }

      console.log("PAYLOAD:", payload)

      if (editing) {
        await API.put(`/Movie/dto/mapper/${form.id}`, payload)
      } else {
        await API.post("/Movie/dto/mapper", payload)
      }

      setForm({
        id: 0,
        title: "",
        description: "",
        imageUrl: "",
        genre: "",
        length: "",
        releaseDate: ""
      })

      setEditing(false)
      await loadMovies()

    } catch (err: any) {
      console.error("ERROR:", err.response?.data || err)
      setError("Error guardando película")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/Movie/dto/mapper/${id}`)
      await loadMovies()
    } catch (err) {
      console.error(err)
      setError("Error eliminando película")
    }
  }

  const handleEdit = (movie: Movie) => {
    setForm({
      ...movie,
      releaseDate: movie.releaseDate?.slice(0, 10)
    })
    setEditing(true)
  }

  if (loading) return <h2>Cargando...</h2>

  return (
    <div className="admin-container">

      <h1>🎬 Admin Panel</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* FORM */}
      <div className="admin-form">

        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="imageUrl"
          placeholder="Imagen URL"
          value={form.imageUrl}
          onChange={handleChange}
        />

        <input
          name="genre"
          placeholder="Género"
          value={form.genre}
          onChange={handleChange}
        />

        <input
          name="length"
          placeholder="Duración (ej: 1h 50m)"
          value={form.length}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="releaseDate"
          type="date"
          value={form.releaseDate}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit}>
          {editing ? "Actualizar" : "Crear"}
        </Button>

      </div>

      {/* LISTA */}
      <div className="movies-grid">

        {movies.map(m => (
          <div key={m.id} className="movie-item">

            <MovieCard
              id={m.id}
              title={m.title}
              image={m.imageUrl}
              rating={m.averageGrade}
            />

            <div className="actions">
              <button onClick={() => handleEdit(m)}>✏️</button>
              <button onClick={() => handleDelete(m.id)}>🗑️</button>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}