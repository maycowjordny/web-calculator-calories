import ToastProvider from "@/providers/toast-provider";
import CalculateCaloriesThemeProvider from "@/theme/theme-provider";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
config.autoAddCss = false;

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title:
    "Calculadora de Calorias - Ajuste Sua Dieta para Perder ou Ganhar Peso",
  description:
    "Use nossa calculadora de calorias para calcular seu metabolismo basal, ajustar sua dieta e atingir suas metas de perda ou ganho de peso com ingestão ideal de macronutrientes.",
  keywords: [
    "calculadora de calorias",
    "perda de peso",
    "ganho de peso",
    "metabolismo basal",
    "dieta",
    "nutrição",
    "macronutrientes",
    "ajuste de dieta",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2978516619638260"
          crossOrigin="anonymous"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V5X5LHR005"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V5X5LHR005');
          `}
        </Script>
      </head>
      <CalculateCaloriesThemeProvider>
        <body className={roboto.className}>
          <ToastProvider>{children}</ToastProvider>
        </body>
      </CalculateCaloriesThemeProvider>
    </html>
  );
}
