import Back from "./backbutton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="m-5 mt-5">
        <Back />
      </div>
      {children}
    </section>
  );
}
