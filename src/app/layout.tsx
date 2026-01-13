import type { Metadata, Viewport } from "next";
import "./globals.css"; // Isso garante que o CSS (fundo preto) carregue

export const metadata: Metadata = {
  title: "ROUPAS CHECK",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ROUPAS CHECK",
  },
  icons: {
    icon: "https://i.pinimg.com/736x/92/10/31/9210312165bce2f3fead1812b95d1583.jpg",
    apple: "https://i.pinimg.com/736x/92/10/31/9210312165bce2f3fead1812b95d1583.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707", // Cor da barra de bateria
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // Remove as bordas brancas em iPhones
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="bg-[#070707]">
      <body className="antialiased bg-[#070707] min-h-screen">{children}</body>
    </html>
  );
}
