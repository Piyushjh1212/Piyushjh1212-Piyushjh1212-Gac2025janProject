import React, { useState } from 'react';
import './WhatWeDo.css';

const tabs = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Learn HTML, CSS, and JavaScript to build beautiful and interactive websites.',
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Master backend technologies like Node.js and Express to create powerful server-side applications.',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Become proficient in both frontend and backend technologies and build full-stack web applications.',
  },
];

const WhatWeDo = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  return (
    <section className="what-we-do-section">
      <div className="what-we-do-container">
        <h2 className="what-we-do-title">What We Do</h2>
        <p className="what-we-do-description">
          At Growall Coaching, we empower learners to gain mastery over web development technologies through hands-on learning.
        </p>

        {/* Tabs Navigation */}
        <div className="what-we-do-tabs" role="tablist">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              role="tab"
              tabIndex="0"
              className={`what-we-do-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
            >
              {tab.title}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="what-we-do-tab-content">
          {tabs.map((tab) =>
            activeTab === tab.id ? (
              <div key={tab.id} className="what-we-do-tab-panel">
                <h3>{tab.title}</h3>
                <p>{tab.description}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
