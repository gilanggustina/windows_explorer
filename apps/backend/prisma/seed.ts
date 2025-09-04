import prisma from "../src/prisma";

async function main() {
  await prisma.folder.create({
    data: {
      name: "Root",
      children: {
        create: [
          { name: "Documents" },
          { name: "Pictures" },
          { name: "Music" },
        ],
      },
    },
  });
}

main()
  .then(() => console.log("Seeding complete"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
