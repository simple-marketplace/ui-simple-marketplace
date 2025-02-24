import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HoverLink from "./components/hoverlink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

let pages = [
  { name: "Home", link: "/" },
  { name: "My Account", link: "/my_account" },
  { name: "Sign Up", link: "/sign_up" },
];

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="navContainer">
          <span>
            <div className="nav" id="nav-parent">
              {pages.map((page) => {
                return (
                  <HoverLink
                    className="hoverlink"
                    link={page.link}
                    hoverColor="#7a7b76"
                    originalColor="white"
                    name={page.name}
                  />
                );
              })}
            </div>
          </span>
        </div>
        {children}
      </body>
    </html>
  );
}
