import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { LanguageProvider } from "@/lib/language-context";
import { BookingProvider } from "@/hooks/use-booking";
import BookingDialog from "@/components/sections/booking-dialog";

export const metadata: Metadata = {
  title: "Taxi Québec – Reliable service in Québec 24/7!",
    description: "Professional drivers and safe transport in Quebec City. Book online or call (418) 476-4442.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <LanguageProvider>
          <BookingProvider>
            <Script
              id="orchids-browser-logs"
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
              strategy="afterInteractive"
              data-orchids-project-id="2f83ba8d-f0a0-4809-ab5a-731f63b1a4df"
            />
            <ErrorReporter />
            <Script
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
              strategy="afterInteractive"
              data-target-origin="*"
              data-message-type="ROUTE_CHANGE"
              data-include-search-params="true"
              data-only-in-iframe="true"
              data-debug="true"
              data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
            />
            {children}
            <BookingDialog />
            <VisualEditsMessenger />
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
