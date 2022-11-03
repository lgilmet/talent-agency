import Head from "next/head";

export default function Home() {
    return (
        <div className="absolute top-0 left-0 min-h-screen w-screen flex flex-col justify-center">
            <Head>
                <title>Talent Agency</title>
                <meta name="description" content="NextJs with Sanity" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="text-center mx-auto">Home</div>
        </div>
    );
}
