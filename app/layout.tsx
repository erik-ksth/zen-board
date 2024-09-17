import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const edu = localFont({
  src: "./fonts/EduVICWANTBeginner-VariableFont_wght.ttf",
  variable: "--font-edu",
  weight: "400 500 600 700",
})

export const metadata: Metadata = {
  title: "Zen Board",
  description: "Streamline your Day with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${edu.className} antialiased`}
      >
        <div className="w-screen h-screen flex justify-center items-center p-5">
          <div className="w-full h-full max-w-screen-2xl max-h-[1000px] bg-black rounded-[3rem] p-5">
            <div className="w-full h-full border-2 border-spacing-6 border-white border-dashed rounded-[2rem] p-7 flex">
              {children}
              <h1 className="uppercase absolute bottom-0 right-0 text-[20em] font-extrabold text-zinc-100 font-sans -z-10">ZenBoard</h1>
              <h1 className="uppercase absolute top-0 left-0 text-[20em] font-extrabold text-zinc-100 font-sans -z-10">ZenBoard</h1>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
