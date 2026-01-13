import type { Metadata, Viewport } from "next";
import "./globals.css"; // ESSA LINHA É O QUE TRAZ O DESIGN DE VOLTA

export const metadata: Metadata = {
  title: "ROUPAS CHECK",
  description: "Sistema de Gerenciamento",
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
  themeColor: "#070707", // Pinta a barra de bateria/hora de preto
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // FAZ O PRETO SUBIR ATÉ A CÂMERA
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="antialiased">{children}</body>
    </html>
  );
}
