import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export class FolderRepository {
  async findRoot() {
    return prisma.folder.findMany({
      where: { parentId: null },
      include: { children: true },
    });
  }

  async findAll() {
    return prisma.folder.findMany({
      include: { children: true, files: true },
    });
  }

  async findChildren(parentId: number, search?: string) {
    return prisma.folder.findMany({
      where: {
        parentId,
        ...(search
          ? {
              name: {
                contains: search,
              },
            }
          : {}),
      },
      include: {
        files: true,
        children: true,
      },
    });
  }

  async getPath(folderId: number) {
    let path: { id: number; name: string }[] = [];
    let current = await prisma.folder.findUnique({ where: { id: folderId } });
    while (current) {
      path.unshift({ id: current.id, name: current.name });
      if (!current.parentId) break;
      current = await prisma.folder.findUnique({
        where: { id: current.parentId },
      });
    }

    return path;
  }

  async create(name: string, parentId?: number) {
    return prisma.folder.create({
      data: { name, parentId },
    });
  }

  async delete(folderId: number) {
    return prisma.folder.delete({ where: { id: folderId } });
  }
}
