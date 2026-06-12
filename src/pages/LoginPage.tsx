import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {

  const [User, setLoginUser] = useState('')
  const [Password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()

    setError('')

    const success = await login(
      User,
      Password
    )

    console.log("Cuerpo:", { User, Password })

    if (!success) {
      setError('Credenciales incorrectas')
      return
    }

    const token = localStorage.getItem('token')

    if (!token) {
      setError('No se recibió token')
      return
    }

    const payload = JSON.parse(
      atob(token.split('.')[1])
    )

    const role =
      payload.role ||
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    switch (role) {

      case 'Administrator':
        navigate('/admin')
        break

      default:
        navigate('/home')
        break
    }
  }

  return (
    <div className="contenedor-grande">

      <div className="contenedor-form">

        <form
          className="formulario"
          onSubmit={handleSubmit}
        >

          <h2>Iniciar Sesión</h2>

          <input
            type="text"
            placeholder="Usuario"
            value={User}
            onChange={(e) =>
              setLoginUser(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={Password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Ingresar
          </button>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <p>
            ¿No tienes cuenta?
            <Link to="/register">
              Regístrate
            </Link>
          </p>

        </form>

      </div>

    </div>
  )
}

export default LoginPage