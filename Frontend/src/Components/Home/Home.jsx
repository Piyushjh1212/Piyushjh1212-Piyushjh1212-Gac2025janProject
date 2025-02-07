import React from "react";
import HomePage from "../HomeComponent/HomePage/Homepage";
// import Product from "../HomeComponent/Product/Product";
import Contact from "../HomeComponent/Contact/Contact";
import ProductPage from "../HomeComponent/Product/Products";
import CertificatePage from "../Certificate/Certificate";
import BrandPartners from "../Test/BrandPartners";

export default function Home() {
  return (
    <>
      <section>
        <HomePage />
      </section>

      <main>
        {/* <Product /> */}
        <ProductPage/>
        <BrandPartners/>
        <CertificatePage/>
        <Contact />
      </main>
    </>
  );
}
