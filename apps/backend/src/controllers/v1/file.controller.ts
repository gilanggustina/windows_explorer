import { Request, Response } from "express";
import { FileService } from "../../services/file.service";
import { FileDTO } from "@explorer/shared-types";

const fileService = new FileService();

export class FileControllerV1 {
  static async getByFolder(req: Request, res: Response) {
    const { folderId } = req.params;
    const { search } = req.query;
    const files: FileDTO[] = await fileService.getFilesByFolder(Number(folderId), search as string);
    res.json(files);
  }

  static async create(req: Request, res: Response) {
    const { name, folderId } = req.body;
    const file: FileDTO = await fileService.createFile(name, folderId);
    res.json(file);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const file: FileDTO = await fileService.deleteFile(Number(id));
    res.json(file);
  }
}
