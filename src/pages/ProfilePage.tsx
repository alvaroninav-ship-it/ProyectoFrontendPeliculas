import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { getUserByIdRequest } from "../Api/userApi"
import { getReviewsbyUserIdRequest } from "../Api/reviewApi"
import { getCommentsbyUserIdRequest } from "../Api/userApi"


export default function ProfilePage() {
  const { user } = useAuth()

  const [profile, setProfile] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return

      setLoading(true)

      try {
        const userResponse = await getUserByIdRequest(user.id)
        const reviewsResponse = await getReviewsbyUserIdRequest(user.id)
        const commentsResponse = await getCommentsbyUserIdRequest(user.id)

        setProfile(userResponse.data?.data ?? userResponse.data ?? null)
        setReviews(reviewsResponse.data?.data ?? reviewsResponse.data?.pagination ?? [])
        setComments(commentsResponse.data?.data ?? commentsResponse.data?.pagination ?? [])

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user?.id])

  if (loading) return <h2 className="loading">Cargando perfil...</h2>
  if (!profile) return <h2 className="loading">No hay usuario</h2>

  return (
    <div className="profile-container">

      {/* 👤 DATOS PERSONALES */}
      <div className="profile-card">

        <h1 className="profile-title">
          👤 Mi Perfil
        </h1>

        <div className="info-grid">

          <div className="info-item">
            <span className="label">Nombre</span>
            <span className="value">
              {profile.firstName} {profile.lastName}
            </span>
          </div>

          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">{profile.email}</span>
          </div>

          <div className="info-item">
            <span className="label">Teléfono</span>
            <span className="value">
              {profile.telephone ?? "No registrado"}
            </span>
          </div>

          <div className="info-item">
            <span className="label">Fecha de nacimiento</span>
            <span className="value">
              {profile.dateOfBirth
                ? new Date(profile.dateOfBirth).toLocaleDateString()
                : "No registrada"}
            </span>
          </div>

        </div>
      </div>

      {/* 📊 ACTIVIDAD */}
      <div className="activity-card">

        <h2>📊 Actividad</h2>

        <div className="stats">
          <div className="stat">
            <h3>{reviews.length}</h3>
            <p>Reseñas</p>
          </div>

          <div className="stat">
            <h3>{comments.length}</h3>
            <p>Comentarios</p>
          </div>
        </div>

      </div>

    </div>
  )
}