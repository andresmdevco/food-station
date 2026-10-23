import { Category } from "@/src/generated/prisma/client";

type CategoryIconProps = {
  category: Category;
}

export default function CategoryIcon({ category }: CategoryIconProps) {
  return (
    <div>{category.name}</div>
  )
}
