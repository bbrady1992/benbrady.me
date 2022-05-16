import type { NextPage } from "next";
import Head from "next/head";
import Homepage from "./Homepage";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ben Brady, Software Engineer</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>

      <Homepage />
    </>
  );
};

export default Home;
