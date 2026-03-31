import Back from "./backbutton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Back />
      {children}
    </section>
  );
}
