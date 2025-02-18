import React from 'react';
import { FaCode, FaAppStore, FaRobot } from 'react-icons/fa'; // Corrected icon names
import './WhatWeDo.css';

const services = [
  {
    id: 'frontend',
    title: 'Web Development',
    description:
      'We teach HTML, CSS, and JavaScript to help you build beautiful and interactive websites.',
    icon: <FaCode size={50} color="#008080" />, // Updated icon
  },
  {
    id: 'backend',
    title: 'App Development',
    description:
      'Master Node.js, Express, and more to build powerful server-side applications.',
    icon: <FaAppStore size={50} color="#FF6F61" />, // Updated icon
  },
  {
    id: 'fullstack',
    title: 'AI/ML Development',
    description:
      'Learn both frontend and backend to become a full-stack developer.',
    icon: <FaRobot size={50} color="#FF9800" />, // Updated icon
  },
];

const teamMembers = [
  {
    name: 'Mr. Piyush Jhariya',
    role: 'Founder (Frontend Developer)',
    image: 'https://randomuser.me/api/portraits/men/10.jpg',
    bio: 'In a mission to train the thousand of students',
  },
  {
    name: 'Jane Smith',
    role: 'Javascript Developer',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
    bio: 'Jane specializes in Javascript with a experience of 10 yrs',
  },
  {
    name: 'Tushar Choudhary',
    role: 'Node.js Developer',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
    bio: 'Tushar is passionate about creating beautiful backend with Node.JS, loves teaching Backend development.',
  },
];

const WhatWeDo = () => {
  return (
    <section className="what-we-do-container">
      <div className="what-we-do-mission">
        <h2 className="what-we-do-title">Our Mission</h2>
        <p className="what-we-do-mission-description">
        At Growall Coaching, our mission is to empower individuals by providing world-class web development 
        education through immersive, hands-on courses. We believe in not just teaching the theory, but also fostering 
        real-world skills through interactive projects that help our students build meaningful, practical knowledge. 
        Our goal is to equip you with the tools, expertise, and confidence needed to thrive 
        in the ever-evolving world of web development and transform your passion into a successful career.
        </p>
      </div>

      <div className="what-we-do-services">
        <h2 className="what-we-do-title">What We Offer</h2>
        <div className="what-we-do-services-container">
          {services.map((service) => (
            <div key={service.id} className="what-we-do-service-card">
              <div className="what-we-do-icon-container">{service.icon}</div>
              <h3 className="what-we-do-service-title">{service.title}</h3>
              <p className="what-we-do-service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="what-we-do-team">
        <h2 className="what-we-do-title">Meet Our Team</h2>
        <div className="what-we-do-team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="what-we-do-team-member">
              <img
                src={member.image}
                alt={member.name}
                className="what-we-do-team-member-image"
              />
              <h3 className="what-we-do-team-member-name">{member.name}</h3>
              <p className="what-we-do-team-member-role">{member.role}</p>
              <p className="what-we-do-team-member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="what-we-do-testimonials">
        <h2 className="what-we-do-title">What Our Students Say</h2>
        <p className="what-we-do-testimonial">
          "Growall Coaching helped me become a confident web developer!" - Arav Sinha
        </p>
        <p className="what-we-do-testimonial">
          "The hands-on approach made learning so much easier!" - Nishant singh
        </p>
      </div>
    </section>
  );
};

export default WhatWeDo;
