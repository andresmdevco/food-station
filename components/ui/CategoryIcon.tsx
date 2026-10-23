import { Category } from '@/src/generated/prisma/client';
import Image from 'next/image';

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  return (
    <div
      className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="relative size-16">
        <Image
          fill
          src={`/icon_${category.slug}.svg`}
          alt={`Imagen de la Categoría: ${category.name}`}
        />
      </div>
      <p className="text-lg font-bold">{category.name}</p>
    </div>
  );
}
