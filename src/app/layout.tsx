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
        {/* Áudio de Fundo */}
        <audio id="bgm" loop style={{ display: 'none' }}>
          <source src="https://cdn.discordapp.com/attachments/1341521590797471879/1464477370034683975/SpotiDownloader.com_-_envy_-_super_slowed_-_slxughter.mp3" type="audio/mpeg" />
        </audio>

        {/* Script para tocar áudio ao primeiro clique */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function initAudio() {
                const audio = document.getElementById('bgm');
                if (audio) {
                  audio.volume = 0.25;
                  audio.play().catch(err => console.log('Áudio:', err));
                  document.removeEventListener('click', initAudio);
                }
              }, { once: true });
            `,
          }}
        />

        {children}
      </body>
    </html>
  );
}
