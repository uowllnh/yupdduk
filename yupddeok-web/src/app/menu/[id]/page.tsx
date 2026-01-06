import MenuDetailClient from "./MenuDetailClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MenuDetailClient id={id} />;
}
