import { useEffect, useState } from 'react'
import Card from '../components/Card'
import MovieCard from '../components/MovieCard'
import { getMoviesRequest } from '../Api/MovieApi'
import './WelcomePage.css'
import Hero from '../components/Hero'
import Footer from '../components/footer'
import { Helmet } from 'react-helmet-async'
type Movie = {
  id: number
  title: string
  imageUrl: string
  rating?: number
  reviewCount?: number
}


const WelcomePage = () => {

  const mockMovies: Movie[] = [
    {
      id: 1,
      title: "Inception",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbY-KG6to1c6TnWtwLvFbPva_pqcffh7UlWiOCjmUFuA&s=10",
      rating: 4.8,
      reviewCount: 1200
    },
    {
      id: 2,
      title: "The Dark Knight",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      rating: 4.9,
      reviewCount: 1500
    },
    {
      id: 3,
      title: "Interstellar",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6MBU9VxzNxqU0gzzOsgDR0Mpxn4_6BDHIzD-Xc8YaQ&s=10",
      rating: 4.7,
      reviewCount: 1100
    },
    {
      id: 4,
      title: "The Matrix",
      imageUrl: "data:image/jpeg;base64,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",
      rating: 4.6,
      reviewCount: 1300
    }
  ]
  return ( 
    <>
    <Helmet>
    
            <title>
              Bienvenida a la pagina de peliculas
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
    <Hero/>
<section className="popular">

    <h2>Películas Populares</h2>

    <div className="movies">

        {mockMovies.map((movie) => (
            <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={movie.imageUrl}
                rating={movie.rating}
                numberOfReviews={movie.reviewCount}
            />
        ))}
    </div>

    </section>

    <section className="features">

    <h2>¿Qué puedes hacer?</h2>

        <div className="cards">
        <Card logo="📝">
            Publicar reseñas
        </Card>
        <Card logo="⭐">
            Calificar películas
        </Card>
        <Card logo="💬">
            Comentar críticas
        </Card>
        <Card logo="🎭">
            Explorar actores
        </Card>
        </div>
    </section>
    <Footer title="Movie Reviews" description="Proyecto de críticas y reseñas cinematográficas." />
    </>
  )
}

export default WelcomePage