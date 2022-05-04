import Link from "next/link";
import React from "react";

export default function Homepage(): JSX.Element {
  return (
    <div className="center-wrapper">
      <h1>Hello, Dan</h1>
      <Link href="/Jokes">
        <a>Jokes</a>
      </Link>
    </div>
  );
}
