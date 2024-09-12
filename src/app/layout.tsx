import ToastProvider from "@/providers/toast-provider";
import CalculateCaloriesThemeProvider from "@/theme/theme-provider";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
config.autoAddCss = false;

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Calculadora de calorias",
  description: "Calcule seu metabolismo basal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2978516619638260"
          crossOrigin="anonymous"
        />
      </head>
      <CalculateCaloriesThemeProvider>
        <body className={roboto.className}>
          <ToastProvider>{children}</ToastProvider>
        </body>
      </CalculateCaloriesThemeProvider>
    </html>
  );
}
