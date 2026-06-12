import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomePage from '../pages/WelcomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomePage from '../pages/HomePage'
import MovieDetailPage from '../pages/MovieDetailPage'
import ProfilePage from '../pages/ProfilePage'
import MainLayout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'

import AdminPage from '../pages/AdminPage'
import UnauthorizedPage from '../pages/UnauthorizedPage'
import NotFoundPage from '../pages/NotFoundPage'

const AppRoutes = () => {
  return (
      <Routes>

        {/* Públicas */}

        <Route
          path="/"
          element={<WelcomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Con Navbar */}

        <Route element={<MainLayout />}>

          <Route
            path="/home"
            element={<HomePage />}
          />

          <Route
            path="/movie/:id"
            element={<MovieDetailPage />}
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRole="User">

                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="Administrator">
                <AdminPage />
              </ProtectedRoute>
            }
          />

        </Route>

        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>

  )
}

export default AppRoutes