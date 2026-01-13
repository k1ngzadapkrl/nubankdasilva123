import type { Metadata, Viewport } from "next";
import "./globals.css";

// Logo oficial com fundo sólido para evitar o quadrado cinza
const NUBANK_LOGO = "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png";

export const metadata: Metadata = {
  title: " ", 
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: " ", 
  },
  icons: {
    icon: NUBANK_LOGO,
    apple: NUBANK_LOGO, 
  },
};

export const viewport: Viewport = {
  themeColor: "#820AD1", // Roxo Nubank na barra de status
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="bg-[#820AD1]">
      <body className="antialiased bg-[#070707] min-h-screen">
        {children}
      </body>
    </html>
  );
}
