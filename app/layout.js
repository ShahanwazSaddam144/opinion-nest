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

export const metadata = {
  title: {
    default: "Opinion Nest - AI Business Reviews & Insights",
    template: "%s | Opinion Nest",
  },
  description:
    "Opinion Nest is an AI-powered platform that provides smart business opinions, reviews, and insights to help users make better decisions.",
  keywords: [
    "AI reviews",
    "business opinions",
    "company ratings",
    "AI business insights",
    "startup reviews",
    "trust score",
    "product reviews AI",
  ],
  authors: [{ name: "Opinion Nest" }],
  creator: "Opinion Nest",
  metadataBase: new URL("https://your-domain.com"),

  openGraph: {
    title: "Opinion Nest - AI Business Reviews & Insights",
    description:
      "Get AI-powered business opinions, reviews, and insights to make smarter decisions.",
    url: "https://your-domain.com",
    siteName: "Opinion Nest",
    images: [
      {
        url: "/butt.png",
        width: 1200,
        height: 630,
        alt: "Opinion Nest Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Opinion Nest - AI Business Reviews",
    description:
      "AI-powered business opinions and smart insights for better decisions.",
    images: ["/butt.png"],
  },

  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}