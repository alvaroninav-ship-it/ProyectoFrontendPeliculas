import API from './authApi'

export const getActorsRequest = async () => {
  const response = await API.get(
    '/Actor/dto/mapper'
  )

  return response.data
}

export const getActorsbyMovieIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Actor/dto/mapper?movieId=${id}`
  )
  return response.data
}

export const getActorByIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Actor/dto/mapper/${id}`
  )

  return response.data
}

export const createActorRequest = async (
  actor: any
) => {
  const response = await API.post(
    '/Actor/dto/mapper',
    actor
  )

  return response.data
}

export const updateActorRequest = async (
  id: number,
  actor: any
) => {
  const response = await API.put(
    `/Actor/dto/mapper/${id}`,
    actor
  )

  return response.data
}

export const deleteActorRequest = async (
  id: number
) => {
  const response = await API.delete(
    `/Actor/dto/mapper/${id}`
  )

  return response.data
}