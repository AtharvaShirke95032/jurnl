import { Inter } from "next/font/google";

import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from '@clerk/nextjs';


const inter = Inter({
  subsets: ["latin"], // ✅ Add this line
  preload: true,      // optional, but defaults to true
});

export const metadata = {
  title: "Journel", 
  description: "a journaling app",
};

export default function RootLayout({ children }) {
  return (
   
    <html lang="en">
      <body className={`${inter.className} `}>
         <ClerkProvider>
        <div className="bg-[url('/bg.jpg')] opacity-50 fixed -z-10 inset-0"/>
        <Header/>
        <main className="min-h-screen"> 
        {children}
        </main>
        <footer className="bg-orange-300/10 py-12">
          <div className="mx-auto px-4 text-center text-gray-900">
            <p>made with 💗 by Cat3eow</p>
          </div>
        </footer>
         </ClerkProvider>
      </body>
    </html>
   
  );
}
