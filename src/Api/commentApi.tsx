import API from './authApi'

export const getcommentsRequest = async () => {
  const response = await API.get(
    '/Comment/dto/mapper'
  )

  return response.data
}


export const getcommentsbyUserIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Comment/dto/mapper?userId=${id}`
  ) 
  return response.data
}


export const getcommentsbyReviewIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Comment/dto/mapper?reviewId=${id}`
  )

  return response.data
}



export const getCommentByIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Comment/dto/mapper/${id}`
  )

  return response.data
}

export const createCommentRequest = async (
  comment: any
) => {
  const response = await API.post(
    '/Comment/dto/mapper',
    comment
  )

  return response.data
}

export const updateCommentRequest = async (
  id: number,
  comment: any
) => {
  const response = await API.put(
    `/Comment/dto/mapper/${id}`,
    comment
  )

  return response.data
}

export const deleteCommentRequest = async (
  id: number
) => {
  const response = await API.delete(
    `/Comment/dto/mapper/${id}`
  )

  return response.data
}