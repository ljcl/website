export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prose-lg lg:prose-xl mx-auto my-14">{children}</div>;
}
