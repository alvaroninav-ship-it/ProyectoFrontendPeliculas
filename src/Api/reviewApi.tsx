import API from './authApi'

export const getReviewsRequest = async () => {
  const response = await API.get(
    '/Review/dto/mapper'
  )

  return response.data
}

export const getReviewsbyUserIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Review/dto/mapper?userId=${id}`
  ) 
  return response.data
}

export const getReviewsbyMovieIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Review/dto/mapper?movieId=${id}`
  )
  return response.data
}

export const getReviewByIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Review/dto/mapper/${id}`
  )

  return response.data
}

export const createReviewRequest = async (
  review: any
) => {
  const response = await API.post(
    '/Review/dto/mapper',
    review
  )

  return response.data
}

export const updateReviewRequest = async (
  id: number,
  review: any
) => {
  const response = await API.put(
    `/Review/dto/mapper/${id}`,
    review
  )

  return response.data
}

export const deleteReviewRequest = async (
  id: number
) => {
  const response = await API.delete(
    `/Review/dto/mapper/${id}`
  )

  return response.data
}