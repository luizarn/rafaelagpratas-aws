import faker from '@faker-js/faker';
import { Category, Product, Tag } from '@prisma/client';
import { prisma } from '@/config';

export async function createCategories() {
  return prisma.category.create({
    data: {
      title: faker.name.findName(),
    },
  });
}

export async function createTags() {
  return prisma.tag.create({
    data: {
      title: faker.name.findName(),
    },
  });
}

export async function createProduct(category?: Category, tag?: Tag, params: Partial<Product> = {}): Promise<Product> {
  const incomingCategory = category || (await createCategories());
  const incomingTag = tag || (await createTags());

  return prisma.product.create({
    data: {
      title: params.title || faker.name.findName(),
      description: params.description || faker.lorem.sentence(),
      price: params.price || faker.datatype.number(),
      publicUrl: params.publicUrl || faker.image.imageUrl(),
      categoryId: params.categoryId || incomingCategory.id,
      tagId: params.tagId || incomingTag.id,
      quantity: params.quantity || faker.datatype.number(),
      emphasis: false,
      launch: false,
    },
  });
}

export async function createProductWithEmphasisAndLaunch(
  category?: Category,
  tag?: Tag,
  params: Partial<Product> = {},
): Promise<Product> {
  const incomingCategory = category;
  const incomingTag = tag;

  return prisma.product.create({
    data: {
      title: params.title || faker.name.findName(),
      description: params.description || faker.lorem.sentence(),
      price: params.price || faker.datatype.number(),
      publicUrl: params.publicUrl || faker.image.imageUrl(),
      categoryId: params.categoryId || incomingCategory.id,
      tagId: params.tagId || incomingTag.id,
      quantity: params.quantity || faker.datatype.number(),
      emphasis: true,
      launch: true,
    },
  });
}
