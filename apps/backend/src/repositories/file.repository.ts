import prisma from "../prisma";

export class FileRepository {
  async findByFolder(folderId: number, search?: string) {
    return prisma.file.findMany({
      where: { 
        folderId,
        ...(search
          ? {
              name: {
                contains: search
              },
            }
          : {})
      },
    });
  }

  async create(name: string, folderId: number) {
    return prisma.file.create({
      data: { name, folderId },
    });
  }

  async delete(id: number) {
    return prisma.file.delete({ where: { id } });
  }
}
