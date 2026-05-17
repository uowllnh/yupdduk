type MenuListStateProps = {
  title: string;
  description: string;
};

export function MenuListState({ title, description }: MenuListStateProps) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center">
      <p className="font-bold text-black">{title}</p>
      <p className="mt-2 text-sm leading-5 text-gray-500">{description}</p>
    </div>
  );
}
