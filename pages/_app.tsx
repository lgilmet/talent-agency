import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-slate-100 min-h-screen">
            <Navbar />
            <div className="pt-12 max-w-3xl md:mx-auto mx-3">
                <Component {...pageProps} />
            </div>
        </div>
    );
}
