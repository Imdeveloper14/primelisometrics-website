import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PRIMELISOMETRICS | Engineering Ideas into Reality",
  description: "Primelisometrics is a freelance engineering design consultancy providing professional CAD design, 3D modeling, piping design, marine systems, and technical drafting.",
  keywords: "Primelisometrics, engineering design, freelance CAD design, 3D modeling, piping design, marine systems, technical drafting, naval architecture, ship stability, AutoCAD Plant 3D, BWTS retrofits",
  robots: "index, follow",
  alternates: {
    canonical: "https://primelisometrics.com/",
  },
  openGraph: {
    type: "website",
    url: "https://primelisometrics.com/",
    title: "PRIMELISOMETRICS | Engineering Ideas into Reality",
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
    title: "PRIMELISOMETRICS | Engineering Ideas into Reality",
    description: "Primelisometrics is a freelance engineering design consultancy providing professional CAD design, 3D modeling, piping design, marine systems, and technical drafting.",
    images: ["https://primelisometrics.com/images/logo.png"],
  },
  other: {
    "google-site-verification": "Yr5VEVKRsAjDRM440ZQ1d4N6Tn9FYjNyhZCAptDpbbE"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://primelisometrics.com/#organization",
      "name": "PRIMELISOMETRICS",
      "url": "https://primelisometrics.com/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://primelisometrics.com/#logo",
        "url": "https://primelisometrics.com/images/logo.png",
        "caption": "PRIMELISOMETRICS"
      },
      "image": {
        "@id": "https://primelisometrics.com/#logo"
      },
      "sameAs": [
        "https://www.linkedin.com/in/chandrasekar-kumar-03662214a/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://primelisometrics.com/#website",
      "url": "https://primelisometrics.com/",
      "name": "PRIMELISOMETRICS",
      "description": "PRIMELISOMETRICS is a freelance engineering design consultancy providing professional CAD design, 3D modeling, piping design, marine systems, and technical drafting.",
      "publisher": {
        "@id": "https://primelisometrics.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": "https://primelisometrics.com/#webpage",
      "url": "https://primelisometrics.com/",
      "name": "PRIMELISOMETRICS | Engineering Ideas into Reality",
      "isPartOf": {
        "@id": "https://primelisometrics.com/#website"
      },
      "about": {
        "@id": "https://primelisometrics.com/#organization"
      },
      "description": "PRIMELISOMETRICS is a freelance engineering design consultancy providing professional CAD design, 3D modeling, piping design, marine systems, and technical drafting.",
      "inLanguage": "en-US"
    }
  ]
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
        
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
