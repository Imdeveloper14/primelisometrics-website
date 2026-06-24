import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PRIMELISOMETRICS | Engineering Beyond Limits",
  description: "PRIMELISOMETRICS is an advanced engineering platform focused on design, simulation, manufacturing, innovation, and engineering excellence.",
  keywords: "PRIMELISOMETRICS, Engineering Design, CAD Modeling, Product Development, Simulation Engineering, Manufacturing Solutions, Industrial Engineering, Design Optimization, Digital Engineering",
  robots: "index, follow",
  alternates: {
    canonical: "https://royal-feather-b793.chandrunavalarch.workers.dev/",
  },
  openGraph: {
    type: "website",
    url: "https://royal-feather-b793.chandrunavalarch.workers.dev/",
    title: "PRIMELISOMETRICS | Engineering Beyond Limits",
    description: "PRIMELISOMETRICS is an advanced engineering platform focused on design, simulation, manufacturing, innovation, and engineering excellence.",
    images: [
      {
        url: "https://royal-feather-b793.chandrunavalarch.workers.dev/images/logo.png",
        width: 1200,
        height: 630,
        alt: "PRIMELISOMETRICS Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRIMELISOMETRICS | Engineering Beyond Limits",
    description: "PRIMELISOMETRICS is an advanced engineering platform focused on design, simulation, manufacturing, innovation, and engineering excellence.",
    images: ["https://royal-feather-b793.chandrunavalarch.workers.dev/images/logo.png"],
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
        
        {/* Structured Data: JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PRIMELISOMETRICS",
              "url": "https://royal-feather-b793.chandrunavalarch.workers.dev",
              "description": "Advanced engineering, simulation and manufacturing platform."
            })
          }}
        />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Browser theme colors */}
        <meta name="theme-color" content="#ff1744" />
        <meta name="msapplication-TileColor" content="#ff1744" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
