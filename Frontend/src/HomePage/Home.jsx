import React from 'react'
import HomePage from '../HomeComponent/HomePage/Homepage'
import Contact from '../HomeComponent/Contact/Contact'
import BrandPartners from '../HomeComponent/BrandPatners/Brandpatners'
import CertificatePage from '../HomeComponent/Certificates/Certificates'
import CoursesPage from '../HomeComponent/CoursesPage/Courses'
import { useRef } from 'react'



export default function Home() {
    const contactRef = useRef(null);
  return (
    <>
        <HomePage contactRef={contactRef}/>
        <CoursesPage innerRef={contactRef}/>
        <BrandPartners/>
        <CertificatePage/>
        <Contact />
        
    </>
  )
}
