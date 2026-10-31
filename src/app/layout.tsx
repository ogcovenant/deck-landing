import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./redesign.css";
import "./product.css";

const hanken = localFont({
  src: "../../public/fonts/hanken-grotesk-latin-wght-normal.woff2",
  variable: "--font-hanken",
  weight: "100 900",
  display: "swap",
});
const noto = localFont({
  src: [
    {
      path: "../../public/fonts/noto-sans-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/noto-sans-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-noto",
  display: "swap",
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  title: {
    default: "Deck Cards — Every card. One Deck.",
    template: "%s — Deck Cards",
  },
  description:
    "Your personal and business cards, together in one app. Meet Deck Cards: a clearer way to manage cards and control spending. Join the early access list.",
  applicationName: "Deck Cards",
  openGraph: {
    type: "website",
    locale: "en_NG",
    title: "Every card. One Deck.",
    description:
      "Personal and assigned business cards. One app. A little more in your control.",
    siteName: "Deck Cards",
    images: [
      {
        url: "/og-deck.png",
        width: 1200,
        height: 630,
        alt: "Deck Cards — Every card. One Deck.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Every card. One Deck.",
    description: "Meet your personal and work cards, together in one app.",
    images: ["/og-deck.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8ED",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hanken.variable} ${noto.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
