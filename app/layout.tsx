import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Newsletter from "@/components/layout/Newsletter"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Scraping & Data Extraction Services | Business Data Labs",
  description: "Business Data Labs provides professional web scraping and data extraction services. Convert website data into Excel, CSV, or JSON formats for research, business intelligence, and automation.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  // Helper to determine tracking IDs based on the domain
  const getTrackingIds = (hostname: string) => {
    // Check .com.au first because it also contains .au
    if (hostname.includes("businessdatalabs.com.au")) {
      return { 
        GTM_ID: "YOUR_COM_AU_GTM_ID", 
        GA_ID: "G-Y9JYHWDQJR", // ID you provided earlier
        AW_ID: "YOUR_COM_AU_AW_ID" 
      };
    }
    if (hostname.includes("businessdatalabs.au")) {
      // This will match .au (but not .com.au due to the check above)
      return { 
        GTM_ID: "YOUR_AU_GTM_ID", 
        GA_ID: "G-80CQE197ZM", 
        AW_ID: "YOUR_AU_AW_ID" 
      };
    }
    // Default to .com
    return { 
      GTM_ID: "GTM-WDLCQLB9", 
      GA_ID: "G-V7YK8CSH0Q", 
      AW_ID: "" 
    };
  };

  const { GTM_ID, GA_ID, AW_ID } = getTrackingIds(host);

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
              ${AW_ID ? `gtag('config', '${AW_ID}');` : ''}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Newsletter />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
