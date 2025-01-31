import React from "react";
import HomePage from "../HomeComponent/HomePage/Homepage";
import Product from "../HomeComponent/Product/Product";

export default function Home() {
  return (
    <>
      <section>
        <HomePage />
      </section>

      <main>
        <Product />
      </main>
    </>
  );
}
