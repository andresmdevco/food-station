import { prisma } from '@/src/lib/prisma';

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });

  return products;
}

export default async function OrderPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const products = await getProducts(category);

  return (
    <div>OrderPage</div>
  )
}
