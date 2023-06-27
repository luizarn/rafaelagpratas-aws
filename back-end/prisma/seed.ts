import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  let category = await prisma.category.findFirst();
  if (!category) {
    await prisma.category.createMany({
      data: [
        {
          title: 'anéis',
        },
        {
        title: 'pulseiras',
        },
        {
          title: 'brincos',
          },
          {
            title: 'colares',
            },
        {
          title: 'conjuntos',
          },
         {
        title: 'piercings',
        },
        {
          title: 'pingentes',
          },
          {
            title: 'tornozeleiras',
            },
            {
              title: 'correntes sem pingentes',
              },
      ],
    });
  }

  let tag = await prisma.tag.findFirst();
  if (!tag) {
    await prisma.tag.createMany({
      data: [
        {
         title: 'zircônia',
        },
        {
            title: 'coração',
           },
           {
            title: 'cravejado',
           },
           {
            title: 'bolinha',
           },
           {
            title: 'ponto de luz',
           },
           {
            title: 'triângulo',
           },
           {
            title: 'argola',
           },
           {
            title: 'escapulário',
           },
           {
            title: 'olho grego',
           },
           {
            title: 'animal',
           },
           {
            title: 'luxo',
           },
           {
            title: 'fake',
           },
           {
            title: 'cruz',
           },
           {
            title: 'corrente',
           },
           {
            title: 'riviera',
           },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });