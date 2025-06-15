import React from "react";
import "../Styles/Certificate.css";

const Certificate = ({ name, course, date }) => {
  return (
    <>
      <div className="certificate-container">
        <div className="certificate">
          <h1 className="title">Certificate of Completion</h1>

          <p className="subtitle"> This certificate is proudly awarded to</p>
          <h2 className="recipient">{name}</h2>
          <p className="subtitle-next">
            for successfully completing the Web Development Course. Through
            dedication and hard work, they have gained expertise in HTML, CSS,
            JavaScript, and modern web technologies. This achievement reflects
            their commitment to building responsive and dynamic websites,
            equipping them with valuable skills for the digital world.
          </p>
          <h3 className="course">{course}</h3>
          <p className="date">on {date}</p>

          <div className="signature-section">
            <div>
              <p className="label">Instructor</p>
              <p className="info">Growallcoaching</p>
            </div>
            <div>
              <p className="label">CEO's signature</p>
              <img className="image_signature" src="./Signature.png" alt="" height={40} width={100} />
              <p className="signature-line">______________</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CertificatePage = () => {
  return (
    <Certificate
      name="Piyush Jhariya"
      course="Full Stack Web Development"
      date="February 7, 2025"
    />
  );
};

export default CertificatePage;
