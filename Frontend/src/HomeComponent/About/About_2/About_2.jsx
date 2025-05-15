import React, { useEffect } from "react";
import './about.css'
import AboutSection from "../About";
import Mission from "../Mision/Mission";

export default function Aboutsecond() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="about-hero">
        <h1>Welcome to Growall Coaching</h1>
        <p className="hero-tagline">
          Empowering learners. Shaping futures. Building tomorrow’s leaders.
        </p>
      </div>

      {/* About Introduction */}
        {/* <div className="about-intro">
          <h2>Who We Are</h2>
          <p>
            Growall Coaching is an EdTech company born out of a passion to educate and inspire. 
            Our mission is simple – make quality tech education accessible, affordable, and engaging 
            for every student, everywhere. From humble beginnings to a rapidly growing learning platform, 
            our journey is built on dedication, innovation, and the trust of thousands of learners.
          </p>
        </div> */}

      <Mission/>

      {/* Our Mission */}
      {/* <div className="about-content">
        <div className="content-card">
          <div className="imageOurVision"></div>
          <div className="About_content-txt">
            <h2>We provide the best education worldwide</h2>
            <p className="About_content-para">
              At Growall Coaching, our vision is to revolutionize online education by making high-quality tech learning accessible to everyone. 
              We aim to empower students, professionals, and aspiring developers with in-depth courses on HTML, CSS, JavaScript, and many more. 
              Our goal is to bridge the gap between theoretical knowledge and real-world application.
            </p>
            <button className="section-btn">
              <span className="icon"></span> Our Mission
            </button>
          </div>
        </div>
      </div> */}

      {/* Our Goal */}
      {/* <div className="about-content">
        <div className="content-card reverse">
          <div className="About_content-txt">
            <h2>We Enhance the Skills of Future Engineers</h2>
            <p className="About_content-para">
              We are committed to empowering the next generation of engineers. 
              Through our cutting-edge programs and expert mentorship, we foster innovation, creativity, 
              and critical thinking. Our learners are trained not just to get jobs, but to solve real-world problems.
            </p>
            <button className="section-btn">
              <span className="icon"></span> Our Goal
            </button>
          </div>
          <div className="imageOurVision"></div>
        </div>
        
      </div> */}
      

      {/* Journey Timeline */}
      <div className="about-journey">
        <h2>Our Journey</h2>
        <ul className="timeline">
          <li>
            <span>2025</span>
            <p>Growall Coaching was founded with a dream to teach millions of students.</p>
          </li>
          <li>
            <span>2026</span>
            <p>Launched our first HTML & CSS course. Over 1,000 students enrolled within 3 months.</p>
          </li>
          <li>
            <span>2027</span>
            <p>Introduced full-stack development programs and partnered with tech mentors.</p>
          </li>
          <li>
            <span>2028</span>
            <p>Crossed 10,000+ learners. Now expanding to AI, DSA, and more cutting-edge tech courses.</p>
          </li>
        </ul>
      </div>

      {/* Why Choose Us */}
      <div className="why-choose-us">
        <h2>Why Choose Growall Coaching?</h2>
        <ul>
          <li>✅ Lifetime access to premium content</li>
          <li>✅ Real-world projects with every course</li>
          <li>✅ Doubt-solving sessions and mentorship</li>
          <li>✅ Affordable one-time payment</li>
          <li>✅ Courses created by experienced developers</li>
        </ul>
      </div>
      <AboutSection/>
    </>
  );
}
