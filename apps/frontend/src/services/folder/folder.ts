import axiosInstance from "@/plugins/axios";
import { type FolderDTO, type FolderPath } from "@explorer/shared-types";
const ENDPOINT_FOLDER = "folders";

export const getAllFolders = async (): Promise<FolderDTO[]> => {
  const { data } = await axiosInstance.get(`${ENDPOINT_FOLDER}`);
  return data;
};

export const getRootFolder = async (): Promise<FolderDTO[]> => {
  const { data } = await axiosInstance.get(`${ENDPOINT_FOLDER}/root`);
  return data;
};

export const getChildren = async (parentId: number,search?: string): Promise<FolderDTO[]> => {
  const { data } = await axiosInstance.get(`${ENDPOINT_FOLDER}/${parentId}/children`,{params:{search}});
  return data;
};

export const getFolderPath = async (id: number): Promise<FolderPath[]> => {
  const { data } = await axiosInstance.get(`${ENDPOINT_FOLDER}/${id}/path`)
  return data
}

export const createFolder = async (name: string, parentId?: number | null): Promise<FolderDTO> => {
  const { data } = await axiosInstance.post(`${ENDPOINT_FOLDER}`, { name, parentId });
  return data;
};

export const deleteFolder = async (folderId: number): Promise<FolderDTO> => {
  const { data } = await axiosInstance.delete(`${ENDPOINT_FOLDER}/${folderId}`);
  return data;
};
