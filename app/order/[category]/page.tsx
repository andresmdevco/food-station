export default async function OrderPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  console.log(category)

  return (
    <div>OrderPage</div>
  )
}