import React, { useState } from "react";
import "./About.css";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaRocket,
  FaGlobe,
  FaGraduationCap,
  FaChartLine,
} from "react-icons/fa";

const AboutSection = () => {
  // State to manage active section visibility
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="about-container">
      {/* Header Section */}
      {/* <header className="about-header">
        <h1>About Growall Coaching</h1>
        <p>
          Growall Coaching provides top-quality educational resources and tools
          for learners worldwide, enabling them to achieve success in their
          academic journey.
        </p>
      </header> */}



      <div className="mission-container">
        {/* Hero Section */}
        <section className="mission-hero">
          <h1>Our Mission</h1>
          <p>
            Empowering learners with affordable, high-quality education for a
            brighter future.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="mission-statement">
          <h2>What Drives Us</h2>
          <p>
            At Growall Coaching, we believe that education is the most powerful
            tool to change the world. Our mission is to make premium education
            accessible to everyone, regardless of their background or location.
          </p>
        </section>

        {/* Values Section */}
        <section className="mission-values">
          <div className="value-card">
            <FaChalkboardTeacher className="value-icon" />
            <h3>Expert Instructors</h3>
            <p>
              We bring top educators to your screen to simplify learning and
              ensure deep understanding.
            </p>
          </div>
          <div className="value-card">
            <FaUsers className="value-icon" />
            <h3>Community Driven</h3>
            <p>
              We ’re building a strong community of students, mentors, and
              lifelong learners who support each other.
            </p>
          </div>
          <div className="value-card">
            <FaRocket className="value-icon" />
            <h3>Future Focused</h3>
            <p>
              We focus on building future-ready skills with real-world
              applications and career opportunities.
            </p>
          </div>
        </section>
      </div>

      <div className="goal-container">
        {/* Hero Section */}
        {/* <section className="goal-hero">
          <h1>Our Goal</h1>
          <p>
            To revolutionize education by building a future where quality
            learning is accessible to all.
          </p>
        </section> */}

        {/* Goal Overview */}
        <section className="goal-overview">
          <h2>What We Aim For</h2>
          <p>
            Our goal is to become the leading platform for affordable,
            skill-based learning. We want to equip every student with the tools,
            knowledge, and confidence to grow in their careers and lives.
          </p>
        </section>

        {/* Key Goals */}
        <section className="goal-targets">
          <div className="goal-card empower-learner">
            <FaGraduationCap className="goal-icon" />
            <h3>Empower Learners</h3>
            <p>
              We don’t just teach—we ignite transformation. At Growall Coaching,
              every learner starts as a dreamer and grows into a doer. Whether
              it’s a student from a small town discovering coding, or a working
              professional reigniting their passion—our goal is to uplift,
              guide, and unlock their true potential.
            </p>
            <div className="empower-highlight">
              <span className="highlight-quote">
                "From learning to earning — we walk with you."
              </span>
            </div>
          </div>

          <div className="goal-card trackable-progress">
            <FaChartLine className="goal-icon" />
            <h3>Trackable Progress</h3>
            <p>
              Learning is a journey, and we help you see every step you take.
              With structured modules, milestone tracking, and performance
              insights, students always know where they stand— and how far
              they’ve come. Every small win matters, and we make sure it counts.
            </p>
            <div className="empower-highlight">
              <span className="highlight-quote">
                "Your progress isn’t just visible — it’s celebrated."
              </span>
            </div>
          </div>

          <div className="goal-card reach-every-corner">
            <FaGlobe className="goal-icon" />
            <h3>Reach Every Corner</h3>
            <p>
              Education shouldn’t be limited by geography or background. Our
              goal is to break those barriers and bring quality learning to
              every home—be it a metro city or a remote village. With online
              access, regional support, and easy-to-use content, we’re making
              learning truly borderless.
            </p>
            <div className="empower-highlight">
              <span className="highlight-quote">
                "If you have the will to learn, we’ll find the way to teach."
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutSection;
