import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Primelisometrics | Engineering Ideas into Reality",
  description: "Primelisometrics is a freelance engineering design consultancy providing professional CAD design, 3D modeling, piping design, marine systems, and technical drafting.",
  keywords: "Primelisometrics, engineering design, freelance CAD design, 3D modeling, piping design, marine systems, technical drafting, naval architecture, ship stability, AutoCAD Plant 3D, BWTS retrofits",
  robots: "index, follow",
  alternates: {
    canonical: "https://primelisometrics.com/",
  },
  openGraph: {
    type: "website",
    url: "https://primelisometrics.com/",
    title: "Primelisometrics | Engineering Ideas into Reality",
    description: "Primelisometrics is a freelance engineering design consultancy providing professional CAD design, 3D modeling, piping design, marine systems, and technical drafting.",
    images: [
      {
        url: "https://primelisometrics.com/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Primelisometrics Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Primelisometrics | Engineering Ideas into Reality",
    description: "Primelisometrics is a freelance engineering design consultancy providing professional CAD design, 3D modeling, piping design, marine systems, and technical drafting.",
    images: ["https://primelisometrics.com/images/logo.png"],
  },
  other: {
    "google-site-verification": "Yr5VEVKRsAjDRM440ZQ1d4N6Tn9FYjNyhZCAptDpbbE"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Load Phosphor Icons CDN for traditional class-name usage */}
        <script src="https://unpkg.com/@phosphor-icons/web" defer></script>
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
