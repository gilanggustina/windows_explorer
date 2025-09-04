import axiosInstance from '@/plugins/axios'
import { type FileDTO, type FolderDTO } from '@explorer/shared-types'
const ENDPOINT_FOLDER = 'folders'
const ENDPOINT_FILE = 'files'

export const getFilesByFolder = async (folderId: number, search?: string): Promise<FileDTO[]> => {
  const { data } = await axiosInstance.get(`${ENDPOINT_FOLDER}/${folderId}/files`, { params: { search } })
  return data
}

export const createFile = async (name: string, folderId?: number | null): Promise<FolderDTO> => {
  const { data } = await axiosInstance.post(`${ENDPOINT_FILE}`, { name, folderId })
  return data
}

export const deleteFile = async (id: number): Promise<FolderDTO> => {
  const { data } = await axiosInstance.delete(`${ENDPOINT_FILE}/${id}`)
  return data
}
