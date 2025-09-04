import { FolderDTO } from "@explorer/shared-types";
import { FolderRepository } from "../repositories/folder.repository";

export class FolderService {
  private folderRepo: FolderRepository;

  constructor() {
    this.folderRepo = new FolderRepository();
  }

  async getRootFolder(): Promise<FolderDTO[]> {
    return this.folderRepo.findRoot();
  }

  async getAllFolders(): Promise<FolderDTO[]> {
    return this.folderRepo.findAll();
  }
  async getChildren(parentId: number, search?: string): Promise<FolderDTO[]> {
    return this.folderRepo.findChildren(parentId, search);
  }

  async getPath(folderId: number ):Promise<{id:number, name: string}[]> {
    return this.folderRepo.getPath(folderId)
  }

  async createFolder(name: string, parentId?: number): Promise<FolderDTO> {
    return this.folderRepo.create(name, parentId);
  }

  async deleteFolder(folderId: number): Promise<FolderDTO> {
    return this.folderRepo.delete(folderId);
  }
}
