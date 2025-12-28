import type {Metadata} from 'next';
import './globals.css';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AppHeader } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"

const fontBody = Inter({ subsets: ['latin'], variable: '--font-body' });
const fontCode = Source_Code_Pro({ subsets: ['latin'], variable: '--font-code' });


export const metadata: Metadata = {
  title: 'Aetherium Books: AI-Native Books',
  description: 'The future of publishing. Spec-Driven, Personalized, Multilingual, and Always Updated books written by Intelligence, Not Hands.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontBody.variable,
          fontCode.variable
        )}>
        <div className="relative flex min-h-screen flex-col">
          <AppHeader />
          <main className="flex-1">
            {children}
          </main>
          <AppFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
