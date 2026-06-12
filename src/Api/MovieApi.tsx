import API from './authApi'

export const getMoviesRequest = async () => {
  const response = await API.get(
    '/Movie/dto/mapper'
  )

  return response.data
}


export const getMoviesbyGenreRequest = async (
  genre: string
) => {
  const response = await API.get(
    `/Movie/dto/mapper?genre=${genre}`
  )
  return response.data
}

export const getMovieByIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Movie/dto/mapper/${id}`
  )

  return response.data
}

export const createMovieRequest = async (
  movie: any
) => {
  const response = await API.post(
    '/Movie/dto/mapper',
    movie
  )

  return response.data
}

export const updateMovieRequest = async (
  id: number,
  movie: any
) => {
  const response = await API.put(
    `/Movie/dto/mapper/${id}`,
    movie
  )

  return response.data
}

export const deleteMovieRequest = async (
  id: number
) => {
  const response = await API.delete(
    `/Movie/dto/mapper/${id}`
  )

  return response.data
}