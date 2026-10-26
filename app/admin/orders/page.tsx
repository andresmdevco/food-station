import { prisma } from '@/src/lib/prisma';
import Heading from '../../../components/ui/Heading';

async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}

export default async function OrdersPage() {
  const orders = await getPendingOrders();

  return (
    <>
      <Heading>Administrar Ordenes</Heading>
    </>
  );
}
