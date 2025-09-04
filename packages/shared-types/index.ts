export interface FolderDTO {
  id: number;
  name: string;
  parentId?: number | null;
  files?: FileDTO[];
  children?: FolderDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FileDTO {
  id: number;
  name: string;
  folderId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FolderPath {
  id: number;
  name: string;
}
