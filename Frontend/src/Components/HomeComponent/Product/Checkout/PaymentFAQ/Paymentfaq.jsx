import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: 'What is the validity of the course?',
    answer: 'The course is valid for 5 years from the date of purchase.',
  },
  {
    question: 'Is this a one-time payment?',
    answer: 'Yes, it\'s a one-time purchase. No hidden or recurring charges.',
  },
  {
    question: 'Will I get lifetime access?',
    answer: 'You will get access for 5 years, which covers all updates and support.',
  },
  {
    question: 'Can I access the course on mobile?',
    answer: 'Yes! The course can be accessed on any device including mobile, tablet, and desktop.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          key={index}
          onClick={() => toggleFAQ(index)}
        >
          <div className="faq-question">
            {faq.question}
            <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
          </div>
          <div className="faq-answer">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
