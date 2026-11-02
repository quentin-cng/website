import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "The Journey — An interactive portfolio",
  description:
    "From Aix-en-Provence to Montréal. A small world, a new perspective.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
