import { FileDTO } from "@explorer/shared-types";
import { FileRepository } from "../repositories/file.repository";

export class FileService {
  private fileRepo: FileRepository;

  constructor() {
    this.fileRepo = new FileRepository();
  }

  async getFilesByFolder(folderId: number, search?: string): Promise<FileDTO[]> {
    return this.fileRepo.findByFolder(folderId, search);
  }

  async createFile(name: string, folderId: number): Promise<FileDTO> {
    return this.fileRepo.create(name, folderId);
  }

  async deleteFile(id: number): Promise<FileDTO> {
    return this.fileRepo.delete(id);
  }
}
