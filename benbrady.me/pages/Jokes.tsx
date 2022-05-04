import Head from "next/head";

export default function Jokes(): JSX.Element {
  return (
    <>
      <Head>
        <title>BEST JOKES EVER</title>
      </Head>
      <div className="center-wrapper">
        <details>
          <summary>How do you catch a bunny rabbit?</summary>
          Lay in a field and make carrot noises
        </details>
        <details>
          <summary>Guess how many snakes</summary>
          13
        </details>
      </div>
    </>
  );
}
