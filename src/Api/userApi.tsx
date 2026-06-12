import API from './authApi'

export const getUsersRequest = async () => {
  const response = await API.get(
    '/User/dto/mapper'
  )

  return response.data
}

export const getCommentsbyUserIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/Comment/dto/mapper?userId=${id}`
  ) 
  return response.data
}

export const getUserByIdRequest = async (
  id: number
) => {
  const response = await API.get(
    `/User/dto/mapper/${id}`
  )

  return response.data
}

export const createUserRequest = async (
  user: any
) => {
  const response = await API.post(
    '/User/dto/mapper',
    user
  )

  return response.data
}

export const updateUserRequest = async (
  id: number,
  user: any
) => {
  const response = await API.put(
    `/User/dto/mapper/${id}`,
    user
  )

  return response.data
}

export const deleteUserRequest = async (
  id: number
) => {
  const response = await API.delete(
    `/User/dto/mapper/${id}`
  )

  return response.data
}