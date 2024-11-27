import type { Metadata } from "next";
import "./globals.css";
import FaviconSwitcher from "./components/landing/FaviconSwitcher";
import ThemeUpdater from "./ThemeUpdater";
import ThemeProvider from "./ThemeProvider";

export const metadata: Metadata = {
  title: "EMOTIC",
  description: "EEG Monitoring of Thoughts and Individual Conditions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logoDarkMode.ico" />
      </head>
      <body>
        <FaviconSwitcher />
        <ThemeUpdater /> {/* TODO: Not sure this is necessary, but it doesn't break the app to keep it so I'm leaving it here */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}