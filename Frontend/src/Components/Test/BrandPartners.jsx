import React from "react";
import "./BrandPartners.css";

const BrandPartners = () => {
    const partners = [
        { name: "Google", logo: "https://logo.clearbit.com/google.com" },
        { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
        { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
        { name: "Facebook", logo: "https://logo.clearbit.com/facebook.com" }
      ];
    

  return (
    <div className="partners-container">
      <h1 className="title">Our Collabrators</h1>
      <div className="partners-grid">
        {partners.map((partner, index) => (
          <div key={index} className="partner-card">
            <img src={partner.logo} alt={partner.name} className="partner-logo" />
            <p className="partner-name">{partner.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPartners;
