import "./globals.css";
import Nav from "@components/Nav";
import Provider from "@app/Provider";
import { MuseoModerno } from "next/font/google";

export const metadata = {
  title: "TDL | created by next.js and express.js",
  description: "Created by Arya",
};

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mm",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${museoModerno.variable} font-serif`}>
        <main className="px-2 sm:px-12 md:px-20 flex flex-col h-full font-serif">
          <Provider>
            <Nav />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
}
