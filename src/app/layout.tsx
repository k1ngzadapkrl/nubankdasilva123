import type { Metadata, Viewport } from "next";
import "./globals.css"; // ESSA LINHA É O QUE TRAZ O DESIGN DE VOLTA

export const metadata: Metadata = {
  title: "ROUPAS CHECK",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent", // Isso faz o conteúdo vazar por baixo da barra
    title: "ROUPAS CHECK",
  },
  icons: {
    icon: "https://i.pinimg.com/736x/92/10/31/9210312165bce2f3fead1812b95d1583.jpg",
    apple: "https://i.pinimg.com/736x/92/10/31/9210312165bce2f3fead1812b95d1583.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070707" },
    { media: "(prefers-color-scheme: light)", color: "#070707" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // Essencial para o preto descer até o final da tela
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
