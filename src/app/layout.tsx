import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource-variable/noto-sans-jp";
import "@fontsource-variable/inter";
import "./globals.css";
import "./responsive.css";
import "./features.css";
import { gtmId, siteUrl, readyForIndexing } from "@/lib/config";
const title = "ENPATH｜英語学習に、あなただけの道筋を。";
const description =
  "目標が違えば、学び方も違う。ENPATHは、一人ひとりの目標と生活に合わせた学習計画とコーチの伴走で、英語学習の習慣化を支えるパーソナル英語コーチングです。";
export const metadata: Metadata = {
  title: { default: title, template: "%s | ENPATH" },
  description,
  metadataBase: new URL(siteUrl ?? "http://127.0.0.1:3000"),
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  robots: { index: readyForIndexing, follow: readyForIndexing },
  openGraph: {
    title,
    description,
    locale: "ja_JP",
    type: "website",
    siteName: "ENPATH",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
        }
      : {}),
  },
  twitter: { card: "summary_large_image", title, description },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>
        {children}
        {gtmId && (
          <Script
            id="gtm"
            strategy="afterInteractive"
          >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}</Script>
        )}
      </body>
    </html>
  );
}
