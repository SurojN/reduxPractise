import "./globals.css";
import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "MoneySpend",
  description: "E-commerce with Redux Toolkit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#0b0b0c",
          color: "#f3f3f4",
        }}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
