import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./components/Navbar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="md:flex">
        <Sidebar />
        <div className="w-full z-20">{children}</div>
      </body>
    </html>
  );
}
