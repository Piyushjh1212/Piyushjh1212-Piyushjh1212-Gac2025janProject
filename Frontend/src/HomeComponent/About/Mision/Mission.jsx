import React, { useEffect, useRef } from 'react';
import { useInView } from '../../../Component/Hooks/use.view';
import './Mission.css'; // Custom CSS file

const Mission = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, 0.2);

  return (
    <section 
      ref={sectionRef}
      className="mission-section"
    >
      <div className="mission-container">
        <div className="mission-header">
          <h2 className={`mission-title ${isInView ? 'fade-in' : 'invisible'}`}>
            Our Mission
            <div className="title-underline"></div>
          </h2>
          <p className={`mission-subtitle ${isInView ? 'fade-in delay' : 'invisible'}`}>
            GrowAllCoaching was founded with a singular purpose: to help individuals and organizations unlock their full potential and achieve sustainable growth. We believe that everyone has untapped capabilities waiting to be discovered.
          </p>
        </div>

        <div className="mission-grid">
          <div className={`mission-text ${isInView ? 'slide-in-left' : 'hidden-left'}`}>
            <h3 className="mission-subheading">Who We Are</h3>
            <p>
              Founded in 2018, GrowAllCoaching has quickly grown into a leading coaching provider with a team of expert coaches specializing in personal development, career advancement, leadership training, and organizational growth.
            </p>
            <p>
              Our approach combines evidence-based methodologies with personalized attention, ensuring that each client receives a tailored experience designed to address their unique challenges and aspirations.
            </p>
          </div>

          <div className={`mission-image-container ${isInView ? 'slide-in-right' : 'hidden-right'}`}>
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="GrowAllCoaching Team Meeting" 
              className="mission-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
