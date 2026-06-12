import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  createUserRequest,
  registerSecurityRequest
} from '../Api/authApi'

const RegisterPage = () => {

  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const limpiarCampos = () => {
    setLogin('')
    setPassword('')
    setConfirmPassword('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setTelephone('')
    setDateOfBirth('')
  }

  
  const handleRegister = async (e: FormEvent) => {
  e.preventDefault()

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {

    const userData = {
      firstName,
      lastName,
      email,
      dateOfBirth: `${dateOfBirth}T00:00:00`,
      telephone
    }

    console.log('DATOS ENVIADOS A USER')
    console.log(userData)
    const fechaBackend =
  `${dateOfBirth}T00:00:00`
    const userResponse =
  await createUserRequest({
    firstName,
    lastName,
    email,
    dateOfBirth: fechaBackend,
    telephone
  })

    console.log('USER RESPONSE')
    console.log(userResponse)

    const userId =
      userResponse.id ||
      userResponse.data?.id

    if (!userId) {
      throw new Error(
        'No se pudo obtener el ID del usuario creado'
      )
    }

    await registerSecurityRequest(
      userId,
      login,
      password,
      `${firstName} ${lastName}`,
      2
    )

    alert('Usuario registrado correctamente')

    limpiarCampos()

    navigate('/login')

  } catch (error: any) {

    console.error(error)

    console.log(
      'Response:',
      error.response
    )

    console.log(
      'Data:',
      error.response?.data
    )

    alert('Error al registrar usuario')
  }
}

  return (
    <div className="contenedor-grande">

      <div className="contenedor-form">

        <form
          className="formulario"
          onSubmit={handleRegister}
        >

          <h2>Crear Cuenta</h2>

          <input
            type="text"
            placeholder="Usuario"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />

          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">
            Registrarse
          </button>

          <p>
            ¿Ya tienes cuenta?
            <Link to="/login">
              Inicia sesión
            </Link>
          </p>

        </form>

      </div>

    </div>
  )
}

export default RegisterPage