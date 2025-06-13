import React from "react";
import "../Styles/Home.css";
import Contact from "./Contact";
import About from "./About";
import Courses from "./Courses";
import CertificatePage from "./Certificate";

export default function Home() {
  return (
    <>

    <section className="Home_section">
      <div className="Home_main_Container">
        <div className="Home_main_container_2">
          <h1 className="home-title">
            Welcome to <span className="brand-name">GrowAllCoaching</span>, an
            Online Learning Platform
          </h1>
          <p className="home-description">
            Unlock your potential with expert-led courses, interactive lessons,
            and a supportive community to help you achieve your learning goals.
          </p>
          <button className="home-explore-btn">Explore Courses</button>
        </div>
      </div>
    </section>
    <section>
      <About />
      <Courses />
      <CertificatePage />
      <Contact />
    </section>
    </>
  );
}
