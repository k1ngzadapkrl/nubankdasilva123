import type { Metadata, Viewport } from "next";
import "./globals.css";

const NUBANK_LOGO = "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png";

export const metadata: Metadata = {
  // Deixamos o título como um espaço ou algo genérico para o navegador
  title: " ", 
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    // O nome que aparecerá abaixo do ícone no iPhone (deixamos vazio conforme planejado)
    title: " ", 
  },
  icons: {
    icon: NUBANK_LOGO,
    // Corrigido: Aqui deve ser apenas a URL da imagem, não a tag HTML completa
    apple: NUBANK_LOGO, 
  },
};

export const viewport: Viewport = {
  // Mudamos para o Roxo Nubank para a barra de status combinar com o Splash/Manifest
  themeColor: "#820AD1", 
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Evita zoom indesejado ao clicar nos inputs
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="bg-[#070707]">
      <body className="antialiased bg-[#070707] min-h-screen">
        {children}
      </body>
    </html>
  );
}
