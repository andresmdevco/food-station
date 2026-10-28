import Heading from '@/components/ui/Heading';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const params = await searchParams;
  console.log(params.search);
  return (
    <>
      <Heading>Resultados de búsqueda</Heading>
    </>
  );
}
