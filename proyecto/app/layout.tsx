import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wearetrades-academy.cmanjarrez1975.chatgpt.site'),
  title: "U WeAreTrades Academy",
  description:
    "Plataforma profesional de estudio y práctica de trading con ejercicios interactivos, evaluación y diario.",
  openGraph: {
    title: 'U WeAreTrades Academy',
    description: 'Fundamentos, método y práctica: una ruta de estudio con fuentes, ejercicios y decisiones razonadas.',
    type: 'website', locale: 'es_ES',
    images: [{url: '/og.png', width: 1536, height: 1024, alt: 'U WeAreTrades Academy · Estudio y práctica de trading'}],
  },
  twitter: { card: 'summary_large_image', title: 'U WeAreTrades Academy', description: 'Estudio y práctica de trading.', images: ['/og.png'] },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
