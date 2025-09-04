import { Request, Response } from "express";
import { FolderService } from "../../services/folder.service";
import { FolderDTO } from "@explorer/shared-types";

const folderService = new FolderService();

export class FolderControllerV1 {
  static async getRoot(req: Request, res: Response) {
    const folders: FolderDTO[] = await folderService.getRootFolder();
    res.json(folders);
  }

  static async getAll(req: Request, res: Response) {
    const folders: FolderDTO[] = await folderService.getAllFolders();
    res.json(folders);
  }

  static async getChildren(req: Request, res: Response) {
    const { id } = req.params;
    const { search } = req.query;
    const children: FolderDTO[] = await folderService.getChildren(Number(id), search as string);
    res.json(children);
  }

  static async getPath(req: Request, res: Response) {
    const { id } = req.params;
    const path: { id: number; name: string }[] = await folderService.getPath(Number(id));
    res.json(path);
  }

  static async create(req: Request, res: Response) {
    const { name, parentId } = req.body;
    const folder: FolderDTO = await folderService.createFolder(name, parentId);
    res.json(folder);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const folder: FolderDTO = await folderService.deleteFolder(Number(id));
    res.json(folder);
  }
}
