import type { Metadata } from "next";
import "./globals.css";
import { Alexandria as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["arabic"],
  variable: "--font-sans",
})
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
    <html lang="ar">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.className
      )}>
        <ConvexClientProvider >
          {children}
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
