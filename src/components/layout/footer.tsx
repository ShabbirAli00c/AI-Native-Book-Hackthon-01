import Link from "next/link";
import { Logo } from "@/components/logo";

export function AppFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Logo />
            <span className="font-semibold text-lg">Aetherium Books</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6 md:mb-0">
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
            <Link href="/chatbot" className="hover:text-primary">Chatbot</Link>
            <Link href="/signin" className="hover:text-primary">Sign In</Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Aetherium Books. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
