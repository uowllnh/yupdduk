import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { MenuSummary } from "@/types/menu";

type MenuCardProps = {
  menu: MenuSummary;
};

export function MenuCard({ menu }: MenuCardProps) {
  return (
    <Link
      href={`/menu/${menu.id}`}
      className="group flex min-h-[236px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition active:scale-[0.99]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={menu.image}
          alt={menu.name}
          fill
          sizes="(max-width: 375px) 43vw, 156px"
          className="object-contain p-3 transition group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="line-clamp-2 text-[15px] font-bold leading-5 text-black">
              {menu.name}
            </p>
            <p className="mt-1 text-[15px] font-bold text-black">
              {formatPrice(menu.price)}
            </p>
          </div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-500 text-xl font-bold leading-none text-white">
            +
          </span>
        </div>

        {menu.description ? (
          <p className="mt-2 line-clamp-2 text-xs leading-4 text-gray-500">
            {menu.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
