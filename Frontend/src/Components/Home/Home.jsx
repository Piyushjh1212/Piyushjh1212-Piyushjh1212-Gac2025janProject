import React from "react";
import HomePage from "../HomeComponent/HomePage/Homepage";
// import Product from "../HomeComponent/Product/Product";
import Contact from "../HomeComponent/Contact/Contact";
import ProductPage from "../HomeComponent/Product/Products";
import CertificatePage from "../Certificate/Certificate";
import BrandPartners from "../HomeComponent/BrandPartners/BrandPartners";
import WhatWeDo from "../AboutPage/Whatwedo";

export default function Home() {
  return (
    <>
      <section>
        <HomePage />
      </section>

      <WhatWeDo/>


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
